<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AlterOrdersTableAddTransitStatus extends Migration
{
    public function up()
    {
        // Add 'transit' to the enum constraint
        $this->forge->modifyColumn('orders', [
            'status' => [
                'type'       => 'ENUM',
                'constraint' => ['pending', 'paid', 'processing', 'shipped', 'transit', 'delivered', 'cancelled', 'refunded'],
                'default'    => 'pending',
            ],
        ]);
    }

    public function down()
    {
        // Revert to original without 'transit'
        $this->forge->modifyColumn('orders', [
            'status' => [
                'type'       => 'ENUM',
                'constraint' => ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
                'default'    => 'pending',
            ],
        ]);
    }
}
