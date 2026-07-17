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

    /** All orders belonging to a customer, newest first (list view). */
    public function findForCustomer(int $customerId): array
    {
        return $this->where('customer_id', $customerId)
            ->orderBy('created_at', 'DESC')
            ->findAll();
    }

    /**
     * A single order with its line items, scoped to the owning customer so one
     * customer can never read another's order. Returns null if not found/owned.
     */
    public function getWithItems(string $orderNumber, int $customerId): ?array
    {
        $order = $this->where('order_number', $orderNumber)
            ->where('customer_id', $customerId)
            ->first();
        if (! $order) {
            return null;
        }

        $order['items'] = model(OrderItemModel::class)->forOrder((int) $order['id']);

        return $order;
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
