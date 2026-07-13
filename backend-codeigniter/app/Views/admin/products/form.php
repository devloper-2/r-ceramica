<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<?php
$isEdit = $product !== null;
$action = $isEdit ? '/admin/products/' . (int) $product['id'] : '/admin/products';
?>
<p class="muted"><a href="/admin/products">← All products</a></p>
<h1><?= $isEdit ? 'Edit product' : 'New product' ?></h1>

<form action="<?= $action ?>" method="post"
      style="background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:20px;max-width:820px">
    <?= csrf_field() ?>
    <div class="row">
        <div>
            <label>Name</label>
            <input name="name" value="<?= esc(old('name', $product['name'] ?? '')) ?>" required>
        </div>
        <div>
            <label>Slug (blank = auto from name)</label>
            <input name="slug" value="<?= esc(old('slug', $product['slug'] ?? '')) ?>">
        </div>
    </div>
    <div class="row">
        <div>
            <label>Price</label>
            <input name="price" type="number" step="0.01" value="<?= esc(old('price', $product['price'] ?? '0')) ?>" required>
        </div>
        <div>
            <label>Currency</label>
            <input name="currency" value="<?= esc(old('currency', $product['currency'] ?? 'INR')) ?>">
        </div>
        <div>
            <label>Subcategory</label>
            <select name="subcategory_id">
                <option value="">—</option>
                <?php foreach ($subcategoryGroups as $catName => $subs): ?>
                    <optgroup label="<?= esc($catName, 'attr') ?>">
                        <?php foreach ($subs as $s): ?>
                            <option value="<?= (int) $s['id'] ?>" <?= ($product['subcategory_id'] ?? '') == $s['id'] ? 'selected' : '' ?>><?= esc($s['name']) ?></option>
                        <?php endforeach; ?>
                    </optgroup>
                <?php endforeach; ?>
            </select>
        </div>
        <div>
            <label>Status</label>
            <select name="status">
                <option value="published" <?= ($product['status'] ?? '') === 'published' ? 'selected' : '' ?>>Published</option>
                <option value="draft" <?= ($product['status'] ?? 'draft') === 'draft' ? 'selected' : '' ?>>Draft</option>
            </select>
        </div>
    </div>
    <label>Short description</label>
    <input name="short_description" value="<?= esc(old('short_description', $product['short_description'] ?? '')) ?>">
    <label>Description</label>
    <textarea name="description"><?= esc(old('description', $product['description'] ?? '')) ?></textarea>
    <label>Specs (JSON, optional) — e.g. {"material":"Granite","finish":"Matte"}</label>
    <textarea name="specs" spellcheck="false" style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px"><?= esc(old('specs', $product['specs_pretty'] ?? '')) ?></textarea>
    <div class="row" style="margin-top:6px">
        <div>
            <label>Meta title</label>
            <input name="meta_title" value="<?= esc(old('meta_title', $product['meta_title'] ?? '')) ?>">
        </div>
        <div>
            <label>Meta description</label>
            <input name="meta_description" value="<?= esc(old('meta_description', $product['meta_description'] ?? '')) ?>">
        </div>
    </div>
    <div style="margin-top:18px;display:flex;gap:10px">
        <button class="btn" type="submit"><?= $isEdit ? 'Save product' : 'Create product' ?></button>
        <?php if ($isEdit): ?>
            <a class="btn secondary" href="/admin/products/<?= (int) $product['id'] ?>">Cancel</a>
        <?php endif; ?>
    </div>
</form>

<?php if ($isEdit): ?>
    <form action="/admin/products/<?= (int) $product['id'] ?>/delete" method="post"
          onsubmit="return confirm('Delete this product permanently?')" style="margin-top:16px">
        <?= csrf_field() ?>
        <button class="btn danger" type="submit">Delete product</button>
    </form>
<?php endif; ?>

<?= $this->endSection() ?>
