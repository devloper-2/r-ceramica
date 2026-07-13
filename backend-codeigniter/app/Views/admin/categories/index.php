<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<!-- Page heading -->
<div class="page-heading">
  <div class="page-heading-copy">
    <span class="page-icon"><i class="bi bi-tags"></i></span>
    <div>
      <p class="eyebrow mb-1">Content</p>
      <h1>Categories</h1>
      <p class="text-muted mb-0" style="font-size:.88rem">
        Manage product categories. The slug is auto-generated from the name.
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
            <th style="width:60px">#</th>
            <th>Name</th>
            <th>Slug</th>
            <th style="width:110px">Sort Order</th>
            <th style="width:130px" class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody id="categoryTableBody">
          <?php foreach ($categories as $cat): ?>
            <tr data-id="<?= (int) $cat['id'] ?>">
              <td class="text-muted" style="font-size:.82rem"><?= (int) $cat['id'] ?></td>
              <td>
                <span class="fw-semibold"><?= esc($cat['name']) ?></span>
              </td>
              <td>
                <code class="slug-badge"><?= esc($cat['slug']) ?></code>
              </td>
              <td>
                <span class="sort-pill"><?= (int) $cat['sort_order'] ?></span>
              </td>
              <td class="text-end">
                <div class="d-flex gap-2 justify-content-end">
                  <button type="button" class="btn-tbl-action edit"
                          title="Edit"
                          data-id="<?= (int) $cat['id'] ?>"
                          data-name="<?= esc($cat['name'], 'attr') ?>"
                          data-sort="<?= (int) $cat['sort_order'] ?>"
                          data-bs-toggle="modal" data-bs-target="#editModal">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button type="button" class="btn-tbl-action danger"
                          title="Delete"
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

<!-- ── Add Modal ───────────────────────────────────────────────── -->
<div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:460px">
    <div class="modal-content admin-modal">
      <div class="modal-header">
        <h5 class="modal-title" id="addModalLabel">
          <i class="bi bi-plus-circle me-2" style="color:var(--admin-primary)"></i>Add Category
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form action="/admin/categories" method="post" id="addForm">
        <?= csrf_field() ?>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label admin-label" for="add_name">Category Name <span class="text-danger">*</span></label>
            <input type="text" id="add_name" name="name" class="form-control admin-input"
                   placeholder="e.g. Bathroom Tiles" required autofocus
                   oninput="previewSlug(this.value, 'add_slug_preview')">
            <div class="form-text">
              Slug: <code id="add_slug_preview" class="slug-preview">—</code>
            </div>
          </div>
          <div class="mb-1">
            <label class="form-label admin-label" for="add_sort">Sort Order</label>
            <input type="number" id="add_sort" name="sort_order" value="0" min="0" max="9999"
                   class="form-control admin-input" style="max-width:120px">
            <div class="form-text">Lower numbers appear first in lists.</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm">
            <i class="bi bi-check-lg me-1"></i> Save Category
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ── Edit Modal ──────────────────────────────────────────────── -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:460px">
    <div class="modal-content admin-modal">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel">
          <i class="bi bi-pencil-square me-2" style="color:var(--admin-primary)"></i>Edit Category
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form id="editForm" method="post">
        <?= csrf_field() ?>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label admin-label" for="edit_name">Category Name <span class="text-danger">*</span></label>
            <input type="text" id="edit_name" name="name" class="form-control admin-input"
                   placeholder="e.g. Bathroom Tiles" required
                   oninput="previewSlug(this.value, 'edit_slug_preview')">
            <div class="form-text">
              Slug: <code id="edit_slug_preview" class="slug-preview">—</code>
            </div>
          </div>
          <div class="mb-1">
            <label class="form-label admin-label" for="edit_sort">Sort Order</label>
            <input type="number" id="edit_sort" name="sort_order" value="0" min="0" max="9999"
                   class="form-control admin-input" style="max-width:120px">
            <div class="form-text">Lower numbers appear first in lists.</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm">
            <i class="bi bi-check-lg me-1"></i> Update Category
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ── Delete Confirm Modal ────────────────────────────────────── -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:420px">
    <div class="modal-content admin-modal">
      <div class="modal-header border-0 pb-0">
        <h5 class="modal-title text-danger" id="deleteModalLabel">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>Delete Category
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form id="deleteForm" method="post">
        <?= csrf_field() ?>
        <div class="modal-body">
          <p class="text-muted mb-0">
            Are you sure you want to delete
            <strong id="deleteTargetName">this category</strong>?
            Products assigned to it will not be deleted, but they will lose this category association.
          </p>
        </div>
        <div class="modal-footer border-0 pt-0">
          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-danger btn-sm">
            <i class="bi bi-trash3 me-1"></i> Delete
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
/* ── Admin table ──────────────────────────────── */
.admin-table {
  font-size: .86rem;
  border-collapse: separate;
  border-spacing: 0;
}
.admin-table thead th {
  background: var(--admin-surface-soft);
  font-size: .72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--admin-muted);
  border-bottom: 1px solid var(--admin-border);
  padding: .75rem 1rem;
}
.admin-table tbody td {
  padding: .9rem 1rem;
  border-bottom: 1px solid var(--admin-border);
  vertical-align: middle;
}
.admin-table tbody tr:last-child td { border-bottom: none; }
.admin-table tbody tr:hover td { background: var(--admin-surface-soft); }

.slug-badge {
  background: rgba(201,162,75,.1);
  color: var(--admin-primary-dark);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: .78rem;
}
.sort-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 22px;
  background: var(--admin-surface-soft);
  border: 1px solid var(--admin-border);
  border-radius: 20px;
  font-size: .75rem;
  font-weight: 600;
  color: var(--admin-muted);
}

/* ── Table action buttons ─────────────────────── */
.btn-tbl-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px; height: 32px;
  border-radius: 7px;
  border: 1px solid var(--admin-border);
  background: var(--admin-surface-soft);
  color: var(--admin-muted);
  font-size: .88rem;
  cursor: pointer;
  transition: background .14s, color .14s, border-color .14s;
}
.btn-tbl-action.edit:hover {
  background: rgba(201,162,75,.12);
  color: var(--admin-primary);
  border-color: rgba(201,162,75,.4);
}
.btn-tbl-action.danger:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fca5a5;
}

/* ── Modal ────────────────────────────────────── */
.admin-modal {
  border: 1px solid var(--admin-border);
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(15,23,42,.18);
}
.admin-modal .modal-header {
  border-bottom: 1px solid var(--admin-border);
  padding: 1.1rem 1.25rem .9rem;
}
.admin-modal .modal-footer {
  border-top: 1px solid var(--admin-border);
  padding: .9rem 1.25rem;
}
.admin-modal .modal-body { padding: 1.25rem; }

.admin-label {
  font-size: .82rem;
  font-weight: 700;
  color: var(--admin-text);
  margin-bottom: .35rem;
}
.admin-input {
  border-color: var(--admin-border) !important;
  background: var(--admin-surface-soft) !important;
  font-size: .88rem;
  border-radius: 8px !important;
}
.admin-input:focus {
  border-color: var(--admin-primary) !important;
  box-shadow: 0 0 0 4px rgba(201,162,75,.15) !important;
  background: #fff !important;
}
.slug-preview {
  color: var(--admin-primary-dark);
  background: rgba(201,162,75,.1);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: .8rem;
}
</style>

<script>
// ── Slug preview ───────────────────────────────────────────
function previewSlug(name, targetId) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  document.getElementById(targetId).textContent = slug || '—';
}

// ── Wire up Edit modal ─────────────────────────────────────
document.getElementById('editModal').addEventListener('show.bs.modal', function (e) {
  const btn  = e.relatedTarget;
  const id   = btn.dataset.id;
  const name = btn.dataset.name;
  const sort = btn.dataset.sort;

  document.getElementById('editForm').action = '/admin/categories/' + id;
  document.getElementById('edit_name').value  = name;
  document.getElementById('edit_sort').value  = sort;
  previewSlug(name, 'edit_slug_preview');
});

// ── Wire up Delete modal ───────────────────────────────────
document.getElementById('deleteModal').addEventListener('show.bs.modal', function (e) {
  const btn  = e.relatedTarget;
  const id   = btn.dataset.id;
  const name = btn.dataset.name;

  document.getElementById('deleteForm').action   = '/admin/categories/' + id + '/delete';
  document.getElementById('deleteTargetName').textContent = '"' + name + '"';
});
</script>

<?= $this->endSection() ?>
