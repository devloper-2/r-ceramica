<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<h1>Orders</h1>
<table style="margin-top:18px">
    <thead>
        <tr><th>Order #</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th><th></th></tr>
    </thead>
    <tbody>
    <?php foreach ($orders as $o): ?>
        <tr>
            <td><?= esc($o['order_number']) ?></td>
            <td class="muted"><?= esc($o['email']) ?></td>
            <td><?= esc($o['currency']) ?> <?= number_format((float) $o['total']) ?></td>
            <td><span class="tag"><?= esc($o['status']) ?></span></td>
            <td class="muted"><?= esc($o['created_at']) ?></td>
            <td style="text-align:right"><a class="btn secondary" href="/admin/orders/<?= (int) $o['id'] ?>">View</a></td>
        </tr>
    <?php endforeach; ?>
    <?php if (! $orders): ?>
        <tr><td colspan="6" class="muted">No orders yet.</td></tr>
    <?php endif; ?>
    </tbody>
</table>

<?= $this->endSection() ?>
