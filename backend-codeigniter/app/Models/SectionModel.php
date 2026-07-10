<?php

namespace App\Models;

use CodeIgniter\Model;

class SectionModel extends Model
{
    protected $table            = 'sections';
    protected $primaryKey       = 'id';
    protected $returnType       = 'array';
    protected $useTimestamps    = true;
    protected $createdField     = '';
    protected $allowedFields    = ['page_id', 'type', 'sort_order', 'content', 'is_active'];

    // Auto encode/decode the JSON `content` column to/from a PHP array.
    protected array $casts = [
        'content' => 'json-array',
    ];
}
