<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateAdminUsersTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'              => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'name'            => ['type' => 'VARCHAR', 'constraint' => 100],
            'email'           => ['type' => 'VARCHAR', 'constraint' => 150],
            'password_hash'   => ['type' => 'VARCHAR', 'constraint' => 255],
            'role'            => ['type' => 'ENUM', 'constraint' => ['admin', 'editor'], 'default' => 'editor'],
            'last_login_at'   => ['type' => 'DATETIME', 'null' => true],
            'failed_attempts' => ['type' => 'INT', 'constraint' => 11, 'default' => 0],
            'locked_until'    => ['type' => 'DATETIME', 'null' => true],
            'created_at'      => ['type' => 'DATETIME', 'null' => true],
            'updated_at'      => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('email');
        $this->forge->createTable('admin_users', true, ['ENGINE' => 'InnoDB']);
    }

    public function down()
    {
        $this->forge->dropTable('admin_users', true);
    }
}
