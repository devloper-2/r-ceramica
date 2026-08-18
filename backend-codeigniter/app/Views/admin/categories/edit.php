<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<style>
/* ── Category edit form ── */
.cef-back-btn {
  display: inline-flex; align-items: center; gap: .3rem;
  padding: .35rem .75rem .35rem .5rem;
  border: 1.5px solid var(--admin-border); border-radius: 8px;
  background: var(--admin-surface); color: var(--admin-muted);
  font-size: .8rem; font-weight: 600; text-decoration: none;
  box-shadow: 0 1px 3px rgba(0,0,0,.05);
  transition: border-color .15s, color .15s, background .15s;
}
.cef-back-btn i { font-size: 1.1rem; }
.cef-back-btn:hover { border-color: var(--admin-primary); color: var(--admin-primary); background: rgba(201,162,75,.06); text-decoration: none; }

.cef-card {
  background: var(--admin-surface); border: 1px solid var(--admin-border);
  border-radius: 12px; box-shadow: var(--admin-shadow-sm); overflow: hidden;
  transition: box-shadow .18s;
}
.cef-card:hover { box-shadow: var(--admin-shadow); }
.cef-card-header {
  display: flex; align-items: center; gap: .65rem;
  padding: 1rem 1.25rem; border-bottom: 1px solid var(--admin-border);
  background: var(--admin-surface-soft);
}
.cef-card-icon {
  width: 34px; height: 34px; border-radius: 8px;
  background: rgba(201,162,75,.1); color: var(--admin-primary);
  display: inline-grid; place-items: center; font-size: .95rem; flex-shrink: 0;
}
.cef-card-title    { font-weight: 700; font-size: .9rem; margin: 0; }
.cef-card-subtitle { font-size: .76rem; color: var(--admin-muted); margin: .1rem 0 0; }
.cef-card-body { padding: 1.25rem; }

.cef-field { display: flex; flex-direction: column; gap: .35rem; }
.cef-label { font-size: .78rem; font-weight: 700; color: var(--admin-muted); text-transform: uppercase; letter-spacing: .04em; }
.cef-hint  { font-size: .75rem; color: var(--admin-muted); margin-top: .2rem; }

.cef-input-wrap { position: relative; }
.cef-input-wrap .cef-icon { position: absolute; left: .75rem; top: 50%; transform: translateY(-50%); color: var(--admin-muted); pointer-events: none; font-size: .9rem; }
.cef-input-wrap input,
.cef-input-wrap select,
.cef-input-wrap textarea { padding-left: 2.1rem !important; }
.cef-input-wrap.no-icon input,
.cef-input-wrap.no-icon select,
.cef-input-wrap.no-icon textarea { padding-left: .8rem !important; }

/* Header save */
.cef-header-save {
  display: inline-flex; align-items: center; gap: .45rem;
  background: var(--admin-primary); color: #3a2600; border: none;
  border-radius: 9px; padding: .55rem 1.25rem;
  font-weight: 800; font-size: .88rem; cursor: pointer; white-space: nowrap;
  box-shadow: 0 4px 14px rgba(201,162,75,.38);
  transition: filter .15s, box-shadow .15s, transform .06s;
}
.cef-header-save:hover { filter: brightness(.92); box-shadow: 0 6px 20px rgba(201,162,75,.48); }
.cef-header-save:active { transform: translateY(1px); }

.cef-status-select {
  height: 38px; padding: .3rem .9rem; border: 1.5px solid var(--admin-border);
  border-radius: 9px; background: var(--admin-surface); color: var(--admin-text);
  font-size: .82rem; font-weight: 700; cursor: pointer;
  transition: border-color .15s, box-shadow .15s;
}
.cef-status-select:focus { outline: none; border-color: var(--admin-primary); box-shadow: 0 0 0 3px rgba(201,162,75,.15); }

.cef-divider { height: 1px; background: var(--admin-border); margin: 1rem 0; }

/* Upload zone */
.cef-upload-zone {
  border: 2px dashed var(--admin-border); border-radius: 10px;
  padding: 1rem; text-align: center; cursor: pointer;
  background: var(--admin-surface-soft); position: relative;
  transition: border-color .15s, background .15s;
}
.cef-upload-zone:hover { border-color: var(--admin-primary); background: #fffbf2; }
.cef-upload-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
.cef-upload-zone-icon { font-size: 1.4rem; color: var(--admin-muted); display: block; margin-bottom: .25rem; }
.cef-upload-zone-text { font-size: .78rem; color: var(--admin-muted); }
.cef-upload-zone-text strong { color: var(--admin-primary); }

.cef-img-preview { width: 100%; border-radius: 8px; object-fit: cover; max-height: 150px; display: block; margin-bottom: .75rem; border: 1px solid var(--admin-border); }

/* Subcategories section */
.cef-sub-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.25rem; border-bottom: 1px solid var(--admin-border);
  background: var(--admin-surface-soft);
}
.cef-sub-add-btn {
  display: inline-flex; align-items: center; gap: .35rem;
  background: rgba(201,162,75,.1); color: #7a5a10;
  border: 1.5px solid rgba(201,162,75,.3); border-radius: 8px;
  padding: .35rem .9rem; font-size: .8rem; font-weight: 700; cursor: pointer;
  transition: background .14s, border-color .14s;
}
.cef-sub-add-btn:hover { background: rgba(201,162,75,.2); border-color: var(--admin-primary); }

/* Sub grid */
.cef-sub-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: .85rem; padding: 1.25rem;
}
.cef-sub-card {
  background: var(--admin-surface-soft); border: 1.5px solid var(--admin-border);
  border-radius: 10px; overflow: hidden;
  transition: border-color .15s, box-shadow .15s, transform .15s;
}
.cef-sub-card:hover { border-color: rgba(201,162,75,.45); box-shadow: 0 4px 14px rgba(0,0,0,.08); transform: translateY(-2px); }
.cef-sub-card-img { width: 100%; height: 110px; object-fit: cover; display: block; }
.cef-sub-card-img-placeholder {
  width: 100%; height: 110px;
  background: var(--admin-surface); display: flex;
  align-items: center; justify-content: center;
  color: var(--admin-border); font-size: 1.6rem;
}
.cef-sub-card-body { padding: .6rem .75rem .5rem; }
.cef-sub-card-name  { font-weight: 700; font-size: .82rem; color: var(--admin-text); margin: 0; }
.cef-sub-card-sub   { font-size: .7rem; color: var(--admin-muted); }
.cef-sub-card-slug  { font-size: .67rem; color: var(--admin-muted); font-family: monospace; }
.cef-sub-card-footer {
  padding: .45rem .75rem;
  border-top: 1px solid var(--admin-border);
  display: flex; align-items: center; justify-content: space-between;
}
.cef-sub-status { font-size: .67rem; font-weight: 700; padding: 2px 7px; border-radius: 20px; }
.cef-sub-status.published { background: #dcfce7; color: #065f46; }
.cef-sub-status.draft     { background: #f3f4f6; color: var(--admin-muted); }
.cef-sub-actions { display: flex; gap: .3rem; }
.cef-sub-btn {
  width: 26px; height: 26px; border-radius: 6px; border: 1px solid var(--admin-border);
  background: var(--admin-surface); color: var(--admin-muted);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: .75rem; cursor: pointer; transition: background .13s, color .13s, border-color .13s;
}
.cef-sub-btn.edit:hover  { background: rgba(201,162,75,.15); color: var(--admin-primary); border-color: var(--admin-primary); }
.cef-sub-btn.trash:hover { background: #fee2e2; color: var(--admin-danger); border-color: var(--admin-danger); }

.cef-sub-empty { text-align: center; padding: 2.5rem 1rem; color: var(--admin-muted); }
.cef-sub-empty i { font-size: 2rem; display: block; margin-bottom: .5rem; color: var(--admin-border); }
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
  <a href="/admin/categories" class="cef-back-btn">
    <i class="bi bi-arrow-left-short"></i> All Categories
  </a>
</div>

<form action="/admin/categories/<?= (int) $category['id'] ?>" method="post" enctype="multipart/form-data">
<?= csrf_field() ?>

<!-- Page heading -->
<div class="d-flex align-items-center gap-3 mb-4">
  <div class="page-icon"><i class="bi bi-tag"></i></div>
  <div>
    <div class="eyebrow">Category</div>
    <h1 class="mb-0" style="font-size:1.4rem;font-weight:800"><?= esc($category['name']) ?></h1>
  </div>
  <div class="ms-auto d-flex align-items-center gap-3">
    <select name="status" class="cef-status-select">
      <option value="published" <?= ($category['status'] ?? '') === 'published' ? 'selected' : '' ?>>✦ Published</option>
      <option value="draft"     <?= ($category['status'] ?? '') !== 'published' ? 'selected' : '' ?>>◌ Draft</option>
    </select>
    <button type="submit" class="cef-header-save">
      <i class="bi bi-check-lg"></i> Save Category
    </button>
  </div>
</div>

<div class="row g-4 mb-4">

  <!-- ═══ MAIN COLUMN ═══ -->
  <div class="col-lg-8">

    <!-- Explore Card content -->
    <div class="cef-card mb-4">
      <div class="cef-card-header">
        <div class="cef-card-icon"><i class="bi bi-window"></i></div>
        <div>
          <p class="cef-card-title">Explore Page Card</p>
          <p class="cef-card-subtitle">All fields here control what is shown on the <strong>/explore</strong> listing page</p>
        </div>
      </div>
      <div class="cef-card-body">
        <div class="row g-3">

          <div class="col-md-6">
            <div class="cef-field">
              <label class="cef-label">Admin Name <span style="color:var(--admin-danger)">*</span></label>
              <div class="cef-input-wrap">
                <i class="bi bi-tag cef-icon"></i>
                <input type="text" name="name" required value="<?= esc($category['name'], 'attr') ?>" placeholder="e.g. Tiles">
              </div>
              <p class="cef-hint">Internal label — not shown on website.</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cef-field">
              <label class="cef-label">Slug</label>
              <div class="cef-input-wrap">
                <i class="bi bi-link-45deg cef-icon"></i>
                <input type="text" name="slug" value="<?= esc($category['slug'], 'attr') ?>">
              </div>
              <p class="cef-hint">URL: /explore/<?= esc($category['slug']) ?></p>
            </div>
          </div>

          <div class="col-12"><div class="cef-divider" style="margin:.25rem 0"></div></div>
          <div class="col-12">
            <p class="cef-hint mb-0" style="font-size:.8rem;color:var(--admin-primary);font-weight:700">
              ↓ These four fields control the text and label on the /explore card
            </p>
          </div>

          <div class="col-md-6">
            <div class="cef-field">
              <label class="cef-label">Card Eyebrow <span style="color:var(--admin-primary)">gold label</span></label>
              <div class="cef-input-wrap no-icon">
                <input type="text" name="hero_eyebrow" value="<?= esc($category['hero_eyebrow'] ?? '', 'attr') ?>" placeholder="Heritage Collection">
              </div>
              <p class="cef-hint">Small gold text above the title (e.g. "Heritage Collection").</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cef-field">
              <label class="cef-label">Card Title <span style="color:var(--admin-primary)">big white text</span></label>
              <div class="cef-input-wrap">
                <i class="bi bi-type cef-icon"></i>
                <input type="text" name="title" value="<?= esc($category['title'] ?? '', 'attr') ?>" placeholder="Architectural">
              </div>
              <p class="cef-hint">Large bold heading (e.g. "Architectural").</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cef-field">
              <label class="cef-label">Card Subtitle <span style="color:var(--admin-primary)">italic line</span></label>
              <div class="cef-input-wrap no-icon">
                <input type="text" name="subtitle" value="<?= esc($category['subtitle'] ?? '', 'attr') ?>" placeholder="Surfaces">
              </div>
              <p class="cef-hint">Italic line below the title (e.g. "Surfaces").</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cef-field">
              <label class="cef-label">Card Description <span style="color:var(--admin-primary)">paragraph</span></label>
              <div class="cef-input-wrap no-icon">
                <textarea name="description" rows="3"><?= esc($category['description'] ?? '') ?></textarea>
              </div>
              <p class="cef-hint">Short paragraph below the title.</p>
            </div>
          </div>

          <div class="col-12"><div class="cef-divider" style="margin:.25rem 0"></div></div>
          <div class="col-12">
            <div class="cef-field">
              <label class="cef-label">Sort Order</label>
              <div class="cef-input-wrap" style="max-width:130px">
                <i class="bi bi-hash cef-icon"></i>
                <input type="number" name="sort_order" min="0" max="9999" value="<?= (int) $category['sort_order'] ?>">
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Hero -->
    <div class="cef-card">
      <div class="cef-card-header">
        <div class="cef-card-icon"><i class="bi bi-easel"></i></div>
        <div>
          <p class="cef-card-title">Category Detail Page Hero</p>
          <p class="cef-card-subtitle">Banner shown at the top of /explore/<?= esc($category['slug']) ?> only — does <strong>not</strong> affect the /explore listing</p>
        </div>
      </div>
      <div class="cef-card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="cef-field">
              <label class="cef-label">Hero Title</label>
              <div class="cef-input-wrap no-icon">
                <input type="text" name="hero_title" value="<?= esc($category['hero_title'] ?? '', 'attr') ?>" placeholder="Architectural Surfaces">
              </div>
              <p class="cef-hint">Main heading on the /explore/<?= esc($category['slug']) ?> page.</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="cef-field">
              <label class="cef-label">Hero Subtitle</label>
              <div class="cef-input-wrap no-icon">
                <textarea name="hero_subtitle" rows="3"><?= esc($category['hero_subtitle'] ?? '') ?></textarea>
              </div>
              <p class="cef-hint">Subtext below the hero title.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div><!-- /col-lg-8 -->

  <!-- ═══ SIDEBAR ═══ -->
  <div class="col-lg-4">
    <div style="position:sticky;top:88px" class="d-flex flex-column gap-4">

      <!-- Card Image -->
      <div class="cef-card">
        <div class="cef-card-header">
          <div class="cef-card-icon"><i class="bi bi-image"></i></div>
          <div>
            <p class="cef-card-title">Card Image <span style="color:var(--admin-primary);font-size:.75rem">★ /explore listing</span></p>
            <p class="cef-card-subtitle">Background image shown on the /explore listing card</p>
          </div>
        </div>
        <div class="cef-card-body">
          <?php if (!empty($category['image'])): ?>
            <img src="<?= esc($category['image'], 'attr') ?>" class="cef-img-preview" alt="" id="preview_image">
          <?php else: ?>
            <img src="" class="cef-img-preview d-none" alt="" id="preview_image">
          <?php endif; ?>
          <div class="cef-upload-zone">
            <input type="file" name="image" accept="image/*" onchange="previewUploadZone(this, 'preview_image')">
            <i class="bi bi-cloud-arrow-up cef-upload-zone-icon"></i>
            <div class="cef-upload-zone-text"><strong>Click to upload</strong> or drag &amp; drop<br>JPG, PNG, WEBP — up to 15 MB</div>
          </div>
          <?php if (!empty($category['image'])): ?><p class="cef-hint mt-2">Leave empty to keep current image.</p><?php endif; ?>
        </div>
      </div>

      <!-- Hero Image -->
      <div class="cef-card">
        <div class="cef-card-header">
          <div class="cef-card-icon"><i class="bi bi-panorama"></i></div>
          <div>
            <p class="cef-card-title">Hero Image</p>
            <p class="cef-card-subtitle">Full-width banner background</p>
          </div>
        </div>
        <div class="cef-card-body">
          <?php if (!empty($category['hero_image'])): ?>
            <img src="<?= esc($category['hero_image'], 'attr') ?>" class="cef-img-preview" alt="" id="preview_hero_image">
          <?php else: ?>
            <img src="" class="cef-img-preview d-none" alt="" id="preview_hero_image">
          <?php endif; ?>
          <div class="cef-upload-zone">
            <input type="file" name="hero_image" accept="image/*" onchange="previewUploadZone(this, 'preview_hero_image')">
            <i class="bi bi-cloud-arrow-up cef-upload-zone-icon"></i>
            <div class="cef-upload-zone-text"><strong>Click to upload</strong> or drag &amp; drop<br>JPG, PNG, WEBP — up to 15 MB</div>
          </div>
          <?php if (!empty($category['hero_image'])): ?><p class="cef-hint mt-2">Leave empty to keep current image.</p><?php endif; ?>
        </div>
      </div>

    </div>
  </div>

</div><!-- /row -->
</form>

<!-- ═══ SUBCATEGORIES ═══ -->
<div class="cef-card mb-4">
  <div class="cef-sub-header">
    <div class="cef-card-header" style="padding:0;border:none;background:none">
      <div class="cef-card-icon"><i class="bi bi-diagram-3"></i></div>
      <div>
        <p class="cef-card-title">Subcategories</p>
        <p class="cef-card-subtitle"><?= count($subcategories) ?> subcategor<?= count($subcategories) !== 1 ? 'ies' : 'y' ?> in this category</p>
      </div>
    </div>
    <button class="cef-sub-add-btn" data-bs-toggle="modal" data-bs-target="#addSubModal">
      <i class="bi bi-plus-lg"></i> Add Subcategory
    </button>
  </div>

  <?php if (empty($subcategories)): ?>
    <div class="cef-sub-empty">
      <i class="bi bi-diagram-3"></i>
      <p style="font-size:.85rem;margin:0">No subcategories yet. Add one above.</p>
    </div>
  <?php else: ?>
    <div class="cef-sub-grid">
      <?php foreach ($subcategories as $sub):
        $sp = ($sub['status'] ?? 'draft') === 'published';
      ?>
      <div class="cef-sub-card">
        <?php if (!empty($sub['image'])): ?>
          <img class="cef-sub-card-img" src="<?= esc($sub['image'], 'attr') ?>" alt="<?= esc($sub['name'], 'attr') ?>">
        <?php else: ?>
          <div class="cef-sub-card-img-placeholder"><i class="bi bi-image"></i></div>
        <?php endif; ?>
        <div class="cef-sub-card-body">
          <p class="cef-sub-card-name"><?= esc($sub['name']) ?></p>
          <?php if (!empty($sub['subtitle'])): ?>
            <p class="cef-sub-card-sub"><?= esc($sub['subtitle']) ?></p>
          <?php endif; ?>
          <p class="cef-sub-card-slug">/<?= esc($sub['slug']) ?></p>
        </div>
        <div class="cef-sub-card-footer">
          <span class="cef-sub-status <?= $sp ? 'published' : 'draft' ?>"><?= $sp ? 'Published' : 'Draft' ?></span>
          <div class="cef-sub-actions">
            <button type="button" class="cef-sub-btn edit sub-edit-btn" title="Edit"
                    data-id="<?= (int) $sub['id'] ?>"
                    data-name="<?= esc($sub['name'], 'attr') ?>"
                    data-slug="<?= esc($sub['slug'], 'attr') ?>"
                    data-subtitle="<?= esc($sub['subtitle'] ?? '', 'attr') ?>"
                    data-description="<?= esc($sub['description'] ?? '', 'attr') ?>"
                    data-sort="<?= (int) $sub['sort_order'] ?>"
                    data-status="<?= esc($sub['status'], 'attr') ?>"
                    data-image="<?= esc($sub['image'] ?? '', 'attr') ?>"
                    data-bs-toggle="modal" data-bs-target="#editSubModal">
              <i class="bi bi-pencil"></i>
            </button>
            <button type="button" class="cef-sub-btn trash sub-del-btn" title="Delete"
                    data-id="<?= (int) $sub['id'] ?>"
                    data-name="<?= esc($sub['name'], 'attr') ?>"
                    data-bs-toggle="modal" data-bs-target="#delSubModal">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</div>

<!-- ── Add Subcategory Modal ── -->
<div class="modal fade" id="addSubModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:520px">
    <div class="modal-content admin-modal">
      <div class="modal-header">
        <h5 class="modal-title"><i class="bi bi-plus-circle me-2" style="color:var(--admin-primary)"></i>Add Subcategory</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form action="/admin/categories/<?= (int) $category['id'] ?>/subcategories" method="post" enctype="multipart/form-data">
        <?= csrf_field() ?>
        <div class="modal-body"><?= view('admin/categories/_sub_fields', ['prefix' => '']) ?></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm"><i class="bi bi-check-lg me-1"></i> Add</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ── Edit Subcategory Modal ── -->
<div class="modal fade" id="editSubModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:520px">
    <div class="modal-content admin-modal">
      <div class="modal-header">
        <h5 class="modal-title"><i class="bi bi-pencil-square me-2" style="color:var(--admin-primary)"></i>Edit Subcategory</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form id="editSubForm" method="post" enctype="multipart/form-data">
        <?= csrf_field() ?>
        <div class="modal-body"><?= view('admin/categories/_sub_fields', ['prefix' => 'edit_']) ?></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm"><i class="bi bi-check-lg me-1"></i> Update</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ── Delete Subcategory Modal ── -->
<div class="modal fade" id="delSubModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:420px">
    <div class="modal-content admin-modal">
      <div class="modal-header border-0 pb-0">
        <h5 class="modal-title text-danger"><i class="bi bi-exclamation-triangle-fill me-2"></i>Delete Subcategory</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form id="delSubForm" method="post">
        <?= csrf_field() ?>
        <div class="modal-body"><p class="text-muted mb-0">Delete <strong id="delSubName">this subcategory</strong>? Products keep their records but lose this association.</p></div>
        <div class="modal-footer border-0 pt-0">
          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-danger btn-sm"><i class="bi bi-trash3 me-1"></i> Delete</button>
        </div>
      </form>
    </div>
  </div>
</div>

<script>
const CAT_ID = <?= (int) $category['id'] ?>;

function setVal(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value;
}

document.querySelectorAll('.sub-edit-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const d = btn.dataset;
    document.getElementById('editSubForm').action = '/admin/categories/' + CAT_ID + '/subcategories/' + d.id;

    setVal('edit_name', d.name || '');
    setVal('edit_slug', d.slug || '');
    setVal('edit_subtitle', d.subtitle || '');
    setVal('edit_description', d.description || '');
    setVal('edit_sort_order', d.sort || 0);
    setVal('edit_status', d.status || 'published');

    const imgPreview   = document.getElementById('edit_image_preview');
    const imgContainer = document.getElementById('edit_image_preview_container');
    const fileInput    = document.getElementById('edit_image');
    if (fileInput) fileInput.value = '';

    if (imgPreview && imgContainer) {
      if (d.image && d.image.trim() !== '') {
        imgPreview.src = d.image;
        imgPreview.dataset.originalSrc = d.image;
        imgContainer.classList.remove('d-none');
      } else {
        imgPreview.src = '';
        imgPreview.dataset.originalSrc = '';
        imgContainer.classList.add('d-none');
      }
    }
  });
});

document.querySelectorAll('.sub-del-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.getElementById('delSubForm').action = '/admin/categories/' + CAT_ID + '/subcategories/' + btn.dataset.id + '/delete';
    document.getElementById('delSubName').textContent = '"' + btn.dataset.name + '"';
  });
});

function previewSubImage(input, previewId) {
  const preview   = document.getElementById(previewId);
  const container = document.getElementById(previewId + '_container');
  if (!preview || !container) return;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      container.classList.remove('d-none');
    };
    reader.readAsDataURL(input.files[0]);
  } else if (preview.dataset.originalSrc) {
    preview.src = preview.dataset.originalSrc;
    container.classList.remove('d-none');
  } else {
    container.classList.add('d-none');
  }
}

function previewUploadZone(input, previewId) {
  const preview = document.getElementById(previewId);
  if (!preview) return;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.classList.remove('d-none');
    };
    reader.readAsDataURL(input.files[0]);
  }
}
</script>

<?= $this->endSection() ?>
