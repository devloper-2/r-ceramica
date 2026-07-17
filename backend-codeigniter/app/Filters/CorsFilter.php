<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * CORS for the browser-facing storefront/commerce endpoints.
 *
 * The static frontend is served from a different origin than this API, so the
 * browser needs explicit CORS permission. Allowed origins come from
 * `app.allowedCorsOrigins` (comma-separated) in .env. Handles preflight.
 */
class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $allowed = array_map('trim', explode(',', (string) (env('app.allowedCorsOrigins') ?? '')));
        $origin  = $request->getHeaderLine('Origin');

        if ($origin !== '' && in_array($origin, $allowed, true)) {
            $response = service('response');
            $response->setHeader('Access-Control-Allow-Origin', $origin);
            $response->setHeader('Vary', 'Origin');
            $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            $response->setHeader('Access-Control-Max-Age', '3600');

            // Short-circuit preflight requests.
            if (strtoupper($request->getMethod()) === 'OPTIONS') {
                return $response->setStatusCode(ResponseInterface::HTTP_NO_CONTENT);
            }
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // headers already set in before()
    }
}
