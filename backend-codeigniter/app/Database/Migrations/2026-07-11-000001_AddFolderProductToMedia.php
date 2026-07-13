<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddFolderProductToMedia extends Migration
{
    public function up(): void
    {
        $this->forge->addColumn('media', [
            'folder' => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
                'default'    => 'general',
                'after'      => 'alt_text',
            ],
            'product_id' => [
                'type'       => 'BIGINT',
                'constraint' => 20,
                'unsigned'   => true,
                'null'       => true,
                'default'    => null,
                'after'      => 'folder',
            ],
        ]);

        $this->db->query('ALTER TABLE media ADD INDEX idx_folder (folder)');
        $this->db->query('ALTER TABLE media ADD INDEX idx_product_id (product_id)');
    }

    public function down(): void
    {
        $this->forge->dropColumn('media', ['folder', 'product_id']);
    }
}
