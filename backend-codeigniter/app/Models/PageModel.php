<?php

namespace App\Models;

use CodeIgniter\Model;

class PageModel extends Model
{
    protected $table            = 'pages';
    protected $primaryKey       = 'id';
    protected $returnType       = 'array';
    protected $useTimestamps    = true;
    protected $allowedFields    = [
        'slug', 'title', 'meta_title', 'meta_description', 'og_image_id', 'status',
    ];

    /**
     * Fetch a published page by slug together with its active sections
     * (ordered), returning the shape the frontend build consumes.
     */
    public function getWithSections(string $slug, bool $publishedOnly = true): ?array
    {
        $builder = $this->where('slug', $slug);
        if ($publishedOnly) {
            $builder->where('status', 'published');
        }
        $page = $builder->first();
        if (! $page) {
            return null;
        }

        $sections = model(SectionModel::class)
            ->where('page_id', $page['id'])
            ->where('is_active', 1)
            ->orderBy('sort_order', 'ASC')
            ->findAll();

        $page['sections'] = $sections;

        return $page;
    }
}
