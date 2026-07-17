<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<?php
// Icon map per slug
$icons = [
    'home'      => ['bi-house-fill',        '#c9a24b', 'rgba(201,162,75,.12)'],
    'about'     => ['bi-people-fill',        '#0f766e', '#e7f6f3'],
    'products'  => ['bi-grid-3x3-gap-fill',  '#2563eb', '#eff6ff'],
    'bathrooms' => ['bi-droplet-fill',        '#7c3aed', '#f5f3ff'],
    'catalogue' => ['bi-book-fill',           '#d97706', '#fff7ed'],
    'contact'   => ['bi-envelope-fill',       '#0891b2', '#e0f7fa'],
    'explore'   => ['bi-compass-fill',        '#059669', '#ecfdf5'],
    'privacy'   => ['bi-shield-fill-check',   '#4b5563', '#f3f4f6'],
    'terms'     => ['bi-file-earmark-text-fill','#6b7280','#f3f4f6'],
];
$defaultIcon = ['bi-file-earmark-fill', '#6b7280', '#f3f4f6'];

$published = array_filter($pages, fn($p) => $p['status'] === 'published');
$drafts    = array_filter($pages, fn($p) => $p['status'] !== 'published');
?>

<!-- Page heading -->
<div class="page-heading">
  <div class="page-heading-copy">
    <span class="page-icon"><i class="bi bi-file-earmark-text"></i></span>
    <div>
      <p class="eyebrow mb-1">Content</p>
      <h1>Pages &amp; Sections</h1>
      <p class="text-muted mb-0" style="font-size:.88rem">
        Edit every page's text, images and SEO. Click <strong>Publish Site</strong> when ready to go live.
      </p>
    </div>
  </div>
  <div class="heading-actions">
    <span class="stat-pill published"><i class="bi bi-check-circle me-1"></i><?= count($published) ?> published</span>
    <?php if (count($drafts)): ?>
      <span class="stat-pill draft"><i class="bi bi-pencil me-1"></i><?= count($drafts) ?> draft</span>
    <?php endif; ?>
  </div>
</div>

<!-- Pages grid -->
<div class="pages-grid">
  <?php foreach ($pages as $p):
    [$ico, $clr, $bg] = $icons[$p['slug']] ?? $defaultIcon;
    $url = '/' . ($p['slug'] === 'home' ? '' : $p['slug']);
    $published = $p['status'] === 'published';
  ?>
  <article class="page-card">
    <div class="page-card-top">
      <div class="page-card-icon" style="background:<?= $bg ?>;color:<?= $clr ?>">
        <i class="bi <?= $ico ?>"></i>
      </div>
      <span class="status-badge <?= $published ? 'published' : 'draft' ?>">
        <span class="status-dot"></span>
        <?= $published ? 'Published' : 'Draft' ?>
      </span>
    </div>

    <h2 class="page-card-title"><?= esc($p['title']) ?></h2>
    <p class="page-card-url"><?= esc($url) ?></p>

    <div class="page-card-footer">
      <a href="/admin/pages/<?= (int) $p['id'] ?>" class="btn-edit-page">
        <i class="bi bi-pencil-square me-1"></i> Edit Page
      </a>
    </div>
  </article>
  <?php endforeach; ?>
</div>

<style>
/* ── Stat pills ──────────────────────────────── */
.stat-pill {
  display: inline-flex;
  align-items: center;
  padding: .35rem .85rem;
  border-radius: 20px;
  font-size: .78rem;
  font-weight: 700;
}
.stat-pill.published { background: #dcfce7; color: #15803d; }
.stat-pill.draft     { background: #fef3c7; color: #b45309; }

/* ── Pages grid ──────────────────────────────── */
.pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}

/* ── Page card ───────────────────────────────── */
.page-card {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: .75rem;
  transition: box-shadow .17s, transform .17s, border-color .17s;
  box-shadow: var(--admin-shadow-sm);
}
.page-card:hover {
  box-shadow: var(--admin-shadow);
  transform: translateY(-3px);
  border-color: rgba(201,162,75,.35);
}

.page-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: .5rem;
}

.page-card-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  display: grid; place-items: center;
  font-size: 1.15rem;
  flex: 0 0 44px;
}

/* Status badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: .3rem;
  padding: .2rem .6rem;
  border-radius: 20px;
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .02em;
}
.status-badge.published { background: #dcfce7; color: #15803d; }
.status-badge.draft     { background: #fef3c7; color: #b45309; }
.status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor; flex: 0 0 6px;
}

.page-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--admin-text);
  margin: 0;
  line-height: 1.3;
}
.page-card-url {
  font-size: .8rem;
  color: var(--admin-muted);
  font-family: ui-monospace, Consolas, monospace;
  background: var(--admin-surface-soft);
  border: 1px solid var(--admin-border);
  border-radius: 6px;
  padding: .25rem .55rem;
  margin: 0;
  display: inline-block;
}

.page-card-footer {
  margin-top: auto;
  padding-top: .6rem;
  border-top: 1px solid var(--admin-border);
}
.btn-edit-page {
  display: inline-flex;
  align-items: center;
  font-size: .82rem;
  font-weight: 600;
  color: var(--admin-primary);
  text-decoration: none;
  transition: color .14s;
}
.btn-edit-page:hover { color: var(--admin-primary-dark); }
</style>

<?= $this->endSection() ?>
