<?php

namespace App\Models;

use CodeIgniter\Model;

class SettingModel extends Model
{
    protected $table         = 'settings';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;
    protected $allowedFields = ['key', 'value'];

    protected array $casts = [
        'value' => '?json-array',
    ];

    /** All settings as a flat key => value map (values are decoded). */
    public function map(): array
    {
        $out = [];
        foreach ($this->findAll() as $row) {
            $out[$row['key']] = $row['value'];
        }

        return $out;
    }

    /** Insert or update a single setting by key. */
    public function put(string $key, $value): void
    {
        $existing = $this->where('key', $key)->first();
        $data = ['key' => $key, 'value' => $value];
        if ($existing) {
            $this->update($existing['id'], $data);
        } else {
            $this->insert($data);
        }
    }
}
