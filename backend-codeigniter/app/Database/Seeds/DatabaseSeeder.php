<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

/**
 * Master seeder — runs every seeder in dependency order.
 * Usage:  php spark db:seed DatabaseSeeder
 */
class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call('AdminUserSeeder');
        $this->call('SettingsSeeder');
        $this->call('NavigationSeeder');
        $this->call('PagesSeeder');
        $this->call('LegalSeeder');
        $this->call('ProductsSeeder');
        $this->call('CategoriesSeeder');
        $this->call('SubcategoriesSeeder');
        $this->call('CatalogueSeeder');
    }
}
