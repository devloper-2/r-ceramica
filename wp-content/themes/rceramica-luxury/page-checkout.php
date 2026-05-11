<?php
/**
 * Template for the Checkout page.
 */
get_header();
?>
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
                <img src="https://rceramica.com/logo/logo.png" alt="R Ceramica" class="h-8 md:h-10 w-auto">
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

                    <form class="space-y-4 md:space-y-12">
                        <!-- Shipping Section -->
                        <div id="section-shipping" class="space-y-4 md:space-y-10">
                            <div class="grid grid-cols-2 gap-3 md:gap-8">
                                <div>
                                    <label class="!mb-1.5">First Name</label>
                                    <input type="text" class="checkout-input !py-3" placeholder="WINTER">
                                </div>
                                <div>
                                    <label class="!mb-1.5">Last Name</label>
                                    <input type="text" class="checkout-input !py-3" placeholder="NIGHTINGALE">
                                </div>
                            </div>
                            
                            <div>
                                <label class="!mb-1.5">Address</label>
                                <input type="text" class="checkout-input !py-3" placeholder="AVENUE MONTAGE 42">
                            </div>

                            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                                <div class="col-span-2 md:col-span-1">
                                    <label class="!mb-1.5">City</label>
                                    <input type="text" class="checkout-input !py-3" placeholder="HOUSTON">
                                </div>
                                <div>
                                    <label class="!mb-1.5">State</label>
                                    <input type="text" class="checkout-input !py-3" placeholder="TX">
                                </div>
                                <div>
                                    <label class="!mb-1.5">Zip</label>
                                    <input type="text" class="checkout-input !py-3" placeholder="77002">
                                </div>
                            </div>
                        </div>

                        <!-- Payment architecture -->
                        <div class="pt-4 md:pt-12 border-t border-white/5">
                            <h3 class="text-[8px] md:text-[11px] uppercase tracking-[0.3em] font-semibold mb-3">Payment</h3>
                            <div class="grid grid-cols-2 gap-3">
                                <div class="payment-card rounded-xl p-3 md:p-6 active flex flex-col items-center">
                                    <i data-lucide="credit-card" class="mb-1.5" size="18"></i>
                                    <span class="text-[7px] uppercase tracking-widest font-medium">Card</span>
                                </div>
                                <div class="payment-card rounded-xl p-3 md:p-6 flex flex-col items-center">
                                    <i data-lucide="apple" class="mb-1.5" size="18"></i>
                                    <span class="text-[7px] uppercase tracking-widest font-medium">Pay</span>
                                </div>
                            </div>
                        </div>

                        <div class="pt-4">
                            <button type="submit" class="w-full bg-white text-black py-4 md:py-6 rounded-full text-[9px] md:text-[11px] font-bold tracking-[0.3em] uppercase transition-all active:scale-[0.98]">
                                Complete Order
                            </button>
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
                            <div class="flex gap-4 items-center">
                                <div class="w-14 h-14 bg-[#151515] rounded-lg overflow-hidden flex-shrink-0">
                                    <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80" alt="Product" class="w-full h-full object-cover grayscale">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-[10px] uppercase tracking-tight font-medium truncate">AURA MATTE BLACK TAP</h4>
                                    <div class="flex justify-between items-center mt-1">
                                        <span class="text-[9px] text-white/30 uppercase">Qty: 1</span>
                                        <span class="text-[11px] font-light">$2,450.00</span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex gap-4 items-center">
                                <div class="w-14 h-14 bg-[#151515] rounded-lg overflow-hidden flex-shrink-0">
                                    <img src="https://images.unsplash.com/photo-1615529182906-134d12bbd61c?auto=format&fit=crop&q=80" alt="Product" class="w-full h-full object-cover grayscale">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-[10px] uppercase tracking-tight font-medium truncate">VENATO carrara marble</h4>
                                    <div class="flex justify-between items-center mt-1">
                                        <span class="text-[9px] text-white/30 uppercase">Qty: 1</span>
                                        <span class="text-[11px] font-light">$1,890.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Calculations -->
                        <div class="space-y-3 mb-6 pb-6 border-b border-white/5">
                            <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                                <span>Subtotal</span>
                                <span class="text-white">$4,340.00</span>
                            </div>
                            <div class="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                                <span>Tax</span>
                                <span class="text-white">$347.00</span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center">
                            <span class="text-[9px] uppercase tracking-[0.3em] font-medium text-[#c5a059]">Total Due</span>
                            <span class="text-2xl font-light">$4,687.00</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
</main>
<?php get_footer(); ?>
