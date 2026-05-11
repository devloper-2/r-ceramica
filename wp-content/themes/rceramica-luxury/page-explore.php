<?php
/**
 * Template for the Explore page.
 */
get_header();
?>
<main id="site-content" role="main">


    <nav id="navbar" class="fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans font-light">
        <div class="relative flex justify-between items-center px-4 md:px-12 h-20 md:h-24">
            <div id="nav-left" class="flex items-center gap-8 relative z-[60]">
                <button onclick="toggleMobileMenu()" class="lg:hidden text-white relative z-[70] p-2 -ml-2">
                    <i data-lucide="menu" size="24"></i>
                </button>
                <a href="<?php echo esc_url( home_url( "/" ) ); ?>" class="flex items-center relative z-[60]">
                    <img id="navbar-logo" src="https://rceramica.com/logo/logo.png" alt="R Ceramica Logo" class="h-10 md:h-14 w-auto object-contain">
                </a>
            </div>
            
            <div id="nav-right" class="flex items-center gap-6 md:gap-10 relative z-20">
                <div onclick="toggleSearch()" class="flex items-center cursor-pointer group">
                    <span class="material-symbols-outlined font-light text-2xl md:text-3xl text-white/80 group-hover:text-white transition-colors">search</span>
                </div>
                <div class="flex items-center gap-6 md:gap-10">
                    <a href="<?php echo esc_url( home_url( "/cart/" ) ); ?>" class="flex items-center hover:text-white/80 transition-colors group relative">
                        <i data-lucide="shopping-cart" size="24" stroke-width="1.2" class="text-white/80 transition-all"></i>
                        <span id="cart-count-mobile" class="absolute -top-2 -right-2 bg-white text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </a>
                    <button onclick="toggleLangDropdown(event)" class="text-[11px] font-medium uppercase tracking-[0.2em] opacity-80" id="lang-text">EN</button>
                    <button onclick="toggleLoginDropdown(event)"><span class="material-symbols-outlined font-light text-2xl md:text-3xl">account_circle</span></button>
                </div>
            </div>
            
            <div id="nav-center" class="absolute inset-0 flex justify-center items-center pointer-events-none px-4 md:px-12">
                <div id="search-input-container" class="w-full max-w-xl opacity-0 pointer-events-none translate-y-4 transition-all duration-500 relative">
                    <div class="flex items-center w-full relative pointer-events-auto">
                        <input type="text" id="search-input" placeholder="SEARCH COLLECTION..." class="w-full bg-transparent border-b border-white/20 text-white text-[11px] md:text-xs font-display font-light placeholder:text-white/30 focus:outline-none py-2 px-1 text-center uppercase tracking-[0.3em] focus:border-white transition-all">
                        <button onclick="toggleSearch()" class="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"><i data-lucide="x" class="w-4 h-4 md:w-5 md:h-5"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </nav>

        <!-- Global Language Dropdown -->
        <div id="lang-dropdown" class="hidden absolute right-4 md:right-12 top-[80px] md:top-[96px] w-48 bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-sm shadow-2xl z-[110]">
            <button onclick="selectLang('EN', 'English')" class="w-full text-left px-5 py-3 md:py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all flex justify-between items-center uppercase tracking-[0.25em] font-medium">
                English <div class="lang-indicator w-1.5 h-1.5 bg-white rounded-full"></div>
            </button>
            <button onclick="selectLang('AR', 'Arabic')" class="w-full text-left px-5 py-3 md:py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.25em] font-medium">Arabic</button>
            <button onclick="selectLang('HI', 'Hindi')" class="w-full text-left px-5 py-3 md:py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.25em] font-medium">Hindi</button>
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

        <!-- Mobile Tools Dropdown -->
        <div id="mobile-tools-dropdown" class="hidden absolute right-4 top-[80px] w-64 bg-neutral-950 border border-white/10 rounded-sm shadow-2xl z-[70] overflow-hidden">
            <div class="flex flex-col divide-y divide-white/5">
                <button onclick="toggleSearch(); toggleMobileTools();" class="w-full px-6 py-4 text-left text-[10px] uppercase tracking-[0.25em] hover:bg-white/5 flex items-center gap-4 transition-colors">
                    <span class="material-symbols-outlined font-light text-white/60">search</span>
                    <span>Search Collection</span>
                </button>
                <a href="<?php echo esc_url( home_url( "/cart/" ) ); ?>" class="px-6 py-4 text-[10px] uppercase tracking-[0.25em] hover:bg-white/5 flex items-center justify-between transition-colors">
                    <div class="flex items-center gap-4">
                        <span class="material-symbols-outlined font-light text-white/60">shopping_cart</span>
                        <span>Shopping Cart</span>
                    </div>
                    <span class="bg-white text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                </a>
            </div>
        </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="mobile-menu-hidden fixed inset-0 bg-[#0a0a0a] z-[500] flex flex-col p-8 overflow-y-auto transition-all duration-500">
        <div class="flex justify-between items-center mb-12">
            <img src="https://rceramica.com/logo/logo.png" alt="Logo" class="h-12 w-auto">
            <button onclick="toggleMobileMenu()" class="text-white hover:text-gray-400 transition-colors">
                <i data-lucide="x" size="32"></i>
            </button>
        </div>
        
        <div class="flex flex-col space-y-1 gap-2 mb-12">
            <a href="<?php echo esc_url( home_url( "/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">HOME</a>
            <a href="<?php echo esc_url( home_url( "/about/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">ABOUT US</a>
            <a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-[#c5a059] py-3 border-b border-white/5 uppercase text-[#c5a059]">TILES</a>
            <a href="<?php echo esc_url( home_url( "/faucets/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">BATHROOMS</a>
            <a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">ACCESSORIES</a>
            <a href="<?php echo esc_url( home_url( "/orders/" ) ); ?>" id="mobile-orders-link" class="hidden text-xl font-light tracking-widest hover:text-[#c5a059] py-3 border-b border-white/5 uppercase">ORDERS</a>
            <a href="#" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">CATALOGUE</a>
            <a href="<?php echo esc_url( home_url( "/contact/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">CONTACT US</a>
            <a href="<?php echo esc_url( home_url( "/login/" ) ); ?>" id="mobile-signin-link" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">SIGN IN</a>
            <div id="mobile-user-info" class="hidden py-4 border-b border-white/5">
                <div class="flex items-center gap-3">
                    <div id="mobile-user-name" class="text-xl font-light tracking-widest text-white uppercase truncate">User</div>
                    <button onclick="logout()" class="text-white/40 hover:text-white transition-colors flex items-center">
                         <span class="material-symbols-outlined text-[20px]">logout</span>
                    </button>
                </div>
            </div>
        </div>
    </div>


    <main class="relative">
        <!-- Architectural Surfaces Section -->
        <section class="relative group overflow-hidden bg-[#080808] h-screen w-full snap-start explore-item">
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80" class="absolute inset-0 w-full h-full object-cover explore-img opacity-50 transition-transform duration-[4s]" alt="Main Collection">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-24">
                <div class="max-w-[1720px] mx-auto w-full">
                    <div class="max-w-2xl">
                        <span class="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-[#c5a059] mb-6 block font-medium opacity-80">Heritage Collection</span>
                        <h1 class="text-4xl md:text-7xl lg:text-8xl font-display font-light uppercase tracking-tight leading-[1.1] md:leading-[1] mb-8">
                            Architectural <br><span class="italic font-normal opacity-30">Surfaces</span>
                        </h1>
                        <p class="text-white/40 text-[12px] md:text-[13px] uppercase tracking-[0.3em] mb-12 max-w-sm leading-relaxed">
                            Curated porcelain systems for high-envelope architecture.
                        </p>
                        <a href="products.html?category=tiles" class="inline-flex items-center gap-6 group/link">
                            <span class="text-[11px] uppercase tracking-[0.5em] border-b border-white/20 pb-2 group-hover/link:border-white transition-all">View Collection</span>
                            <i data-lucide="arrow-right" size="18" class="group-hover:translate-x-2 transition-transform"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Luxury Showers Section -->
        <section class="relative group overflow-hidden bg-[#0c0c0c] h-screen w-full snap-start explore-item border-t border-white/5">
            <img src="https://images.unsplash.com/photo-1620626014330-f99a0937285d?auto=format&fit=crop&q=80" class="absolute inset-0 w-full h-full object-cover explore-img opacity-30 transition-transform duration-[4s]" alt="Showers">
            <div class="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all"></div>
            <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-24">
                <div class="max-w-[1720px] mx-auto w-full">
                    <div class="max-w-2xl">
                        <span class="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-[#c5a059] mb-6 block font-medium opacity-80">Designer Range</span>
                        <h2 class="text-4xl md:text-7xl lg:text-8xl font-display font-light uppercase tracking-widest mb-8 leading-tight">Luxury <br>Showers</h2>
                        <p class="text-white/40 text-[12px] md:text-[13px] uppercase tracking-[0.3em] mb-12 max-w-md leading-relaxed">Advanced hydro-therapy systems designed for the ultimate wellness experience.</p>
                        <a href="<?php echo esc_url( home_url( "/faucets/" ) ); ?>" class="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.5em] text-white/60 hover:text-white transition-all font-medium border-b border-white/10 pb-2 hover:border-white transition-all">
                            Explore Models <i data-lucide="chevron-right" size="16" class="mt-0.5"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Artisan Faucets Section -->
        <section class="relative group overflow-hidden bg-[#0a0a0a] h-screen w-full snap-start explore-item border-t border-white/5">
            <img src="https://images.unsplash.com/photo-1584622781514-f670c2269a84?auto=format&fit=crop&q=80&w=1600" class="absolute inset-0 w-full h-full object-cover explore-img opacity-50" alt="Artisan Faucets">
            <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end md:justify-center p-8 md:p-24">
                <div class="max-w-[1720px] mx-auto w-full flex flex-col items-start text-left">
                    <div class="w-full md:w-auto">
                        <span class="text-[12px] uppercase tracking-[0.7em] text-[#c5a059] mb-8 block font-medium">Geometric Precision</span>
                        <h2 class="text-4xl md:text-8xl font-display font-light uppercase tracking-tight mb-10 leading-[1]">Artisan <br class="hidden md:block">Faucets</h2>
                        <p class="text-white/40 text-[14px] uppercase tracking-[0.4em] mb-16 max-w-md leading-relaxed">Precision engineered hardware defining the intersection of fluid dynamics and sculpture.</p>
                        <a href="<?php echo esc_url( home_url( "/faucets/" ) ); ?>" class="inline-flex items-center gap-8 group/link">
                            <span class="text-[12px] uppercase tracking-[0.6em] border-b border-white/20 pb-3 group-hover/link:border-[#c5a059] transition-all">Technical Series</span>
                            <i data-lucide="arrow-right" size="20" class="group-hover/link:translate-x-3 transition-transform text-[#c5a059]"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sanitary Forms Section -->
        <section class="relative group overflow-hidden bg-[#0c0c0c] h-screen w-full snap-start explore-item border-t border-white/5">
            <img src="https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=1600" class="w-full h-full object-cover explore-img opacity-40 transition-transform duration-[3s]" alt="Bathware">
            <div class="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
            <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-24">
                <div class="max-w-[1720px] mx-auto w-full">
                    <span class="text-[12px] uppercase tracking-[0.7em] text-[#c5a059] mb-8 block font-medium">Hygiene Systems</span>
                    <h2 class="text-4xl md:text-8xl font-display font-light uppercase tracking-widest mb-10 leading-[1]">Sanitary <br class="hidden md:block">Form</h2>
                    <p class="text-white/40 text-[14px] uppercase tracking-[0.5em] mb-16 max-w-2xl leading-relaxed">High-performance water closets connecting ergonomic form and sustainability for contemporary living.</p>
                    <a href="<?php echo esc_url( home_url( "/faucets/" ) ); ?>" class="inline-block py-5 px-16 border border-white/10 hover:bg-white hover:text-black transition-all text-[12px] uppercase tracking-[0.5em] font-medium">Browse Complete Series</a>
                </div>
            </div>
        </section>

        <!-- Minimal Basins Section -->
        <section class="relative group overflow-hidden bg-[#080808] h-screen w-full snap-start explore-item border-t border-white/5">
            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1600" class="absolute inset-0 w-full h-full object-cover explore-img opacity-40" alt="Wash Basin">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-24">
                <div class="max-w-[1720px] mx-auto w-full">
                    <span class="text-[12px] uppercase tracking-[0.7em] text-[#c5a059] mb-8 block font-medium">Vessel Works</span>
                    <h2 class="text-4xl md:text-8xl font-display font-light uppercase tracking-widest mb-10 leading-[1]">Minimal <br>Basins</h2>
                    <p class="text-white/40 text-[14px] uppercase tracking-[0.5em] mb-16 max-w-2xl leading-relaxed">Hand-crafted artisan basins that redefine the morning ritual through stone and ceramic textures.</p>
                    <a href="<?php echo esc_url( home_url( "/faucets/" ) ); ?>" class="inline-block py-5 px-16 border border-white/10 hover:bg-white hover:text-black transition-all text-[12px] uppercase tracking-[0.5em] font-medium">Explore Gallery</a>
                </div>
            </div>
        </section>

        <!-- FRP Manhole Section -->
        <section class="relative group overflow-hidden bg-[#060606] h-screen w-full snap-start explore-item border-t border-white/5">
            <img src="https://images.unsplash.com/photo-1533150423042-12714441c940?auto=format&fit=crop&q=80&w=1600" class="absolute inset-0 w-full h-full object-cover explore-img opacity-30" alt="FRP Manhole">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
            <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-24">
                <div class="max-w-[1720px] mx-auto w-full">
                    <span class="text-[12px] uppercase tracking-[0.7em] text-[#c5a059] mb-8 block font-medium">Infrastructural</span>
                    <h2 class="text-4xl md:text-8xl font-display font-light uppercase tracking-widest mb-10 leading-[1]">FRP <br>Manhole</h2>
                    <div class="mb-12">
                        <p class="text-[14px] text-white/50 mb-1 font-light tracking-[0.3em] uppercase">a blend of durability</p>
                        <p class="text-[14px] text-white/50 font-light tracking-[0.3em] uppercase">and sustainable performance</p>
                    </div>
                    <a href="<?php echo esc_url( home_url( "/login/" ) ); ?>" class="inline-flex items-center gap-8 group/link">
                        <span class="text-[12px] uppercase tracking-[0.6em] border-b border-white/20 pb-3 group-hover/link:border-[#c5a059] transition-all">Technical Spec</span>
                        <i data-lucide="arrow-right" size="20" class="group-hover/link:translate-x-3 transition-transform text-[#c5a059]"></i>
                    </a>
                </div>
            </div>
        </section>

    </main>

    <!-- Professional Architecture Footer -->
    <footer class="relative bg-[#0c0c0c] pt-24 pb-12 border-t border-white/5 overflow-hidden">
        <div class="max-w-[1440px] mx-auto px-6 md:px-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-24">
                <!-- Column 1: Brand Profile -->
                <div class="space-y-10">
                    <img src="https://rceramica.com/logo/logo.png" alt="R Ceramica Logo" class="h-16 w-auto object-contain">
                    <p class="text-white/40 text-[13px] leading-relaxed font-light font-sans max-w-sm">
                        R Ceramica is a brand that believes in continuous development and growth. We always try to innovate and bring something new to reform the approach of the market and the certificates that we have achieved over the years are proof of our creativity and credibility.
                    </p>
                    <div class="flex items-center gap-6 pt-4">
                        <a href="#" class="text-white/30 hover:text-white transition-colors"><i data-lucide="facebook" size="18"></i></a>
                        <a href="#" class="text-white/30 hover:text-white transition-colors"><i data-lucide="instagram" size="18"></i></a>
                        <a href="#" class="text-white/30 hover:text-white transition-colors">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                        </a>
                        <a href="#" class="text-white/30 hover:text-white transition-colors"><i data-lucide="linkedin" size="18"></i></a>
                        <a href="#" class="text-white/30 hover:text-white transition-colors"><i data-lucide="youtube" size="18"></i></a>
                        <a href="#" class="text-white/30 hover:text-white transition-colors"><i data-lucide="hash" size="18"></i></a>
                    </div>
                </div>

                <!-- Column 2: Quick Links -->
                <div class="space-y-10">
                    <h4 class="text-white font-display text-lg tracking-wider font-light">Quick Links</h4>
                    <ul class="space-y-5 text-[13px] text-white/40 font-sans tracking-wide">
                        <li><a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="hover:text-white transition-all hover:pl-2 uppercase">Tiles</a></li>
                        <li><a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="hover:text-white transition-all hover:pl-2 uppercase">Bathware</a></li>
                        <li><a href="#" class="hover:text-white transition-all hover:pl-2 uppercase">Visualizer</a></li>
                        <li><a href="#" class="hover:text-white transition-all hover:pl-2 uppercase">Projects</a></li>
                        <li><a href="#" class="hover:text-white transition-all hover:pl-2 uppercase">Blogs</a></li>
                    </ul>
                </div>

                <!-- Column 3: Corporate -->
                <div class="space-y-10">
                    <h4 class="text-white font-display text-lg tracking-wider font-light">Corporate</h4>
                    <ul class="space-y-5 text-[13px] text-white/40 font-sans tracking-wide">
                        <li><a href="<?php echo esc_url( home_url( "/about/" ) ); ?>" class="hover:text-white transition-all hover:pl-2 uppercase">Our Story</a></li>
                        <li><a href="#" class="hover:text-white transition-all hover:pl-2 uppercase">Chairman Message</a></li>
                        <li><a href="#" class="hover:text-white transition-all hover:pl-2 uppercase">News & Media</a></li>
                        <li><a href="#" class="hover:text-white transition-all hover:pl-2 uppercase">Career</a></li>
                    </ul>
                </div>

                <!-- Column 4: Contact Us -->
                <div class="space-y-10">
                    <h4 class="text-white font-display text-lg tracking-wider font-light">Contact Us</h4>
                    <div class="space-y-6 text-[13px] text-white/40 font-sans leading-relaxed">
                        <div class="flex items-start gap-4 border-b border-white/5 pb-6">
                            <i data-lucide="map-pin" size="18" class="shrink-0 text-white/20 mt-1"></i>
                            <p>Opp. Ceramic City, B/h. Meldi Ma Temple, Lalpar, 8-A National Highway, Morbi-363642. Gujarat (INDIA)</p>
                        </div>
                        <div class="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                            <i data-lucide="phone" size="18" class="text-white/20"></i>
                            <span>PH: +91 94274 10127</span>
                        </div>
                        <div class="flex items-center gap-4 group cursor-pointer">
                            <svg class="w-4 h-4 fill-white/20 shrink-0 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.046c0 2.121.554 4.191 1.606 6.034L0 24l6.117-1.604a11.803 11.803 0 005.93 1.587h.005c6.634 0 12.043-5.413 12.046-12.049a11.796 11.796 0 00-3.417-8.412z"/></svg>
                            <span class="hover:text-white transition-colors">+91 94274 10127</span>
                        </div>
                        <div class="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                            <i data-lucide="mail" size="18" class="text-white/20"></i>
                            <span>info@rceramica.com</span>
                        </div>
                        <div class="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                            <i data-lucide="link" size="18" class="text-white/20"></i>
                            <span>PH: +91 99985 28523</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Section Container -->
            <div class="pt-16 border-t border-white/5 flex flex-col items-center gap-10">
                <!-- Copyright Bar -->
                <div class="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/20 uppercase tracking-[0.3em] font-medium text-center">
                    <p>© 2024 R Ceramica Global. All Rights Reserved.</p>
                    <div class="flex gap-8">
                        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
                
                <!-- Developer Credit -->
                <div class="text-[9px] text-white/10 uppercase tracking-[0.4em] font-light italic">
                    Developed by <a href="https://codezpark.com/" target="_blank" class="text-white/30 hover:text-white transition-all underline decoration-white/5 underline-offset-8">CODEZPARK</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
</main>
<?php get_footer(); ?>
