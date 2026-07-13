<?php

namespace App\Controllers\Admin;

use App\Models\PageModel;
use App\Models\SectionModel;

class Pages extends BaseAdminController
{
    /**
     * Landing pages editable as Pages & Sections. Explore / Catalogue and the
     * category → subcategory → product tree are managed under their own tabs,
     * so they are intentionally excluded here.
     */
    private const LANDING_SLUGS = ['home', 'about', 'contact', 'privacy', 'terms'];

    public function index(): string
    {
        $pages = model(PageModel::class)
            ->whereIn('slug', self::LANDING_SLUGS)
            ->orderBy('slug', 'ASC')
            ->findAll();

        return $this->render('pages/index', ['pages' => $pages], 'pages');
    }

    public function edit(int $id): string
    {
        $page = model(PageModel::class)->find($id);
        if (! $page || ! in_array($page['slug'], self::LANDING_SLUGS, true)) {
            return $this->index();
        }

        $sections = model(SectionModel::class)
            ->where('page_id', $id)
            ->orderBy('sort_order', 'ASC')
            ->findAll();

        // Pretty-print each section's JSON for the textarea editor.
        foreach ($sections as &$s) {
            $s['content_pretty'] = json_encode($s['content'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        }

        return $this->render('pages/edit', ['page' => $page, 'sections' => $sections], 'pages');
    }

    public function update(int $id)
    {
        $model = model(PageModel::class);
        if (! $model->find($id)) {
            return redirect()->to('/admin/pages');
        }

        $rules = [
            'title'            => 'required|string|max_length[200]',
            'meta_title'       => 'permit_empty|string|max_length[255]',
            'meta_description' => 'permit_empty|string|max_length[500]',
            'status'           => 'required|in_list[draft,published]',
        ];
        if (! $this->validate($rules)) {
            return redirect()->back()->withInput()->with('error', implode(' ', $this->validator->getErrors()));
        }

        $model->update($id, [
            'title'            => $this->request->getPost('title'),
            'meta_title'       => $this->request->getPost('meta_title'),
            'meta_description' => $this->request->getPost('meta_description'),
            'status'           => $this->request->getPost('status'),
        ]);
        $this->audit->log('page_update', 'pages', $id);

        return redirect()->to('/admin/pages/' . $id)->with('success', 'Page details saved.');
    }

    public function updateSection(int $pageId, int $sectionId)
    {
        $model   = model(SectionModel::class);
        $section = $model->find($sectionId);

        if (! $section || (int) $section['page_id'] !== $pageId) {
            return redirect()->to('/admin/pages/' . $pageId)->with('error', 'Section not found.');
        }

        // Validate the submitted JSON before saving.
        $raw     = (string) $this->request->getPost('content');
        $decoded = json_decode($raw, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return redirect()->to('/admin/pages/' . $pageId)
                ->with('error', 'Section "' . $section['type'] . '" was not saved — invalid JSON: ' . json_last_error_msg());
        }

        $model->update($sectionId, [
            'content'    => $decoded,
            'is_active'  => $this->request->getPost('is_active') ? 1 : 0,
            'sort_order' => (int) $this->request->getPost('sort_order'),
        ]);
        $this->audit->log('section_update', 'sections', $sectionId);

        return redirect()->to('/admin/pages/' . $pageId)->with('success', 'Section "' . $section['type'] . '" saved.');
    }
}
