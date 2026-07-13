<?php

namespace App\Controllers\Api;

use App\Models\SubcategoryModel;
use CodeIgniter\HTTP\ResponseInterface;

class Subcategories extends BaseApiController
{
    /**
     * GET /api/v1/subcategories/{slug} — a published subcategory (joined to its
     * parent category) plus its published products. Powers the per-subcategory
     * product-listing page.
     */
    public function show(string $slug): ResponseInterface
    {
        $subcategory = model(SubcategoryModel::class)->getWithProducts($slug, true);

        if (! $subcategory) {
            return $this->notFound("Subcategory '{$slug}' not found or not published.");
        }

        return $this->ok($subcategory);
    }
}
