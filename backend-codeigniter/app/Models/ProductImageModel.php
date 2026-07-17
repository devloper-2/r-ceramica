<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductImageModel extends Model
{
    protected $table         = 'product_images';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;
    protected $allowedFields = ['product_id', 'media_id', 'sort_order', 'is_primary'];

    /** Ordered images for a product, joined to media path/alt. */
    public function forProduct(int $productId): array
    {
        return $this->select('product_images.id, product_images.sort_order, product_images.is_primary, media.path, media.alt_text, media.width, media.height')
            ->join('media', 'media.id = product_images.media_id')
            ->where('product_images.product_id', $productId)
            ->orderBy('product_images.is_primary', 'DESC')
            ->orderBy('product_images.sort_order', 'ASC')
            ->findAll();
    }
}
