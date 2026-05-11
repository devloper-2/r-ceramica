<?php
/**
 * Template for the Tracking page.
 */
get_header();
?>
<main id="site-content" role="main">


    <!-- Navigation -->
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
                <a href="<?php echo esc_url( home_url( "/orders/" ) ); ?>" class="block w-full text-left px-6 py-4 text-[11px] md:text-[10px] text-white/60 hover:text-[#c5a059] hover:bg-white/5 transition-all uppercase tracking-[0.3em] font-medium flex items-center gap-3">
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

    <main class="pt-32 pb-24 px-6">
        <div class="max-w-[900px] mx-auto">
            
            <header class="mb-12 text-center">
                <h1 class="text-4xl md:text-6xl font-serif italic mb-4 uppercase tracking-tighter">Track Your Order</h1>
                <p class="text-[10px] uppercase tracking-[0.4em] text-white/30">Order: #RC-892401-EX</p>
            </header>

            <!-- Status Card -->
            <div class="glass-panel p-8 md:p-12 rounded-3xl mb-8">
                <div class="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
                    <div class="text-center md:text-left">
                        <span class="text-[9px] uppercase tracking-widest text-white/30 block mb-1">Status</span>
                        <h2 class="text-2xl font-light text-[#c5a059]">IN TRANSIT</h2>
                    </div>
                    <div class="text-center md:text-right">
                        <span class="text-[9px] uppercase tracking-widest text-white/30 block mb-1">Expected Arrival</span>
                        <h2 class="text-2xl font-light">May 18, 2026</h2>
                    </div>
                </div>

                <!-- Vertical Timeline (Mobile Friendly) -->
                <div class="space-y-10 relative">
                    <!-- Line -->
                    <div class="absolute left-3 top-2 bottom-2 w-px bg-white/10"></div>

                    <!-- Step 1 -->
                    <div class="flex gap-6 relative">
                        <div class="w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center shrink-0">
                            <i data-lucide="check" size="12" class="text-black"></i>
                        </div>
                        <div>
                            <h4 class="text-xs uppercase tracking-widest font-semibold mb-1">Order Confirmed</h4>
                            <p class="text-[10px] text-white/40 uppercase tracking-widest">May 12, 10:45 AM</p>
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div class="flex gap-6 relative">
                        <div class="w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center shrink-0">
                            <i data-lucide="check" size="12" class="text-black"></i>
                        </div>
                        <div>
                            <h4 class="text-xs uppercase tracking-widest font-semibold mb-1">Curation & Packing</h4>
                            <p class="text-[10px] text-white/40 uppercase tracking-widest">May 13, 02:20 PM</p>
                        </div>
                    </div>

                    <!-- Step 3 (Current) -->
                    <div class="flex gap-6 relative">
                        <div class="w-6 h-6 rounded-full border-2 border-[#c5a059] bg-[#0a0a0a] flex items-center justify-center shrink-0">
                            <div class="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse"></div>
                        </div>
                        <div>
                            <h4 class="text-xs uppercase tracking-widest font-semibold mb-1 text-[#c5a059]">Handed to Logistics</h4>
                            <p class="text-[10px] text-white/40 uppercase tracking-widest">May 15, 09:12 AM</p>
                            <p class="mt-4 text-[10px] text-white p-4 bg-white/5 rounded-xl border border-white/5">
                                Your selection has left our Milan facility. Our logistics partner is ensuring a delicate transport to your location.
                            </p>
                        </div>
                    </div>

                    <!-- Step 4 -->
                    <div class="flex gap-6 relative">
                        <div class="w-6 h-6 rounded-full border border-white/10 bg-[#0a0a0a] flex items-center justify-center shrink-0"></div>
                        <div class="opacity-30">
                            <h4 class="text-xs uppercase tracking-widest font-semibold mb-1">At Local Facility</h4>
                            <p class="text-[10px] uppercase tracking-widest italic">Pending...</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="glass-panel p-6 rounded-2xl">
                    <h3 class="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 flex items-center gap-2">
                        <i data-lucide="map-pin" size="14"></i>
                        Delivery Point
                    </h3>
                    <p class="text-xs leading-relaxed uppercase tracking-widest font-light">
                        Winter Nightingale<br>
                        Avenue Montage 42, Suite 800<br>
                        Houston, TX 77002
                    </p>
                </div>
                <div class="glass-panel p-6 rounded-2xl">
                    <h3 class="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 flex items-center gap-2">
                        <i data-lucide="headphones" size="14"></i>
                        Concierge
                    </h3>
                    <p class="text-xs leading-relaxed uppercase tracking-widest font-light">
                        Dedicated Agent: Marco V.<br>
                        Contact: concierge@rceramica.com<br>
                        Response Time: &lt; 30 mins
                    </p>
                </div>
            </div>

            <div class="mt-12 text-center">
                <a href="<?php echo esc_url( home_url( "/" ) ); ?>" class="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">Return to Home</a>
            </div>
        </div>
    </main>
</main>
<?php get_footer(); ?>
