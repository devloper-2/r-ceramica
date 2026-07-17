<?php

namespace App\Controllers\Api;

use App\Models\CategoryModel;
use CodeIgniter\HTTP\ResponseInterface;

class Categories extends BaseApiController
{
    /** GET /api/v1/categories — published categories for the Explore grid. */
    public function index(): ResponseInterface
    {
        $categories = model(CategoryModel::class)
            ->select('id, slug, name, title, subtitle, description, image, hero_eyebrow, hero_image')
            ->where('status', 'published')
            ->orderBy('sort_order', 'ASC')
            ->orderBy('name', 'ASC')
            ->findAll();

        return $this->ok($categories, ['count' => count($categories)]);
    }

    /**
     * GET /api/v1/categories/{slug} — a published category (with hero fields)
     * and its published subcategories. Powers the subcategory landing page.
     */
    public function show(string $slug): ResponseInterface
    {
        $category = model(CategoryModel::class)->getWithSubcategories($slug, true);

        if (! $category) {
            return $this->notFound("Category '{$slug}' not found or not published.");
        }

        return $this->ok($category);
    }
}
