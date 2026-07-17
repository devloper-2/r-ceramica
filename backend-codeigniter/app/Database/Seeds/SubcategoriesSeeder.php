<?php

namespace App\Database\Seeds;

use App\Models\CategoryModel;
use App\Models\MediaModel;
use App\Models\ProductImageModel;
use App\Models\ProductModel;
use App\Models\SubcategoryModel;
use CodeIgniter\Database\Seeder;

/**
 * Seeds subcategories under each canonical category, then wires the existing
 * sample products to a subcategory and adds a few more so the product-listing
 * pages have real rows with images. Idempotent (upsert by category+slug / slug).
 */
class SubcategoriesSeeder extends Seeder
{
    /** category slug => [ [sub slug, sub name, image], ... ] */
    private const TREE = [
        'tiles' => [
            ['floor-tiles', 'Floor Tiles', 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=1200'],
            ['wall-tiles', 'Wall Tiles', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200'],
            ['large-format-slabs', 'Large Format Slabs', 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&q=80&w=1200'],
        ],
        'showers' => [
            ['rain-showers', 'Rain Showers', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=1200'],
            ['hand-showers', 'Hand Showers', 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=1200'],
            ['shower-panels', 'Shower Panels', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200'],
        ],
        'faucets' => [
            ['basin-mixers', 'Basin Mixers', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200'],
            ['wall-mixers', 'Wall Mixers', 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200'],
            ['sensor-taps', 'Sensor Taps', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1200'],
        ],
        'sanitaryware' => [
            ['water-closets', 'Water Closets', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200'],
            ['wall-hung-wc', 'Wall-Hung WC', 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1200'],
            ['urinals', 'Urinals', 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=1200'],
        ],
        'basins' => [
            ['vessel-basins', 'Vessel Basins', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200'],
            ['countertop-basins', 'Countertop Basins', 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=1200'],
            ['wall-hung-basins', 'Wall-Hung Basins', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1200'],
        ],
        'frp-manhole' => [
            ['circular-covers', 'Circular Covers', 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&q=80&w=1200'],
            ['rectangular-covers', 'Rectangular Covers', 'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&q=80&w=1200'],
            ['heavy-duty-covers', 'Heavy-Duty Covers', 'https://images.unsplash.com/photo-1581093458791-9d09a5c0f5b1?auto=format&fit=crop&q=80&w=1200'],
        ],
    ];

    public function run()
    {
        $categories    = model(CategoryModel::class);
        $subcategories = model(SubcategoryModel::class);
        $products      = model(ProductModel::class);
        $media         = model(MediaModel::class);
        $productImages = model(ProductImageModel::class);

        // ── 1. Subcategories ────────────────────────────────────────────────
        $subId = []; // "cat/sub" => id
        foreach (self::TREE as $catSlug => $subs) {
            $cat = $categories->where('slug', $catSlug)->first();
            if (! $cat) {
                continue;
            }
            foreach ($subs as $sort => [$slug, $name, $image]) {
                $existing = $subcategories
                    ->where('category_id', $cat['id'])
                    ->where('slug', $slug)
                    ->first();
                $data = [
                    'category_id' => $cat['id'],
                    'slug'        => $slug,
                    'name'        => $name,
                    'subtitle'    => $name . ' collection',
                    'image'       => $image,
                    'sort_order'  => $sort,
                    'status'      => 'published',
                ];
                if ($existing) {
                    $subcategories->update($existing['id'], $data);
                    $subId["$catSlug/$slug"] = (int) $existing['id'];
                } else {
                    $subId["$catSlug/$slug"] = (int) $subcategories->insert($data, true);
                }
            }
        }

        // ── 2. Re-home the 4 pre-existing sample products ───────────────────
        $remap = [
            'calcite-flow-slab'   => 'tiles/large-format-slabs',
            'petra-vessel-basin'  => 'basins/vessel-basins',
            'obsidian-mono-basin' => 'basins/vessel-basins',
            'luxe-chrome-mixer'   => 'faucets/basin-mixers',
        ];
        foreach ($remap as $productSlug => $key) {
            if (! isset($subId[$key])) {
                continue;
            }
            $p = $products->where('slug', $productSlug)->first();
            if ($p) {
                $sub = $subcategories->find($subId[$key]);
                $products->update($p['id'], [
                    'subcategory_id' => $subId[$key],
                    'category_id'    => $sub['category_id'],
                ]);
            }
        }

        // ── 3. A few extra sample products so more subcategories are populated ─
        $extra = [
            ['tiles/floor-tiles', 'terra-matte-floor-tile', 'Terra Matte Floor Tile', 6499,
                'R11 anti-slip matte porcelain floor tile.',
                'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=1200'],
            ['tiles/wall-tiles', 'linen-glaze-wall-tile', 'Linen Glaze Wall Tile', 4299,
                'Soft-glaze ceramic wall tile with a woven texture.',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200'],
            ['showers/rain-showers', 'aqua-halo-rain-shower', 'Aqua Halo Rain Shower', 18999,
                'Ceiling-mount rainfall shower head with air-infusion jets.',
                'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=1200'],
            ['faucets/sensor-taps', 'pulse-sensor-tap', 'Pulse Sensor Tap', 15499,
                'Touch-free infrared sensor basin tap in brushed steel.',
                'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1200'],
            ['sanitaryware/water-closets', 'aeon-rimless-wc', 'Aeon Rimless Water Closet', 21999,
                'Rimless one-piece WC with tornado flush technology.',
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200'],
            ['frp-manhole/circular-covers', 'endura-circular-cover', 'Endura Circular Manhole Cover', 8999,
                'D400 load-rated circular FRP manhole cover.',
                'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&q=80&w=1200'],
        ];

        foreach ($extra as [$key, $slug, $name, $price, $short, $image]) {
            if (! isset($subId[$key]) || $products->where('slug', $slug)->first()) {
                continue;
            }
            $sub       = $subcategories->find($subId[$key]);
            $productId = $products->insert([
                'slug'              => $slug,
                'name'              => $name,
                'short_description' => $short,
                'description'       => $short,
                'price'             => $price,
                'currency'          => 'INR',
                'category_id'       => $sub['category_id'],
                'subcategory_id'    => $subId[$key],
                'meta_title'        => $name . ' — R Ceramica',
                'meta_description'  => $short,
                'status'            => 'published',
            ], true);

            $mediaId = $media->insert([
                'filename' => basename(parse_url($image, PHP_URL_PATH) ?: 'image.jpg'),
                'path'     => $image,
                'alt_text' => $name,
                'folder'   => 'products',
                'mime'     => 'image/jpeg',
            ], true);

            $productImages->insert([
                'product_id' => $productId,
                'media_id'   => $mediaId,
                'sort_order' => 0,
                'is_primary' => 1,
            ]);
        }
    }
}
