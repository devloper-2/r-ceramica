<?php

namespace App\Database\Seeds;

use App\Models\CatalogueModel;
use CodeIgniter\Database\Seeder;

/**
 * Seeds the 8 catalogue entries formerly hardcoded in
 * frontend-nextjs/src/pages/catalogue.tsx. Idempotent by slug.
 */
class CatalogueSeeder extends Seeder
{
    public function run()
    {
        $model = model(CatalogueModel::class);

        $rows = [
            [
                'slug' => 'master-collection-2024', 'title' => 'Master', 'title_line2' => 'Collection 2024',
                'eyebrow' => 'Complete Collection', 'sub' => 'Tiles · Bathrooms · Kitchen · Accessories',
                'pages' => 148, 'size' => '24 MB', 'badge_label' => 'New Edition', 'badge_gold' => 1,
                'spine_gold' => 1, 'spine_label' => 'R Ceramica · 2024',
                'image' => 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800',
                'img_opacity' => 50, 'availability' => 'green', 'avail_label' => 'Available',
                'tags' => ['all', 'tiles', 'bathroom', 'kitchen', 'slabs', 'outdoor', 'technical'], 'technical' => 0,
            ],
            [
                'slug' => 'architectural-tiles', 'title' => 'Architectural', 'title_line2' => 'Tiles',
                'eyebrow' => 'Surface Studio', 'sub' => 'Floor · Wall · Large Format · Mosaic',
                'pages' => 96, 'size' => '18 MB', 'spine_label' => 'R Ceramica · Tiles',
                'image' => 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
                'img_opacity' => 50, 'availability' => 'green', 'avail_label' => 'Available',
                'tags' => ['tiles'], 'technical' => 0,
            ],
            [
                'slug' => 'bathroom-collection', 'title' => 'Bathroom', 'title_line2' => 'Collection',
                'eyebrow' => 'Sanctuary Series', 'sub' => 'Faucets · Showers · Basins · Accessories',
                'pages' => 112, 'size' => '21 MB', 'badge_label' => 'Updated', 'spine_label' => 'R Ceramica · Bath',
                'image' => 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800',
                'img_opacity' => 50, 'availability' => 'green', 'avail_label' => 'Available',
                'tags' => ['bathroom'], 'technical' => 0,
            ],
            [
                'slug' => 'kitchen-concepts', 'title' => 'Kitchen', 'title_line2' => 'Concepts',
                'eyebrow' => 'Culinary Studio', 'sub' => 'Counter Tops · Backsplash · Sinks',
                'pages' => 64, 'size' => '12 MB', 'spine_label' => 'R Ceramica · Kitchen',
                'image' => 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800',
                'img_opacity' => 50, 'availability' => 'green', 'avail_label' => 'Available',
                'tags' => ['kitchen'], 'technical' => 0,
            ],
            [
                'slug' => 'large-format-slabs', 'title' => 'Large Format', 'title_line2' => 'Slabs',
                'eyebrow' => 'Monolith Series', 'sub' => '1200×2400 · 1600×3200 · Bookmatch',
                'pages' => 80, 'size' => '32 MB', 'badge_label' => 'Exclusive', 'badge_gold' => 1,
                'spine_gold' => 1, 'spine_label' => 'R Ceramica · Slabs',
                'image' => 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800',
                'img_opacity' => 50, 'availability' => 'green', 'avail_label' => 'Available',
                'tags' => ['slabs', 'tiles'], 'technical' => 0,
            ],
            [
                'slug' => 'outdoor-porcelain', 'title' => 'Outdoor', 'title_line2' => 'Porcelain',
                'eyebrow' => 'Terrace & Garden', 'sub' => 'R11 Anti-Slip · Pool Copings · Pavers',
                'pages' => 72, 'size' => '15 MB', 'spine_label' => 'R Ceramica · Outdoor',
                'image' => 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
                'img_opacity' => 50, 'availability' => 'green', 'avail_label' => 'Available',
                'tags' => ['outdoor', 'tiles'], 'technical' => 0,
            ],
            [
                'slug' => 'technical-data-sheets', 'title' => 'Technical', 'title_line2' => 'Data Sheets',
                'eyebrow' => 'Engineering Specs', 'sub' => 'ISO Ratings · Certifications · Dimensions',
                'pages' => 48, 'size' => '8 MB', 'spine_label' => 'R Ceramica · Technical',
                'image' => 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800',
                'img_opacity' => 30, 'availability' => 'green', 'avail_label' => 'Available',
                'tags' => ['technical'], 'technical' => 1,
            ],
            [
                'slug' => 'lookbook-2024', 'title' => 'Lookbook', 'title_line2' => '2024',
                'eyebrow' => 'Visual Inspiration', 'sub' => 'Lifestyle · Interiors · Project Showcase',
                'pages' => 56, 'size' => '28 MB', 'badge_label' => 'Limited', 'spine_gold' => 1,
                'spine_label' => 'R Ceramica · Look',
                'image' => 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&q=80&w=800',
                'img_opacity' => 50, 'availability' => 'yellow', 'avail_label' => 'Limited Run',
                'tags' => ['all'], 'technical' => 0,
            ],
        ];

        foreach ($rows as $sort => $row) {
            $row['sort_order'] = $sort;
            $row['status']     = 'published';
            $existing          = $model->where('slug', $row['slug'])->first();
            if ($existing) {
                $model->update($existing['id'], $row);
            } else {
                $model->insert($row);
            }
        }
    }
}
