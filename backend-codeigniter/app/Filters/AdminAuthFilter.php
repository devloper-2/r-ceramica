<?php

namespace App\Filters;

use App\Controllers\Admin\Auth;
use App\Models\AdminUserModel;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * Gate for the whole /admin area.
 *
 * Authentication order:
 *  1. Active session → pass through (update last_active).
 *  2. No session but valid remember-me cookie → restore session and pass.
 *  3. Neither → redirect to login.
 *
 * Idle timeout (30 min) is skipped for remembered sessions so the user
 * is not forced to re-login while the 30-day cookie is still valid.
 */
class AdminAuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $session = session();

        // ── 1. Live session ──────────────────────────────────────────────────
        if ($session->get('admin_id')) {
            // Idle timeout: skip for remembered sessions.
            if (! $session->get('admin_remembered')) {
                $last = (int) $session->get('admin_last_active');
                if ($last && (time() - $last) > 1800) {
                    $session->destroy();
                    return redirect()->to('/admin/login')->with('error', 'Session expired. Please sign in again.');
                }
            }
            $session->set('admin_last_active', time());
            return;
        }

        // ── 2. Remember-me cookie ────────────────────────────────────────────
        $cookie = service('request')->getCookie('rc_adm_rm');
        if ($cookie) {
            $adminId = Auth::validateRememberToken($cookie);
            if ($adminId) {
                $user = model(AdminUserModel::class)->find($adminId);
                if ($user) {
                    $session->regenerate(true);
                    $session->set([
                        'admin_id'          => (int) $user['id'],
                        'admin_name'        => $user['name'],
                        'admin_email'       => $user['email'],
                        'admin_role'        => $user['role'],
                        'admin_last_active' => time(),
                        'admin_remembered'  => true,
                    ]);
                    return; // proceed
                }
            }

            // Invalid or expired cookie — clear it.
            setcookie('rc_adm_rm', '', [
                'expires'  => time() - 3600,
                'path'     => '/',
                'secure'   => true,
                'httponly' => true,
                'samesite' => 'Lax',
            ]);
        }

        // ── 3. Not authenticated ─────────────────────────────────────────────
        $session->setFlashdata('error', 'Please sign in to continue.');
        return redirect()->to('/admin/login');
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // no-op
    }
}
