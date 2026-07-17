<?php

namespace App\Models;

use CodeIgniter\Model;

class CategoryModel extends Model
{
    protected $table         = 'categories';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = true;
    protected $allowedFields = [
        'slug', 'name', 'title', 'subtitle', 'description', 'image',
        'hero_eyebrow', 'hero_title', 'hero_subtitle', 'hero_image',
        'status', 'sort_order',
    ];

    /** Published categories ordered for the Explore grid. */
    public function publishedForExplore(): array
    {
        return $this->where('status', 'published')
            ->orderBy('sort_order', 'ASC')
            ->orderBy('name', 'ASC')
            ->findAll();
    }

    /**
     * A category by slug plus its published subcategories.
     * Powers /api/v1/categories/{slug} (hero + subcategory list).
     */
    public function getWithSubcategories(string $slug, bool $publishedOnly = true): ?array
    {
        $builder = $this->where('slug', $slug);
        if ($publishedOnly) {
            $builder->where('status', 'published');
        }
        $category = $builder->first();
        if (! $category) {
            return null;
        }

        $category['subcategories'] = model(SubcategoryModel::class)
            ->forCategory((int) $category['id'], $publishedOnly);

        return $category;
    }
}
