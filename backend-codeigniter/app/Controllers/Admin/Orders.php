<?php

namespace App\Controllers\Admin;

use App\Models\OrderItemModel;
use App\Models\OrderModel;

class Orders extends BaseAdminController
{
    private const STATUSES = ['pending', 'paid', 'processing', 'shipped', 'transit', 'delivered', 'cancelled', 'refunded'];

    public function index(): string
    {
        $orders = model(OrderModel::class)->orderBy('created_at', 'DESC')->findAll();

        return $this->render('orders/index', ['orders' => $orders], 'orders');
    }

    public function show(int $id): string
    {
        $order = model(OrderModel::class)->find($id);
        if (! $order) {
            return $this->index();
        }
        $items = model(OrderItemModel::class)->forOrder($id);

        return $this->render('orders/show', [
            'order'    => $order,
            'items'    => $items,
            'statuses' => self::STATUSES,
        ], 'orders');
    }

    public function updateStatus(int $id)
    {
        $status = (string) $this->request->getPost('status');
        if (! in_array($status, self::STATUSES, true)) {
            return redirect()->to('/admin/orders/' . $id)->with('error', 'Invalid status.');
        }
        model(OrderModel::class)->update($id, ['status' => $status]);
        $this->audit->log('order_status:' . $status, 'orders', $id);

        return redirect()->to('/admin/orders/' . $id)->with('success', 'Order status updated.');
    }
}
