<?php
/**
 * Template for the Shop page — WooCommerce product listing with subcategory sidebar + filters.
 */
get_header();

// ── Category map: URL param → WooCommerce data ────────────────────────────────
$cat_map = [
    'tiles'    => [ 'slug' => 'architectural-surfaces', 'title' => 'Architectural Surfaces', 'tag' => 'Porcelain & Stone' ],
    'showers'  => [ 'slug' => 'luxury-showers',         'title' => 'Luxury Showers',         'tag' => 'Hydro-Therapy Systems' ],
    'faucets'  => [ 'slug' => 'artisan-faucets',        'title' => 'Artisan Faucets',         'tag' => 'Precision Engineered' ],
    'sanitary' => [ 'slug' => 'sanitary-form',          'title' => 'Sanitary Form',           'tag' => 'Hygiene Systems' ],
    'basins'   => [ 'slug' => 'minimal-basins',         'title' => 'Minimal Basins',          'tag' => 'Vessel Works' ],
    'frp'      => [ 'slug' => 'frp-manhole',            'title' => 'FRP Manhole',             'tag' => 'Infrastructural' ],
];

$cat_key = sanitize_text_field( $_GET['category'] ?? 'tiles' );
if ( ! isset( $cat_map[ $cat_key ] ) ) {
    $cat_key = 'tiles';
}
$cat_info = $cat_map[ $cat_key ];

// Active filters from URL
$active_sub_slug = sanitize_text_field( $_GET['sub'] ?? '' );
$active_finish   = sanitize_text_field( $_GET['finish'] ?? '' );
$sort            = sanitize_text_field( $_GET['sort'] ?? '' );

// ── Resolve parent WooCommerce term ──────────────────────────────────────────
$parent_term = get_term_by( 'slug', $cat_info['slug'], 'product_cat' );
$parent_id   = $parent_term ? (int) $parent_term->term_id : 0;

// ── Subcategories ────────────────────────────────────────────────────────────
$subcategories = $parent_id
    ? get_terms( [ 'taxonomy' => 'product_cat', 'parent' => $parent_id, 'hide_empty' => false ] )
    : [];

// ── Build WP_Query ───────────────────────────────────────────────────────────
$query_tax_slug   = $active_sub_slug ?: $cat_info['slug'];
$include_children = ! (bool) $active_sub_slug;

$query_args = [
    'post_type'      => 'product',
    'posts_per_page' => -1,
    'tax_query'      => [ [
        'taxonomy'         => 'product_cat',
        'field'            => 'slug',
        'terms'            => $query_tax_slug,
        'include_children' => $include_children,
    ] ],
];

// Sort
switch ( $sort ) {
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

// Finish filter
if ( $active_finish ) {
    $query_args['meta_query'] = [ [
        'key'     => '_rc_finish',
        'value'   => $active_finish,
        'compare' => '=',
    ] ];
}

$products_query = new WP_Query( $query_args );

// ── Gather available finishes for filter dropdown ────────────────────────────
$all_ids_args = [
    'post_type'      => 'product',
    'posts_per_page' => -1,
    'fields'         => 'ids',
    'tax_query'      => [ [
        'taxonomy'         => 'product_cat',
        'field'            => 'slug',
        'terms'            => $cat_info['slug'],
        'include_children' => true,
    ] ],
];
$finishes = [];
foreach ( get_posts( $all_ids_args ) as $pid ) {
    $f = get_post_meta( $pid, '_rc_finish', true );
    if ( $f && ! in_array( $f, $finishes, true ) ) {
        $finishes[] = $f;
    }
}
sort( $finishes );

// ── Nav + helpers ─────────────────────────────────────────────────────────────
$rc_nav_active = 'explore';

// URL builder helper
function rc_shop_url( $params = [] ) {
    global $cat_key, $active_sub_slug, $active_finish, $sort;
    $base = [
        'category' => $cat_key,
        'sub'      => $active_sub_slug,
        'finish'   => $active_finish,
        'sort'     => $sort,
    ];
    $merged = array_merge( $base, $params );
    $merged = array_filter( $merged ); // strip empty values
    return esc_url( add_query_arg( $merged, home_url( '/shop/' ) ) );
}

?>
<main id="site-content" role="main" class="bg-[#0a0a0a] min-h-screen font-sans text-white">

    <div class="pt-32 md:pt-48">

    <!-- ── Sticky Filter Bar ──────────────────────────────────────────────── -->
    <div class="sticky top-20 md:top-[172px] lg:top-[188px] z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
        <div class="max-w-[1720px] mx-auto px-6 md:px-12 flex items-center justify-between h-14 gap-4">

            <!-- Category Title (desktop) -->
            <div class="hidden lg:flex items-center gap-4 min-w-[260px]">
                <span class="text-[10px] uppercase tracking-[0.5em] text-[#c5a059] opacity-70"><?php echo esc_html( $cat_info['tag'] ); ?></span>
                <span class="text-white/10">|</span>
                <span class="text-[11px] uppercase tracking-[0.3em] text-white/60"><?php echo esc_html( $cat_info['title'] ); ?></span>
            </div>

            <!-- Filters -->
            <div class="flex items-center gap-3 flex-wrap">
                <!-- Finish Filter -->
                <?php if ( ! empty( $finishes ) ) : ?>
                <div class="relative group/filter">
                    <button class="flex items-center gap-2 px-4 py-1.5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-white/60 hover:border-white/30 hover:text-white transition-all <?php echo $active_finish ? 'border-[#c5a059]/50 text-[#c5a059]' : ''; ?>">
                        <?php echo $active_finish ? esc_html( $active_finish ) : 'Finish'; ?>
                        <svg class="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <div class="absolute top-full left-0 mt-1 min-w-[160px] bg-[#111] border border-white/10 py-1 shadow-2xl opacity-0 pointer-events-none group-hover/filter:opacity-100 group-hover/filter:pointer-events-auto transition-all z-50">
                        <?php if ( $active_finish ) : ?>
                        <a href="<?php echo rc_shop_url( [ 'finish' => '' ] ); ?>" class="block px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/5 transition-colors">All Finishes</a>
                        <?php endif; ?>
                        <?php foreach ( $finishes as $fin ) : ?>
                        <a href="<?php echo rc_shop_url( [ 'finish' => $fin ] ); ?>" class="block px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-colors <?php echo $active_finish === $fin ? 'text-[#c5a059]' : 'text-white/60 hover:text-white'; ?>">
                            <?php echo esc_html( $fin ); ?>
                        </a>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endif; ?>

                <!-- Sort -->
                <div class="relative group/sort">
                    <button class="flex items-center gap-2 px-4 py-1.5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-white/60 hover:border-white/30 hover:text-white transition-all <?php echo $sort ? 'border-[#c5a059]/50 text-[#c5a059]' : ''; ?>">
                        Sort
                        <svg class="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <div class="absolute top-full right-0 mt-1 min-w-[180px] bg-[#111] border border-white/10 py-1 shadow-2xl opacity-0 pointer-events-none group-hover/sort:opacity-100 group-hover/sort:pointer-events-auto transition-all z-50">
                        <?php
                        $sort_opts = [
                            ''           => 'Default',
                            'name_asc'   => 'Name A–Z',
                            'price_asc'  => 'Price: Low to High',
                            'price_desc' => 'Price: High to Low',
                        ];
                        foreach ( $sort_opts as $val => $label ) : ?>
                        <a href="<?php echo rc_shop_url( [ 'sort' => $val ] ); ?>" class="block px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-colors <?php echo $sort === $val ? 'text-[#c5a059]' : 'text-white/60 hover:text-white'; ?>">
                            <?php echo esc_html( $label ); ?>
                        </a>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Clear Filters -->
                <?php if ( $active_sub_slug || $active_finish || $sort ) : ?>
                <a href="<?php echo esc_url( add_query_arg( 'category', $cat_key, home_url( '/shop/' ) ) ); ?>" class="flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    Clear
                </a>
                <?php endif; ?>
            </div>

            <!-- Product Count + Mobile Filter Trigger -->
            <div class="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/30">
                <span><?php echo $products_query->post_count; ?> Items</span>
                <button onclick="document.getElementById('mobile-filter-panel').classList.toggle('translate-x-full')" class="lg:hidden flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/></svg>
                    Filter
                </button>
            </div>
        </div>
    </div>

    <!-- ── Main Layout ───────────────────────────────────────────────────────── -->
    <div class="max-w-[1720px] mx-auto px-6 md:px-12 flex gap-0">

        <!-- ── Sidebar: Subcategories (Desktop) ─────────────────────────────── -->
        <aside class="hidden lg:block w-64 xl:w-72 shrink-0 pt-12 pr-8">
            <div class="sticky top-[242px] lg:top-[246px]">
                <h3 class="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-8">Categories</h3>
                <nav class="space-y-1">
                    <!-- All -->
                    <a href="<?php echo esc_url( add_query_arg( 'category', $cat_key, home_url( '/shop/' ) ) ); ?>"
                       class="flex items-center justify-between py-3 px-4 text-[11px] uppercase tracking-[0.25em] transition-all group <?php echo ! $active_sub_slug ? 'text-[#c5a059] bg-white/5 border-l-2 border-[#c5a059]' : 'text-white/40 hover:text-white hover:bg-white/3'; ?>">
                        <span>All <?php echo esc_html( $cat_info['title'] ); ?></span>
                        <?php if ( ! $active_sub_slug ) : ?>
                        <span class="text-[9px] bg-[#c5a059]/10 text-[#c5a059] px-2 py-0.5 rounded-sm">
                            <?php echo (int) $products_query->found_posts; ?>
                        </span>
                        <?php endif; ?>
                    </a>

                    <?php if ( ! empty( $subcategories ) && ! is_wp_error( $subcategories ) ) :
                        foreach ( $subcategories as $sub ) :
                            $is_active = $active_sub_slug === $sub->slug;
                            // Product count in this subcategory
                            $sub_count = $sub->count;
                    ?>
                    <a href="<?php echo esc_url( add_query_arg( [ 'category' => $cat_key, 'sub' => $sub->slug ], home_url( '/shop/' ) ) ); ?>"
                       class="flex items-center justify-between py-3 px-4 text-[11px] uppercase tracking-[0.25em] transition-all group <?php echo $is_active ? 'text-[#c5a059] bg-white/5 border-l-2 border-[#c5a059]' : 'text-white/40 hover:text-white hover:bg-white/3 border-l-2 border-transparent'; ?>">
                        <span><?php echo esc_html( $sub->name ); ?></span>
                        <?php if ( $sub_count > 0 ) : ?>
                        <span class="text-[9px] <?php echo $is_active ? 'bg-[#c5a059]/10 text-[#c5a059]' : 'text-white/20 group-hover:text-white/40'; ?> px-2 py-0.5 rounded-sm transition-colors">
                            <?php echo (int) $sub_count; ?>
                        </span>
                        <?php endif; ?>
                    </a>
                    <?php endforeach; endif; ?>
                </nav>

                <!-- Active filter tags -->
                <?php if ( $active_finish ) : ?>
                <div class="mt-10 pt-8 border-t border-white/5">
                    <h3 class="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-6">Active Filters</h3>
                    <div class="flex flex-wrap gap-2">
                        <a href="<?php echo rc_shop_url( [ 'finish' => '' ] ); ?>" class="flex items-center gap-2 px-3 py-1.5 bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-[9px] uppercase tracking-[0.2em] hover:bg-[#c5a059]/20 transition-colors">
                            <?php echo esc_html( $active_finish ); ?>
                            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </a>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </aside>

        <!-- ── Product Grid ───────────────────────────────────────────────────── -->
        <section class="flex-1 min-w-0 py-12">
            <?php if ( $products_query->have_posts() ) : ?>
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
                <?php while ( $products_query->have_posts() ) : $products_query->the_post();
                    $post_id    = get_the_ID();
                    $sku        = get_post_meta( $post_id, '_sku',           true );
                    $price      = get_post_meta( $post_id, '_price',         true );
                    $size       = get_post_meta( $post_id, '_rc_size',       true );
                    $finish     = get_post_meta( $post_id, '_rc_finish',     true );
                    $img_url    = get_post_meta( $post_id, '_rc_image_url',  true );
                    $thumb      = get_the_post_thumbnail_url( $post_id, 'large' );
                    $image      = $thumb ?: ( $img_url ?: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800' );
                    $permalink  = get_permalink();
                    $add_to_cart = esc_url( add_query_arg( 'add-to-cart', $post_id, home_url( '/shop/' ) ) );
                ?>
                <article class="group relative bg-[#111] overflow-hidden cursor-pointer">
                    <!-- Image -->
                    <div class="relative aspect-[4/5] overflow-hidden bg-[#0d0d0d]">
                        <img src="<?php echo esc_url( $image ); ?>"
                             alt="<?php echo esc_attr( get_the_title() ); ?>"
                             loading="lazy"
                             class="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110 opacity-80">
                        <!-- Hover Overlay -->
                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3 p-6">
                            <a href="<?php echo $add_to_cart; ?>" class="w-full text-center px-6 py-3 bg-[#c5a059] text-black text-[10px] uppercase tracking-[0.4em] font-medium hover:bg-white transition-colors">
                                Add to Cart
                            </a>
                            <a href="<?php echo esc_url( $permalink ); ?>" class="w-full text-center px-6 py-3 border border-white/30 text-[10px] uppercase tracking-[0.4em] text-white hover:bg-white hover:text-black transition-all">
                                View Details
                            </a>
                        </div>
                    </div>
                    <!-- Info -->
                    <div class="p-5 space-y-2 border-t border-white/5">
                        <div class="flex items-start justify-between gap-2">
                            <h3 class="text-[13px] font-display font-light uppercase tracking-[0.15em] group-hover:text-[#c5a059] transition-colors leading-tight">
                                <?php the_title(); ?>
                            </h3>
                            <?php if ( $price ) : ?>
                            <span class="shrink-0 text-[11px] text-[#c5a059] font-light tracking-wide whitespace-nowrap">
                                ₹<?php echo esc_html( number_format( (float) $price ) ); ?>
                            </span>
                            <?php endif; ?>
                        </div>
                        <div class="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-white/30">
                            <?php if ( $sku ) : ?>
                            <span><?php echo esc_html( $sku ); ?></span>
                            <?php endif; ?>
                            <?php if ( $finish ) : ?>
                            <span class="flex items-center gap-1.5">
                                <span class="w-1 h-1 rounded-full bg-white/20"></span>
                                <?php echo esc_html( $finish ); ?>
                            </span>
                            <?php endif; ?>
                            <?php if ( $size ) : ?>
                            <span class="flex items-center gap-1.5">
                                <span class="w-1 h-1 rounded-full bg-white/20"></span>
                                <?php echo esc_html( $size ); ?>
                            </span>
                            <?php endif; ?>
                        </div>
                    </div>
                </article>
                <?php endwhile; wp_reset_postdata(); ?>
            </div>

            <?php else : ?>
            <!-- No products found -->
            <div class="flex flex-col items-center justify-center py-32 text-center">
                <div class="w-16 h-px bg-[#c5a059]/30 mb-12 mx-auto"></div>
                <p class="text-[11px] uppercase tracking-[0.5em] text-white/20 mb-4">No products found</p>
                <a href="<?php echo esc_url( add_query_arg( 'category', $cat_key, home_url( '/shop/' ) ) ); ?>" class="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] hover:underline mt-4">
                    View All <?php echo esc_html( $cat_info['title'] ); ?>
                </a>
            </div>
            <?php endif; ?>
        </section>
    </div>

    <!-- ── Mobile Filter Panel ────────────────────────────────────────────────── -->
    <div id="mobile-filter-panel" class="fixed inset-y-0 right-0 w-80 max-w-full bg-[#0d0d0d] border-l border-white/10 z-[600] translate-x-full transition-transform duration-500 overflow-y-auto">
        <div class="flex items-center justify-between p-6 border-b border-white/5">
            <span class="text-[11px] uppercase tracking-[0.4em] text-white/60">Filter & Browse</span>
            <button onclick="document.getElementById('mobile-filter-panel').classList.add('translate-x-full')" class="text-white/40 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
        <div class="p-6 space-y-10">
            <!-- Subcategories -->
            <div>
                <h4 class="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-5">Category</h4>
                <div class="space-y-1">
                    <a href="<?php echo esc_url( add_query_arg( 'category', $cat_key, home_url( '/shop/' ) ) ); ?>" class="block py-3 text-[11px] uppercase tracking-[0.25em] border-b border-white/5 <?php echo ! $active_sub_slug ? 'text-[#c5a059]' : 'text-white/50 hover:text-white'; ?> transition-colors">
                        All <?php echo esc_html( $cat_info['title'] ); ?>
                    </a>
                    <?php foreach ( $subcategories as $sub ) : $is_active = $active_sub_slug === $sub->slug; ?>
                    <a href="<?php echo esc_url( add_query_arg( [ 'category' => $cat_key, 'sub' => $sub->slug ], home_url( '/shop/' ) ) ); ?>" class="block py-3 text-[11px] uppercase tracking-[0.25em] border-b border-white/5 <?php echo $is_active ? 'text-[#c5a059]' : 'text-white/50 hover:text-white'; ?> transition-colors">
                        <?php echo esc_html( $sub->name ); ?>
                    </a>
                    <?php endforeach; ?>
                </div>
            </div>
            <!-- Finish -->
            <?php if ( ! empty( $finishes ) ) : ?>
            <div>
                <h4 class="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-5">Finish</h4>
                <div class="flex flex-wrap gap-2">
                    <?php if ( $active_finish ) : ?>
                    <a href="<?php echo rc_shop_url( [ 'finish' => '' ] ); ?>" class="px-3 py-1.5 border border-white/10 text-[9px] uppercase tracking-[0.2em] text-white/40 hover:text-white hover:border-white/30 transition-all">All</a>
                    <?php endif; ?>
                    <?php foreach ( $finishes as $fin ) : ?>
                    <a href="<?php echo rc_shop_url( [ 'finish' => $fin ] ); ?>" class="px-3 py-1.5 border text-[9px] uppercase tracking-[0.2em] transition-all <?php echo $active_finish === $fin ? 'border-[#c5a059] text-[#c5a059]' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'; ?>">
                        <?php echo esc_html( $fin ); ?>
                    </a>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>
            <!-- Sort -->
            <div>
                <h4 class="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-5">Sort By</h4>
                <div class="space-y-1">
                    <?php foreach ( [ '' => 'Default', 'name_asc' => 'Name A–Z', 'price_asc' => 'Price: Low to High', 'price_desc' => 'Price: High to Low' ] as $val => $label ) : ?>
                    <a href="<?php echo rc_shop_url( [ 'sort' => $val ] ); ?>" class="block py-2.5 text-[11px] uppercase tracking-[0.25em] border-b border-white/5 <?php echo $sort === $val ? 'text-[#c5a059]' : 'text-white/40 hover:text-white'; ?> transition-colors">
                        <?php echo esc_html( $label ); ?>
                    </a>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <!-- Mobile filter backdrop -->
    <div id="mobile-filter-backdrop" class="fixed inset-0 bg-black/60 z-[590] hidden" onclick="document.getElementById('mobile-filter-panel').classList.add('translate-x-full'); this.classList.add('hidden');"></div>
    <script>
    // Show backdrop when panel is open
    const filterPanel = document.getElementById('mobile-filter-panel');
    const filterBackdrop = document.getElementById('mobile-filter-backdrop');
    const observer = new MutationObserver(() => {
        filterBackdrop.classList.toggle('hidden', filterPanel.classList.contains('translate-x-full'));
    });
    observer.observe(filterPanel, { attributes: true, attributeFilter: ['class'] });
    </script>

    <!-- ── Footer ────────────────────────────────────────────────────────────── -->
    </div><!-- /pt-32 wrapper -->
    

</main>

<?php get_footer(); ?>
