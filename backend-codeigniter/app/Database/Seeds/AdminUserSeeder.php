<?php

namespace App\Database\Seeds;

use App\Models\AdminUserModel;
use CodeIgniter\CLI\CLI;
use CodeIgniter\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        $model = model(AdminUserModel::class);

        if ($model->findByEmail('admin@rceramica.com')) {
            return; // already seeded
        }

        $model->insert([
            'name'          => 'R Ceramica Admin',
            'email'         => 'admin@rceramica.com',
            'password_hash' => password_hash('Admin@12345', PASSWORD_DEFAULT),
            'role'          => 'admin',
        ]);

        CLI::write('  → Admin created: admin@rceramica.com / Admin@12345 (change after first login)', 'yellow');
    }
}
