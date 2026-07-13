<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<!-- Page heading -->
<div class="page-heading">
  <div class="page-heading-copy">
    <span class="page-icon"><i class="bi bi-tag"></i></span>
    <div>
      <p class="eyebrow mb-1"><a href="/admin/categories" class="text-decoration-none">Category</a> · Edit</p>
      <h1><?= esc($category['name']) ?></h1>
      <p class="text-muted mb-0" style="font-size:.88rem">
        Frontend content, subcategory-page hero, and the subcategory list.
      </p>
    </div>
  </div>
  <div class="heading-actions">
    <a href="/admin/categories" class="btn btn-light btn-sm"><i class="bi bi-arrow-left me-1"></i> Back</a>
  </div>
</div>

<!-- Flash messages -->
<?php if (session()->has('success')): ?>
  <div class="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-3" role="alert">
    <i class="bi bi-check-circle-fill"></i><span><?= esc(session('success')) ?></span>
    <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
  </div>
<?php endif; ?>
<?php if (session()->has('error')): ?>
  <div class="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 mb-3" role="alert">
    <i class="bi bi-exclamation-triangle-fill"></i><span><?= esc(session('error')) ?></span>
    <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
  </div>
<?php endif; ?>

<!-- ══ CONTENT + HERO FORM ══════════════════════════════════════ -->
<form action="/admin/categories/<?= (int) $category['id'] ?>" method="post" enctype="multipart/form-data">
  <?= csrf_field() ?>
  <div class="row g-3">

    <!-- Explore-card content -->
    <div class="col-lg-6">
      <div class="panel h-100">
        <p class="form-section-title"><i class="bi bi-window me-1"></i> Explore Card</p>

        <div class="mb-3">
          <label class="admin-label" for="name">Admin Name <span class="text-danger">*</span></label>
          <input type="text" id="name" name="name" class="form-control admin-input" required
                 value="<?= esc($category['name'], 'attr') ?>">
          <div class="form-text">Internal label (e.g. "Tiles").</div>
        </div>

        <div class="mb-3">
          <label class="admin-label" for="slug">Slug</label>
          <input type="text" id="slug" name="slug" class="form-control admin-input"
                 value="<?= esc($category['slug'], 'attr') ?>">
          <div class="form-text">URL segment: <code>/explore/<?= esc($category['slug']) ?></code></div>
        </div>

        <div class="row g-2">
          <div class="col-6 mb-3">
            <label class="admin-label" for="title">Frontend Title</label>
            <input type="text" id="title" name="title" class="form-control admin-input"
                   value="<?= esc($category['title'] ?? '', 'attr') ?>" placeholder="Architectural">
          </div>
          <div class="col-6 mb-3">
            <label class="admin-label" for="subtitle">Subtitle</label>
            <input type="text" id="subtitle" name="subtitle" class="form-control admin-input"
                   value="<?= esc($category['subtitle'] ?? '', 'attr') ?>" placeholder="Surfaces">
          </div>
        </div>

        <div class="mb-3">
          <label class="admin-label" for="description">Description</label>
          <textarea id="description" name="description" rows="2" class="form-control admin-input"><?= esc($category['description'] ?? '') ?></textarea>
        </div>

        <div class="mb-2">
          <label class="admin-label" for="image">Card Image</label>
          <?php if (! empty($category['image'])): ?>
            <div class="mb-2"><img src="<?= esc($category['image'], 'attr') ?>" class="img-preview" alt=""></div>
          <?php endif; ?>
          <input type="file" id="image" name="image" accept="image/*" class="form-control admin-input">
          <div class="form-text">Leave empty to keep the current image.</div>
        </div>
      </div>
    </div>

    <!-- Subcategory-page hero -->
    <div class="col-lg-6">
      <div class="panel h-100">
        <p class="form-section-title"><i class="bi bi-easel me-1"></i> Subcategory-Page Hero</p>

        <div class="mb-3">
          <label class="admin-label" for="hero_eyebrow">Hero Eyebrow</label>
          <input type="text" id="hero_eyebrow" name="hero_eyebrow" class="form-control admin-input"
                 value="<?= esc($category['hero_eyebrow'] ?? '', 'attr') ?>" placeholder="Heritage Collection">
        </div>
        <div class="mb-3">
          <label class="admin-label" for="hero_title">Hero Title</label>
          <input type="text" id="hero_title" name="hero_title" class="form-control admin-input"
                 value="<?= esc($category['hero_title'] ?? '', 'attr') ?>" placeholder="Architectural Surfaces">
        </div>
        <div class="mb-3">
          <label class="admin-label" for="hero_subtitle">Hero Subtitle</label>
          <textarea id="hero_subtitle" name="hero_subtitle" rows="2" class="form-control admin-input"><?= esc($category['hero_subtitle'] ?? '') ?></textarea>
        </div>
        <div class="mb-2">
          <label class="admin-label" for="hero_image">Hero Image</label>
          <?php if (! empty($category['hero_image'])): ?>
            <div class="mb-2"><img src="<?= esc($category['hero_image'], 'attr') ?>" class="img-preview" alt=""></div>
          <?php endif; ?>
          <input type="file" id="hero_image" name="hero_image" accept="image/*" class="form-control admin-input">
        </div>
      </div>
    </div>
  </div>

  <div class="panel mt-3 d-flex align-items-end gap-3 flex-wrap">
    <div>
      <label class="admin-label" for="sort_order">Sort Order</label>
      <input type="number" id="sort_order" name="sort_order" min="0" max="9999" style="max-width:110px"
             class="form-control admin-input" value="<?= (int) $category['sort_order'] ?>">
    </div>
    <div>
      <label class="admin-label" for="status">Status</label>
      <select id="status" name="status" class="form-select admin-input" style="max-width:150px">
        <option value="published" <?= ($category['status'] ?? '') === 'published' ? 'selected' : '' ?>>Published</option>
        <option value="draft" <?= ($category['status'] ?? '') !== 'published' ? 'selected' : '' ?>>Draft</option>
      </select>
    </div>
    <div class="ms-auto">
      <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg me-1"></i> Save Category</button>
    </div>
  </div>
</form>

<!-- ══ SUBCATEGORIES ════════════════════════════════════════════ -->
<div class="panel mt-4" style="padding:0">
  <div class="d-flex align-items-center justify-content-between px-4 pt-3 pb-2">
    <p class="form-section-title mb-0"><i class="bi bi-diagram-3 me-1"></i> Subcategories</p>
    <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addSubModal">
      <i class="bi bi-plus-lg me-1"></i> Add Subcategory
    </button>
  </div>

  <?php if (empty($subcategories)): ?>
    <div class="text-center py-4">
      <i class="bi bi-diagram-3 fs-3 text-muted opacity-50 d-block mb-2"></i>
      <p class="text-muted mb-0" style="font-size:.86rem">No subcategories yet.</p>
    </div>
  <?php else: ?>
    <div class="table-responsive">
      <table class="table admin-table mb-0">
        <thead>
          <tr>
            <th style="width:64px">Image</th>
            <th>Name</th>
            <th>Slug</th>
            <th style="width:90px">Status</th>
            <th style="width:70px">Sort</th>
            <th style="width:120px" class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($subcategories as $sub): ?>
            <tr>
              <td>
                <?php if (! empty($sub['image'])): ?>
                  <img src="<?= esc($sub['image'], 'attr') ?>" class="cat-thumb" alt="">
                <?php else: ?>
                  <span class="cat-thumb cat-thumb-empty"><i class="bi bi-image"></i></span>
                <?php endif; ?>
              </td>
              <td>
                <span class="fw-semibold"><?= esc($sub['name']) ?></span>
                <?php if (! empty($sub['subtitle'])): ?>
                  <div class="text-muted" style="font-size:.76rem"><?= esc($sub['subtitle']) ?></div>
                <?php endif; ?>
              </td>
              <td><code class="slug-badge"><?= esc($sub['slug']) ?></code></td>
              <td>
                <?php $sp = $sub['status'] === 'published'; ?>
                <span class="status-badge <?= $sp ? 'is-pub' : 'is-draft' ?>"><?= $sp ? 'Published' : 'Draft' ?></span>
              </td>
              <td><span class="sort-pill"><?= (int) $sub['sort_order'] ?></span></td>
              <td class="text-end">
                <div class="d-flex gap-2 justify-content-end">
                  <button type="button" class="btn-tbl-action edit sub-edit-btn" title="Edit"
                          data-id="<?= (int) $sub['id'] ?>"
                          data-name="<?= esc($sub['name'], 'attr') ?>"
                          data-slug="<?= esc($sub['slug'], 'attr') ?>"
                          data-subtitle="<?= esc($sub['subtitle'] ?? '', 'attr') ?>"
                          data-description="<?= esc($sub['description'] ?? '', 'attr') ?>"
                          data-sort="<?= (int) $sub['sort_order'] ?>"
                          data-status="<?= esc($sub['status'], 'attr') ?>"
                          data-bs-toggle="modal" data-bs-target="#editSubModal">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button type="button" class="btn-tbl-action danger sub-del-btn" title="Delete"
                          data-id="<?= (int) $sub['id'] ?>"
                          data-name="<?= esc($sub['name'], 'attr') ?>"
                          data-bs-toggle="modal" data-bs-target="#delSubModal">
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</div>

<!-- ── Add Subcategory Modal ───────────────────────────────────── -->
<div class="modal fade" id="addSubModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:520px">
    <div class="modal-content admin-modal">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-plus-circle me-2" style="color:var(--admin-primary)"></i>Add Subcategory</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <form action="/admin/categories/<?= (int) $category['id'] ?>/subcategories" method="post" enctype="multipart/form-data">
        <?= csrf_field() ?>
        <div class="modal-body">
          <?= $this->include('admin/categories/_sub_fields') ?>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm"><i class="bi bi-check-lg me-1"></i> Add</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ── Edit Subcategory Modal ──────────────────────────────────── -->
<div class="modal fade" id="editSubModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:520px">
    <div class="modal-content admin-modal">
      <div class="modal-header"><h5 class="modal-title"><i class="bi bi-pencil-square me-2" style="color:var(--admin-primary)"></i>Edit Subcategory</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="editSubForm" method="post" enctype="multipart/form-data">
        <?= csrf_field() ?>
        <div class="modal-body">
          <?= $this->include('admin/categories/_sub_fields', ['prefix' => 'edit_']) ?>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm"><i class="bi bi-check-lg me-1"></i> Update</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ── Delete Subcategory Modal ────────────────────────────────── -->
<div class="modal fade" id="delSubModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:420px">
    <div class="modal-content admin-modal">
      <div class="modal-header border-0 pb-0"><h5 class="modal-title text-danger"><i class="bi bi-exclamation-triangle-fill me-2"></i>Delete Subcategory</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="delSubForm" method="post">
        <?= csrf_field() ?>
        <div class="modal-body"><p class="text-muted mb-0">Delete <strong id="delSubName">this subcategory</strong>? Its products keep their records but lose this association.</p></div>
        <div class="modal-footer border-0 pt-0">
          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-danger btn-sm"><i class="bi bi-trash3 me-1"></i> Delete</button>
        </div>
      </form>
    </div>
  </div>
</div>

<?= $this->include('admin/categories/_styles') ?>

<script>
const CAT_ID = <?= (int) $category['id'] ?>;

// Populate edit modal from row data attributes.
document.querySelectorAll('.sub-edit-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const d = btn.dataset;
    document.getElementById('editSubForm').action = '/admin/categories/' + CAT_ID + '/subcategories/' + d.id;
    document.getElementById('edit_name').value        = d.name || '';
    document.getElementById('edit_slug').value        = d.slug || '';
    document.getElementById('edit_subtitle').value    = d.subtitle || '';
    document.getElementById('edit_description').value = d.description || '';
    document.getElementById('edit_sort_order').value  = d.sort || 0;
    document.getElementById('edit_status').value      = d.status || 'published';
  });
});

// Wire delete modal.
document.querySelectorAll('.sub-del-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.getElementById('delSubForm').action = '/admin/categories/' + CAT_ID + '/subcategories/' + btn.dataset.id + '/delete';
    document.getElementById('delSubName').textContent = '"' + btn.dataset.name + '"';
  });
});
</script>

<?= $this->endSection() ?>
