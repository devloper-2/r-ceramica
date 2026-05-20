<?php
defined( 'ABSPATH' ) || exit;

global $product;

if ( ! $product || ! $product->is_visible() ) {
    return;
}
?>

<li <?php wc_product_class( 'group relative overflow-hidden bg-black', $product ); ?>>

    <a href="<?php the_permalink(); ?>" class="block relative overflow-hidden">

        <!-- Product Image -->
        <div class="relative aspect-[3/4] overflow-hidden bg-[#111]">

            <?php echo woocommerce_get_product_thumbnail( 'full' ); ?>

            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3 p-6">

                <!-- Add To Cart -->
                <?php woocommerce_template_loop_add_to_cart(); ?>

                <!-- View Details -->
                <span class="mt-5 border border-white/30 text-white uppercase tracking-[0.35em] text-[11px] px-10 py-4 w-full text-center">
                    View Details
                </span>

            </div>

        </div>

        <!-- Bottom Content -->
<div class="p-5 space-y-2 border-t border-white/5">

    <div class="flex items-start justify-between gap-2">

        <!-- Title -->
        <h3 class="text-[13px] font-display font-light uppercase tracking-[0.15em] leading-snug text-white group-hover:text-[#c5a059] transition-colors duration-300 p-0">

            <?php the_title(); ?>

        </h3>

        <!-- Price -->
        <span class="shrink-0 text-[11px] text-[#c5a059] font-light tracking-wide whitespace-nowrap">

            <?php echo wp_strip_all_tags( $product->get_price_html() ); ?>

        </span>

    </div>

</div>

    </a>

</li>