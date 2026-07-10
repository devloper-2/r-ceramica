<?php

namespace App\Database\Seeds;

use App\Models\NavModel;
use CodeIgniter\Database\Seeder;

/**
 * Migrates the primary nav from frontend-nextjs/src/lib/constants/navigation.ts (NAV_LINKS).
 */
class NavigationSeeder extends Seeder
{
    public function run()
    {
        $nav = model(NavModel::class);

        if ($nav->countAll() > 0) {
            return;
        }

        $links = [
            ['label' => 'Home', 'url' => '/'],
            ['label' => 'About Us', 'url' => '/about'],
            ['label' => 'Explore', 'url' => '/explore'],
            ['label' => 'Bathrooms', 'url' => '/bathrooms'],
            ['label' => 'Products', 'url' => '/products'],
            ['label' => 'Catalogue', 'url' => '/catalogue'],
            ['label' => 'Contact Us', 'url' => '/contact'],
        ];

        $sort = 0;
        foreach ($links as $link) {
            $nav->insert([
                'label'      => $link['label'],
                'url'        => $link['url'],
                'parent_id'  => null,
                'sort_order' => $sort++,
                'is_active'  => 1,
            ]);
        }
    }
}
