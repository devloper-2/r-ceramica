<!-- Simplified Checkout Header -->
    <header class="fixed top-0 left-0 w-full z-[100] bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 h-20">
        <div class="max-w-[1720px] mx-auto px-4 md:px-6 h-full flex justify-between items-center">
            <a href="<?php echo is_checkout() ? wc_get_cart_url() : home_url('/shop/'); ?>" class="flex-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
                <i data-lucide="arrow-left" size="14"></i>
                
    <span class="hidden sm:inline">
        <?php echo is_checkout() ? 'Back to Cart' : 'Continue Shopping'; ?>
    </span>
                <span class="sm:hidden">Cart</span>
            </a>
            <div class="absolute left-1/2 -translate-x-1/2 flex justify-center">
                 <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.webp"" alt="R Ceramica" class="cartlogo"></a>
            </div>
            <div class="flex-1 flex justify-end">
                <div class="flex items-center gap-10">
                    <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>" class="flex items-center hover:text-white/80 transition-colors group">
                        <div class="relative">
                            <i data-lucide="shopping-cart" size="28" stroke-width="1.2" class="text-white/80 group-hover:text-white group-hover:scale-110 transition-all"></i>
                            <span class="cart-count-header absolute -top-2 -right-3 bg-white text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
                        </div>
                    </a>
                    <button onclick="toggleLangDropdown(event)" class="hover:text-white/80 transition-colors focus:outline-none ring-0 border-0">
                        <span id="lang-text" class="text-[12px] font-medium uppercase tracking-[0.2em] opacity-80">EN</span>
                    </button>
                    <button onclick="toggleLoginDropdown(event)" class="hover:text-white/80 transition-colors focus:outline-none ring-0 border-0">
                        <span class="material-symbols-outlined font-light text-3xl">account_circle</span>
                    </button>
                </div>
            </div>
        </div>
    </header>