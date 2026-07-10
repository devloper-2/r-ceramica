<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<h1>Navigation</h1>
<p class="muted">The primary site menu. Edit labels/URLs, reorder, toggle active, or clear a row's label to delete it. The last (empty) row adds a new link.</p>

<form action="/admin/navigation" method="post">
    <?= csrf_field() ?>
    <table style="margin-top:12px">
        <thead>
            <tr><th style="width:60px">Order</th><th>Label</th><th>URL</th><th style="width:80px">Active</th></tr>
        </thead>
        <tbody>
        <?php $i = 0; foreach ($links as $link): ?>
            <tr>
                <td>
                    <input type="hidden" name="id[<?= $i ?>]" value="<?= (int) $link['id'] ?>">
                    <input name="sort_order[<?= $i ?>]" type="number" value="<?= (int) $link['sort_order'] ?>">
                </td>
                <td><input name="label[<?= $i ?>]" value="<?= esc($link['label']) ?>"></td>
                <td><input name="url[<?= $i ?>]" value="<?= esc($link['url']) ?>"></td>
                <td style="text-align:center"><input type="checkbox" name="is_active[<?= $i ?>]" value="1" style="width:auto" <?= $link['is_active'] ? 'checked' : '' ?>></td>
            </tr>
            <?php $i++; endforeach; ?>
            <!-- new blank row -->
            <tr>
                <td>
                    <input type="hidden" name="id[<?= $i ?>]" value="0">
                    <input name="sort_order[<?= $i ?>]" type="number" value="<?= $i ?>">
                </td>
                <td><input name="label[<?= $i ?>]" placeholder="New link label"></td>
                <td><input name="url[<?= $i ?>]" placeholder="/new-page"></td>
                <td style="text-align:center"><input type="checkbox" name="is_active[<?= $i ?>]" value="1" style="width:auto" checked></td>
            </tr>
        </tbody>
    </table>
    <div style="margin-top:16px"><button class="btn" type="submit">Save navigation</button></div>
</form>

<?= $this->endSection() ?>
