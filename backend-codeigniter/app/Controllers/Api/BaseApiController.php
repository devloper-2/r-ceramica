<?php

namespace App\Controllers\Api;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * Base for all /api/v1 controllers. Provides a consistent JSON envelope:
 *   success → { "data": ..., "meta": {...} }
 *   error   → { "error": "slug", "message": "..." }
 */
abstract class BaseApiController extends Controller
{
    protected function ok($data, array $meta = []): ResponseInterface
    {
        return $this->response->setJSON([
            'data' => $data,
            'meta' => $meta,
        ]);
    }

    protected function notFound(string $message = 'Not found'): ResponseInterface
    {
        return $this->response
            ->setStatusCode(ResponseInterface::HTTP_NOT_FOUND)
            ->setJSON(['error' => 'not_found', 'message' => $message]);
    }
}
