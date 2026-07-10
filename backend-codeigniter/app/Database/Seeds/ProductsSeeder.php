<?php

namespace App\Database\Seeds;

use App\Models\CategoryModel;
use App\Models\MediaModel;
use App\Models\ProductImageModel;
use App\Models\ProductModel;
use CodeIgniter\Database\Seeder;

/**
 * Seeds sample catalogue data. The former frontend product service
 * (services/products.ts) was a placeholder returning [], so these give the
 * products listing + commerce flow real rows to work with. Edit/replace via admin.
 */
class ProductsSeeder extends Seeder
{
    public function run()
    {
        $categories    = model(CategoryModel::class);
        $products      = model(ProductModel::class);
        $media         = model(MediaModel::class);
        $productImages = model(ProductImageModel::class);

        if ($products->countAll() > 0) {
            return;
        }

        // ── Categories ───────────────────────────────────────────────────────
        $catId = [];
        foreach ([
            ['slug' => 'tiles', 'name' => 'Tiles', 'sort_order' => 0],
            ['slug' => 'bathrooms', 'name' => 'Bathrooms', 'sort_order' => 1],
            ['slug' => 'accessories', 'name' => 'Accessories', 'sort_order' => 2],
        ] as $c) {
            $catId[$c['slug']] = $categories->insert($c, true);
        }

        // ── Products (with a primary image) ──────────────────────────────────
        $items = [
            [
                'slug' => 'petra-vessel-basin', 'name' => 'Petra Vessel Basin',
                'category' => 'bathrooms', 'price' => 24999,
                'short' => 'Natural granite vessel basin with a matte finish.',
                'desc' => 'Hand-finished natural granite vessel basin. Each piece carries a unique stone grain, sealed with Nano-Trek micro-pore technology for stain resistance.',
                'specs' => ['material' => 'Natural Granite', 'finish' => 'Matte', 'dimensions' => '420 × 420 × 150 mm'],
                'image' => 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
                'alt' => 'Petra vessel basin in natural granite',
            ],
            [
                'slug' => 'obsidian-mono-basin', 'name' => 'Obsidian Mono Basin',
                'category' => 'bathrooms', 'price' => 28999,
                'short' => 'Hand-carved basalt basin with a textured surface.',
                'desc' => 'Sculptural hand-carved basalt basin with a deep textured finish for a bold, monolithic bathroom statement.',
                'specs' => ['material' => 'Basalt', 'finish' => 'Textured', 'dimensions' => '460 × 460 × 160 mm'],
                'image' => 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=1200',
                'alt' => 'Obsidian mono basalt basin',
            ],
            [
                'slug' => 'calcite-flow-slab', 'name' => 'Calcite Flow Large-Format Slab',
                'category' => 'tiles', 'price' => 8999,
                'short' => 'Minimalist sandstone-look large-format porcelain slab.',
                'desc' => 'Large-format porcelain slab with a soft sandstone aesthetic. Continuum engineering allows seamless wall-to-floor transitions.',
                'specs' => ['material' => 'Porcelain', 'finish' => 'Minimalist Matte', 'dimensions' => '1200 × 2400 mm', 'thickness' => '9 mm'],
                'image' => 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&q=80&w=1200',
                'alt' => 'Calcite flow large-format porcelain slab',
            ],
            [
                'slug' => 'luxe-chrome-mixer', 'name' => 'Luxe Chrome Basin Mixer',
                'category' => 'accessories', 'price' => 12499,
                'short' => 'Premium chrome basin mixer tap.',
                'desc' => 'Precision-engineered single-lever basin mixer with a mirror chrome finish and ceramic disc cartridge.',
                'specs' => ['material' => 'Brass / Chrome', 'finish' => 'Polished Chrome', 'warranty' => '10 years'],
                'image' => 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200',
                'alt' => 'Luxe chrome basin mixer tap',
            ],
        ];

        foreach ($items as $sort => $item) {
            $productId = $products->insert([
                'slug'              => $item['slug'],
                'name'              => $item['name'],
                'short_description' => $item['short'],
                'description'       => $item['desc'],
                'price'             => $item['price'],
                'currency'          => 'INR',
                'specs'             => $item['specs'],
                'category_id'       => $catId[$item['category']],
                'meta_title'        => $item['name'] . ' — R Ceramica',
                'meta_description'  => $item['short'],
                'status'            => 'published',
            ], true);

            $mediaId = $media->insert([
                'filename' => basename(parse_url($item['image'], PHP_URL_PATH) ?: 'image.jpg'),
                'path'     => $item['image'],
                'alt_text' => $item['alt'],
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
