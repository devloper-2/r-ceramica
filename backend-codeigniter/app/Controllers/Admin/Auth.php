<?php

namespace App\Controllers\Admin;

use App\Libraries\Audit;
use App\Models\AdminUserModel;
use CodeIgniter\Controller;
use Config\Services;

/**
 * Admin authentication: login / logout.
 *
 * Defense in depth:
 *  - bcrypt password verification (password_verify)
 *  - per-IP rate limiting via CI4 Throttler (blunt brute-force)
 *  - per-account lockout after repeated failures (failed_attempts/locked_until)
 *  - session ID regeneration on login (prevents fixation)
 *  - generic error messages (no user enumeration)
 *  - audit logging of login success/failure/logout
 */
class Auth extends Controller
{
    private const MAX_ATTEMPTS = 5;
    private const LOCK_MINUTES  = 15;

    public function login()
    {
        helper(['form', 'url']);

        if (session()->get('admin_id')) {
            return redirect()->to('/admin');
        }

        return view('admin/login');
    }

    public function attempt()
    {
        helper(['form', 'url']);

        // Per-IP throttle: max 10 attempts/minute.
        $throttler = Services::throttler();
        if ($throttler->check(md5('admin-login-' . service('request')->getIPAddress()), 10, MINUTE) === false) {
            return redirect()->back()->with('error', 'Too many attempts. Please wait a minute and try again.');
        }

        $rules = [
            'email'    => 'required|valid_email',
            'password' => 'required|string',
        ];
        if (! $this->validate($rules)) {
            return redirect()->back()->withInput()->with('error', 'Invalid email or password.');
        }

        $email = (string) $this->request->getPost('email');
        $password = (string) $this->request->getPost('password');

        $model = model(AdminUserModel::class);
        $user  = $model->findByEmail($email);
        $audit = new Audit();

        // Generic failure (no enumeration) for unknown user.
        if (! $user) {
            $audit->log('login_failed:unknown', 'admin_users', null);

            return redirect()->back()->withInput()->with('error', 'Invalid email or password.');
        }

        // Account locked?
        if (! empty($user['locked_until']) && strtotime($user['locked_until']) > time()) {
            return redirect()->back()->with('error', 'Account temporarily locked. Try again later.');
        }

        // Wrong password → increment failures, maybe lock.
        if (! password_verify($password, $user['password_hash'])) {
            $attempts = (int) $user['failed_attempts'] + 1;
            $update   = ['failed_attempts' => $attempts];
            if ($attempts >= self::MAX_ATTEMPTS) {
                $update['locked_until']   = date('Y-m-d H:i:s', time() + self::LOCK_MINUTES * 60);
                $update['failed_attempts'] = 0;
            }
            $model->update($user['id'], $update);
            $audit->log('login_failed:badpass', 'admin_users', (int) $user['id']);

            return redirect()->back()->withInput()->with('error', 'Invalid email or password.');
        }

        // Success → reset counters, regenerate session, store identity.
        $model->update($user['id'], [
            'failed_attempts' => 0,
            'locked_until'    => null,
            'last_login_at'   => date('Y-m-d H:i:s'),
        ]);

        $session = session();
        $session->regenerate(true);
        $session->set([
            'admin_id'          => (int) $user['id'],
            'admin_name'        => $user['name'],
            'admin_email'       => $user['email'],
            'admin_role'        => $user['role'],
            'admin_last_active' => time(),
        ]);

        $audit->log('login_success', 'admin_users', (int) $user['id']);

        return redirect()->to('/admin');
    }

    public function logout()
    {
        (new Audit())->log('logout', 'admin_users', (int) session()->get('admin_id'));
        session()->destroy();

        return redirect()->to('/admin/login')->with('success', 'You have been signed out.');
    }
}
