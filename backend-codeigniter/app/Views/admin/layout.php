<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title><?= esc($title ?? 'Admin') ?> — R Ceramica</title>
    <style>
        :root { --bg:#0f1115; --panel:#171a21; --line:#252a34; --ink:#e6e8ec; --mut:#8b94a3; --gold:#c9a24b; --danger:#e0574f; --ok:#4caf82; }
        * { box-sizing:border-box; }
        body { margin:0; font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif; background:var(--bg); color:var(--ink); }
        a { color:inherit; text-decoration:none; }
        .layout { display:flex; min-height:100vh; }
        .sidebar { width:230px; background:var(--panel); border-right:1px solid var(--line); padding:20px 0; position:sticky; top:0; height:100vh; }
        .brand { font-weight:700; letter-spacing:.04em; padding:0 22px 18px; font-size:18px; }
        .brand span { color:var(--gold); }
        .nav a { display:block; padding:11px 22px; color:var(--mut); font-size:14px; border-left:3px solid transparent; }
        .nav a:hover { color:var(--ink); background:#1d212a; }
        .nav a.active { color:var(--ink); border-left-color:var(--gold); background:#1d212a; }
        .main { flex:1; display:flex; flex-direction:column; }
        .topbar { display:flex; justify-content:space-between; align-items:center; padding:14px 26px; border-bottom:1px solid var(--line); }
        .topbar .who { font-size:13px; color:var(--mut); }
        .content { padding:26px; max-width:1100px; }
        h1 { font-size:22px; margin:0 0 18px; }
        .btn { display:inline-block; background:var(--gold); color:#1a1a1a; padding:9px 16px; border-radius:7px; border:0; font-weight:600; cursor:pointer; font-size:14px; }
        .btn.secondary { background:transparent; color:var(--ink); border:1px solid var(--line); }
        .btn.danger { background:var(--danger); color:#fff; }
        .flash { padding:11px 15px; border-radius:8px; margin-bottom:18px; font-size:14px; }
        .flash.error { background:rgba(224,87,79,.14); border:1px solid var(--danger); }
        .flash.success { background:rgba(76,175,130,.14); border:1px solid var(--ok); }
        table { width:100%; border-collapse:collapse; font-size:14px; }
        th,td { text-align:left; padding:11px 12px; border-bottom:1px solid var(--line); }
        th { color:var(--mut); font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:.05em; }
        .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:16px; }
        .card { background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:18px; }
        .card .n { font-size:30px; font-weight:700; }
        .card .l { color:var(--mut); font-size:13px; margin-top:4px; }
        label { display:block; font-size:13px; color:var(--mut); margin:14px 0 6px; }
        input,select,textarea { width:100%; background:#0f1218; border:1px solid var(--line); color:var(--ink); padding:10px 12px; border-radius:8px; font-size:14px; font-family:inherit; }
        textarea { min-height:120px; resize:vertical; }
        .row { display:flex; gap:16px; flex-wrap:wrap; }
        .row > * { flex:1; min-width:220px; }
        .muted { color:var(--mut); font-size:13px; }
        .tag { font-size:11px; padding:3px 8px; border-radius:20px; border:1px solid var(--line); color:var(--mut); }
        .tag.published { color:var(--ok); border-color:var(--ok); }
    </style>
</head>
<body>
<div class="layout">
    <aside class="sidebar">
        <div class="brand">R <span>Ceramica</span></div>
        <nav class="nav">
            <a href="/admin" class="<?= ($active ?? '') === 'dashboard' ? 'active' : '' ?>">Dashboard</a>
            <a href="/admin/pages" class="<?= ($active ?? '') === 'pages' ? 'active' : '' ?>">Pages &amp; Sections</a>
            <a href="/admin/products" class="<?= ($active ?? '') === 'products' ? 'active' : '' ?>">Products</a>
            <a href="/admin/navigation" class="<?= ($active ?? '') === 'navigation' ? 'active' : '' ?>">Navigation</a>
            <a href="/admin/media" class="<?= ($active ?? '') === 'media' ? 'active' : '' ?>">Media</a>
            <a href="/admin/settings" class="<?= ($active ?? '') === 'settings' ? 'active' : '' ?>">Settings</a>
            <a href="/admin/orders" class="<?= ($active ?? '') === 'orders' ? 'active' : '' ?>">Orders</a>
        </nav>
    </aside>
    <div class="main">
        <div class="topbar">
            <form action="/admin/publish" method="post" style="margin:0">
                <?= csrf_field() ?>
                <button class="btn" type="submit" title="Rebuild the live static site with the latest content">Publish site</button>
            </form>
            <div class="who">
                <?= esc($admin['name'] ?? 'Admin') ?> ·
                <a href="/admin/logout" style="color:var(--gold)">Sign out</a>
            </div>
        </div>
        <div class="content">
            <?php if (session()->getFlashdata('error')): ?>
                <div class="flash error"><?= esc(session()->getFlashdata('error')) ?></div>
            <?php endif; ?>
            <?php if (session()->getFlashdata('success')): ?>
                <div class="flash success"><?= esc(session()->getFlashdata('success')) ?></div>
            <?php endif; ?>
            <?= $this->renderSection('content') ?>
        </div>
    </div>
</div>
</body>
</html>
