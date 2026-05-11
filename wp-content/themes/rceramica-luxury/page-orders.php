<?php
/**
 * Template for the Orders page.
 */
get_header();
?>
<main id="site-content" role="main">


    <!-- Global Navigation Integration -->
    <nav id="navbar" class="fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans font-light bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
        <div class="relative flex justify-between items-center px-4 md:px-12 h-20 md:h-28">
            <div id="mobile-menu-btn" class="flex-1 lg:hidden flex items-center relative z-[60]">
                <button onclick="toggleMobileMenu()" class="text-white relative z-[70] p-2 -ml-2">
                    <i data-lucide="menu" size="24"></i>
                </button>
            </div>
            
            <div id="logo-container" class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700">
                <a href="<?php echo esc_url( home_url( "/" ) ); ?>" class="pointer-events-auto">
                    <img id="navbar-logo" src="https://rceramica.com/logo/logo.png" alt="R Ceramica Logo" class="h-10 md:h-16 w-auto object-contain">
                </a>
            </div>

            <div id="nav-right" class="flex-1 flex justify-end items-center relative z-20">
                <div class="hidden lg:flex items-center gap-10">
                    <div onclick="toggleSearch()" class="flex items-center cursor-pointer group">
                        <span class="material-symbols-outlined font-light text-2xl text-white/80">search</span>
                    </div>
                    <a href="<?php echo esc_url( home_url( "/cart/" ) ); ?>" class="relative group">
                        <i data-lucide="shopping-cart" size="24" stroke-width="1.2" class="text-white/80"></i>
                        <span id="cart-count" class="absolute -top-2 -right-3 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </a>
                    <button onclick="toggleLoginDropdown(event)" class="focus:outline-none">
                        <span class="material-symbols-outlined font-light text-3xl">account_circle</span>
                    </button>
                </div>
                <!-- Mobile Icons -->
                <div class="lg:hidden flex items-center gap-6">
                    <div onclick="toggleSearch()" class="flex items-center cursor-pointer group">
                        <span class="material-symbols-outlined font-light text-2xl text-white/80">search</span>
                    </div>
                    <a href="<?php echo esc_url( home_url( "/cart/" ) ); ?>" class="relative group">
                        <i data-lucide="shopping-cart" size="22" stroke-width="1.2" class="text-white/80"></i>
                        <span id="cart-count-mobile" class="absolute -top-2 -right-2 bg-white text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Global Login Dropdown -->
        <div id="login-dropdown" class="hidden absolute right-4 md:right-12 top-[80px] md:top-[96px] w-56 bg-black/60 backdrop-blur-2xl border border-white/10 p-1.5 rounded-sm shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] z-[110]">
            <div id="logged-out-view">
                <a href="<?php echo esc_url( home_url( "/login/" ) ); ?>" class="block w-full text-left px-6 py-5 text-[11px] md:text-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.3em] font-medium">
                    Sign In
                </a>
            </div>
            <div id="logged-in-view" class="hidden">
                <div class="px-6 py-4 border-b border-white/5">
                    <p id="user-display-name" class="text-[10px] uppercase tracking-[0.2em] text-white font-medium truncate">Client User</p>
                </div>
                <a href="<?php echo esc_url( home_url( "/orders/" ) ); ?>" class="block w-full text-left px-6 py-4 text-[11px] md:text-[10px] text-[#c5a059] bg-white/5 transition-all uppercase tracking-[0.3em] font-medium flex items-center gap-3">
                    <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                    Orders
                </a>
                <button onclick="logout()" class="w-full text-left px-6 py-4 text-[11px] md:text-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.3em] font-medium flex items-center gap-3">
                    <span class="material-symbols-outlined text-[18px]">logout</span>
                    Sign Out
                </button>
            </div>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col p-8 overflow-y-auto transform -translate-x-full transition-transform duration-500">
        <div class="flex justify-between items-center mb-12">
            <img src="https://rceramica.com/logo/logo.png" alt="Logo" class="h-12 w-auto">
            <button onclick="toggleMobileMenu()" class="text-white">
                <i data-lucide="x" size="32"></i>
            </button>
        </div>
        <div class="flex flex-col space-y-4">
            <a href="<?php echo esc_url( home_url( "/" ) ); ?>" class="text-xl font-light tracking-widest uppercase py-3 border-b border-white/5">Home</a>
            <a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="text-xl font-light tracking-widest uppercase py-3 border-b border-white/5">Collections</a>
            <a href="<?php echo esc_url( home_url( "/orders/" ) ); ?>" class="text-xl font-light tracking-widest uppercase py-3 border-b border-white/5 text-[#c5a059]">My Orders</a>
            <a href="<?php echo esc_url( home_url( "/login/" ) ); ?>" id="mobile-signin-link" class="text-xl font-light tracking-widest uppercase py-3 border-b border-white/5">Sign In</a>
            <div id="mobile-user-info" class="hidden py-3 border-b border-white/5">
                <p id="mobile-user-name" class="text-xs uppercase tracking-widest text-white/40 mb-2">User</p>
                <button onclick="logout()" class="text-xl font-light tracking-widest uppercase text-red-500/80">Logout</button>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <main class="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
        <div class="max-w-[1200px] mx-auto">
            
            <header class="mb-16 animate-slide-up">
                <h1 class="text-4xl md:text-6xl font-serif italic mb-4">Your Acquisitions</h1>
                <p class="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/30">Order History & Curation Records</p>
            </header>

            <div class="space-y-6">
                <!-- Order 1 -->
                <div class="order-card p-6 md:p-10 rounded-2xl glass-panel relative group">
                    <div class="flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">
                        <div class="flex-1">
                            <div class="flex items-center gap-4 mb-4">
                                <span class="text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1 bg-[#c5a059]/10 text-[#c5a059] rounded-full">In Transit</span>
                                <span class="text-[9px] uppercase tracking-[0.3em] text-white/40">#RC-892401-EX</span>
                            </div>
                            <h3 class="text-xl md:text-2xl font-light mb-2">Winter Nightingale Selection</h3>
                            <p class="text-[10px] uppercase tracking-widest text-white/30">Ordered on May 12, 2026 • 2 Items</p>
                        </div>
                        <div class="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
                            <div class="text-right">
                                <span class="text-[10px] uppercase tracking-[0.2em] text-white/20 block mb-1">Acquisition Total</span>
                                <span class="text-2xl md:text-3xl font-light">$4,687.00</span>
                            </div>
                            <a href="<?php echo esc_url( home_url( "/tracking/" ) ); ?>" class="w-full md:w-auto px-10 py-4 bg-white text-black text-[9px] font-bold uppercase tracking-[0.3em] rounded-full transition-all hover:bg-[#c5a059] hover:text-white text-center">
                                Track Order
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Order 2 -->
                <div class="order-card p-6 md:p-10 rounded-2xl glass-panel relative">
                    <div class="flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">
                        <div class="flex-1 opacity-70">
                            <div class="flex items-center gap-4 mb-4">
                                <span class="text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1 bg-white/5 text-white/40 rounded-full">Delivered</span>
                                <span class="text-[9px] uppercase tracking-[0.3em] text-white/40">#RC-721589-EX</span>
                            </div>
                            <h3 class="text-xl md:text-2xl font-light mb-2">Minimalist Office Suite</h3>
                            <p class="text-[10px] uppercase tracking-widest text-white/30">Ordered on April 05, 2026 • 4 Items</p>
                        </div>
                        <div class="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
                            <div class="text-right opacity-70">
                                <span class="text-[10px] uppercase tracking-[0.2em] text-white/20 block mb-1">Acquisition Total</span>
                                <span class="text-2xl md:text-3xl font-light">$12,450.00</span>
                            </div>
                            <a href="<?php echo esc_url( home_url( "/order-details/" ) ); ?>" class="w-full md:w-auto px-10 py-4 border border-white/10 text-white/60 text-[9px] font-bold uppercase tracking-[0.3em] rounded-full transition-all hover:bg-white hover:text-black text-center">
                                Order Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-20 text-center">
                <a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all">
                    <span>Explore New Collections</span>
                    <i data-lucide="arrow-right" size="14"></i>
                </a>
            </div>
        </div>
    </main>
</main>
<?php get_footer(); ?>
