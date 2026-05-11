<?php
/**
 * Template for the Cart page.
 */
get_header();
?>
<main id="site-content" role="main">


    <!-- Navigation -->
    <nav id="navbar" class="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
        <div class="relative flex justify-between items-center px-4 md:px-12 h-20 md:h-28">
            <div class="flex-1 flex items-center">
                <a href="<?php echo esc_url( home_url( "/products/" ) ); ?>" class="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity">
                    <i data-lucide="arrow-left" size="14"></i>
                    <span class="hidden sm:inline">Continue Shopping</span>
                    <span class="sm:hidden">Back</span>
                </a>
            </div>
            <div class="absolute left-1/2 -translate-x-1/2 flex justify-center w-auto">
                <a href="<?php echo esc_url( home_url( "/" ) ); ?>">
                    <img src="https://rceramica.com/logo/logo.png" alt="R Ceramica" class="h-8 md:h-16 w-auto">
                </a>
            </div>
            <div class="flex-1 flex justify-end gap-4 md:gap-8 items-center">
                <button class="hidden md:block text-[11px] font-medium uppercase tracking-[0.2em] opacity-80">Help</button>
                <button onclick="toggleLoginDropdown(event)" class="focus:outline-none">
                    <span class="material-symbols-outlined font-light text-2xl md:text-3xl">account_circle</span>
                </button>
                <div class="relative flex items-center">
                    <i data-lucide="shopping-cart" size="20" class="md:hidden" stroke-width="1.2"></i>
                    <i data-lucide="shopping-cart" size="24" class="hidden md:block" stroke-width="1.2"></i>
                    <span id="cart-count" class="absolute -top-2 -right-3 bg-white text-black text-[8px] md:text-[9px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center">2</span>
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

    <main class="pt-24 md:pt-48 pb-16 min-h-screen">
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

                    <div id="cart-items-container" class="divide-y divide-white/5">
                        <!-- Item 1 -->
                        <div class="item-row py-4 md:py-10">
                            <div class="flex flex-row gap-4 md:gap-0 md:items-center relative">
                                <!-- Image Slot -->
                                <div class="w-20 h-24 md:w-32 md:h-44 bg-[#111] overflow-hidden flex-shrink-0">
                                    <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80" class="w-full h-full object-cover grayscale" alt="Product">
                                </div>

                                <!-- Content Slot -->
                                <div class="flex flex-col md:flex-row flex-1 md:items-center min-w-0">
                                    <div class="md:w-[50%] lg:w-[45%] pr-4">
                                        <span class="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#c5a059] mb-1 block">Faucets</span>
                                        <h3 class="text-sm md:text-xl font-light tracking-wide md:mb-2 uppercase truncate">AURA MATTE BLACK TAP</h3>
                                        <div class="md:hidden mt-1 flex items-center gap-3">
                                            <span class="text-xs font-light text-white/60">$2,450.00</span>
                                        </div>
                                    </div>

                                    <div class="hidden md:block w-[15%] text-center text-sm font-light">$2,450.00</div>
                                    
                                    <div class="mt-3 md:mt-0 md:w-[20%] flex items-center md:justify-center">
                                        <div class="flex items-center border border-white/10 rounded-full px-2 py-1 md:px-4 md:py-2">
                                            <button class="text-white/30 hover:text-white p-1"><i data-lucide="minus" size="12"></i></button>
                                            <input type="number" value="1" class="w-8 md:w-12 bg-transparent text-center text-xs focus:outline-none">
                                            <button class="text-white/30 hover:text-white p-1"><i data-lucide="plus" size="12"></i></button>
                                        </div>
                                    </div>

                                    <div class="hidden md:block w-[20%] text-right text-base font-medium text-[#c5a059]">$2,450.00</div>
                                    
                                    <!-- Mobile Total & Remove -->
                                    <div class="md:hidden flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                                        <span class="text-sm font-semibold text-[#c5a059]">$2,450.00</span>
                                        <button class="text-red-500/80 hover:text-red-500 p-2"><i data-lucide="trash-2" size="16"></i></button>
                                    </div>
                                </div>
                                
                                <!-- Desktop Remove Button -->
                                <button class="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 text-red-500/40 hover:text-red-500 transition-colors">
                                    <i data-lucide="x" size="18"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Item 2 -->
                        <div class="item-row py-4 md:py-10">
                            <div class="flex flex-row gap-4 md:gap-0 md:items-center relative">
                                <div class="w-20 h-24 md:w-32 md:h-44 bg-[#111] overflow-hidden flex-shrink-0">
                                    <img src="https://images.unsplash.com/photo-1615529182906-134d12bbd61c?auto=format&fit=crop&q=80" class="w-full h-full object-cover grayscale" alt="Product">
                                </div>

                                <div class="flex flex-col md:flex-row flex-1 md:items-center min-w-0">
                                    <div class="md:w-[50%] lg:w-[45%] pr-4">
                                        <span class="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#c5a059] mb-1 block">Tiles</span>
                                        <h3 class="text-sm md:text-xl font-light tracking-wide md:mb-2 uppercase truncate">VENATO CARRARA MARBLE</h3>
                                        <div class="md:hidden mt-1 flex items-center gap-3">
                                            <span class="text-xs font-light text-white/60">$1,890.00</span>
                                        </div>
                                    </div>

                                    <div class="hidden md:block w-[15%] text-center text-sm font-light">$1,890.00</div>
                                    
                                    <div class="mt-3 md:mt-0 md:w-[20%] flex items-center md:justify-center">
                                        <div class="flex items-center border border-white/10 rounded-full px-2 py-1 md:px-4 md:py-2">
                                            <button class="text-white/30 hover:text-white p-1"><i data-lucide="minus" size="12"></i></button>
                                            <input type="number" value="1" class="w-8 md:w-12 bg-transparent text-center text-xs focus:outline-none">
                                            <button class="text-white/30 hover:text-white p-1"><i data-lucide="plus" size="12"></i></button>
                                        </div>
                                    </div>

                                    <div class="hidden md:block w-[20%] text-right text-base font-medium text-[#c5a059]">$1,890.00</div>
                                    
                                    <div class="md:hidden flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                                        <span class="text-sm font-semibold text-[#c5a059]">$1,890.00</span>
                                        <button class="text-red-500/80 hover:text-red-400 p-2"><i data-lucide="trash-2" size="16"></i></button>
                                    </div>
                                </div>
                                <button class="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 text-red-500/40 hover:text-red-500 transition-colors">
                                    <i data-lucide="x" size="18"></i>
                                </button>
                            </div>
                        </div>
                    </div>

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

    <!-- Footer Mock (Minimized) -->
    <footer class="bg-black py-12 border-t border-white/5">
        <div class="max-w-[1440px] mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p class="text-[9px] text-white/30 tracking-[0.4em] uppercase">© 2026 R Ceramica. Crafted with Excellence.</p>
            <div class="flex gap-12 text-[9px] text-white/30 tracking-[0.4em] uppercase">
                <a href="#" class="hover:text-white transition-colors">Privacy</a>
                <a href="#" class="hover:text-white transition-colors">Terms</a>
                <a href="#" class="hover:text-white transition-colors">Shipping</a>
            </div>
        </div>
    </footer>
</main>
<?php get_footer(); ?>
