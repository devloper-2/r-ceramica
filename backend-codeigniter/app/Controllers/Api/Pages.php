<?php

namespace App\Controllers\Api;

use App\Models\PageModel;
use CodeIgniter\HTTP\ResponseInterface;

class Pages extends BaseApiController
{
    /** GET /api/v1/pages — list published page slugs (for build paths / sitemap). */
    public function index(): ResponseInterface
    {
        $pages = model(PageModel::class)
            ->select('slug, title, meta_title, meta_description, updated_at')
            ->where('status', 'published')
            ->orderBy('slug', 'ASC')
            ->findAll();

        return $this->ok($pages, ['count' => count($pages)]);
    }

    /** GET /api/v1/pages/{slug} — a published page with its ordered active sections. */
    public function show(string $slug): ResponseInterface
    {
        $page = model(PageModel::class)->getWithSections($slug, true);

        if (! $page) {
            return $this->notFound("Page '{$slug}' not found or not published.");
        }

        return $this->ok($page);
    }
}
