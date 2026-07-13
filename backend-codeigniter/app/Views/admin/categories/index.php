<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<!-- Page heading -->
<div class="page-heading">
  <div class="page-heading-copy">
    <span class="page-icon"><i class="bi bi-tags"></i></span>
    <div>
      <p class="eyebrow mb-1">Content</p>
      <h1>Category</h1>
      <p class="text-muted mb-0" style="font-size:.88rem">
        Categories shown on Explore. Open one to edit its content, hero and subcategories.
      </p>
    </div>
  </div>
  <div class="heading-actions">
    <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addModal">
      <i class="bi bi-plus-lg me-1"></i> Add Category
    </button>
  </div>
</div>

<!-- Flash messages -->
<?php if (session()->has('success')): ?>
  <div class="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-3" role="alert">
    <i class="bi bi-check-circle-fill"></i>
    <span><?= esc(session('success')) ?></span>
    <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
  </div>
<?php endif; ?>
<?php if (session()->has('error')): ?>
  <div class="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 mb-3" role="alert">
    <i class="bi bi-exclamation-triangle-fill"></i>
    <span><?= esc(session('error')) ?></span>
    <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
  </div>
<?php endif; ?>

<!-- Categories table -->
<div class="panel" style="padding:0">
  <?php if (empty($categories)): ?>
    <div class="text-center py-5">
      <i class="bi bi-tags fs-1 text-muted opacity-50 d-block mb-2"></i>
      <p class="text-muted mb-3">No categories yet. Add your first one.</p>
      <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addModal">
        <i class="bi bi-plus-lg me-1"></i> Add Category
      </button>
    </div>
  <?php else: ?>
    <div class="table-responsive">
      <table class="table admin-table mb-0">
        <thead>
          <tr>
            <th style="width:64px">Image</th>
            <th>Name / Title</th>
            <th>Slug</th>
            <th style="width:120px">Subcategories</th>
            <th style="width:100px">Status</th>
            <th style="width:130px" class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($categories as $cat): ?>
            <tr>
              <td>
                <?php if (! empty($cat['image'])): ?>
                  <img src="<?= esc($cat['image'], 'attr') ?>" alt="" class="cat-thumb">
                <?php else: ?>
                  <span class="cat-thumb cat-thumb-empty"><i class="bi bi-image"></i></span>
                <?php endif; ?>
              </td>
              <td>
                <a href="/admin/categories/<?= (int) $cat['id'] ?>" class="fw-semibold text-decoration-none">
                  <?= esc($cat['name']) ?>
                </a>
                <?php if (! empty($cat['title'])): ?>
                  <div class="text-muted" style="font-size:.78rem"><?= esc($cat['title']) ?> <?= esc($cat['subtitle'] ?? '') ?></div>
                <?php endif; ?>
              </td>
              <td><code class="slug-badge"><?= esc($cat['slug']) ?></code></td>
              <td><span class="sort-pill"><?= (int) ($cat['sub_count'] ?? 0) ?></span></td>
              <td>
                <?php $pub = ($cat['status'] ?? 'draft') === 'published'; ?>
                <span class="status-badge <?= $pub ? 'is-pub' : 'is-draft' ?>">
                  <?= $pub ? 'Published' : 'Draft' ?>
                </span>
              </td>
              <td class="text-end">
                <div class="d-flex gap-2 justify-content-end">
                  <a href="/admin/categories/<?= (int) $cat['id'] ?>" class="btn-tbl-action edit" title="Edit">
                    <i class="bi bi-pencil"></i>
                  </a>
                  <button type="button" class="btn-tbl-action danger" title="Delete"
                          data-id="<?= (int) $cat['id'] ?>"
                          data-name="<?= esc($cat['name'], 'attr') ?>"
                          data-bs-toggle="modal" data-bs-target="#deleteModal">
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
    <div class="px-4 py-2 border-top" style="font-size:.78rem;color:var(--admin-muted)">
      <?= count($categories) ?> <?= count($categories) === 1 ? 'category' : 'categories' ?>
    </div>
  <?php endif; ?>
</div>

<!-- ── Add Modal (name only → jump to editor) ──────────────────── -->
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
          <div class="mb-1">
            <label class="form-label admin-label" for="add_name">Category Name <span class="text-danger">*</span></label>
            <input type="text" id="add_name" name="name" class="form-control admin-input"
                   placeholder="e.g. Tiles" required autofocus>
            <div class="form-text">You'll add the frontend title, image, hero and subcategories on the next screen.</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm"><i class="bi bi-check-lg me-1"></i> Create &amp; Edit</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ── Delete Confirm Modal ────────────────────────────────────── -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:420px">
    <div class="modal-content admin-modal">
      <div class="modal-header border-0 pb-0">
        <h5 class="modal-title text-danger"><i class="bi bi-exclamation-triangle-fill me-2"></i>Delete Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form id="deleteForm" method="post">
        <?= csrf_field() ?>
        <div class="modal-body">
          <p class="text-muted mb-0">
            Delete <strong id="deleteTargetName">this category</strong> and all its subcategories?
            Products keep their records but lose this association.
          </p>
        </div>
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
document.getElementById('deleteModal').addEventListener('show.bs.modal', function (e) {
  const btn = e.relatedTarget;
  document.getElementById('deleteForm').action = '/admin/categories/' + btn.dataset.id + '/delete';
  document.getElementById('deleteTargetName').textContent = '"' + btn.dataset.name + '"';
});
</script>

<?= $this->endSection() ?>
