<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

/**
 * Adds social-login support to customers. `password_hash` and `phone` already
 * exist (see CreateCustomersTable); this only adds the Google identity column
 * and helpful indexes for the two login lookups (phone, google_id).
 */
class AddAuthFieldsToCustomers extends Migration
{
    public function up()
    {
        $fields = [];
        if (! $this->db->fieldExists('google_id', 'customers')) {
            $fields['google_id'] = ['type' => 'VARCHAR', 'constraint' => 64, 'null' => true, 'after' => 'password_hash'];
        }
        if ($fields !== []) {
            $this->forge->addColumn('customers', $fields);
        }

        // Indexes for the login lookups (ignore if they already exist).
        try {
            $this->forge->addKey('phone');
            $this->db->query('ALTER TABLE `customers` ADD INDEX `customers_phone_idx` (`phone`)');
        } catch (\Throwable $e) {
            // index already present — safe to ignore
        }
        try {
            $this->db->query('ALTER TABLE `customers` ADD INDEX `customers_google_id_idx` (`google_id`)');
        } catch (\Throwable $e) {
            // index already present — safe to ignore
        }
    }

    public function down()
    {
        if ($this->db->fieldExists('google_id', 'customers')) {
            $this->forge->dropColumn('customers', 'google_id');
        }
    }
}
