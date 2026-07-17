<?php

namespace App\Models;

use CodeIgniter\Model;

class CatalogueModel extends Model
{
    protected $table         = 'catalogues';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = true;
    protected $allowedFields = [
        'slug', 'title', 'title_line2', 'eyebrow', 'sub', 'pages', 'size',
        'badge_label', 'badge_gold', 'spine_gold', 'spine_label', 'image',
        'img_opacity', 'availability', 'avail_label', 'tags', 'technical',
        'pdf_path', 'sort_order', 'status',
    ];

    protected array $casts = [
        'tags' => '?json-array',
    ];

    /** Published catalogues, ordered for the storefront grid. */
    public function published(): array
    {
        return $this->where('status', 'published')
            ->orderBy('sort_order', 'ASC')
            ->orderBy('id', 'ASC')
            ->findAll();
    }
}
