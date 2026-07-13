<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

/**
 * Subcategories sit between categories and products.
 * Explore → Category → (this) Subcategory → Products.
 */
class CreateSubcategoriesTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'category_id' => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'slug'        => ['type' => 'VARCHAR', 'constraint' => 150],
            'name'        => ['type' => 'VARCHAR', 'constraint' => 200],
            'subtitle'    => ['type' => 'VARCHAR', 'constraint' => 300, 'null' => true],
            'description' => ['type' => 'TEXT', 'null' => true],
            'image'       => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'sort_order'  => ['type' => 'INT', 'constraint' => 11, 'default' => 0],
            'status'      => ['type' => 'ENUM', 'constraint' => ['draft', 'published'], 'default' => 'published'],
            'created_at'  => ['type' => 'DATETIME', 'null' => true],
            'updated_at'  => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        // A slug is unique WITHIN a category (two categories may both have "wall").
        $this->forge->addUniqueKey(['category_id', 'slug']);
        $this->forge->addKey('status');
        $this->forge->addForeignKey('category_id', 'categories', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('subcategories', true, ['ENGINE' => 'InnoDB']);
    }

    public function down()
    {
        $this->forge->dropTable('subcategories', true);
    }
}
