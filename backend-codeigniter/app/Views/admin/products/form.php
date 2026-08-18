<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<?php
$isEdit = $product !== null;
$action = $isEdit ? '/admin/products/' . (int) $product['id'] : '/admin/products';
$gallery = $product['images'] ?? [];
?>

<style>
/* ── Product form overrides ── */
.pf-card {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 12px;
  box-shadow: var(--admin-shadow-sm);
  overflow: hidden;
  transition: box-shadow .18s;
}
.pf-card:hover { box-shadow: var(--admin-shadow); }
.pf-card-header {
  display: flex; align-items: center; gap: .65rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--admin-border);
  background: var(--admin-surface-soft);
}
.pf-card-icon {
  width: 34px; height: 34px; border-radius: 8px;
  background: rgba(201,162,75,.1); color: var(--admin-primary);
  display: inline-grid; place-items: center; font-size: .95rem;
  flex-shrink: 0;
}
.pf-card-title { font-weight: 700; font-size: .9rem; margin: 0; }
.pf-card-subtitle { font-size: .76rem; color: var(--admin-muted); margin: .1rem 0 0; }
.pf-card-body { padding: 1.25rem; }

/* Field groups */
.pf-field { display: flex; flex-direction: column; gap: .35rem; }
.pf-label {
  font-size: .78rem; font-weight: 700; color: var(--admin-muted);
  text-transform: uppercase; letter-spacing: .04em;
}
.pf-hint { font-size: .75rem; color: var(--admin-muted); margin-top: .2rem; }
.pf-input-wrap { position: relative; }
.pf-input-wrap .pf-icon {
  position: absolute; left: .75rem; top: 50%; transform: translateY(-50%);
  color: var(--admin-muted); pointer-events: none; font-size: .9rem;
}
.pf-input-wrap input,
.pf-input-wrap select,
.pf-input-wrap textarea { padding-left: 2.1rem !important; }
.pf-input-wrap.no-icon input,
.pf-input-wrap.no-icon select,
.pf-input-wrap.no-icon textarea { padding-left: .8rem !important; }

/* Upload zone */
.upload-zone {
  border: 2px dashed var(--admin-border); border-radius: 10px;
  padding: 1.1rem 1rem; text-align: center; cursor: pointer;
  background: var(--admin-surface-soft);
  transition: border-color .15s, background .15s;
  position: relative;
}
.upload-zone:hover { border-color: var(--admin-primary); background: #fffbf2; }
.upload-zone input[type="file"] {
  position: absolute; inset: 0; opacity: 0; cursor: pointer;
  width: 100%; height: 100%;
}
.upload-zone-icon { font-size: 1.5rem; color: var(--admin-muted); display: block; margin-bottom: .3rem; }
.upload-zone-text { font-size: .8rem; color: var(--admin-muted); line-height: 1.4; }
.upload-zone-text strong { color: var(--admin-primary); }

/* 3D file badge */
.file-badge {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .55rem .9rem; border-radius: 8px;
  border: 1px solid var(--admin-border); background: var(--admin-surface-soft);
  font-size: .82rem; width: 100%; margin-bottom: .6rem;
}
.file-badge .ext-tag {
  background: #374151; color: #fff;
  font-size: .68rem; font-weight: 800; padding: 2px 7px;
  border-radius: 5px; letter-spacing: .05em; flex-shrink: 0;
}
.file-badge .filename { flex: 1; color: var(--admin-text); word-break: break-all; font-size: .8rem; }
.file-badge .dl-link { color: var(--admin-primary); font-size: .78rem; white-space: nowrap; }

/* Sidebar sticky */
.pf-sidebar { position: sticky; top: 88px; }

/* Save button */
.pf-save-btn {
  width: 100%; padding: .7rem 1rem;
  background: var(--admin-primary); color: #3a2600;
  border: none; border-radius: 8px; font-weight: 800; font-size: .9rem;
  display: flex; align-items: center; justify-content: center; gap: .5rem;
  cursor: pointer; transition: filter .15s, box-shadow .15s, transform .06s;
  box-shadow: 0 4px 14px rgba(201,162,75,.35);
}
.pf-save-btn:hover { filter: brightness(.93); box-shadow: 0 6px 20px rgba(201,162,75,.45); }
.pf-save-btn:active { transform: translateY(1px); }

/* Delete zone */
.delete-zone {
  border: 1px solid #fee2e2; border-radius: 10px;
  padding: 1rem 1.1rem; background: #fff5f5;
}
.delete-zone p { font-size: .78rem; color: #b91c1c; margin: 0 0 .65rem; }
.pf-delete-btn {
  width: 100%; padding: .55rem 1rem;
  background: #fff; color: var(--admin-danger);
  border: 1px solid var(--admin-danger); border-radius: 8px;
  font-weight: 700; font-size: .82rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: .4rem;
  transition: background .15s, color .15s;
}
.pf-delete-btn:hover { background: var(--admin-danger); color: #fff; }

/* Divider */
.pf-divider { height: 1px; background: var(--admin-border); margin: 1rem 0; }

/* Char count hint */
.char-hint { font-size: .72rem; color: var(--admin-muted); text-align: right; }

/* Back button */
.pf-back-btn {
  display: inline-flex; align-items: center; gap: .3rem;
  padding: .35rem .75rem .35rem .5rem;
  border: 1.5px solid var(--admin-border);
  border-radius: 8px;
  background: var(--admin-surface);
  color: var(--admin-muted);
  font-size: .8rem; font-weight: 600;
  text-decoration: none;
  transition: border-color .15s, color .15s, background .15s, box-shadow .15s;
  box-shadow: 0 1px 3px rgba(0,0,0,.05);
}
.pf-back-btn i { font-size: 1.1rem; }
.pf-back-btn:hover {
  border-color: var(--admin-primary);
  color: var(--admin-primary);
  background: rgba(201,162,75,.06);
  box-shadow: 0 2px 8px rgba(201,162,75,.15);
  text-decoration: none;
}

/* Header status select */
.pf-status-select {
  height: 38px; padding: .3rem .9rem .3rem .7rem;
  border: 1.5px solid var(--admin-border); border-radius: 9px;
  background: var(--admin-surface); color: var(--admin-text);
  font-size: .82rem; font-weight: 700; cursor: pointer;
  transition: border-color .15s, box-shadow .15s;
  appearance: auto;
}
.pf-status-select:focus {
  outline: none; border-color: var(--admin-primary);
  box-shadow: 0 0 0 3px rgba(201,162,75,.15);
}

/* Header save button */
.pf-header-save {
  display: inline-flex; align-items: center; gap: .45rem;
  background: var(--admin-primary); color: #3a2600;
  border: none; border-radius: 9px;
  padding: .55rem 1.25rem; font-weight: 800; font-size: .88rem;
  box-shadow: 0 4px 14px rgba(201,162,75,.38);
  cursor: pointer; white-space: nowrap;
  transition: filter .15s, box-shadow .15s, transform .06s;
}
.pf-header-save:hover { filter: brightness(.92); box-shadow: 0 6px 20px rgba(201,162,75,.48); }
.pf-header-save:active { transform: translateY(1px); }

/* Gallery thumbnails — overlay style */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}
.gallery-thumb {
  border-radius: 10px;
  border: 2px solid var(--admin-border);
  overflow: hidden;
  background: #f1f3f6;
  position: relative;
  cursor: pointer;
  transition: border-color .18s, box-shadow .18s, transform .18s;
  aspect-ratio: 1 / 1;
}
.gallery-thumb:hover { border-color: #c9a24b55; box-shadow: 0 6px 20px rgba(0,0,0,.1); transform: translateY(-2px); }
.gallery-thumb.is-primary { border-color: var(--admin-primary); box-shadow: 0 0 0 3px rgba(201,162,75,.2); }
.gallery-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Primary ribbon */
.primary-badge {
  position: absolute; top: 8px; left: 8px;
  background: var(--admin-primary); color: #3a2600;
  font-size: .6rem; font-weight: 800; padding: 2px 8px;
  border-radius: 20px; letter-spacing: .06em; text-transform: uppercase;
  display: none; box-shadow: 0 2px 6px rgba(0,0,0,.15);
}
.gallery-thumb.is-primary .primary-badge { display: block; }

/* Overlay controls — appear on hover */
.gallery-thumb-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 50%);
  opacity: 0; transition: opacity .18s;
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 8px; gap: 4px;
}
.gallery-thumb:hover .gallery-thumb-overlay,
.gallery-thumb.is-primary .gallery-thumb-overlay { opacity: 1; }
.gallery-overlay-btns { display: flex; gap: 5px; }
.gallery-overlay-btn {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 4px;
  padding: 5px 4px; border-radius: 6px; font-size: .7rem; font-weight: 700;
  cursor: pointer; border: none; transition: background .14s;
  white-space: nowrap;
}
.gallery-overlay-btn.star { background: rgba(201,162,75,.9); color: #3a2600; }
.gallery-overlay-btn.star:hover { background: var(--admin-primary); }
.gallery-overlay-btn.trash { background: rgba(220,38,38,.85); color: #fff; }
.gallery-overlay-btn.trash:hover { background: var(--admin-danger); }

/* Hidden inputs behind overlay buttons */
.gallery-thumb input[type="radio"],
.gallery-thumb input[type="checkbox"] { display: none; }

/* ── Pending uploads — files chosen but not yet saved ── */
.pending-head {
  display: flex; align-items: center; gap: .4rem;
  font-size: .78rem; font-weight: 700; color: var(--admin-primary);
  text-transform: uppercase; letter-spacing: .04em; margin: 1rem 0 .7rem;
}
.gallery-thumb.is-pending { border-style: dashed; border-color: var(--admin-primary); background: #fffbf2; }
.gallery-thumb.is-oversize { border-color: var(--admin-danger); background: #fef2f2; }
.pending-badge {
  background: var(--admin-primary); color: #3a2600;
  font-size: .6rem; font-weight: 800; padding: 2px 8px;
  border-radius: 20px; letter-spacing: .06em; text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0,0,0,.15); white-space: nowrap;
}
.gallery-thumb .pending-badge { position: absolute; top: 8px; left: 8px; z-index: 2; }
.gallery-thumb.is-oversize .pending-badge { background: var(--admin-danger); color: #fff; }
.pending-drop {
  position: absolute; top: 6px; right: 6px; z-index: 2;
  width: 24px; height: 24px; border-radius: 50%; border: none;
  background: rgba(220,38,38,.85); color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center; font-size: .65rem;
  transition: background .14s;
}
.pending-drop:hover { background: var(--admin-danger); }
.pending-name {
  position: absolute; left: 0; right: 0; bottom: 0; z-index: 2;
  background: rgba(0,0,0,.68); color: #fff;
  font-size: .62rem; padding: 3px 6px; line-height: 1.3;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* Single-file preview (2D drawing) */
.preview-single {
  position: relative; border-radius: 8px; overflow: hidden;
  border: 2px dashed var(--admin-primary); background: #fffbf2; margin-top: .7rem;
}
.preview-single img { width: 100%; max-height: 150px; object-fit: contain; display: block; padding: 6px; }
.preview-foot {
  padding: .45rem .7rem; display: flex; align-items: center; gap: .5rem;
  border-top: 1px solid var(--admin-border); background: #fff;
}
.preview-foot .fname { flex: 1; font-size: .74rem; color: var(--admin-muted); word-break: break-all; }
.preview-oversize { border-color: var(--admin-danger); background: #fef2f2; }
.preview-oversize .pending-badge { background: var(--admin-danger); color: #fff; }

/* Spec rows */
.spec-row {
  display: grid; grid-template-columns: 200px 1fr 36px;
  gap: .5rem; align-items: center; margin-bottom: .5rem;
}
.spec-row input {
  height: 38px; padding: .4rem .75rem; font-size: .85rem;
  border: 1px solid var(--admin-border); border-radius: 8px;
  background: var(--admin-surface-soft); color: var(--admin-text);
  transition: border-color .12s, box-shadow .12s;
}
.spec-row input:focus {
  outline: none; border-color: var(--admin-primary);
  box-shadow: 0 0 0 3px rgba(201,162,75,.15); background: #fff;
}
.spec-row input.key-input { font-weight: 700; color: var(--admin-primary); }
.spec-row-del {
  width: 36px; height: 36px; border-radius: 8px;
  border: 1px solid #fecaca; background: #fff5f5;
  color: var(--admin-danger); cursor: pointer;
  display: inline-grid; place-items: center; font-size: .9rem;
  transition: background .14s, color .14s;
}
.spec-row-del:hover { background: var(--admin-danger); color: #fff; }
.spec-rows-header {
  display: grid; grid-template-columns: 200px 1fr 36px;
  gap: .5rem; margin-bottom: .35rem;
}
.spec-rows-header span {
  font-size: .72rem; font-weight: 800; color: var(--admin-muted);
  text-transform: uppercase; letter-spacing: .04em; padding-left: .1rem;
}
.spec-chip:hover { border-color: var(--admin-primary) !important; background: rgba(201,162,75,.07) !important; }
</style>

<!-- Page heading -->
<div class="mb-3">
  <a href="/admin/products" class="pf-back-btn">
    <i class="bi bi-arrow-left-short"></i> All Products
  </a>
</div>

<form action="<?= $action ?>" method="post" enctype="multipart/form-data">
<?= csrf_field() ?>

<div class="d-flex align-items-center gap-3 mb-4">
  <div class="page-icon"><i class="bi bi-<?= $isEdit ? 'pencil-square' : 'plus-square' ?>"></i></div>
  <div>
    <div class="eyebrow">Products</div>
    <h1 class="mb-0" style="font-size:1.4rem;font-weight:800">
      <?= $isEdit ? esc($product['name']) : 'New Product' ?>
    </h1>
  </div>
  <div class="ms-auto d-flex align-items-center gap-3">
    <select name="status" class="pf-status-select">
      <option value="published" <?= ($product['status'] ?? '') === 'published' ? 'selected' : '' ?>>✦ Published</option>
      <option value="draft"     <?= ($product['status'] ?? 'draft') === 'draft' ? 'selected' : '' ?>>◌ Draft</option>
    </select>
    <button type="submit" class="pf-header-save">
      <i class="bi bi-check-lg"></i>
      <?= $isEdit ? 'Save Product' : 'Create Product' ?>
    </button>
  </div>
</div>

<div class="row g-4">

  <!-- ════════════════ MAIN COLUMN ════════════════ -->
  <div class="col-lg-8">

    <!-- Card: Basic Information -->
    <div class="pf-card mb-4">
      <div class="pf-card-header">
        <div class="pf-card-icon"><i class="bi bi-card-text"></i></div>
        <div>
          <p class="pf-card-title">Basic Information</p>
          <p class="pf-card-subtitle">Product name, slug and descriptions</p>
        </div>
      </div>
      <div class="pf-card-body">
        <div class="row g-3">
          <div class="col-md-8">
            <div class="pf-field">
              <label class="pf-label">Product Name <span style="color:var(--admin-danger)">*</span></label>
              <div class="pf-input-wrap">
                <i class="bi bi-box-seam pf-icon"></i>
                <input name="name"
                       value="<?= esc(old('name', $product['name'] ?? '')) ?>"
                       placeholder="e.g. Aqua Halo Rain Shower" required>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="pf-field">
              <label class="pf-label">Slug <span class="pf-hint" style="text-transform:none;letter-spacing:0">(auto from name)</span></label>
              <div class="pf-input-wrap">
                <i class="bi bi-link-45deg pf-icon"></i>
                <input name="slug"
                       value="<?= esc(old('slug', $product['slug'] ?? '')) ?>"
                       placeholder="auto-generated">
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="pf-field">
              <label class="pf-label">Short Description</label>
              <div class="pf-input-wrap no-icon">
                <input name="short_description"
                       value="<?= esc(old('short_description', $product['short_description'] ?? '')) ?>"
                       placeholder="One-line summary shown in listings and cards">
              </div>
              <p class="pf-hint">Shown on product cards and category pages</p>
            </div>
          </div>
          <div class="col-12">
            <div class="pf-field">
              <label class="pf-label">Full Description</label>
              <div class="pf-input-wrap no-icon">
                <textarea name="description" rows="4" placeholder="Detailed product description…"><?= esc(old('description', $product['description'] ?? '')) ?></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Card: Specifications -->
    <div class="pf-card mb-4">
      <div class="pf-card-header">
        <div class="pf-card-icon"><i class="bi bi-list-columns-reverse"></i></div>
        <div>
          <p class="pf-card-title">Specifications</p>
          <p class="pf-card-subtitle">Technical details shown in the product spec table</p>
        </div>
        <button type="button" id="add-spec-btn"
                style="margin-left:auto;display:inline-flex;align-items:center;gap:.35rem;
                       background:rgba(201,162,75,.1);color:var(--admin-primary);
                       border:1px solid rgba(201,162,75,.3);border-radius:7px;
                       padding:.32rem .75rem;font-size:.78rem;font-weight:700;cursor:pointer;
                       transition:background .14s">
          <i class="bi bi-plus-lg"></i> Add Row
        </button>
      </div>
      <div class="pf-card-body">

        <!-- Hidden field — JS serialises the rows into JSON here before submit -->
        <textarea name="specs" id="specs-json-field" style="display:none"></textarea>

        <!-- Quick-add suggestion chips -->
        <div id="spec-suggestions" style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem">
          <span style="font-size:.73rem;color:var(--admin-muted);font-weight:700;align-self:center;white-space:nowrap">Quick add:</span>
          <?php
          $suggestions = ['Material','Finish','Size','Thickness','Weight','Color','Code','Water Absorption','Surface','Grade','Usage','Brand','Origin'];
          foreach ($suggestions as $s):
          ?>
          <button type="button" class="spec-chip"
                  data-key="<?= esc($s, 'attr') ?>"
                  style="font-size:.72rem;padding:.22rem .6rem;border-radius:20px;
                         border:1px solid var(--admin-border);background:var(--admin-surface-soft);
                         color:var(--admin-text);cursor:pointer;transition:border-color .12s,background .12s;font-weight:600">
            + <?= esc($s) ?>
          </button>
          <?php endforeach; ?>
        </div>

        <!-- Key-value rows -->
        <div id="spec-rows">
          <!-- Rows injected by JS on page load -->
        </div>

        <!-- Empty state -->
        <div id="spec-empty" style="text-align:center;padding:1.5rem;background:var(--admin-surface-soft);border-radius:10px;display:none">
          <i class="bi bi-table" style="font-size:1.6rem;color:var(--admin-border);display:block;margin-bottom:.4rem"></i>
          <p style="font-size:.8rem;color:var(--admin-muted);margin:0">
            No specifications yet. Click <strong>Add Row</strong> or use a quick-add chip above.
          </p>
        </div>

        <p class="pf-hint mt-3"><i class="bi bi-info-circle me-1"></i>Each row becomes one line in the product's Specifications table. Leave empty to hide the table.</p>
      </div>
    </div>

    <!-- Card: Gallery Images -->
    <div class="pf-card mb-4">
      <div class="pf-card-header">
        <div class="pf-card-icon"><i class="bi bi-images"></i></div>
        <div>
          <p class="pf-card-title">Product Gallery</p>
          <p class="pf-card-subtitle">Images shown on the product detail page</p>
        </div>
      </div>
      <div class="pf-card-body">

        <?php if (!empty($gallery)): ?>
        <p style="font-size:.78rem;font-weight:700;color:var(--admin-muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:.7rem">
          Current Images — mark Primary then save
        </p>
        <div class="gallery-grid mb-4">
          <?php foreach ($gallery as $img): ?>
          <?php $isPrimary = !empty($img['is_primary']); $thumbId = (int) $img['id']; ?>
          <div class="gallery-thumb <?= $isPrimary ? 'is-primary' : '' ?>" id="thumb-<?= $thumbId ?>">
            <div class="primary-badge"><i class="bi bi-star-fill me-1"></i>Primary</div>
            <img src="<?= esc($img['path']) ?>" alt="<?= esc($img['alt_text'] ?? '', 'attr') ?>">
            <div class="gallery-thumb-overlay">
              <div class="gallery-overlay-btns">
                <button type="button" class="gallery-overlay-btn star" onclick="setPrimary(<?= $thumbId ?>)">
                  <i class="bi bi-star-fill"></i> Primary
                </button>
                <button type="button" class="gallery-overlay-btn trash" onclick="removeThumb(<?= $thumbId ?>)">
                  <i class="bi bi-trash3"></i> Remove
                </button>
              </div>
            </div>
            <input type="radio" name="primary_image" value="<?= $thumbId ?>" <?= $isPrimary ? 'checked' : '' ?> id="radio-<?= $thumbId ?>">
            <input type="checkbox" name="remove_image[]" value="<?= $thumbId ?>" id="remove-<?= $thumbId ?>">
          </div>
          <?php endforeach; ?>
        </div>
        <?php else: ?>
        <div id="gallery-empty" style="text-align:center;padding:1.5rem;background:var(--admin-surface-soft);border-radius:10px;margin-bottom:1rem">
          <i class="bi bi-image" style="font-size:2rem;color:var(--admin-border);display:block;margin-bottom:.5rem"></i>
          <p style="font-size:.82rem;color:var(--admin-muted);margin:0">No gallery images yet. Upload below to display on the product page.</p>
        </div>
        <?php endif; ?>

        <div class="upload-zone">
          <input type="file" name="gallery[]" accept="image/jpeg,image/png,image/webp,image/gif" multiple>
          <i class="bi bi-cloud-arrow-up upload-zone-icon"></i>
          <div class="upload-zone-text">
            <strong>Click to upload</strong> or drag &amp; drop<br>
            JPG, PNG, WEBP, GIF — up to 15 MB each — multiple allowed
          </div>
        </div>

        <!-- Preview of files picked in this session — populated by JS -->
        <div id="gallery-pending-wrap" class="d-none">
          <p class="pending-head"><i class="bi bi-clock-history"></i> <span id="gallery-pending-count"></span> — uploads when you save</p>
          <div class="gallery-grid" id="gallery-pending"></div>
        </div>

        <p class="pf-hint mt-2">Existing images are kept unless you tick the trash icon above.</p>
      </div>
    </div>

    <!-- Card: Technical Files -->
    <div class="pf-card mb-4">
      <div class="pf-card-header">
        <div class="pf-card-icon"><i class="bi bi-file-earmark-arrow-up"></i></div>
        <div>
          <p class="pf-card-title">Technical Files</p>
          <p class="pf-card-subtitle">2D drawing and 3D model for the product viewer</p>
        </div>
      </div>
      <div class="pf-card-body">
        <div class="row g-4">

          <!-- 2D Technical Drawing -->
          <div class="col-md-6">
            <div class="pf-field">
              <label class="pf-label"><i class="bi bi-rulers me-1"></i>2D Technical Drawing</label>
              <p class="pf-hint mb-2">Top / Side / Back view — JPG, PNG, WEBP (max 15 MB)</p>

              <?php if (!empty($product['image_2d'])): ?>
              <div style="position:relative;border-radius:8px;overflow:hidden;border:1px solid var(--admin-border);background:#fff;margin-bottom:.7rem">
                <img src="<?= esc($product['image_2d']) ?>" alt="2D Drawing"
                     style="width:100%;max-height:150px;object-fit:contain;display:block;padding:6px">
                <div style="padding:.45rem .7rem;background:#fff;display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--admin-border)">
                  <label style="display:flex;align-items:center;gap:.4rem;font-size:.75rem;font-weight:600;color:var(--admin-danger);cursor:pointer;margin:0">
                    <input type="checkbox" name="clear_image_2d" value="1">
                    <i class="bi bi-trash3"></i> Remove
                  </label>
                  <span style="font-size:.72rem;color:var(--admin-muted)">Leave blank to keep</span>
                </div>
              </div>
              <?php endif; ?>

              <div class="upload-zone" style="padding:.85rem">
                <input type="file" name="image_2d" accept="image/jpeg,image/png,image/webp,image/gif">
                <i class="bi bi-file-image upload-zone-icon" style="font-size:1.2rem"></i>
                <div class="upload-zone-text">Click to <?= !empty($product['image_2d']) ? 'replace' : 'upload' ?> 2D drawing</div>
              </div>

              <!-- Preview of the file picked in this session — populated by JS -->
              <div id="preview-2d" class="preview-single d-none"></div>
            </div>
          </div>

          <!-- 3D Model File -->
          <div class="col-md-6">
            <div class="pf-field">
              <label class="pf-label"><i class="bi bi-box me-1"></i>3D Model File</label>
              <p class="pf-hint mb-2">GLB/GLTF = interactive viewer · OBJ, FBX, STL = download (max 15 MB)</p>

              <?php if (!empty($product['image_3d'])):
                $ext3d = strtoupper(pathinfo($product['image_3d'], PATHINFO_EXTENSION));
              ?>
              <div class="file-badge mb-1">
                <span class="ext-tag"><?= esc($ext3d) ?></span>
                <span class="filename"><?= esc(basename($product['image_3d'])) ?></span>
                <a href="<?= esc($product['image_3d']) ?>" target="_blank" download class="dl-link">
                  <i class="bi bi-download"></i>
                </a>
              </div>
              <label style="display:flex;align-items:center;gap:.4rem;font-size:.75rem;font-weight:600;color:var(--admin-danger);cursor:pointer;margin-bottom:.6rem">
                <input type="checkbox" name="clear_image_3d" value="1">
                <i class="bi bi-trash3"></i> Remove 3D file
              </label>
              <?php endif; ?>

              <div class="upload-zone" style="padding:.85rem">
                <input type="file" name="image_3d" accept=".glb,.gltf,.obj,.fbx,.stl">
                <i class="bi bi-box upload-zone-icon" style="font-size:1.2rem"></i>
                <div class="upload-zone-text">Click to <?= !empty($product['image_3d']) ? 'replace' : 'upload' ?> 3D model<br><span style="font-size:.7rem">GLB · GLTF · OBJ · FBX · STL</span></div>
              </div>

              <!-- A model file has no image preview — show name/type/size instead -->
              <div id="preview-3d" class="d-none mt-2"></div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Card: SEO -->
    <div class="pf-card mb-4">
      <div class="pf-card-header">
        <div class="pf-card-icon"><i class="bi bi-search"></i></div>
        <div>
          <p class="pf-card-title">SEO &amp; Meta</p>
          <p class="pf-card-subtitle">Search engine and social preview overrides</p>
        </div>
      </div>
      <div class="pf-card-body">
        <div class="row g-3">
          <div class="col-12">
            <div class="pf-field">
              <label class="pf-label">Meta Title</label>
              <div class="pf-input-wrap no-icon">
                <input name="meta_title" maxlength="70"
                       value="<?= esc(old('meta_title', $product['meta_title'] ?? '')) ?>"
                       placeholder="Defaults to product name if blank">
              </div>
              <p class="pf-hint">Recommended: 50–60 characters</p>
            </div>
          </div>
          <div class="col-12">
            <div class="pf-field">
              <label class="pf-label">Meta Description</label>
              <div class="pf-input-wrap no-icon">
                <textarea name="meta_description" rows="2" maxlength="160"
                          placeholder="Brief description for search engine results…"><?= esc(old('meta_description', $product['meta_description'] ?? '')) ?></textarea>
              </div>
              <p class="pf-hint">Recommended: 120–160 characters</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div><!-- /col-lg-8 -->

  <!-- ════════════════ SIDEBAR ════════════════ -->
  <div class="col-lg-4">
    <div class="pf-sidebar d-flex flex-column gap-4">

      <!-- Pricing -->
      <div class="pf-card">
        <div class="pf-card-header">
          <div class="pf-card-icon"><i class="bi bi-currency-rupee"></i></div>
          <div>
            <p class="pf-card-title">Pricing</p>
            <p class="pf-card-subtitle">MRP shown on product page</p>
          </div>
        </div>
        <div class="pf-card-body d-flex flex-column gap-3">
          <div class="pf-field">
            <label class="pf-label">Price <span style="color:var(--admin-danger)">*</span></label>
            <div class="pf-input-wrap">
              <i class="bi bi-tag pf-icon"></i>
              <input name="price" type="number" step="0.01" min="0"
                     value="<?= esc(old('price', $product['price'] ?? '0')) ?>" required>
            </div>
          </div>
          <div class="pf-field">
            <label class="pf-label">Currency</label>
            <div class="pf-input-wrap">
              <i class="bi bi-globe pf-icon"></i>
              <input name="currency"
                     value="<?= esc(old('currency', $product['currency'] ?? 'INR')) ?>"
                     placeholder="INR">
            </div>
            <p class="pf-hint">INR · USD · EUR</p>
          </div>
        </div>
      </div>

      <!-- Classification -->
      <div class="pf-card">
        <div class="pf-card-header">
          <div class="pf-card-icon"><i class="bi bi-diagram-3"></i></div>
          <div>
            <p class="pf-card-title">Classification</p>
            <p class="pf-card-subtitle">Category &amp; subcategory</p>
          </div>
        </div>
        <div class="pf-card-body">
          <div class="pf-field">
            <label class="pf-label">Subcategory</label>
            <div class="pf-input-wrap">
              <i class="bi bi-folder2 pf-icon"></i>
              <select name="subcategory_id">
                <option value="">— None —</option>
                <?php foreach ($subcategoryGroups as $catName => $subs): ?>
                  <optgroup label="<?= esc($catName, 'attr') ?>">
                    <?php foreach ($subs as $s): ?>
                      <option value="<?= (int) $s['id'] ?>"
                              <?= ($product['subcategory_id'] ?? '') == $s['id'] ? 'selected' : '' ?>>
                        <?= esc($s['name']) ?>
                      </option>
                    <?php endforeach; ?>
                  </optgroup>
                <?php endforeach; ?>
              </select>
            </div>
            <p class="pf-hint">Determines breadcrumb &amp; related products</p>
          </div>
        </div>
      </div>

      <!-- Danger zone -->
      <?php if ($isEdit): ?>
      <div class="delete-zone">
        <p><i class="bi bi-exclamation-triangle-fill me-1"></i>This action cannot be undone. All images and data for this product will be permanently deleted.</p>
        <form action="/admin/products/<?= (int) $product['id'] ?>/delete" method="post"
              onsubmit="return confirm('Delete «<?= esc($product['name']) ?>» permanently? This cannot be undone.')">
          <?= csrf_field() ?>
          <button type="submit" class="pf-delete-btn">
            <i class="bi bi-trash3"></i> Delete Product
          </button>
        </form>
      </div>
      <?php endif; ?>

    </div><!-- /pf-sidebar -->
  </div><!-- /col-lg-4 -->

</div><!-- /row -->
</form>

<script>
/* ── Gallery overlay controls ── */
function setPrimary(id) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('is-primary'));
  const thumb = document.getElementById('thumb-' + id);
  if (thumb) {
    thumb.classList.add('is-primary');
    const radio = document.getElementById('radio-' + id);
    if (radio) radio.checked = true;
  }
}

function removeThumb(id) {
  const thumb = document.getElementById('thumb-' + id);
  if (!thumb) return;
  const cb = document.getElementById('remove-' + id);
  if (cb) cb.checked = true;
  thumb.style.transition = 'opacity .25s, transform .25s';
  thumb.style.opacity = '0';
  thumb.style.transform = 'scale(.85)';
  setTimeout(() => thumb.remove(), 260);
}

/* ── Upload previews — show what was picked before it is saved ──
   The file inputs sit invisibly on top of the drop zones, so without a preview
   there is no feedback at all that a file was selected. */
(function () {
  const MAX_BYTES = 15 * 1024 * 1024; // matches the server-side upload limit

  function fmtSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  /* ── Gallery: many images, each droppable before save ── */
  const galleryInput = document.querySelector('input[name="gallery[]"]');
  const pendingWrap  = document.getElementById('gallery-pending-wrap');
  const pendingGrid  = document.getElementById('gallery-pending');
  const pendingCount = document.getElementById('gallery-pending-count');
  const galleryEmpty = document.getElementById('gallery-empty'); // only on create

  if (galleryInput && pendingGrid) {
    galleryInput.addEventListener('change', renderGallery);

    function renderGallery() {
      const files = Array.from(galleryInput.files || []);
      pendingGrid.innerHTML = '';
      pendingWrap.classList.toggle('d-none', files.length === 0);
      // The "no images yet" placeholder is misleading once files are queued.
      if (galleryEmpty) galleryEmpty.classList.toggle('d-none', files.length > 0);
      if (pendingCount) {
        pendingCount.textContent = files.length + (files.length === 1 ? ' image selected' : ' images selected');
      }

      files.forEach((file, index) => {
        const oversize = file.size > MAX_BYTES;

        const cell = document.createElement('div');
        cell.className = 'gallery-thumb is-pending' + (oversize ? ' is-oversize' : '');

        const img = document.createElement('img');
        img.alt = file.name;
        img.src = URL.createObjectURL(file);
        // Free the blob once the bitmap is decoded — matters for bulk uploads.
        img.addEventListener('load', () => URL.revokeObjectURL(img.src));
        cell.appendChild(img);

        const badge = document.createElement('span');
        badge.className = 'pending-badge';
        badge.textContent = oversize ? 'Too large' : 'New';
        cell.appendChild(badge);

        const drop = document.createElement('button');
        drop.type = 'button';
        drop.className = 'pending-drop';
        drop.title = 'Remove from selection';
        drop.innerHTML = '<i class="bi bi-x-lg"></i>';
        drop.addEventListener('click', () => dropAt(index));
        cell.appendChild(drop);

        const name = document.createElement('span');
        name.className = 'pending-name';
        // textContent, not innerHTML — a filename is untrusted input.
        name.textContent = file.name + ' · ' + fmtSize(file.size);
        cell.appendChild(name);

        pendingGrid.appendChild(cell);
      });
    }

    /* Rebuild the FileList without the dropped entry. A FileList is read-only,
       so it has to be reassigned through a DataTransfer. */
    function dropAt(index) {
      const dt = new DataTransfer();
      Array.from(galleryInput.files).forEach((f, i) => { if (i !== index) dt.items.add(f); });
      galleryInput.files = dt.files;
      renderGallery();
    }
  }

  /* ── 2D drawing: single image ── */
  const input2d = document.querySelector('input[name="image_2d"]');
  const box2d   = document.getElementById('preview-2d');

  if (input2d && box2d) {
    input2d.addEventListener('change', () => {
      const file = input2d.files && input2d.files[0];
      box2d.innerHTML = '';
      box2d.classList.toggle('d-none', !file);
      if (!file) return;

      const oversize = file.size > MAX_BYTES;
      box2d.classList.toggle('preview-oversize', oversize);

      const img = document.createElement('img');
      img.alt = file.name;
      img.src = URL.createObjectURL(file);
      img.addEventListener('load', () => URL.revokeObjectURL(img.src));

      const foot  = document.createElement('div');
      foot.className = 'preview-foot';
      const badge = document.createElement('span');
      badge.className = 'pending-badge';
      badge.textContent = oversize ? 'Too large' : 'New';
      const name  = document.createElement('span');
      name.className = 'fname';
      name.textContent = file.name + ' · ' + fmtSize(file.size);
      foot.append(badge, name);

      box2d.append(img, foot);
    });
  }

  /* ── 3D model: no image to show, so report type/name/size ── */
  const input3d = document.querySelector('input[name="image_3d"]');
  const box3d   = document.getElementById('preview-3d');

  if (input3d && box3d) {
    input3d.addEventListener('change', () => {
      const file = input3d.files && input3d.files[0];
      box3d.innerHTML = '';
      box3d.classList.toggle('d-none', !file);
      if (!file) return;

      const oversize = file.size > MAX_BYTES;

      const badgeRow = document.createElement('div');
      badgeRow.className = 'file-badge';

      const ext = document.createElement('span');
      ext.className = 'ext-tag';
      ext.textContent = (file.name.split('.').pop() || '?').toUpperCase();

      const name = document.createElement('span');
      name.className = 'filename';
      name.textContent = file.name + ' · ' + fmtSize(file.size);

      const state = document.createElement('span');
      state.className = 'pending-badge';
      state.textContent = oversize ? 'Too large' : 'New';
      if (oversize) { state.style.background = 'var(--admin-danger)'; state.style.color = '#fff'; }

      badgeRow.append(ext, name, state);
      box3d.appendChild(badgeRow);
    });
  }
})();

/* ── Specifications key-value builder ── */
(function () {
  // Existing specs passed from PHP (null → empty object)
  const EXISTING = <?php
    $specsData = $product['specs'] ?? null;
    // specs may already be decoded (array) or null
    if (is_array($specsData) && !empty($specsData)) {
      echo json_encode($specsData, JSON_UNESCAPED_UNICODE);
    } else {
      echo '{}';
    }
  ?>;

  const rowsContainer = document.getElementById('spec-rows');
  const emptyState    = document.getElementById('spec-empty');
  const jsonField     = document.getElementById('specs-json-field');
  const addBtn        = document.getElementById('add-spec-btn');

  function renderHeader() {
    let hdr = document.getElementById('spec-rows-hdr');
    if (!hdr) {
      hdr = document.createElement('div');
      hdr.id = 'spec-rows-hdr';
      hdr.className = 'spec-rows-header';
      hdr.innerHTML = '<span>Label (key)</span><span>Value</span><span></span>';
      rowsContainer.parentNode.insertBefore(hdr, rowsContainer);
    }
  }

  function updateEmpty() {
    const hasRows = rowsContainer.querySelectorAll('.spec-row').length > 0;
    emptyState.style.display = hasRows ? 'none' : 'block';
    const hdr = document.getElementById('spec-rows-hdr');
    if (hdr) hdr.style.display = hasRows ? 'grid' : 'none';
  }

  function addRow(key = '', value = '') {
    renderHeader();
    const row = document.createElement('div');
    row.className = 'spec-row';
    row.innerHTML =
      `<input class="key-input" type="text" placeholder="e.g. Material" value="${escHtml(key)}" autocomplete="off">` +
      `<input class="val-input" type="text" placeholder="e.g. Porcelain" value="${escHtml(value)}" autocomplete="off">` +
      `<button type="button" class="spec-row-del" title="Remove row"><i class="bi bi-trash3"></i></button>`;
    row.querySelector('.spec-row-del').addEventListener('click', () => {
      row.remove();
      updateEmpty();
    });
    rowsContainer.appendChild(row);
    updateEmpty();
    // Focus the key field if it's a new blank row
    if (!key) row.querySelector('.key-input').focus();
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Serialise rows → JSON into the hidden field before submit
  document.querySelector('form').addEventListener('submit', () => {
    const rows = rowsContainer.querySelectorAll('.spec-row');
    const obj  = {};
    rows.forEach(row => {
      const k = row.querySelector('.key-input').value.trim();
      const v = row.querySelector('.val-input').value.trim();
      if (k) obj[k] = v;
    });
    jsonField.value = Object.keys(obj).length ? JSON.stringify(obj) : '';
  });

  // Quick-add chips
  document.querySelectorAll('.spec-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      addRow(chip.dataset.key, '');
    });
  });

  // Add row button
  addBtn.addEventListener('click', () => addRow());

  // Seed from existing data
  const entries = Object.entries(EXISTING);
  if (entries.length) {
    entries.forEach(([k, v]) => addRow(k, v));
  } else {
    updateEmpty();
    emptyState.style.display = 'block';
  }
})();
</script>

<?= $this->endSection() ?>
