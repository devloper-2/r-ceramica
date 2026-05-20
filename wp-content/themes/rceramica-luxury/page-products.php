<?php
/**
 * Template for the Products page.
 */
get_header();
?>
<main id="site-content" role="main">

    <main class="pt-32 md:pt-48 pb-24">
        <div class="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-24">
            
            <!-- Breadcrumbs & Sort -->
            <div class="relative z-[70] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-slide-up">
                <div class="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
                    <a href="<?php echo esc_url( home_url( "/" ) ); ?>" class="hover:text-white transition-colors">Home</a>
                    <i data-lucide="chevron-right" size="10"></i>
                    <a href="<?php echo esc_url( home_url( "/faucets/" ) ); ?>" class="hover:text-white transition-colors">Bathrooms</a>
                    <i data-lucide="chevron-right" size="10"></i>
                    <span class="text-white" id="current-category">Fusion Collection</span>
                </div>
                
                <div class="flex items-center gap-8">
                    <p class="text-[10px] uppercase tracking-[0.2em] text-white/30"><span id="product-count" class="text-white">12</span> Products Found</p>
                    <div class="relative">
                        <button id="sort-button" onclick="toggleSortMenu()" class="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/80 hover:text-white pb-1 border-b border-white/10 transition-colors">
                            Sort By: <span id="current-sort">Recommended</span> <i data-lucide="chevron-down" size="12"></i>
                        </button>
                        <!-- Sort Dropdown Menu -->
                        <div id="sort-menu" class="absolute right-0 mt-3 w-56 bg-[#111] border border-white/5 hidden z-[100] shadow-2xl backdrop-blur-xl">
                            <div class="flex flex-col py-3">
                                <button onclick="applySort('recommended', 'Recommended')" class="px-6 py-4 text-[9px] uppercase tracking-[0.3em] text-left text-white/50 hover:text-white hover:bg-white/5 transition-all">Recommended</button>
                                <button onclick="applySort('price-low', 'Price: Low to High')" class="px-6 py-4 text-[9px] uppercase tracking-[0.3em] text-left text-white/50 hover:text-white hover:bg-white/5 transition-all">Price: Low to High</button>
                                <button onclick="applySort('price-high', 'Price: High to Low')" class="px-6 py-4 text-[9px] uppercase tracking-[0.3em] text-left text-white/50 hover:text-white hover:bg-white/5 transition-all">Price: High to Low</button>
                                <button onclick="applySort('newest', 'Newest Arrivals')" class="px-6 py-4 text-[9px] uppercase tracking-[0.3em] text-left text-white/50 hover:text-white hover:bg-white/5 transition-all">Newest Arrivals</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-16">
                
                <aside id="filter-sidebar" class="hidden-mobile lg:block w-full lg:w-80 shrink-0 lg:animate-slide-up" style="animation-delay: 0.1s">
                    <div class="lg:sticky lg:top-48 filter-container flex flex-col h-full lg:h-auto bg-[#0a0a0a] lg:bg-transparent">
                        
                        <!-- Mobile Header -->
                        <div class="lg:hidden flex justify-between items-center px-6 py-6 border-b border-white/5 sticky top-0 bg-[#0a0a0a] z-10">
                            <h4 class="text-lg font-display uppercase tracking-widest text-[#c5a059]">Refine By</h4>
                            <button onclick="toggleMobileFilters()" class="text-white/60 hover:text-white transition-colors">
                                <i data-lucide="x" size="24"></i>
                            </button>
                        </div>

                        <!-- Scrollable Body -->
                        <div class="flex-1 overflow-y-auto px-6 lg:px-0 py-8 lg:py-0 lg:space-y-2 filter-panel">
                            <!-- Sort Accordion (Mobile Only) -->
                            <div class="lg:hidden border border-white/5 overflow-hidden">
                                <button onclick="toggleAccordion('sort-mobile')" class="w-full flex justify-between items-center bg-[#111] px-6 py-5 hover:bg-[#151515] transition-colors group">
                                    <span class="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 group-hover:text-white">Sort By</span>
                                    <i id="sort-mobile-icon" data-lucide="plus" size="14" class="text-white/40 group-hover:text-white transition-transform"></i>
                                </button>
                                <div id="sort-mobile" class="hidden px-6 py-4 space-y-2 bg-black/40">
                                    <button onclick="applySort('recommended', 'Recommended'); toggleMobileFilters()" class="w-full text-left py-3 text-[9px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Recommended</button>
                                    <button onclick="applySort('price-low', 'Price: Low to High'); toggleMobileFilters()" class="w-full text-left py-3 text-[9px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Price: Low to High</button>
                                    <button onclick="applySort('price-high', 'Price: High to Low'); toggleMobileFilters()" class="w-full text-left py-3 text-[9px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Price: High to Low</button>
                                    <button onclick="applySort('newest', 'Newest Arrivals'); toggleMobileFilters()" class="w-full text-left py-3 text-[9px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Newest Arrivals</button>
                                </div>
                            </div>

                            <!-- Selected Options (Always Visible) -->
                            <div class="bg-white/5 border border-white/5 p-6 mb-6">
                                <h4 class="text-[10px] font-display font-medium uppercase tracking-[0.2em] text-white/40 mb-4">Selected Options</h4>
                                <div id="selected-filters" class="flex flex-wrap gap-2">
                                    <span class="bg-white/10 text-[9px] px-3 py-1.5 uppercase tracking-widest flex items-center gap-2 group cursor-pointer hover:bg-white/20">
                                        Chrome <i data-lucide="x" size="10"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- Price Accordion -->
                            <div class="border border-white/5 overflow-hidden">
                                <button onclick="toggleAccordion('price-filter')" class="w-full flex justify-between items-center bg-[#111] px-6 py-5 hover:bg-[#151515] transition-colors group">
                                    <span class="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 group-hover:text-white">Budget Range</span>
                                    <i id="price-filter-icon" data-lucide="plus" size="14" class="text-white/40 group-hover:text-white transition-transform"></i>
                                </button>
                                <div id="price-filter" class="hidden px-6 py-10 space-y-8 bg-black/40">
                                    <!-- Price Slider -->
                                    <div class="space-y-4">
                                        <div class="flex justify-between items-center text-[9px] uppercase tracking-widest text-white/40">
                                            <span>Min: ₹0</span>
                                            <span id="slider-val">Max: ₹50,000</span>
                                        </div>
                                        <input type="range" id="price-slider" min="0" max="100000" step="500" value="50000" oninput="syncInputsFromSlider()" class="cursor-pointer">
                                    </div>
                                    
                                    <!-- Price Inputs -->
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="space-y-2">
                                            <label class="text-[8px] uppercase tracking-widest text-white/30">Min Budget</label>
                                            <div class="relative">
                                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-white/40">₹</span>
                                                <input type="number" id="price-min" value="0" class="w-full bg-white/5 border border-white/10 pl-6 pr-3 py-3 text-[10px] text-white outline-none focus:border-[#c5a059] transition-colors appearance-none">
                                            </div>
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-[8px] uppercase tracking-widest text-white/30">Max Budget</label>
                                            <div class="relative">
                                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-white/40">₹</span>
                                                <input type="number" id="price-max" value="50000" class="w-full bg-white/5 border border-white/10 pl-6 pr-3 py-3 text-[10px] text-white outline-none focus:border-[#c5a059] transition-colors appearance-none">
                                            </div>
                                        </div>
                                    </div>

                                    <button class="w-full py-3 text-[9px] uppercase tracking-[0.2em] font-bold border border-[#c5a059]/20 text-[#c5a059] hover:bg-[#c5a059] hover:text-white transition-all">
                                        Apply Range
                                    </button>
                                </div>
                            </div>

                            <!-- Area Accordion -->
                            <div class="border border-white/5 overflow-hidden">
                                <button onclick="toggleAccordion('area-filter')" class="w-full flex justify-between items-center bg-[#111] px-6 py-5 hover:bg-[#151515] transition-colors group">
                                    <span class="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 group-hover:text-white">Area</span>
                                    <i id="area-filter-icon" data-lucide="plus" size="14" class="text-white/40 group-hover:text-white transition-transform"></i>
                                </button>
                                <div id="area-filter" class="hidden px-6 py-8 space-y-4 bg-black/40">
                                    <label class="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                                        <input type="checkbox" class="w-3.5 h-3.5 rounded-sm bg-white/5 border-white/10 border checked:bg-white">
                                        <span>Basin</span>
                                    </label>
                                    <label class="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                                        <input type="checkbox" class="w-3.5 h-3.5 rounded-sm bg-white/5 border-white/10 border checked:bg-white">
                                        <span>Shower</span>
                                    </label>
                                    <label class="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                                        <input type="checkbox" class="w-3.5 h-3.5 rounded-sm bg-white/5 border-white/10 border checked:bg-white">
                                        <span>Kitchen</span>
                                    </label>
                                </div>
                            </div>

                            <!-- Color Finishes Accordion (Active) -->
                            <div class="border border-white/5 overflow-hidden">
                                <button onclick="toggleAccordion('color-filter')" class="w-full flex justify-between items-center bg-[#111] px-6 py-5 hover:bg-[#151515] transition-colors group">
                                    <span class="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 group-hover:text-white">Color Finishes</span>
                                    <i id="color-filter-icon" data-lucide="minus" size="14" class="text-white/40 group-hover:text-white transition-transform"></i>
                                </button>
                                <div id="color-filter" class="px-6 py-8 space-y-6 bg-black/40">
                                    <div class="flex items-center gap-4 cursor-pointer group">
                                        <div class="w-10 h-10 border border-white/10 overflow-hidden">
                                            <img src="https://rceramica.com/img/finishes/black_chrome.jpg" onerror="this.src='https://placehold.co/40x40/333333/ffffff?text=BC'" class="w-full h-full object-cover">
                                        </div>
                                        <span class="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Black Chrome</span>
                                    </div>
                                    <div class="flex items-center gap-4 cursor-pointer group">
                                        <div class="w-10 h-10 border border-white/10 bg-[#1a1a1a]"></div>
                                        <span class="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Black Matt</span>
                                    </div>
                                    <div class="flex items-center gap-4 cursor-pointer group">
                                        <div class="w-10 h-10 border border-white/10 bg-[#7c5e42]"></div>
                                        <span class="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Blush Gold Bright PVD</span>
                                    </div>
                                    <div class="flex items-center gap-4 cursor-pointer group">
                                        <div class="w-10 h-10 border border-white/10 bg-gradient-to-br from-[#dfdfdf] to-[#999]"></div>
                                        <span class="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Chrome</span>
                                    </div>
                                    <div class="flex items-center gap-4 cursor-pointer group">
                                        <div class="relative w-10 h-10 border border-[#c5a059] bg-[#b89552]">
                                            <div class="absolute inset-0 flex items-center justify-center">
                                                <i data-lucide="check" size="12" class="text-black"></i>
                                            </div>
                                        </div>
                                        <span class="text-[10px] uppercase tracking-widest text-white transition-colors">Gold Bright PVD</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Mounting Accordion -->
                            <div class="border border-white/5 overflow-hidden">
                                <button onclick="toggleAccordion('mounting-filter')" class="w-full flex justify-between items-center bg-[#111] px-6 py-5 hover:bg-[#151515] transition-colors group">
                                    <span class="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 group-hover:text-white">Mounting</span>
                                    <i id="mounting-filter-icon" data-lucide="plus" size="14" class="text-white/40 group-hover:text-white transition-transform"></i>
                                </button>
                                <div id="mounting-filter" class="hidden px-6 py-8 space-y-4 bg-black/40">
                                    <label class="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                                        <input type="checkbox" class="w-3.5 h-3.5 rounded-sm bg-white/5 border-white/10 border checked:bg-white">
                                        <span>Deck Mounted</span>
                                    </label>
                                    <label class="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                                        <input type="checkbox" class="w-3.5 h-3.5 rounded-sm bg-white/5 border-white/10 border checked:bg-white">
                                        <span>Wall Mounted</span>
                                    </label>
                                </div>
                            </div>

                            <!-- Range Accordion -->
                            <div class="border border-white/5 overflow-hidden">
                                <button onclick="toggleAccordion('range-filter')" class="w-full flex justify-between items-center bg-[#111] px-6 py-5 hover:bg-[#151515] transition-colors group">
                                    <span class="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 group-hover:text-white">Range</span>
                                    <i id="range-filter-icon" data-lucide="plus" size="14" class="text-white/40 group-hover:text-white transition-transform"></i>
                                </button>
                                <div id="range-filter" class="hidden px-6 py-8 space-y-4 bg-black/40">
                                    <label class="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                                        <input type="checkbox" class="w-3.5 h-3.5 rounded-sm bg-white/5 border-white/10 border checked:bg-white">
                                        <span>Economy</span>
                                    </label>
                                    <label class="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                                        <input type="checkbox" class="w-3.5 h-3.5 rounded-sm bg-white/5 border-white/10 border checked:bg-white">
                                        <span>Premium</span>
                                    </label>
                                    <label class="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                                        <input type="checkbox" class="w-3.5 h-3.5 rounded-sm bg-white/5 border-white/10 border checked:bg-white">
                                        <span>Luxury</span>
                                    </label>
                                </div>
                            </div>

                            <!-- Shape Accordion -->
                            <div class="border border-white/5 overflow-hidden">
                                <button onclick="toggleAccordion('shape-filter')" class="w-full flex justify-between items-center bg-[#111] px-6 py-5 hover:bg-[#151515] transition-colors group">
                                    <span class="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 group-hover:text-white">Shape</span>
                                    <i id="shape-filter-icon" data-lucide="plus" size="14" class="text-white/40 group-hover:text-white transition-transform"></i>
                                </button>
                                <div id="shape-filter" class="hidden px-6 py-8 space-y-4 bg-black/40">
                                    <label class="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                                        <input type="checkbox" class="w-3.5 h-3.5 rounded-sm bg-white/5 border-white/10 border checked:bg-white">
                                        <span>Square</span>
                                    </label>
                                    <label class="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                                        <input type="checkbox" class="w-3.5 h-3.5 rounded-sm bg-white/5 border-white/10 border checked:bg-white">
                                        <span>Round</span>
                                    </label>
                                    <label class="flex items-center gap-3 group cursor-pointer text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                                        <input type="checkbox" class="w-3.5 h-3.5 rounded-sm bg-white/5 border-white/10 border checked:bg-white">
                                        <span>Curved</span>
                                    </label>
                                </div>
                            </div>

                            <div class="pt-8 block lg:hidden">
                                <button class="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold border border-white/10 hover:bg-white hover:text-black transition-all">
                                    Reset All
                                </button>
                            </div>
                        </div>

                        <!-- Sticky Mobile Footer -->
                        <div class="lg:hidden p-6 border-t border-white/5 bg-[#0a0a0a] sticky bottom-0">
                            <button onclick="toggleMobileFilters()" class="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold bg-[#c5a059] text-white transition-all shadow-2xl">
                                Apply Selection
                            </button>
                        </div>

                        <!-- Desktop Reset Button (Visible only on lg) -->
                        <div class="hidden lg:block pt-8">
                            <button class="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold border border-white/10 hover:bg-white hover:text-black transition-all">
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </aside>

                <!-- Product Grid -->
                <div class="flex-1">
                    <div id="product-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
                        <!-- Products will be injected here -->
                    </div>
                </div>

            </div>
        </div>
    </main>

    <!-- Professional Architecture Footer -->
    <footer class="relative bg-[#0c0c0c] pt-24 pb-12 border-t border-white/5">
        <div class="max-w-[1720px] mx-auto px-6 md:px-24">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                <div class="space-y-10">
                    <img src="https://rceramica.com/logo/logo.png" alt="R Ceramica Logo" class="h-16 w-auto object-contain">
                    <p class="text-white/40 text-[13px] leading-relaxed font-light max-w-sm">
                        R Ceramica is a brand that believes in continuous development and growth. We innovate to reform the market approach.
                    </p>
                </div>
                <!-- Simplified links -->
                <div class="space-y-10 text-[13px] text-white/40 uppercase tracking-wider">
                    <h4 class="text-white font-display text-lg tracking-wider font-light lowercase capitalize">Collections</h4>
                    <ul class="space-y-4 lowercase capitalize">
                        <li><a href="#" class="hover:text-white transition-colors">Lounge Tiles</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Bathware Series</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Kitchen Concepts</a></li>
                    </ul>
                </div>
                <div class="space-y-10 text-[13px] text-white/40 uppercase tracking-wider">
                    <h4 class="text-white font-display text-lg tracking-wider font-light lowercase capitalize">Corporate</h4>
                    <ul class="space-y-4 lowercase capitalize">
                        <li><a href="<?php echo esc_url( home_url( "/about/" ) ); ?>" class="hover:text-white transition-colors">Story</a></li>
                        <li><a href="<?php echo esc_url( home_url( "/contact/" ) ); ?>" class="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
                <div class="space-y-10">
                    <h4 class="text-white font-display text-lg tracking-wider font-light lowercase capitalize">Contact</h4>
                    <div class="space-y-4 text-[13px] text-white/40 leading-relaxed font-light">
                        <p>Morbi, Gujarat (INDIA)</p>
                        <p>PH: +91 94274 10127</p>
                    </div>
                </div>
            </div>
            <div class="pt-16 border-t border-white/5 flex flex-col items-center gap-6 text-[10px] text-white/20 uppercase tracking-[0.3em]">
                <p>© 2024 R Ceramica Global. All Rights Reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Notification Toast -->
    <div id="toast" class="fixed top-24 right-6 md:right-12 bg-white text-black pl-6 pr-10 py-5 border-l-4 border-[#c5a059] opacity-0 translate-x-12 pointer-events-none transition-all duration-500 z-[200] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div class="flex items-center gap-4">
            <div class="bg-black/5 p-2 rounded-full">
                <i data-lucide="check" size="18" class="text-[#c5a059]"></i>
            </div>
            <div>
                <p class="text-[10px] uppercase tracking-[0.3em] font-bold mb-0.5">Success</p>
                <p class="text-[9px] uppercase tracking-[0.2em] text-black/60" id="toast-message">Item Added to Cart</p>
            </div>
        </div>
        <div class="absolute bottom-0 left-0 h-[2px] bg-[#c5a059] w-0 toast-progress"></div>
    </div>

    <!-- Mobile Filter Toggle -->
    <div class="lg:hidden fixed bottom-8 right-6 z-[80] animate-slide-up">
        <button id="mobile-filter-btn" onclick="toggleMobileFilters()" class="flex items-center justify-center bg-white text-black w-12 h-12 rounded-full shadow-2xl active:scale-90 transition-all duration-300">
            <i data-lucide="filter" size="18"></i>
        </button>
    </div>

    <!-- Scripts -->
</main>
<?php get_footer(); ?>
