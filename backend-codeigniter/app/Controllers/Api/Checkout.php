<?php

namespace App\Controllers\Api;

use App\Libraries\Cart;
use App\Models\CustomerModel;
use App\Models\OrderItemModel;
use App\Models\OrderModel;
use CodeIgniter\HTTP\ResponseInterface;
use Razorpay\Api\Api as RazorpayApi;

/**
 * Browser-facing checkout. Two steps:
 *   1) order()  — server computes the real total, creates a Razorpay order,
 *                 returns the order id + amount + public key for Razorpay.js.
 *   2) verify() — after the customer pays, the browser sends the Razorpay
 *                 signature; server verifies it, then persists the order.
 *
 * These endpoints are public (no API key) but are safe because pricing is
 * server-side and payment authenticity is proven by the Razorpay signature.
 */
class Checkout extends BaseApiController
{
    private function razorpay(): ?RazorpayApi
    {
        $keyId     = (string) (env('razorpay.keyId') ?? '');
        $keySecret = (string) (env('razorpay.keySecret') ?? '');
        if ($keyId === '' || $keySecret === '') {
            return null;
        }

        return new RazorpayApi($keyId, $keySecret);
    }

    /** POST /api/v1/checkout/order  { items:[{id|slug, quantity}] } */
    public function order(): ResponseInterface
    {
        $api = $this->razorpay();
        if (! $api) {
            return $this->response->setStatusCode(503)->setJSON([
                'error' => 'payment_unconfigured', 'message' => 'Payment gateway is not configured.',
            ]);
        }

        $body  = $this->request->getJSON(true) ?? [];
        $items = $body['items'] ?? [];
        if (! is_array($items) || $items === []) {
            return $this->response->setStatusCode(422)->setJSON(['error' => 'empty_cart', 'message' => 'Cart is empty.']);
        }

        $cart = (new Cart())->build($items);
        if ($cart->isEmpty()) {
            return $this->response->setStatusCode(422)->setJSON(['error' => 'no_valid_items', 'message' => 'No purchasable items in cart.']);
        }

        try {
            $rzpOrder = $api->order->create([
                'amount'   => $cart->amountMinor(),
                'currency' => $cart->currency,
                'receipt'  => 'rcpt_' . bin2hex(random_bytes(6)),
            ]);
        } catch (\Throwable $e) {
            log_message('error', 'Razorpay order create failed: ' . $e->getMessage());

            return $this->response->setStatusCode(502)->setJSON(['error' => 'gateway_error', 'message' => 'Could not create payment order.']);
        }

        return $this->ok([
            'razorpayOrderId' => $rzpOrder['id'],
            'amount'          => $cart->amountMinor(),
            'currency'        => $cart->currency,
            'keyId'           => (string) env('razorpay.keyId'),
            'subtotal'        => $cart->total(),
            'items'           => $cart->items,
        ]);
    }

    /**
     * POST /api/v1/checkout/verify
     * {
     *   razorpay_order_id, razorpay_payment_id, razorpay_signature,
     *   items:[...], customer:{ name, email, phone }, shipping:{...}
     * }
     */
    public function verify(): ResponseInterface
    {
        $api = $this->razorpay();
        if (! $api) {
            return $this->response->setStatusCode(503)->setJSON(['error' => 'payment_unconfigured']);
        }

        $body = $this->request->getJSON(true) ?? [];
        foreach (['razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature'] as $req) {
            if (empty($body[$req])) {
                return $this->response->setStatusCode(422)->setJSON(['error' => 'missing_fields', 'message' => "Missing {$req}."]);
            }
        }

        // 1) Verify the payment signature (proves the payment is authentic).
        try {
            $api->utility->verifyPaymentSignature([
                'razorpay_order_id'   => $body['razorpay_order_id'],
                'razorpay_payment_id' => $body['razorpay_payment_id'],
                'razorpay_signature'  => $body['razorpay_signature'],
            ]);
        } catch (\Throwable $e) {
            return $this->response->setStatusCode(400)->setJSON(['error' => 'invalid_signature', 'message' => 'Payment verification failed.']);
        }

        // 2) Recompute the cart server-side (never trust the client total).
        $cart = (new Cart())->build($body['items'] ?? []);
        if ($cart->isEmpty()) {
            return $this->response->setStatusCode(422)->setJSON(['error' => 'no_valid_items']);
        }

        $customer = $body['customer'] ?? [];
        $email    = trim((string) ($customer['email'] ?? ''));
        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->response->setStatusCode(422)->setJSON(['error' => 'invalid_email', 'message' => 'A valid email is required.']);
        }

        // 3) Persist customer (upsert by email) + order + items in a transaction.
        $db = \Config\Database::connect();
        $db->transStart();

        $customerModel = model(CustomerModel::class);
        $existing      = $customerModel->findByEmail($email);
        if ($existing) {
            $customerId = (int) $existing['id'];
        } else {
            $customerId = (int) $customerModel->insert([
                'name'  => (string) ($customer['name'] ?? ''),
                'email' => $email,
                'phone' => (string) ($customer['phone'] ?? ''),
            ], true);
        }

        $orderModel = model(OrderModel::class);
        $orderId    = (int) $orderModel->insert([
            'order_number'     => $orderModel->generateOrderNumber(),
            'customer_id'      => $customerId,
            'email'            => $email,
            'phone'            => (string) ($customer['phone'] ?? ''),
            'shipping_address' => $body['shipping'] ?? null,
            'billing_address'  => $body['billing'] ?? ($body['shipping'] ?? null),
            'subtotal'         => $cart->subtotal,
            'shipping'         => 0,
            'tax'              => 0,
            'total'            => $cart->total(),
            'currency'         => $cart->currency,
            'status'           => 'paid',
            'payment_provider' => 'razorpay',
            'payment_ref'      => $body['razorpay_payment_id'],
        ], true);

        $itemModel = model(OrderItemModel::class);
        foreach ($cart->items as $it) {
            $itemModel->insert([
                'order_id'     => $orderId,
                'product_id'   => $it['product_id'],
                'product_name' => $it['product_name'],
                'unit_price'   => $it['unit_price'],
                'quantity'     => $it['quantity'],
                'line_total'   => $it['line_total'],
            ]);
        }

        $db->transComplete();

        if ($db->transStatus() === false) {
            return $this->response->setStatusCode(500)->setJSON(['error' => 'order_persist_failed', 'message' => 'Payment succeeded but order could not be saved. Contact support with your payment id.']);
        }

        $order = $orderModel->find($orderId);

        return $this->ok([
            'orderNumber' => $order['order_number'],
            'status'      => $order['status'],
            'total'       => (float) $order['total'],
            'currency'    => $order['currency'],
            'email'       => $order['email'],
        ]);
    }
}
