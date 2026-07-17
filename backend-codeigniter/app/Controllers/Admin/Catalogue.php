<?php

namespace App\Controllers\Admin;

use App\Models\CatalogueModel;

class Catalogue extends BaseAdminController
{
    public function index(): string
    {
        $catalogues = model(CatalogueModel::class)
            ->orderBy('sort_order', 'ASC')
            ->orderBy('id', 'ASC')
            ->findAll();

        return $this->render('catalogue/index', ['catalogues' => $catalogues], 'catalogue');
    }

    public function create(): string
    {
        return $this->render('catalogue/form', ['item' => null], 'catalogue');
    }

    public function edit(int $id): string
    {
        $item = model(CatalogueModel::class)->find($id);
        if (! $item) {
            return $this->index();
        }

        return $this->render('catalogue/form', ['item' => $item], 'catalogue');
    }

    public function store()
    {
        return $this->persist(null);
    }

    public function update(int $id)
    {
        return $this->persist($id);
    }

    private function persist(?int $id)
    {
        $rules = [
            'title'  => 'required|string|max_length[200]',
            'status' => 'required|in_list[draft,published]',
        ];
        if (! $this->validate($rules)) {
            return redirect()->back()->withInput()->with('error', implode(' ', $this->validator->getErrors()));
        }

        $model = model(CatalogueModel::class);
        $title = (string) $this->request->getPost('title');
        $slug  = trim((string) $this->request->getPost('slug')) ?: $this->makeSlug($title);

        // Tags: comma-separated → array.
        $tagsRaw = trim((string) $this->request->getPost('tags'));
        $tags    = $tagsRaw === ''
            ? []
            : array_values(array_filter(array_map('trim', explode(',', $tagsRaw))));

        $data = [
            'slug'         => $slug,
            'title'        => $title,
            'title_line2'  => $this->request->getPost('title_line2'),
            'eyebrow'      => $this->request->getPost('eyebrow'),
            'sub'          => $this->request->getPost('sub'),
            'pages'        => $this->request->getPost('pages') !== '' ? (int) $this->request->getPost('pages') : null,
            'size'         => $this->request->getPost('size'),
            'badge_label'  => $this->request->getPost('badge_label') ?: null,
            'badge_gold'   => $this->request->getPost('badge_gold') ? 1 : 0,
            'spine_gold'   => $this->request->getPost('spine_gold') ? 1 : 0,
            'spine_label'  => $this->request->getPost('spine_label'),
            'img_opacity'  => (int) ($this->request->getPost('img_opacity') ?: 50),
            'availability' => $this->request->getPost('availability') === 'yellow' ? 'yellow' : 'green',
            'avail_label'  => $this->request->getPost('avail_label') ?: 'Available',
            'tags'         => $tags,
            'technical'    => $this->request->getPost('technical') ? 1 : 0,
            'sort_order'   => (int) $this->request->getPost('sort_order'),
            'status'       => $this->request->getPost('status'),
        ];

        try {
            if ($img = $this->saveUpload('image', 'catalogue')) {
                $data['image'] = $img;
            }
            if ($pdf = $this->saveUpload('pdf', 'catalogue')) {
                $data['pdf_path'] = $pdf;
            }
        } catch (\RuntimeException $e) {
            return redirect()->back()->withInput()->with('error', $e->getMessage());
        }

        if ($id) {
            $model->update($id, $data);
            $this->audit->log('catalogue_update', 'catalogues', $id);
            $msg = 'Catalogue updated.';
        } else {
            $id = $model->insert($data, true);
            $this->audit->log('catalogue_create', 'catalogues', (int) $id);
            $msg = 'Catalogue created.';
        }

        return redirect()->to('/admin/catalogue/' . $id)->with('success', $msg);
    }

    public function delete(int $id)
    {
        model(CatalogueModel::class)->delete($id);
        $this->audit->log('catalogue_delete', 'catalogues', $id);

        return redirect()->to('/admin/catalogue')->with('success', 'Catalogue deleted.');
    }
}
