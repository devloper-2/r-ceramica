<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Admin Sign In — R Ceramica</title>
    <style>
        :root { --bg:#0f1115; --panel:#171a21; --line:#252a34; --ink:#e6e8ec; --mut:#8b94a3; --gold:#c9a24b; --danger:#e0574f; }
        * { box-sizing:border-box; }
        body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
               font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif; background:var(--bg); color:var(--ink); }
        .box { width:360px; background:var(--panel); border:1px solid var(--line); border-radius:14px; padding:32px; }
        .brand { font-weight:700; font-size:22px; text-align:center; margin-bottom:4px; }
        .brand span { color:var(--gold); }
        .sub { text-align:center; color:var(--mut); font-size:13px; margin-bottom:22px; }
        label { display:block; font-size:13px; color:var(--mut); margin:14px 0 6px; }
        input { width:100%; background:#0f1218; border:1px solid var(--line); color:var(--ink); padding:11px 12px; border-radius:8px; font-size:14px; }
        button { width:100%; margin-top:22px; background:var(--gold); color:#1a1a1a; padding:12px; border:0; border-radius:8px; font-weight:700; cursor:pointer; font-size:15px; }
        .flash { padding:11px 14px; border-radius:8px; margin-bottom:16px; font-size:13px; background:rgba(224,87,79,.14); border:1px solid var(--danger); }
    </style>
</head>
<body>
    <form class="box" action="/admin/authenticate" method="post" autocomplete="off">
        <?= csrf_field() ?>
        <div class="brand">R <span>Ceramica</span></div>
        <div class="sub">Admin Panel</div>

        <?php if (session()->getFlashdata('error')): ?>
            <div class="flash"><?= esc(session()->getFlashdata('error')) ?></div>
        <?php endif; ?>

        <label for="email">Email</label>
        <input type="email" id="email" name="email" value="<?= esc(old('email')) ?>" required autofocus>

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Sign In</button>
    </form>
</body>
</html>
