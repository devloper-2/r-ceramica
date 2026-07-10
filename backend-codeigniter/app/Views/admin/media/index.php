<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<h1>Media Library</h1>
<p class="muted">Upload images/videos to use in pages and products. Files are validated and stored with safe random names.</p>

<form action="/admin/media/upload" method="post" enctype="multipart/form-data"
      style="background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:18px;margin:14px 0">
    <?= csrf_field() ?>
    <div class="row">
        <div>
            <label>File (jpg, png, webp, avif, gif, mp4 — max 15 MB)</label>
            <input type="file" name="file" accept=".jpg,.jpeg,.png,.webp,.avif,.gif,.mp4" required>
        </div>
        <div>
            <label>Alt text (for accessibility &amp; SEO)</label>
            <input name="alt_text" placeholder="Describe the image">
        </div>
    </div>
    <div style="margin-top:14px"><button class="btn" type="submit">Upload</button></div>
</form>

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;margin-top:18px">
    <?php foreach ($media as $m): ?>
        <div class="card" style="padding:10px">
            <?php if (str_starts_with((string) $m['mime'], 'image/')): ?>
                <img src="<?= esc($m['path']) ?>" alt="<?= esc($m['alt_text']) ?>" style="width:100%;height:110px;object-fit:cover;border-radius:8px">
            <?php else: ?>
                <div style="height:110px;display:flex;align-items:center;justify-content:center;background:#0f1218;border-radius:8px" class="muted"><?= esc($m['mime']) ?></div>
            <?php endif; ?>
            <div class="muted" style="font-size:11px;margin-top:6px;word-break:break-all"><?= esc($m['alt_text'] ?: $m['filename']) ?></div>
            <form action="/admin/media/<?= (int) $m['id'] ?>/delete" method="post" onsubmit="return confirm('Delete this file?')" style="margin-top:8px">
                <?= csrf_field() ?>
                <button class="btn danger" style="padding:5px 10px;font-size:12px" type="submit">Delete</button>
            </form>
        </div>
    <?php endforeach; ?>
</div>

<?= $this->endSection() ?>
