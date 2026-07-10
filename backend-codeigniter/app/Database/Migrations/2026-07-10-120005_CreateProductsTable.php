<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateProductsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'                => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'slug'              => ['type' => 'VARCHAR', 'constraint' => 150],
            'name'              => ['type' => 'VARCHAR', 'constraint' => 200],
            'short_description' => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'description'       => ['type' => 'TEXT', 'null' => true],
            'price'             => ['type' => 'DECIMAL', 'constraint' => '10,2', 'default' => 0],
            'currency'          => ['type' => 'VARCHAR', 'constraint' => 3, 'default' => 'INR'],
            'specs'             => ['type' => 'JSON', 'null' => true],
            'category_id'       => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'null' => true],
            'meta_title'        => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'meta_description'  => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'status'            => ['type' => 'ENUM', 'constraint' => ['draft', 'published'], 'default' => 'draft'],
            'created_at'        => ['type' => 'DATETIME', 'null' => true],
            'updated_at'        => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->addKey('status');
        $this->forge->addForeignKey('category_id', 'categories', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('products', true, ['ENGINE' => 'InnoDB']);
    }

    public function down()
    {
        $this->forge->dropTable('products', true);
    }
}
