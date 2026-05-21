<?php
/**
 * Template Name: Products Page
 */

get_header();

$paged = max(1, get_query_var('paged'));

$active_category = isset($_GET['category']) ? sanitize_text_field($_GET['category']) : '';
$active_finish   = isset($_GET['finish']) ? sanitize_text_field($_GET['finish']) : '';
$active_brand    = isset($_GET['brand']) ? sanitize_text_field($_GET['brand']) : '';
$active_shape    = isset($_GET['shape']) ? sanitize_text_field($_GET['shape']) : '';
$active_mounting = isset($_GET['mounting']) ? sanitize_text_field($_GET['mounting']) : '';
$active_area     = isset($_GET['area']) ? sanitize_text_field($_GET['area']) : '';

$min_price = isset($_GET['min_price']) ? intval($_GET['min_price']) : 0;
$max_price = isset($_GET['max_price']) ? intval($_GET['max_price']) : 50000;

/* ----------------------------------------
   TAX QUERY
---------------------------------------- */

$tax_query = [];

if ($active_category) {
    $tax_query[] = [
        'taxonomy' => 'product_cat',
        'field'    => 'slug',
        'terms'    => $active_category,
    ];
}

if ($active_finish) {
    $tax_query[] = [
        'taxonomy' => 'pa_finish',
        'field'    => 'slug',
        'terms'    => $active_finish,
    ];
}

if ($active_brand) {
    $tax_query[] = [
        'taxonomy' => 'pa_brand',
        'field'    => 'slug',
        'terms'    => $active_brand,
    ];
}

if ($active_shape) {
    $tax_query[] = [
        'taxonomy' => 'pa_shape',
        'field'    => 'slug',
        'terms'    => $active_shape,
    ];
}

if ($active_mounting) {
    $tax_query[] = [
        'taxonomy' => 'pa_mounting',
        'field'    => 'slug',
        'terms'    => $active_mounting,
    ];
}

if ($active_area) {
    $tax_query[] = [
        'taxonomy' => 'pa_area',
        'field'    => 'slug',
        'terms'    => $active_area,
    ];
}

/* ----------------------------------------
   PRODUCT QUERY
---------------------------------------- */

$query_args = [
    'post_type'      => 'product',
    'posts_per_page' => 12,
    'paged'          => $paged,
    'meta_query'     => [[
        'key'     => '_price',
        'value'   => [$min_price, $max_price],
        'compare' => 'BETWEEN',
        'type'    => 'NUMERIC',
    ]]
];

if (!empty($tax_query)) {
    $query_args['tax_query'] = $tax_query;
}

$products_query = new WP_Query($query_args);

/* ----------------------------------------
   FILTER TERMS
---------------------------------------- */

$product_categories = get_terms([
    'taxonomy'   => 'product_cat',
    'hide_empty' => true,
    'parent'     => 0,
]);

$finish_terms = get_terms([
    'taxonomy'   => 'pa_finish',
    'hide_empty' => true,
]);

$brand_terms = get_terms([
    'taxonomy'   => 'pa_brand',
    'hide_empty' => true,
]);

$shape_terms = get_terms([
    'taxonomy'   => 'pa_shape',
    'hide_empty' => true,
]);

$mounting_terms = get_terms([
    'taxonomy'   => 'pa_mounting',
    'hide_empty' => true,
]);

$area_terms = get_terms([
    'taxonomy'   => 'pa_area',
    'hide_empty' => true,
]);

/* ----------------------------------------
   URL FUNCTION
---------------------------------------- */

function rc_products_url($args = [])
{
    return add_query_arg(
        array_merge($_GET, $args),
        home_url('/products/')
    );
}
?>

<main id="site-content" role="main">

<div class="max-w-[1720px] mx-auto px-6 md:px-12 flex gap-0 pt-48">

    <!-- SIDEBAR -->
    <aside class="hidden lg:block w-72 shrink-0 pt-12 pr-10">

        <div class="sticky top-[220px] space-y-10">

            <!-- SELECTED OPTIONS -->
            <div class="bg-[#111] border border-white/5 p-6">

                <h3 class="text-[10px] uppercase tracking-[0.45em] text-white/40 mb-5">
                    Selected Options
                </h3>

                <div class="flex flex-wrap gap-3">

                    <?php if ($active_category) : ?>
                        <a href="<?php echo esc_url(rc_products_url(['category' => ''])); ?>"
                           class="h-10 px-4 bg-white/10 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white">

                            <?php echo esc_html($active_category); ?>

                            <i data-lucide="x" class="w-3 h-3"></i>
                        </a>
                    <?php endif; ?>

                    <?php if ($active_finish) : ?>
                        <a href="<?php echo esc_url(rc_products_url(['finish' => ''])); ?>"
                           class="h-10 px-4 bg-white/10 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white">

                            <?php echo esc_html($active_finish); ?>

                            <i data-lucide="x" class="w-3 h-3"></i>
                        </a>
                    <?php endif; ?>

                    <?php if ($active_brand) : ?>
                        <a href="<?php echo esc_url(rc_products_url(['brand' => ''])); ?>"
                           class="h-10 px-4 bg-white/10 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white">

                            <?php echo esc_html($active_brand); ?>

                            <i data-lucide="x" class="w-3 h-3"></i>
                        </a>
                    <?php endif; ?>

                </div>

                <a href="<?php echo esc_url(home_url('/products/')); ?>"
                   class="mt-5 h-12 border border-white/10 flex items-center justify-center text-[10px] uppercase tracking-[0.45em] text-white/60 hover:text-white hover:border-[#c5a059] transition-all">

                    Reset All

                </a>

            </div>

            <!-- CATEGORIES -->
            <div class="border border-white/5">

                <button onclick="toggleAccordion('categories-filter')"
                        class="w-full flex items-center justify-between px-6 py-5 border-b border-white/5">

                    <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">
                        Categories
                    </span>

                    <span id="categories-filter-icon" class="text-white/40 text-sm">—</span>

                </button>

                <div id="categories-filter" class="px-4 py-4 bg-black/40 space-y-1">

                    <?php foreach ($product_categories as $cat) :

                        $is_active = $active_category === $cat->slug;

                    ?>

                    <a href="<?php echo esc_url(rc_products_url([
                        'category' => $cat->slug
                    ])); ?>"

                       class="flex items-center justify-between py-3 px-4 text-[11px] uppercase tracking-[0.25em] transition-all <?php echo $is_active
                            ? 'text-[#c5a059] bg-white/5 border-l-2 border-[#c5a059]'
                            : 'text-white/40 hover:text-white hover:bg-white/3 border-l-2 border-transparent'; ?>">

                        <span><?php echo esc_html($cat->name); ?></span>

                        <span class="text-[9px] opacity-50">
                            <?php echo $cat->count; ?>
                        </span>

                    </a>

                    <?php endforeach; ?>

                </div>

            </div>
<!-- BUDGET RANGE -->
<div class="border border-white/5">

    <button onclick="toggleAccordion('budget-filter')"
            class="w-full flex items-center justify-between px-6 py-5 border-b border-white/5">

        <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">
            Budget Range
        </span>

        <span id="budget-filter-icon" class="text-white/40 text-sm">—</span>

    </button>

    <div id="budget-filter" class="p-6 bg-black/40">

    <form method="GET">

        <?php foreach ($_GET as $key => $value) :

            if ($key === 'min_price' || $key === 'max_price') {
                continue;
            }

        ?>

            <input type="hidden"
                   name="<?php echo esc_attr($key); ?>"
                   value="<?php echo esc_attr($value); ?>">

        <?php endforeach; ?>

        <div class="flex justify-between text-[10px] uppercase tracking-[0.25em] text-white/40 mb-6">
            <span>Min: ₹0</span>
            <span>Max: ₹50,000</span>
        </div>

        <input type="range"
               id="priceRange"
               min="0"
               max="50000"
               step="200"
               value="<?php echo esc_attr($max_price); ?>"
               class="w-full mb-6">

        <div class="grid grid-cols-2 gap-4 mb-6">

            <div>

                <label class="block text-[9px] uppercase tracking-[0.25em] text-white/30 mb-2">
                    Min Budget
                </label>

                <input type="number"
                       id="minPrice"
                       name="min_price"
                       value="<?php echo esc_attr($min_price); ?>"
                       class="w-full h-12 bg-transparent border border-white/10 px-4 text-white outline-none">

            </div>

            <div>

                <label class="block text-[9px] uppercase tracking-[0.25em] text-white/30 mb-2">
                    Max Budget
                </label>

                <input type="number"
                       id="maxPrice"
                       name="max_price"
                       value="<?php echo esc_attr($max_price); ?>"
                       class="w-full h-12 bg-transparent border border-white/10 px-4 text-white outline-none">

            </div>

        </div>

        <button type="submit"
                class="w-full h-14 border border-[#c5a059]/40 text-[#c5a059] text-[10px] uppercase tracking-[0.45em] hover:bg-[#c5a059] hover:text-black transition-all">

            Apply Range

        </button>

    </form>

</div>


</div>
            <!-- COLOR FINISHES -->
            <div class="border border-white/5">

                <button onclick="toggleAccordion('finish-filter')"
                        class="w-full flex items-center justify-between px-6 py-5 border-b border-white/5">

                    <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">
                        Color Finishes
                    </span>

                    <span id="finish-filter-icon" class="text-white/40 text-sm">—</span>

                </button>

                <div id="finish-filter" class="px-6 py-6 bg-black/40 space-y-4">

                    <?php foreach ($finish_terms as $term) :

                        $is_active = $active_finish === $term->slug;

                    ?>

                    <a href="<?php echo esc_url(rc_products_url([
                        'finish' => $term->slug
                    ])); ?>"

                       class="flex items-center gap-4 group">

                        <div class="w-5 h-5 border <?php echo $is_active
                            ? 'border-[#c5a059] bg-[#c5a059]'
                            : 'border-white/20'; ?>"></div>

                        <span class="text-[10px] uppercase tracking-[0.25em] <?php echo $is_active
                            ? 'text-white'
                            : 'text-white/50'; ?>">

                            <?php echo esc_html($term->name); ?>

                        </span>

                    </a>

                    <?php endforeach; ?>

                </div>

            </div>
            <!-- BRANDS -->
<div class="border border-white/5">

    <button onclick="toggleAccordion('brand-filter')"
            class="w-full flex items-center justify-between px-6 py-5 border-b border-white/5">

        <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">
            Brands
        </span>

        <span id="brand-filter-icon" class="text-white/40 text-sm">+</span>

    </button>

    <div id="brand-filter"
         class="px-6 py-6 bg-black/40 space-y-4 hidden">

        <?php foreach ($brand_terms as $term) :

            $is_active = $active_brand === $term->slug;

        ?>

        <a href="<?php echo esc_url(rc_products_url([
            'brand' => $term->slug
        ])); ?>"

           class="flex items-center gap-4 group">

            <div class="w-5 h-5 border flex items-center justify-center <?php echo $is_active
                ? 'border-[#c5a059] bg-[#c5a059]'
                : 'border-white/20'; ?>">

                <?php if ($is_active) : ?>
                    <span class="text-black text-[10px]">✓</span>
                <?php endif; ?>

            </div>

            <span class="text-[10px] uppercase tracking-[0.25em] <?php echo $is_active
                ? 'text-white'
                : 'text-white/50'; ?>">

                <?php echo esc_html($term->name); ?>

            </span>

        </a>

        <?php endforeach; ?>

    </div>

</div>

<!-- MOUNTING -->
<div class="border border-white/5">

    <button onclick="toggleAccordion('mounting-filter')"
            class="w-full flex items-center justify-between px-6 py-5 border-b border-white/5">

        <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">
            Mounting
        </span>

        <span id="mounting-filter-icon" class="text-white/40 text-sm">+</span>

    </button>

    <div id="mounting-filter"
         class="px-6 py-6 bg-black/40 space-y-4 hidden">

        <?php foreach ($mounting_terms as $term) :

            $is_active = $active_mounting === $term->slug;

        ?>

        <a href="<?php echo esc_url(rc_products_url([
            'mounting' => $term->slug
        ])); ?>"

           class="flex items-center gap-4 group">

            <div class="w-5 h-5 border flex items-center justify-center <?php echo $is_active
                ? 'border-[#c5a059] bg-[#c5a059]'
                : 'border-white/20'; ?>">

                <?php if ($is_active) : ?>
                    <span class="text-black text-[10px]">✓</span>
                <?php endif; ?>

            </div>

            <span class="text-[10px] uppercase tracking-[0.25em] <?php echo $is_active
                ? 'text-white'
                : 'text-white/50'; ?>">

                <?php echo esc_html($term->name); ?>

            </span>

        </a>

        <?php endforeach; ?>

    </div>

</div>

<!-- SHAPE -->
<div class="border border-white/5">

    <button onclick="toggleAccordion('shape-filter')"
            class="w-full flex items-center justify-between px-6 py-5 border-b border-white/5">

        <span class="text-[10px] uppercase tracking-[0.45em] text-white/70">
            Shape
        </span>

        <span id="shape-filter-icon" class="text-white/40 text-sm">+</span>

    </button>

    <div id="shape-filter"
         class="px-6 py-6 bg-black/40 space-y-4 hidden">

        <?php foreach ($shape_terms as $term) :

            $is_active = $active_shape === $term->slug;

        ?>

        <a href="<?php echo esc_url(rc_products_url([
            'shape' => $term->slug
        ])); ?>"

           class="flex items-center gap-4 group">

            <div class="w-5 h-5 border flex items-center justify-center <?php echo $is_active
                ? 'border-[#c5a059] bg-[#c5a059]'
                : 'border-white/20'; ?>">

                <?php if ($is_active) : ?>
                    <span class="text-black text-[10px]">✓</span>
                <?php endif; ?>

            </div>

            <span class="text-[10px] uppercase tracking-[0.25em] <?php echo $is_active
                ? 'text-white'
                : 'text-white/50'; ?>">

                <?php echo esc_html($term->name); ?>

            </span>

        </a>

        <?php endforeach; ?>

    </div>

</div>

        </div>

    </aside>

    <!-- PRODUCTS -->
    <div class="flex-1 min-w-0 py-12">

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">

            <?php if ($products_query->have_posts()) : ?>

                <?php while ($products_query->have_posts()) : $products_query->the_post();

                    $post_id   = get_the_ID();

$sku       = get_post_meta($post_id, '_sku', true);

$price     = get_post_meta($post_id, '_price', true);

$size      = get_post_meta($post_id, '_rc_size', true);

$finish    = get_post_meta($post_id, '_rc_finish', true);

$img_url   = get_post_meta($post_id, '_rc_image_url', true);

$thumb     = get_the_post_thumbnail_url($post_id, 'large');

$image     = $thumb ?: ($img_url ?: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800');

$permalink = get_permalink();

$product   = wc_get_product($post_id);

                ?>

                <article class="group relative bg-[#111] overflow-hidden">

                    <div class="relative aspect-[4/5] overflow-hidden bg-[#0d0d0d]">

                        <a href="<?php the_permalink(); ?>">

                           <img src="<?php echo esc_url($image); ?>"
         alt="<?php echo esc_attr(get_the_title()); ?>"
         loading="lazy"
         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">

                        </a>

                    </div>

                    <div class="p-6 text-center space-y-3">

                        <h3 class="text-[11px] uppercase tracking-[0.35em] text-[#c5a059]">
                            Fusion Series
                        </h3>

                        <h2 class="text-[20px] uppercase tracking-[0.08em] text-white">
                            <?php the_title(); ?>
                        </h2>

                        <?php if ($sku) : ?>

                            <p class="text-white/30 text-[11px] uppercase tracking-[0.25em]">
                                <?php echo esc_html($sku); ?>
                            </p>

                        <?php endif; ?>

                        <p class="text-white text-[32px] font-light">
                            ₹<?php echo number_format($price); ?>
                        </p>

                        <div class="pt-6 space-y-4 viewcartpopup">

                            <a href="<?php echo esc_url( $product->add_to_cart_url() ); ?>" data-quantity="1" data-product_id="<?php echo esc_attr( $product->get_id() ); ?>" data-product_sku="<?php echo esc_attr( $product->get_sku() ); ?>" aria-label="<?php echo esc_attr( $product->add_to_cart_description() ); ?>" rel="nofollow" class="rc-add-to-cart add_to_cart_button ajax_add_to_cart product_type_simple h-14 w-full border border-white bg-white text-black text-[11px] uppercase tracking-[0.45em] flex items-center justify-center gap-3 hover:bg-[#c5a059] hover:border-[#c5a059] transition-all duration-300"><i data-lucide="shopping-cart" size="14"></i>Add To Cart</a>

                            <a href="<?php the_permalink(); ?>"
                               class="h-14 w-full border border-white/10 flex items-center justify-center text-[10px] uppercase tracking-[0.45em] text-white hover:border-[#c5a059] transition-all"> View Details</a>

                        </div>

                    </div>

                </article>

                <?php endwhile; ?>

            <?php endif; ?>

        </div>

        <!-- PAGINATION -->
        <div class="pt-20 flex justify-center">

            <?php
            echo paginate_links([
                'total'      => $products_query->max_num_pages,
                'current'    => $paged,
                'mid_size'   => 1,
                'prev_text'  => '←',
                'next_text'  => '→',
            ]);
            ?>

        </div>

    </div>

</div>

</main>

<script>
function toggleAccordion(id) {

    const content = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');

    if (content.style.display === 'none') {

        content.style.display = 'block';
        icon.innerHTML = '—';

    } else {

        content.style.display = 'none';
        icon.innerHTML = '+';
    }
}
</script>
<?php
wc_enqueue_js("
    $(document.body).on('added_to_cart', function() {
        $(document.body).trigger('wc_fragment_refresh');
    });
");
?>

<?php get_footer(); ?>