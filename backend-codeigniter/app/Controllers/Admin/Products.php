<?php

namespace App\Controllers\Admin;

use App\Models\ProductImageModel;
use App\Models\ProductModel;
use App\Models\SubcategoryModel;

class Products extends BaseAdminController
{
    public function index(): string
    {
        $products = model(ProductModel::class)
            ->select('products.*, categories.name AS category_name, subcategories.name AS subcategory_name, media.path AS primary_image')
            ->join('categories', 'categories.id = products.category_id', 'left')
            ->join('subcategories', 'subcategories.id = products.subcategory_id', 'left')
            ->join('product_images', 'product_images.product_id = products.id AND product_images.is_primary = 1', 'left')
            ->join('media', 'media.id = product_images.media_id', 'left')
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
        $product['images']       = model(ProductImageModel::class)->forProduct($id);

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

        // Handle 2D / 3D technical image uploads (keep existing URL if no new file).
        $existing  = $id ? ($model->find($id) ?? []) : [];
        try {
            $image2d = $this->saveUpload('image_2d', 'products/2d') ?? ($existing['image_2d'] ?? null);
            $image3d = $this->saveUpload('image_3d', 'products/3d') ?? ($existing['image_3d'] ?? null);
        } catch (\RuntimeException $e) {
            return redirect()->back()->withInput()->with('error', $e->getMessage());
        }

        // Allow admin to explicitly clear an image via hidden checkbox.
        if ($this->request->getPost('clear_image_2d') === '1') { $image2d = null; }
        if ($this->request->getPost('clear_image_3d') === '1') { $image3d = null; }

        // Upload new gallery images first so a rejected file aborts before we
        // write the product (avoids creating an orphan row on create).
        try {
            $newGalleryMediaIds = $this->saveGalleryUploads('gallery', 'products');
        } catch (\RuntimeException $e) {
            return redirect()->back()->withInput()->with('error', $e->getMessage());
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
            'image_2d'          => $image2d,
            'image_3d'          => $image3d,
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

        $this->syncGalleryImages((int) $id, $newGalleryMediaIds);

        return redirect()->to('/admin/products/' . $id)->with('success', $msg);
    }

    /**
     * Reconcile a product's gallery: delete rows the admin removed, append the
     * freshly-uploaded media, and ensure exactly one image is marked primary.
     *
     * @param int[] $newMediaIds media IDs uploaded this request (in order)
     */
    private function syncGalleryImages(int $productId, array $newMediaIds): void
    {
        $imgModel = model(ProductImageModel::class);

        // Remove images the admin unchecked (remove_image[] = product_images.id).
        $removeIds = (array) $this->request->getPost('remove_image');
        $removeIds = array_filter(array_map('intval', $removeIds));
        if ($removeIds) {
            $imgModel->where('product_id', $productId)->whereIn('id', $removeIds)->delete();
        }

        // Append new uploads after the current highest sort_order.
        if ($newMediaIds) {
            $maxRow = $imgModel->selectMax('sort_order')->where('product_id', $productId)->first();
            $sort   = (int) ($maxRow['sort_order'] ?? -1);
            foreach ($newMediaIds as $mediaId) {
                $imgModel->insert([
                    'product_id' => $productId,
                    'media_id'   => $mediaId,
                    'sort_order' => ++$sort,
                    'is_primary' => 0,
                ]);
            }
        }

        // Ensure one primary image. Honour the admin's chosen radio when it still
        // exists; otherwise fall back to the first image by sort order.
        $all = $imgModel->where('product_id', $productId)->orderBy('sort_order', 'ASC')->findAll();
        if (! $all) {
            return;
        }
        $chosen    = (int) $this->request->getPost('primary_image');
        $validIds  = array_map(static fn ($r) => (int) $r['id'], $all);
        if (! in_array($chosen, $validIds, true)) {
            $chosen = (int) $all[0]['id'];
        }
        $imgModel->where('product_id', $productId)->set('is_primary', 0)->update();
        $imgModel->where('id', $chosen)->set('is_primary', 1)->update();
    }

    public function delete(int $id)
    {
        model(ProductModel::class)->delete($id);
        $this->audit->log('product_delete', 'products', $id);

        return redirect()->to('/admin/products')->with('success', 'Product deleted.');
    }
}
