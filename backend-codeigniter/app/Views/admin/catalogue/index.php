<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<style>
/* ── Catalogue listing ── */
.cl-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1.75rem; flex-wrap: wrap; gap: 1rem;
}
.cl-title    { font-size: 1.6rem; font-weight: 800; margin: 0; color: var(--admin-text); }
.cl-subtitle { font-size: .82rem; color: var(--admin-muted); margin: .15rem 0 0; }

.cl-new-btn {
  display: inline-flex; align-items: center; gap: .45rem;
  background: var(--admin-primary); color: #3a2600;
  border: none; border-radius: 9px;
  padding: .6rem 1.3rem; font-weight: 800; font-size: .88rem;
  text-decoration: none; white-space: nowrap;
  box-shadow: 0 4px 14px rgba(201,162,75,.35);
  transition: filter .15s, box-shadow .15s;
}
.cl-new-btn:hover { filter: brightness(.92); box-shadow: 0 6px 20px rgba(201,162,75,.45); color: #3a2600; text-decoration: none; }

/* Card grid */
.cl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.cl-card {
  background: var(--admin-surface);
  border: 1.5px solid var(--admin-border);
  border-radius: 14px; overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
  display: flex; flex-direction: column;
  transition: border-color .18s, box-shadow .18s, transform .18s;
  text-decoration: none;
}
.cl-card:hover {
  border-color: rgba(201,162,75,.5);
  box-shadow: 0 8px 28px rgba(0,0,0,.1);
  transform: translateY(-3px);
  text-decoration: none;
}

/* Card image */
.cl-card-img {
  width: 100%; height: 170px; object-fit: cover; display: block;
}
.cl-card-img-placeholder {
  width: 100%; height: 170px;
  background: var(--admin-surface-soft);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: .4rem;
  color: var(--admin-border);
}
.cl-card-img-placeholder i { font-size: 2rem; }
.cl-card-img-placeholder span { font-size: .72rem; color: var(--admin-muted); }

/* Card body */
.cl-card-body { padding: .9rem 1rem .75rem; flex: 1; display: flex; flex-direction: column; gap: .35rem; }

.cl-card-title {
  font-weight: 800; font-size: .95rem; color: var(--admin-text);
  line-height: 1.3; margin: 0;
}
.cl-card-eyebrow { font-size: .75rem; color: var(--admin-muted); }

/* Tag chips */
.cl-tag-list { display: flex; flex-wrap: wrap; gap: .3rem; margin-top: .2rem; }
.cl-tag {
  display: inline-block;
  background: rgba(201,162,75,.1); color: #8a6a1a;
  border: 1px solid rgba(201,162,75,.25);
  padding: 1px 8px; border-radius: 20px;
  font-size: .68rem; font-weight: 700;
}

/* Card footer */
.cl-card-footer {
  padding: .6rem 1rem;
  border-top: 1px solid var(--admin-border);
  background: var(--admin-surface-soft);
  display: flex; align-items: center; justify-content: space-between; gap: .5rem;
}
.cl-pdf-link {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .75rem; font-weight: 600; color: var(--admin-danger);
  text-decoration: none;
  transition: opacity .14s;
}
.cl-pdf-link:hover { opacity: .75; color: var(--admin-danger); }
.cl-no-pdf { font-size: .75rem; color: var(--admin-muted); }

.cl-status {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .7rem; font-weight: 700; padding: 3px 9px; border-radius: 20px;
}
.cl-status.published { background: #dcfce7; color: #065f46; }
.cl-status.draft     { background: #f3f4f6; color: var(--admin-muted); }

.cl-edit-btn {
  display: inline-flex; align-items: center; gap: .3rem;
  background: var(--admin-primary); color: #3a2600;
  border-radius: 7px; padding: .28rem .7rem;
  font-size: .73rem; font-weight: 800;
  text-decoration: none; opacity: 0;
  transition: opacity .15s;
}
.cl-card:hover .cl-edit-btn { opacity: 1; }

/* Empty state */
.cl-empty {
  text-align: center; padding: 5rem 2rem; color: var(--admin-muted);
}
.cl-empty i { font-size: 3rem; display: block; margin-bottom: .75rem; color: var(--admin-border); }
.cl-empty p { margin: 0 0 1.2rem; font-size: .9rem; }
</style>

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
<div class="cl-header">
  <div>
    <h1 class="cl-title">Catalogue</h1>
    <p class="cl-subtitle"><?= count($catalogues) ?> entr<?= count($catalogues) !== 1 ? 'ies' : 'y' ?> · shown on /catalogue page</p>
  </div>
  <a href="/admin/catalogue/new" class="cl-new-btn">
    <i class="bi bi-plus-lg"></i> Add Catalogue
  </a>
</div>

<?php if (empty($catalogues)): ?>
  <div class="cl-empty">
    <i class="bi bi-journal-richtext"></i>
    <p>No catalogues yet. Add your first one.</p>
    <a href="/admin/catalogue/new" class="cl-new-btn">+ Add Catalogue</a>
  </div>
<?php else: ?>
  <div class="cl-grid">
    <?php foreach ($catalogues as $c):
      $pub  = ($c['status'] ?? 'draft') === 'published';
      $tags = is_array($c['tags']) ? array_filter($c['tags']) : [];
    ?>
    <a href="/admin/catalogue/<?= (int) $c['id'] ?>" class="cl-card">

      <!-- Image -->
      <?php if (!empty($c['image'])): ?>
        <img class="cl-card-img" src="<?= esc($c['image'], 'attr') ?>" alt="<?= esc($c['title'], 'attr') ?>">
      <?php else: ?>
        <div class="cl-card-img-placeholder">
          <i class="bi bi-journal-richtext"></i>
          <span>No cover</span>
        </div>
      <?php endif; ?>

      <!-- Body -->
      <div class="cl-card-body">
        <p class="cl-card-title">
          <?= esc($c['title']) ?>
          <?php if (!empty($c['title_line2'])): ?>
            <span style="font-weight:500;color:var(--admin-muted)"> <?= esc($c['title_line2']) ?></span>
          <?php endif; ?>
        </p>
        <?php if (!empty($c['eyebrow'])): ?>
          <span class="cl-card-eyebrow"><?= esc($c['eyebrow']) ?></span>
        <?php endif; ?>
        <?php if ($tags): ?>
          <div class="cl-tag-list">
            <?php foreach (array_slice($tags, 0, 6) as $t): ?>
              <span class="cl-tag"><?= esc(trim($t)) ?></span>
            <?php endforeach; ?>
            <?php if (count($tags) > 6): ?>
              <span class="cl-tag" style="background:var(--admin-surface-soft);color:var(--admin-muted)">+<?= count($tags) - 6 ?></span>
            <?php endif; ?>
          </div>
        <?php endif; ?>
      </div>

      <!-- Footer -->
      <div class="cl-card-footer">
        <?php if (!empty($c['pdf_path'])): ?>
          <span class="cl-pdf-link" onclick="event.preventDefault();window.open('<?= esc($c['pdf_path'], 'attr') ?>','_blank')">
            <i class="bi bi-file-earmark-pdf-fill"></i> PDF
          </span>
        <?php else: ?>
          <span class="cl-no-pdf"><i class="bi bi-file-earmark me-1"></i>No PDF</span>
        <?php endif; ?>
        <div style="display:flex;align-items:center;gap:.5rem">
          <span class="cl-status <?= $pub ? 'published' : 'draft' ?>">
            <i class="bi bi-<?= $pub ? 'check-circle-fill' : 'circle' ?>"></i>
            <?= $pub ? 'Published' : 'Draft' ?>
          </span>
          <span class="cl-edit-btn"><i class="bi bi-pencil-fill"></i> Edit</span>
        </div>
      </div>

    </a>
    <?php endforeach; ?>
  </div>
<?php endif; ?>

<?= $this->endSection() ?>
