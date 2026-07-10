<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<h1>Dashboard</h1>
<p class="muted">Welcome back, <?= esc($admin['name']) ?>. Manage your site content below, then click <strong>Publish site</strong> to push changes live.</p>

<div class="cards" style="margin-top:22px">
    <div class="card"><div class="n"><?= (int) $stats['pages'] ?></div><div class="l">Pages</div></div>
    <div class="card"><div class="n"><?= (int) $stats['products'] ?></div><div class="l">Products</div></div>
    <div class="card"><div class="n"><?= (int) $stats['orders'] ?></div><div class="l">Orders</div></div>
    <div class="card"><div class="n"><?= (int) $stats['pending_orders'] ?></div><div class="l">Pending Orders</div></div>
</div>

<?= $this->endSection() ?>
