<?php

namespace App\Controllers\Api;

use App\Models\CatalogueModel;
use CodeIgniter\HTTP\ResponseInterface;

class Catalogues extends BaseApiController
{
    /** GET /api/v1/catalogues — published catalogue entries for /catalogue. */
    public function index(): ResponseInterface
    {
        $catalogues = model(CatalogueModel::class)->published();

        return $this->ok($catalogues, ['count' => count($catalogues)]);
    }
}
