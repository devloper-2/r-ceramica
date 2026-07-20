<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<style>
/* ── Order detail ── */
.order-status {
  display: inline-flex; align-items: center; gap: .35rem;
  font-size: .78rem; font-weight: 700;
  padding: .35rem .85rem; border-radius: 20px;
}
.order-status.paid      { color: #065f46; background: #dcfce7; border: 1px solid #86efac; }
.order-status.pending   { color: #92400e; background: #fef3c7; border: 1px solid #fcd34d; }
.order-status.shipped   { color: #1d4ed8; background: #dbeafe; border: 1px solid #93c5fd; }
.order-status.transit   { color: #c2410c; background: #ffedd5; border: 1px solid #fdba74; }
.order-status.delivered   { color: #065f46; background: #d1fae5; border: 1px solid #6ee7b7; }
.order-status.cancelled   { color: #991b1b; background: #fee2e2; border: 1px solid #fca5a5; }
.order-status.processing  { color: #5b21b6; background: #ede9fe; border: 1px solid #c4b5fd; }
.order-status.refunded    { color: #374151; background: #f3f4f6; border: 1px solid #d1d5db; }

.od-info-card {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 12px;
  padding: 1.25rem 1.4rem;
  height: 100%;
  box-shadow: var(--admin-shadow-sm);
}
.od-info-label {
  font-size: .7rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: .06em; color: var(--admin-muted); margin-bottom: .6rem;
  display: flex; align-items: center; gap: .4rem;
}
.od-info-primary { font-size: 1rem; font-weight: 700; color: var(--admin-text); margin-bottom: .2rem; }
.od-info-secondary { font-size: .82rem; color: var(--admin-muted); }
.od-total-value { font-size: 1.75rem; font-weight: 800; color: var(--admin-text); line-height: 1.1; }
.od-total-sub { font-size: .78rem; color: var(--admin-muted); margin-top: .3rem; }

.od-status-form {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 12px;
  padding: 1.25rem 1.4rem;
  box-shadow: var(--admin-shadow-sm);
}
.od-address-block {
  background: var(--admin-surface-soft);
  border: 1px solid var(--admin-border);
  border-radius: 10px;
  padding: 1rem 1.25rem;
}
.od-addr-line { font-size: .88rem; color: var(--admin-text); line-height: 1.7; }
.od-addr-name { font-weight: 700; }

/* ── Razorpay payment detail ── */
.rzp-badge {
  font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;
  color:#3395ff;background:#e8f1ff;border:1px solid #b3d0ff;
  padding:.15rem .5rem;border-radius:20px;flex-shrink:0;
}
.rzp-row-label {
  font-size:.67rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;
  color:var(--admin-muted);margin-bottom:.2rem;
}
.rzp-id-row { display:flex;align-items:center;gap:.35rem; }
.rzp-mono {
  font-family:"SFMono-Regular",Consolas,monospace;
  font-size:.76rem;font-weight:700;color:var(--admin-text);word-break:break-all;flex:1;
}
.rzp-copy-btn {
  flex-shrink:0;background:none;border:1px solid var(--admin-border);
  border-radius:5px;padding:2px 6px;font-size:.7rem;color:var(--admin-muted);
  cursor:pointer;line-height:1;text-decoration:none;
  transition:color .15s,background .15s;
}
.rzp-copy-btn:hover{background:var(--admin-surface-soft);color:var(--admin-text);}
.rzp-copy-btn.copied{color:#065f46;background:#dcfce7;border-color:#86efac;}
.rzp-verified {
  display:inline-flex;align-items:center;gap:.25rem;
  font-size:.68rem;font-weight:700;white-space:nowrap;
  color:#065f46;background:#dcfce7;border:1px solid #86efac;
  padding:.15rem .45rem;border-radius:20px;
}
.rzp-divider { border-top:1px solid var(--admin-border);margin:.6rem 0; }
</style>

<?php
$statusIcons = [
  'paid'      => 'check-circle-fill',
  'pending'   => 'clock',
  'shipped'   => 'truck',
  'transit'   => 'arrow-right-circle-fill',
  'delivered' => 'house-check-fill',
  'cancelled' => 'x-circle-fill',
];
$addr = !empty($order['shipping_address'])
  ? (is_string($order['shipping_address']) ? json_decode($order['shipping_address'], true) : $order['shipping_address'])
  : [];

$notes = [];
if (!empty($order['notes'])) {
  $decoded = json_decode($order['notes'], true);
  if (is_array($decoded)) $notes = $decoded;
}
$rzpPaymentId = $notes['razorpay_payment_id'] ?? $order['payment_ref'] ?? '';
$rzpOrderId   = $notes['razorpay_order_id'] ?? '';
$rzpSig       = $notes['razorpay_signature'] ?? '';
$isRazorpay   = strtolower($order['payment_provider'] ?? '') === 'razorpay';
?>

<!-- Breadcrumb -->
<div class="mb-3">
  <a href="/admin/orders" class="back-link d-inline-flex align-items-center gap-1">
    <i class="bi bi-arrow-left"></i> All Orders
  </a>
</div>

<!-- Page heading -->
<div class="page-heading mb-4">
  <div class="page-heading-copy">
    <div class="page-icon"><i class="bi bi-receipt"></i></div>
    <div>
      <div class="eyebrow">Order Detail</div>
      <h1 style="font-family:monospace;letter-spacing:-.01em"><?= esc($order['order_number']) ?></h1>
    </div>
  </div>
  <div class="heading-actions">
    <span class="order-status <?= esc($order['status']) ?>">
      <i class="bi bi-<?= $statusIcons[$order['status']] ?? 'circle' ?>"></i>
      <?= ucfirst(esc($order['status'])) ?>
    </span>
  </div>
</div>

<!-- Top info cards -->
<div class="row g-3 mb-4">

  <!-- Customer -->
  <div class="col-md-4">
    <div class="od-info-card">
      <div class="od-info-label"><i class="bi bi-person-fill"></i> Customer</div>
      <div class="od-info-primary"><?= esc($order['email']) ?></div>
      <?php if (!empty($order['phone'])): ?>
        <div class="od-info-secondary"><i class="bi bi-telephone" style="margin-right:3px"></i><?= esc($order['phone']) ?></div>
      <?php endif; ?>
    </div>
  </div>

  <!-- Order Total -->
  <div class="col-md-4">
    <div class="od-info-card">
      <div class="od-info-label"><i class="bi bi-currency-rupee"></i> Order Total</div>
      <div class="od-total-value">₹<?= number_format((float)$order['total'], 2) ?></div>
      <div class="od-total-sub">
        Subtotal ₹<?= number_format((float)$order['subtotal'], 2) ?> &nbsp;·&nbsp;
        Tax ₹<?= number_format((float)$order['tax'], 2) ?> &nbsp;·&nbsp;
        Shipping <?= (float)$order['shipping'] > 0 ? '₹' . number_format((float)$order['shipping'], 2) : 'Free' ?>
      </div>
    </div>
  </div>

  <!-- Payment -->
  <div class="col-md-4">
    <div class="od-info-card">

      <!-- Header row -->
      <div class="od-info-label d-flex justify-content-between align-items-center">
        <span><i class="bi bi-credit-card-fill"></i> Payment</span>
        <?php if ($isRazorpay): ?>
          <span class="rzp-badge">Razorpay</span>
        <?php endif; ?>
      </div>

      <?php if ($isRazorpay && $rzpPaymentId): ?>

        <!-- Payment ID -->
        <div style="margin-bottom:.55rem">
          <div class="rzp-row-label">Payment ID</div>
          <div class="rzp-id-row">
            <span class="rzp-mono"><?= esc($rzpPaymentId) ?></span>
            <button class="rzp-copy-btn" type="button" onclick="rzpCopy(this,'<?= esc($rzpPaymentId) ?>')" title="Copy Payment ID">
              <i class="bi bi-copy"></i>
            </button>
            <a class="rzp-copy-btn" href="https://dashboard.razorpay.com/app/payments/<?= urlencode($rzpPaymentId) ?>" target="_blank" rel="noopener noreferrer" title="Open in Razorpay Dashboard">
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
          </div>
        </div>

        <?php if ($rzpOrderId): ?>
        <!-- Razorpay Order ID -->
        <div style="margin-bottom:.55rem">
          <div class="rzp-row-label">Razorpay Order ID</div>
          <div class="rzp-id-row">
            <span class="rzp-mono" style="font-size:.71rem"><?= esc($rzpOrderId) ?></span>
            <button class="rzp-copy-btn" type="button" onclick="rzpCopy(this,'<?= esc($rzpOrderId) ?>')" title="Copy Order ID">
              <i class="bi bi-copy"></i>
            </button>
          </div>
        </div>
        <?php endif; ?>

        <!-- Amount -->
        <div style="margin-bottom:.55rem">
          <div class="rzp-row-label">Amount Paid</div>
          <div style="font-size:.9rem;font-weight:800;color:var(--admin-text)">
            ₹<?= number_format((float)$order['total'], 2) ?>
            <span style="font-size:.72rem;font-weight:600;color:var(--admin-muted)"><?= esc($order['currency'] ?? 'INR') ?></span>
          </div>
        </div>

        <?php if ($rzpSig): ?>
        <!-- Signature -->
        <div style="margin-bottom:.55rem">
          <div class="rzp-row-label">Signature</div>
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="rzp-mono" style="font-size:.67rem;color:var(--admin-muted)"><?= esc($rzpSig) ?></span>
            <span class="rzp-verified"><i class="bi bi-shield-check-fill"></i> Verified</span>
          </div>
        </div>
        <?php endif; ?>

      <?php else: ?>
        <div class="od-info-primary"><?= esc($order['payment_provider'] ?: '—') ?></div>
        <?php if (!empty($order['payment_ref'])): ?>
          <div class="od-info-secondary" style="font-size:.76rem;word-break:break-all">
            Ref: <?= esc($order['payment_ref']) ?>
          </div>
        <?php endif; ?>
      <?php endif; ?>

      <!-- Date paid -->
      <div class="rzp-divider"></div>
      <div class="od-info-secondary" style="font-size:.74rem">
        <i class="bi bi-calendar3 me-1"></i>
        <?= date('d M Y, H:i', strtotime($order['created_at'])) ?>
      </div>

    </div>
  </div>
</div>

<!-- Main content row -->
<div class="row g-3 align-items-start">

  <!-- Left: Items + Address -->
  <div class="col-lg-8 d-flex flex-column gap-3">

    <!-- Items table -->
    <div class="panel">
      <div class="panel-header">
        <div class="section-title">
          <i class="bi bi-box-seam" style="color:var(--admin-primary)"></i>
          Items Ordered (<?= count($items) ?>)
        </div>
      </div>
      <div class="panel-table" style="border:none;box-shadow:none">
        <table class="table mb-0 align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th class="text-end">Unit Price</th>
              <th class="text-center">Qty</th>
              <th class="text-end">Line Total</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($items as $i => $it): ?>
              <tr>
                <td style="color:var(--admin-muted);font-size:.8rem;width:36px"><?= $i + 1 ?></td>
                <td style="font-weight:600;font-size:.9rem"><?= esc($it['product_name']) ?></td>
                <td class="text-end" style="color:var(--admin-muted);font-size:.88rem">₹<?= number_format((float)$it['unit_price'], 2) ?></td>
                <td class="text-center">
                  <span style="display:inline-block;background:var(--admin-surface-soft);border:1px solid var(--admin-border);border-radius:6px;padding:2px 10px;font-weight:700;font-size:.82rem">
                    <?= (int)$it['quantity'] ?>
                  </span>
                </td>
                <td class="text-end" style="font-weight:800;font-size:.92rem">₹<?= number_format((float)$it['line_total'], 2) ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
          <tfoot>
            <tr style="background:var(--admin-surface-soft)">
              <td colspan="4" class="text-end" style="font-weight:700;font-size:.82rem;color:var(--admin-muted)">ORDER TOTAL</td>
              <td class="text-end" style="font-weight:800;font-size:1.05rem;color:var(--admin-text)">₹<?= number_format((float)$order['total'], 2) ?></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- Shipping address -->
    <?php if (!empty($addr)): ?>
    <div class="panel">
      <div class="panel-header">
        <div class="section-title">
          <i class="bi bi-geo-alt-fill" style="color:var(--admin-primary)"></i>
          Delivery Address
        </div>
      </div>
      <div class="od-address-block">
        <?php if (!empty($addr['name'])): ?>
          <div class="od-addr-line od-addr-name"><?= esc($addr['name']) ?></div>
        <?php endif; ?>
        <?php if (!empty($addr['address'])): ?>
          <div class="od-addr-line"><?= esc($addr['address']) ?></div>
        <?php endif; ?>
        <?php if (!empty($addr['city']) || !empty($addr['state'])): ?>
          <div class="od-addr-line"><?= esc(implode(', ', array_filter([$addr['city'] ?? '', $addr['state'] ?? '']))) ?></div>
        <?php endif; ?>
        <?php if (!empty($addr['zip'])): ?>
          <div class="od-addr-line"><?= esc($addr['zip']) ?></div>
        <?php endif; ?>
        <?php if (!empty($addr['phone'])): ?>
          <div class="od-addr-line mt-1" style="color:var(--admin-muted)"><i class="bi bi-telephone me-1"></i><?= esc($addr['phone']) ?></div>
        <?php endif; ?>
      </div>
    </div>
    <?php endif; ?>

  </div>

  <!-- Right: Status update -->
  <div class="col-lg-4">
    <div class="od-status-form">
      <div class="section-title mb-3">
        <i class="bi bi-arrow-repeat" style="color:var(--admin-primary)"></i>
        Update Status
      </div>
      <form action="/admin/orders/<?= (int)$order['id'] ?>/status" method="post">
        <?= csrf_field() ?>
        <div class="mb-3">
          <label class="form-label mb-1" style="font-size:.8rem;font-weight:700">Order Status</label>
          <select name="status" class="form-select">
            <?php foreach ($statuses as $s): ?>
              <option value="<?= esc($s) ?>" <?= $order['status'] === $s ? 'selected' : '' ?>>
                <?= ucfirst($s) ?>
              </option>
            <?php endforeach; ?>
          </select>
        </div>
        <button class="btn btn-primary w-100" type="submit">
          <i class="bi bi-check-lg me-1"></i> Save Status
        </button>
      </form>

      <!-- Order meta -->
      <div style="margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid var(--admin-border)">
        <div style="font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--admin-muted);margin-bottom:.75rem">Order Info</div>
        <dl style="display:grid;grid-template-columns:auto 1fr;gap:.4rem .75rem;font-size:.82rem;margin:0">
          <dt style="color:var(--admin-muted);font-weight:600">Placed</dt>
          <dd style="margin:0;font-weight:600"><?= date('d M Y', strtotime($order['created_at'])) ?></dd>
          <dt style="color:var(--admin-muted);font-weight:600">Time</dt>
          <dd style="margin:0;font-weight:600"><?= date('H:i', strtotime($order['created_at'])) ?></dd>
          <dt style="color:var(--admin-muted);font-weight:600">Currency</dt>
          <dd style="margin:0;font-weight:600"><?= esc($order['currency'] ?? 'INR') ?></dd>
        </dl>
      </div>
    </div>
  </div>

</div>

<script>
function rzpCopy(btn, text) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text).then(function () {
    var prev = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '<i class="bi bi-check-lg"></i>';
    setTimeout(function () {
      btn.classList.remove('copied');
      btn.innerHTML = prev;
    }, 1600);
  });
}
</script>

<?= $this->endSection() ?>
