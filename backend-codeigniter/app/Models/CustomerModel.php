<?php

namespace App\Models;

use CodeIgniter\Model;

class CustomerModel extends Model
{
    protected $table         = 'customers';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = true;
    protected $allowedFields = ['name', 'email', 'phone', 'password_hash', 'google_id'];

    public function findByEmail(string $email): ?array
    {
        return $this->where('email', $email)->first();
    }

    /** Normalised phone lookup (digits only) for mobile-number login. */
    public function findByPhone(string $phone): ?array
    {
        $digits = preg_replace('/\D/', '', $phone);
        if ($digits === '') {
            return null;
        }

        return $this->where('phone', $digits)->first();
    }

    public function findByGoogleId(string $googleId): ?array
    {
        return $this->where('google_id', $googleId)->first();
    }

    /** Public-safe view of a customer (never leak password_hash). */
    public function publicView(array $customer): array
    {
        return [
            'id'    => (int) $customer['id'],
            'name'  => $customer['name'] ?? '',
            'email' => $customer['email'] ?? '',
            'phone' => $customer['phone'] ?? '',
        ];
    }
}
