<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * Gate for the whole /admin area. If there is no authenticated admin in the
 * session, redirect to the login screen. Applied as a `before` filter to the
 * admin route group (login/authenticate routes are excluded).
 */
class AdminAuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $session = session();

        if (! $session->get('admin_id')) {
            $session->setFlashdata('error', 'Please sign in to continue.');

            return redirect()->to('/admin/login');
        }

        // Idle timeout: 30 minutes of inactivity ends the session.
        $last = (int) $session->get('admin_last_active');
        if ($last && (time() - $last) > 1800) {
            $session->destroy();

            return redirect()->to('/admin/login')->with('error', 'Session expired. Please sign in again.');
        }
        $session->set('admin_last_active', time());
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // no-op
    }
}
