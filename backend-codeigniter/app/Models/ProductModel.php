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
        'specs', 'category_id', 'meta_title', 'meta_description', 'status',
    ];

    protected array $casts = [
        'specs' => '?json-array',
        'price' => 'float',
    ];

    /** Published product by slug, with its ordered image paths. */
    public function getWithImages(string $slug, bool $publishedOnly = true): ?array
    {
        $builder = $this->where('slug', $slug);
        if ($publishedOnly) {
            $builder->where('status', 'published');
        }
        $product = $builder->first();
        if (! $product) {
            return null;
        }

        $product['images'] = model(ProductImageModel::class)->forProduct((int) $product['id']);

        return $product;
    }
}
