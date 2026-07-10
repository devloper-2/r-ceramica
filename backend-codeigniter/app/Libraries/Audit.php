<?php

namespace App\Libraries;

use CodeIgniter\Database\BaseConnection;
use Config\Database;

/**
 * Writes rows to `audit_log`. Every state change in the admin panel should be
 * recorded here (who did what, to which record, from where).
 */
class Audit
{
    protected BaseConnection $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function log(string $action, ?string $table = null, ?int $recordId = null): void
    {
        $request = service('request');
        $session = session();

        $this->db->table('audit_log')->insert([
            'user_id'    => $session->get('admin_id'),
            'action'     => $action,
            'table_name' => $table,
            'record_id'  => $recordId,
            'ip'         => $request->getIPAddress(),
            'user_agent' => substr((string) $request->getUserAgent(), 0, 255),
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
