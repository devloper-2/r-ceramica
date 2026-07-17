<?php

namespace App\Controllers\Admin;

use App\Models\CategoryModel;
use App\Models\SubcategoryModel;

class Categories extends BaseAdminController
{
    public function index(): string
    {
        $categories = model(CategoryModel::class)
            ->orderBy('sort_order', 'ASC')
            ->orderBy('name', 'ASC')
            ->findAll();

        // Subcategory counts per category for the list badges.
        $subModel = model(SubcategoryModel::class);
        foreach ($categories as &$cat) {
            $cat['sub_count'] = $subModel->where('category_id', $cat['id'])->countAllResults();
        }

        return $this->render('categories/index', ['categories' => $categories], 'categories');
    }

    /** Create a bare category (name only), then jump into its full editor. */
    public function store()
    {
        $name = trim((string) $this->request->getPost('name'));
        if ($name === '') {
            return redirect()->to('/admin/categories')->with('error', 'Category name is required.');
        }

        $id = model(CategoryModel::class)->insert([
            'name'       => $name,
            'slug'       => $this->makeSlug($name),
            'title'      => $name,
            'sort_order' => (int) $this->request->getPost('sort_order'),
            'status'     => 'draft',
        ], true);
        $this->audit->log('category_create', 'categories', (int) $id);

        return redirect()->to('/admin/categories/' . $id)
            ->with('success', 'Category "' . esc($name) . '" created. Add its content and subcategories below.');
    }

    /** Full editor: category content + hero + its subcategories. */
    public function edit(int $id): string
    {
        $model    = model(CategoryModel::class);
        $category = $model->find($id);
        if (! $category) {
            return $this->index();
        }

        $subcategories = model(SubcategoryModel::class)->forCategory($id);

        return $this->render('categories/edit', [
            'category'      => $category,
            'subcategories' => $subcategories,
        ], 'categories');
    }

    /** Save category content + hero (with optional image uploads). */
    public function update(int $id)
    {
        $model = model(CategoryModel::class);
        if (! $model->find($id)) {
            return redirect()->to('/admin/categories')->with('error', 'Category not found.');
        }

        $name = trim((string) $this->request->getPost('name'));
        if ($name === '') {
            return redirect()->back()->withInput()->with('error', 'Category name is required.');
        }

        $slug = trim((string) $this->request->getPost('slug')) ?: $this->makeSlug($name);

        $data = [
            'name'          => $name,
            'slug'          => $this->makeSlug($slug),
            'title'         => $this->request->getPost('title'),
            'subtitle'      => $this->request->getPost('subtitle'),
            'description'   => $this->request->getPost('description'),
            'hero_eyebrow'  => $this->request->getPost('hero_eyebrow'),
            'hero_title'    => $this->request->getPost('hero_title'),
            'hero_subtitle' => $this->request->getPost('hero_subtitle'),
            'sort_order'    => (int) $this->request->getPost('sort_order'),
            'status'        => $this->request->getPost('status') === 'published' ? 'published' : 'draft',
        ];

        try {
            if ($img = $this->saveUpload('image', 'general')) {
                $data['image'] = $img;
            }
            if ($hero = $this->saveUpload('hero_image', 'hero')) {
                $data['hero_image'] = $hero;
            }
        } catch (\RuntimeException $e) {
            return redirect()->back()->withInput()->with('error', $e->getMessage());
        }

        $model->update($id, $data);
        $this->audit->log('category_update', 'categories', $id);

        return redirect()->to('/admin/categories/' . $id)->with('success', 'Category saved.');
    }

    public function delete(int $id)
    {
        model(CategoryModel::class)->delete($id); // subcategories cascade via FK
        $this->audit->log('category_delete', 'categories', $id);

        return redirect()->to('/admin/categories')->with('success', 'Category deleted.');
    }

    /* ── Subcategories ──────────────────────────────────────────────────── */

    public function storeSub(int $categoryId)
    {
        if (! model(CategoryModel::class)->find($categoryId)) {
            return redirect()->to('/admin/categories')->with('error', 'Category not found.');
        }

        $name = trim((string) $this->request->getPost('name'));
        if ($name === '') {
            return redirect()->back()->with('error', 'Subcategory name is required.');
        }

        $data = [
            'category_id' => $categoryId,
            'name'        => $name,
            'slug'        => $this->makeSlug((string) ($this->request->getPost('slug') ?: $name)),
            'subtitle'    => $this->request->getPost('subtitle'),
            'description' => $this->request->getPost('description'),
            'sort_order'  => (int) $this->request->getPost('sort_order'),
            'status'      => $this->request->getPost('status') === 'draft' ? 'draft' : 'published',
        ];

        try {
            if ($img = $this->saveUpload('image', 'general')) {
                $data['image'] = $img;
            }
        } catch (\RuntimeException $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

        $id = model(SubcategoryModel::class)->insert($data, true);
        $this->audit->log('subcategory_create', 'subcategories', (int) $id);

        return redirect()->to('/admin/categories/' . $categoryId)->with('success', 'Subcategory added.');
    }

    public function updateSub(int $categoryId, int $subId)
    {
        $subModel = model(SubcategoryModel::class);
        $sub      = $subModel->find($subId);
        if (! $sub || (int) $sub['category_id'] !== $categoryId) {
            return redirect()->to('/admin/categories/' . $categoryId)->with('error', 'Subcategory not found.');
        }

        $name = trim((string) $this->request->getPost('name'));
        if ($name === '') {
            return redirect()->back()->with('error', 'Subcategory name is required.');
        }

        $data = [
            'name'        => $name,
            'slug'        => $this->makeSlug((string) ($this->request->getPost('slug') ?: $name)),
            'subtitle'    => $this->request->getPost('subtitle'),
            'description' => $this->request->getPost('description'),
            'sort_order'  => (int) $this->request->getPost('sort_order'),
            'status'      => $this->request->getPost('status') === 'draft' ? 'draft' : 'published',
        ];

        try {
            if ($img = $this->saveUpload('image', 'general')) {
                $data['image'] = $img;
            }
        } catch (\RuntimeException $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

        $subModel->update($subId, $data);
        $this->audit->log('subcategory_update', 'subcategories', $subId);

        return redirect()->to('/admin/categories/' . $categoryId)->with('success', 'Subcategory updated.');
    }

    public function deleteSub(int $categoryId, int $subId)
    {
        $subModel = model(SubcategoryModel::class);
        $sub      = $subModel->find($subId);
        if ($sub && (int) $sub['category_id'] === $categoryId) {
            $subModel->delete($subId);
            $this->audit->log('subcategory_delete', 'subcategories', $subId);
        }

        return redirect()->to('/admin/categories/' . $categoryId)->with('success', 'Subcategory deleted.');
    }
}
