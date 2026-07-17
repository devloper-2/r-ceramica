<?php

namespace App\Filters;

use App\Libraries\CustomerToken;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * Gate for browser-facing customer endpoints (orders, /auth/me). Validates the
 * `Authorization: Bearer <token>` header via CustomerToken and stashes the
 * customer id on the request as `customerId` for the controller to read.
 *
 * CORS preflight (OPTIONS) is allowed through so the storecors filter can
 * answer it before auth is required.
 */
class CustomerAuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        if (strtoupper($request->getMethod()) === 'OPTIONS') {
            return; // let CORS handle preflight
        }

        $customerId = CustomerToken::fromRequest($request);
        if ($customerId === null) {
            return service('response')
                ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED)
                ->setJSON(['error' => 'unauthenticated', 'message' => 'Please sign in to continue.']);
        }

        // Expose to the controller (read via $this->request->customerId).
        $request->customerId = $customerId;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // no-op
    }
}
