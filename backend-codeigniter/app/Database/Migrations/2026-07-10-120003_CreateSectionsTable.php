<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateSectionsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'         => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'page_id'    => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true],
            'type'       => ['type' => 'VARCHAR', 'constraint' => 50],
            'sort_order' => ['type' => 'INT', 'constraint' => 11, 'default' => 0],
            'content'    => ['type' => 'JSON', 'null' => true],
            'is_active'  => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 1],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['page_id', 'sort_order']);
        $this->forge->addForeignKey('page_id', 'pages', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('sections', true, ['ENGINE' => 'InnoDB']);
    }

    public function down()
    {
        $this->forge->dropTable('sections', true);
    }
}
