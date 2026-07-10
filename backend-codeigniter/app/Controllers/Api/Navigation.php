<?php

namespace App\Controllers\Api;

use App\Models\NavModel;
use CodeIgniter\HTTP\ResponseInterface;

class Navigation extends BaseApiController
{
    /** GET /api/v1/navigation — active nav links as a nested tree. */
    public function index(): ResponseInterface
    {
        return $this->ok(model(NavModel::class)->tree());
    }
}
