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
        <img src="data:image/webp;base64,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" alt="R Ceramica">
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
