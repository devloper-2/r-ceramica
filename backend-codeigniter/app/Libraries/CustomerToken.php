<?php

namespace App\Libraries;

/**
 * Stateless customer auth token — a compact HMAC-signed value (JWT-like, but
 * no external dependency and no server-side session table).
 *
 *   token = base64url(payload_json) . "." . base64url(HMAC_SHA256(payload, secret))
 *   payload = { "cid": <customerId>, "exp": <unixTimestamp> }
 *
 * The signature proves the payload was issued by us; `exp` bounds its lifetime.
 * Secret comes from `customer.jwtSecret` in .env, falling back to the app
 * encryption key so a missing setting never yields an empty secret.
 */
class CustomerToken
{
    /** Token lifetime: 30 days. */
    private const TTL = 30 * 24 * 60 * 60;

    private static function secret(): string
    {
        $secret = (string) (env('customer.jwtSecret') ?? '');
        if ($secret === '') {
            $secret = (string) (env('encryption.key') ?? 'rceramica-fallback-secret');
        }

        return $secret;
    }

    private static function b64url(string $bin): string
    {
        return rtrim(strtr(base64_encode($bin), '+/', '-_'), '=');
    }

    private static function b64urlDecode(string $str): string
    {
        return (string) base64_decode(strtr($str, '-_', '+/'), true);
    }

    public static function issue(int $customerId): string
    {
        $payload = json_encode(['cid' => $customerId, 'exp' => time() + self::TTL]);
        $body    = self::b64url($payload);
        $sig     = self::b64url(hash_hmac('sha256', $body, self::secret(), true));

        return $body . '.' . $sig;
    }

    /** Returns the customer id if the token is valid & unexpired, else null. */
    public static function verify(string $token): ?int
    {
        $parts = explode('.', $token);
        if (count($parts) !== 2) {
            return null;
        }
        [$body, $sig] = $parts;

        $expected = self::b64url(hash_hmac('sha256', $body, self::secret(), true));
        if (! hash_equals($expected, $sig)) {
            return null;
        }

        $payload = json_decode(self::b64urlDecode($body), true);
        if (! is_array($payload) || empty($payload['cid']) || empty($payload['exp'])) {
            return null;
        }
        if ((int) $payload['exp'] < time()) {
            return null;
        }

        return (int) $payload['cid'];
    }

    /** Extract & verify a bearer token from the Authorization header. */
    public static function fromRequest($request): ?int
    {
        $header = $request->getHeaderLine('Authorization');
        if (stripos($header, 'Bearer ') !== 0) {
            return null;
        }

        return self::verify(trim(substr($header, 7)));
    }
}
