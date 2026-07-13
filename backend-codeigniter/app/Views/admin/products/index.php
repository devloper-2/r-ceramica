<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<div style="display:flex;justify-content:space-between;align-items:center">
    <h1 style="margin:0">Products</h1>
    <a class="btn" href="/admin/products/new">+ New product</a>
</div>

<table style="margin-top:18px">
    <thead>
        <tr><th>Name</th><th>Category / Subcategory</th><th>Price</th><th>Status</th><th></th></tr>
    </thead>
    <tbody>
    <?php foreach ($products as $p): ?>
        <tr>
            <td><?= esc($p['name']) ?><div class="muted" style="font-size:12px">/<?= esc($p['slug']) ?></div></td>
            <td class="muted">
                <?= esc($p['category_name'] ?? '—') ?>
                <?php if (! empty($p['subcategory_name'])): ?>
                    <div style="font-size:12px">↳ <?= esc($p['subcategory_name']) ?></div>
                <?php endif; ?>
            </td>
            <td><?= esc($p['currency']) ?> <?= number_format((float) $p['price']) ?></td>
            <td><span class="tag <?= $p['status'] === 'published' ? 'published' : '' ?>"><?= esc($p['status']) ?></span></td>
            <td style="text-align:right"><a class="btn secondary" href="/admin/products/<?= (int) $p['id'] ?>">Edit</a></td>
        </tr>
    <?php endforeach; ?>
    <?php if (! $products): ?>
        <tr><td colspan="5" class="muted">No products yet.</td></tr>
    <?php endif; ?>
    </tbody>
</table>

<?= $this->endSection() ?>
