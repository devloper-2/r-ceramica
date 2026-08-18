<?php
/** Shared subcategory form fields. $prefix keeps add/edit field ids unique. */
$prefix = $prefix ?? '';
?>
<div class="row g-2">
  <div class="col-7 mb-2">
    <label class="admin-label" for="<?= $prefix ?>name">Name <span class="text-danger">*</span></label>
    <input type="text" id="<?= $prefix ?>name" name="name" class="form-control admin-input" required placeholder="Floor Tiles">
  </div>
  <div class="col-5 mb-2">
    <label class="admin-label" for="<?= $prefix ?>slug">Slug</label>
    <input type="text" id="<?= $prefix ?>slug" name="slug" class="form-control admin-input" placeholder="floor-tiles">
  </div>
</div>
<div class="mb-2">
  <label class="admin-label" for="<?= $prefix ?>subtitle">Subtitle</label>
  <input type="text" id="<?= $prefix ?>subtitle" name="subtitle" class="form-control admin-input">
</div>
<div class="mb-2">
  <label class="admin-label" for="<?= $prefix ?>description">Description</label>
  <textarea id="<?= $prefix ?>description" name="description" rows="2" class="form-control admin-input"></textarea>
</div>
<div class="row g-2 align-items-end">
  <div class="col-4 mb-2">
    <label class="admin-label" for="<?= $prefix ?>sort_order">Sort</label>
    <input type="number" id="<?= $prefix ?>sort_order" name="sort_order" min="0" max="9999" value="0" class="form-control admin-input">
  </div>
  <div class="col-8 mb-2">
    <label class="admin-label" for="<?= $prefix ?>status">Status</label>
    <select id="<?= $prefix ?>status" name="status" class="form-select admin-input">
      <option value="published">Published</option>
      <option value="draft">Draft</option>
    </select>
  </div>
</div>
<div class="mb-1">
  <label class="admin-label" for="<?= $prefix ?>image">Image</label>
  <div class="mb-2 d-none" id="<?= $prefix ?>image_preview_container">
    <img id="<?= $prefix ?>image_preview" src="" alt="Preview" style="max-height: 120px; border-radius: 4px; object-fit: cover; border: 1px solid var(--admin-border); width: 100%;">
  </div>
  <input type="file" id="<?= $prefix ?>image" name="image" accept="image/*" class="form-control admin-input" onchange="previewSubImage(this, '<?= $prefix ?>image_preview')">
  <div class="form-text">Optional. On edit, leave empty to keep the current image.</div>
</div>
