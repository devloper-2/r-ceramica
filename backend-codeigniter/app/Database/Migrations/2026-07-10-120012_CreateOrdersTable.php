<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'               => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'order_number'     => ['type' => 'VARCHAR', 'constraint' => 40],
            'customer_id'      => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'null' => true],
            'email'            => ['type' => 'VARCHAR', 'constraint' => 150],
            'phone'            => ['type' => 'VARCHAR', 'constraint' => 30, 'null' => true],
            'shipping_address' => ['type' => 'JSON', 'null' => true],
            'billing_address'  => ['type' => 'JSON', 'null' => true],
            'subtotal'         => ['type' => 'DECIMAL', 'constraint' => '10,2', 'default' => 0],
            'shipping'         => ['type' => 'DECIMAL', 'constraint' => '10,2', 'default' => 0],
            'tax'              => ['type' => 'DECIMAL', 'constraint' => '10,2', 'default' => 0],
            'total'            => ['type' => 'DECIMAL', 'constraint' => '10,2', 'default' => 0],
            'currency'         => ['type' => 'VARCHAR', 'constraint' => 3, 'default' => 'INR'],
            'status'           => ['type' => 'ENUM', 'constraint' => ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'], 'default' => 'pending'],
            'payment_provider' => ['type' => 'VARCHAR', 'constraint' => 30, 'null' => true],
            'payment_ref'      => ['type' => 'VARCHAR', 'constraint' => 150, 'null' => true],
            'notes'            => ['type' => 'TEXT', 'null' => true],
            'created_at'       => ['type' => 'DATETIME', 'null' => true],
            'updated_at'       => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('order_number');
        $this->forge->addKey('customer_id');
        $this->forge->addKey('status');
        $this->forge->addForeignKey('customer_id', 'customers', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('orders', true, ['ENGINE' => 'InnoDB']);
    }

    public function down()
    {
        $this->forge->dropTable('orders', true);
    }
}
