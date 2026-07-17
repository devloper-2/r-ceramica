<?php

namespace App\Database\Seeds;

use App\Models\SectionModel;
use CodeIgniter\Database\Seeder;

/** One-shot: add contactSection to the contact page (page_id=7). */
class ContactSectionSeeder extends Seeder
{
    public function run()
    {
        $sections = model(SectionModel::class);

        if ($sections->where('page_id', 7)->where('type', 'contactSection')->countAllResults() > 0) {
            echo "contactSection already exists — skipped.\n";
            return;
        }

        $sections->insert([
            'page_id'    => 7,
            'type'       => 'contactSection',
            'sort_order' => 1,
            'content'    => [
                'formTitle'       => 'Send a Message',
                'formSubtitle'    => 'Fill out the form below and an R Ceramica expert will reach out to you within 24 hours.',
                'headquarters'    => "Opp. Ceramic City, B/h. Meldi Ma Temple, Lalpar, Morbi-363642\nGujarat (INDIA)",
                'phone'           => '+91 94274 10127',
                'phone2'          => '+91 99985 28523',
                'email'           => 'info@rceramica.com',
                'officeHoursDays' => 'Mon — Sat',
                'officeHoursTime' => '09:00 AM — 07:00 PM',
                'mapEmbed'        => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.341398862413!2d70.86484401150337!3d22.810253824050278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598dcd562cce57%3A0xfc120b911b2d75ab!2sR%20CERAMICA!5e0!3m2!1sen!2sin!4v1714896000000!5m2!1sen!2sin',
                'whatsapp'        => '+919427410127',
                'offices'         => [
                    ['title' => 'Corporate Headquarters', 'address' => 'Opp. Ceramic City, Lalpar, 8-A National Highway, Morbi-363642, Gujarat, India.', 'contacts' => ['+91 94274 10127', '+91 99985 28523']],
                    ['title' => 'Experience Center',      'address' => 'Luxury Hub, S.G. Highway, Near Thaltej Cross Roads, Ahmedabad-380054, Gujarat.',  'contacts' => ['+91 98765 43210', 'info@rceramica.com']],
                    ['title' => 'International Desk',     'address' => 'Suite 1204, Architecture Tower, Business Bay, Dubai, UAE.',                        'contacts' => ['+971 50 123 4567']],
                    ['title' => 'Logistic Hub',           'address' => 'Plot 45, Port Industrial Park, Mundra SEZ, Kutch, Gujarat.',                      'contacts' => ['+91 99985 28523']],
                ],
            ],
            'is_active'  => 1,
        ]);

        echo "Inserted contactSection (id=" . $sections->getInsertID() . ")\n";
    }
}
