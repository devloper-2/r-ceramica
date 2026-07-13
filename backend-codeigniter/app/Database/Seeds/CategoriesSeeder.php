<?php

namespace App\Database\Seeds;

use App\Models\CategoryModel;
use CodeIgniter\Database\Seeder;

/**
 * Seeds the 6 canonical Explore categories (mirrors the former hardcoded
 * frontend-nextjs/src/lib/constants/explore.ts) with admin content + a hero for
 * each subcategory landing page. Idempotent: upserts by slug and demotes any
 * other pre-existing category to draft so Explore shows only these six.
 */
class CategoriesSeeder extends Seeder
{
    public function run()
    {
        $categories = model(CategoryModel::class);

        $rows = [
            [
                'slug' => 'tiles', 'name' => 'Tiles', 'sort_order' => 0,
                'title' => 'Architectural', 'subtitle' => 'Surfaces',
                'description' => 'Curated porcelain systems for high-envelope architecture.',
                'image' => 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1600',
                'hero_eyebrow' => 'Heritage Collection', 'hero_title' => 'Architectural Surfaces',
                'hero_subtitle' => 'Curated porcelain systems engineered for high-envelope architecture and enduring design.',
                'hero_image' => 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1600',
            ],
            [
                'slug' => 'showers', 'name' => 'Showers', 'sort_order' => 1,
                'title' => 'Luxury', 'subtitle' => 'Showers',
                'description' => 'Advanced hydro-therapy systems designed for the ultimate wellness experience.',
                'image' => 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=1600',
                'hero_eyebrow' => 'Designer Range', 'hero_title' => 'Luxury Showers',
                'hero_subtitle' => 'Advanced hydro-therapy systems designed for the ultimate wellness experience.',
                'hero_image' => 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=1600',
            ],
            [
                'slug' => 'faucets', 'name' => 'Faucets', 'sort_order' => 2,
                'title' => 'Artisan', 'subtitle' => 'Faucets',
                'description' => 'Precision engineered hardware at the intersection of fluid dynamics and sculpture.',
                'image' => 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600',
                'hero_eyebrow' => 'Geometric Precision', 'hero_title' => 'Artisan Faucets',
                'hero_subtitle' => 'Precision engineered hardware defining the intersection of fluid dynamics and sculpture.',
                'hero_image' => 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600',
            ],
            [
                'slug' => 'sanitaryware', 'name' => 'Sanitaryware', 'sort_order' => 3,
                'title' => 'Sanitary', 'subtitle' => 'Form',
                'description' => 'High-performance water closets connecting ergonomic form and sustainability.',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600',
                'hero_eyebrow' => 'Hygiene Systems', 'hero_title' => 'Sanitary Form',
                'hero_subtitle' => 'High-performance water closets connecting ergonomic form and sustainability for contemporary living.',
                'hero_image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600',
            ],
            [
                'slug' => 'basins', 'name' => 'Basins', 'sort_order' => 4,
                'title' => 'Minimal', 'subtitle' => 'Basins',
                'description' => 'Hand-crafted artisan basins that redefine the morning ritual.',
                'image' => 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1600',
                'hero_eyebrow' => 'Vessel Works', 'hero_title' => 'Minimal Basins',
                'hero_subtitle' => 'Hand-crafted artisan basins that redefine the morning ritual through stone and ceramic textures.',
                'hero_image' => 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1600',
            ],
            [
                'slug' => 'frp-manhole', 'name' => 'FRP Manhole', 'sort_order' => 5,
                'title' => 'FRP', 'subtitle' => 'Manhole',
                'description' => 'A blend of durability and sustainable performance.',
                'image' => 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&q=80&w=1600',
                'hero_eyebrow' => 'Infrastructural', 'hero_title' => 'FRP Manhole Covers',
                'hero_subtitle' => 'Fibre-reinforced covers blending structural durability with sustainable performance.',
                'hero_image' => 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&q=80&w=1600',
            ],
        ];

        $canonical = [];
        foreach ($rows as $row) {
            $row['status'] = 'published';
            $existing      = $categories->where('slug', $row['slug'])->first();
            if ($existing) {
                $categories->update($existing['id'], $row);
            } else {
                $categories->insert($row);
            }
            $canonical[] = $row['slug'];
        }

        // Hide any legacy categories (e.g. bathrooms/accessories from the earlier
        // ProductsSeeder) so the Explore grid shows only the canonical six.
        $categories->whereNotIn('slug', $canonical)->set('status', 'draft')->update();
    }
}
