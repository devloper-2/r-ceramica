<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Sign In — R Ceramica Admin</title>

  <link rel="icon" href="<?= base_url('images/logo.webp') ?>" type="image/webp">
  <link rel="shortcut icon" href="<?= base_url('images/logo.webp') ?>">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

  <style>
    :root {
      --gold:        #c9a24b;
      --gold-dark:   #a87d28;
      --gold-glow:   rgba(201,162,75,.22);
      --dark:        #0a0a0a;
      --dark-2:      #111111;
      --dark-3:      #1a1a1a;
      --border:      #dbe4ef;
      --text:        #1f2937;
      --muted:       #6b7280;
      --ring:        0 0 0 4px rgba(201,162,75,.18);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body { height: 100%; }

    body {
      font-family: "Segoe UI", system-ui, Arial, sans-serif;
      font-size: 14px;
      display: flex;
      min-height: 100vh;
    }

    /* ── LEFT PANEL ─────────────────────────────────────────────── */
    .lp-left {
      flex: 0 0 55%;
      position: relative;
      background: var(--dark);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 3rem 4rem;
    }

    /* Subtle grid overlay */
    .lp-left::before {
      content: "";
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
      background-size: 64px 64px;
      pointer-events: none;
    }

    /* Gold vertical accent line */
    .lp-left::after {
      content: "";
      position: absolute; top: 0; right: 0;
      width: 1px; height: 100%;
      background: linear-gradient(to bottom,
        transparent 0%,
        rgba(201,162,75,.4) 30%,
        rgba(201,162,75,.4) 70%,
        transparent 100%
      );
    }

    /* Large ghost watermark */
    .lp-watermark {
      position: absolute;
      bottom: -20px; right: -30px;
      font-size: 200px;
      font-weight: 900;
      letter-spacing: -.05em;
      text-transform: uppercase;
      color: rgba(255,255,255,.025);
      user-select: none;
      pointer-events: none;
      line-height: 1;
      white-space: nowrap;
    }

    .lp-brand {
      position: relative; z-index: 1;
      display: flex; flex-direction: column; align-items: center;
      text-align: center; gap: 2rem;
      animation: lpFadeUp .9s ease-out forwards;
    }

    @keyframes lpFadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .lp-logo-wrap {
      width: 160px; height: 160px;
      display: flex; align-items: center; justify-content: center;
    }
    .lp-logo-wrap img {
      width: 100%; height: 100%; object-fit: contain;
    }

    .lp-tagline {
      font-size: .72rem; text-transform: uppercase;
      letter-spacing: .28em; color: rgba(255,255,255,.35);
      font-weight: 500;
    }

    .lp-desc {
      font-size: .88rem; color: rgba(255,255,255,.4);
      line-height: 1.7; max-width: 320px;
    }

    /* Bottom badge */
    .lp-badge {
      position: absolute; bottom: 2rem; left: 50%;
      transform: translateX(-50%);
      display: flex; align-items: center; gap: .5rem;
      background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.07);
      padding: .45rem 1rem; border-radius: 100px;
      white-space: nowrap;
    }
    .lp-badge-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 6px #22c55e;
    }
    .lp-badge span {
      font-size: .7rem; text-transform: uppercase;
      letter-spacing: .12em; color: rgba(255,255,255,.35);
    }

    /* ── RIGHT PANEL ────────────────────────────────────────────── */
    .lp-right {
      flex: 1;
      display: flex; align-items: center; justify-content: center;
      background: #f8fbff;
      padding: 3rem 2.5rem;
      position: relative;
    }

    .lp-form-card {
      width: 100%; max-width: 400px;
      animation: lpFadeUp .9s ease-out .12s both;
    }

    /* Eyebrow */
    .lp-eyebrow {
      font-size: .7rem; font-weight: 800;
      text-transform: uppercase; letter-spacing: .1em;
      color: var(--gold); margin-bottom: .5rem;
    }

    h1.lp-heading {
      font-size: 1.85rem; font-weight: 800;
      letter-spacing: -.02em; color: var(--text);
      margin-bottom: .4rem;
    }
    .lp-sub {
      font-size: .88rem; color: var(--muted);
      margin-bottom: 2rem;
    }

    /* Flash */
    .lp-flash {
      display: flex; align-items: center; gap: .6rem;
      padding: .75rem 1rem; border-radius: 10px; margin-bottom: 1.5rem;
      font-size: .88rem; font-weight: 600;
    }
    .lp-flash.error {
      background: #fff5f5; border: 1px solid #fecaca; color: #b91c1c;
    }
    .lp-flash.success {
      background: #f0fdf4; border: 1px solid #bbf7d0; color: #065f46;
    }

    /* Fields */
    .lp-field { margin-bottom: 1.15rem; }
    .lp-label {
      display: block; font-size: .8rem; font-weight: 700;
      color: var(--text); margin-bottom: .4rem;
    }
    .lp-input-wrap { position: relative; }
    .lp-input-icon {
      position: absolute; left: .9rem; top: 50%; transform: translateY(-50%);
      color: #9ca3af; font-size: .95rem; pointer-events: none;
    }
    .lp-input {
      width: 100%;
      padding: .7rem .85rem .7rem 2.5rem;
      background: #fff;
      border: 1.5px solid var(--border);
      color: var(--text);
      border-radius: 10px;
      font-size: .9rem; font-family: inherit;
      transition: border-color .15s, box-shadow .15s, background .15s;
    }
    .lp-input:focus {
      outline: none;
      border-color: var(--gold);
      box-shadow: var(--ring);
      background: #fff;
    }
    .lp-input::placeholder { color: #c0c7d0; }

    /* Remember me */
    .lp-remember {
      display: flex; align-items: center; gap: .6rem;
      margin-bottom: 1.5rem; cursor: pointer;
    }
    .lp-check {
      width: 17px; height: 17px; flex-shrink: 0;
      accent-color: var(--gold); cursor: pointer;
      border-radius: 4px;
    }
    .lp-remember-label {
      font-size: .82rem; font-weight: 600;
      color: var(--text); user-select: none;
    }

    /* Submit */
    .lp-submit {
      width: 100%;
      background: var(--gold); color: #3a2600;
      border: none; border-radius: 10px;
      padding: .78rem 1rem; font-weight: 800; font-size: .95rem;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: .55rem;
      box-shadow: 0 6px 20px rgba(201,162,75,.35);
      transition: filter .15s, box-shadow .15s, transform .08s;
    }
    .lp-submit:hover {
      filter: brightness(.93);
      box-shadow: 0 8px 26px rgba(201,162,75,.45);
    }
    .lp-submit:active { transform: translateY(1px); }

    /* Footer */
    .lp-footer {
      text-align: center; color: var(--muted);
      font-size: .78rem; margin-top: 1.75rem;
    }

    /* ── Mobile ─────────────────────────────────────────────────── */
    @media (max-width: 768px) {
      body { flex-direction: column; }

      .lp-left {
        flex: 0 0 auto;
        min-height: 220px;
        padding: 2rem 1.5rem 2.5rem;
      }
      .lp-watermark { font-size: 100px; }
      .lp-name { font-size: 1.7rem; }
      .lp-desc { display: none; }
      .lp-badge { bottom: 1rem; }

      .lp-right { padding: 2rem 1.25rem; }
      .lp-form-card { max-width: 100%; }
    }
  </style>
</head>
<body>

  <!-- ══ LEFT — brand panel ══════════════════════════════════════════ -->
  <div class="lp-left">
    <div class="lp-watermark">RC</div>

    <div class="lp-brand">

      <!-- Logo -->
      <div class="lp-logo-wrap">
        <img src="<?= base_url('images/logo.webp') ?>" alt="R Ceramica" onerror="this.style.display='none'">
      </div>

      <div class="lp-tagline">Content Management System</div>

      <p class="lp-desc">
        Premium porcelain &amp; ceramic surfaces.<br>
        Manage your catalogue, collections, and orders from one place.
      </p>

    </div>

    <!-- Status badge -->
    <div class="lp-badge">
      <span class="lp-badge-dot"></span>
      <span>System online · v1.0</span>
    </div>
  </div>

  <!-- ══ RIGHT — login form ══════════════════════════════════════════ -->
  <div class="lp-right">
    <div class="lp-form-card">

      <p class="lp-eyebrow">Secure Access</p>
      <h1 class="lp-heading">Admin Sign In</h1>
      <p class="lp-sub">Enter your credentials to access the dashboard.</p>

      <?php if (session()->getFlashdata('error')): ?>
        <div class="lp-flash error">
          <i class="bi bi-exclamation-circle-fill"></i>
          <?= esc(session()->getFlashdata('error')) ?>
        </div>
      <?php endif; ?>

      <?php if (session()->getFlashdata('success')): ?>
        <div class="lp-flash success">
          <i class="bi bi-check-circle-fill"></i>
          <?= esc(session()->getFlashdata('success')) ?>
        </div>
      <?php endif; ?>

      <form action="/admin/authenticate" method="post" autocomplete="on">
        <?= csrf_field() ?>

        <!-- Email -->
        <div class="lp-field">
          <label class="lp-label" for="email">Email address</label>
          <div class="lp-input-wrap">
            <i class="bi bi-envelope lp-input-icon"></i>
            <input class="lp-input" type="email" id="email" name="email"
                   value="<?= esc(old('email')) ?>"
                   placeholder="admin@rceramica.com" required autofocus
                   autocomplete="email">
          </div>
        </div>

        <!-- Password -->
        <div class="lp-field">
          <label class="lp-label" for="password">Password</label>
          <div class="lp-input-wrap">
            <i class="bi bi-lock lp-input-icon"></i>
            <input class="lp-input" type="password" id="password" name="password"
                   placeholder="••••••••" minlength="6" required
                   autocomplete="current-password">
          </div>
        </div>

        <!-- Remember me -->
        <label class="lp-remember">
          <input class="lp-check" type="checkbox" id="remember" name="remember" value="1">
          <span class="lp-remember-label">Keep me signed in for 30 days</span>
        </label>

        <button class="lp-submit" type="submit">
          <i class="bi bi-box-arrow-in-right"></i>
          Sign In to Dashboard
        </button>
      </form>

      <div class="lp-footer">© <?= date('Y') ?> R Ceramica · Restricted Access</div>
    </div>
  </div>

</body>
</html>
