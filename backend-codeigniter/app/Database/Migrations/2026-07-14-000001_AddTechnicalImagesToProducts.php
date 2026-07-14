<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddTechnicalImagesToProducts extends Migration
{
    public function up(): void
    {
        $this->forge->addColumn('products', [
            'image_2d' => [
                'type'       => 'VARCHAR',
                'constraint' => 500,
                'null'       => true,
                'default'    => null,
                'after'      => 'meta_description',
            ],
            'image_3d' => [
                'type'       => 'VARCHAR',
                'constraint' => 500,
                'null'       => true,
                'default'    => null,
                'after'      => 'image_2d',
            ],
        ]);
    }

    public function down(): void
    {
        $this->forge->dropColumn('products', ['image_2d', 'image_3d']);
    }
}
