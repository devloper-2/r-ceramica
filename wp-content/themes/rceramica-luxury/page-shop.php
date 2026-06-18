<?php

/**
 * Template for the Shop page — WooCommerce product listing with subcategory sidebar + filters.
 */
get_header();

// ── Category map: URL param → WooCommerce data ────────────────────────────────
$cat_map = [
    'tiles'    => ['slug' => 'architectural-surfaces', 'title' => 'Architectural Surfaces', 'tag' => 'Porcelain & Stone'],
    'showers'  => ['slug' => 'luxury-showers',         'title' => 'Luxury Showers',         'tag' => 'Hydro-Therapy Systems'],
    'faucets'  => ['slug' => 'artisan-faucets',        'title' => 'Artisan Faucets',         'tag' => 'Precision Engineered'],
    'sanitary' => ['slug' => 'sanitary-form',          'title' => 'Sanitary Form',           'tag' => 'Hygiene Systems'],
    'basins'   => ['slug' => 'minimal-basins',         'title' => 'Minimal Basins',          'tag' => 'Vessel Works'],
    'frp'      => ['slug' => 'frp-manhole',            'title' => 'FRP Manhole',             'tag' => 'Infrastructural'],
];

$cat_key = sanitize_text_field($_GET['category'] ?? 'tiles');
if (! isset($cat_map[$cat_key])) {
    $cat_key = 'tiles';
}
$cat_info = $cat_map[$cat_key];

// Active filters from URL
$active_sub_slug = sanitize_text_field($_GET['sub'] ?? '');
$active_finish   = sanitize_text_field($_GET['finish'] ?? '');
$active_brand     = sanitize_text_field($_GET['brand'] ?? '');
$active_shape     = sanitize_text_field($_GET['shape'] ?? '');
$active_mounting  = sanitize_text_field($_GET['mounting'] ?? '');
$min_price = isset($_GET['min_price'])
    ? intval($_GET['min_price'])
    : 0;

$max_price = isset($_GET['max_price'])
    ? intval($_GET['max_price'])
    : 50000;
$sort            = sanitize_text_field($_GET['sort'] ?? '');
$is_subcategory_page = !empty($active_sub_slug);

// ── Resolve parent WooCommerce term ──────────────────────────────────────────
$parent_term = get_term_by('slug', $cat_info['slug'], 'product_cat');
$parent_id   = $parent_term ? (int) $parent_term->term_id : 0;

// ── Subcategories ────────────────────────────────────────────────────────────
$subcategories = $parent_id
    ? get_terms(['taxonomy' => 'product_cat', 'parent' => $parent_id, 'hide_empty' => false])
    : [];

// ── Build WP_Query ───────────────────────────────────────────────────────────
$query_tax_slug   = $active_sub_slug ?: $cat_info['slug'];
$include_children = ! (bool) $active_sub_slug;




// Sort
switch ($sort) {
    case 'price_asc':
        $query_args['meta_key'] = '_price';
        $query_args['orderby']  = 'meta_value_num';
        $query_args['order']    = 'ASC';
        break;
    case 'price_desc':
        $query_args['meta_key'] = '_price';
        $query_args['orderby']  = 'meta_value_num';
        $query_args['order']    = 'DESC';
        break;
    case 'name_asc':
        $query_args['orderby'] = 'title';
        $query_args['order']   = 'ASC';
        break;
    default:
        $query_args['orderby'] = 'menu_order';
        $query_args['order']   = 'ASC';
}

$tax_query = [];
$meta_query = [];

/* ---------------------------------
   CATEGORY
--------------------------------- */

$tax_query[] = [
    'taxonomy'         => 'product_cat',
    'field'            => 'slug',
    'terms'            => $query_tax_slug,
    'include_children' => $include_children,
];

/* ---------------------------------
   FINISH
--------------------------------- */

if ($active_finish) {

    $tax_query[] = [
        'taxonomy' => 'pa_finish',
        'field'    => 'slug',
        'terms'    => $active_finish,
    ];
}

/* ---------------------------------
   BRAND
--------------------------------- */

if ($active_brand) {

    $tax_query[] = [
        'taxonomy' => 'pa_brand',
        'field'    => 'slug',
        'terms'    => $active_brand,
    ];
}

/* ---------------------------------
   SHAPE
--------------------------------- */

if ($active_shape) {

    $tax_query[] = [
        'taxonomy' => 'pa_shape',
        'field'    => 'slug',
        'terms'    => $active_shape,
    ];
}

/* ---------------------------------
   MOUNTING
--------------------------------- */

if ($active_mounting) {

    $tax_query[] = [
        'taxonomy' => 'pa_mounting',
        'field'    => 'slug',
        'terms'    => $active_mounting,
    ];
}

/* ---------------------------------
   FINAL QUERY
--------------------------------- */

if ($min_price || $max_price) {

    $meta_query[] = [
        'key'     => '_price',
        'value'   => [$min_price, $max_price],
        'compare' => 'BETWEEN',
        'type'    => 'NUMERIC',
    ];
}

$query_args = [
    'post_type'      => 'product',
    'posts_per_page' => -1,
    'tax_query'      => $tax_query,
];

$products_query = new WP_Query($query_args);

// ── Gather available finishes for filter dropdown ────────────────────────────
$all_ids_args = [
    'post_type'      => 'product',
    'posts_per_page' => -1,
    'fields'         => 'ids',
    'tax_query'      => [[
        'taxonomy'         => 'product_cat',
        'field'            => 'slug',
        'terms'            => $cat_info['slug'],
        'include_children' => true,
    ]],
];
$finishes = [];
foreach (get_posts($all_ids_args) as $pid) {
    $f = get_post_meta($pid, '_rc_finish', true);
    if ($f && ! in_array($f, $finishes, true)) {
        $finishes[] = $f;
    }
}
sort($finishes);

// ── Nav + helpers ─────────────────────────────────────────────────────────────
$rc_nav_active = 'explore';

// URL builder helper
function rc_shop_url($params = [])
{
    global $cat_key, $active_sub_slug, $active_finish, $sort;
    $base = [
        'category' => $cat_key,
        'sub'      => $active_sub_slug,
        'finish'   => $active_finish,
        'sort'     => $sort,
    ];
    $merged = array_merge($base, $params);
    $merged = array_filter($merged); // strip empty values
    return esc_url(add_query_arg($merged, home_url('/shop/')));
}


?>
<main id="site-content" role="main" class="bg-[#0a0a0a] min-h-screen font-sans text-white">
    <?php if (!$is_subcategory_page) : ?>

        <section class="relative h-screen overflow-hidden bg-black">

            <!-- Background Image -->
            <div class="absolute inset-0 z-0">

                <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80"
                    alt="Artisan Faucets"
                    class="w-full h-full object-cover opacity-50 scale-110 transition-transform duration-[10s] hover:scale-100">

                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>

            </div>

            <!-- Content -->
            <div class="relative z-10 h-full flex items-center">

                <div class="max-w-[1720px] mx-auto w-full px-6 md:px-12">

                    <div class="max-w-3xl">

                        <span class="text-[11px] uppercase tracking-[0.7em] text-[#c5a059] block mb-8">
                            Water Engineering
                        </span>

                        <h1 class="text-5xl md:text-7xl xl:text-8xl font-light uppercase leading-[0.95] tracking-tight mb-10">

                            The Art of <br>
                            Fluidity

                        </h1>

                        <p class="text-white/50 text-[12px] md:text-[14px] uppercase tracking-[0.35em] leading-relaxed max-w-2xl mb-14">

                            Precision-engineered faucet collections where
                            architectural geometry meets the sensory
                            experience of water.

                        </p>

                        <a href="<?php echo esc_url(home_url('/shop/?category=faucets')); ?>" class="inline-flex items-center gap-6 group">

                            <span class="text-[11px] uppercase tracking-[0.5em] border-b border-white/20 pb-2 group-hover:border-[#c5a059] transition-all">
                                Fusion Collection
                            </span>

                            <svg class="w-5 h-5 text-[#c5a059] transition-transform group-hover:translate-x-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">

                                <path stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M5 12h14M13 5l7 7-7 7" />

                            </svg>

                        </a>

                    </div>

                </div>

            </div>

        </section>

    <?php endif; ?>
    <div class="filterpagetop">

        <!-- ── Sticky Filter Bar ──────────────────────────────────────────────── -->
        <div class="sticky top-20 md:top-[90px] lg:top-[91px] z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
            <div class="max-w-[1720px] mx-auto px-6 md:px-12 flex items-center justify-between h-14 gap-4">

                <!-- Category Title (desktop) -->
                <div class="hidden lg:flex items-center gap-4 min-w-[260px]">
                    <span class="text-[10px] uppercase tracking-[0.5em] text-[#c5a059] opacity-70"><?php echo esc_html($cat_info['tag']); ?></span>
                    <span class="text-white/10">|</span>
                    <span class="text-[11px] uppercase tracking-[0.3em] text-white/60"><?php echo esc_html($cat_info['title']); ?></span>
                </div>


<?php if ($is_subcategory_page) : ?>
                <!-- Product Count + Mobile Filter Trigger -->
                <div class="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/30">
                    <span><?php echo $products_query->post_count; ?> Items</span>
                    <button onclick="document.getElementById('mobile-filter-panel').classList.toggle('translate-x-full')" class="lg:hidden flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                        </svg>
                        Filter
                    </button>
                </div>
                <?php endif; ?>
            </div>
        </div>

        <!-- ── Main Layout ───────────────────────────────────────────────────────── -->
        <div class="max-w-[1720px] mx-auto px-6 md:px-12 flex gap-0">

            <!-- ── Luxury Dynamic Sidebar Filters (Desktop) ─────────────────────────────── -->
            <?php if ($is_subcategory_page) : ?>

                <?php

                $brands = get_terms([
                    'taxonomy'   => 'pa_brand',
                    'hide_empty' => true,
                ]);

                $mountings = get_terms([
                    'taxonomy'   => 'pa_mounting',
                    'hide_empty' => true,
                ]);

                $shapes = get_terms([
                    'taxonomy'   => 'pa_shape',
                    'hide_empty' => true,
                ]);

                $finish_terms = get_terms([
                    'taxonomy'   => 'pa_finish',
                    'hide_empty' => true,
                ]);

                $finish_colors = [
                    'chrome'      => '#d9d9d9',
                    'matte-black' => '#1a1a1a',
                    'gold-pvd'    => '#c5a059',
                    'rose-gold'   => '#b76e79',
                    'gunmetal'    => '#5f5f5f',
                ];

                ?>
                <div class="flex flex-col lg:flex-row gap-16">
                    <aside class="hidden-mobile lg:block w-full lg:w-80 shrink-0 lg:animate-slide-up">

                        <div class="lg:sticky lg:top-48 filter-container flex flex-col h-full lg:h-auto bg-[#0a0a0a] lg:bg-transparent">

                            <div class="flex-1 overflow-y-auto px-6 lg:px-0 py-8 lg:py-0 lg:space-y-2 filter-panel">
                                <div class="border border-white/5 bg-[#111] p-6">
                                    <h3 class="text-[10px] uppercase tracking-[0.45em] text-white/40 mb-6">Selected Options</h3>
                                    <div class="flex flex-wrap gap-3">
                                        <?php if ($active_finish) : ?>
                                            <a href="<?php echo esc_url(rc_shop_url(['finish' => ''])); ?>" class="h-10 px-4 bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white">
                                                <?php echo esc_html($active_finish); ?>
                                                <i data-lucide="x" class="w-3 h-3"></i>
                                            </a>
                                        <?php endif; ?>

                                        <?php if ($active_brand) : ?>
                                            <a href="<?php echo esc_url(rc_shop_url(['brand' => ''])); ?>" class="h-10 px-4 bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white">
                                                <?php echo esc_html($active_brand); ?>
                                                <i data-lucide="x" class="w-3 h-3"></i>
                                            </a>
                                        <?php endif; ?>

                                        <?php if ($active_shape) : ?>
                                            <a href="<?php echo esc_url(rc_shop_url(['shape' => ''])); ?>" class="h-10 px-4 bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white">
                                                <?php echo esc_html($active_shape); ?>
                                                <i data-lucide="x" class="w-3 h-3"></i>
                                            </a>
                                        <?php endif; ?>

                                        <?php if ($active_mounting) : ?>
                                            <a href="<?php echo esc_url(rc_shop_url(['mounting' => ''])); ?>" class="h-10 px-4 bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white">
                                                <?php echo esc_html($active_mounting); ?>
                                                <i data-lucide="x" class="w-3 h-3"></i>
                                            </a>

                                        <?php endif; ?>

                                        <a href="<?php echo esc_url(add_query_arg(['category' => $cat_key, 'sub'      => $active_sub_slug], home_url('/shop/'))); ?>" class="h-10 px-4 bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white transition-all">Reset All</a>
                                    </div>
                                </div>

                                <!-- Budget Range -->

                                <div class="border border-white/5 bg-[#080808]">
                                    <button data-filter-toggle class="group w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
                                        <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">Budget Range</span>
                                        <i data-lucide="minus" class="filter-toggle-icon w-4 h-4 text-white/40 group-hover:text-white transition-all duration-300"></i>
                                    </button>

                                    <div class="p-6 space-y-8">
                                        <form method="GET" action="<?php echo esc_url(home_url('/shop/')); ?>">
                                            <input type="hidden" name="category" value="<?php echo esc_attr($cat_key); ?>">
                                            <?php if ($active_sub_slug) : ?>
                                                <input type="hidden" name="sub" value="<?php echo esc_attr($active_sub_slug); ?>">
                                            <?php endif; ?>

                                            <?php if ($active_finish) : ?>
                                                <input type="hidden" name="finish" value="<?php echo esc_attr($active_finish); ?>">
                                            <?php endif; ?>

                                            <?php if ($active_brand) : ?>
                                                <input type="hidden" name="brand" value="<?php echo esc_attr($active_brand); ?>">
                                            <?php endif; ?>

                                            <?php if ($active_shape) : ?>
                                                <input type="hidden" name="shape" value="<?php echo esc_attr($active_shape); ?>">
                                            <?php endif; ?>

                                            <?php if ($active_mounting) : ?>
                                                <input type="hidden" name="mounting" value="<?php echo esc_attr($active_mounting); ?>">
                                            <?php endif; ?>


                                            <div class="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/30">
                                                <span>Min: ₹0</span>
                                                <span>Max: ₹50,000</span>
                                            </div>

                                            <!-- Range -->
                                            <input type="range" id="priceRange" min="0" max="50000" step="500" value="<?php echo esc_attr($max_price); ?>" class="w-full accent-[#c5a059]">

                                            <!-- Inputs -->
                                            <div class="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label class="block text-[9px] uppercase tracking-[0.3em] text-white/20 mb-3">Min Budget</label>
                                                    <input type="number" name="min_price" id="minPrice" value="<?php echo esc_attr($min_price); ?>" class="w-full h-12 bg-transparent border border-white/10 px-4 text-white text-sm focus:outline-none focus:border-[#c5a059]">
                                                </div>
                                                <div>
                                                    <label class="block text-[9px] uppercase tracking-[0.3em] text-white/20 mb-3">Max Budget</label>
                                                    <input type="number" name="max_price" id="maxPrice" value="<?php echo esc_attr($max_price); ?>" class="w-full h-12 bg-transparent border border-white/10 px-4 text-white text-sm focus:outline-none focus:border-[#c5a059]">
                                                </div>
                                            </div>

                                            <!-- Button -->
                                            <button type="submit" class="w-full h-14 mt-6 border border-[#c5a059]/40 text-[#c5a059] text-[11px] uppercase tracking-[0.45em] hover:bg-[#c5a059] hover:text-black transition-all"> Apply Range </button>
                                        </form>
                                    </div>
                                </div>

                                <!-- Color Finishes -->
                                <?php if (!empty($finish_terms) && !is_wp_error($finish_terms)) : ?>

                                    <div class="border border-white/5 bg-[#080808]">
                                        <button data-filter-toggle class="group w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
                                            <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">Color Finishes</span>
                                            <i data-lucide="minus" class="filter-toggle-icon w-4 h-4 text-white/40 group-hover:text-white transition-all duration-300"></i>
                                        </button>

                                        <div class="px-6 py-8 space-y-6">
                                            <?php foreach ($finish_terms as $finish) :
                                                $is_active_finish = strtolower($active_finish) === strtolower($finish->slug);
                                                // premium swatches
                                                $finish_styles = [
                                                    'black-chrome' => 'background:linear-gradient(135deg,#4a4a4a,#111);',
                                                    'black-matt' => 'background:#1b1b1b;',
                                                    'blush-gold-bright-pvd' => 'background:#9c7854;',
                                                    'chrome' => 'background:linear-gradient(135deg,#f5f5f5,#bdbdbd);',
                                                    'gold-bright-pvd' => 'background:#c5a059;',
                                                ];
                                                $style = $finish_styles[$finish->slug] ?? 'background:#666;';
                                            ?>
                                                <a href="<?php echo esc_url(rc_shop_url(['finish' => $is_active_finish ? '' : $finish->slug])); ?>" class="flex items-center gap-4 group">

                                                    <!-- Swatch -->
                                                    <div style="<?php echo esc_attr($style); ?>" class="relative w-11 h-11 border flex items-center justify-center transition-all duration-300
                        <?php echo $is_active_finish ? 'border-[#c5a059]' : 'border-white/10 group-hover:border-white/30'; ?>">

                                                        <?php if ($is_active_finish) : ?>
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        <?php elseif ($finish->slug === 'black-chrome') : ?>
                                                            <span class="text-white text-[11px] font-semibold tracking-wide">BC</span>
                                                        <?php endif; ?>
                                                    </div>

                                                    <!-- Label -->
                                                    <span class="text-[11px] uppercase tracking-[0.22em] transition-all duration-300
                        <?php echo $is_active_finish ? 'text-white'  : 'text-white/40 group-hover:text-white/70'; ?>">
                                                        <?php echo esc_html($finish->name); ?>
                                                    </span>
                                                </a>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>

                                <?php endif; ?>

                                <!-- Brands -->
                                <?php if (!empty($brands) && !is_wp_error($brands)) : ?>
                                    <div class="border border-white/5 bg-[#080808]">
                                        <button data-filter-toggle class="group w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
                                            <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">Brands</span>
                                            <i data-lucide="minus" class="filter-toggle-icon w-4 h-4 text-white/40 group-hover:text-white transition-all duration-300"></i>
                                        </button>
                                        <div class="p-6 space-y-5">
                                            <?php foreach ($brands as $brand) : $is_active_brand = $active_brand === $brand->slug; ?>
                                                <a href="<?php echo esc_url(rc_shop_url(['brand' => $is_active_brand ? '' : $brand->slug])); ?>" class="flex items-center gap-4 group">
                                                    <span class="w-4 h-4 border border-white/20 flex items-center justify-center">
                                                        <?php if ($is_active_brand) : ?>
                                                            <span class="w-2 h-2 bg-[#c5a059]"></span>
                                                        <?php endif; ?>
                                                    </span>
                                                    <span class="text-[11px] uppercase tracking-[0.25em] transition-colors <?php echo $is_active_brand ? 'text-[#c5a059]' : 'text-white/50 group-hover:text-white'; ?>"><?php echo esc_html($brand->name); ?></span>
                                                </a>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                <?php endif; ?>

                                <!-- Mounting -->
                                <?php if (!empty($mountings) && !is_wp_error($mountings)) : ?>
                                    <div class="border border-white/5 bg-[#080808]">
                                        <button data-filter-toggle class="group w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
                                            <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">Mounting</span>
                                            <i data-lucide="minus" class="filter-toggle-icon w-4 h-4 text-white/40 group-hover:text-white transition-all duration-300"></i>
                                        </button>

                                        <div class="p-6 space-y-5">
                                            <?php foreach ($mountings as $mounting) : $is_active_mounting = ($active_mounting === $mounting->slug); ?>
                                                <a href="<?php echo esc_url(rc_shop_url(['mounting' => $is_active_mounting ? '' : $mounting->slug])); ?>" class="flex items-center gap-4 group">
                                                    <span class="w-4 h-4 border border-white/20 flex items-center justify-center <?php echo $is_active_mounting ? 'bg-[#c5a059] border-[#c5a059]' : ''; ?>">
                                                        <?php if ($is_active_mounting) : ?><i data-lucide="check" class="w-3 h-3 text-black"></i><?php endif; ?>
                                                    </span>
                                                    <span class="text-[11px] uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">
                                                        <?php echo esc_html($mounting->name); ?>
                                                    </span>
                                                </a>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                <?php endif; ?>

                                <!-- Shapes -->
                                <?php if (!empty($shapes) && !is_wp_error($shapes)) : ?>
                                    <div class="border border-white/5 bg-[#080808]">
                                        <button data-filter-toggle class="group w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
                                            <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">Shape</span>
                                            <i data-lucide="minus" class="filter-toggle-icon w-4 h-4 text-white/40 group-hover:text-white transition-all duration-300"></i>
                                        </button>

                                        <div class="p-6 space-y-5">
                                            <?php foreach ($shapes as $shape) : $is_active_shape = ($active_shape === $shape->slug); ?>
                                                <a href="<?php echo esc_url(rc_shop_url(['shape' => $is_active_shape ? '' : $shape->slug])); ?>" class="flex items-center gap-4 group">
                                                    <span class="w-4 h-4 border border-white/20 flex items-center justify-center <?php echo $is_active_shape ? 'bg-[#c5a059] border-[#c5a059]' : ''; ?>">
                                                        <?php if ($is_active_shape) : ?>
                                                            <i data-lucide="check" class="w-3 h-3 text-black"></i>
                                                        <?php endif; ?>
                                                    </span>
                                                    <span class="text-[11px] uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">
                                                        <?php echo esc_html($shape->name); ?>
                                                    </span>
                                                </a>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    </aside>

                <?php endif; ?>
                <?php
                $show_subcategory_grid = empty($active_sub_slug) && !empty($subcategories);
                ?>
                <div class="flex-1">

                    <?php if ($show_subcategory_grid) { ?>

                        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8">

                            <?php foreach ($subcategories as $sub) {

                                $thumbnail_id = get_term_meta($sub->term_id, 'thumbnail_id', true);
                                $image = wp_get_attachment_url($thumbnail_id);

                                $link = add_query_arg(
                                    [
                                        'category' => $cat_key,
                                        'sub'      => $sub->slug,
                                    ],
                                    home_url('/shop/')
                                );
                            ?>

                                <a href="<?php echo esc_url($link); ?>"
                                    class="group block bg-[#111] overflow-hidden">

                                    <div class="aspect-[4/5] overflow-hidden bg-[#0d0d0d]">
                                        <img src="<?php echo esc_url($image); ?>"
                                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            alt="<?php echo esc_attr($sub->name); ?>">
                                    </div>

                                    <div class="p-5 border-t border-white/5">
                                        <h3 class="text-[14px] uppercase tracking-[0.25em] text-white group-hover:text-[#c5a059] transition-colors">
                                            <?php echo esc_html($sub->name); ?>
                                        </h3>

                                        <p class="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-2">
                                            Architectural Series
                                        </p>
                                    </div>

                                </a>

                            <?php } ?>

                        </div>

                    <?php } elseif ($products_query->have_posts()) { ?>

                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">

                            <?php while ($products_query->have_posts()) {
                                $products_query->the_post();

                                $post_id     = get_the_ID();
                                $sku         = get_post_meta($post_id, '_sku', true);
                                $price       = get_post_meta($post_id, '_price', true);
                                $size        = get_post_meta($post_id, '_rc_size', true);
                                $finish      = get_post_meta($post_id, '_rc_finish', true);
                                $img_url     = get_post_meta($post_id, '_rc_image_url', true);
                                $thumb       = get_the_post_thumbnail_url($post_id, 'large');
                                $image       = $thumb ?: ($img_url ?: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800');
                                $permalink   = get_permalink();
                                //$add_to_cart = esc_url(add_query_arg('add-to-cart', $post_id, home_url('/shop/')));
                            ?>

                                <article class="group relative bg-black overflow-hidden">
                                    <div class="relative overflow-hidden bg-[#111] aspect-[4/5]">

                                        <?php
                                        $product = wc_get_product(get_the_ID());
                                        $badge = '';

                                        if ($product && $product->is_on_sale()) {
                                            $badge = 'Sale';
                                        } elseif (get_the_date('U') >= strtotime('-30 days')) {
                                            $badge = 'New Arrival';
                                        } elseif ($product && $product->is_featured()) {
                                            $badge = 'Featured';
                                        } elseif ($product && !$product->is_in_stock()) {
                                            $badge = 'Out of Stock';
                                        }
                                        ?>

                                        <?php if ($badge) { ?>
                                            <div class="absolute top-6 left-6 z-20">
                                                <span class="px-4 py-2 border border-white/20 text-[9px] uppercase tracking-[0.35em] text-white/70 bg-black/20 backdrop-blur-sm">
                                                    <?php echo esc_html($badge); ?>
                                                </span>
                                            </div>
                                        <?php } ?>

                                        <a href="<?php echo esc_url($permalink); ?>" class="block w-full h-full">
                                            <img src="<?php echo esc_url($image); ?>"
                                                alt="<?php echo esc_attr(get_the_title()); ?>"
                                                loading="lazy"
                                                class="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105">
                                            <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </a>
                                    </div>

                                    <div class="pt-8 pb-10 px-4 text-center">
                                        <div class="text-[10px] uppercase tracking-[0.45em] text-[#c5a059] mb-5">
                                            Fusion Series
                                        </div>

                                        <h3 class="text-[20px] uppercase tracking-[0.15em] text-white font-light leading-tight mb-5 group-hover:text-[#c5a059] transition-colors">
                                            <?php the_title(); ?>
                                        </h3>

                                        <?php if ($sku) { ?>
                                            <div class="text-[11px] uppercase tracking-[0.3em] text-white/25 mb-3">
                                                <?php echo esc_html($sku); ?>
                                            </div>
                                        <?php } ?>

                                        <?php if ($price) { ?>
                                            <div class="text-[18px] font-light text-white mb-10 tracking-tight">₹ <?php echo esc_html(number_format((float) $price)); ?></div>
                                        <?php } ?>

                                        <div class="px-4 viewcartpopup">
                                            <a href="<?php echo esc_url($product->add_to_cart_url()); ?>" data-quantity="1" data-product_id="<?php echo get_the_ID(); ?>" data-product_sku="<?php echo esc_attr($product->get_sku()); ?>" aria-label="<?php echo esc_attr($product->add_to_cart_description()); ?>" rel="nofollow" class="rc-add-to-cart add_to_cart_button ajax_add_to_cart product_type_simple h-14 w-full border border-white bg-white text-black text-[11px] uppercase tracking-[0.45em] flex items-center justify-center gap-3 hover:bg-[#c5a059] hover:border-[#c5a059] transition-all duration-300"><i data-lucide="shopping-cart" size="14"></i> Add To Cart</a>
                                            <a href="<?php echo esc_url($permalink); ?>"
                                                class="h-14 w-full py-4 border border-white/10 text-white/60 text-[11px] uppercase tracking-[0.45em] hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-3 mt-4">
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </article>

                            <?php }
                            wp_reset_postdata(); ?>

                        </div>

                    <?php } else { ?>

                        <div class="flex flex-col items-center justify-center py-32 text-center">
                            <div class="w-16 h-px bg-[#c5a059]/30 mb-12 mx-auto"></div>
                            <p class="text-[11px] uppercase tracking-[0.5em] text-white/20 mb-4">No products found</p>
                            <a href="<?php echo esc_url(add_query_arg('category', $cat_key, home_url('/shop/'))); ?>"
                                class="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] hover:underline mt-4">
                                View All <?php echo esc_html($cat_info['title']); ?>
                            </a>
                        </div>

                    <?php } ?>
                </div>
                </div>
        </div>
        <!-- ── Mobile Filter Panel ────────────────────────────────────────────────── -->
         <?php if ($is_subcategory_page) : ?>
        <div id="mobile-filter-panel" class="fixed inset-y-0 right-0 w-80 max-w-full bg-[#0d0d0d] border-l border-white/10 z-[600] translate-x-full transition-transform duration-500 overflow-y-auto">
            <div class="border border-white/5 bg-[#111] p-6">
                <h3 class="text-[10px] uppercase tracking-[0.45em] text-white/40 mb-6">Selected Options</h3>
                <div class="flex flex-wrap gap-3">
                    <?php if ($active_finish) : ?>
                        <a href="<?php echo esc_url(rc_shop_url(['finish' => ''])); ?>" class="h-10 px-4 bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white">
                            <?php echo esc_html($active_finish); ?>
                            <i data-lucide="x" class="w-3 h-3"></i>
                        </a>
                    <?php endif; ?>

                    <?php if ($active_brand) : ?>
                        <a href="<?php echo esc_url(rc_shop_url(['brand' => ''])); ?>" class="h-10 px-4 bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white">
                            <?php echo esc_html($active_brand); ?>
                            <i data-lucide="x" class="w-3 h-3"></i>
                        </a>
                    <?php endif; ?>

                    <?php if ($active_shape) : ?>
                        <a href="<?php echo esc_url(rc_shop_url(['shape' => ''])); ?>" class="h-10 px-4 bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white">
                            <?php echo esc_html($active_shape); ?>
                            <i data-lucide="x" class="w-3 h-3"></i>
                        </a>
                    <?php endif; ?>

                    <?php if ($active_mounting) : ?>
                        <a href="<?php echo esc_url(rc_shop_url(['mounting' => ''])); ?>" class="h-10 px-4 bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white">
                            <?php echo esc_html($active_mounting); ?>
                            <i data-lucide="x" class="w-3 h-3"></i>
                        </a>

                    <?php endif; ?>

                    <a href="<?php echo esc_url(add_query_arg(['category' => $cat_key, 'sub'      => $active_sub_slug], home_url('/shop/'))); ?>" class="h-10 px-4 bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white transition-all">Reset All</a>
                </div>
            </div>

            <!-- Budget Range -->

            <div class="border border-white/5 bg-[#080808]">
                <button data-filter-toggle class="group w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">Budget Range</span>
                    <i data-lucide="minus" class="filter-toggle-icon w-4 h-4 text-white/40 group-hover:text-white transition-all duration-300"></i>
                </button>

                <div class="p-6 space-y-8">
                    <form method="GET" action="<?php echo esc_url(home_url('/shop/')); ?>">
                        <input type="hidden" name="category" value="<?php echo esc_attr($cat_key); ?>">
                        <?php if ($active_sub_slug) : ?>
                            <input type="hidden" name="sub" value="<?php echo esc_attr($active_sub_slug); ?>">
                        <?php endif; ?>

                        <?php if ($active_finish) : ?>
                            <input type="hidden" name="finish" value="<?php echo esc_attr($active_finish); ?>">
                        <?php endif; ?>

                        <?php if ($active_brand) : ?>
                            <input type="hidden" name="brand" value="<?php echo esc_attr($active_brand); ?>">
                        <?php endif; ?>

                        <?php if ($active_shape) : ?>
                            <input type="hidden" name="shape" value="<?php echo esc_attr($active_shape); ?>">
                        <?php endif; ?>

                        <?php if ($active_mounting) : ?>
                            <input type="hidden" name="mounting" value="<?php echo esc_attr($active_mounting); ?>">
                        <?php endif; ?>


                        <div class="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/30">
                            <span>Min: ₹0</span>
                            <span>Max: ₹50,000</span>
                        </div>

                        <!-- Range -->
                        <input type="range" id="priceRange" min="0" max="50000" step="500" value="<?php echo esc_attr($max_price); ?>" class="w-full accent-[#c5a059]">

                        <!-- Inputs -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[9px] uppercase tracking-[0.3em] text-white/20 mb-3">Min Budget</label>
                                <input type="number" name="min_price" id="minPrice" value="<?php echo esc_attr($min_price); ?>" class="w-full h-12 bg-transparent border border-white/10 px-4 text-white text-sm focus:outline-none focus:border-[#c5a059]">
                            </div>
                            <div>
                                <label class="block text-[9px] uppercase tracking-[0.3em] text-white/20 mb-3">Max Budget</label>
                                <input type="number" name="max_price" id="maxPrice" value="<?php echo esc_attr($max_price); ?>" class="w-full h-12 bg-transparent border border-white/10 px-4 text-white text-sm focus:outline-none focus:border-[#c5a059]">
                            </div>
                        </div>

                        <!-- Button -->
                        <button type="submit" class="w-full h-14 mt-6 border border-[#c5a059]/40 text-[#c5a059] text-[11px] uppercase tracking-[0.45em] hover:bg-[#c5a059] hover:text-black transition-all"> Apply Range </button>
                    </form>
                </div>
            </div>

            <!-- Color Finishes -->
            <?php if (!empty($finish_terms) && !is_wp_error($finish_terms)) : ?>

                <div class="border border-white/5 bg-[#080808]">
                    <button data-filter-toggle class="group w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
                        <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">Color Finishes</span>
                        <i data-lucide="minus" class="filter-toggle-icon w-4 h-4 text-white/40 group-hover:text-white transition-all duration-300"></i>
                    </button>

                    <div class="px-6 py-8 space-y-6">
                        <?php foreach ($finish_terms as $finish) :
                            $is_active_finish = strtolower($active_finish) === strtolower($finish->slug);
                            // premium swatches
                            $finish_styles = [
                                'black-chrome' => 'background:linear-gradient(135deg,#4a4a4a,#111);',
                                'black-matt' => 'background:#1b1b1b;',
                                'blush-gold-bright-pvd' => 'background:#9c7854;',
                                'chrome' => 'background:linear-gradient(135deg,#f5f5f5,#bdbdbd);',
                                'gold-bright-pvd' => 'background:#c5a059;',
                            ];
                            $style = $finish_styles[$finish->slug] ?? 'background:#666;';
                        ?>
                            <a href="<?php echo esc_url(rc_shop_url(['finish' => $is_active_finish ? '' : $finish->slug])); ?>" class="flex items-center gap-4 group">

                                <!-- Swatch -->
                                <div style="<?php echo esc_attr($style); ?>" class="relative w-11 h-11 border flex items-center justify-center transition-all duration-300
                        <?php echo $is_active_finish ? 'border-[#c5a059]' : 'border-white/10 group-hover:border-white/30'; ?>">

                                    <?php if ($is_active_finish) : ?>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    <?php elseif ($finish->slug === 'black-chrome') : ?>
                                        <span class="text-white text-[11px] font-semibold tracking-wide">BC</span>
                                    <?php endif; ?>
                                </div>

                                <!-- Label -->
                                <span class="text-[11px] uppercase tracking-[0.22em] transition-all duration-300
                        <?php echo $is_active_finish ? 'text-white'  : 'text-white/40 group-hover:text-white/70'; ?>">
                                    <?php echo esc_html($finish->name); ?>
                                </span>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>

            <?php endif; ?>

            <!-- Brands -->
            <?php if (!empty($brands) && !is_wp_error($brands)) : ?>
                <div class="border border-white/5 bg-[#080808]">
                    <button data-filter-toggle class="group w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
                        <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">Brands</span>
                        <i data-lucide="minus" class="filter-toggle-icon w-4 h-4 text-white/40 group-hover:text-white transition-all duration-300"></i>
                    </button>
                    <div class="p-6 space-y-5">
                        <?php foreach ($brands as $brand) : $is_active_brand = $active_brand === $brand->slug; ?>
                            <a href="<?php echo esc_url(rc_shop_url(['brand' => $is_active_brand ? '' : $brand->slug])); ?>" class="flex items-center gap-4 group">
                                <span class="w-4 h-4 border border-white/20 flex items-center justify-center">
                                    <?php if ($is_active_brand) : ?>
                                        <span class="w-2 h-2 bg-[#c5a059]"></span>
                                    <?php endif; ?>
                                </span>
                                <span class="text-[11px] uppercase tracking-[0.25em] transition-colors <?php echo $is_active_brand ? 'text-[#c5a059]' : 'text-white/50 group-hover:text-white'; ?>"><?php echo esc_html($brand->name); ?></span>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Mounting -->
            <?php if (!empty($mountings) && !is_wp_error($mountings)) : ?>
                <div class="border border-white/5 bg-[#080808]">
                    <button data-filter-toggle class="group w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
                        <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">Mounting</span>
                        <i data-lucide="minus" class="filter-toggle-icon w-4 h-4 text-white/40 group-hover:text-white transition-all duration-300"></i>
                    </button>

                    <div class="p-6 space-y-5">
                        <?php foreach ($mountings as $mounting) : $is_active_mounting = ($active_mounting === $mounting->slug); ?>
                            <a href="<?php echo esc_url(rc_shop_url(['mounting' => $is_active_mounting ? '' : $mounting->slug])); ?>" class="flex items-center gap-4 group">
                                <span class="w-4 h-4 border border-white/20 flex items-center justify-center <?php echo $is_active_mounting ? 'bg-[#c5a059] border-[#c5a059]' : ''; ?>">
                                    <?php if ($is_active_mounting) : ?><i data-lucide="check" class="w-3 h-3 text-black"></i><?php endif; ?>
                                </span>
                                <span class="text-[11px] uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">
                                    <?php echo esc_html($mounting->name); ?>
                                </span>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Shapes -->
            <?php if (!empty($shapes) && !is_wp_error($shapes)) : ?>
                <div class="border border-white/5 bg-[#080808]">
                    <button data-filter-toggle class="group w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
                        <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">Shape</span>
                        <i data-lucide="minus" class="filter-toggle-icon w-4 h-4 text-white/40 group-hover:text-white transition-all duration-300"></i>
                    </button>

                    <div class="p-6 space-y-5">
                        <?php foreach ($shapes as $shape) : $is_active_shape = ($active_shape === $shape->slug); ?>
                            <a href="<?php echo esc_url(rc_shop_url(['shape' => $is_active_shape ? '' : $shape->slug])); ?>" class="flex items-center gap-4 group">
                                <span class="w-4 h-4 border border-white/20 flex items-center justify-center <?php echo $is_active_shape ? 'bg-[#c5a059] border-[#c5a059]' : ''; ?>">
                                    <?php if ($is_active_shape) : ?>
                                        <i data-lucide="check" class="w-3 h-3 text-black"></i>
                                    <?php endif; ?>
                                </span>
                                <span class="text-[11px] uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">
                                    <?php echo esc_html($shape->name); ?>
                                </span>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
        <?php endif; ?>
        <!-- Mobile filter backdrop -->
        <div id="mobile-filter-backdrop" class="fixed inset-0 bg-black/60 z-[590] hidden" onclick="document.getElementById('mobile-filter-panel').classList.add('translate-x-full'); this.classList.add('hidden');"></div>

        <!-- ── Footer ────────────────────────────────────────────────────────────── -->
    </div><!-- /pt-32 wrapper -->


</main>

<?php get_footer(); ?>