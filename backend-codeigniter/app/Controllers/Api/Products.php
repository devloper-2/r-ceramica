<?php

namespace App\Controllers\Api;

use App\Models\ProductModel;
use CodeIgniter\HTTP\ResponseInterface;

class Products extends BaseApiController
{
    /** GET /api/v1/products — published products (optionally ?category=slug). */
    public function index(): ResponseInterface
    {
        $model = model(ProductModel::class)
            ->select('products.id, products.slug, products.name, products.short_description, products.price, products.currency, products.status, categories.slug AS category, categories.name AS category_name')
            ->join('categories', 'categories.id = products.category_id', 'left')
            ->where('products.status', 'published');

        $category = $this->request->getGet('category');
        if ($category) {
            $model->where('categories.slug', $category);
        }

        $products = $model->orderBy('products.created_at', 'DESC')->findAll();

        // Attach the primary image path to each product.
        $imageModel = model(\App\Models\ProductImageModel::class);
        foreach ($products as &$p) {
            $images = $imageModel->forProduct((int) $p['id']);
            $p['image'] = $images[0]['path'] ?? null;
            $p['price'] = (float) $p['price'];
        }

        return $this->ok($products, ['count' => count($products)]);
    }

    /** GET /api/v1/products/{slug} — single published product with all images. */
    public function show(string $slug): ResponseInterface
    {
        $product = model(ProductModel::class)->getWithImages($slug, true);

        if (! $product) {
            return $this->notFound("Product '{$slug}' not found or not published.");
        }

        return $this->ok($product);
    }
}
