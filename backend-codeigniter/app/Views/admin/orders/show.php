<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<p class="muted"><a href="/admin/orders">← All orders</a></p>
<h1>Order <?= esc($order['order_number']) ?></h1>

<div class="row" style="margin-bottom:20px">
    <div class="card">
        <div class="muted">Customer</div>
        <div><?= esc($order['email']) ?></div>
        <div class="muted"><?= esc($order['phone']) ?></div>
    </div>
    <div class="card">
        <div class="muted">Total</div>
        <div class="n" style="font-size:22px"><?= esc($order['currency']) ?> <?= number_format((float) $order['total'], 2) ?></div>
    </div>
    <div class="card">
        <div class="muted">Payment</div>
        <div><?= esc($order['payment_provider'] ?: '—') ?></div>
        <div class="muted" style="font-size:12px"><?= esc($order['payment_ref'] ?: '') ?></div>
    </div>
</div>

<form action="/admin/orders/<?= (int) $order['id'] ?>/status" method="post" style="margin-bottom:24px">
    <?= csrf_field() ?>
    <label>Status</label>
    <div style="display:flex;gap:10px;max-width:420px">
        <select name="status">
            <?php foreach ($statuses as $s): ?>
                <option value="<?= $s ?>" <?= $order['status'] === $s ? 'selected' : '' ?>><?= ucfirst($s) ?></option>
            <?php endforeach; ?>
        </select>
        <button class="btn" type="submit">Update</button>
    </div>
</form>

<strong>Items</strong>
<table style="margin-top:10px">
    <thead><tr><th>Product</th><th>Unit</th><th>Qty</th><th>Line total</th></tr></thead>
    <tbody>
    <?php foreach ($items as $it): ?>
        <tr>
            <td><?= esc($it['product_name']) ?></td>
            <td><?= number_format((float) $it['unit_price'], 2) ?></td>
            <td><?= (int) $it['quantity'] ?></td>
            <td><?= number_format((float) $it['line_total'], 2) ?></td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>

<?= $this->endSection() ?>
