<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateNavLinksTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'         => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'label'      => ['type' => 'VARCHAR', 'constraint' => 100],
            'url'        => ['type' => 'VARCHAR', 'constraint' => 255],
            'parent_id'  => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'null' => true],
            'sort_order' => ['type' => 'INT', 'constraint' => 11, 'default' => 0],
            'is_active'  => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 1],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['parent_id', 'sort_order']);
        $this->forge->addForeignKey('parent_id', 'nav_links', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('nav_links', true, ['ENGINE' => 'InnoDB']);
    }

    public function down()
    {
        $this->forge->dropTable('nav_links', true);
    }
}
