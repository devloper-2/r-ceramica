<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<!-- Page heading -->
<div class="page-heading">
  <div class="page-heading-copy">
    <span class="page-icon"><i class="bi bi-images"></i></span>
    <div>
      <p class="eyebrow mb-1">Assets</p>
      <h1>Media Library</h1>
      <p class="text-muted mb-0" style="font-size:.88rem">
        Upload images, videos, and PDFs. Use the copy-URL button to reference files in content sections.
      </p>
    </div>
  </div>
  <div class="heading-actions">
    <button class="btn btn-primary btn-sm" data-bs-toggle="collapse" data-bs-target="#uploadPanel" aria-expanded="false">
      <i class="bi bi-cloud-upload me-1"></i> Upload Files
    </button>
  </div>
</div>

<!-- Flash messages -->
<?php if (session()->has('success')): ?>
  <div class="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-3" role="alert">
    <i class="bi bi-check-circle-fill"></i>
    <span><?= esc(session('success')) ?></span>
    <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
  </div>
<?php endif; ?>
<?php if (session()->has('error')): ?>
  <div class="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 mb-3" role="alert">
    <i class="bi bi-exclamation-triangle-fill"></i>
    <span><?= esc(session('error')) ?></span>
    <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
  </div>
<?php endif; ?>

<!-- Upload panel (collapsed by default) -->
<div class="collapse mb-3" id="uploadPanel">
  <div class="panel">
    <div class="panel-header">
      <div>
        <h2 class="h6 mb-0 section-title"><i class="bi bi-cloud-upload"></i><span>Upload New File</span></h2>
      </div>
    </div>

    <form action="/admin/media/upload" method="post" enctype="multipart/form-data" id="uploadForm">
      <?= csrf_field() ?>

      <div class="row g-3">
        <!-- Drop zone -->
        <div class="col-12">
          <div id="dropZone" class="upload-drop-zone" onclick="document.getElementById('fileInput').click()">
            <i class="bi bi-cloud-upload fs-1" style="color:var(--admin-primary);opacity:.7"></i>
            <p class="mb-1 fw-semibold" style="color:var(--admin-text)">Drop files here or click to browse</p>
            <p class="text-muted small mb-0">JPG, PNG, WebP, AVIF, GIF, MP4, PDF — max 15 MB</p>
            <input type="file" id="fileInput" name="file" accept=".jpg,.jpeg,.png,.webp,.avif,.gif,.mp4,.pdf" required
                   class="d-none" onchange="previewFile(this)">
          </div>
          <!-- Preview area -->
          <div id="filePreview" class="mt-2 d-none text-center">
            <img id="imgPreview" src="" alt="Preview" style="max-height:160px;border-radius:8px;border:1px solid var(--admin-border)" class="d-none">
            <div id="filePreviewInfo" class="text-muted small mt-1"></div>
          </div>
        </div>

        <!-- Alt text -->
        <div class="col-12 col-md-6">
          <label class="form-label fw-semibold" style="font-size:.85rem">Alt text <span class="text-muted">(accessibility &amp; SEO)</span></label>
          <input type="text" name="alt_text" class="form-control form-control-sm"
                 placeholder="e.g. Hexagonal white ceramic bathroom tile">
        </div>

        <!-- Folder / Category -->
        <div class="col-12 col-md-3">
          <label class="form-label fw-semibold" style="font-size:.85rem">Category / Folder</label>
          <select name="folder" id="folderSelect" class="form-select form-select-sm">
            <?php foreach ($folders as $fk => $fl): ?>
              <option value="<?= esc($fk) ?>" <?= $activeFolder === $fk ? 'selected' : '' ?>>
                <?= esc($fl) ?>
              </option>
            <?php endforeach; ?>
          </select>
        </div>

        <!-- Product association -->
        <div class="col-12 col-md-3">
          <label class="form-label fw-semibold" style="font-size:.85rem">Link to Product <span class="text-muted">(optional)</span></label>
          <select name="product_id" id="productSelect" class="form-select form-select-sm">
            <option value="">— None —</option>
            <?php foreach ($products as $p): ?>
              <option value="<?= (int) $p['id'] ?>"><?= esc($p['name']) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
      </div>

      <div class="mt-3 d-flex gap-2">
        <button type="submit" class="btn btn-primary btn-sm">
          <i class="bi bi-upload me-1"></i> Upload
        </button>
        <button type="button" class="btn btn-light btn-sm" data-bs-toggle="collapse" data-bs-target="#uploadPanel">
          Cancel
        </button>
      </div>
    </form>
  </div><!-- /panel -->
</div><!-- /collapse -->

<!-- Folder filter tabs -->
<div class="panel" style="padding:0">
  <div class="folder-tabs" role="tablist" aria-label="Filter by folder">
    <a href="/admin/media"
       class="folder-tab <?= $activeFolder === '' ? 'active' : '' ?>"
       role="tab">
      <i class="bi bi-grid-3x3-gap me-1"></i>
      All <span class="folder-count"><?= number_format($folderCounts['all']) ?></span>
    </a>
    <?php foreach ($folders as $fk => $fl): ?>
      <a href="/admin/media?folder=<?= esc($fk) ?>"
         class="folder-tab <?= $activeFolder === $fk ? 'active' : '' ?>"
         role="tab">
        <?= esc($fl) ?>
        <?php if (($folderCounts[$fk] ?? 0) > 0): ?>
          <span class="folder-count"><?= number_format($folderCounts[$fk]) ?></span>
        <?php endif; ?>
      </a>
    <?php endforeach; ?>
  </div>
</div>

<!-- Media grid -->
<?php if (empty($media)): ?>
  <div class="panel text-center py-5">
    <i class="bi bi-images fs-1 text-muted opacity-50 d-block mb-2"></i>
    <p class="text-muted mb-3">No files in this category yet.</p>
    <button class="btn btn-primary btn-sm" data-bs-toggle="collapse" data-bs-target="#uploadPanel">
      <i class="bi bi-cloud-upload me-1"></i> Upload your first file
    </button>
  </div>
<?php else: ?>
  <div class="media-grid" id="mediaGrid">
    <?php foreach ($media as $m): ?>
      <?php
        $isImage = str_starts_with((string) $m['mime'], 'image/');
        $isVideo = str_starts_with((string) $m['mime'], 'video/');
        $isPdf   = ($m['mime'] === 'application/pdf');
        $kb      = $m['size_bytes'] ? round($m['size_bytes'] / 1024) : null;
        $dims    = ($m['width'] && $m['height']) ? $m['width'] . ' × ' . $m['height'] : null;
        $folderLabel = $folders[$m['folder'] ?? 'general'] ?? 'General';
      ?>
      <div class="media-card">
        <!-- Thumb area -->
        <div class="media-thumb">
          <?php if ($isImage): ?>
            <img src="<?= esc($m['path']) ?>" alt="<?= esc($m['alt_text'] ?? '') ?>"
                 loading="lazy" onerror="this.parentElement.innerHTML='<span class=\'media-type-badge\'>IMG</span>'">
          <?php elseif ($isVideo): ?>
            <video src="<?= esc($m['path']) ?>" muted preload="metadata" class="media-video-preview"></video>
            <span class="media-type-badge video"><i class="bi bi-play-circle-fill"></i></span>
          <?php elseif ($isPdf): ?>
            <div class="media-thumb-placeholder">
              <i class="bi bi-file-earmark-pdf" style="font-size:2.2rem;color:#e74c3c"></i>
            </div>
          <?php else: ?>
            <div class="media-thumb-placeholder">
              <i class="bi bi-file-earmark" style="font-size:2.2rem;color:var(--admin-muted)"></i>
            </div>
          <?php endif; ?>
        </div>

        <!-- Meta -->
        <div class="media-meta">
          <p class="media-name" title="<?= esc($m['alt_text'] ?: $m['filename']) ?>">
            <?= esc($m['alt_text'] ?: $m['filename']) ?>
          </p>
          <div class="media-info">
            <span class="media-folder-badge"><?= esc($folderLabel) ?></span>
            <?php if ($dims): ?><span class="media-dim"><?= $dims ?></span><?php endif; ?>
            <?php if ($kb): ?><span class="media-size"><?= $kb ?> KB</span><?php endif; ?>
          </div>
          <?php if (!empty($m['product_id'])): ?>
            <div class="media-product-badge">
              <i class="bi bi-box-seam me-1"></i>
              <?php
                $linked = array_filter($products, fn($p) => (int)$p['id'] === (int)$m['product_id']);
                $linked = reset($linked);
                echo esc($linked ? $linked['name'] : '#' . $m['product_id']);
              ?>
            </div>
          <?php endif; ?>
        </div>

        <!-- Actions -->
        <div class="media-actions">
          <button type="button" class="btn-media-action copy-url"
                  data-url="<?= esc($m['path']) ?>"
                  title="Copy URL">
            <i class="bi bi-clipboard"></i>
          </button>
          <a href="<?= esc($m['path']) ?>" target="_blank" rel="noopener"
             class="btn-media-action" title="Open in new tab">
            <i class="bi bi-box-arrow-up-right"></i>
          </a>
          <form action="/admin/media/<?= (int) $m['id'] ?>/delete" method="post"
                class="d-inline" onsubmit="return confirm('Delete this file permanently?')">
            <?= csrf_field() ?>
            <input type="hidden" name="folder" value="<?= esc($m['folder'] ?? '') ?>">
            <button type="submit" class="btn-media-action danger" title="Delete">
              <i class="bi bi-trash3"></i>
            </button>
          </form>
        </div>
      </div><!-- /media-card -->
    <?php endforeach; ?>
  </div><!-- /media-grid -->
<?php endif; ?>

<!-- Toast for copy URL -->
<div id="copyToast" class="copy-toast" role="status" aria-live="polite">
  <i class="bi bi-check-circle-fill me-2"></i> URL copied to clipboard
</div>

<style>
/* ── Upload drop zone ───────────────────────────────────── */
.upload-drop-zone {
  border: 2px dashed var(--admin-border);
  border-radius: 12px;
  padding: 2.5rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: border-color .18s, background .18s;
  background: var(--admin-surface-soft);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
}
.upload-drop-zone.drag-over,
.upload-drop-zone:hover {
  border-color: var(--admin-primary);
  background: rgba(201,162,75,.05);
}

/* ── Folder tabs ────────────────────────────────────────── */
.folder-tabs {
  display: flex;
  gap: 0;
  overflow-x: auto;
  border-bottom: 1px solid var(--admin-border);
  scrollbar-width: none;
}
.folder-tabs::-webkit-scrollbar { display: none; }
.folder-tab {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  padding: .75rem 1.1rem;
  font-size: .82rem;
  font-weight: 500;
  color: var(--admin-muted);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  transition: color .14s, border-color .14s;
}
.folder-tab:hover { color: var(--admin-text); }
.folder-tab.active {
  color: var(--admin-primary);
  border-bottom-color: var(--admin-primary);
  font-weight: 600;
}
.folder-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  font-size: .68rem;
  font-weight: 700;
  background: var(--admin-border);
  color: var(--admin-muted);
  line-height: 1;
}
.folder-tab.active .folder-count {
  background: rgba(201,162,75,.18);
  color: var(--admin-primary);
}

/* ── Media grid ─────────────────────────────────────────── */
.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.media-card {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow .16s, transform .16s;
  display: flex;
  flex-direction: column;
}
.media-card:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,.1);
  transform: translateY(-2px);
}

/* Thumb */
.media-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--admin-surface-soft);
}
.media-thumb img,
.media-thumb .media-video-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.media-thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.media-type-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0,0,0,.55);
  color: #fff;
  font-size: .68rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 20px;
}
.media-type-badge.video {
  background: rgba(0,0,0,.6);
  font-size: 1.15rem;
  padding: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}

/* Meta */
.media-meta {
  padding: .7rem .85rem .5rem;
  flex: 1;
}
.media-name {
  font-size: .8rem;
  font-weight: 600;
  color: var(--admin-text);
  margin: 0 0 .35rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.media-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .3rem;
  font-size: .72rem;
  color: var(--admin-muted);
}
.media-folder-badge {
  background: rgba(201,162,75,.12);
  color: var(--admin-primary);
  border-radius: 20px;
  padding: 1px 8px;
  font-size: .7rem;
  font-weight: 600;
}
.media-dim, .media-size {
  color: var(--admin-muted);
}
.media-product-badge {
  margin-top: .3rem;
  font-size: .72rem;
  color: var(--admin-muted);
  display: flex;
  align-items: center;
}

/* Actions bar */
.media-actions {
  padding: .5rem .85rem .7rem;
  display: flex;
  gap: .4rem;
  align-items: center;
  border-top: 1px solid var(--admin-border);
}
.btn-media-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid var(--admin-border);
  background: var(--admin-surface-soft);
  color: var(--admin-muted);
  font-size: .9rem;
  cursor: pointer;
  transition: background .14s, color .14s, border-color .14s;
  text-decoration: none;
  padding: 0;
}
.btn-media-action:hover {
  background: #eff6ff;
  color: #2563eb;
  border-color: #bfdbfe;
}
.btn-media-action.copy-url:hover {
  background: rgba(201,162,75,.12);
  color: var(--admin-primary);
  border-color: rgba(201,162,75,.4);
}
.btn-media-action.danger {
  margin-left: auto;
}
.btn-media-action.danger:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fca5a5;
}

/* Copy toast */
.copy-toast {
  position: fixed;
  bottom: 1.75rem;
  right: 1.75rem;
  background: #1a2236;
  color: #fff;
  padding: .6rem 1.1rem;
  border-radius: 8px;
  font-size: .83rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 24px rgba(0,0,0,.22);
  opacity: 0;
  transform: translateY(12px);
  transition: opacity .22s, transform .22s;
  pointer-events: none;
  z-index: 9999;
}
.copy-toast.show {
  opacity: 1;
  transform: translateY(0);
}
</style>

<script>
/* ── Drag & drop ──────────────────────────────────────── */
const dz   = document.getElementById('dropZone');
const finp = document.getElementById('fileInput');

['dragenter','dragover'].forEach(e => dz.addEventListener(e, ev => {
  ev.preventDefault(); dz.classList.add('drag-over');
}));
['dragleave','drop'].forEach(e => dz.addEventListener(e, ev => {
  ev.preventDefault(); dz.classList.remove('drag-over');
}));
dz.addEventListener('drop', ev => {
  if (ev.dataTransfer.files.length) {
    finp.files = ev.dataTransfer.files;
    previewFile(finp);
    // auto-open upload panel if it's collapsed
    const panel = document.getElementById('uploadPanel');
    if (panel && !panel.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(panel).show();
    }
  }
});

function previewFile(input) {
  const file = input.files[0];
  if (!file) return;
  const area  = document.getElementById('filePreview');
  const img   = document.getElementById('imgPreview');
  const info  = document.getElementById('filePreviewInfo');
  const kb    = Math.round(file.size / 1024);
  info.textContent = file.name + ' — ' + kb + ' KB';
  area.classList.remove('d-none');
  if (file.type.startsWith('image/')) {
    img.src = URL.createObjectURL(file);
    img.classList.remove('d-none');
  } else {
    img.classList.add('d-none');
  }
}

/* ── Copy URL ─────────────────────────────────────────── */
const toast = document.getElementById('copyToast');
let toastTimer;

document.querySelectorAll('.copy-url').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.dataset.url;
    navigator.clipboard.writeText(url).then(() => {
      clearTimeout(toastTimer);
      toast.classList.add('show');
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
      const icon = btn.querySelector('i');
      icon.className = 'bi bi-clipboard-check';
      setTimeout(() => { icon.className = 'bi bi-clipboard'; }, 2400);
    }).catch(() => {
      // Fallback for non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.focus(); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      toast.classList.add('show');
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
    });
  });
});

/* ── Auto-open upload panel when Upload Files is clicked ── */
document.querySelectorAll('[data-bs-target="#uploadPanel"]').forEach(btn => {
  btn.addEventListener('click', () => {
    // also set folder selector to match current active tab
    const sel = document.getElementById('folderSelect');
    const activeFolder = new URLSearchParams(location.search).get('folder') || '';
    if (sel && activeFolder) sel.value = activeFolder;
  });
});
</script>

<?= $this->endSection() ?>
