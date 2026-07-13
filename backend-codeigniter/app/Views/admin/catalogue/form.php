<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<?php
$isEdit = $item !== null;
$action = $isEdit ? '/admin/catalogue/' . (int) $item['id'] : '/admin/catalogue';
$tags   = $isEdit && is_array($item['tags']) ? implode(', ', $item['tags']) : '';
?>

<div class="page-heading">
  <div class="page-heading-copy">
    <span class="page-icon"><i class="bi bi-journal-richtext"></i></span>
    <div>
      <p class="eyebrow mb-1"><a href="/admin/catalogue" class="text-decoration-none">Catalogue</a> · <?= $isEdit ? 'Edit' : 'New' ?></p>
      <h1><?= $isEdit ? esc($item['title']) : 'New Catalogue' ?></h1>
    </div>
  </div>
  <div class="heading-actions">
    <a href="/admin/catalogue" class="btn btn-light btn-sm"><i class="bi bi-arrow-left me-1"></i> Back</a>
  </div>
</div>

<?php if (session()->has('success')): ?>
  <div class="alert alert-success alert-dismissible fade show mb-3"><?= esc(session('success')) ?><button type="button" class="btn-close float-end" data-bs-dismiss="alert"></button></div>
<?php endif; ?>
<?php if (session()->has('error')): ?>
  <div class="alert alert-danger alert-dismissible fade show mb-3"><?= esc(session('error')) ?><button type="button" class="btn-close float-end" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

<form action="<?= $action ?>" method="post" enctype="multipart/form-data">
  <?= csrf_field() ?>
  <div class="row g-3">
    <div class="col-lg-8">
      <div class="panel">
        <p class="form-section-title"><i class="bi bi-card-heading me-1"></i> Content</p>
        <div class="row g-2">
          <div class="col-6 mb-2">
            <label class="admin-label">Title <span class="text-danger">*</span></label>
            <input name="title" class="form-control admin-input" required value="<?= esc(old('title', $item['title'] ?? ''), 'attr') ?>">
          </div>
          <div class="col-6 mb-2">
            <label class="admin-label">Title Line 2</label>
            <input name="title_line2" class="form-control admin-input" value="<?= esc(old('title_line2', $item['title_line2'] ?? ''), 'attr') ?>">
          </div>
          <div class="col-6 mb-2">
            <label class="admin-label">Slug</label>
            <input name="slug" class="form-control admin-input" value="<?= esc(old('slug', $item['slug'] ?? ''), 'attr') ?>" placeholder="auto from title">
          </div>
          <div class="col-6 mb-2">
            <label class="admin-label">Eyebrow</label>
            <input name="eyebrow" class="form-control admin-input" value="<?= esc(old('eyebrow', $item['eyebrow'] ?? ''), 'attr') ?>">
          </div>
          <div class="col-12 mb-2">
            <label class="admin-label">Subtitle line</label>
            <input name="sub" class="form-control admin-input" value="<?= esc(old('sub', $item['sub'] ?? ''), 'attr') ?>" placeholder="Floor · Wall · Large Format">
          </div>
          <div class="col-12 mb-2">
            <label class="admin-label">Tags (comma-separated)</label>
            <input name="tags" class="form-control admin-input" value="<?= esc(old('tags', $tags), 'attr') ?>" placeholder="tiles, slabs">
            <div class="form-text">Used by the filter pills on /catalogue (e.g. tiles, bathroom, kitchen).</div>
          </div>
        </div>
      </div>

      <div class="panel mt-3">
        <p class="form-section-title"><i class="bi bi-sliders me-1"></i> Badges &amp; Meta</p>
        <div class="row g-2">
          <div class="col-4 mb-2"><label class="admin-label">Pages</label>
            <input name="pages" type="number" min="0" class="form-control admin-input" value="<?= esc(old('pages', $item['pages'] ?? ''), 'attr') ?>"></div>
          <div class="col-4 mb-2"><label class="admin-label">Size</label>
            <input name="size" class="form-control admin-input" value="<?= esc(old('size', $item['size'] ?? ''), 'attr') ?>" placeholder="24 MB"></div>
          <div class="col-4 mb-2"><label class="admin-label">Image opacity %</label>
            <input name="img_opacity" type="number" min="0" max="100" class="form-control admin-input" value="<?= esc(old('img_opacity', $item['img_opacity'] ?? 50), 'attr') ?>"></div>
          <div class="col-6 mb-2"><label class="admin-label">Badge label</label>
            <input name="badge_label" class="form-control admin-input" value="<?= esc(old('badge_label', $item['badge_label'] ?? ''), 'attr') ?>" placeholder="New Edition"></div>
          <div class="col-6 mb-2"><label class="admin-label">Spine label</label>
            <input name="spine_label" class="form-control admin-input" value="<?= esc(old('spine_label', $item['spine_label'] ?? ''), 'attr') ?>" placeholder="R Ceramica · 2024"></div>
          <div class="col-6 mb-2"><label class="admin-label">Availability</label>
            <select name="availability" class="form-select admin-input">
              <option value="green" <?= ($item['availability'] ?? 'green') === 'green' ? 'selected' : '' ?>>Available (green)</option>
              <option value="yellow" <?= ($item['availability'] ?? '') === 'yellow' ? 'selected' : '' ?>>Limited (yellow)</option>
            </select></div>
          <div class="col-6 mb-2"><label class="admin-label">Availability label</label>
            <input name="avail_label" class="form-control admin-input" value="<?= esc(old('avail_label', $item['avail_label'] ?? 'Available'), 'attr') ?>"></div>
        </div>
        <div class="d-flex gap-4 flex-wrap mt-1">
          <label class="d-flex align-items-center gap-2"><input type="checkbox" name="badge_gold" value="1" <?= ! empty($item['badge_gold']) ? 'checked' : '' ?>> Gold badge</label>
          <label class="d-flex align-items-center gap-2"><input type="checkbox" name="spine_gold" value="1" <?= ! empty($item['spine_gold']) ? 'checked' : '' ?>> Gold spine</label>
          <label class="d-flex align-items-center gap-2"><input type="checkbox" name="technical" value="1" <?= ! empty($item['technical']) ? 'checked' : '' ?>> Technical (grid overlay)</label>
        </div>
      </div>
    </div>

    <div class="col-lg-4">
      <div class="panel">
        <p class="form-section-title"><i class="bi bi-image me-1"></i> Cover Image</p>
        <?php if (! empty($item['image'])): ?>
          <div class="mb-2"><img src="<?= esc($item['image'], 'attr') ?>" class="img-preview" alt=""></div>
        <?php endif; ?>
        <input type="file" name="image" accept="image/*" class="form-control admin-input">
        <div class="form-text mb-3">Leave empty to keep the current image.</div>

        <p class="form-section-title"><i class="bi bi-file-earmark-pdf me-1"></i> PDF</p>
        <?php if (! empty($item['pdf_path'])): ?>
          <div class="mb-2"><a href="<?= esc($item['pdf_path'], 'attr') ?>" target="_blank">Current PDF</a></div>
        <?php endif; ?>
        <input type="file" name="pdf" accept="application/pdf" class="form-control admin-input">
      </div>

      <div class="panel mt-3 d-flex align-items-end gap-3 flex-wrap">
        <div>
          <label class="admin-label">Sort</label>
          <input name="sort_order" type="number" min="0" style="max-width:90px" class="form-control admin-input" value="<?= esc(old('sort_order', $item['sort_order'] ?? 0), 'attr') ?>">
        </div>
        <div>
          <label class="admin-label">Status</label>
          <select name="status" class="form-select admin-input" style="max-width:140px">
            <option value="published" <?= ($item['status'] ?? 'published') === 'published' ? 'selected' : '' ?>>Published</option>
            <option value="draft" <?= ($item['status'] ?? '') === 'draft' ? 'selected' : '' ?>>Draft</option>
          </select>
        </div>
      </div>
      <div class="d-grid gap-2 mt-3">
        <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg me-1"></i> <?= $isEdit ? 'Save Catalogue' : 'Create Catalogue' ?></button>
      </div>
    </div>
  </div>
</form>

<?php if ($isEdit): ?>
  <form action="/admin/catalogue/<?= (int) $item['id'] ?>/delete" method="post" class="mt-3" onsubmit="return confirm('Delete this catalogue permanently?')">
    <?= csrf_field() ?>
    <button class="btn btn-outline-danger btn-sm" type="submit"><i class="bi bi-trash3 me-1"></i> Delete</button>
  </form>
<?php endif; ?>

<?= $this->include('admin/categories/_styles') ?>
<?= $this->endSection() ?>
