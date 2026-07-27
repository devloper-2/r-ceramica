<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title><?= esc($title ?? 'Admin') ?> — R Ceramica</title>

  <link rel="icon" href="<?= base_url('images/logo.webp') ?>" type="image/webp">
  <link rel="shortcut icon" href="<?= base_url('images/logo.webp') ?>">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

  <style>
    /* ── R Ceramica Admin — adapted from adminHMD ── */
    :root {
      --sidebar-width: 272px;
      --sidebar-mini-width: 80px;
      --admin-bg: #f5f7fb;
      --admin-surface: #ffffff;
      --admin-surface-soft: #f8fafc;
      --admin-border: #dbe4ef;
      --admin-text: #1f2937;
      --admin-muted: #6b7280;
      --admin-primary: #c9a24b;
      --admin-primary-dark: #a87d28;
      --admin-success: #0f766e;
      --admin-warning: #d97706;
      --admin-danger: #dc2626;
      --admin-sidebar: #111827;
      --admin-sidebar-soft: #1e2a3a;
      --admin-shadow-sm: 0 10px 24px rgba(15,23,42,.06);
      --admin-shadow:    0 18px 46px rgba(15,23,42,.09);
      --admin-shadow-lg: 0 26px 70px rgba(15,23,42,.12);
      --admin-ring: 0 0 0 4px rgba(201,162,75,.18);
    }

    *, *::before, *::after { box-sizing: border-box; }
    html { min-height: 100%; }
    body {
      min-height: 100vh; margin: 0;
      background: linear-gradient(180deg, #f8fbff 0%, var(--admin-bg) 42%, #eef4fa 100%);
      color: var(--admin-text);
      font-family: "Segoe UI", system-ui, Arial, sans-serif;
      font-size: 14px;
    }
    a { text-decoration: none; }

    /* ── Sidebar ── */
    .admin-sidebar {
      position: fixed; inset: 0 auto 0 0; z-index: 1040;
      width: var(--sidebar-width);
      display: flex; flex-direction: column;
      overflow-x: hidden; overflow-y: auto; scrollbar-gutter: stable;
      background: var(--admin-sidebar); color: #fff;
      box-shadow: 18px 0 42px rgba(15,23,42,.18);
      transform: translateX(0);
      transition: width .2s ease, transform .2s ease;
    }
    .sidebar-backdrop {
      position: fixed; inset: 0; z-index: 1030; display: none;
      background: rgba(15,23,42,.5);
    }

    .sidebar-header {
      padding: 1.25rem 1.25rem 1.1rem;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .brand-mark {
      display: flex; align-items: center; gap: .75rem;
      min-width: 0; color: #fff;
    }
    .brand-mark:hover { color: #fff; }
    .brand-logo-img {
      width: 40px; height: 40px; border-radius: 8px;
      object-fit: contain; background: rgba(255,255,255,.06);
      flex: 0 0 40px; padding: 3px;
    }
    .brand-copy { min-width: 0; }
    .brand-title {
      display: block; font-size: 1rem; font-weight: 800; line-height: 1.2;
      white-space: nowrap; transition: opacity .16s,width .16s;
    }
    .brand-subtitle {
      display: block; color: #9ca3af; font-size: .76rem; line-height: 1.2;
      white-space: nowrap; transition: opacity .16s,width .16s;
    }

    .sidebar-nav {
      display: grid; gap: .3rem; padding: 1rem .85rem;
    }
    .sidebar-nav .nav-label {
      font-size: .68rem; font-weight: 800; letter-spacing: .08em;
      text-transform: uppercase; color: #4b5563;
      padding: .6rem .6rem .2rem; margin-top: .3rem;
      transition: opacity .16s, width .16s;
    }
    .sidebar-nav .nav-link {
      display: flex; align-items: center; gap: .7rem;
      min-height: 44px; padding: .65rem .85rem;
      border-radius: 8px; color: #d1d5db; font-weight: 600;
      font-size: .88rem;
      transition: background .15s, color .15s, transform .15s;
      white-space: nowrap;
    }
    .sidebar-nav .nav-link:hover,
    .sidebar-nav .nav-link:focus {
      background: var(--admin-sidebar-soft); color: #fff; transform: translateX(2px);
    }
    .sidebar-nav .nav-link.active {
      background: rgba(201,162,75,.18); color: #f0c970; font-weight: 700;
      border-left: 3px solid #c9a24b; padding-left: calc(.85rem - 3px);
    }
    .nav-icon {
      display: inline-grid; place-items: center; flex: 0 0 auto;
      width: 30px; height: 30px; border-radius: 7px;
      background: rgba(255,255,255,.07); color: #bfdbfe; font-size: .84rem;
    }
    .sidebar-nav .nav-link.active .nav-icon {
      background: rgba(201,162,75,.22); color: #f0c970;
    }

    .sidebar-user {
      margin: auto .85rem .85rem;
      padding: .85rem;
      display: flex; align-items: center; gap: .75rem;
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 10px; background: var(--admin-sidebar-soft);
    }
    .sidebar-user-avatar {
      width: 38px; height: 38px; border-radius: 50%;
      background: rgba(201,162,75,.25); color: #f0c970;
      display: inline-grid; place-items: center;
      font-weight: 800; font-size: .95rem;
      flex: 0 0 38px; border: 2px solid rgba(201,162,75,.4);
      transition: opacity .16s;
    }
    .sidebar-user-info { min-width: 0; transition: opacity .16s, width .16s; }
    .sidebar-user-info strong {
      display: block; font-size: .86rem; color: #f9fafb;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .sidebar-user-info small { color: #9ca3af; font-size: .75rem; }

    .sidebar-footer {
      display: flex; align-items: center; gap: .65rem;
      margin-inline: 1.25rem; padding: .85rem 0;
      color: #6b7280; border-top: 1px solid rgba(255,255,255,.06);
      font-size: .82rem; white-space: nowrap;
    }
    .status-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #22c55e; flex: 0 0 8px;
    }
    .sidebar-footer-text { transition: opacity .16s, width .16s; }

    /* ── Main ── */
    .admin-main {
      margin-left: var(--sidebar-width); min-height: 100vh;
      transition: margin-left .2s ease;
    }

    /* ── Navbar ── */
    .admin-navbar {
      position: sticky; top: 0; z-index: 1020;
      min-height: 68px;
      background: rgba(255,255,255,.96) !important;
      backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--admin-border);
      box-shadow: var(--admin-shadow-sm);
    }
    .sidebar-toggle {
      width: 40px; height: 40px;
      display: inline-grid; place-items: center;
      gap: 4px; padding: 9px;
      border: 1px solid var(--admin-border); border-radius: 8px;
      background: #fff;
      box-shadow: 0 8px 18px rgba(15,23,42,.05);
      transition: border-color .15s, box-shadow .15s;
      cursor: pointer;
    }
    .sidebar-toggle:hover { border-color: #f0c970; box-shadow: var(--admin-ring); }
    .sidebar-toggle span {
      width: 18px; height: 2px; display: block;
      background: var(--admin-text); border-radius: 999px;
    }
    .search-input {
      max-width: 400px;
      border-color: var(--admin-border) !important; border-radius: 8px !important;
      background: var(--admin-surface-soft) !important;
      min-height: 40px; box-shadow: none !important;
      font-size: .88rem;
    }
    .search-input:focus { border-color: #c9a24b !important; box-shadow: var(--admin-ring) !important; }

    .navbar-actions { display: flex; align-items: center; gap: .65rem; }

    .icon-button {
      position: relative; width: 40px; height: 40px; border-radius: 8px;
      border: 1px solid var(--admin-border); background: #fff;
      color: var(--admin-text); font-size: 1rem;
      box-shadow: 0 8px 18px rgba(15,23,42,.05);
      transition: border-color .15s, box-shadow .15s;
      display: inline-grid; place-items: center; cursor: pointer;
    }
    .icon-button:hover { border-color: #f0c970; box-shadow: var(--admin-ring); }
    .notification-dot {
      position: absolute; top: 7px; right: 7px;
      width: 8px; height: 8px; border-radius: 50%; background: var(--admin-danger);
    }

    .publish-btn {
      display: inline-flex; align-items: center; gap: .5rem;
      background: var(--admin-primary); color: #3a2600;
      border: none; border-radius: 8px;
      padding: .5rem 1rem; font-weight: 700; font-size: .88rem;
      box-shadow: 0 4px 14px rgba(201,162,75,.35);
      transition: filter .15s, box-shadow .15s, transform .06s;
      cursor: pointer;
    }
    .publish-btn:hover {
      filter: brightness(.93);
      box-shadow: 0 6px 18px rgba(201,162,75,.45);
    }
    .publish-btn:active { transform: translateY(1px); }

    .profile-button {
      display: flex; align-items: center; gap: .5rem;
      min-height: 40px; padding: .3rem .65rem;
      border: 1px solid var(--admin-border); border-radius: 8px;
      background: #fff; color: var(--admin-text); font-weight: 600;
      box-shadow: 0 8px 18px rgba(15,23,42,.05);
      transition: border-color .15s, box-shadow .15s;
      font-size: .88rem;
    }
    .profile-button:hover { border-color: #f0c970; box-shadow: var(--admin-ring); }
    .profile-avatar-sm {
      width: 28px; height: 28px; border-radius: 7px;
      background: rgba(201,162,75,.15); color: var(--admin-primary-dark);
      font-size: .76rem; font-weight: 800;
      display: inline-grid; place-items: center;
    }

    /* ── Page heading ── */
    .page-heading {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;
    }
    .page-heading-copy { display: flex; align-items: center; gap: .85rem; }
    .page-icon {
      width: 46px; height: 46px; border-radius: 10px;
      background: rgba(201,162,75,.12); color: var(--admin-primary);
      display: inline-grid; place-items: center; font-size: 1.15rem;
      flex: 0 0 46px;
    }
    .eyebrow {
      color: var(--admin-primary); font-size: .72rem;
      font-weight: 800; text-transform: uppercase; letter-spacing: .06em;
    }
    .page-heading h1 { font-weight: 800; letter-spacing: -.01em; font-size: 1.3rem; margin: 0; }
    .heading-actions { display: flex; flex-wrap: wrap; gap: .6rem; }

    /* ── Metric cards ── */
    .metric-card {
      position: relative; min-height: 148px;
      padding: 1.25rem; overflow: hidden;
      border: 1px solid var(--admin-border);
      border-radius: 10px; background: var(--admin-surface);
      box-shadow: var(--admin-shadow);
      transition: border-color .18s, box-shadow .18s, transform .18s;
    }
    .metric-card::before {
      content: ""; position: absolute; inset: 0 auto 0 0;
      width: 4px; background: var(--metric-color, var(--admin-primary));
    }
    .metric-card:hover {
      border-color: #c6d5e8; box-shadow: var(--admin-shadow-lg); transform: translateY(-2px);
    }
    .metric-primary   { --metric-color: var(--admin-primary); }
    .metric-success   { --metric-color: #0f766e; }
    .metric-warning   { --metric-color: var(--admin-warning); }
    .metric-danger    { --metric-color: var(--admin-danger); }
    .metric-top { display: flex; align-items: center; justify-content: space-between; }
    .metric-label {
      color: var(--admin-muted); font-size: .72rem;
      font-weight: 800; text-transform: uppercase; letter-spacing: .05em;
    }
    .metric-icon {
      width: 40px; height: 40px; border-radius: 8px;
      background: #fdf6e6; color: var(--metric-color, var(--admin-primary));
      display: inline-grid; place-items: center; font-size: 1rem;
    }
    .metric-success .metric-icon { background: #e7f6f3; }
    .metric-warning .metric-icon { background: #fff4df; }
    .metric-danger  .metric-icon { background: #ffecec; }
    .metric-value { margin-top: .9rem; font-size: 2rem; font-weight: 800; line-height: 1; }
    .metric-meta {
      display: flex; flex-wrap: wrap; gap: .3rem;
      margin-top: .75rem; color: var(--admin-muted); font-size: .84rem; font-weight: 600;
    }

    /* ── Panel ── */
    .panel {
      padding: 1.25rem;
      border: 1px solid var(--admin-border); border-radius: 10px;
      background: var(--admin-surface);
      box-shadow: var(--admin-shadow);
      transition: border-color .18s, box-shadow .18s;
    }
    .panel:hover { border-color: #c6d5e8; box-shadow: var(--admin-shadow-lg); }
    .panel-header {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; margin-bottom: 1.15rem;
    }
    .panel-header p { font-size: .88rem; margin: 0; }
    .section-title { display: flex; align-items: center; gap: .5rem; font-weight: 700; }

    /* ── Table ── */
    .panel-table {
      border: 1px solid var(--admin-border); border-radius: 10px;
      background: var(--admin-surface); box-shadow: var(--admin-shadow); overflow: hidden;
    }
    .panel-table table { margin: 0; }
    .table thead th {
      color: var(--admin-muted); font-size: .72rem;
      text-transform: uppercase; letter-spacing: .05em;
      background: var(--admin-surface-soft); font-weight: 700;
    }
    .table tbody td { min-width: 100px; }
    .table tbody tr { transition: background .14s; }
    .table tbody tr:hover { background: #f8fbff; }

    /* ── Back link ── */
    .back-link { color: var(--admin-muted); font-size: .82rem; }

    /* ── Forms ── */
    label { font-size: .82rem; font-weight: 600; color: var(--admin-text); }
    label .muted { font-weight: 400; color: var(--admin-muted); }
    .form-control, .form-select {
      border-color: var(--admin-border) !important;
      background: var(--admin-surface-soft) !important;
      font-size: .88rem; border-radius: 8px !important;
    }
    .form-control:focus, .form-select:focus {
      border-color: var(--admin-primary) !important;
      box-shadow: var(--admin-ring) !important;
      background: #fff !important;
    }
    input, select, textarea {
      width: 100%; background: var(--admin-surface-soft); border: 1px solid var(--admin-border);
      color: var(--admin-text); padding: .55rem .8rem; border-radius: 8px;
      font-size: .88rem; font-family: inherit;
      transition: border-color .12s, box-shadow .12s;
    }
    input:focus, select:focus, textarea:focus {
      outline: none; border-color: var(--admin-primary); box-shadow: var(--admin-ring);
      background: #fff;
    }
    input::placeholder, textarea::placeholder { color: #adb5bd; }
    textarea { min-height: 110px; resize: vertical; }
    .row { display: flex; gap: 16px; flex-wrap: wrap; }
    .row > * { flex: 1; min-width: 200px; }

    /* ── Buttons ── */
    .btn {
      border-radius: 8px; font-weight: 700;
      box-shadow: 0 8px 18px rgba(15,23,42,.05);
      transition: border-color .15s, background .15s, box-shadow .15s, transform .1s;
    }
    .btn:hover { transform: translateY(-1px); }
    .btn:active { transform: translateY(0); }
    .btn-primary, .btn.btn-primary {
      background: var(--admin-primary) !important;
      border-color: var(--admin-primary) !important; color: #3a2600 !important;
    }
    .btn-primary:hover {
      background: var(--admin-primary-dark) !important;
      border-color: var(--admin-primary-dark) !important;
    }
    .btn.btn { /* old custom .btn class compat */
      display: inline-flex; align-items: center; gap: .4rem;
      background: var(--admin-primary); color: #3a2600;
      padding: .5rem 1rem; border: none; cursor: pointer; font-size: .88rem;
    }
    .btn.danger { background: var(--admin-danger) !important; color: #fff !important; border: none; }
    .btn.secondary {
      background: #fff !important; color: var(--admin-text) !important;
      border: 1px solid var(--admin-border) !important;
    }
    .btn.secondary:hover { background: #f5f7fb !important; }
    .btn.sm { padding: .35rem .7rem !important; font-size: .8rem !important; }

    /* ── Flash ── */
    .flash {
      padding: .85rem 1rem; border-radius: 9px; margin-bottom: 1.25rem;
      font-size: .88rem; font-weight: 600;
      display: flex; align-items: center; gap: .75rem;
    }
    .flash.error   { background: #fff5f5; border: 1px solid #fecaca; color: #b91c1c; }
    .flash.success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #065f46; }

    /* ── Tags / badges ── */
    .tag { font-size: .72rem; padding: .28rem .65rem; border-radius: 20px; font-weight: 700; display: inline-block; }
    .tag.published { color: #065f46; background: #dcfce7; border: 1px solid #86efac; }
    .tag.draft     { color: var(--admin-muted); background: #f3f4f6; border: 1px solid var(--admin-border); }
    .tag.pending   { color: #92400e; background: #fef3c7; border: 1px solid #fcd34d; }
    .badge { border-radius: 8px; padding: .3rem .6rem; }

    /* ── Misc helpers ── */
    .muted { color: var(--admin-muted); font-size: .84rem; }
    .dashboard-content { min-height: calc(100vh - 128px); }

    /* ── Footer ── */
    .admin-footer {
      padding: .9rem 0 1.1rem;
      color: var(--admin-muted); font-size: .82rem;
      border-top: 1px solid var(--admin-border);
    }
    .admin-footer .container-fluid {
      display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    }

    /* ── Sidebar mini (desktop collapsed) ── */
    @media (min-width: 992px) {
      body.sidebar-mini .admin-sidebar { width: var(--sidebar-mini-width); }
      body.sidebar-mini .admin-main   { margin-left: var(--sidebar-mini-width); }
      body.sidebar-mini .brand-copy,
      body.sidebar-mini .nav-text,
      body.sidebar-mini .nav-label,
      body.sidebar-mini .sidebar-footer-text,
      body.sidebar-mini .sidebar-user-info { width: 0; opacity: 0; overflow: hidden; }
      body.sidebar-mini .sidebar-header { padding-inline: .85rem; }
      body.sidebar-mini .sidebar-nav .nav-link { justify-content: center; padding-inline: .65rem; }
      body.sidebar-mini .sidebar-nav .nav-link:hover { transform: none; }
      body.sidebar-mini .sidebar-user { justify-content: center; }
    }

    /* ── Mobile sidebar ── */
    @media (max-width: 991.98px) {
      .admin-sidebar { width: min(var(--sidebar-width), calc(100vw - 48px)); transform: translateX(-100%); }
      .admin-main { margin-left: 0; }
      body.sidebar-open { overflow: hidden; }
      body.sidebar-open .admin-sidebar { transform: translateX(0); }
      body.sidebar-open .sidebar-backdrop { display: block; }
    }

    @media (max-width: 575.98px) {
      .page-heading, .panel-header { align-items: flex-start; flex-direction: column; }
      .heading-actions { width: 100%; }
      .metric-card { padding: 1rem; }
      .panel { padding: 1rem; }
    }
  </style>
</head>
<body>

<div class="admin-shell">
  <div class="sidebar-backdrop" data-sidebar-close></div>

  <!-- ── Sidebar ── -->
  <aside class="admin-sidebar" id="adminSidebar" aria-label="Main navigation">
    <div class="sidebar-header">
      <a class="brand-mark" href="/admin" aria-label="R Ceramica Admin">
        <img class="brand-logo-img" src="data:image/webp;base64,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" alt="R Ceramica">
        <span class="brand-copy">
          <span class="brand-title">R Ceramica</span>
          <span class="brand-subtitle">CMS Dashboard</span>
        </span>
      </a>
    </div>

    <nav class="sidebar-nav">
      <span class="nav-label">Main</span>
      <a class="nav-link <?= ($active ?? '') === 'dashboard' ? 'active' : '' ?>" href="/admin">
        <span class="nav-icon"><i class="bi bi-speedometer2"></i></span>
        <span class="nav-text">Dashboard</span>
      </a>
      <a class="nav-link <?= ($active ?? '') === 'pages' ? 'active' : '' ?>" href="/admin/pages">
        <span class="nav-icon"><i class="bi bi-file-earmark-text"></i></span>
        <span class="nav-text">Pages &amp; Sections</span>
      </a>
      <a class="nav-link <?= ($active ?? '') === 'categories' ? 'active' : '' ?>" href="/admin/categories">
        <span class="nav-icon"><i class="bi bi-tags"></i></span>
        <span class="nav-text">Category</span>
      </a>
      <a class="nav-link <?= ($active ?? '') === 'products' ? 'active' : '' ?>" href="/admin/products">
        <span class="nav-icon"><i class="bi bi-box-seam"></i></span>
        <span class="nav-text">Products</span>
      </a>
      <a class="nav-link <?= ($active ?? '') === 'catalogue' ? 'active' : '' ?>" href="/admin/catalogue">
        <span class="nav-icon"><i class="bi bi-journal-richtext"></i></span>
        <span class="nav-text">Catalogue</span>
      </a>

      <span class="nav-label">Commerce</span>
      <a class="nav-link <?= ($active ?? '') === 'orders' ? 'active' : '' ?>" href="/admin/orders">
        <span class="nav-icon"><i class="bi bi-bag-check"></i></span>
        <span class="nav-text">Orders</span>
      </a>

      <span class="nav-label">System</span>
      <a class="nav-link <?= ($active ?? '') === 'settings' ? 'active' : '' ?>" href="/admin/settings">
        <span class="nav-icon"><i class="bi bi-gear"></i></span>
        <span class="nav-text">Settings</span>
      </a>
    </nav>

    <div class="sidebar-user">
      <div class="sidebar-user-avatar"><?= strtoupper(substr($admin['name'] ?? 'A', 0, 1)) ?></div>
      <div class="sidebar-user-info">
        <strong><?= esc($admin['name'] ?? 'Admin') ?></strong>
        <small>Administrator</small>
      </div>
    </div>

    <div class="sidebar-footer">
      <span class="status-dot"></span>
      <span class="sidebar-footer-text">System running</span>
    </div>
  </aside>

  <!-- ── Main ── -->
  <div class="admin-main">

    <!-- ── Topbar ── -->
    <nav class="navbar admin-navbar navbar-expand">
      <div class="container-fluid px-3 px-lg-4">

        <button class="sidebar-toggle me-3" type="button" data-sidebar-toggle
                aria-controls="adminSidebar" aria-label="Toggle sidebar">
          <span></span><span></span><span></span>
        </button>

        <form class="d-none d-md-flex flex-grow-1 me-3" role="search">
          <input class="form-control search-input" type="search"
                 placeholder="Search pages, products, orders…" aria-label="Search">
        </form>

        <div class="navbar-actions ms-auto">
          <!-- Publish Site -->
          <form action="/admin/publish" method="post" style="margin:0">
            <?= csrf_field() ?>
            <button class="publish-btn" type="submit" title="Rebuild the live website">
              <i class="bi bi-cloud-upload"></i>
              <span class="d-none d-sm-inline">Publish Site</span>
            </button>
          </form>

          <!-- User dropdown -->
          <div class="dropdown">
            <button class="profile-button dropdown-toggle" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
              <div class="profile-avatar-sm"><?= strtoupper(substr($admin['name'] ?? 'A', 0, 1)) ?></div>
              <span class="d-none d-sm-inline profile-name"><?= esc($admin['name'] ?? 'Admin') ?></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm" style="border-radius:10px;border-color:var(--admin-border);min-width:180px">
              <li class="px-3 py-2" style="font-size:.82rem;color:var(--admin-muted)"><?= esc($admin['email'] ?? '') ?></li>
              <li><hr class="dropdown-divider my-1"></li>
              <li><a class="dropdown-item" href="/admin/logout" style="font-size:.88rem;font-weight:600">
                <i class="bi bi-box-arrow-right me-2"></i>Sign out
              </a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- ── Content ── -->
    <main class="dashboard-content">
      <div class="container-fluid px-3 px-lg-4 py-4">

        <?php if (session()->getFlashdata('error')): ?>
          <div class="flash error">
            <i class="bi bi-exclamation-circle-fill"></i>
            <?= esc(session()->getFlashdata('error')) ?>
          </div>
        <?php endif; ?>
        <?php if (session()->getFlashdata('success')): ?>
          <div class="flash success">
            <i class="bi bi-check-circle-fill"></i>
            <?= esc(session()->getFlashdata('success')) ?>
          </div>
        <?php endif; ?>

        <?= $this->renderSection('content') ?>
      </div>
    </main>

    <footer class="admin-footer">
      <div class="container-fluid px-3 px-lg-4">
        <span>© <?= date('Y') ?> R Ceramica CMS</span>
        <span style="font-size:.78rem">v1.0</span>
      </div>
    </footer>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
(function () {
  var MINI_KEY = "rc.sidebarMini";
  var body = document.body;

  function isDesktop() { return window.matchMedia("(min-width: 992px)").matches; }

  function storage(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) {}
  }

  // Restore mini state on desktop
  if (isDesktop() && storage(MINI_KEY) === "true") body.classList.add("sidebar-mini");

  var toggle = document.querySelector("[data-sidebar-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      if (isDesktop()) {
        body.classList.toggle("sidebar-mini");
        storage(MINI_KEY, body.classList.contains("sidebar-mini"));
      } else {
        body.classList.toggle("sidebar-open");
      }
    });
  }

  document.querySelectorAll("[data-sidebar-close]").forEach(function (el) {
    el.addEventListener("click", function () { body.classList.remove("sidebar-open"); });
  });

  document.querySelectorAll(".sidebar-nav .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!isDesktop()) body.classList.remove("sidebar-open");
    });
  });

  window.matchMedia("(min-width: 992px)").addEventListener("change", function (e) {
    if (e.matches) {
      body.classList.remove("sidebar-open");
      if (storage(MINI_KEY) === "true") body.classList.add("sidebar-mini");
    } else {
      body.classList.remove("sidebar-mini");
    }
  });
})();
</script>
</body>
</html>
