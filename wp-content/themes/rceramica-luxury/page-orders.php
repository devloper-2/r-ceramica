<?php
/**
 * Template for the Orders page.
 */

get_header();
if ( ! is_user_logged_in() ) {

    get_header();

    include get_template_directory() . '/partials/login-popup.php';

    get_footer();

    return;
}

include get_template_directory() . '/partials/cartandcheckoutheader.php';


$current_user_id = get_current_user_id();

$customer_orders = wc_get_orders([
    'customer_id' => $current_user_id,
    'limit'       => -1,
    'orderby'     => 'date',
    'order'       => 'DESC',
]);
?>

<main id="site-content" role="main">

    <div class="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
        <div class="max-w-[1200px] mx-auto">

            <header class="mb-16 animate-slide-up">
                <h1 class="text-4xl md:text-6xl font-serif italic mb-4">Your Acquisitions</h1>
                <p class="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/30">
                    Order History & Curation Records
                </p>
            </header>

            <div class="space-y-6">

                <?php if ( ! empty( $customer_orders ) ) : ?>

                    <?php foreach ( $customer_orders as $order ) :

                        $order_id      = $order->get_id();
                        $order_number  = $order->get_order_number();
                        $order_status  = wc_get_order_status_name( $order->get_status() );
                        $order_total   = $order->get_formatted_order_total();
                        $item_count    = $order->get_item_count();
                        $order_date = $order->get_date_created() ? $order->get_date_created()->date_i18n('F d, Y') : '-';

                        $status_class = 'bg-white/5 text-white/40';

                        if ( $order->has_status( ['processing', 'on-hold'] ) ) {
                            $status_class = 'bg-[#c5a059]/10 text-[#c5a059]';
                        }

                        $view_order_url = add_query_arg(
    'order_id',
    $order->get_id(),
    home_url('/order-details/')
);
                    ?>

                        <div class="order-card p-6 md:p-10 rounded-2xl glass-panel relative group">

                            <div class="flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">

                                <div class="flex-1">

                                    <div class="flex items-center gap-4 mb-4">

                                        <span class="text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1 rounded-full <?php echo esc_attr($status_class); ?>">
                                            <?php echo esc_html($order_status); ?>
                                        </span>

                                        <span class="text-[9px] uppercase tracking-[0.3em] text-white/40">
                                            #<?php echo esc_html($order_number); ?>
                                        </span>

                                    </div>

                                   <h3 class="text-xl md:text-2xl font-light mb-2">
                                        <?php
                                        $items = $order->get_items();
                                        $first_item = reset($items);
                                        echo $first_item
                                            ? esc_html($first_item->get_name())
                                            : 'Order #' . esc_html($order_number);
                                        ?>
                                    </h3>

                                    <p class="text-[10px] uppercase tracking-widest text-white/30">
                                        Ordered on <?php echo esc_html($order_date); ?>
                                        • <?php echo esc_html($item_count); ?> Items
                                    </p>

                                </div>

                                <div class="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">

                                    <div class="text-right">

                                        <span class="text-[10px] uppercase tracking-[0.2em] text-white/20 block mb-1">
                                            Acquisition Total
                                        </span>

                                        <span class="text-2xl md:text-3xl font-light">
                                            <?php echo wp_kses_post($order_total); ?>
                                        </span>

                                    </div>

                                    <a href="<?php echo esc_url($view_order_url); ?>" class="w-full md:w-auto px-10 py-4 border border-white/10 text-white/60 text-[9px] font-bold uppercase tracking-[0.3em] rounded-full transition-all hover:bg-white hover:text-black text-center">

                                        Order Details

                                    </a>

                                </div>

                            </div>

                        </div>

                    <?php endforeach; ?>

                <?php else : ?>

                    <div class="glass-panel rounded-2xl p-10 text-center">
                        <p class="text-white/50 uppercase tracking-[0.3em] text-xs">
                            No Orders Found
                        </p>
                    </div>

                <?php endif; ?>

            </div>

            <div class="mt-20 text-center">
                <a href="<?php echo esc_url( wc_get_page_permalink('shop') ); ?>"
                   class="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all">

                    <span>Explore New Collections</span>

                </a>
            </div>

        </div>
    </div>

</main>

<?php get_footer(); ?>