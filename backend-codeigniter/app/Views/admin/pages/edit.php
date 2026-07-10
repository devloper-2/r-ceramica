<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<p class="muted"><a href="/admin/pages">← All pages</a></p>
<h1>Edit: <?= esc($page['title']) ?> <span class="muted">/<?= esc($page['slug']) ?></span></h1>

<!-- Page meta / SEO -->
<form action="/admin/pages/<?= (int) $page['id'] ?>" method="post" style="background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:20px;margin-bottom:26px">
    <?= csrf_field() ?>
    <strong>Page details &amp; SEO</strong>
    <div class="row">
        <div>
            <label>Title</label>
            <input name="title" value="<?= esc($page['title']) ?>" required>
        </div>
        <div>
            <label>Status</label>
            <select name="status">
                <option value="published" <?= $page['status'] === 'published' ? 'selected' : '' ?>>Published</option>
                <option value="draft" <?= $page['status'] === 'draft' ? 'selected' : '' ?>>Draft</option>
            </select>
        </div>
    </div>
    <label>Meta title</label>
    <input name="meta_title" value="<?= esc($page['meta_title']) ?>" maxlength="255">
    <label>Meta description</label>
    <textarea name="meta_description" maxlength="500" style="min-height:70px"><?= esc($page['meta_description']) ?></textarea>
    <div style="margin-top:16px"><button class="btn" type="submit">Save page details</button></div>
</form>

<!-- Sections -->
<strong>Sections (<?= count($sections) ?>)</strong>
<p class="muted">Each section's content is JSON. Edit the fields and Save. Invalid JSON is rejected so the site never breaks.</p>

<?php if (! $sections): ?>
    <p class="muted">This page has no sections yet.</p>
<?php endif; ?>

<?php foreach ($sections as $s): ?>
    <form action="/admin/pages/<?= (int) $page['id'] ?>/sections/<?= (int) $s['id'] ?>" method="post"
          style="background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:18px;margin:14px 0">
        <?= csrf_field() ?>
        <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="text-transform:capitalize"><?= esc($s['type']) ?></strong>
            <label style="display:flex;align-items:center;gap:8px;margin:0;color:var(--ink)">
                <input type="checkbox" name="is_active" value="1" style="width:auto" <?= $s['is_active'] ? 'checked' : '' ?>> Active
            </label>
        </div>
        <label>Order</label>
        <input name="sort_order" type="number" value="<?= (int) $s['sort_order'] ?>" style="max-width:120px">
        <label>Content (JSON)</label>
        <textarea name="content" spellcheck="false" style="min-height:200px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px"><?= esc($s['content_pretty']) ?></textarea>
        <div style="margin-top:14px"><button class="btn" type="submit">Save section</button></div>
    </form>
<?php endforeach; ?>

<?= $this->endSection() ?>
