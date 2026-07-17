<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<style>
/* ── Category listing ── */
.catl-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1.75rem; flex-wrap: wrap; gap: 1rem;
}
.catl-title    { font-size: 1.6rem; font-weight: 800; margin: 0; color: var(--admin-text); }
.catl-subtitle { font-size: .82rem; color: var(--admin-muted); margin: .15rem 0 0; }

.catl-new-btn {
  display: inline-flex; align-items: center; gap: .45rem;
  background: var(--admin-primary); color: #3a2600; border: none;
  border-radius: 9px; padding: .6rem 1.3rem; font-weight: 800; font-size: .88rem;
  text-decoration: none; white-space: nowrap; cursor: pointer;
  box-shadow: 0 4px 14px rgba(201,162,75,.35);
  transition: filter .15s, box-shadow .15s;
}
.catl-new-btn:hover { filter: brightness(.92); box-shadow: 0 6px 20px rgba(201,162,75,.45); color: #3a2600; text-decoration: none; }

/* Card grid */
.catl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.25rem;
}
.catl-card {
  background: var(--admin-surface); border: 1.5px solid var(--admin-border);
  border-radius: 14px; overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
  display: flex; flex-direction: column;
  text-decoration: none;
  transition: border-color .18s, box-shadow .18s, transform .18s;
}
.catl-card:hover {
  border-color: rgba(201,162,75,.5);
  box-shadow: 0 8px 28px rgba(0,0,0,.1);
  transform: translateY(-3px); text-decoration: none;
}
.catl-card-img {
  width: 100%; height: 160px; object-fit: cover; display: block;
}
.catl-card-img-placeholder {
  width: 100%; height: 160px;
  background: var(--admin-surface-soft);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: .4rem;
  color: var(--admin-border);
}
.catl-card-img-placeholder i { font-size: 2rem; }
.catl-card-img-placeholder span { font-size: .72rem; color: var(--admin-muted); }

.catl-card-body { padding: .9rem 1rem .75rem; flex: 1; display: flex; flex-direction: column; gap: .3rem; }
.catl-card-name { font-weight: 800; font-size: .98rem; color: var(--admin-text); margin: 0; }
.catl-card-title { font-size: .78rem; color: var(--admin-muted); }
.catl-slug {
  display: inline-flex; align-items: center; gap: .25rem;
  font-size: .7rem; color: var(--admin-muted);
  background: var(--admin-surface-soft); border: 1px solid var(--admin-border);
  padding: 1px 7px; border-radius: 5px; font-family: monospace;
  margin-top: .1rem; width: fit-content;
}

.catl-card-footer {
  padding: .6rem 1rem;
  border-top: 1px solid var(--admin-border);
  background: var(--admin-surface-soft);
  display: flex; align-items: center; justify-content: space-between; gap: .5rem;
}
.catl-sub-count {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .75rem; font-weight: 700; color: var(--admin-muted);
}
.catl-sub-count i { color: var(--admin-primary); }

.catl-status {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .7rem; font-weight: 700; padding: 3px 9px; border-radius: 20px;
}
.catl-status.published { background: #dcfce7; color: #065f46; }
.catl-status.draft     { background: #f3f4f6; color: var(--admin-muted); }

.catl-edit-btn {
  display: inline-flex; align-items: center; gap: .3rem;
  background: var(--admin-primary); color: #3a2600;
  border-radius: 7px; padding: .28rem .7rem;
  font-size: .73rem; font-weight: 800;
  text-decoration: none; opacity: 0;
  transition: opacity .15s;
}
.catl-card:hover .catl-edit-btn { opacity: 1; }

.catl-empty { text-align: center; padding: 5rem 2rem; color: var(--admin-muted); }
.catl-empty i { font-size: 3rem; display: block; margin-bottom: .75rem; color: var(--admin-border); }
.catl-empty p { margin: 0 0 1.2rem; font-size: .9rem; }
</style>

<!-- Flash messages -->
<?php if (session()->has('success')): ?>
  <div class="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-3">
    <i class="bi bi-check-circle-fill"></i><span><?= esc(session('success')) ?></span>
    <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
  </div>
<?php endif; ?>
<?php if (session()->has('error')): ?>
  <div class="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 mb-3">
    <i class="bi bi-exclamation-triangle-fill"></i><span><?= esc(session('error')) ?></span>
    <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
  </div>
<?php endif; ?>

<!-- Header -->
<div class="catl-header">
  <div>
    <h1 class="catl-title">Category</h1>
    <p class="catl-subtitle"><?= count($categories) ?> categor<?= count($categories) !== 1 ? 'ies' : 'y' ?> · shown on /explore page</p>
  </div>
  <button class="catl-new-btn" data-bs-toggle="modal" data-bs-target="#addModal">
    <i class="bi bi-plus-lg"></i> Add Category
  </button>
</div>

<?php if (empty($categories)): ?>
  <div class="catl-empty">
    <i class="bi bi-tags"></i>
    <p>No categories yet. Add your first one.</p>
    <button class="catl-new-btn" data-bs-toggle="modal" data-bs-target="#addModal">+ Add Category</button>
  </div>
<?php else: ?>
  <div class="catl-grid">
    <?php foreach ($categories as $cat):
      $pub = ($cat['status'] ?? 'draft') === 'published';
    ?>
    <a href="/admin/categories/<?= (int) $cat['id'] ?>" class="catl-card">

      <?php if (!empty($cat['image'])): ?>
        <img class="catl-card-img" src="<?= esc($cat['image'], 'attr') ?>" alt="<?= esc($cat['name'], 'attr') ?>">
      <?php else: ?>
        <div class="catl-card-img-placeholder">
          <i class="bi bi-tag"></i>
          <span>No image</span>
        </div>
      <?php endif; ?>

      <div class="catl-card-body">
        <p class="catl-card-name"><?= esc($cat['name']) ?></p>
        <?php if (!empty($cat['title'])): ?>
          <span class="catl-card-title"><?= esc($cat['title']) ?><?= !empty($cat['subtitle']) ? ' · ' . esc($cat['subtitle']) : '' ?></span>
        <?php endif; ?>
        <span class="catl-slug"><i class="bi bi-link-45deg"></i>/explore/<?= esc($cat['slug']) ?></span>
      </div>

      <div class="catl-card-footer">
        <span class="catl-sub-count">
          <i class="bi bi-diagram-3"></i>
          <?= (int)($cat['sub_count'] ?? 0) ?> subcategor<?= (int)($cat['sub_count'] ?? 0) !== 1 ? 'ies' : 'y' ?>
        </span>
        <div style="display:flex;align-items:center;gap:.5rem">
          <span class="catl-status <?= $pub ? 'published' : 'draft' ?>">
            <i class="bi bi-<?= $pub ? 'check-circle-fill' : 'circle' ?>"></i>
            <?= $pub ? 'Published' : 'Draft' ?>
          </span>
          <span class="catl-edit-btn"><i class="bi bi-pencil-fill"></i> Edit</span>
        </div>
      </div>
    </a>
    <?php endforeach; ?>
  </div>
<?php endif; ?>

<!-- ── Add Modal ── -->
<div class="modal fade" id="addModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:460px">
    <div class="modal-content admin-modal">
      <div class="modal-header">
        <h5 class="modal-title"><i class="bi bi-plus-circle me-2" style="color:var(--admin-primary)"></i>Add Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form action="/admin/categories" method="post">
        <?= csrf_field() ?>
        <div class="modal-body">
          <label class="form-label admin-label" for="add_name">Category Name <span class="text-danger">*</span></label>
          <input type="text" id="add_name" name="name" class="form-control admin-input"
                 placeholder="e.g. Tiles" required autofocus>
          <div class="form-text mt-1">You'll set the image, hero and subcategories on the next screen.</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm"><i class="bi bi-check-lg me-1"></i> Create &amp; Edit</button>
        </div>
      </form>
    </div>
  </div>
</div>

<?= $this->endSection() ?>
