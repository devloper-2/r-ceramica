<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<div class="page-heading">
  <div class="page-heading-copy">
    <span class="page-icon"><i class="bi bi-speedometer2"></i></span>
    <div>
      <p class="eyebrow mb-1">Overview</p>
      <h1>Dashboard</h1>
      <p class="text-muted mb-0" style="font-size:.88rem">
        Welcome back, <strong><?= esc($admin['name']) ?></strong> — manage your site content below.
      </p>
    </div>
  </div>
  <div class="heading-actions">
    <a href="/admin/pages" class="btn btn-light btn-sm">
      <i class="bi bi-file-earmark-text me-1"></i> Edit Content
    </a>
  </div>
</div>

<!-- Metric cards -->
<section class="row g-3" aria-label="Site metrics">
  <div class="col-12 col-sm-6 col-xl-3">
    <article class="metric-card metric-primary">
      <div class="metric-top">
        <span class="metric-label">Pages</span>
        <span class="metric-icon"><i class="bi bi-file-earmark-text"></i></span>
      </div>
      <div class="metric-value"><?= (int) $stats['pages'] ?></div>
      <div class="metric-meta"><span>Total site pages</span></div>
    </article>
  </div>
  <div class="col-12 col-sm-6 col-xl-3">
    <article class="metric-card metric-success">
      <div class="metric-top">
        <span class="metric-label">Products</span>
        <span class="metric-icon"><i class="bi bi-box-seam"></i></span>
      </div>
      <div class="metric-value"><?= (int) $stats['products'] ?></div>
      <div class="metric-meta"><span>Active listings</span></div>
    </article>
  </div>
  <div class="col-12 col-sm-6 col-xl-3">
    <article class="metric-card metric-warning">
      <div class="metric-top">
        <span class="metric-label">Orders</span>
        <span class="metric-icon"><i class="bi bi-bag-check"></i></span>
      </div>
      <div class="metric-value"><?= (int) $stats['orders'] ?></div>
      <div class="metric-meta"><span>Total orders received</span></div>
    </article>
  </div>
  <div class="col-12 col-sm-6 col-xl-3">
    <article class="metric-card metric-danger">
      <div class="metric-top">
        <span class="metric-label">Pending</span>
        <span class="metric-icon"><i class="bi bi-hourglass-split"></i></span>
      </div>
      <div class="metric-value"><?= (int) $stats['pending_orders'] ?></div>
      <div class="metric-meta">
        <?php if ($stats['pending_orders'] > 0): ?>
          <span class="text-danger"><?= (int) $stats['pending_orders'] ?> need review</span>
        <?php else: ?>
          <span class="text-success">All clear</span>
        <?php endif; ?>
      </div>
    </article>
  </div>
</section>

<!-- Quick access & activity -->
<div class="row g-3 mt-1">
  <div class="col-12 col-xl-8">
    <div class="panel h-100">
      <div class="panel-header">
        <div>
          <h2 class="h5 mb-1 section-title"><i class="bi bi-lightning-charge text-warning"></i><span>Quick Actions</span></h2>
          <p class="text-muted">Jump directly to common tasks.</p>
        </div>
      </div>
      <div class="row g-3">
        <div class="col-12 col-sm-6">
          <a href="/admin/pages" class="d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none"
             style="border:1px solid var(--admin-border);background:var(--admin-surface-soft);transition:background .14s"
             onmouseover="this.style.background='#fdf6e6'" onmouseout="this.style.background='var(--admin-surface-soft)'">
            <div style="width:42px;height:42px;border-radius:10px;background:rgba(201,162,75,.12);color:var(--admin-primary);display:grid;place-items:center;font-size:1.2rem;flex:0 0 42px">
              <i class="bi bi-pencil-square"></i>
            </div>
            <div>
              <div style="font-weight:700;font-size:.9rem;color:var(--admin-text)">Edit Pages</div>
              <div style="font-size:.78rem;color:var(--admin-muted)">Update site content &amp; sections</div>
            </div>
          </a>
        </div>
        <div class="col-12 col-sm-6">
          <a href="/admin/products" class="d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none"
             style="border:1px solid var(--admin-border);background:var(--admin-surface-soft);transition:background .14s"
             onmouseover="this.style.background='#e7f6f3'" onmouseout="this.style.background='var(--admin-surface-soft)'">
            <div style="width:42px;height:42px;border-radius:10px;background:#e7f6f3;color:#0f766e;display:grid;place-items:center;font-size:1.2rem;flex:0 0 42px">
              <i class="bi bi-box-seam"></i>
            </div>
            <div>
              <div style="font-weight:700;font-size:.9rem;color:var(--admin-text)">Products</div>
              <div style="font-size:.78rem;color:var(--admin-muted)">Add or edit tile products</div>
            </div>
          </a>
        </div>
        <div class="col-12 col-sm-6">
          <a href="/admin/media" class="d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none"
             style="border:1px solid var(--admin-border);background:var(--admin-surface-soft);transition:background .14s"
             onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='var(--admin-surface-soft)'">
            <div style="width:42px;height:42px;border-radius:10px;background:#eff6ff;color:#2563eb;display:grid;place-items:center;font-size:1.2rem;flex:0 0 42px">
              <i class="bi bi-images"></i>
            </div>
            <div>
              <div style="font-weight:700;font-size:.9rem;color:var(--admin-text)">Media Library</div>
              <div style="font-size:.78rem;color:var(--admin-muted)">Upload photos &amp; videos</div>
            </div>
          </a>
        </div>
        <div class="col-12 col-sm-6">
          <a href="/admin/orders" class="d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none"
             style="border:1px solid var(--admin-border);background:var(--admin-surface-soft);transition:background .14s"
             onmouseover="this.style.background='#fff4df'" onmouseout="this.style.background='var(--admin-surface-soft)'">
            <div style="width:42px;height:42px;border-radius:10px;background:#fff4df;color:#d97706;display:grid;place-items:center;font-size:1.2rem;flex:0 0 42px">
              <i class="bi bi-bag-check"></i>
            </div>
            <div>
              <div style="font-weight:700;font-size:.9rem;color:var(--admin-text)">Orders</div>
              <div style="font-size:.78rem;color:var(--admin-muted)">View &amp; manage orders</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="col-12 col-xl-4">
    <div class="panel h-100">
      <div class="panel-header">
        <div>
          <h2 class="h5 mb-1 section-title"><i class="bi bi-activity text-success"></i><span>How to publish</span></h2>
          <p class="text-muted">Push your changes live.</p>
        </div>
      </div>
      <div style="display:grid;gap:.85rem">
        <div style="display:flex;gap:.75rem;align-items:flex-start;padding-bottom:.85rem;border-bottom:1px solid var(--admin-border)">
          <span style="width:10px;height:10px;border-radius:50%;background:var(--admin-primary);margin-top:.35rem;flex:0 0 10px;box-shadow:0 0 0 4px rgba(201,162,75,.12)"></span>
          <div>
            <p class="mb-1" style="font-weight:700;font-size:.9rem">Edit content</p>
            <p class="text-muted mb-0" style="font-size:.82rem">Go to Pages &amp; Sections, change the text or images.</p>
          </div>
        </div>
        <div style="display:flex;gap:.75rem;align-items:flex-start;padding-bottom:.85rem;border-bottom:1px solid var(--admin-border)">
          <span style="width:10px;height:10px;border-radius:50%;background:#0f766e;margin-top:.35rem;flex:0 0 10px;box-shadow:0 0 0 4px rgba(15,118,110,.1)"></span>
          <div>
            <p class="mb-1" style="font-weight:700;font-size:.9rem">Save section</p>
            <p class="text-muted mb-0" style="font-size:.82rem">Click "Save section" on each block you edited.</p>
          </div>
        </div>
        <div style="display:flex;gap:.75rem;align-items:flex-start">
          <span style="width:10px;height:10px;border-radius:50%;background:#d97706;margin-top:.35rem;flex:0 0 10px;box-shadow:0 0 0 4px rgba(217,119,6,.1)"></span>
          <div>
            <p class="mb-1" style="font-weight:700;font-size:.9rem">Click Publish Site</p>
            <p class="text-muted mb-0" style="font-size:.82rem">Hit "Publish Site" in the top bar to rebuild the live site.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<?= $this->endSection() ?>
