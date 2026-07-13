<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Sign In — R Ceramica Admin</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

  <style>
    :root {
      --admin-border: #dbe4ef;
      --admin-text: #1f2937;
      --admin-muted: #6b7280;
      --admin-primary: #c9a24b;
      --admin-primary-dark: #a87d28;
      --admin-shadow-lg: 0 26px 70px rgba(15,23,42,.12);
      --admin-ring: 0 0 0 4px rgba(201,162,75,.18);
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      min-height: 100vh; margin: 0;
      background: linear-gradient(135deg, #f8fbff 0%, #fdf6e6 44%, #eef8f6 100%);
      color: var(--admin-text);
      font-family: "Segoe UI", system-ui, Arial, sans-serif;
      font-size: 14px;
    }
    a { text-decoration: none; }

    .auth-page {
      min-height: 100vh; display: grid;
      place-items: center; padding: 1.5rem;
    }
    .auth-card {
      width: min(100%, 440px);
      border: 1px solid var(--admin-border); border-radius: 12px;
      background: rgba(255,255,255,.97);
      box-shadow: var(--admin-shadow-lg);
      padding: 2rem 2rem 1.75rem;
    }

    .auth-brand {
      display: flex; align-items: center; gap: .85rem;
      margin-bottom: 1.75rem; color: var(--admin-text);
    }
    .auth-brand:hover { color: var(--admin-text); }
    .auth-logo {
      height: 42px; width: auto; object-fit: contain;
      border-radius: 8px; background: #fdf6e6; padding: 3px;
    }
    .auth-brand-text { line-height: 1.2; }
    .auth-brand-title { font-size: 1.1rem; font-weight: 800; display: block; }
    .auth-brand-sub { font-size: .78rem; color: var(--admin-muted); display: block; }

    .eyebrow {
      color: var(--admin-primary); font-size: .72rem;
      font-weight: 800; text-transform: uppercase; letter-spacing: .06em;
    }

    h1.auth-heading { font-size: 1.45rem; font-weight: 800; letter-spacing: -.01em; margin: .2rem 0 .35rem; }
    p.auth-desc { color: var(--admin-muted); font-size: .88rem; margin: 0 0 1.5rem; }

    label { display: block; font-size: .82rem; font-weight: 600; margin-bottom: .35rem; }
    input {
      width: 100%; background: #f8fafc; border: 1px solid var(--admin-border);
      color: var(--admin-text); padding: .65rem .85rem; border-radius: 8px;
      font-size: .9rem; font-family: inherit;
      transition: border-color .12s, box-shadow .12s;
    }
    input:focus { outline: none; border-color: var(--admin-primary); box-shadow: var(--admin-ring); background: #fff; }
    input::placeholder { color: #adb5bd; }

    .btn-signin {
      width: 100%; margin-top: 1.35rem;
      background: var(--admin-primary); color: #3a2600;
      border: none; border-radius: 8px;
      padding: .72rem 1rem; font-weight: 700; font-size: .95rem;
      cursor: pointer; display: flex; align-items: center; justify-content: center; gap: .5rem;
      box-shadow: 0 4px 14px rgba(201,162,75,.3);
      transition: filter .15s, box-shadow .15s;
    }
    .btn-signin:hover { filter: brightness(.93); box-shadow: 0 6px 18px rgba(201,162,75,.4); }

    .flash-error {
      padding: .75rem .9rem; border-radius: 8px; margin-bottom: 1.25rem;
      background: #fff5f5; border: 1px solid #fecaca; color: #b91c1c;
      font-size: .88rem; font-weight: 600;
      display: flex; align-items: center; gap: .6rem;
    }
    .auth-footer { text-align: center; color: var(--admin-muted); font-size: .84rem; margin-top: 1.25rem; }
  </style>
</head>
<body>
  <main class="auth-page">
    <section class="auth-card">

      <a class="auth-brand" href="/admin/login">
        <img class="auth-logo" src="/images/logo.webp" alt="R Ceramica"
             onerror="this.style.display='none'">
        <div class="auth-brand-text">
          <span class="auth-brand-title">R Ceramica</span>
          <span class="auth-brand-sub">Sign in to your admin workspace.</span>
        </div>
      </a>

      <?php if (session()->getFlashdata('error')): ?>
        <div class="flash-error">
          <i class="bi bi-exclamation-circle-fill"></i>
          <?= esc(session()->getFlashdata('error')) ?>
        </div>
      <?php endif; ?>

      <div>
        <p class="eyebrow mb-1">Secure Access</p>
        <h1 class="auth-heading">Login</h1>
        <p class="auth-desc">Enter your credentials to continue.</p>
      </div>

      <form action="/admin/authenticate" method="post" autocomplete="off">
        <?= csrf_field() ?>

        <div style="margin-bottom:1rem">
          <label for="email">Email address</label>
          <input type="email" id="email" name="email"
                 value="<?= esc(old('email')) ?>"
                 placeholder="admin@rceramica.com" required autofocus>
        </div>

        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password"
                 placeholder="••••••••" minlength="6" required>
        </div>

        <button class="btn-signin" type="submit">
          <i class="bi bi-box-arrow-in-right"></i> Sign In
        </button>
      </form>

      <div class="auth-footer">R Ceramica CMS · v1.0</div>
    </section>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
