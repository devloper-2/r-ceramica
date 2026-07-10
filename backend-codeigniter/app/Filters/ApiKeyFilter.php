<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * Guards the public read-only content API (/api/v1/*).
 *
 * The Next.js build sends the shared secret in the `X-API-Key` header.
 * Constant-time comparison avoids timing attacks. This is intentionally
 * simple: the API only exposes read-only, publishable content.
 */
class ApiKeyFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $expected = (string) (env('app.contentApiKey') ?? '');
        $provided = (string) ($request->getHeaderLine('X-API-Key') ?: '');

        if ($expected === '' || ! hash_equals($expected, $provided)) {
            return service('response')
                ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED)
                ->setJSON([
                    'error'   => 'unauthorized',
                    'message' => 'A valid X-API-Key header is required.',
                ]);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // no-op
    }
}
