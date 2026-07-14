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
/* ── Shared card shell ── */
.pe-card {
  background: var(--admin-surface); border: 1px solid var(--admin-border);
  border-radius: 12px; box-shadow: var(--admin-shadow-sm); overflow: hidden;
  transition: box-shadow .18s;
}
.pe-card:hover { box-shadow: var(--admin-shadow); }
.pe-card-header {
  display: flex; align-items: center; gap: .65rem;
  padding: 1rem 1.25rem; border-bottom: 1px solid var(--admin-border);
  background: var(--admin-surface-soft);
}
.pe-card-icon {
  width: 34px; height: 34px; border-radius: 8px;
  background: rgba(201,162,75,.1); color: var(--admin-primary);
  display: inline-grid; place-items: center; font-size: .95rem; flex-shrink: 0;
}
.pe-card-title    { font-weight: 700; font-size: .9rem; margin: 0; }
.pe-card-subtitle { font-size: .76rem; color: var(--admin-muted); margin: .1rem 0 0; }
.pe-card-body { padding: 1.25rem; }

.pe-field { display: flex; flex-direction: column; gap: .35rem; margin-bottom: 1rem; }
.pe-field:last-child { margin-bottom: 0; }
.pe-label { font-size: .78rem; font-weight: 700; color: var(--admin-muted); text-transform: uppercase; letter-spacing: .04em; }
.pe-hint  { font-size: .74rem; color: var(--admin-muted); margin-top: .2rem; }
.pe-input-wrap { position: relative; }
.pe-input-wrap .pe-icon { position: absolute; left: .75rem; top: 50%; transform: translateY(-50%); color: var(--admin-muted); pointer-events: none; font-size: .9rem; }
.pe-input-wrap input,
.pe-input-wrap select,
.pe-input-wrap textarea { padding-left: 2.1rem !important; }
.pe-input-wrap.no-icon input,
.pe-input-wrap.no-icon select,
.pe-input-wrap.no-icon textarea { padding-left: .8rem !important; }

/* Back button */
.pe-back-btn {
  display: inline-flex; align-items: center; gap: .3rem;
  padding: .35rem .75rem .35rem .5rem;
  border: 1.5px solid var(--admin-border); border-radius: 8px;
  background: var(--admin-surface); color: var(--admin-muted);
  font-size: .8rem; font-weight: 600; text-decoration: none;
  box-shadow: 0 1px 3px rgba(0,0,0,.05);
  transition: border-color .15s, color .15s, background .15s;
}
.pe-back-btn i { font-size: 1.1rem; }
.pe-back-btn:hover { border-color: var(--admin-primary); color: var(--admin-primary); background: rgba(201,162,75,.06); text-decoration: none; }

/* Header save button */
.pe-header-save {
  display: inline-flex; align-items: center; gap: .45rem;
  background: var(--admin-primary); color: #3a2600; border: none;
  border-radius: 9px; padding: .55rem 1.25rem;
  font-weight: 800; font-size: .88rem; cursor: pointer; white-space: nowrap;
  box-shadow: 0 4px 14px rgba(201,162,75,.38);
  transition: filter .15s, box-shadow .15s, transform .06s;
}
.pe-header-save:hover { filter: brightness(.92); box-shadow: 0 6px 20px rgba(201,162,75,.48); }
.pe-header-save:active { transform: translateY(1px); }

.pe-status-select {
  height: 38px; padding: .3rem .9rem; border: 1.5px solid var(--admin-border);
  border-radius: 9px; background: var(--admin-surface); color: var(--admin-text);
  font-size: .82rem; font-weight: 700; cursor: pointer;
  transition: border-color .15s, box-shadow .15s;
}
.pe-status-select:focus { outline: none; border-color: var(--admin-primary); box-shadow: 0 0 0 3px rgba(201,162,75,.15); }

/* 2-column section grid */
.sections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  gap: 1.1rem;
  align-items: start;
}

/* Section cards */
.section-card {
  background: var(--admin-surface); border: 1.5px solid var(--admin-border);
  border-radius: 14px;
  box-shadow: var(--admin-shadow-sm); overflow: hidden;
  transition: border-color .17s, box-shadow .17s;
}
.section-card:hover { border-color: rgba(201,162,75,.3); box-shadow: var(--admin-shadow); }
.section-card-head {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem; padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--admin-border);
  background: var(--admin-surface-soft); flex-wrap: wrap;
}
.section-card-title { font-size: .95rem; font-weight: 700; color: var(--admin-text); margin: 0; }
.section-card-type  { font-size: .7rem; text-transform: uppercase; letter-spacing: .06em; color: var(--admin-muted); font-weight: 600; font-family: ui-monospace, Consolas, monospace; margin-top: .15rem; }
.section-tools { display: flex; align-items: center; gap: .75rem; flex-wrap: wrap; }
.order-wrap { display: flex; align-items: center; gap: .4rem; font-size: .8rem; color: var(--admin-muted); font-weight: 600; }
.order-input {
  width: 68px; padding: .35rem .55rem; font-size: .82rem;
  border: 1.5px solid var(--admin-border); border-radius: 7px;
  background: var(--admin-surface); color: var(--admin-text);
  outline: none; text-align: center;
  transition: border-color .14s, box-shadow .14s;
}
.order-input:focus { border-color: var(--admin-primary); box-shadow: 0 0 0 3px rgba(201,162,75,.14); }

/* Visible toggle */
.visible-toggle { display: flex; align-items: center; gap: .45rem; font-size: .82rem; font-weight: 600; color: var(--admin-muted); cursor: pointer; user-select: none; margin: 0; }
.toggle-track { position: relative; width: 38px; height: 22px; flex: 0 0 38px; }
.toggle-track input { opacity: 0; width: 0; height: 0; position: absolute; }
.toggle-slider { position: absolute; inset: 0; background: var(--admin-border); border-radius: 20px; transition: background .18s; cursor: pointer; }
.toggle-slider::before { content: ''; position: absolute; width: 16px; height: 16px; left: 3px; top: 3px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.2); transition: transform .18s; }
.toggle-track input:checked ~ .toggle-slider { background: var(--admin-primary); }
.toggle-track input:checked ~ .toggle-slider::before { transform: translateX(16px); }

/* Section card body */
.section-card-body { padding: 1.25rem; }

/* Easy-editor fields — 2-column grid inside each section */
.fe-obj { display: grid; grid-template-columns: 1fr 1fr; gap: .7rem 1rem; }
.fe-field { margin: 0; }
.fe-field-full { grid-column: 1 / -1; }
.fe-label { display: block; font-size: .78rem; font-weight: 700; color: var(--admin-muted); margin-bottom: .35rem; text-transform: capitalize; letter-spacing: .03em; }
.fe-obj input, .fe-obj textarea, .fe-obj select {
  width: 100%; padding: .5rem .75rem; font-size: .875rem;
  border: 1.5px solid var(--admin-border); border-radius: 8px;
  background: var(--admin-surface-soft); color: var(--admin-text);
  transition: border-color .14s, box-shadow .14s; outline: none; font-family: inherit;
}
.fe-obj input:focus, .fe-obj textarea:focus { border-color: var(--admin-primary); box-shadow: 0 0 0 3px rgba(201,162,75,.13); background: #fff; }
.fe-obj textarea { resize: vertical; min-height: 80px; }

/* Image upload zone inside easy editor */
.fe-img-zone {
  border: 2px dashed var(--admin-border); border-radius: 10px;
  position: relative; overflow: hidden;
  transition: border-color .15s, background .15s;
  background: var(--admin-surface-soft);
}
.fe-img-zone:hover { border-color: var(--admin-primary); background: #fffbf2; }
.fe-img-zone input[type="file"] { display: none; }
.fe-img-zone-placeholder { padding: .85rem; text-align: center; cursor: pointer; }
.fe-img-zone-placeholder i { font-size: 1.4rem; color: var(--admin-muted); display: block; margin-bottom: .2rem; }
.fe-img-zone-placeholder span { font-size: .75rem; color: var(--admin-muted); }
.fe-img-zone-placeholder strong { color: var(--admin-primary); }
.fe-img-preview-wrap { display: none; position: relative; cursor: pointer; }
.fe-img-preview-wrap img { width: 100%; height: 100px; object-fit: cover; display: block; }
.fe-img-change-btn {
  position: absolute; bottom: 6px; right: 6px;
  background: rgba(0,0,0,.55); color: #fff; border: none;
  border-radius: 6px; padding: .25rem .6rem; font-size: .72rem; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; gap: .3rem;
}
.fe-upload-spinner { display: none; font-size: .75rem; color: var(--admin-muted); padding: .4rem 0; text-align: center; }
/* Video preview */
.fe-vid-preview-wrap { display: none; position: relative; background: #000; border-radius: 0 0 8px 8px; }
.fe-vid-preview-wrap video { width: 100%; max-height: 140px; display: block; object-fit: contain; }
.fe-vid-preview-wrap .fe-img-change-btn { position: absolute; bottom: 6px; right: 6px; }

/* Array items */
.fe-arr-list { display: flex; flex-direction: column; gap: .85rem; }
.fe-arr-item { display: flex; gap: .75rem; align-items: flex-start; background: var(--admin-surface-soft); border: 1px solid var(--admin-border); border-radius: 10px; padding: 1rem; }
.fe-arr-body { flex: 1; min-width: 0; }
.fe-rm { flex: 0 0 auto; width: 30px; height: 30px; background: #fff; border: 1px solid var(--admin-border); color: var(--admin-danger); border-radius: 7px; cursor: pointer; font-size: .85rem; display: grid; place-items: center; transition: background .14s, border-color .14s; }
.fe-rm:hover { background: #fee2e2; border-color: #fca5a5; }
.fe-add { margin-top: .85rem; background: #fff; border: 1.5px dashed rgba(201,162,75,.5); color: var(--admin-primary); padding: .5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: .82rem; transition: background .14s; }
.fe-add:hover { background: rgba(201,162,75,.07); }
.switch { display: inline-flex; align-items: center; gap: .5rem; font-size: .85rem; font-weight: 600; color: var(--admin-muted); cursor: pointer; }
.switch input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--admin-primary); cursor: pointer; }

/* Save row */
.save-row { margin-top: 1.1rem; padding-top: 1rem; border-top: 1px solid var(--admin-border); display: flex; align-items: center; gap: .75rem; }
.btn-save-section {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .5rem 1.1rem; font-size: .85rem; font-weight: 700;
  background: var(--admin-primary); color: #3a2600; border: none;
  border-radius: 8px; cursor: pointer;
  box-shadow: 0 4px 14px rgba(201,162,75,.28);
  transition: filter .14s, box-shadow .14s, transform .06s;
}
.btn-save-section:hover { filter: brightness(.93); box-shadow: 0 6px 18px rgba(201,162,75,.38); }
.btn-save-section:active { transform: translateY(1px); }

/* Sections header */
.sections-header {
  display: flex; align-items: center; gap: .75rem;
  margin-bottom: 1.25rem;
}
.sections-header h2 { font-size: 1rem; font-weight: 700; margin: 0; }
.sections-header .divider { flex: 1; height: 1px; background: var(--admin-border); }
</style>

<!-- Flash messages -->
<?php if (session()->has('success')): ?>
  <div class="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-3">
    <i class="bi bi-check-circle-fill"></i><span><?= esc(session('success')) ?></span>
    <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
  </div>
<?php endif; ?>
<?php if (session()->has('error')): ?>
  <div class="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 mb-3">
    <i class="bi bi-exclamation-triangle-fill"></i><span><?= esc(session('error')) ?></span>
    <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
  </div>
<?php endif; ?>

<!-- Back button -->
<div class="mb-3">
  <a href="/admin/pages" class="pe-back-btn">
    <i class="bi bi-arrow-left-short"></i> All Pages
  </a>
</div>

<!-- Page heading -->
<form action="/admin/pages/<?= (int) $page['id'] ?>" method="post" id="seo-form">
<?= csrf_field() ?>
<div class="d-flex align-items-center gap-3 mb-4">
  <div class="page-icon"><i class="bi bi-pencil-square"></i></div>
  <div>
    <div class="eyebrow">Page</div>
    <h1 class="mb-0" style="font-size:1.4rem;font-weight:800"><?= esc($page['title']) ?></h1>
    <span style="font-size:.75rem;color:var(--admin-muted)">
      URL: <code style="font-size:.72rem;background:rgba(201,162,75,.1);color:#8a6a1a;padding:1px 7px;border-radius:5px">
        /<?= esc($page['slug'] === 'home' ? '' : $page['slug']) ?>
      </code>
    </span>
  </div>
  <div class="ms-auto d-flex align-items-center gap-3">
    <select name="status" class="pe-status-select">
      <option value="published" <?= $page['status'] === 'published' ? 'selected' : '' ?>>✦ Published</option>
      <option value="draft"     <?= $page['status'] === 'draft'     ? 'selected' : '' ?>>◌ Draft</option>
    </select>
    <button type="submit" class="pe-header-save">
      <i class="bi bi-check-lg"></i> Save Page Details
    </button>
  </div>
</div>

<!-- SEO card -->
<div class="pe-card mb-4">
  <div class="pe-card-header">
    <div class="pe-card-icon"><i class="bi bi-search"></i></div>
    <div>
      <p class="pe-card-title">SEO &amp; Page Details</p>
      <p class="pe-card-subtitle">Title, meta description and visibility</p>
    </div>
  </div>
  <div class="pe-card-body">
    <div class="row g-3">
      <div class="col-md-6">
        <div class="pe-field">
          <label class="pe-label">Page Title <span style="color:var(--admin-danger)">*</span></label>
          <div class="pe-input-wrap">
            <i class="bi bi-file-earmark-text pe-icon"></i>
            <input name="title" required value="<?= esc($page['title']) ?>">
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="pe-field">
          <label class="pe-label">SEO Title <span style="font-size:.7rem;font-weight:400;text-transform:none;letter-spacing:0">— browser tab &amp; Google</span></label>
          <div class="pe-input-wrap">
            <i class="bi bi-google pe-icon"></i>
            <input name="meta_title" maxlength="255" value="<?= esc($page['meta_title']) ?>">
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="pe-field">
          <label class="pe-label">SEO Description <span style="font-size:.7rem;font-weight:400;text-transform:none;letter-spacing:0">— summary shown below the title in Google</span></label>
          <div class="pe-input-wrap no-icon">
            <textarea name="meta_description" rows="2" maxlength="500"><?= esc($page['meta_description']) ?></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</form>

<!-- ═══ Content Sections ═══ -->
<div class="sections-header">
  <h2><i class="bi bi-layers me-2" style="color:var(--admin-primary)"></i>Content Sections <span style="font-size:.75rem;font-weight:500;color:var(--admin-muted)">(<?= count($sections) ?>)</span></h2>
  <div class="divider"></div>
  <span style="font-size:.75rem;color:var(--admin-muted)">Edit each section, then click <strong>Save section</strong></span>
</div>

<?php if (!$sections): ?>
  <div class="pe-card text-center py-5">
    <i class="bi bi-layers" style="font-size:2.5rem;color:var(--admin-border);display:block;margin-bottom:.75rem"></i>
    <p style="color:var(--admin-muted);margin:0">This page has no sections yet.</p>
  </div>
<?php endif; ?>

<div class="sections-grid">
<?php foreach ($sections as $s): ?>
<form action="/admin/pages/<?= (int) $page['id'] ?>/sections/<?= (int) $s['id'] ?>"
      method="post" class="section-card section-form">
  <?= csrf_field() ?>

  <div class="section-card-head">
    <div>
      <p class="section-card-title"><?= esc($humanType($s['type'])) ?></p>
      <p class="section-card-type"><?= esc($s['type']) ?></p>
    </div>
    <div class="section-tools">
      <div class="order-wrap">
        <span>Order</span>
        <input class="order-input" name="sort_order" type="number" value="<?= (int) $s['sort_order'] ?>" min="0" max="999">
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

  <div class="section-card-body">
    <div class="editor-mount"></div>
    <textarea name="content" style="display:none"><?= esc($s['content_pretty']) ?></textarea>
    <div class="save-row">
      <button type="submit" class="btn-save-section"><i class="bi bi-check-lg"></i> Save Section</button>
      <span style="font-size:.78rem;color:var(--admin-muted)">Last saved: <?= esc($s['updated_at'] ?? $s['created_at'] ?? '—') ?></span>
    </div>
  </div>
</form>
<?php endforeach; ?>
</div><!-- /sections-grid -->

<script>
(function () {
  const UPLOAD_URL = '/admin/upload-image';

  /* Keys that hold an IMAGE url */
  const IMG_KEYS  = ['image','photo','logo','cover','thumbnail','banner','picture','img'];
  /* Keys that hold a general MEDIA url (video, etc.) */
  const VID_KEYS  = ['media','video','src','file'];
  /* Suffixes that disqualify even if the key matches (alt, caption, type…) */
  const SKIP_KEYS = ['alt','caption','title','description','text','label','class','id','name','type','width','height'];

  function keyMatch(k, list) {
    return list.some(function(w){ return k === w || k.slice(-w.length) === w; });
  }
  function isImageKey(key)  { var k=key.toLowerCase(); return  keyMatch(k,IMG_KEYS) && !keyMatch(k,SKIP_KEYS); }
  function isMediaKey(key)  { var k=key.toLowerCase(); return  keyMatch(k,VID_KEYS) && !keyMatch(k,SKIP_KEYS); }

  /* ── helpers ── */
  function humanize(k) {
    var s = String(k)
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ').trim();
    s = s.replace(/\bsrc\b/gi,'').replace(/\bimg\b/gi,'Image').replace(/\s+/g,' ').trim();
    s = s.replace(/\b\w/g, c => c.toUpperCase());
    return s.replace(/\bHref\b/g,'Link').replace(/\bCta\b/g,'Button')
            .replace(/\bUrl\b/g,'URL').replace(/\bSeo\b/g,'SEO') || String(k);
  }

  function blankLike(v) {
    if (Array.isArray(v)) return [];
    if (v && typeof v === 'object') { const o = {}; for (const k in v) o[k] = blankLike(v[k]); return o; }
    if (typeof v === 'number') return 0;
    if (typeof v === 'boolean') return false;
    return '';
  }

  /* ── unified upload zone (image OR video/media) ── */
  var IS_IMG_RE = /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i;
  var IS_VID_RE = /\.(mp4|webm|mov|ogv|avi)(\?|$)/i;

  function buildUploadZone(key, initialUrl, accept, isVideo) {
    var wrap   = document.createElement('div');
    var zone   = document.createElement('div');   zone.className = 'fe-img-zone';
    var fileIn = document.createElement('input'); fileIn.type = 'file'; fileIn.accept = accept;

    /* placeholder */
    var ph = document.createElement('div'); ph.className = 'fe-img-zone-placeholder';
    ph.innerHTML = '<i class="bi ' + (isVideo ? 'bi-film' : 'bi-cloud-arrow-up') + '"></i>'
                 + '<span><strong>Click to upload</strong> or drag &amp; drop</span>';

    /* ── image preview ── */
    var prevWrap = document.createElement('div'); prevWrap.className = 'fe-img-preview-wrap';
    var prevImg  = document.createElement('img'); prevImg.alt = '';
    var chgImg   = document.createElement('button');
    chgImg.type = 'button'; chgImg.className = 'fe-img-change-btn';
    chgImg.innerHTML = '<i class="bi bi-arrow-repeat"></i> Change';
    prevWrap.appendChild(prevImg); prevWrap.appendChild(chgImg);

    /* ── video preview ── */
    var vidWrap = document.createElement('div'); vidWrap.className = 'fe-vid-preview-wrap';
    var vidEl   = document.createElement('video');
    vidEl.controls = true; vidEl.preload = 'metadata'; vidEl.muted = true; vidEl.playsInline = true;
    var chgVid  = document.createElement('button');
    chgVid.type = 'button'; chgVid.className = 'fe-img-change-btn';
    chgVid.innerHTML = '<i class="bi bi-arrow-repeat"></i> Change';
    vidWrap.appendChild(vidEl); vidWrap.appendChild(chgVid);

    var spinner = document.createElement('div'); spinner.className = 'fe-upload-spinner';
    spinner.innerHTML = '<i class="bi bi-hourglass-split me-1"></i>Uploading…';

    zone.appendChild(fileIn); zone.appendChild(ph);
    zone.appendChild(prevWrap); zone.appendChild(vidWrap); zone.appendChild(spinner);
    wrap.appendChild(zone);

    var currentUrl = initialUrl || '';

    function hideAll() {
      ph.style.display = 'none'; prevWrap.style.display = 'none'; vidWrap.style.display = 'none';
    }
    function showPreview(url) {
      hideAll();
      if (!url) { ph.style.display = ''; return; }
      if (IS_VID_RE.test(url)) {
        /* actual video file → show player */
        vidEl.src = url; vidWrap.style.display = 'block';
      } else if (IS_IMG_RE.test(url) || !isVideo) {
        /* image file OR any URL in an image-type zone → show thumbnail */
        prevImg.src = url; prevWrap.style.display = 'block';
      } else {
        /* unknown extension in a video zone (e.g. UUID filename without ext) → try video player */
        vidEl.src = url; vidWrap.style.display = 'block';
      }
    }
    showPreview(currentUrl);

    function triggerPick() { hideAll(); ph.style.display = ''; currentUrl = ''; fileIn.click(); }

    /* placeholder click → open picker */
    ph.addEventListener('click', function() { fileIn.click(); });
    /* clicking image preview (but not Change btn) also opens picker */
    prevWrap.addEventListener('click', function(e) {
      if (!chgImg.contains(e.target)) fileIn.click();
    });
    chgImg.addEventListener('click', function(e) { e.stopPropagation(); triggerPick(); });
    chgVid.addEventListener('click', function(e) { e.stopPropagation(); triggerPick(); });

    fileIn.addEventListener('change', async function() {
      var f = fileIn.files[0]; if (!f) return;
      hideAll(); spinner.style.display = 'block';
      try {
        var fd = new FormData(); fd.append('file', f);
        var res  = await fetch(UPLOAD_URL, { method: 'POST', body: fd });
        var data = await res.json();
        if (data.url) { currentUrl = data.url; showPreview(currentUrl); }
        else { alert('Upload failed: ' + (data.error || 'unknown')); showPreview(currentUrl); }
      } catch(err) { alert('Upload error: ' + err.message); showPreview(currentUrl); }
      finally { spinner.style.display = 'none'; }
    });

    return { el: wrap, getValue: function() { return currentUrl; } };
  }

  /* ── primitive builder ── */
  function buildPrimitive(key, value) {
    if (typeof value === 'string') {
      if (isImageKey(key)) return buildUploadZone(key, value, 'image/*', false);
      if (isMediaKey(key)) return buildUploadZone(key, value, 'image/*,video/*', true);
    }
    let el, getValue;
    if (typeof value === 'boolean') {
      const wrap = document.createElement('label'); wrap.className = 'switch';
      const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = value;
      wrap.appendChild(cb); wrap.appendChild(document.createTextNode(' Yes'));
      el = wrap; el.__input = cb; getValue = () => cb.checked;
    } else if (typeof value === 'number') {
      const ni = document.createElement('input'); ni.type = 'number'; ni.value = value;
      el = ni; getValue = () => ni.value === '' ? 0 : Number(ni.value);
    } else {
      const str  = value == null ? '' : String(value);
      const long = str.length > 80 || str.includes('\n');
      const inp  = document.createElement(long ? 'textarea' : 'input');
      if (!long) inp.type = 'text';
      inp.value = str;
      if (long) inp.rows = Math.min(8, str.split('\n').length + 1);
      el = inp; getValue = () => inp.value;
    }
    return { el, getValue };
  }

  /* Returns true if this key+value should span both columns */
  function isFullWidth(key, value) {
    if (Array.isArray(value)) return true;
    if (value && typeof value === 'object') return true;
    if (typeof value === 'string' && (value.length > 80 || value.includes('\n'))) return true;
    if (typeof value === 'string' && (isImageKey(key) || isMediaKey(key))) return true;
    return false;
  }

  function buildObject(obj) {
    const wrap = document.createElement('div'); wrap.className = 'fe-obj';
    const models = {};
    Object.keys(obj).forEach(k => {
      const full  = isFullWidth(k, obj[k]);
      const field = document.createElement('div');
      field.className = full ? 'fe-field fe-field-full' : 'fe-field';
      const lab = document.createElement('div'); lab.className = 'fe-label'; lab.textContent = humanize(k);
      const m   = build(k, obj[k]);
      field.appendChild(lab); field.appendChild(m.el);
      wrap.appendChild(field);
      models[k] = m;
    });
    return { el: wrap, getValue: () => { const o = {}; Object.keys(models).forEach(k => o[k] = models[k].getValue()); return o; } };
  }

  function buildArray(key, arr) {
    const wrap = document.createElement('div'); wrap.className = 'fe-arr';
    const list = document.createElement('div'); list.className = 'fe-arr-list';
    const children = [];
    const template = arr.length ? arr[0] : '';

    function addItem(val) {
      const row  = document.createElement('div'); row.className = 'fe-arr-item';
      const body = document.createElement('div'); body.className = 'fe-arr-body';
      const m    = build(key, val);
      body.appendChild(m.el);
      const rm = document.createElement('button');
      rm.type = 'button'; rm.className = 'fe-rm'; rm.title = 'Remove';
      rm.innerHTML = '<i class="bi bi-x-lg"></i>';
      rm.onclick = () => { list.removeChild(row); const i = children.findIndex(c => c.row === row); if (i !== -1) children.splice(i, 1); };
      row.appendChild(body); row.appendChild(rm);
      list.appendChild(row);
      children.push({ row, model: m });
    }
    arr.forEach(addItem);

    const add = document.createElement('button');
    add.type = 'button'; add.className = 'fe-add';
    add.innerHTML = '<i class="bi bi-plus-lg me-1"></i> Add item';
    add.onclick = () => addItem(blankLike(template));
    wrap.appendChild(list); wrap.appendChild(add);
    return { el: wrap, getValue: () => children.map(c => c.model.getValue()) };
  }

  function build(key, value) {
    if (Array.isArray(value)) return buildArray(key, value);
    if (value && typeof value === 'object') return buildObject(value);
    return buildPrimitive(key, value);
  }

  /* ── CSRF helper (reads from first form hidden field) ── */
  function getCsrfData() {
    const field = document.querySelector('input[name^="csrf_"]');
    return field ? { name: field.name, value: field.value } : null;
  }

  /* ── wire each section form ── */
  document.querySelectorAll('.section-form').forEach(form => {
    const mount  = form.querySelector('.editor-mount');
    const hidden = form.querySelector('textarea[name="content"]');
    let root;

    let initial;
    try { initial = JSON.parse(hidden.value); } catch(e) { initial = {}; }

    mount.innerHTML = '';
    root = build('_root', initial);
    mount.appendChild(root.el);

    form.addEventListener('submit', () => {
      hidden.value = JSON.stringify(root.getValue());
    });
  });

  /* ── patch fetch to inject CSRF token on image uploads ── */
  const _fetch = window.fetch;
  window.fetch = function(url, opts) {
    if (opts && opts.body instanceof FormData && String(url).includes('upload-image')) {
      const csrf = getCsrfData();
      if (csrf && !opts.body.has(csrf.name)) opts.body.append(csrf.name, csrf.value);
    }
    return _fetch.apply(this, arguments);
  };
})();
</script>

<?= $this->endSection() ?>
