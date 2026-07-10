<?php

namespace App\Libraries;

use App\Models\ProductModel;

/**
 * Server-authoritative cart pricing.
 *
 * SECURITY: prices are ALWAYS looked up from the database by product id/slug.
 * The client only sends which products and quantities — never prices — so a
 * tampered request cannot change what the customer is charged.
 */
class Cart
{
    /** @var array<int,array{product_id:int,product_name:string,unit_price:float,quantity:int,line_total:float}> */
    public array $items = [];
    public float $subtotal = 0.0;
    public string $currency = 'INR';

    /**
     * @param array<int,array{id?:int|string, slug?:string, quantity?:int|string}> $rawItems
     */
    public function build(array $rawItems): self
    {
        $model = model(ProductModel::class);

        foreach ($rawItems as $raw) {
            $qty = max(1, (int) ($raw['quantity'] ?? 1));

            $product = null;
            if (! empty($raw['id'])) {
                $product = $model->where('status', 'published')->find((int) $raw['id']);
            } elseif (! empty($raw['slug'])) {
                $product = $model->where('status', 'published')->where('slug', $raw['slug'])->first();
            }
            if (! $product) {
                continue; // silently skip unknown/unpublished products
            }

            $unit      = (float) $product['price'];
            $lineTotal = $unit * $qty;

            $this->items[] = [
                'product_id'   => (int) $product['id'],
                'product_name' => $product['name'],
                'unit_price'   => $unit,
                'quantity'     => $qty,
                'line_total'   => $lineTotal,
            ];
            $this->subtotal += $lineTotal;
            $this->currency = $product['currency'] ?: 'INR';
        }

        return $this;
    }

    public function isEmpty(): bool
    {
        return $this->items === [];
    }

    /** Grand total (no shipping/tax for now — extend here as needed). */
    public function total(): float
    {
        return $this->subtotal;
    }

    /** Total in the smallest currency unit (paise) for Razorpay. */
    public function amountMinor(): int
    {
        return (int) round($this->total() * 100);
    }
}
