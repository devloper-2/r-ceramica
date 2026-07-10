<?php

namespace App\Models;

use CodeIgniter\Model;

class OrderItemModel extends Model
{
    protected $table         = 'order_items';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;
    protected $allowedFields = ['order_id', 'product_id', 'product_name', 'unit_price', 'quantity', 'line_total'];

    protected array $casts = [
        'unit_price' => 'float',
        'line_total' => 'float',
    ];

    public function forOrder(int $orderId): array
    {
        return $this->where('order_id', $orderId)->findAll();
    }
}
