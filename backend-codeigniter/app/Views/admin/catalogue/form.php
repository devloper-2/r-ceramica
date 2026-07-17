<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<?php
$isEdit  = $item !== null;
$action  = $isEdit ? '/admin/catalogue/' . (int) $item['id'] : '/admin/catalogue';
$tagList = $isEdit && is_array($item['tags']) ? $item['tags'] : [];
?>

<style>
/* ── Catalogue form ── */
.cf-back-btn {
  display: inline-flex; align-items: center; gap: .3rem;
  padding: .35rem .75rem .35rem .5rem;
  border: 1.5px solid var(--admin-border); border-radius: 8px;
  background: var(--admin-surface); color: var(--admin-muted);
  font-size: .8rem; font-weight: 600; text-decoration: none;
  box-shadow: 0 1px 3px rgba(0,0,0,.05);
  transition: border-color .15s, color .15s, background .15s;
}
.cf-back-btn i { font-size: 1.1rem; }
.cf-back-btn:hover { border-color: var(--admin-primary); color: var(--admin-primary); background: rgba(201,162,75,.06); text-decoration: none; }

.cf-card {
  background: var(--admin-surface); border: 1px solid var(--admin-border);
  border-radius: 12px; box-shadow: var(--admin-shadow-sm); overflow: hidden;
  transition: box-shadow .18s;
}
.cf-card:hover { box-shadow: var(--admin-shadow); }
.cf-card-header {
  display: flex; align-items: center; gap: .65rem;
  padding: 1rem 1.25rem; border-bottom: 1px solid var(--admin-border);
  background: var(--admin-surface-soft);
}
.cf-card-icon {
  width: 34px; height: 34px; border-radius: 8px;
  background: rgba(201,162,75,.1); color: var(--admin-primary);
  display: inline-grid; place-items: center; font-size: .95rem; flex-shrink: 0;
}
.cf-card-title { font-weight: 700; font-size: .9rem; margin: 0; }
.cf-card-subtitle { font-size: .76rem; color: var(--admin-muted); margin: .1rem 0 0; }
.cf-card-body { padding: 1.25rem; }

.cf-field { display: flex; flex-direction: column; gap: .35rem; }
.cf-label { font-size: .78rem; font-weight: 700; color: var(--admin-muted); text-transform: uppercase; letter-spacing: .04em; }
.cf-hint  { font-size: .75rem; color: var(--admin-muted); margin-top: .2rem; }

.cf-input-wrap { position: relative; }
.cf-input-wrap .cf-icon { position: absolute; left: .75rem; top: 50%; transform: translateY(-50%); color: var(--admin-muted); pointer-events: none; font-size: .9rem; }
.cf-input-wrap input,
.cf-input-wrap select { padding-left: 2.1rem !important; }
.cf-input-wrap.no-icon input,
.cf-input-wrap.no-icon select { padding-left: .8rem !important; }

/* Header save */
.cf-header-save {
  display: inline-flex; align-items: center; gap: .45rem;
  background: var(--admin-primary); color: #3a2600; border: none;
  border-radius: 9px; padding: .55rem 1.25rem;
  font-weight: 800; font-size: .88rem; cursor: pointer; white-space: nowrap;
  box-shadow: 0 4px 14px rgba(201,162,75,.38);
  transition: filter .15s, box-shadow .15s, transform .06s;
}
.cf-header-save:hover { filter: brightness(.92); box-shadow: 0 6px 20px rgba(201,162,75,.48); }
.cf-header-save:active { transform: translateY(1px); }

/* Status select */
.cf-status-select {
  height: 38px; padding: .3rem .9rem; border: 1.5px solid var(--admin-border);
  border-radius: 9px; background: var(--admin-surface); color: var(--admin-text);
  font-size: .82rem; font-weight: 700; cursor: pointer;
  transition: border-color .15s, box-shadow .15s;
}
.cf-status-select:focus { outline: none; border-color: var(--admin-primary); box-shadow: 0 0 0 3px rgba(201,162,75,.15); }

/* Sidebar sticky */
.cf-sidebar { position: sticky; top: 88px; }

/* Cover image */
.cf-img-preview {
  width: 100%; border-radius: 8px; object-fit: cover;
  max-height: 180px; display: block; margin-bottom: .75rem;
  border: 1px solid var(--admin-border);
}

/* Upload zone */
.cf-upload-zone {
  border: 2px dashed var(--admin-border); border-radius: 10px;
  padding: 1rem; text-align: center; cursor: pointer;
  background: var(--admin-surface-soft); position: relative;
  transition: border-color .15s, background .15s;
}
.cf-upload-zone:hover { border-color: var(--admin-primary); background: #fffbf2; }
.cf-upload-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
.cf-upload-zone-icon { font-size: 1.4rem; color: var(--admin-muted); display: block; margin-bottom: .25rem; }
.cf-upload-zone-text { font-size: .78rem; color: var(--admin-muted); }
.cf-upload-zone-text strong { color: var(--admin-primary); }

/* PDF link */
.cf-pdf-link {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .45rem .9rem; border-radius: 8px; font-size: .82rem; font-weight: 600;
  border: 1px solid var(--admin-border); background: var(--admin-surface-soft);
  color: var(--admin-text); text-decoration: none; margin-bottom: .6rem;
  transition: border-color .14s, background .14s;
}
.cf-pdf-link:hover { border-color: var(--admin-primary); background: rgba(201,162,75,.05); color: var(--admin-text); text-decoration: none; }

/* Tag input */
.tag-input-row {
  display: flex; gap: .5rem;
}
.tag-input-field {
  flex: 1; height: 40px; padding: .35rem .85rem;
  border: 1.5px solid var(--admin-border); border-radius: 9px;
  background: var(--admin-surface); color: var(--admin-text);
  font-size: .85rem;
  transition: border-color .15s, box-shadow .15s;
}
.tag-input-field:focus { outline: none; border-color: var(--admin-primary); box-shadow: 0 0 0 3px rgba(201,162,75,.15); }
.tag-add-btn {
  height: 40px; padding: 0 1rem;
  background: rgba(201,162,75,.12); color: #7a5a10;
  border: 1.5px solid rgba(201,162,75,.3); border-radius: 9px;
  font-size: .82rem; font-weight: 700; cursor: pointer; white-space: nowrap;
  display: inline-flex; align-items: center; gap: .3rem;
  transition: background .14s, border-color .14s;
}
.tag-add-btn:hover { background: rgba(201,162,75,.22); border-color: var(--admin-primary); }

.tag-chips-list {
  display: flex; flex-wrap: wrap; gap: .45rem;
  margin-top: .65rem;
  min-height: 0;
}
.tag-chip {
  display: inline-flex; align-items: center; gap: .35rem;
  background: rgba(201,162,75,.1); color: #7a5a10;
  border: 1px solid rgba(201,162,75,.3);
  padding: .3rem .75rem; border-radius: 20px;
  font-size: .8rem; font-weight: 700;
}
.tag-chip-remove {
  width: 18px; height: 18px; border-radius: 50%;
  border: none; background: rgba(201,162,75,.2);
  color: #7a5a10; cursor: pointer; font-size: .75rem;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background .12s; flex-shrink: 0;
}
.tag-chip-remove:hover { background: var(--admin-danger); color: #fff; }

/* Toggle switches */
.cf-toggle-group { display: flex; flex-wrap: wrap; gap: 1rem; padding-top: .25rem; }
.cf-toggle {
  display: flex; align-items: center; gap: .6rem;
  cursor: pointer; user-select: none;
}
.cf-toggle input[type="checkbox"] { display: none; }
.cf-toggle-track {
  width: 38px; height: 22px; border-radius: 11px;
  background: var(--admin-border);
  position: relative; flex-shrink: 0;
  transition: background .2s;
}
.cf-toggle-track::after {
  content: ''; position: absolute;
  width: 16px; height: 16px; border-radius: 50%;
  background: #fff; top: 3px; left: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  transition: transform .2s;
}
.cf-toggle input:checked ~ .cf-toggle-track { background: var(--admin-primary); }
.cf-toggle input:checked ~ .cf-toggle-track::after { transform: translateX(16px); }
.cf-toggle-label { font-size: .85rem; font-weight: 600; color: var(--admin-text); }

/* Danger zone */
.cf-danger-zone {
  border: 1px solid #fee2e2; border-radius: 10px;
  padding: 1rem 1.1rem; background: #fff5f5;
}
.cf-danger-zone p { font-size: .78rem; color: #b91c1c; margin: 0 0 .65rem; }
.cf-delete-btn {
  width: 100%; padding: .6rem 1rem;
  background: var(--admin-danger); color: #fff;
  border: none; border-radius: 8px;
  font-weight: 700; font-size: .85rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: .4rem;
  transition: filter .15s, box-shadow .15s;
  box-shadow: 0 4px 12px rgba(220,38,38,.3);
}
.cf-delete-btn:hover { filter: brightness(.9); box-shadow: 0 6px 18px rgba(220,38,38,.4); }

.cf-divider { height: 1px; background: var(--admin-border); margin: 1rem 0; }
</style>

<?php if (session()->has('success')): ?>
  <div class="alert alert-success alert-dismissible fade show mb-3"><?= esc(session('success')) ?><button type="button" class="btn-close float-end" data-bs-dismiss="alert"></button></div>
<?php endif; ?>
<?php if (session()->has('error')): ?>
  <div class="alert alert-danger alert-dismissible fade show mb-3"><?= esc(session('error')) ?><button type="button" class="btn-close float-end" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

<!-- Back button -->
<div class="mb-3">
  <a href="/admin/catalogue" class="cf-back-btn">
    <i class="bi bi-arrow-left-short"></i> All Catalogues
  </a>
</div>

<form action="<?= $action ?>" method="post" enctype="multipart/form-data">
<?= csrf_field() ?>

<!-- Page heading -->
<div class="d-flex align-items-center gap-3 mb-4">
  <div class="page-icon"><i class="bi bi-<?= $isEdit ? 'journal-richtext' : 'plus-square' ?>"></i></div>
  <div>
    <div class="eyebrow">Catalogue</div>
    <h1 class="mb-0" style="font-size:1.4rem;font-weight:800">
      <?= $isEdit ? esc($item['title']) : 'New Catalogue' ?>
    </h1>
  </div>
  <div class="ms-auto d-flex align-items-center gap-3">
    <select name="status" class="cf-status-select">
      <option value="published" <?= ($item['status'] ?? 'published') === 'published' ? 'selected' : '' ?>>✦ Published</option>
      <option value="draft"     <?= ($item['status'] ?? '') === 'draft'     ? 'selected' : '' ?>>◌ Draft</option>
    </select>
    <button type="submit" class="cf-header-save">
      <i class="bi bi-check-lg"></i>
      <?= $isEdit ? 'Save Catalogue' : 'Create Catalogue' ?>
    </button>
  </div>
</div>

<div class="row g-4">

  <!-- ═══ MAIN COLUMN ═══ -->
  <div class="col-lg-8">

    <!-- Content -->
    <div class="cf-card mb-4">
      <div class="cf-card-header">
        <div class="cf-card-icon"><i class="bi bi-card-text"></i></div>
        <div>
          <p class="cf-card-title">Content</p>
          <p class="cf-card-subtitle">Title, subtitle and catalogue tags</p>
        </div>
      </div>
      <div class="cf-card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="cf-field">
              <label class="cf-label">Title <span style="color:var(--admin-danger)">*</span></label>
              <div class="cf-input-wrap">
                <i class="bi bi-journal-richtext cf-icon"></i>
                <input name="title" required value="<?= esc(old('title', $item['title'] ?? ''), 'attr') ?>" placeholder="e.g. Master Collection">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cf-field">
              <label class="cf-label">Title Line 2</label>
              <div class="cf-input-wrap no-icon">
                <input name="title_line2" value="<?= esc(old('title_line2', $item['title_line2'] ?? ''), 'attr') ?>" placeholder="Collection 2024">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cf-field">
              <label class="cf-label">Slug</label>
              <div class="cf-input-wrap">
                <i class="bi bi-link-45deg cf-icon"></i>
                <input name="slug" value="<?= esc(old('slug', $item['slug'] ?? ''), 'attr') ?>" placeholder="auto from title">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cf-field">
              <label class="cf-label">Eyebrow</label>
              <div class="cf-input-wrap">
                <i class="bi bi-type cf-icon"></i>
                <input name="eyebrow" value="<?= esc(old('eyebrow', $item['eyebrow'] ?? ''), 'attr') ?>" placeholder="Complete Collection">
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="cf-field">
              <label class="cf-label">Subtitle Line</label>
              <div class="cf-input-wrap no-icon">
                <input name="sub" value="<?= esc(old('sub', $item['sub'] ?? ''), 'attr') ?>" placeholder="Tiles · Bathrooms · Kitchen · Accessories">
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="cf-field">
              <label class="cf-label">Tags</label>
              <div class="tag-input-row">
                <input type="text" class="tag-input-field" id="tag-field" placeholder="e.g. tiles, bathroom, kitchen…" autocomplete="off">
                <button type="button" class="tag-add-btn" id="tag-add-btn">
                  <i class="bi bi-plus-lg"></i> Add
                </button>
              </div>
              <div class="tag-chips-list" id="tag-chips"></div>
              <input type="hidden" name="tags" id="tags-hidden" value="<?= esc(implode(', ', $tagList), 'attr') ?>">
              <p class="cf-hint mt-1">Press <kbd>Enter</kbd> or click Add. Used by filter pills on /catalogue.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Badges & Meta -->
    <div class="cf-card mb-4">
      <div class="cf-card-header">
        <div class="cf-card-icon"><i class="bi bi-sliders"></i></div>
        <div>
          <p class="cf-card-title">Badges &amp; Meta</p>
          <p class="cf-card-subtitle">Spine, badge, availability and display options</p>
        </div>
      </div>
      <div class="cf-card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <div class="cf-field">
              <label class="cf-label">Pages</label>
              <div class="cf-input-wrap">
                <i class="bi bi-file-earmark cf-icon"></i>
                <input name="pages" type="number" min="0" value="<?= esc(old('pages', $item['pages'] ?? ''), 'attr') ?>" placeholder="148">
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="cf-field">
              <label class="cf-label">Size</label>
              <div class="cf-input-wrap">
                <i class="bi bi-hdd cf-icon"></i>
                <input name="size" value="<?= esc(old('size', $item['size'] ?? ''), 'attr') ?>" placeholder="24 MB">
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="cf-field">
              <label class="cf-label">Image Opacity %</label>
              <div class="cf-input-wrap">
                <i class="bi bi-circle-half cf-icon"></i>
                <input name="img_opacity" type="number" min="0" max="100" value="<?= esc(old('img_opacity', $item['img_opacity'] ?? 50), 'attr') ?>">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cf-field">
              <label class="cf-label">Badge Label</label>
              <div class="cf-input-wrap">
                <i class="bi bi-award cf-icon"></i>
                <input name="badge_label" value="<?= esc(old('badge_label', $item['badge_label'] ?? ''), 'attr') ?>" placeholder="New Edition">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cf-field">
              <label class="cf-label">Spine Label</label>
              <div class="cf-input-wrap">
                <i class="bi bi-book cf-icon"></i>
                <input name="spine_label" value="<?= esc(old('spine_label', $item['spine_label'] ?? ''), 'attr') ?>" placeholder="R Ceramica · 2024">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cf-field">
              <label class="cf-label">Availability</label>
              <div class="cf-input-wrap">
                <i class="bi bi-circle-fill cf-icon" style="font-size:.55rem;color:#16a34a"></i>
                <select name="availability">
                  <option value="green"  <?= ($item['availability'] ?? 'green') === 'green'  ? 'selected' : '' ?>>Available (green)</option>
                  <option value="yellow" <?= ($item['availability'] ?? '') === 'yellow' ? 'selected' : '' ?>>Limited (yellow)</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cf-field">
              <label class="cf-label">Availability Label</label>
              <div class="cf-input-wrap no-icon">
                <input name="avail_label" value="<?= esc(old('avail_label', $item['avail_label'] ?? 'Available'), 'attr') ?>">
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="cf-divider"></div>
            <div class="cf-toggle-group">
              <label class="cf-toggle">
                <input type="checkbox" name="badge_gold" value="1" <?= !empty($item['badge_gold']) ? 'checked' : '' ?>>
                <span class="cf-toggle-track"></span>
                <span class="cf-toggle-label">Gold Badge</span>
              </label>
              <label class="cf-toggle">
                <input type="checkbox" name="spine_gold" value="1" <?= !empty($item['spine_gold']) ? 'checked' : '' ?>>
                <span class="cf-toggle-track"></span>
                <span class="cf-toggle-label">Gold Spine</span>
              </label>
              <label class="cf-toggle">
                <input type="checkbox" name="technical" value="1" <?= !empty($item['technical']) ? 'checked' : '' ?>>
                <span class="cf-toggle-track"></span>
                <span class="cf-toggle-label">Technical (grid overlay)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div><!-- /col-lg-8 -->

  <!-- ═══ SIDEBAR ═══ -->
  <div class="col-lg-4">
    <div class="cf-sidebar d-flex flex-column gap-4">

      <!-- Cover Image -->
      <div class="cf-card">
        <div class="cf-card-header">
          <div class="cf-card-icon"><i class="bi bi-image"></i></div>
          <div>
            <p class="cf-card-title">Cover Image</p>
            <p class="cf-card-subtitle">Shown on catalogue cards</p>
          </div>
        </div>
        <div class="cf-card-body">
          <?php if (!empty($item['image'])): ?>
            <img src="<?= esc($item['image'], 'attr') ?>" class="cf-img-preview" alt="">
          <?php endif; ?>
          <div class="cf-upload-zone">
            <input type="file" name="image" accept="image/*">
            <i class="bi bi-cloud-arrow-up cf-upload-zone-icon"></i>
            <div class="cf-upload-zone-text">
              <strong>Click to upload</strong> or drag &amp; drop<br>
              JPG, PNG, WEBP — up to 15 MB
            </div>
          </div>
          <?php if (!empty($item['image'])): ?>
            <p class="cf-hint mt-2">Leave empty to keep current image.</p>
          <?php endif; ?>
        </div>
      </div>

      <!-- PDF -->
      <div class="cf-card">
        <div class="cf-card-header">
          <div class="cf-card-icon"><i class="bi bi-file-earmark-pdf"></i></div>
          <div>
            <p class="cf-card-title">PDF File</p>
            <p class="cf-card-subtitle">Downloadable catalogue PDF</p>
          </div>
        </div>
        <div class="cf-card-body">
          <?php if (!empty($item['pdf_path'])): ?>
            <a href="<?= esc($item['pdf_path'], 'attr') ?>" target="_blank" class="cf-pdf-link mb-2">
              <i class="bi bi-file-earmark-pdf-fill" style="color:var(--admin-danger)"></i>
              View current PDF
              <i class="bi bi-box-arrow-up-right" style="font-size:.7rem;color:var(--admin-muted)"></i>
            </a>
          <?php endif; ?>
          <div class="cf-upload-zone">
            <input type="file" name="pdf" accept="application/pdf">
            <i class="bi bi-file-earmark-arrow-up cf-upload-zone-icon"></i>
            <div class="cf-upload-zone-text">
              <strong>Click to upload</strong> PDF<br>
              <?= !empty($item['pdf_path']) ? 'Replaces current file' : 'No PDF uploaded yet' ?>
            </div>
          </div>
        </div>
      </div>

      <!-- Sort order -->
      <div class="cf-card">
        <div class="cf-card-header">
          <div class="cf-card-icon"><i class="bi bi-sort-numeric-down"></i></div>
          <div>
            <p class="cf-card-title">Display Order</p>
            <p class="cf-card-subtitle">Lower = appears first</p>
          </div>
        </div>
        <div class="cf-card-body">
          <div class="cf-field">
            <label class="cf-label">Sort Order</label>
            <div class="cf-input-wrap">
              <i class="bi bi-hash cf-icon"></i>
              <input name="sort_order" type="number" min="0" value="<?= esc(old('sort_order', $item['sort_order'] ?? 0), 'attr') ?>">
            </div>
          </div>
        </div>
      </div>

      <!-- Danger zone -->
      <?php if ($isEdit): ?>
      <div class="cf-danger-zone">
        <p><i class="bi bi-exclamation-triangle-fill me-1"></i>Permanently deletes this catalogue and all its data.</p>
        <button type="button" class="cf-delete-btn"
                onclick="if(confirm('Delete «<?= esc($item['title']) ?>» permanently?')) document.getElementById('cf-delete-form').submit()">
          <i class="bi bi-trash3"></i> Delete Catalogue
        </button>
      </div>
      <?php endif; ?>

    </div>
  </div>

</div><!-- /row -->
</form>

<?php if ($isEdit): ?>
<form id="cf-delete-form" action="/admin/catalogue/<?= (int) $item['id'] ?>/delete" method="post" style="display:none">
  <?= csrf_field() ?>
</form>
<?php endif; ?>

<script>
/* ── Tag input ── */
(function () {
  const field  = document.getElementById('tag-field');
  const addBtn = document.getElementById('tag-add-btn');
  const chips  = document.getElementById('tag-chips');
  const hidden = document.getElementById('tags-hidden');

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function getTags() {
    return Array.from(chips.querySelectorAll('.tag-chip'))
      .map(c => c.querySelector('.tag-chip-text').textContent.trim())
      .filter(Boolean);
  }

  function syncHidden() { hidden.value = getTags().join(', '); }

  function addTag(raw) {
    raw.split(',').forEach(t => {
      t = t.trim();
      if (!t) return;
      if (getTags().map(x => x.toLowerCase()).includes(t.toLowerCase())) return;
      const chip = document.createElement('span');
      chip.className = 'tag-chip';
      chip.innerHTML = `<span class="tag-chip-text">${escHtml(t)}</span><button type="button" class="tag-chip-remove" onclick="removeTag(this)">×</button>`;
      chips.appendChild(chip);
    });
    syncHidden();
  }

  // Seed existing tags from PHP
  <?php foreach ($tagList as $t): ?>
  addTag(<?= json_encode(trim($t)) ?>);
  <?php endforeach; ?>

  addBtn.addEventListener('click', () => {
    const v = field.value.trim();
    if (v) { addTag(v); field.value = ''; field.focus(); }
  });

  field.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const v = field.value.trim().replace(/,$/, '');
      if (v) { addTag(v); field.value = ''; }
    }
  });
})();

function removeTag(btn) {
  btn.closest('.tag-chip').remove();
  document.getElementById('tags-hidden').value =
    Array.from(document.querySelectorAll('#tag-chips .tag-chip-text'))
      .map(s => s.textContent.trim()).join(', ');
}
</script>

<?= $this->endSection() ?>
