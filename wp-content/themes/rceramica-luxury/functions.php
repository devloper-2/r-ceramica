<?php
/**
 * Theme functions and definitions for R Ceramica Luxury Surfaces.
 */

if ( ! function_exists( 'rceramica_luxury_setup' ) ) {
    function rceramica_luxury_setup() {
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
        add_theme_support( 'custom-logo' );
        add_theme_support( 'responsive-embeds' );

        register_nav_menus( array(
            'primary' => __( 'Primary Menu', 'rceramica-luxury' ),
        ) );
    }
}
add_action( 'after_setup_theme', 'rceramica_luxury_setup' );

function rceramica_luxury_scripts() {
    wp_enqueue_style( 'rceramica-luxury-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'rceramica-luxury-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Outfit:wght@300;400;500&family=Plus+Jakarta+Sans:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;1,400&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0&display=swap', array(), null );
    wp_enqueue_style( 'rceramica-luxury-theme', get_theme_file_uri( '/assets/css/theme.css' ), array( 'rceramica-luxury-style' ), wp_get_theme()->get( 'Version' ) );

    wp_enqueue_script( 'rceramica-luxury-tailwind', 'https://cdn.tailwindcss.com', array(), null, false );
    wp_add_inline_script( 'rceramica-luxury-tailwind', "tailwind.config = { theme: { extend: { fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Outfit', 'sans-serif'], }, }, }, };" );
    wp_script_add_data( 'rceramica-luxury-tailwind', 'defer', true );

    wp_enqueue_script( 'rceramica-luxury-lucide', 'https://unpkg.com/lucide@latest', array(), null, true );
    wp_script_add_data( 'rceramica-luxury-lucide', 'defer', true );
    wp_enqueue_script( 'rceramica-luxury-theme', get_theme_file_uri( '/assets/js/theme.js' ), array( 'rceramica-luxury-lucide' ), wp_get_theme()->get( 'Version' ), true );
    wp_script_add_data( 'rceramica-luxury-theme', 'defer', true );
}
add_action( 'wp_enqueue_scripts', 'rceramica_luxury_scripts' );

function rceramica_luxury_preconnect_hints() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
    echo '<link rel="preconnect" href="https://unpkg.com">' . "\n";
}
add_action( 'wp_head', 'rceramica_luxury_preconnect_hints', 1 );

function rc_custom_woocommerce_placeholder_img( $image, $product ) {

    if ( has_post_thumbnail( $product->get_id() ) ) {
        return $image;
    }

    $placeholder = get_template_directory_uri() . '/assets/images/placeholder.webp';

    return '<img src="' . esc_url( $placeholder ) . '" alt="Placeholder" class="w-full h-full object-cover" />';

}

add_filter( 'woocommerce_product_get_image', 'rc_custom_woocommerce_placeholder_img', 10, 2 );
add_filter( 'woocommerce_placeholder_img_src', 'rc_custom_placeholder_img' );

function rc_custom_placeholder_img() {

    return get_template_directory_uri() . '/assets/images/placeholder.webp';

}


add_action( 'wp_footer', 'rc_refresh_cart_fragments' );

add_filter('woocommerce_add_to_cart_fragments', function($fragments) {

    ob_start();
    ?>

    <span class="cart-count-header absolute -top-2 -right-3 bg-white text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
        <?php echo WC()->cart->get_cart_contents_count(); ?>
    </span>

    <?php

    $fragments['.cart-count-header'] = ob_get_clean();

    return $fragments;
});

function rc_refresh_cart_fragments() {
    ?>

    <script>
    jQuery(function($){

        $(document.body).on('added_to_cart removed_from_cart updated_cart_totals', function(){

            $.ajax({
                url: wc_cart_fragments_params.wc_ajax_url
                    .toString()
                    .replace('%%endpoint%%', 'get_refreshed_fragments'),
                type: 'POST',

                success: function(data){

                    if (data && data.fragments) {

                        $.each(data.fragments, function(key, value) {

                            $(key).replaceWith(value);

                        });

                    }

                }

            });

        });

    });
    </script>

    <?php
}
add_action('wp_footer', 'rc_refresh_cart_fragments', 100);

add_filter('woocommerce_add_to_cart_fragments', function($fragments) {

    ob_start();
    ?>

    <span class="cart-count-header absolute -top-2 -right-3 bg-white text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
        <?php echo WC()->cart->get_cart_contents_count(); ?>
    </span>

    <?php

    $fragments['.cart-count-header'] = ob_get_clean();

    return $fragments;
});
add_action('wp_enqueue_scripts', function () {

    wp_enqueue_script('wc-cart-fragments');

}, 100);
require_once get_template_directory() . '/inc/whatsapp-login.php';