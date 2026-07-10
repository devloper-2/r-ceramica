<?php

namespace App\Database\Seeds;

use App\Models\SettingModel;
use CodeIgniter\Database\Seeder;

/**
 * Migrates site-wide metadata from the former frontend source of truth
 * (frontend-nextjs/src/config/site.ts + navigation.ts footer links).
 */
class SettingsSeeder extends Seeder
{
    public function run()
    {
        $settings = model(SettingModel::class);

        $data = [
            'site' => [
                'name'             => 'R Ceramica',
                'tagline'          => 'Redefining Spaces',
                'url'              => 'https://rceramica.com',
                'description'      => 'R Ceramica — premium porcelain and ceramic surfaces. Explore our collection of architectural tiles, luxury bathrooms, and innovative sanitaryware.',
                'shortDescription' => 'Premium porcelain and ceramic surfaces for architectural excellence.',
                'keywords'         => ['porcelain tiles', 'ceramic surfaces', 'luxury tiles', 'bathroom fixtures', 'architectural surfaces', 'R Ceramica'],
            ],
            'contact' => [
                'phone'    => '+91-94274-10127',
                'whatsapp' => '+919427410127',
                'email'    => 'info@rceramica.com',
            ],
            'address' => [
                'street'      => 'Opp. Ceramic City, 8-A National Highway',
                'city'        => 'Morbi',
                'state'       => 'Gujarat',
                'postalCode'  => '363642',
                'country'     => 'IN',
                'countryFull' => 'India',
            ],
            'socials' => [
                'instagram' => 'https://www.instagram.com/rceramica',
                'facebook'  => 'https://www.facebook.com/rceramica',
            ],
            'branding' => [
                'logo'    => null,
                'ogImage' => '/og-image.jpg',
            ],
            'footer' => [
                'quickLinks' => [
                    ['label' => 'Explore', 'href' => '/explore'],
                    ['label' => 'Products', 'href' => '/products'],
                    ['label' => 'Bathrooms', 'href' => '/bathrooms'],
                    ['label' => 'Catalogue', 'href' => '/catalogue'],
                    ['label' => 'Contact Us', 'href' => '/contact'],
                ],
                'corporateLinks' => [
                    ['label' => 'Our Story', 'href' => '/about'],
                    ['label' => 'Chairman Message', 'href' => '/about'],
                    ['label' => 'News & Media', 'href' => '/contact'],
                    ['label' => 'Career', 'href' => '/contact'],
                ],
            ],
            'languages' => [
                ['code' => 'EN', 'label' => 'English'],
                ['code' => 'FR', 'label' => 'Français'],
                ['code' => 'IT', 'label' => 'Italiano'],
            ],
        ];

        foreach ($data as $key => $value) {
            $settings->put($key, $value);
        }
    }
}
