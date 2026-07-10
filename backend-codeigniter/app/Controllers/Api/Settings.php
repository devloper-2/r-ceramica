<?php

namespace App\Controllers\Api;

use App\Models\SettingModel;
use CodeIgniter\HTTP\ResponseInterface;

class Settings extends BaseApiController
{
    /** GET /api/v1/settings — global site settings as a key => value map. */
    public function index(): ResponseInterface
    {
        return $this->ok(model(SettingModel::class)->map());
    }
}
