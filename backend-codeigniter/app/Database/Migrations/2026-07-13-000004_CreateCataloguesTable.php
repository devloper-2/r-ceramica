<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

/**
 * CMS-driven catalogue entries (downloadable PDFs) rendered on /catalogue.
 * Mirrors the former hardcoded `CatEntry` shape from the Next.js page.
 */
class CreateCataloguesTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'           => ['type' => 'BIGINT', 'constraint' => 20, 'unsigned' => true, 'auto_increment' => true],
            'slug'         => ['type' => 'VARCHAR', 'constraint' => 150],
            'title'        => ['type' => 'VARCHAR', 'constraint' => 200],
            'title_line2'  => ['type' => 'VARCHAR', 'constraint' => 200, 'null' => true],
            'eyebrow'      => ['type' => 'VARCHAR', 'constraint' => 150, 'null' => true],
            'sub'          => ['type' => 'VARCHAR', 'constraint' => 300, 'null' => true],
            'pages'        => ['type' => 'INT', 'constraint' => 11, 'null' => true],
            'size'         => ['type' => 'VARCHAR', 'constraint' => 20, 'null' => true],
            'badge_label'  => ['type' => 'VARCHAR', 'constraint' => 60, 'null' => true],
            'badge_gold'   => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'spine_gold'   => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'spine_label'  => ['type' => 'VARCHAR', 'constraint' => 100, 'null' => true],
            'image'        => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'img_opacity'  => ['type' => 'INT', 'constraint' => 11, 'default' => 50],
            'availability' => ['type' => 'ENUM', 'constraint' => ['green', 'yellow'], 'default' => 'green'],
            'avail_label'  => ['type' => 'VARCHAR', 'constraint' => 60, 'null' => true],
            'tags'         => ['type' => 'JSON', 'null' => true],
            'technical'    => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'pdf_path'     => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'sort_order'   => ['type' => 'INT', 'constraint' => 11, 'default' => 0],
            'status'       => ['type' => 'ENUM', 'constraint' => ['draft', 'published'], 'default' => 'published'],
            'created_at'   => ['type' => 'DATETIME', 'null' => true],
            'updated_at'   => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->addKey('status');
        $this->forge->createTable('catalogues', true, ['ENGINE' => 'InnoDB']);
    }

    public function down()
    {
        $this->forge->dropTable('catalogues', true);
    }
}
