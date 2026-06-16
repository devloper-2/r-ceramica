<?php
/**
 * Template for the Checkout page.
 */
add_filter('body_class', function($classes) {
    $classes[] = 'headernone';
    return $classes;
});
get_header();
?>
<?php
$checkout = WC()->checkout();

do_action( 'woocommerce_before_checkout_form', $checkout );

// If checkout registration is disabled and not logged in.
if (
    ! $checkout->is_registration_enabled() &&
    $checkout->is_registration_required() &&
    ! is_user_logged_in()
) {
    echo esc_html__(
        'You must be logged in to checkout.',
        'woocommerce'
    );
    return;
}

wc_print_notices();
?>
<style>
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0a0a0a; color: white; }
        .font-serif { font-family: 'Playfair Display', serif; }
        
        .luxury-shadow { shadow: 0 40px 100px -20px rgba(0,0,0,0.5); }
        .glass-panel { background: rgba(255,255,255,0.02); border: 1px border-white/5; backdrop-filter: blur(10px); }
        
        .woocommerce-billing-fields__field-wrapper .input-text {
            width: 100%;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 1.2rem 1.5rem;
            color: #fff;
            font-size: 0.85rem;
            letter-spacing: 0.05em;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .woocommerce-billing-fields__field-wrapper .input-text:focus {
            outline: none;
            border-color: #c5a059;
            background: rgba(255,255,255,0.06);
            box-shadow: 0 0 20px rgba(197, 160, 89, 0.1);
        }
        .woocommerce-billing-fields__field-wrapper .select2-container--default .select2-selection--single{
            width: 100%;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            color: #fff;
            font-size: 0.85rem;
            letter-spacing: 0.05em;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            height: 50px;
            display: flex;
            align-items: center;
        }
        .select2-container--default .select2-selection--single .select2-selection__arrow{
            top: 13px;
        }
        .woocommerce-billing-fields__field-wrapper .form-row{
            margin: 50px 0 10px;
        }        
        label {
            display: block;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            font-weight: 500;
            color: rgba(255,255,255,0.4);
            margin-bottom: 0.75rem;
        }

        .step-active { color: white; opacity: 1; border-color: #c5a059; }
        .step-inactive { color: white; opacity: 0.2; }

        .payment-card {
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.02);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .payment-card:hover { border-color: rgba(255,255,255,0.3); }
        .payment-card.active { border-color: #c5a059; background: rgba(197, 160, 89, 0.05); }
        .checkout-hidden-review {
    position: absolute;
    left: -99999px;
    top: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

        /* Mobile specific adjustments */
        @media (max-width: 768px) {
            .checkout-input { padding: 1rem 1.25rem; }
        }
    </style>
<main id="site-content" role="main">


    <!-- Simplified Checkout Header -->
    <header class="fixed top-0 left-0 w-full z-[100] bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 h-20">
        <div class="max-w-[1720px] mx-auto px-4 md:px-6 h-full flex justify-between items-center">
            <a href="<?php echo esc_url( home_url( "/cart/" ) ); ?>" class="flex-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
                <i data-lucide="arrow-left" size="14"></i>
                <span class="hidden sm:inline">Back to Cart</span>
                <span class="sm:hidden">Cart</span>
            </a>
            <div class="absolute left-1/2 -translate-x-1/2 flex justify-center">
                 <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.webp"" alt="R Ceramica" class="cartlogo"></a>
            </div>
            <div class="flex-1 flex justify-end">
                <div class="flex items-center gap-2">
                    <i data-lucide="lock" size="12" class="text-[#c5a059]"></i>
                    <span class="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-medium text-white/40 hidden xs:block">Secure</span>
                </div>
            </div>
        </div>
    </header>

    <main class="pt-24 md:pt-48 pb-16">
        <div class="max-w-[1440px] mx-auto px-4 md:px-12">
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24">
                
                <!-- Checkout Form -->
                <div class="lg:col-span-7 order-2 lg:order-1">
                    <div class="mb-8 md:mb-12">
                        <h1 class="text-3xl md:text-5xl font-serif italic mb-2 md:mb-6">Finalize Order</h1>
                        <p class="text-white/40 text-[8px] md:text-[11px] uppercase tracking-[0.3em]">Excellence delivered to your doorstep</p>
                    </div>

                    <!-- Steps Progress -->
                    <div class="flex items-center justify-between sm:justify-start sm:gap-6 mb-6 sm:mb-12 pb-4 border-b border-white/5">
                        <div class="flex items-center gap-1.5 sm:gap-3 step-active">
                            <span class="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-current flex items-center justify-center text-[8px] sm:text-[10px]">1</span>
                            <span class="text-[8px] sm:text-[10px] uppercase tracking-widest font-medium">Ship</span>
                        </div>
                        <div class="flex-1 max-w-[20px] sm:max-w-[40px] h-px bg-white/10"></div>
                        <div class="flex items-center gap-1.5 sm:gap-3 step-inactive">
                            <span class="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-current flex items-center justify-center text-[8px] sm:text-[10px]">2</span>
                            <span class="text-[8px] sm:text-[10px] uppercase tracking-widest font-medium">Pay</span>
                        </div>
                        <div class="flex-1 max-w-[20px] sm:max-w-[40px] h-px bg-white/10"></div>
                        <div class="flex items-center gap-1.5 sm:gap-3 step-inactive">
                            <span class="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-current flex items-center justify-center text-[8px] sm:text-[10px]">3</span>
                            <span class="text-[8px] sm:text-[10px] uppercase tracking-widest font-medium">Ok</span>
                        </div>
                    </div>
                    
                        <form name="checkout" method="post" class="checkout woocommerce-checkout space-y-4 md:space-y-12" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data">
                        <!-- Shipping Section -->
                        <div id="section-shipping">

                            <?php do_action( 'woocommerce_checkout_billing' ); ?>

                        </div>

                        <!-- Payment architecture -->
                       <div id="order_review_wrapper" class="checkout-hidden-review">

    <div id="order_review">
        <?php do_action( 'woocommerce_checkout_order_review' ); ?>
    </div>

</div>

                        <div class="pt-4">
                            <button type="button" id="custom-place-order" class="w-full bg-white text-black py-4 md:py-6 rounded-full text-[9px] md:text-[11px] font-bold tracking-[0.3em] uppercase transition-all active:scale-[0.98]">Complete Order</button>
                        </div>
                    </form>
                </div>

                <!-- Order Summary Sidebar -->
                <div class="lg:col-span-5 order-1 lg:order-2">
                    <div class="lg:sticky lg:top-40 bg-[#0d0d0d] rounded-2xl md:rounded-3xl p-6 md:p-12 border border-white/5">
                        <header class="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                            <h2 class="text-xl font-serif italic">Your Order</h2>
                            <a href="<?php echo esc_url( home_url( "/cart/" ) ); ?>" class="text-[9px] uppercase tracking-[0.3em] text-[#c5a059]">Modify</a>
                        </header>

                        <!-- Items List -->
                        <div class="space-y-4 mb-8">

                            <?php foreach ( WC()->cart->get_cart() as $cart_item ) :

                                $_product = $cart_item['data'];

                            ?>

                            <div class="flex gap-4 items-center">

                                <div class="w-14 h-14 bg-[#151515] rounded-lg overflow-hidden flex-shrink-0">

                                    <?php echo $_product->get_image( 'woocommerce_thumbnail' ); ?>

                                </div>

                                <div class="flex-1 min-w-0">

                                    <h4 class="text-[10px] uppercase tracking-tight font-medium truncate">

                                        <?php echo $_product->get_name(); ?>

                                    </h4>

                                    <div class="flex justify-between items-center mt-1">

                                        <span class="text-[9px] text-white/30 uppercase">

                                            Qty: <?php echo $cart_item['quantity']; ?>

                                        </span>

                                        <span class="text-[11px] font-light">

                                            <?php
                                            echo WC()->cart->get_product_subtotal(
                                                $_product,
                                                $cart_item['quantity']
                                            );
                                            ?>

                                        </span>

                                    </div>

                                </div>

                            </div>

                            <?php endforeach; ?>

                    </div>

                        <!-- Calculations -->
                        <div class="space-y-3 mb-6 pb-6 border-b border-white/5">
                            <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                                <span>Subtotal</span>
                                <span class="text-white">
                                    <?php wc_cart_totals_subtotal_html(); ?>
                                </span>
                            </div>
                            <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                                <span>Tax</span>
                                <span class="text-white">
                                    <?php echo wc_price( WC()->cart->get_total_tax() ); ?>
                                </span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center">
                            <span class="text-[9px] uppercase tracking-[0.3em] font-medium text-[#c5a059]">Total Due</span>
                            <span class="text-2xl font-light">
    <?php wc_cart_totals_order_total_html(); ?>
</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
</main>
<script>

document.addEventListener('DOMContentLoaded', function() {

    const customBtn = document.getElementById('custom-place-order');

    if (!customBtn) return;

    customBtn.addEventListener('click', function() {

        const wcButton = document.querySelector(
            '#place_order'
        );

        if (wcButton) {

            wcButton.click();

        }

    });

});

</script>
<?php get_footer(); ?>
