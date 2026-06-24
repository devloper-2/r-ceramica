<?php

/**
 * Template for the Order Details page.
 */
get_header();

include get_template_directory() . '/partials/cartandcheckoutheader.php';

if (! is_user_logged_in()) {

    get_header();

    include get_template_directory() . '/partials/login-popup.php';

    get_footer();

    return;
}

$order_id = absint(get_query_var('view-order'));

if (! $order_id && isset($_GET['order_id'])) {
    $order_id = absint($_GET['order_id']);
}

$order = wc_get_order($order_id);

if (! $order) {
    wp_die('Order not found');
}

$current_user_id = get_current_user_id();

if ($order->get_user_id() != $current_user_id) {
    wp_die('Unauthorized');
}
?>
<main id="site-content" role="main">

    <div class="pt-32 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
        <div class="max-w-[1000px] mx-auto">

            <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 px-4">
                <div>
                    <h1 class="text-4xl md:text-6xl font-serif italic mb-4">Acquisition Record</h1>
                    <?php
                    $order_number = $order->get_order_number();
                    $order_date = $order->get_date_created() ? $order->get_date_created()->date_i18n('F d, Y') : '-';
                    ?>

                    <p class="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/30">
                        Order: #<?php echo esc_html($order_number); ?>
                        • <?php echo esc_html($order_date); ?>
                    </p>
                </div>
                <div class="flex items-center gap-4 py-2 px-6 bg-white/5 rounded-full border border-white/10">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></div>
                    <span class="text-[10px] uppercase tracking-[0.3em] font-medium"><?php echo esc_html(wc_get_order_status_name($order->get_status())); ?></span>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                <!-- Items List -->
                <div class="lg:col-span-8 space-y-6">
                    <div class="glass-panel rounded-3xl overflow-hidden">
                        <div class="p-6 md:p-8 border-b border-white/5">
                            <h2 class="text-lg font-light uppercase tracking-widest">Curation Details</h2>
                        </div>

                        <?php foreach ($order->get_items() as $item) :

                            $product = $item->get_product();

                            if (! $product) {
                                continue;
                            }

                            $image = wp_get_attachment_image_url(
                                $product->get_image_id(),
                                'medium'
                            );

                            $qty = $item->get_quantity();

                        ?>

                            <div class="p-6 md:p-8 flex gap-6 border-b border-white/5">

                                <div class="w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-xl overflow-hidden shrink-0">

                                    <?php if ($image) : ?>
                                        <img src="<?php echo esc_url($image); ?>"
                                            alt="<?php echo esc_attr($product->get_name()); ?>"
                                            class="w-full h-full object-cover">
                                    <?php endif; ?>

                                </div>

                                <div class="flex-1 flex flex-col justify-between py-1">

                                    <div>
                                        <h3 class="text-sm md:text-base font-light mb-1 uppercase tracking-wider">
                                            <?php echo esc_html($item->get_name()); ?>
                                        </h3>
                                    </div>

                                    <div class="flex justify-between items-end">

                                        <span class="text-[10px] text-white/40 uppercase tracking-widest font-medium">
                                            Qty: <?php echo esc_html($qty); ?>
                                        </span>

                                        <span class="text-lg font-light">
                                            <?php echo wc_price($item->get_total()); ?>
                                        </span>

                                    </div>

                                </div>

                            </div>

                        <?php endforeach; ?>
                    </div>

                    <!-- Internal Note -->
                    <div class="p-8 rounded-3xl glass-panel border-white/10 bg-[#c5a059]/5">
                        <div class="flex gap-4 items-start">
                            <i data-lucide="shield-check" class="text-[#c5a059] shrink-0" size="20"></i>
                            <div>
                                <h4 class="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c5a059] mb-2 uppercase tracking-widest">Post-Delivery Inspection Report</h4>
                                <p class="text-xs text-white/60 leading-relaxed font-light">AllStatue marble slabs were inspected and verified for structural integrity upon arrival. Curation signatures provided by agent Marco V. on delivery.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary & Info -->
                <div class="lg:col-span-4 space-y-8">
                    <!-- Cost Summary -->
                    <div class="glass-panel p-8 rounded-3xl">
                        <h3 class="text-xs uppercase tracking-[0.3em] font-bold mb-8">Financial Summary</h3>
                        <div class="space-y-4 mb-8 pb-8 border-b border-white/5">
                            <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-medium">
                                <span>Subtotal</span>
                                <span class="text-white"><?php echo wc_price($order->get_subtotal()); ?></span>
                            </div>
                            <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-medium">
                                <span>Shipping</span>
                                <span class="text-[#c5a059]"><?php echo wc_price($order->get_shipping_total()); ?></span>
                            </div>
                            <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-medium">
                                <span>Tax (0%)</span>
                                <span class="text-white"><?php echo wc_price($order->get_total_tax()); ?></span>
                            </div>
                        </div>
                        <div class="flex justify-between items-end">
                            <span class="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Total Acquisition</span>
                            <span class="text-3xl font-light"><?php echo $order->get_formatted_order_total(); ?></span>
                        </div>
                    </div>

                    <!-- Shipping Address -->
                    <div class="glass-panel p-8 rounded-3xl">
                        <h3 class="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3">
                            <i data-lucide="map-pin" size="16" class="text-white/40"></i>
                            Destination
                        </h3>
                        <div class="text-[11px] leading-relaxed uppercase tracking-[0.2em] font-light text-white/60">
                            <?php echo wp_kses_post($order->get_formatted_shipping_address()); ?>
                        </div>
                    </div>

                    <!-- Payment Info -->
                    <div class="glass-panel p-8 rounded-3xl">
                        <h3 class="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3">
                            <i data-lucide="credit-card" size="16" class="text-white/40"></i>
                            Transaction
                        </h3>
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-6 bg-white/[0.03] border border-white/10 rounded flex items-center justify-center p-1">
                                <?php if ($order->get_payment_method() === 'stripe') : ?>
                                    Visa Logo
                                <?php endif; ?>
                            </div>
                            <div>
                                <p class="text-[11px] uppercase tracking-[0.2em] font-light">
                                    <?php echo esc_html(
                                        $order->get_payment_method_title()
                                    ); ?>
                                </p>

                                <p class="text-[9px] uppercase tracking-widest text-white/20">
                                    Paid
                                </p>
                                <p class="text-[9px] uppercase tracking-widest text-white/20"> Authorized on <?php echo esc_html($order_date); ?></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<?php get_footer(); ?>