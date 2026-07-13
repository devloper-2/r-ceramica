<?php

namespace App\Controllers\Admin;

use App\Models\CategoryModel;

class Categories extends BaseAdminController
{
    public function index(): string
    {
        $categories = model(CategoryModel::class)
            ->orderBy('sort_order', 'ASC')
            ->orderBy('name', 'ASC')
            ->findAll();

        return $this->render('categories/index', ['categories' => $categories], 'categories');
    }

    public function store()
    {
        $data = [
            'name'       => trim((string) $this->request->getPost('name')),
            'slug'       => $this->makeSlug((string) $this->request->getPost('name')),
            'sort_order' => (int) $this->request->getPost('sort_order'),
        ];

        if ($data['name'] === '') {
            return redirect()->to('/admin/categories')->with('error', 'Category name is required.');
        }

        $id = model(CategoryModel::class)->insert($data, true);
        $this->audit->log('category_create', 'categories', (int) $id);

        return redirect()->to('/admin/categories')->with('success', 'Category "' . esc($data['name']) . '" created.');
    }

    public function update(int $id)
    {
        $model = model(CategoryModel::class);
        if (! $model->find($id)) {
            return redirect()->to('/admin/categories')->with('error', 'Category not found.');
        }

        $name = trim((string) $this->request->getPost('name'));
        if ($name === '') {
            return redirect()->to('/admin/categories')->with('error', 'Category name is required.');
        }

        $model->update($id, [
            'name'       => $name,
            'slug'       => $this->makeSlug($name),
            'sort_order' => (int) $this->request->getPost('sort_order'),
        ]);
        $this->audit->log('category_update', 'categories', $id);

        return redirect()->to('/admin/categories')->with('success', 'Category updated.');
    }

    public function delete(int $id)
    {
        model(CategoryModel::class)->delete($id);
        $this->audit->log('category_delete', 'categories', $id);
        return redirect()->to('/admin/categories')->with('success', 'Category deleted.');
    }

    private function makeSlug(string $name): string
    {
        return strtolower(preg_replace('/[^a-z0-9]+/i', '-', trim($name)));
    }
}
