<?php

namespace App\Controllers\Api;

use App\Models\OrderModel;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * Browser-facing order history for the signed-in customer. Guarded by the
 * `customerauth` filter, which sets `$this->request->customerId`.
 *
 *   GET /api/v1/orders               → the customer's orders (newest first)
 *   GET /api/v1/orders/{number}      → one order + line items (ownership-checked)
 */
class Orders extends BaseApiController
{
    public function index(): ResponseInterface
    {
        $customerId = (int) ($this->request->customerId ?? 0);
        $orders     = model(OrderModel::class)->findForCustomer($customerId);

        // Trim to list-friendly fields.
        $list = array_map(static fn ($o) => [
            'order_number' => $o['order_number'],
            'status'       => $o['status'],
            'total'        => (float) $o['total'],
            'currency'     => $o['currency'],
            'created_at'   => $o['created_at'],
        ], $orders);

        return $this->ok($list, ['count' => count($list)]);
    }

    public function show(string $orderNumber): ResponseInterface
    {
        $customerId = (int) ($this->request->customerId ?? 0);
        $order      = model(OrderModel::class)->getWithItems($orderNumber, $customerId);

        if (! $order) {
            return $this->notFound("Order '{$orderNumber}' not found.");
        }

        return $this->ok($order);
    }
}
