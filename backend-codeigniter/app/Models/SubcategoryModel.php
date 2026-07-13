<?php

namespace App\Models;

use CodeIgniter\Model;

class SubcategoryModel extends Model
{
    protected $table         = 'subcategories';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = true;
    protected $allowedFields = [
        'category_id', 'slug', 'name', 'subtitle', 'description', 'image',
        'sort_order', 'status',
    ];

    /** All subcategories for a category (admin: all statuses). */
    public function forCategory(int $categoryId, bool $publishedOnly = false): array
    {
        $builder = $this->where('category_id', $categoryId);
        if ($publishedOnly) {
            $builder->where('status', 'published');
        }

        return $builder->orderBy('sort_order', 'ASC')->orderBy('name', 'ASC')->findAll();
    }

    /**
     * A subcategory by slug, joined to its parent category, plus its published
     * products. Used by the /api/v1/subcategories/{slug} endpoint.
     */
    public function getWithProducts(string $slug, bool $publishedOnly = true): ?array
    {
        $builder = $this->select('subcategories.*, categories.slug AS category_slug, categories.name AS category_name, categories.title AS category_title')
            ->join('categories', 'categories.id = subcategories.category_id', 'left')
            ->where('subcategories.slug', $slug);
        if ($publishedOnly) {
            $builder->where('subcategories.status', 'published');
        }
        $subcategory = $builder->first();
        if (! $subcategory) {
            return null;
        }

        $productModel = model(ProductModel::class);
        $products     = $productModel
            ->select('products.id, products.slug, products.name, products.short_description, products.price, products.currency')
            ->where('products.subcategory_id', $subcategory['id'])
            ->where('products.status', 'published')
            ->orderBy('products.created_at', 'DESC')
            ->findAll();

        $imageModel = model(ProductImageModel::class);
        foreach ($products as &$p) {
            $images     = $imageModel->forProduct((int) $p['id']);
            $p['image'] = $images[0]['path'] ?? null;
            $p['price'] = (float) $p['price'];
        }

        $subcategory['products'] = $products;

        return $subcategory;
    }
}
