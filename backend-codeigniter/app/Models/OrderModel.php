<?php

namespace App\Models;

use CodeIgniter\Model;

class OrderModel extends Model
{
    protected $table            = 'orders';
    protected $primaryKey       = 'id';
    protected $returnType       = 'array';
    protected $useTimestamps    = true;
    protected $allowedFields    = [
        'order_number', 'customer_id', 'email', 'phone',
        'shipping_address', 'billing_address',
        'subtotal', 'shipping', 'tax', 'total', 'currency',
        'status', 'payment_provider', 'payment_ref', 'notes',
    ];

    protected array $casts = [
        'shipping_address' => '?json-array',
        'billing_address'  => '?json-array',
        'subtotal'         => 'float',
        'shipping'         => 'float',
        'tax'              => 'float',
        'total'            => 'float',
    ];

    public function findByNumber(string $orderNumber): ?array
    {
        return $this->where('order_number', $orderNumber)->first();
    }

    /** Generate a unique human-friendly order number, e.g. RC-20260710-A1B2C3. */
    public function generateOrderNumber(): string
    {
        do {
            $candidate = 'RC-' . date('Ymd') . '-' . strtoupper(bin2hex(random_bytes(3)));
        } while ($this->where('order_number', $candidate)->countAllResults() > 0);

        return $candidate;
    }
}
