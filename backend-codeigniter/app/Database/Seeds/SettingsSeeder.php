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
                'phone'            => '+91-94274-10127',
                'phone2'           => '+91-99985-28523',
                'whatsapp'         => '+919427410127',
                'email'            => 'info@rceramica.com',
                'headquarters'     => "Opp. Ceramic City, B/h. Meldi Ma Temple, Lalpar, Morbi-363642\nGujarat (INDIA)",
                'officeHoursDays'  => 'Mon — Sat',
                'officeHoursTime'  => '09:00 AM — 07:00 PM',
                'mapEmbed'         => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.341398862413!2d70.86484401150337!3d22.810253824050278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598dcd562cce57%3A0xfc120b911b2d75ab!2sR%20CERAMICA!5e0!3m2!1sen!2sin!4v1714896000000!5m2!1sen!2sin',
                'offices'          => [
                    [
                        'title'    => 'Corporate Headquarters',
                        'address'  => 'Opp. Ceramic City, Lalpar, 8-A National Highway, Morbi-363642, Gujarat, India.',
                        'contacts' => ['+91 94274 10127', '+91 99985 28523'],
                    ],
                    [
                        'title'    => 'Experience Center',
                        'address'  => 'Luxury Hub, S.G. Highway, Near Thaltej Cross Roads, Ahmedabad-380054, Gujarat.',
                        'contacts' => ['+91 98765 43210', 'info@rceramica.com'],
                    ],
                    [
                        'title'    => 'International Desk',
                        'address'  => 'Suite 1204, Architecture Tower, Business Bay, Dubai, UAE.',
                        'contacts' => ['+971 50 123 4567'],
                    ],
                    [
                        'title'    => 'Logistic Hub',
                        'address'  => 'Plot 45, Port Industrial Park, Mundra SEZ, Kutch, Gujarat.',
                        'contacts' => ['+91 99985 28523'],
                    ],
                ],
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
