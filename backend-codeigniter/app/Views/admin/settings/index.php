<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<h1>Settings</h1>
<p class="muted">Global site data — logo, contact, socials, footer links, languages. Each group is JSON.</p>

<?php foreach ($settings as $s): ?>
    <form action="/admin/settings" method="post"
          style="background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:18px;margin:14px 0">
        <?= csrf_field() ?>
        <input type="hidden" name="key" value="<?= esc($s['key']) ?>">
        <strong style="text-transform:capitalize"><?= esc($s['key']) ?></strong>
        <label>Value (JSON)</label>
        <textarea name="value" spellcheck="false" style="min-height:170px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px"><?= esc($s['value_pretty']) ?></textarea>
        <div style="margin-top:14px"><button class="btn" type="submit">Save <?= esc($s['key']) ?></button></div>
    </form>
<?php endforeach; ?>

<?= $this->endSection() ?>
