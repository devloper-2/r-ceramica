<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateMediaTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'         => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'filename'   => ['type' => 'VARCHAR', 'constraint' => 255],
            'path'       => ['type' => 'VARCHAR', 'constraint' => 500],
            'alt_text'   => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'mime'       => ['type' => 'VARCHAR', 'constraint' => 100, 'null' => true],
            'width'      => ['type' => 'INT', 'constraint' => 11, 'null' => true],
            'height'     => ['type' => 'INT', 'constraint' => 11, 'null' => true],
            'size_bytes' => ['type' => 'INT', 'constraint' => 11, 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('media', true, ['ENGINE' => 'InnoDB']);
    }

    public function down()
    {
        $this->forge->dropTable('media', true);
    }
}
