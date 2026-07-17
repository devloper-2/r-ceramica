<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

/**
 * Enriches `categories` so an admin can drive the Explore cards AND the
 * per-category subcategory-page hero from the CMS.
 *
 *  - Explore card:  title / subtitle / description / image
 *  - Subcategory-page hero: hero_eyebrow / hero_title / hero_subtitle / hero_image
 *  - status: publish gate (mirrors products/pages)
 */
class AddContentToCategories extends Migration
{
    public function up()
    {
        $fields = [
            'title'         => ['type' => 'VARCHAR', 'constraint' => 200, 'null' => true, 'after' => 'name'],
            'subtitle'      => ['type' => 'VARCHAR', 'constraint' => 300, 'null' => true, 'after' => 'title'],
            'description'   => ['type' => 'TEXT', 'null' => true, 'after' => 'subtitle'],
            'image'         => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true, 'after' => 'description'],
            'hero_eyebrow'  => ['type' => 'VARCHAR', 'constraint' => 150, 'null' => true, 'after' => 'image'],
            'hero_title'    => ['type' => 'VARCHAR', 'constraint' => 200, 'null' => true, 'after' => 'hero_eyebrow'],
            'hero_subtitle' => ['type' => 'VARCHAR', 'constraint' => 300, 'null' => true, 'after' => 'hero_title'],
            'hero_image'    => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true, 'after' => 'hero_subtitle'],
            'status'        => ['type' => 'ENUM', 'constraint' => ['draft', 'published'], 'default' => 'published', 'after' => 'hero_image'],
            'created_at'    => ['type' => 'DATETIME', 'null' => true, 'after' => 'sort_order'],
            'updated_at'    => ['type' => 'DATETIME', 'null' => true, 'after' => 'created_at'],
        ];

        $this->forge->addColumn('categories', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('categories', [
            'title', 'subtitle', 'description', 'image',
            'hero_eyebrow', 'hero_title', 'hero_subtitle', 'hero_image',
            'status', 'created_at', 'updated_at',
        ]);
    }
}
