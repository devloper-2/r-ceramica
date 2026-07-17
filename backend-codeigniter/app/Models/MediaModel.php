<?php

namespace App\Models;

use CodeIgniter\Model;

class MediaModel extends Model
{
    protected $table            = 'media';
    protected $primaryKey       = 'id';
    protected $returnType       = 'array';
    protected $useTimestamps    = true;
    protected $updatedField     = '';
    protected $allowedFields    = ['filename', 'path', 'alt_text', 'folder', 'product_id', 'mime', 'width', 'height', 'size_bytes'];
}
