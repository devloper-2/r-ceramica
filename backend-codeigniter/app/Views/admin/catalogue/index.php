<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<div class="page-heading">
  <div class="page-heading-copy">
    <span class="page-icon"><i class="bi bi-journal-richtext"></i></span>
    <div>
      <p class="eyebrow mb-1">Content</p>
      <h1>Catalogue</h1>
      <p class="text-muted mb-0" style="font-size:.88rem">Downloadable catalogue entries shown on the /catalogue page.</p>
    </div>
  </div>
  <div class="heading-actions">
    <a class="btn btn-primary btn-sm" href="/admin/catalogue/new"><i class="bi bi-plus-lg me-1"></i> Add Catalogue</a>
  </div>
</div>

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

<div class="panel" style="padding:0">
  <?php if (empty($catalogues)): ?>
    <div class="text-center py-5">
      <i class="bi bi-journal-richtext fs-1 text-muted opacity-50 d-block mb-2"></i>
      <p class="text-muted mb-3">No catalogues yet.</p>
      <a class="btn btn-primary btn-sm" href="/admin/catalogue/new"><i class="bi bi-plus-lg me-1"></i> Add Catalogue</a>
    </div>
  <?php else: ?>
    <div class="table-responsive">
      <table class="table admin-table mb-0">
        <thead>
          <tr>
            <th style="width:64px">Image</th>
            <th>Title</th>
            <th>Tags</th>
            <th style="width:90px">PDF</th>
            <th style="width:90px">Status</th>
            <th style="width:100px" class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($catalogues as $c): ?>
            <tr>
              <td>
                <?php if (! empty($c['image'])): ?>
                  <img src="<?= esc($c['image'], 'attr') ?>" class="cat-thumb" alt="">
                <?php else: ?>
                  <span class="cat-thumb cat-thumb-empty"><i class="bi bi-image"></i></span>
                <?php endif; ?>
              </td>
              <td>
                <a href="/admin/catalogue/<?= (int) $c['id'] ?>" class="fw-semibold text-decoration-none"><?= esc($c['title']) ?> <?= esc($c['title_line2'] ?? '') ?></a>
                <div class="text-muted" style="font-size:.76rem"><?= esc($c['eyebrow'] ?? '') ?></div>
              </td>
              <td class="text-muted" style="font-size:.78rem"><?= esc(is_array($c['tags']) ? implode(', ', $c['tags']) : '') ?></td>
              <td>
                <?php if (! empty($c['pdf_path'])): ?>
                  <a href="<?= esc($c['pdf_path'], 'attr') ?>" target="_blank" class="text-decoration-none"><i class="bi bi-file-earmark-pdf"></i> PDF</a>
                <?php else: ?>
                  <span class="text-muted">—</span>
                <?php endif; ?>
              </td>
              <td>
                <?php $pub = $c['status'] === 'published'; ?>
                <span class="status-badge <?= $pub ? 'is-pub' : 'is-draft' ?>"><?= $pub ? 'Published' : 'Draft' ?></span>
              </td>
              <td class="text-end">
                <a href="/admin/catalogue/<?= (int) $c['id'] ?>" class="btn-tbl-action edit" title="Edit"><i class="bi bi-pencil"></i></a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</div>

<?= $this->include('admin/categories/_styles') ?>
<?= $this->endSection() ?>
