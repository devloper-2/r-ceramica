<?php
/**
 * Template for the Cart page.
 */
add_filter('body_class', function($classes) {
    $classes[] = 'headernone';
    return $classes;
});
get_header();

?>

 <!-- Simplified Checkout Header -->
    <header class="fixed top-0 left-0 w-full z-[100] bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 h-20">
        <div class="max-w-[1720px] mx-auto px-4 md:px-6 h-full flex justify-between items-center">
            <a href="<?php echo esc_url( home_url( "/cart/" ) ); ?>" class="flex-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
                <i data-lucide="arrow-left" size="14"></i>
                <span class="hidden sm:inline">Back to Cart</span>
                <span class="sm:hidden">Cart</span>
            </a>
            <div class="absolute left-1/2 -translate-x-1/2 flex justify-center">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.webp" alt="R Ceramica" class="cartlogo">
            </div>
            <div class="flex-1 flex justify-end">
                <div class="flex items-center gap-2">
                    <i data-lucide="lock" size="12" class="text-[#c5a059]"></i>
                    <span class="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-medium text-white/40 hidden xs:block">Secure</span>
                </div>
            </div>
        </div>
    </header>

<main id="site-content" role="main">

    <main class="pt-24 md:pt-64 pb-16 min-h-screen">
        <div class="max-w-[1440px] mx-auto px-4 md:px-12">
            <header class="mb-8 md:mb-20">
                <h1 class="text-3xl md:text-6xl font-serif italic mb-2 opacity-95">Your Order</h1>
                <p class="text-white/30 tracking-[0.2em] text-[8px] md:text-[11px] uppercase">Review and finalize your curated spaces</p>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24">
                <!-- Cart Items -->
                <div class="lg:col-span-8">
                    <div class="hidden md:grid grid-cols-12 pb-4 border-b border-white/10 text-[9px] uppercase tracking-[0.3em] font-medium text-white/30">
                        <div class="col-span-6">Product</div>
                        <div class="col-span-2 text-center">Price</div>
                        <div class="col-span-2 text-center">Quantity</div>
                        <div class="col-span-2 text-right">Total</div>
                    </div>

                    <?php foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) :

    $_product   = $cart_item['data'];
    $product_id = $cart_item['product_id'];

    if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 ) :

        $product_permalink = $_product->is_visible()
            ? $_product->get_permalink( $cart_item )
            : '';

?>

<div class="item-row py-4 md:py-10">

    <div class="flex flex-row gap-4 md:gap-10 md:items-center relative">

        <!-- Image -->
        <div class="w-20 h-24 md:w-32 md:h-44 bg-[#111] overflow-hidden flex-shrink-0">

            <a href="<?php echo esc_url( $product_permalink ); ?>">

                <?php echo $_product->get_image( 'woocommerce_thumbnail', array(
                    'class' => 'w-full h-full object-cover grayscale'
                ) ); ?>

            </a>

        </div>

        <!-- Content -->
        <div class="flex flex-col md:flex-row flex-1 md:items-center min-w-0">

            <!-- Product Info -->
            <div class="md:w-[50%] lg:w-[45%] pr-4">

                <span class="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#c5a059] mb-1 block">

                    <?php
                    echo wc_get_product_category_list(
                        $product_id,
                        ', '
                    );
                    ?>

                </span>

                <h3 class="text-sm md:text-xl font-light tracking-wide md:mb-2 uppercase truncate">

                    <a href="<?php echo esc_url( $product_permalink ); ?>">

                        <?php echo $_product->get_name(); ?>

                    </a>

                </h3>

            </div>

            <!-- Price -->
            <div class="hidden md:block w-[15%] text-center text-sm font-light">

                <?php echo WC()->cart->get_product_price( $_product ); ?>

            </div>

            <!-- Quantity -->
            <div class="mt-3 md:mt-0 md:w-[20%] flex items-center md:justify-center">

                <?php
                woocommerce_quantity_input(
                    array(
                        'input_name'  => "cart[{$cart_item_key}][qty]",
                        'input_value' => $cart_item['quantity'],
                        'min_value'   => '0',
                        'max_value'   => $_product->get_max_purchase_quantity(),
                    ),
                    $_product,
                    false
                );
                ?>

            </div>

            <!-- Total -->
            <div class="hidden md:block w-[20%] text-right text-base font-medium text-[#c5a059]">

                <?php
                echo WC()->cart->get_product_subtotal(
                    $_product,
                    $cart_item['quantity']
                );
                ?>

            </div>

        </div>

        <!-- Remove -->
        <a href="<?php echo esc_url( wc_get_cart_remove_url( $cart_item_key ) ); ?>"
           class="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 text-red-500/40 hover:text-red-500 transition-colors">

            <i data-lucide="x" size="18"></i>

        </a>

    </div>

</div>

<?php endif; endforeach; ?>

                    <!-- Additional Services - More compact -->
                    <div class="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                        <div class="glass-panel p-4 md:p-8 rounded-xl md:rounded-2xl border-white/5">
                            <i data-lucide="truck" class="text-[#c5a059] mb-3" size="18"></i>
                            <h4 class="text-[8px] md:text-[11px] uppercase tracking-widest font-medium mb-1">Shipping</h4>
                            <p class="text-[7px] md:text-[10px] text-white/30 leading-tight uppercase hidden sm:block">Professional installation available.</p>
                        </div>
                        <div class="glass-panel p-4 md:p-8 rounded-xl md:rounded-2xl border-white/5">
                            <i data-lucide="shield-check" class="text-[#c5a059] mb-3" size="18"></i>
                            <h4 class="text-[8px] md:text-[11px] uppercase tracking-widest font-medium mb-1">Guarantee</h4>
                            <p class="text-[7px] md:text-[10px] text-white/30 leading-tight uppercase hidden sm:block">Lifetime structural assurance.</p>
                        </div>
                        <div class="glass-panel p-4 md:p-8 rounded-xl md:rounded-2xl border-white/5 col-span-2 md:col-span-1">
                            <i data-lucide="message-square" class="text-[#c5a059] mb-3" size="18"></i>
                            <h4 class="text-[8px] md:text-[11px] uppercase tracking-widest font-medium mb-1">Support</h4>
                            <p class="text-[7px] md:text-[10px] text-white/30 leading-tight uppercase hidden sm:block">24/7 dedicated concierge.</p>
                        </div>
                    </div>
                </div>

                <!-- Summary Sidebar -->
                <div class="lg:col-span-4 lg:mt-0 mt-8">
                    <div class="sticky top-32">
                        <div class="glass-panel p-6 md:p-12 rounded-2xl md:rounded-3xl border-white/5 shadow-3xl">
                            <h2 class="text-lg md:text-2xl font-serif italic mb-6">Summary</h2>
                            
                            <div class="space-y-4 mb-8 pb-6 border-b border-white/5">
                                <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                                    <span>Subtotal</span>
                                    <span class="text-white">$4,340.00</span>
                                </div>
                                <div class="flex justify-between text-[10px] uppercase tracking-widest text-[#c5a059]">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                
                                <!-- Compact Promo -->
                                <div class="pt-2">
                                    <div class="flex gap-2">
                                        <input type="text" placeholder="CODE" class="flex-1 bg-white/5 border border-white/5 rounded-full px-4 py-3 text-[9px] tracking-widest focus:outline-none focus:border-white/20 uppercase">
                                        <button class="bg-white/10 text-white px-4 py-3 rounded-full text-[9px] font-bold tracking-widest hover:bg-white hover:text-black transition-all">OK</button>
                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-between items-end mb-8">
                                <span class="text-[9px] uppercase tracking-widest text-white/40 font-medium">Total</span>
                                <span class="text-2xl md:text-3xl font-light tracking-tighter">$4,687.00</span>
                            </div>

                            <a href="<?php echo esc_url( home_url( "/checkout/" ) ); ?>" class="block w-full bg-[#c5a059] text-white text-center py-5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase transition-all shadow-xl shadow-[#c5a059]/10">
                                Checkout
                            </a>

                            <div class="mt-6 flex flex-col items-center gap-4">
                                <div class="flex gap-4 grayscale opacity-20">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" class="h-2 w-auto" alt="Visa">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" class="h-4 w-auto" alt="Mastercard">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" class="h-3 w-auto" alt="Paypal">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</main>
<?php get_footer(); ?>
