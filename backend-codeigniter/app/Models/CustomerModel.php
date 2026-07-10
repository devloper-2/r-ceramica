<?php

namespace App\Models;

use CodeIgniter\Model;

class CustomerModel extends Model
{
    protected $table         = 'customers';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = true;
    protected $allowedFields = ['name', 'email', 'phone', 'password_hash'];

    public function findByEmail(string $email): ?array
    {
        return $this->where('email', $email)->first();
    }
}
