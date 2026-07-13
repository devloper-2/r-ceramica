<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductModel extends Model
{
    protected $table            = 'products';
    protected $primaryKey       = 'id';
    protected $returnType       = 'array';
    protected $useTimestamps    = true;
    protected $allowedFields    = [
        'slug', 'name', 'short_description', 'description', 'price', 'currency',
        'specs', 'category_id', 'subcategory_id', 'meta_title', 'meta_description', 'status',
    ];

    protected array $casts = [
        'specs' => '?json-array',
        'price' => 'float',
    ];

    /** Published product by slug, with its ordered image paths + taxonomy slugs. */
    public function getWithImages(string $slug, bool $publishedOnly = true): ?array
    {
        $builder = $this->select('products.*, categories.slug AS category_slug, categories.name AS category_name, subcategories.slug AS subcategory_slug, subcategories.name AS subcategory_name')
            ->join('categories', 'categories.id = products.category_id', 'left')
            ->join('subcategories', 'subcategories.id = products.subcategory_id', 'left')
            ->where('products.slug', $slug);
        if ($publishedOnly) {
            $builder->where('products.status', 'published');
        }
        $product = $builder->first();
        if (! $product) {
            return null;
        }

        $product['images'] = model(ProductImageModel::class)->forProduct((int) $product['id']);

        return $product;
    }
}
