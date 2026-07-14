<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<style>
/* ── Products listing ── */
.pl-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1.75rem; flex-wrap: wrap; gap: 1rem;
}
.pl-title { font-size: 1.6rem; font-weight: 800; margin: 0; color: var(--admin-text); }
.pl-subtitle { font-size: .82rem; color: var(--admin-muted); margin: .15rem 0 0; }

.pl-new-btn {
  display: inline-flex; align-items: center; gap: .45rem;
  background: var(--admin-primary); color: #3a2600;
  border: none; border-radius: 9px;
  padding: .6rem 1.3rem; font-weight: 800; font-size: .88rem;
  text-decoration: none; white-space: nowrap;
  box-shadow: 0 4px 14px rgba(201,162,75,.35);
  transition: filter .15s, box-shadow .15s;
}
.pl-new-btn:hover { filter: brightness(.92); box-shadow: 0 6px 20px rgba(201,162,75,.45); color: #3a2600; text-decoration: none; }

/* Filter bar */
.pl-filters {
  display: flex; align-items: center; gap: .75rem;
  margin-bottom: 1.5rem;
}
.pl-search {
  width: 100%;
  height: 38px; padding: .35rem .85rem .35rem 2.2rem;
  border: 1.5px solid var(--admin-border); border-radius: 9px;
  background: var(--admin-surface); color: var(--admin-text);
  font-size: .85rem;
  transition: border-color .15s, box-shadow .15s;
}
.pl-search:focus { outline: none; border-color: var(--admin-primary); box-shadow: 0 0 0 3px rgba(201,162,75,.15); }
.pl-search-wrap { position: relative; width: 260px; flex-shrink: 0; }
.pl-search-wrap .bi { position: absolute; left: .7rem; top: 50%; transform: translateY(-50%); color: var(--admin-muted); pointer-events: none; }
.pl-filter-select {
  height: 38px; padding: .3rem .85rem;
  border: 1.5px solid var(--admin-border); border-radius: 9px;
  background: var(--admin-surface); color: var(--admin-text);
  font-size: .82rem; cursor: pointer; width: auto; flex-shrink: 0;
  transition: border-color .15s;
}
.pl-filter-select:focus { outline: none; border-color: var(--admin-primary); }
.pl-count { margin-left: auto; font-size: .8rem; color: var(--admin-muted); white-space: nowrap; }

/* Card grid */
.pl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.1rem;
}

.pl-card {
  background: var(--admin-surface);
  border: 1.5px solid var(--admin-border);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
  transition: border-color .18s, box-shadow .18s, transform .18s;
  display: flex; flex-direction: column;
  text-decoration: none;
}
.pl-card:hover {
  border-color: rgba(201,162,75,.5);
  box-shadow: 0 8px 28px rgba(0,0,0,.1);
  transform: translateY(-3px);
  text-decoration: none;
}

/* Card image */
.pl-card-img {
  width: 100%; height: 180px; object-fit: cover; display: block;
  background: var(--admin-surface-soft);
}
.pl-card-img-placeholder {
  width: 100%; height: 180px;
  background: var(--admin-surface-soft);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: .4rem;
  color: var(--admin-border);
}
.pl-card-img-placeholder i { font-size: 2.2rem; }
.pl-card-img-placeholder span { font-size: .72rem; color: var(--admin-muted); }

/* Card body */
.pl-card-body { padding: .9rem 1rem 1rem; flex: 1; display: flex; flex-direction: column; gap: .4rem; }

.pl-card-name {
  font-weight: 800; font-size: .95rem; color: var(--admin-text);
  line-height: 1.3; margin: 0;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.pl-card-slug { font-size: .72rem; color: var(--admin-muted); }

.pl-card-meta {
  display: flex; align-items: center; gap: .4rem;
  flex-wrap: wrap; margin-top: .25rem;
}
.pl-cat-badge {
  display: inline-flex; align-items: center; gap: .25rem;
  background: rgba(201,162,75,.1); color: #8a6a1a;
  font-size: .68rem; font-weight: 700; padding: 2px 8px;
  border-radius: 20px; letter-spacing: .03em;
}
.pl-subcat-badge {
  display: inline-flex; align-items: center; gap: .2rem;
  background: var(--admin-surface-soft); color: var(--admin-muted);
  font-size: .68rem; font-weight: 600; padding: 2px 7px;
  border-radius: 20px; border: 1px solid var(--admin-border);
}

/* Card footer */
.pl-card-footer {
  padding: .65rem 1rem;
  border-top: 1px solid var(--admin-border);
  display: flex; align-items: center; justify-content: space-between;
  background: var(--admin-surface-soft);
}
.pl-price { font-weight: 800; font-size: .9rem; color: var(--admin-text); }
.pl-price small { font-weight: 600; font-size: .72rem; color: var(--admin-muted); margin-right: 2px; }

.pl-status {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .7rem; font-weight: 700; padding: 3px 9px; border-radius: 20px;
}
.pl-status.published { background: #dcfce7; color: #065f46; }
.pl-status.draft     { background: #f3f4f6; color: var(--admin-muted); }

/* Edit hover overlay */
.pl-card-edit-btn {
  display: inline-flex; align-items: center; gap: .3rem;
  background: var(--admin-primary); color: #3a2600;
  border: none; border-radius: 7px;
  padding: .3rem .75rem; font-size: .75rem; font-weight: 800;
  text-decoration: none; opacity: 0;
  transition: opacity .15s;
}
.pl-card:hover .pl-card-edit-btn { opacity: 1; }

/* Empty state */
.pl-empty {
  grid-column: 1/-1; text-align: center;
  padding: 4rem 2rem; color: var(--admin-muted);
}
.pl-empty i { font-size: 3rem; display: block; margin-bottom: .75rem; color: var(--admin-border); }
.pl-empty p { font-size: .9rem; margin: 0 0 1.2rem; }
</style>

<!-- Header -->
<div class="pl-header">
  <div>
    <h1 class="pl-title">Products</h1>
    <p class="pl-subtitle"><?= count($products) ?> product<?= count($products) !== 1 ? 's' : '' ?> total</p>
  </div>
  <a href="/admin/products/new" class="pl-new-btn">
    <i class="bi bi-plus-lg"></i> New Product
  </a>
</div>

<!-- Filter bar -->
<div class="pl-filters">
  <div class="pl-search-wrap">
    <i class="bi bi-search"></i>
    <input type="text" id="pl-search" class="pl-search" placeholder="Search products…">
  </div>
  <select id="pl-status-filter" class="pl-filter-select">
    <option value="">All statuses</option>
    <option value="published">Published</option>
    <option value="draft">Draft</option>
  </select>
  <select id="pl-cat-filter" class="pl-filter-select">
    <option value="">All categories</option>
    <?php
      $cats = array_unique(array_filter(array_column($products, 'category_name')));
      sort($cats);
      foreach ($cats as $cat): ?>
      <option value="<?= esc($cat) ?>"><?= esc($cat) ?></option>
    <?php endforeach; ?>
  </select>
  <span class="pl-count" id="pl-visible-count"><?= count($products) ?> shown</span>
</div>

<!-- Card grid -->
<div class="pl-grid" id="pl-grid">
  <?php if ($products): ?>
    <?php foreach ($products as $p): ?>
    <?php $isPublished = ($p['status'] ?? 'draft') === 'published'; ?>
    <a href="/admin/products/<?= (int) $p['id'] ?>" class="pl-card"
       data-name="<?= strtolower(esc($p['name'], 'attr')) ?>"
       data-status="<?= esc($p['status'] ?? 'draft', 'attr') ?>"
       data-cat="<?= esc($p['category_name'] ?? '', 'attr') ?>">

      <!-- Image -->
      <?php if (!empty($p['primary_image'])): ?>
        <img class="pl-card-img" src="<?= esc($p['primary_image']) ?>" alt="<?= esc($p['name'], 'attr') ?>">
      <?php else: ?>
        <div class="pl-card-img-placeholder">
          <i class="bi bi-image"></i>
          <span>No image</span>
        </div>
      <?php endif; ?>

      <!-- Body -->
      <div class="pl-card-body">
        <p class="pl-card-name"><?= esc($p['name']) ?></p>
        <span class="pl-card-slug">/<?= esc($p['slug']) ?></span>
        <div class="pl-card-meta">
          <?php if (!empty($p['category_name'])): ?>
            <span class="pl-cat-badge"><i class="bi bi-tag-fill"></i><?= esc($p['category_name']) ?></span>
          <?php endif; ?>
          <?php if (!empty($p['subcategory_name'])): ?>
            <span class="pl-subcat-badge"><i class="bi bi-arrow-return-right"></i><?= esc($p['subcategory_name']) ?></span>
          <?php endif; ?>
        </div>
      </div>

      <!-- Footer -->
      <div class="pl-card-footer">
        <span class="pl-price">
          <small><?= esc($p['currency'] ?? 'INR') ?></small><?= number_format((float)($p['price'] ?? 0)) ?>
        </span>
        <div style="display:flex;align-items:center;gap:.5rem">
          <span class="pl-status <?= $isPublished ? 'published' : 'draft' ?>">
            <i class="bi bi-<?= $isPublished ? 'check-circle-fill' : 'circle' ?>"></i>
            <?= $isPublished ? 'Published' : 'Draft' ?>
          </span>
          <span class="pl-card-edit-btn"><i class="bi bi-pencil-fill"></i> Edit</span>
        </div>
      </div>
    </a>
    <?php endforeach; ?>
  <?php endif; ?>

  <!-- Empty state (shown by JS when filters match nothing) -->
  <div class="pl-empty" id="pl-empty-state" style="display:none">
    <i class="bi bi-box-seam"></i>
    <p>No products match your filters.</p>
  </div>

  <?php if (!$products): ?>
  <div class="pl-empty">
    <i class="bi bi-box-seam"></i>
    <p>No products yet. Create your first one.</p>
    <a href="/admin/products/new" class="pl-new-btn">+ New Product</a>
  </div>
  <?php endif; ?>
</div>

<script>
(function () {
  const grid    = document.getElementById('pl-grid');
  const search  = document.getElementById('pl-search');
  const statusF = document.getElementById('pl-status-filter');
  const catF    = document.getElementById('pl-cat-filter');
  const counter = document.getElementById('pl-visible-count');
  const empty   = document.getElementById('pl-empty-state');
  const cards   = Array.from(grid.querySelectorAll('.pl-card'));

  function filter() {
    const q   = search.value.toLowerCase().trim();
    const st  = statusF.value;
    const cat = catF.value;
    let visible = 0;

    cards.forEach(card => {
      const nameMatch   = !q  || card.dataset.name.includes(q);
      const statusMatch = !st || card.dataset.status === st;
      const catMatch    = !cat || card.dataset.cat === cat;
      const show = nameMatch && statusMatch && catMatch;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    counter.textContent = visible + ' shown';
    empty.style.display = visible === 0 ? 'block' : 'none';
  }

  search.addEventListener('input', filter);
  statusF.addEventListener('change', filter);
  catF.addEventListener('change', filter);
})();
</script>

<?= $this->endSection() ?>
