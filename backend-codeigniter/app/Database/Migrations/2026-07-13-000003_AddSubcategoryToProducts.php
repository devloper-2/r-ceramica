<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

/**
 * Products now hang off a subcategory. `category_id` is kept (auto-derived from
 * the chosen subcategory's parent) for back-compat filtering.
 */
class AddSubcategoryToProducts extends Migration
{
    public function up()
    {
        $this->forge->addColumn('products', [
            'subcategory_id' => [
                'type'       => 'BIGINT',
                'constraint' => 20,
                'unsigned'   => true,
                'null'       => true,
                'after'      => 'category_id',
            ],
        ]);
        $this->forge->addForeignKey('subcategory_id', 'subcategories', 'id', 'SET NULL', 'CASCADE');
    }

    public function down()
    {
        // Drop the FK first (name follows CI4's convention), then the column.
        $db = \Config\Database::connect();
        foreach ($db->getForeignKeyData('products') as $fk) {
            if (in_array('subcategory_id', $fk->column_name ?? [], true)) {
                $this->forge->dropForeignKey('products', $fk->constraint_name);
            }
        }
        $this->forge->dropColumn('products', 'subcategory_id');
    }
}
