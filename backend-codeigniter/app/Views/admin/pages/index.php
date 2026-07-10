<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<h1>Pages &amp; Sections</h1>
<p class="muted">Edit page SEO metadata and the content of every section. After editing, click <strong>Publish site</strong> to push changes live.</p>

<table style="margin-top:18px">
    <thead>
        <tr><th>Page</th><th>Slug</th><th>Status</th><th></th></tr>
    </thead>
    <tbody>
    <?php foreach ($pages as $p): ?>
        <tr>
            <td><?= esc($p['title']) ?></td>
            <td class="muted">/<?= esc($p['slug'] === 'home' ? '' : $p['slug']) ?></td>
            <td><span class="tag <?= $p['status'] === 'published' ? 'published' : '' ?>"><?= esc($p['status']) ?></span></td>
            <td style="text-align:right"><a class="btn secondary" href="/admin/pages/<?= (int) $p['id'] ?>">Edit</a></td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>

<?= $this->endSection() ?>
