<?php
defined( 'ABSPATH' ) || exit;

global $product;

do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
    echo get_the_password_form();
    return;
}
?>

<div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'max-w-7xl mx-auto px-6 lg:px-12 spacenav', $product ); ?>>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        <!-- Product Images -->
        <div>
            <?php do_action( 'woocommerce_before_single_product_summary' ); ?>
        </div>

        <!-- Product Summary -->
        <div class="space-y-6">
             <!-- Product Title -->
    <?php woocommerce_template_single_title(); ?>

    <!-- Price -->
    <?php woocommerce_template_single_price(); ?>

    <!-- Add To Cart -->
    <?php woocommerce_template_single_add_to_cart(); ?>

    <!-- Meta -->
    <?php woocommerce_template_single_meta(); ?>
        </div>

    </div>

    <!-- Tabs / Description -->
    <div class="mt-20">
        <?php do_action( 'woocommerce_after_single_product_summary' ); ?>
    </div>

</div>

<?php do_action( 'woocommerce_after_single_product' ); ?>

