<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<?php
// Per-setting metadata: icon, description, field hints
$meta = [
    'site'      => ['icon' => 'bi-globe2',             'label' => 'Site Identity',    'desc' => 'Site name, tagline, URL, SEO description and keywords.'],
    'contact'   => ['icon' => 'bi-telephone',           'label' => 'Contact Details',  'desc' => 'Phone, WhatsApp and email address shown across the site.'],
    'address'   => ['icon' => 'bi-geo-alt',             'label' => 'Business Address', 'desc' => 'Physical address used in footer and structured data.'],
    'socials'   => ['icon' => 'bi-share',               'label' => 'Social Media',     'desc' => 'Instagram, Facebook and other social profile links.'],
    'branding'  => ['icon' => 'bi-palette',             'label' => 'Branding',         'desc' => 'Logo image path and Open Graph / social share image.'],
    'footer'    => ['icon' => 'bi-layout-text-window',  'label' => 'Footer Links',     'desc' => 'Quick links and corporate links shown in the site footer.'],
    'languages' => ['icon' => 'bi-translate',           'label' => 'Languages',        'desc' => 'Language switcher options displayed in the navbar.'],
];

// Two-section grouping
$groups = [
    'header' => [
        'icon'   => 'bi-layout-text-window-reverse',
        'label'  => 'Header Settings',
        'eyebrow'=> 'Navigation & Brand',
        'desc'   => 'Controls site identity, logo, branding, and navigation language options.',
        'keys'   => ['site', 'branding', 'languages'],
    ],
    'footer' => [
        'icon'   => 'bi-layout-text-window',
        'label'  => 'Footer Settings',
        'eyebrow'=> 'Footer & Contact',
        'desc'   => 'Controls contact information, business address, social links, and footer navigation.',
        'keys'   => ['contact', 'address', 'socials', 'footer'],
    ],
];

// Index settings by key for quick lookup
$settingsByKey = [];
foreach ($settings as $s) {
    $settingsByKey[$s['key']] = $s;
}
?>

<style>
    /* ── Settings page ── */
    .setting-card {
        background: var(--admin-surface);
        border: 1px solid var(--admin-border);
        border-radius: 12px;
        box-shadow: var(--admin-shadow-sm);
        margin-bottom: 0;
        overflow: hidden;
        transition: box-shadow .18s;
        height: 100%;
    }
    .setting-card:hover { box-shadow: var(--admin-shadow); }

    .setting-header {
        display: flex; align-items: center; justify-content: space-between;
        gap: 12px; padding: 18px 22px 14px; flex-wrap: wrap;
    }
    .setting-header-left { display: flex; align-items: center; gap: 14px; }
    .setting-icon {
        width: 42px; height: 42px; border-radius: 10px;
        background: rgba(201,162,75,.1); color: var(--admin-primary);
        display: grid; place-items: center; font-size: 1.05rem; flex: 0 0 42px;
    }
    .setting-title { font-size: 1rem; font-weight: 700; margin: 0; }
    .setting-desc  { font-size: .8rem; color: var(--admin-muted); margin: 2px 0 0; }
    .setting-body  { padding: 0 22px 20px; }

    /* ── Section banners ── */
    .settings-section { margin-bottom: 2.5rem; }
    .ssh {
        display: flex; align-items: center; gap: 1rem;
        padding: 1.1rem 1.4rem;
        background: linear-gradient(120deg, rgba(201,162,75,.07) 0%, transparent 80%);
        border: 1px solid rgba(201,162,75,.22);
        border-left: 4px solid var(--admin-primary);
        border-radius: 12px;
        margin-bottom: 1.25rem;
    }
    .ssh-icon {
        width: 46px; height: 46px; flex-shrink: 0;
        background: rgba(201,162,75,.13); border-radius: 11px;
        display: grid; place-items: center;
        color: var(--admin-primary); font-size: 1.25rem;
    }
    .ssh-eyebrow {
        font-size: .68rem; font-weight: 800; text-transform: uppercase;
        letter-spacing: .08em; color: var(--admin-primary); margin: 0 0 .15rem;
    }
    .ssh-title { font-size: 1.05rem; font-weight: 800; margin: 0; color: var(--admin-text); line-height: 1.2; }
    .ssh-desc  { font-size: .8rem; color: var(--admin-muted); margin: .2rem 0 0; }

    /* Tabs */
    .stabs { display: flex; gap: 6px; margin-bottom: 18px; }
    .stab  {
        padding: 5px 14px; border: 1px solid var(--admin-border);
        border-radius: 8px; cursor: pointer; font-size: .8rem;
        color: var(--admin-muted); font-weight: 600; background: #fff;
        transition: background .12s, color .12s, border-color .12s;
    }
    .stab.active {
        background: rgba(201,162,75,.1); color: var(--admin-primary);
        border-color: rgba(201,162,75,.4); font-weight: 700;
    }

    /* Easy-editor field primitives */
    .fe-field  { margin-bottom: 14px; }
    .fe-label  { font-size: .78rem; font-weight: 700; color: var(--admin-text); margin-bottom: 5px; }
    .fe-label .fe-key { color: var(--admin-muted); font-weight: 500; font-size: .72rem; margin-left: 4px; }
    .fe-obj    { display: block; }

    /* Array items */
    .fe-arr-list { display: flex; flex-direction: column; gap: 10px; }
    .fe-arr-item {
        display: flex; gap: 10px; align-items: flex-start;
        background: var(--admin-surface-soft); border: 1px solid var(--admin-border);
        border-radius: 10px; padding: 14px;
    }
    .fe-arr-body { flex: 1; min-width: 0; }
    .fe-arr-body .fe-field:last-child { margin-bottom: 0; }
    .fe-rm {
        flex: 0 0 auto; background: #fff; border: 1px solid var(--admin-border);
        color: var(--admin-danger); border-radius: 8px;
        width: 30px; height: 30px; cursor: pointer; font-size: .8rem; line-height: 1;
        display: grid; place-items: center;
    }
    .fe-rm:hover { background: #fff5f5; }
    .fe-add {
        margin-top: 10px; background: #fff;
        border: 1.5px dashed rgba(201,162,75,.5); color: var(--admin-primary);
        padding: 7px 15px; border-radius: 9px; cursor: pointer;
        font-weight: 700; font-size: .82rem;
    }
    .fe-add:hover { background: rgba(201,162,75,.07); }

    /* Media/image preview */
    .fe-media { margin-top: 5px; }
    .fe-thumb { max-height: 64px; border-radius: 7px; border: 1px solid var(--admin-border); display: none; }
    .fe-hint  { font-size: .72rem; color: var(--admin-muted); margin-top: 3px; }

    /* Array of strings (keywords) */
    .fe-str-arr { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
    .fe-chip {
        display: flex; align-items: center; gap: 5px;
        background: rgba(201,162,75,.1); border: 1px solid rgba(201,162,75,.3);
        border-radius: 20px; padding: 3px 10px; font-size: .78rem; color: var(--admin-text);
    }
    .fe-chip-rm {
        border: none; background: none; color: var(--admin-muted);
        cursor: pointer; font-size: .75rem; padding: 0; line-height: 1;
    }
    .fe-chip-rm:hover { color: var(--admin-danger); }
    .fe-chip-add-row { display: flex; gap: 6px; margin-top: 4px; }
    .fe-chip-input { flex: 1; padding: 5px 10px !important; font-size: .82rem !important; }
    .fe-chip-btn {
        padding: 5px 12px; background: rgba(201,162,75,.12); border: 1px solid rgba(201,162,75,.35);
        border-radius: 8px; cursor: pointer; font-size: .8rem; font-weight: 700; color: var(--admin-primary);
    }
    .fe-chip-btn:hover { background: rgba(201,162,75,.22); }

    /* Raw JSON textarea */
    .raw-json {
        display: none; font-family: ui-monospace, Menlo, Consolas, monospace;
        font-size: 12.5px; min-height: 200px; background: #f8fafc;
        border: 1px solid var(--admin-border); border-radius: 8px;
        padding: 12px; width: 100%; resize: vertical;
        color: var(--admin-text);
    }

    .save-row { margin-top: 18px; display: flex; align-items: center; gap: 12px; }
    .save-label { font-size: .78rem; color: var(--admin-muted); }
</style>

<!-- Page heading -->
<div class="page-heading mb-4">
    <div class="page-heading-copy">
        <span class="page-icon"><i class="bi bi-gear-fill"></i></span>
        <div>
            <p class="eyebrow mb-1">System</p>
            <h1>Settings</h1>
            <p class="text-muted mb-0" style="font-size:.85rem">Global site data — edit each section below and click Save.</p>
        </div>
    </div>
</div>

<?php foreach ($groups as $groupId => $group): ?>
<div class="settings-section">

    <!-- Section banner -->
    <div class="ssh">
        <div class="ssh-icon"><i class="bi <?= esc($group['icon']) ?>"></i></div>
        <div>
            <p class="ssh-eyebrow"><?= esc($group['eyebrow']) ?></p>
            <h2 class="ssh-title"><?= esc($group['label']) ?></h2>
            <p class="ssh-desc"><?= esc($group['desc']) ?></p>
        </div>
    </div>

    <!-- Cards grid -->
    <div class="row g-3">
        <?php foreach ($group['keys'] as $k):
            if (!isset($settingsByKey[$k])) continue;
            $s    = $settingsByKey[$k];
            $info = $meta[$k] ?? ['icon' => 'bi-sliders', 'label' => ucfirst($k), 'desc' => ''];
        ?>
        <div class="col-md-6">
            <div class="setting-card">

                <!-- Header -->
                <div class="setting-header">
                    <div class="setting-header-left">
                        <span class="setting-icon"><i class="bi <?= esc($info['icon']) ?>"></i></span>
                        <div>
                            <div class="setting-title"><?= esc($info['label']) ?></div>
                            <?php if ($info['desc']): ?>
                                <div class="setting-desc"><?= esc($info['desc']) ?></div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>

                <!-- Body -->
                <div class="setting-body">
                    <form action="/admin/settings" method="post" class="setting-form">
                        <?= csrf_field() ?>
                        <input type="hidden" name="key" value="<?= esc($k) ?>">

                        <!-- Tabs -->
                        <div class="stabs">
                            <span class="stab active" data-mode="simple">
                                <i class="bi bi-ui-checks me-1"></i>Easy editor
                            </span>
                            <span class="stab" data-mode="advanced">
                                <i class="bi bi-code-slash me-1"></i>Advanced (code)
                            </span>
                        </div>

                        <!-- Easy editor mount -->
                        <div class="editor-mount"></div>

                        <!-- Raw JSON (advanced mode) -->
                        <textarea class="raw-json" spellcheck="false"></textarea>

                        <!-- Hidden: actual POST value -->
                        <textarea name="value" style="display:none"><?= esc($s['value_pretty']) ?></textarea>

                        <div class="save-row">
                            <button class="btn btn-primary" type="submit">
                                <i class="bi bi-check-lg me-1"></i>Save <?= esc($info['label']) ?>
                            </button>
                            <span class="save-label">Changes go live after you click <strong>Publish Site</strong></span>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        <?php endforeach; ?>
    </div>

</div>
<?php endforeach; ?>

<script>
(function () {
    // ── Humanize a camelCase / snake_case key ──
    function humanize(k) {
        var s = String(k)
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
            .replace(/([a-zA-Z])(\d)/g, '$1 $2')
            .replace(/[_\-]+/g, ' ')
            .trim();
        s = s.replace(/\bsrc\b/gi, '').replace(/\bimg\b/gi, 'Image').replace(/\s+/g, ' ').trim();
        s = s.replace(/\b\w/g, function(c){ return c.toUpperCase(); });
        return s
            .replace(/\bHref\b/g, 'Link URL').replace(/\bCta\b/g, 'Button')
            .replace(/\bUrl\b/g, 'URL').replace(/\bId\b/g, 'ID').replace(/\bSeo\b/g, 'SEO')
            .replace(/\bOg\b/g, 'Social Share').replace(/\bOgImage\b/g, 'Social Share Image')
            || String(k);
    }

    var MEDIA_RE  = /image|media|video|photo|logo|icon|thumbnail|cover|src|href|link|url/i;
    var IMG_EXT   = /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i;
    var URL_START = /^https?:\/\//i;

    function attachMediaPreview(key, el) {
        if (!/image|media|photo|logo|icon|thumbnail|cover|src/i.test(key)) return;
        var box  = document.createElement('div'); box.className = 'fe-media';
        var img  = document.createElement('img'); img.className = 'fe-thumb';
        var hint = document.createElement('div'); hint.className = 'fe-hint';
        hint.textContent = 'Image path — e.g. /images/logo.webp';
        function upd() {
            var v = (el.value || '').trim();
            if (IMG_EXT.test(v) || URL_START.test(v)) { img.src = v; img.style.display = 'block'; }
            else img.style.display = 'none';
        }
        el.addEventListener('input', upd);
        box.appendChild(img); box.appendChild(hint);
        el.after(box); upd();
    }

    // ── Blank template for adding new array items ──
    function blankLike(v) {
        if (Array.isArray(v)) return [];
        if (v && typeof v === 'object') { var o={}; for(var k in v) o[k]=blankLike(v[k]); return o; }
        if (typeof v === 'number') return 0;
        if (typeof v === 'boolean') return false;
        return '';
    }

    // ── Build a single primitive field ──
    function buildPrimitive(key, value) {
        var el, getValue;
        if (typeof value === 'boolean') {
            var wrap = document.createElement('label'); wrap.className = 'switch d-flex align-items-center gap-2';
            var cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = value;
            wrap.appendChild(cb); wrap.appendChild(document.createTextNode(' Yes'));
            el = wrap; el.__input = cb; getValue = function(){ return cb.checked; };
        } else if (typeof value === 'number') {
            var ni = document.createElement('input'); ni.type = 'number'; ni.value = value;
            el = ni; getValue = function(){ return ni.value === '' ? 0 : Number(ni.value); };
        } else {
            var str  = value == null ? '' : String(value);
            var long = str.length > 80 || str.indexOf('\n') !== -1;
            var inp  = document.createElement(long ? 'textarea' : 'input');
            if (!long) inp.type = 'text';
            inp.value = str;
            if (long) inp.rows = Math.min(5, str.split('\n').length + 1);
            el = inp; getValue = function(){ return inp.value; };
        }
        return { el: el, getValue: getValue };
    }

    // ── Build an array of plain strings (e.g. keywords) ──
    function buildStringArray(arr) {
        var wrap   = document.createElement('div');
        var chips  = document.createElement('div'); chips.className = 'fe-str-arr';
        var values = arr.slice();

        function renderChips() {
            chips.innerHTML = '';
            values.forEach(function(v, i) {
                var chip = document.createElement('div'); chip.className = 'fe-chip';
                chip.appendChild(document.createTextNode(v));
                var rm = document.createElement('button'); rm.type = 'button'; rm.className = 'fe-chip-rm'; rm.textContent = '×';
                rm.onclick = function() { values.splice(i, 1); renderChips(); };
                chip.appendChild(rm); chips.appendChild(chip);
            });
        }
        renderChips();

        var addRow   = document.createElement('div'); addRow.className = 'fe-chip-add-row';
        var newInput = document.createElement('input'); newInput.type = 'text';
        newInput.className = 'fe-chip-input'; newInput.placeholder = 'Add keyword…';
        var addBtn   = document.createElement('button'); addBtn.type = 'button';
        addBtn.className = 'fe-chip-btn'; addBtn.textContent = '+ Add';
        addBtn.onclick = function() {
            var v = newInput.value.trim();
            if (!v) return;
            values.push(v); newInput.value = ''; renderChips();
        };
        newInput.addEventListener('keydown', function(e){ if (e.key === 'Enter') { e.preventDefault(); addBtn.click(); } });

        addRow.appendChild(newInput); addRow.appendChild(addBtn);
        wrap.appendChild(chips); wrap.appendChild(addRow);
        return { el: wrap, getValue: function(){ return values.slice(); } };
    }

    // ── Build an object ──
    function buildObject(obj) {
        var wrap   = document.createElement('div'); wrap.className = 'fe-obj';
        var models = {};
        Object.keys(obj).forEach(function(k) {
            var field = document.createElement('div'); field.className = 'fe-field';
            var lab   = document.createElement('div'); lab.className = 'fe-label';
            lab.innerHTML = humanize(k) + ' <span class="fe-key">' + k + '</span>';

            var val = obj[k];
            var m;
            // Array of plain strings → chip editor
            if (Array.isArray(val) && val.every(function(x){ return typeof x === 'string' || typeof x === 'number'; })) {
                m = buildStringArray(val.map(String));
            } else {
                m = build(k, val);
            }
            field.appendChild(lab); field.appendChild(m.el);
            wrap.appendChild(field);
            models[k] = m;

            var input = m.el.__input ? m.el.__input : m.el;
            if ((input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') && (val == null || typeof val === 'string')) {
                attachMediaPreview(k, input);
            }
        });
        return {
            el: wrap,
            getValue: function() {
                var o = {};
                Object.keys(models).forEach(function(k){ o[k] = models[k].getValue(); });
                return o;
            }
        };
    }

    // ── Build an array of objects ──
    function buildArray(arr) {
        var wrap     = document.createElement('div'); wrap.className = 'fe-arr';
        var list     = document.createElement('div'); list.className = 'fe-arr-list';
        var children = [];
        var template = arr.length ? arr[0] : '';

        function addItem(val) {
            var row  = document.createElement('div'); row.className = 'fe-arr-item';
            var body = document.createElement('div'); body.className = 'fe-arr-body';
            var m    = build(null, val);
            body.appendChild(m.el);
            var rm = document.createElement('button'); rm.type = 'button'; rm.className = 'fe-rm'; rm.title = 'Remove'; rm.textContent = '✕';
            rm.onclick = function() {
                list.removeChild(row);
                for(var i=0;i<children.length;i++) if(children[i].row===row){ children.splice(i,1); break; }
            };
            row.appendChild(body); row.appendChild(rm);
            list.appendChild(row); children.push({ row: row, model: m });
        }
        arr.forEach(addItem);

        var add = document.createElement('button'); add.type = 'button'; add.className = 'fe-add';
        add.innerHTML = '<i class="bi bi-plus-lg me-1"></i>Add item';
        add.onclick = function(){ addItem(blankLike(template)); };
        wrap.appendChild(list); wrap.appendChild(add);
        return { el: wrap, getValue: function(){ return children.map(function(c){ return c.model.getValue(); }); } };
    }

    function build(key, value) {
        if (Array.isArray(value)) {
            // All strings → chip editor (handled in buildObject); here it's top-level
            if (value.every(function(x){ return typeof x==='string'||typeof x==='number'; })) {
                return buildStringArray(value.map(String));
            }
            return buildArray(value);
        }
        if (value && typeof value === 'object') return buildObject(value);
        return buildPrimitive(key, value);
    }

    // ── Wire up each setting form ──
    document.querySelectorAll('.setting-form').forEach(function(form) {
        var mount  = form.querySelector('.editor-mount');
        var raw    = form.querySelector('.raw-json');
        var hidden = form.querySelector('textarea[name="value"]');
        var tabs   = form.querySelectorAll('.stab');
        var mode   = 'simple';
        var root;

        function renderSimple(data) {
            mount.innerHTML = '';
            root = build(null, data);
            mount.appendChild(root.el);
        }

        var initial;
        try { initial = JSON.parse(hidden.value); } catch(e) { initial = null; }

        if (initial === null) {
            mount.style.display = 'none';
            raw.style.display = 'block'; raw.value = hidden.value;
            mode = 'advanced';
            tabs.forEach(function(t){ t.style.display = 'none'; });
        } else {
            renderSimple(initial);
        }

        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                var next = tab.dataset.mode;
                if (next === mode) return;
                if (next === 'advanced') {
                    raw.value = JSON.stringify(root ? root.getValue() : initial, null, 2);
                    mount.style.display = 'none'; raw.style.display = 'block';
                } else {
                    try { renderSimple(JSON.parse(raw.value)); }
                    catch(e) { alert('JSON error — cannot switch to easy editor:\n\n' + e.message); return; }
                    raw.style.display = 'none'; mount.style.display = 'block';
                }
                mode = next;
                tabs.forEach(function(t){ t.classList.toggle('active', t === tab); });
            });
        });

        form.addEventListener('submit', function(e) {
            var out;
            if (mode === 'advanced') {
                try { out = JSON.parse(raw.value); }
                catch(err) { e.preventDefault(); alert('Please fix the JSON error before saving:\n\n' + err.message); return; }
            } else {
                out = root ? root.getValue() : initial;
            }
            hidden.value = JSON.stringify(out);
        });
    });
})();
</script>

<?= $this->endSection() ?>
