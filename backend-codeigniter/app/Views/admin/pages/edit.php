<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<?php
$humanType = static function (string $s): string {
    $s = preg_replace('/(?<=[a-z0-9])(?=[A-Z])/', ' ', $s);
    $s = str_replace(['_', '-'], ' ', $s);
    return ucwords(trim($s));
};
?>

<style>
/* ── Breadcrumb ───────────────────────────────── */
.admin-breadcrumb {
  display: flex;
  align-items: center;
  gap: .4rem;
  font-size: .8rem;
  color: var(--admin-muted);
  margin-bottom: 1.25rem;
}
.admin-breadcrumb a { color: var(--admin-muted); text-decoration: none; }
.admin-breadcrumb a:hover { color: var(--admin-primary); }
.admin-breadcrumb .sep { color: var(--admin-border); }
.admin-breadcrumb .current { color: var(--admin-text); font-weight: 600; }

/* ── SEO panel form ───────────────────────────── */
.seo-panel { margin-bottom: 1.5rem; }
.seo-panel .panel-header {
  padding: .9rem 1.25rem;
  border-bottom: 1px solid var(--admin-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.seo-panel .panel-body { padding: 1.25rem; }

.admin-form-label {
  display: block;
  font-size: .8rem;
  font-weight: 700;
  color: var(--admin-text);
  margin-bottom: .35rem;
}
.admin-form-hint {
  font-size: .75rem;
  color: var(--admin-muted);
  margin-top: .25rem;
}
.admin-form-control {
  width: 100%;
  padding: .55rem .8rem;
  font-size: .875rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  background: var(--admin-surface-soft);
  color: var(--admin-text);
  transition: border-color .14s, box-shadow .14s;
  outline: none;
  font-family: inherit;
}
.admin-form-control:focus {
  border-color: var(--admin-primary);
  box-shadow: 0 0 0 4px rgba(201,162,75,.14);
  background: #fff;
}
textarea.admin-form-control { resize: vertical; min-height: 70px; }
select.admin-form-control { cursor: pointer; }

/* ── Section cards ────────────────────────────── */
.section-card {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 14px;
  margin-bottom: 1.1rem;
  box-shadow: var(--admin-shadow-sm);
  overflow: hidden;
  transition: border-color .17s, box-shadow .17s;
}
.section-card:hover { border-color: rgba(201,162,75,.3); }

.section-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--admin-border);
  background: var(--admin-surface-soft);
  flex-wrap: wrap;
}
.section-card-title {
  font-size: .95rem;
  font-weight: 700;
  color: var(--admin-text);
  margin: 0;
  line-height: 1.2;
}
.section-card-type {
  font-size: .7rem;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--admin-muted);
  font-weight: 600;
  font-family: ui-monospace, Consolas, monospace;
  margin-top: .15rem;
}
.section-tools {
  display: flex;
  align-items: center;
  gap: .75rem;
  flex-wrap: wrap;
}
.order-wrap {
  display: flex;
  align-items: center;
  gap: .4rem;
  font-size: .8rem;
  color: var(--admin-muted);
  font-weight: 600;
}
.order-input {
  width: 68px;
  padding: .35rem .55rem;
  font-size: .82rem;
  border: 1px solid var(--admin-border);
  border-radius: 7px;
  background: #fff;
  color: var(--admin-text);
  outline: none;
  text-align: center;
}
.order-input:focus { border-color: var(--admin-primary); box-shadow: 0 0 0 3px rgba(201,162,75,.14); }

.visible-toggle {
  display: flex;
  align-items: center;
  gap: .45rem;
  font-size: .82rem;
  font-weight: 600;
  color: var(--admin-muted);
  cursor: pointer;
  user-select: none;
  margin: 0;
}
/* Custom checkbox toggle */
.toggle-track {
  position: relative;
  width: 36px; height: 20px;
  flex: 0 0 36px;
}
.toggle-track input { opacity: 0; width: 0; height: 0; position: absolute; }
.toggle-slider {
  position: absolute; inset: 0;
  background: var(--admin-border);
  border-radius: 20px;
  transition: background .18s;
  cursor: pointer;
}
.toggle-slider::before {
  content: '';
  position: absolute;
  width: 14px; height: 14px;
  left: 3px; top: 3px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
  transition: transform .18s;
}
.toggle-track input:checked ~ .toggle-slider { background: var(--admin-primary); }
.toggle-track input:checked ~ .toggle-slider::before { transform: translateX(16px); }

/* Section body / tabs */
.section-card-body { padding: 1.25rem; }

.editor-tabs {
  display: flex;
  gap: .4rem;
  margin-bottom: 1.1rem;
}
.editor-tab {
  padding: .38rem .9rem;
  border: 1px solid var(--admin-border);
  background: var(--admin-surface-soft);
  border-radius: 7px;
  cursor: pointer;
  font-size: .8rem;
  font-weight: 600;
  color: var(--admin-muted);
  transition: background .14s, color .14s, border-color .14s;
}
.editor-tab:hover { color: var(--admin-text); }
.editor-tab.active {
  background: rgba(201,162,75,.12);
  color: var(--admin-primary);
  border-color: rgba(201,162,75,.4);
}

/* Easy-editor field atoms */
.fe-field { margin: 0 0 1rem; }
.fe-field:last-child { margin-bottom: 0; }
.fe-label {
  display: block;
  font-size: .78rem;
  font-weight: 700;
  color: var(--admin-text);
  margin-bottom: .35rem;
  text-transform: capitalize;
}

/* Inputs inside easy editor inherit admin-form-control style */
.fe-obj input,
.fe-obj textarea,
.fe-obj select {
  width: 100%;
  padding: .5rem .75rem;
  font-size: .875rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  background: var(--admin-surface-soft);
  color: var(--admin-text);
  transition: border-color .14s, box-shadow .14s;
  outline: none;
  font-family: inherit;
}
.fe-obj input:focus,
.fe-obj textarea:focus {
  border-color: var(--admin-primary);
  box-shadow: 0 0 0 3px rgba(201,162,75,.13);
  background: #fff;
}
.fe-obj textarea { resize: vertical; min-height: 80px; }

/* Array items */
.fe-arr-list { display: flex; flex-direction: column; gap: .85rem; }
.fe-arr-item {
  display: flex;
  gap: .75rem;
  align-items: flex-start;
  background: var(--admin-surface-soft);
  border: 1px solid var(--admin-border);
  border-radius: 10px;
  padding: 1rem;
}
.fe-arr-body { flex: 1; min-width: 0; }
.fe-rm {
  flex: 0 0 auto;
  width: 30px; height: 30px;
  background: #fff;
  border: 1px solid var(--admin-border);
  color: var(--admin-danger);
  border-radius: 7px;
  cursor: pointer;
  font-size: .85rem;
  display: grid;
  place-items: center;
  transition: background .14s, border-color .14s;
}
.fe-rm:hover { background: #fee2e2; border-color: #fca5a5; }

.fe-add {
  margin-top: .85rem;
  background: #fff;
  border: 1px dashed rgba(201,162,75,.5);
  color: var(--admin-primary);
  padding: .5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: .82rem;
  transition: background .14s;
}
.fe-add:hover { background: rgba(201,162,75,.07); }

/* Switch (boolean) */
.switch {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  font-size: .85rem;
  font-weight: 600;
  color: var(--admin-muted);
  cursor: pointer;
}
.switch input[type="checkbox"] {
  width: 16px; height: 16px;
  accent-color: var(--admin-primary);
  cursor: pointer;
}

/* Media preview */
.fe-media { margin-top: .4rem; }
.fe-thumb {
  max-height: 72px;
  border-radius: 8px;
  border: 1px solid var(--admin-border);
  display: none;
}
.fe-hint { font-size: .74rem; color: var(--admin-muted); margin-top: .3rem; }

/* Raw JSON editor */
.raw-json {
  display: none;
  width: 100%;
  font-family: ui-monospace, Consolas, monospace;
  font-size: .82rem;
  min-height: 220px;
  padding: .8rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  background: #0f172a;
  color: #e2e8f0;
  resize: vertical;
  outline: none;
  line-height: 1.6;
}
.raw-json:focus { border-color: var(--admin-primary); box-shadow: 0 0 0 3px rgba(201,162,75,.13); }

/* Save row */
.save-row {
  margin-top: 1.1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--admin-border);
  display: flex;
  align-items: center;
  gap: .75rem;
}
.btn-save {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: .5rem 1.1rem;
  font-size: .85rem;
  font-weight: 700;
  background: var(--admin-primary);
  color: #3a2600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(201,162,75,.28);
  transition: filter .14s, box-shadow .14s, transform .06s;
}
.btn-save:hover { filter: brightness(.93); box-shadow: 0 6px 18px rgba(201,162,75,.38); }
.btn-save:active { transform: translateY(1px); }
</style>

<!-- Breadcrumb -->
<nav class="admin-breadcrumb" aria-label="breadcrumb">
  <a href="/admin/pages"><i class="bi bi-file-earmark-text me-1"></i>Pages &amp; Sections</a>
  <span class="sep">/</span>
  <span class="current"><?= esc($page['title']) ?></span>
</nav>

<!-- Page heading -->
<div class="page-heading">
  <div class="page-heading-copy">
    <span class="page-icon"><i class="bi bi-pencil-square"></i></span>
    <div>
      <p class="eyebrow mb-1">Editing page</p>
      <h1><?= esc($page['title']) ?></h1>
      <p class="text-muted mb-0" style="font-size:.88rem">
        URL: <code style="font-size:.82rem;background:rgba(201,162,75,.1);color:var(--admin-primary-dark);padding:1px 7px;border-radius:5px">
          /<?= esc($page['slug'] === 'home' ? '' : $page['slug']) ?>
        </code>
      </p>
    </div>
  </div>
  <div class="heading-actions">
    <a href="/admin/pages" class="btn btn-light btn-sm">
      <i class="bi bi-arrow-left me-1"></i> All Pages
    </a>
  </div>
</div>

<!-- ── SEO / Page details panel ─────────────────────────────────── -->
<div class="panel seo-panel">
  <div class="panel-header">
    <div>
      <h2 class="h6 mb-0 section-title"><i class="bi bi-search me-2" style="color:var(--admin-primary)"></i>Page Details &amp; SEO</h2>
    </div>
    <span style="font-size:.75rem;color:var(--admin-muted)">Changes save when you click the button below</span>
  </div>
  <div class="panel-body">
    <form action="/admin/pages/<?= (int) $page['id'] ?>" method="post">
      <?= csrf_field() ?>
      <div class="row g-3 mb-3">
        <div class="col-12 col-md-8">
          <label class="admin-form-label" for="pg_title">Page Title</label>
          <input id="pg_title" name="title" class="admin-form-control"
                 value="<?= esc($page['title']) ?>" required>
        </div>
        <div class="col-12 col-md-4">
          <label class="admin-form-label" for="pg_status">Status</label>
          <select id="pg_status" name="status" class="admin-form-control">
            <option value="published" <?= $page['status'] === 'published' ? 'selected' : '' ?>>
              Published (visible)
            </option>
            <option value="draft" <?= $page['status'] === 'draft' ? 'selected' : '' ?>>
              Draft (hidden)
            </option>
          </select>
        </div>
      </div>
      <div class="mb-3">
        <label class="admin-form-label" for="pg_meta_title">
          SEO Title
          <span class="admin-form-hint d-inline ms-1">— shown in browser tab &amp; Google results</span>
        </label>
        <input id="pg_meta_title" name="meta_title" class="admin-form-control"
               value="<?= esc($page['meta_title']) ?>" maxlength="255">
      </div>
      <div class="mb-3">
        <label class="admin-form-label" for="pg_meta_desc">
          SEO Description
          <span class="admin-form-hint d-inline ms-1">— the summary shown below the title in Google</span>
        </label>
        <textarea id="pg_meta_desc" name="meta_description" class="admin-form-control"
                  maxlength="500"><?= esc($page['meta_description']) ?></textarea>
      </div>
      <button type="submit" class="btn-save">
        <i class="bi bi-check-lg"></i> Save Page Details
      </button>
    </form>
  </div>
</div>

<!-- ── Sections ──────────────────────────────────────────────────── -->
<div class="d-flex align-items-center gap-2 mb-3">
  <h2 class="h6 mb-0" style="font-weight:700">
    <i class="bi bi-layers me-2" style="color:var(--admin-primary)"></i>
    Content Sections
    <span style="font-size:.75rem;font-weight:500;color:var(--admin-muted);margin-left:.35rem">(<?= count($sections) ?>)</span>
  </h2>
  <span style="flex:1;height:1px;background:var(--admin-border)"></span>
  <span style="font-size:.75rem;color:var(--admin-muted)">
    Edit each section, then click <strong>Save section</strong>
  </span>
</div>

<?php if (! $sections): ?>
  <div class="panel text-center py-5">
    <i class="bi bi-layers fs-1 text-muted opacity-50 d-block mb-2"></i>
    <p class="text-muted mb-0">This page has no sections yet.</p>
  </div>
<?php endif; ?>

<?php foreach ($sections as $s): ?>
<form action="/admin/pages/<?= (int) $page['id'] ?>/sections/<?= (int) $s['id'] ?>"
      method="post" class="section-card section-form">
  <?= csrf_field() ?>

  <!-- Section header -->
  <div class="section-card-head">
    <div>
      <p class="section-card-title"><?= esc($humanType($s['type'])) ?></p>
      <p class="section-card-type"><?= esc($s['type']) ?></p>
    </div>
    <div class="section-tools">
      <div class="order-wrap">
        <span>Order</span>
        <input class="order-input" name="sort_order" type="number"
               value="<?= (int) $s['sort_order'] ?>" min="0" max="999">
      </div>
      <label class="visible-toggle">
        <span class="toggle-track">
          <input type="checkbox" name="is_active" value="1" <?= $s['is_active'] ? 'checked' : '' ?>>
          <span class="toggle-slider"></span>
        </span>
        Visible
      </label>
    </div>
  </div>

  <!-- Editor tabs + mount -->
  <div class="section-card-body">
    <div class="editor-tabs">
      <span class="editor-tab active" data-mode="simple">
        <i class="bi bi-ui-checks me-1"></i>Easy Editor
      </span>
      <span class="editor-tab" data-mode="advanced">
        <i class="bi bi-code-slash me-1"></i>Advanced (JSON)
      </span>
    </div>

    <div class="editor-mount"></div>
    <textarea class="raw-json" spellcheck="false"></textarea>
    <!-- Actual submitted value — JS syncs this before POST -->
    <textarea name="content" style="display:none"><?= esc($s['content_pretty']) ?></textarea>

    <div class="save-row">
      <button type="submit" class="btn-save">
        <i class="bi bi-check-lg"></i> Save Section
      </button>
      <span class="text-muted" style="font-size:.78rem">
        Last saved: <?= esc($s['updated_at'] ?? $s['created_at'] ?? '—') ?>
      </span>
    </div>
  </div>
</form>
<?php endforeach; ?>

<script>
(function () {
    /* ---- helpers -------------------------------------------------------- */
    function humanize(k) {
        var s = String(k)
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
            .replace(/([a-zA-Z])(\d)/g, '$1 $2')
            .replace(/[_-]+/g, ' ').trim();
        s = s.replace(/\bsrc\b/gi, '').replace(/\bimg\b/gi, 'Image');
        s = s.replace(/\s+/g, ' ').trim();
        s = s.replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        s = s.replace(/\bHref\b/g, 'Link').replace(/\bCta\b/g, 'Button')
             .replace(/\bUrl\b/g, 'URL').replace(/\bId\b/g, 'ID').replace(/\bSeo\b/g, 'SEO');
        return s || String(k);
    }

    function blankLike(v) {
        if (Array.isArray(v)) return [];
        if (v && typeof v === 'object') { var o = {}; for (var k in v) o[k] = blankLike(v[k]); return o; }
        if (typeof v === 'number') return 0;
        if (typeof v === 'boolean') return false;
        return '';
    }

    var MEDIA_RE = /image|media|video|photo|logo|icon|thumbnail|cover|src/i;
    var IMG_EXT_RE = /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i;

    function attachMediaPreview(key, el) {
        if (!MEDIA_RE.test(key)) return;
        var box = document.createElement('div'); box.className = 'fe-media';
        var img = document.createElement('img'); img.className = 'fe-thumb';
        var hint = document.createElement('div'); hint.className = 'fe-hint';
        hint.textContent = 'Image path or URL — e.g. /images/photo.webp or https://...';
        function upd() {
            var v = (el.value || '').trim();
            if (IMG_EXT_RE.test(v) || /^https?:\/\//.test(v)) {
                img.src = v; img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        }
        el.addEventListener('input', upd);
        box.appendChild(img); box.appendChild(hint);
        el.after(box); upd();
    }

    /* ---- recursive builders --------------------------------------------- */
    function buildPrimitive(value) {
        var el, getValue;
        if (typeof value === 'boolean') {
            var wrap = document.createElement('label'); wrap.className = 'switch';
            var cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = value;
            var lbl = document.createTextNode(' Yes');
            wrap.appendChild(cb); wrap.appendChild(lbl);
            el = wrap; el.__input = cb; getValue = function () { return cb.checked; };
        } else if (typeof value === 'number') {
            var ni = document.createElement('input'); ni.type = 'number'; ni.value = value;
            el = ni; getValue = function () { return ni.value === '' ? 0 : Number(ni.value); };
        } else {
            var str = value == null ? '' : String(value);
            var long = str.length > 60 || str.indexOf('\n') !== -1;
            var inp = document.createElement(long ? 'textarea' : 'input');
            if (!long) inp.type = 'text';
            inp.value = str;
            if (long) inp.rows = Math.min(8, str.split('\n').length + 1);
            el = inp; getValue = function () { return inp.value; };
        }
        return { el: el, getValue: getValue };
    }

    function buildObject(obj) {
        var wrap = document.createElement('div'); wrap.className = 'fe-obj';
        var models = {};
        Object.keys(obj).forEach(function (k) {
            var field = document.createElement('div'); field.className = 'fe-field';
            var lab = document.createElement('div'); lab.className = 'fe-label'; lab.textContent = humanize(k);
            var m = build(obj[k]);
            field.appendChild(lab); field.appendChild(m.el);
            wrap.appendChild(field);
            models[k] = m;
            var input = m.el.__input ? m.el.__input : m.el;
            if ((input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') && typeof obj[k] === 'string') {
                attachMediaPreview(k, input);
            }
        });
        return {
            el: wrap,
            getValue: function () {
                var o = {};
                Object.keys(models).forEach(function (k) { o[k] = models[k].getValue(); });
                return o;
            }
        };
    }

    function buildArray(arr) {
        var wrap = document.createElement('div'); wrap.className = 'fe-arr';
        var list = document.createElement('div'); list.className = 'fe-arr-list';
        var children = [];
        var template = arr.length ? arr[0] : '';

        function addItem(val) {
            var row = document.createElement('div'); row.className = 'fe-arr-item';
            var body = document.createElement('div'); body.className = 'fe-arr-body';
            var m = build(val);
            body.appendChild(m.el);
            var rm = document.createElement('button');
            rm.type = 'button'; rm.className = 'fe-rm'; rm.title = 'Remove';
            rm.innerHTML = '<i class="bi bi-x-lg"></i>';
            rm.onclick = function () {
                list.removeChild(row);
                for (var i = 0; i < children.length; i++) {
                    if (children[i].row === row) { children.splice(i, 1); break; }
                }
            };
            row.appendChild(body); row.appendChild(rm);
            list.appendChild(row);
            children.push({ row: row, model: m });
        }
        arr.forEach(addItem);

        var add = document.createElement('button');
        add.type = 'button'; add.className = 'fe-add';
        add.innerHTML = '<i class="bi bi-plus-lg me-1"></i> Add item';
        add.onclick = function () { addItem(blankLike(template)); };
        wrap.appendChild(list); wrap.appendChild(add);
        return {
            el: wrap,
            getValue: function () { return children.map(function (c) { return c.model.getValue(); }); }
        };
    }

    function build(value) {
        if (Array.isArray(value)) return buildArray(value);
        if (value && typeof value === 'object') return buildObject(value);
        return buildPrimitive(value);
    }

    /* ---- wire up each section form -------------------------------------- */
    document.querySelectorAll('.section-form').forEach(function (form) {
        var mount  = form.querySelector('.editor-mount');
        var raw    = form.querySelector('.raw-json');
        var hidden = form.querySelector('textarea[name="content"]');
        var tabs   = form.querySelectorAll('.editor-tab');
        var mode   = 'simple';
        var root;

        function renderSimple(data) {
            mount.innerHTML = '';
            root = build(data);
            mount.appendChild(root.el);
        }

        var initial;
        try { initial = JSON.parse(hidden.value); }
        catch (e) { initial = null; }

        if (initial === null) {
            mount.style.display = 'none';
            raw.style.display   = 'block';
            raw.value           = hidden.value;
            mode = 'advanced';
            tabs.forEach(function (t) { t.style.display = 'none'; });
        } else {
            renderSimple(initial);
        }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var next = tab.dataset.mode;
                if (next === mode) return;
                if (next === 'advanced') {
                    raw.value = JSON.stringify(root ? root.getValue() : initial, null, 2);
                    mount.style.display = 'none'; raw.style.display = 'block';
                } else {
                    try { renderSimple(JSON.parse(raw.value)); }
                    catch (e) {
                        alert('JSON error — please fix before switching to Easy Editor:\n\n' + e.message);
                        return;
                    }
                    raw.style.display = 'none'; mount.style.display = 'block';
                }
                mode = next;
                tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
            });
        });

        form.addEventListener('submit', function (e) {
            var out;
            if (mode === 'advanced') {
                try { out = JSON.parse(raw.value); }
                catch (err) {
                    e.preventDefault();
                    alert('Please fix the JSON error before saving:\n\n' + err.message);
                    return;
                }
            } else {
                out = root.getValue();
            }
            hidden.value = JSON.stringify(out);
        });
    });
})();
</script>

<?= $this->endSection() ?>
