<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<style>
.order-status {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .72rem; font-weight: 700;
  padding: .28rem .65rem; border-radius: 20px;
}
.order-status.paid      { color: #065f46; background: #dcfce7; border: 1px solid #86efac; }
.order-status.pending   { color: #92400e; background: #fef3c7; border: 1px solid #fcd34d; }
.order-status.shipped   { color: #1d4ed8; background: #dbeafe; border: 1px solid #93c5fd; }
.order-status.transit   { color: #c2410c; background: #ffedd5; border: 1px solid #fdba74; }
.order-status.delivered   { color: #065f46; background: #d1fae5; border: 1px solid #6ee7b7; }
.order-status.cancelled   { color: #991b1b; background: #fee2e2; border: 1px solid #fca5a5; }
.order-status.processing  { color: #5b21b6; background: #ede9fe; border: 1px solid #c4b5fd; }
.order-status.refunded    { color: #374151; background: #f3f4f6; border: 1px solid #d1d5db; }
.order-number-mono { font-family: "SFMono-Regular", Consolas, monospace; font-size: .82rem; font-weight: 700; color: var(--admin-text); }
</style>

<?php
  $totalRevenue  = array_sum(array_column($orders, 'total'));
  $paidCount     = count(array_filter($orders, fn($o) => in_array($o['status'], ['paid', 'delivered', 'shipped', 'transit'])));
  $pendingCount  = count(array_filter($orders, fn($o) => $o['status'] === 'pending'));
  $statusIcons   = [
    'paid'      => 'check-circle-fill',
    'pending'   => 'clock',
    'shipped'   => 'truck',
    'transit'   => 'arrow-right-circle-fill',
    'delivered' => 'house-check-fill',
    'cancelled' => 'x-circle-fill',
  ];
?>

<!-- Page header -->
<div class="page-heading mb-4">
  <div class="page-heading-copy">
    <div class="page-icon"><i class="bi bi-bag-check-fill"></i></div>
    <div>
      <div class="eyebrow">Commerce</div>
      <h1><?= count($orders) ?> Order<?= count($orders) !== 1 ? 's' : '' ?></h1>
    </div>
  </div>
</div>

<!-- Metric cards -->
<div class="row g-3 mb-4">
  <div class="col-6 col-lg-3">
    <div class="metric-card metric-primary">
      <div class="metric-top">
        <span class="metric-label">Total Orders</span>
        <span class="metric-icon"><i class="bi bi-bag-check-fill"></i></span>
      </div>
      <div class="metric-value"><?= count($orders) ?></div>
      <div class="metric-meta">All time</div>
    </div>
  </div>
  <div class="col-6 col-lg-3">
    <div class="metric-card metric-success">
      <div class="metric-top">
        <span class="metric-label">Revenue</span>
        <span class="metric-icon"><i class="bi bi-currency-rupee"></i></span>
      </div>
      <div class="metric-value" style="font-size:1.55rem">₹<?= number_format($totalRevenue) ?></div>
      <div class="metric-meta">Total collected</div>
    </div>
  </div>
  <div class="col-6 col-lg-3">
    <div class="metric-card metric-warning">
      <div class="metric-top">
        <span class="metric-label">Confirmed</span>
        <span class="metric-icon"><i class="bi bi-check-circle-fill"></i></span>
      </div>
      <div class="metric-value"><?= $paidCount ?></div>
      <div class="metric-meta">Paid &amp; active</div>
    </div>
  </div>
  <div class="col-6 col-lg-3">
    <div class="metric-card metric-danger">
      <div class="metric-top">
        <span class="metric-label">Pending</span>
        <span class="metric-icon"><i class="bi bi-clock-fill"></i></span>
      </div>
      <div class="metric-value"><?= $pendingCount ?></div>
      <div class="metric-meta">Awaiting payment</div>
    </div>
  </div>
</div>

<!-- Orders table -->
<div class="panel-table">
  <table class="table table-hover mb-0 align-middle">
    <thead>
      <tr>
        <th>Order #</th>
        <th>Customer</th>
        <th>Items</th>
        <th>Total</th>
        <th>Status</th>
        <th>Date</th>
        <th style="text-align:right"></th>
      </tr>
    </thead>
    <tbody>
    <?php if ($orders): ?>
      <?php foreach ($orders as $o): ?>
        <tr>
          <td>
            <span class="order-number-mono"><?= esc($o['order_number']) ?></span>
          </td>
          <td>
            <div style="font-weight:600;font-size:.88rem"><?= esc($o['email']) ?></div>
            <?php if (!empty($o['phone'])): ?>
              <div style="font-size:.76rem;color:var(--admin-muted)"><?= esc($o['phone']) ?></div>
            <?php endif; ?>
          </td>
          <td style="color:var(--admin-muted);font-size:.82rem">
            <?= isset($o['item_count']) ? (int)$o['item_count'] . ' item' . ((int)$o['item_count'] !== 1 ? 's' : '') : '—' ?>
          </td>
          <td>
            <span style="font-weight:800;font-size:.95rem">₹<?= number_format((float)$o['total']) ?></span>
          </td>
          <td>
            <span class="order-status <?= esc($o['status']) ?>">
              <i class="bi bi-<?= $statusIcons[$o['status']] ?? 'circle' ?>"></i>
              <?= ucfirst(esc($o['status'])) ?>
            </span>
          </td>
          <td style="color:var(--admin-muted);font-size:.8rem;white-space:nowrap">
            <?= date('d M Y, H:i', strtotime($o['created_at'])) ?>
          </td>
          <td style="text-align:right">
            <a class="btn btn-sm secondary" href="/admin/orders/<?= (int)$o['id'] ?>">
              <i class="bi bi-eye"></i> View
            </a>
          </td>
        </tr>
      <?php endforeach; ?>
    <?php else: ?>
      <tr>
        <td colspan="7" style="text-align:center;padding:4rem 2rem;color:var(--admin-muted)">
          <i class="bi bi-bag-x" style="font-size:2.5rem;display:block;margin-bottom:.75rem;color:var(--admin-border)"></i>
          <p style="font-size:.9rem;margin:0">No orders yet. Orders placed on the storefront appear here.</p>
        </td>
      </tr>
    <?php endif; ?>
    </tbody>
  </table>
</div>

<?= $this->endSection() ?>
