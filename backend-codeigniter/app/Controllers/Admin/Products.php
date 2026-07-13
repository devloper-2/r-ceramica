<?php

namespace App\Controllers\Admin;

use App\Models\ProductModel;
use App\Models\SubcategoryModel;

class Products extends BaseAdminController
{
    public function index(): string
    {
        $products = model(ProductModel::class)
            ->select('products.*, categories.name AS category_name, subcategories.name AS subcategory_name')
            ->join('categories', 'categories.id = products.category_id', 'left')
            ->join('subcategories', 'subcategories.id = products.subcategory_id', 'left')
            ->orderBy('products.created_at', 'DESC')
            ->findAll();

        return $this->render('products/index', ['products' => $products], 'products');
    }

    public function create(): string
    {
        return $this->render('products/form', [
            'product'          => null,
            'subcategoryGroups' => $this->subcategoryGroups(),
        ], 'products');
    }

    public function edit(int $id): string
    {
        $product = model(ProductModel::class)->find($id);
        if (! $product) {
            return $this->index();
        }
        $product['specs_pretty'] = json_encode($product['specs'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        return $this->render('products/form', [
            'product'          => $product,
            'subcategoryGroups' => $this->subcategoryGroups(),
        ], 'products');
    }

    /** Subcategories grouped by parent category, for the <optgroup> select. */
    private function subcategoryGroups(): array
    {
        $rows = model(SubcategoryModel::class)
            ->select('subcategories.id, subcategories.name, subcategories.category_id, categories.name AS category_name, categories.sort_order AS cat_sort')
            ->join('categories', 'categories.id = subcategories.category_id')
            ->orderBy('categories.sort_order', 'ASC')
            ->orderBy('subcategories.sort_order', 'ASC')
            ->orderBy('subcategories.name', 'ASC')
            ->findAll();

        $groups = [];
        foreach ($rows as $r) {
            $groups[$r['category_name']][] = ['id' => (int) $r['id'], 'name' => $r['name']];
        }

        return $groups;
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
            'name'   => 'required|string|max_length[200]',
            'price'  => 'required|numeric',
            'status' => 'required|in_list[draft,published]',
            'slug'   => 'permit_empty|alpha_dash|max_length[150]',
        ];
        if (! $this->validate($rules)) {
            return redirect()->back()->withInput()->with('error', implode(' ', $this->validator->getErrors()));
        }

        $model = model(ProductModel::class);
        $name  = (string) $this->request->getPost('name');
        $slug  = trim((string) $this->request->getPost('slug')) ?: url_title($name, '-', true);

        // Validate specs JSON if provided.
        $specsRaw = trim((string) $this->request->getPost('specs'));
        $specs    = null;
        if ($specsRaw !== '') {
            $specs = json_decode($specsRaw, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return redirect()->back()->withInput()->with('error', 'Specs is not valid JSON: ' . json_last_error_msg());
            }
        }

        // Product belongs to a subcategory; derive its parent category from that.
        $subcategoryId = $this->request->getPost('subcategory_id') ?: null;
        $categoryId    = null;
        if ($subcategoryId) {
            $sub        = model(SubcategoryModel::class)->find((int) $subcategoryId);
            $categoryId = $sub['category_id'] ?? null;
        }

        $data = [
            'name'              => $name,
            'slug'              => $slug,
            'short_description' => $this->request->getPost('short_description'),
            'description'       => $this->request->getPost('description'),
            'price'             => (float) $this->request->getPost('price'),
            'currency'          => $this->request->getPost('currency') ?: 'INR',
            'specs'             => $specs,
            'subcategory_id'    => $subcategoryId,
            'category_id'       => $categoryId,
            'meta_title'        => $this->request->getPost('meta_title'),
            'meta_description'  => $this->request->getPost('meta_description'),
            'status'            => $this->request->getPost('status'),
        ];

        if ($id) {
            $model->update($id, $data);
            $this->audit->log('product_update', 'products', $id);
            $msg = 'Product updated.';
        } else {
            $id = $model->insert($data, true);
            $this->audit->log('product_create', 'products', (int) $id);
            $msg = 'Product created.';
        }

        return redirect()->to('/admin/products/' . $id)->with('success', $msg);
    }

    public function delete(int $id)
    {
        model(ProductModel::class)->delete($id);
        $this->audit->log('product_delete', 'products', $id);

        return redirect()->to('/admin/products')->with('success', 'Product deleted.');
    }
}
