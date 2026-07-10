<?php

namespace App\Controllers\Admin;

use App\Models\OrderModel;
use App\Models\PageModel;
use App\Models\ProductModel;

class Dashboard extends BaseAdminController
{
    public function index(): string
    {
        $stats = [
            'pages'          => model(PageModel::class)->countAll(),
            'products'       => model(ProductModel::class)->countAll(),
            'orders'         => model(OrderModel::class)->countAll(),
            'pending_orders' => model(OrderModel::class)->where('status', 'pending')->countAllResults(),
        ];

        return $this->render('dashboard', ['stats' => $stats], 'dashboard');
    }
}
