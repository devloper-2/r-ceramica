<?php

/**
 * Template for the Checkout page.
 */

add_filter('body_class', function ($classes) {
    $classes[] = 'headernone';
    return $classes;
});
get_header();
?>
<?php
$checkout = WC()->checkout();

do_action('woocommerce_before_checkout_form', $checkout);

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
    body {
        font-family: 'Plus Jakarta Sans', sans-serif;
        background: #0a0a0a;
        color: white;
    }

    .font-serif {
        font-family: 'Playfair Display', serif;
    }

    .luxury-shadow {
        shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.5);
    }

    .glass-panel {
        background: rgba(255, 255, 255, 0.02);
        border: 1px border-white/5;
        backdrop-filter: blur(10px);
    }

    .woocommerce-billing-fields__field-wrapper .input-text {
        width: 100%;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
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
        background: rgba(255, 255, 255, 0.06);
        box-shadow: 0 0 20px rgba(197, 160, 89, 0.1);
    }

    .woocommerce-billing-fields__field-wrapper .select2-container--default .select2-selection--single {
        width: 100%;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: #fff;
        font-size: 0.85rem;
        letter-spacing: 0.05em;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        height: 50px;
        display: flex;
        align-items: center;
    }

    .select2-container--default .select2-selection--single .select2-selection__arrow {
        top: 13px;
    }

    .woocommerce-billing-fields__field-wrapper .form-row {
        margin: 50px 0 10px;
    }

    label {
        display: block;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.3em;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.4);
        margin-bottom: 0.75rem;
    }

    .step-active {
        color: white;
        opacity: 1;
        border-color: #c5a059;
    }

    .step-inactive {
        color: white;
        opacity: 0.2;
    }

    .step-completed {
        color: #c5a059;
        opacity: 1;
    }

    .payment-card {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.02);
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .payment-card:hover {
        border-color: rgba(255, 255, 255, 0.3);
    }

    .payment-card.active {
        border-color: #c5a059;
        background: rgba(197, 160, 89, 0.05);
    }

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
        .checkout-input {
            padding: 1rem 1.25rem;
        }
    }
</style>
<main id="site-content" role="main">

    <?php
    include get_template_directory() . '/partials/cartandcheckoutheader.php';
    ?>

    <main class="pt-24 md:pt-48 pb-16">
        <div class="max-w-[1440px] mx-auto px-4 md:px-12">

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24">

                <!-- Checkout Form -->
                <div class="lg:col-span-7 order-2 lg:order-1">
                    <div class="mb-8 md:mb-12">
                        <h1 class="text-3xl md:text-5xl font-serif italic mb-2 md:mb-6">Finalize Order</h1>
                        <p class="text-white/40 text-[8px] md:text-[11px] uppercase tracking-[0.3em]">Excellence delivered to your doorstep</p>
                    </div>
                    <?php
                    $current_step = 1;

                    if (is_wc_endpoint_url('order-pay')) {
                        $current_step = 2;
                    }

                    if (is_wc_endpoint_url('order-received')) {
                        $current_step = 3;
                    }
                    function step_class($step, $current_step)
                    {
                        if ($current_step > $step) {
                            return 'step-completed';
                        }

                        if ($current_step == $step) {
                            return 'step-active';
                        }

                        return 'step-inactive';
                    }
                    ?>
                    <!-- Steps Progress -->
                    <div class="flex items-center justify-between sm:justify-start sm:gap-6 mb-6 sm:mb-12 pb-4 border-b border-white/5">
                        <div class="flex items-center gap-3 <?php echo step_class(1, $current_step); ?>">
                            <span class="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-current flex items-center justify-center text-[8px] sm:text-[10px]">1</span>
                            <span class="text-[8px] sm:text-[10px] uppercase tracking-widest font-medium">Ship</span>
                        </div>
                        <div class="flex-1 max-w-[20px] sm:max-w-[40px] h-px bg-white/10"></div>
                        <div class="flex items-center gap-3 <?php echo step_class(2, $current_step); ?>">
                            <span class="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-current flex items-center justify-center text-[8px] sm:text-[10px]">2</span>
                            <span class="text-[8px] sm:text-[10px] uppercase tracking-widest font-medium">Pay</span>
                        </div>
                        <div class="flex-1 max-w-[20px] sm:max-w-[40px] h-px bg-white/10"></div>
                        <div class="flex items-center gap-3 <?php echo step_class(3, $current_step); ?>">
                            <span class="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-current flex items-center justify-center text-[8px] sm:text-[10px]">3</span>
                            <span class="text-[8px] sm:text-[10px] uppercase tracking-widest font-medium">Ok</span>
                        </div>
                    </div>

                    <?php if (is_wc_endpoint_url('order-pay')) : ?>

                        <!-- ORDER PAY PAGE -->
                        <div id="order_review_wrapper">

                            <div class="glass-panel rounded-3xl p-8">

                                <h2 class="text-xl mb-6 uppercase tracking-widest">
                                    Payment Method
                                </h2>

                                <?php
                                global $wp;

                                $order_id = absint($wp->query_vars['order-pay'] ?? 0);
                                $order    = wc_get_order($order_id);

                                if (! $order) {
                                    echo '<p>Order not found.</p>';
                                    return;
                                }

                                $payment_method = $order->get_payment_method();

                                $gateways = WC()->payment_gateways()->payment_gateways();

                                if (isset($gateways[$payment_method]) && method_exists($gateways[$payment_method], 'receipt_page')) {

                                    $gateways[$payment_method]->receipt_page($order->get_id());
                                } else {

                                    wc_get_template(
                                        'checkout/form-pay.php',
                                        array(
                                            'order'              => $order,
                                            'available_gateways' => WC()->payment_gateways()->get_available_payment_gateways(),
                                            'order_button_text'  => __('Pay Now', 'woocommerce'),
                                        )
                                    );
                                }
                                ?>

                            </div>

                        </div>

                    <?php else : ?>

                        <!-- NORMAL CHECKOUT PAGE -->
                        <form name="checkout"
                            method="post"
                            class="checkout woocommerce-checkout space-y-4 md:space-y-12"
                            action="<?php echo esc_url(wc_get_checkout_url()); ?>"
                            enctype="multipart/form-data">

                            <div id="section-shipping">
                                <?php do_action('woocommerce_checkout_billing'); ?>
                            </div>

                            <div id="order_review_wrapper" class="checkout-hidden-review">
                                <div id="order_review">
                                    <?php do_action('woocommerce_checkout_order_review'); ?>
                                </div>
                            </div>

                            <div class="pt-4">
                                <button type="button"
                                    id="custom-place-order"
                                    class="w-full bg-white text-black py-4 md:py-6 rounded-full text-[9px] md:text-[11px] font-bold tracking-[0.3em] uppercase transition-all active:scale-[0.98]">
                                    Complete Order
                                </button>
                            </div>

                        </form>

                    <?php endif; ?>
                </div>

                <!-- Order Summary Sidebar -->
                <div class="lg:col-span-5 order-1 lg:order-2">
                    <div class="lg:sticky lg:top-40 bg-[#0d0d0d] rounded-2xl md:rounded-3xl p-6 md:p-12 border border-white/5">
                        <header class="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                            <h2 class="text-xl font-serif italic">Your Order</h2>
                            <a href="<?php echo esc_url(home_url("/cart/")); ?>" class="text-[9px] uppercase tracking-[0.3em] text-[#c5a059]">Modify</a>
                        </header>

                        <!-- Items List -->
                        <div class="space-y-4 mb-8">
                            <?php foreach (WC()->cart->get_cart() as $cart_item) :
                                $_product = $cart_item['data'];
                            ?>

                                <div class="flex gap-4 items-center">
                                    <div class="w-14 h-14 bg-[#151515] rounded-lg overflow-hidden flex-shrink-0">
                                        <?php echo $_product->get_image('woocommerce_thumbnail'); ?>
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
                                    <?php echo wc_price(WC()->cart->get_total_tax()); ?>
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
<?php if ( ! is_user_logged_in() ) : ?>
<div id="checkout-login-modal" class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <?php get_template_part( 'partials/login-popup' ); ?>
</div>
<?php endif; ?>

<?php get_footer(); ?>