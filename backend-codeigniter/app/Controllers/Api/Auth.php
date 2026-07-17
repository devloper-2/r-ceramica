<?php

namespace App\Controllers\Api;

use App\Libraries\CustomerToken;
use App\Models\CustomerModel;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * Browser-facing customer authentication for the storefront.
 *
 *   POST /api/v1/auth/register  { name, phone, email, password }
 *   POST /api/v1/auth/login     { phone, password }
 *   POST /api/v1/auth/google    { credential }          (Google ID token)
 *   GET  /api/v1/auth/me                                (customerauth)
 *
 * Public (no API key) — CORS-guarded. On success returns a signed bearer token
 * the browser stores and replays as `Authorization: Bearer <token>`.
 */
class Auth extends BaseApiController
{
    private function auth(array $customer): ResponseInterface
    {
        $model = model(CustomerModel::class);

        return $this->ok([
            'token'    => CustomerToken::issue((int) $customer['id']),
            'customer' => $model->publicView($customer),
        ]);
    }

    private function fail(string $slug, string $message, int $status = 422): ResponseInterface
    {
        return $this->response->setStatusCode($status)->setJSON(['error' => $slug, 'message' => $message]);
    }

    /** POST /api/v1/auth/register */
    public function register(): ResponseInterface
    {
        $body     = $this->request->getJSON(true) ?? [];
        $name     = trim((string) ($body['name'] ?? ''));
        $phone    = preg_replace('/\D/', '', (string) ($body['phone'] ?? ''));
        $email    = trim((string) ($body['email'] ?? ''));
        $password = (string) ($body['password'] ?? '');

        if ($name === '') {
            return $this->fail('invalid_name', 'Please enter your name.');
        }
        if (strlen($phone) < 10) {
            return $this->fail('invalid_phone', 'Please enter a valid mobile number.');
        }
        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->fail('invalid_email', 'Please enter a valid email address.');
        }
        if (strlen($password) < 6) {
            return $this->fail('weak_password', 'Password must be at least 6 characters.');
        }

        $model = model(CustomerModel::class);
        if ($model->findByPhone($phone)) {
            return $this->fail('phone_taken', 'An account with this mobile number already exists. Please sign in.', 409);
        }

        // Reuse an existing email-only record (created at guest checkout) if any.
        $existing = $model->findByEmail($email);
        if ($existing && ! empty($existing['password_hash'])) {
            return $this->fail('email_taken', 'An account with this email already exists. Please sign in.', 409);
        }

        $data = [
            'name'          => $name,
            'email'         => $email,
            'phone'         => $phone,
            'password_hash' => password_hash($password, PASSWORD_DEFAULT),
        ];

        if ($existing) {
            $model->update((int) $existing['id'], $data);
            $customer = $model->find((int) $existing['id']);
        } else {
            $id       = (int) $model->insert($data, true);
            $customer = $model->find($id);
        }

        return $this->auth($customer);
    }

    /** POST /api/v1/auth/login */
    public function login(): ResponseInterface
    {
        $body     = $this->request->getJSON(true) ?? [];
        $phone    = preg_replace('/\D/', '', (string) ($body['phone'] ?? ''));
        $password = (string) ($body['password'] ?? '');

        if ($phone === '' || $password === '') {
            return $this->fail('missing_credentials', 'Enter your mobile number and password.');
        }

        $model    = model(CustomerModel::class);
        $customer = $model->findByPhone($phone);

        // Generic error — no account enumeration.
        if (! $customer || empty($customer['password_hash']) || ! password_verify($password, $customer['password_hash'])) {
            return $this->fail('invalid_credentials', 'Invalid mobile number or password.', 401);
        }

        return $this->auth($customer);
    }

    /** POST /api/v1/auth/google  { credential } */
    public function google(): ResponseInterface
    {
        $clientId = (string) (env('google.clientId') ?? '');
        if ($clientId === '') {
            return $this->fail('google_unconfigured', 'Google login is not configured on the server yet.', 503);
        }

        $body       = $this->request->getJSON(true) ?? [];
        $credential = (string) ($body['credential'] ?? '');
        if ($credential === '') {
            return $this->fail('missing_credential', 'Missing Google credential.');
        }

        // Verify the ID token with Google and read the verified claims.
        $info = $this->verifyGoogleIdToken($credential);
        if (! $info) {
            return $this->fail('invalid_credential', 'Could not verify your Google sign-in.', 401);
        }
        if (($info['aud'] ?? '') !== $clientId) {
            return $this->fail('audience_mismatch', 'Google sign-in was issued for a different app.', 401);
        }
        if (($info['email_verified'] ?? 'false') !== 'true' && ($info['email_verified'] ?? false) !== true) {
            return $this->fail('email_unverified', 'Your Google email is not verified.', 401);
        }

        $googleId = (string) ($info['sub'] ?? '');
        $email    = trim((string) ($info['email'] ?? ''));
        $name     = trim((string) ($info['name'] ?? '')) ?: ($email !== '' ? explode('@', $email)[0] : 'Customer');

        $model = model(CustomerModel::class);

        // 1) Existing Google identity → sign in.
        $customer = $googleId !== '' ? $model->findByGoogleId($googleId) : null;

        // 2) Else link by email if that customer exists.
        if (! $customer && $email !== '') {
            $customer = $model->findByEmail($email);
        }

        if ($customer) {
            $model->update((int) $customer['id'], ['google_id' => $googleId, 'name' => $customer['name'] ?: $name]);
            $customer = $model->find((int) $customer['id']);
        } else {
            $id       = (int) $model->insert(['name' => $name, 'email' => $email, 'google_id' => $googleId], true);
            $customer = $model->find($id);
        }

        return $this->auth($customer);
    }

    /** GET /api/v1/auth/me  (customerauth) */
    public function me(): ResponseInterface
    {
        $customerId = (int) ($this->request->customerId ?? 0);
        $model      = model(CustomerModel::class);
        $customer   = $model->find($customerId);
        if (! $customer) {
            return $this->fail('not_found', 'Account not found.', 404);
        }

        return $this->ok(['customer' => $model->publicView($customer)]);
    }

    /** Server-side verification of a Google ID token via Google's tokeninfo. */
    private function verifyGoogleIdToken(string $credential): ?array
    {
        $url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' . urlencode($credential);

        try {
            $client   = \Config\Services::curlrequest(['timeout' => 8]);
            $response = $client->get($url, ['http_errors' => false]);
            if ($response->getStatusCode() !== 200) {
                return null;
            }
            $data = json_decode((string) $response->getBody(), true);

            return is_array($data) ? $data : null;
        } catch (\Throwable $e) {
            log_message('error', 'Google tokeninfo failed: ' . $e->getMessage());

            return null;
        }
    }
}
