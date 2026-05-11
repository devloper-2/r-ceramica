<?php
/**
 * Template for the Faucets page.
 */
get_header();
?>
<main id="site-content" role="main">


    <!-- Shared Navigation -->
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
                    <div class="flex items-center cursor-pointer group"><span class="material-symbols-outlined font-light text-3xl text-white/80">search</span></div>
                    <div class="flex items-center gap-10">
                        <a href="<?php echo esc_url( home_url( "/cart/" ) ); ?>" class="relative group">
                            <i data-lucide="shopping-cart" size="24" stroke-width="1.2" class="text-white/80 group-hover:text-white transition-all"></i>
                            <span class="absolute -top-2 -right-3 bg-white text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
                        </a>
                        <button class="text-[12px] font-medium uppercase tracking-[0.2em] opacity-80">EN</button>
                        <button onclick="toggleLoginDropdown(event)" class="focus:outline-none">
                        <span class="material-symbols-outlined font-light text-3xl">account_circle</span>
                    </button>
                    </div>
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
        
        <div id="desktop-nav-links" class="hidden lg:flex justify-center items-center py-4 border-t border-white/5 space-x-12 xl:space-x-16 text-[11px] uppercase tracking-[0.3em] font-medium text-white/80">
            <a href="<?php echo esc_url( home_url( "/" ) ); ?>" class="hover:text-white transition-colors">HOME</a>
            <a href="<?php echo esc_url( home_url( "/about/" ) ); ?>" class="hover:text-white transition-colors">ABOUT US</a>
            <a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="hover:text-white transition-colors">TILES</a>
            <a href="<?php echo esc_url( home_url( "/faucets/" ) ); ?>" class="text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-white transition-colors">BATHROOMS</a>
            <a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="hover:text-white transition-colors">ACCESSORIES</a>
            <a href="#" class="hover:text-white transition-colors">CATALOGUE</a>
            <a href="<?php echo esc_url( home_url( "/contact/" ) ); ?>" class="hover:text-white transition-colors">CONTACT US</a>
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
            <a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">TILES</a>
            <a href="<?php echo esc_url( home_url( "/faucets/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase font-medium text-[#c5a059]">BATHROOMS</a>
            <a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">ACCESSORIES</a>
            <a href="#" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">CATALOGUE</a>
            <a href="<?php echo esc_url( home_url( "/contact/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">CONTACT US</a>
            <a href="<?php echo esc_url( home_url( "/login/" ) ); ?>" id="mobile-signin-link" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">SIGN IN</a>
        </div>
    </div>

    <!-- Faucets Hero -->
    <section class="relative h-[80vh] w-full flex items-center overflow-hidden bg-[#080808]">
        <div class="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80" class="w-full h-full object-cover opacity-50 scale-110 transition-transform duration-[10s] hover:scale-100" alt="Luxury Faucets">
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]"></div>
        </div>
        
        <div class="relative z-10 max-w-[1720px] mx-auto px-8 md:px-24 w-full pt-32">
            <div class="max-w-4xl fade-in">
                <span class="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-[#c5a059] mb-6 block font-medium">Water Engineering</span>
                <h1 class="text-5xl md:text-8xl font-display font-light text-white leading-[0.9] uppercase tracking-tighter mb-10">
                    The Art of <br> Fluidity
                </h1>
                <p class="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] font-light max-w-xl leading-relaxed">
                    Precision-engineered faucet collections where architectural geometry meets the sensory experience of water.
                </p>
                <div class="mt-12 flex gap-10">
                    <a href="#fusion" class="text-[10px] uppercase tracking-[0.4em] text-white border-b border-white/20 pb-2 hover:border-white transition-all">Fusion Collection</a>
                </div>
            </div>
        </div>
    </section>

    <main class="bg-[#0a0a0a]">
        <!-- Fusion Collection Section -->
        <section id="fusion" class="py-32 px-8 md:px-24 max-w-[1720px] mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
                <div class="max-w-xl scroll-reveal">
                    <h2 class="text-4xl md:text-6xl font-display font-light uppercase tracking-widest">Fusion <br>Collection</h2>
                </div>
                <p class="text-white/30 text-[10px] uppercase tracking-[0.3em] max-w-sm scroll-reveal">
                    A curated selection of signature series designed for contemporary high-end environments.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                <!-- Collection Cards -->
                <script>
                    const fusionCollections = [
                        { id: '101', name: 'RIVO COLLECTION', img: 'https://images.unsplash.com/photo-1620626011761-9963d7b59675?auto=format&fit=crop&q=80&w=600' },
                        { id: '201', name: 'CURVE COLLECTION', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' },
                        { id: '301', name: 'EVA COLLECTION', img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600' },
                        { id: '401', name: 'ROMA COLLECTION', img: 'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&q=80&w=600' },
                        { id: '501', name: 'ARTIZ COLLECTION', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600' },
                        { id: '601', name: 'METRO COLLECTION', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
                        { id: '701', name: 'IRIS COLLECTION', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=600' },
                        { id: '801', name: 'CADIZ COLLECTION', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600' },
                        { id: '901', name: 'AMAZE COLLECTION', img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=600' },
                        { id: '1001', name: 'ROSSA COLLECTION', img: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=600' }
                    ];

                    fusionCollections.forEach(item => {
                        document.write(`
                            <a href="products.html?category=${item.id}" class="product-card group cursor-pointer scroll-reveal">
                                <div class="aspect-[4/5] overflow-hidden bg-[#111] mb-6 relative">
                                    <img src="${item.img}" class="product-img w-full h-full object-cover transition-all duration-1000" alt="${item.name}">
                                    <div class="product-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity flex items-center justify-center">
                                        <div class="px-8 py-3 border border-white/30 text-[9px] uppercase tracking-[0.5em] scale-90 group-hover:scale-100 transition-all duration-500 bg-white/5 backdrop-blur-md">
                                            Shop Collection
                                        </div>
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <h3 class="text-lg md:text-xl font-display font-light uppercase tracking-[0.2em] group-hover:text-[#c5a059] transition-colors">${item.name}</h3>
                                    <p class="text-[9px] text-white/30 uppercase tracking-[0.3em]">Architectural Series</p>
                                </div>
                            </a>
                        `);
                    });
                </script>
            </div>
        </section>





        <!-- Showers & Wellness Section -->
        <section id="showers" class="py-32 px-8 md:px-24 max-w-[1720px] mx-auto border-t border-white/5">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
                <div class="max-w-xl scroll-reveal">
                    <h2 class="text-4xl md:text-6xl font-display font-light uppercase tracking-widest text-[#c5a059]">Showers <br>& Wellness</h2>
                </div>
                <p class="text-white/30 text-[10px] uppercase tracking-[0.3em] max-w-sm scroll-reveal">
                    Immersive hydro-therapy systems that transform the daily ritual into an architectural experience.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <a href="products.html?category=showers" class="product-card group cursor-pointer scroll-reveal relative aspect-video overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1620626014330-f99a0937285d?auto=format&fit=crop&q=80&w=800" class="product-img w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" alt="Overhead Showers">
                    <div class="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
                         <h3 class="text-2xl font-display font-light uppercase tracking-widest text-white">Overhead Series</h3>
                         <p class="text-[9px] text-[#c5a059] uppercase tracking-[0.4em] mt-2">View Models</p>
                    </div>
                </a>
                <a href="products.html?category=showers" class="product-card group cursor-pointer scroll-reveal relative aspect-video overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1584622781514-f670c2269a84?auto=format&fit=crop&q=80&w=800" class="product-img w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" alt="Body Jets">
                    <div class="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
                         <h3 class="text-2xl font-display font-light uppercase tracking-widest text-white">Body Jets</h3>
                         <p class="text-[9px] text-[#c5a059] uppercase tracking-[0.4em] mt-2">View Models</p>
                    </div>
                </a>
                <a href="products.html?category=showers" class="product-card group cursor-pointer scroll-reveal relative aspect-video overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800" class="product-img w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" alt="Hand Showers">
                    <div class="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
                         <h3 class="text-2xl font-display font-light uppercase tracking-widest text-white">Hand Showers</h3>
                         <p class="text-[9px] text-[#c5a059] uppercase tracking-[0.4em] mt-2">View Models</p>
                    </div>
                </a>
            </div>
        </section>

        <!-- Sanitary & Basins Section -->
        <section id="sanitary" class="py-32 px-8 md:px-24 max-w-[1720px] mx-auto border-t border-white/5">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
                <div class="max-w-xl scroll-reveal">
                    <h2 class="text-4xl md:text-6xl font-display font-light uppercase tracking-widest">Sanitary <br>& Basins</h2>
                </div>
                <p class="text-white/30 text-[10px] uppercase tracking-[0.3em] max-w-sm scroll-reveal">
                    Ergonomic forms connecting hygiene and sustainability with minimalist aesthetic precision.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <a href="products.html?category=sanitary" class="product-card group cursor-pointer scroll-reveal relative h-[400px] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=1200" class="product-img w-full h-full object-cover opacity-50 transition-all duration-1000" alt="Water Closets">
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-12">
                         <h3 class="text-3xl font-display font-light uppercase tracking-widest text-white">Water Closets</h3>
                         <p class="text-[9px] text-[#c5a059] uppercase tracking-[0.4em] mt-4">Explore Series</p>
                    </div>
                </a>
                <a href="products.html?category=basins" class="product-card group cursor-pointer scroll-reveal relative h-[400px] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" class="product-img w-full h-full object-cover opacity-50 transition-all duration-1000" alt="Artisan Basins">
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-12">
                         <h3 class="text-3xl font-display font-light uppercase tracking-widest text-white">Artisan Basins</h3>
                         <p class="text-[9px] text-[#c5a059] uppercase tracking-[0.4em] mt-4">Explore Series</p>
                    </div>
                </a>
            </div>
        </section>

        <!-- Technical Excellence Section -->
    </main>

    <!-- Professional Architecture Footer (Consistent with Index) -->
    <footer class="relative bg-[#0c0c0c] pt-24 pb-12 border-t border-white/5 overflow-hidden">
        <div class="max-w-[1440px] mx-auto px-6 md:px-16 text-center md:text-left">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-24">
                <!-- Column 1: Brand Profile -->
                <div class="space-y-10">
                    <img src="https://rceramica.com/logo/logo.png" alt="R Ceramica Logo" class="h-16 w-auto object-contain mx-auto md:mx-0">
                    <p class="text-white/40 text-[13px] leading-relaxed font-light font-sans max-w-sm mx-auto md:mx-0">
                        R Ceramica is a brand that believes in continuous development and growth. We always try to innovate and bring something new to reform the approach of the market.
                    </p>
                </div>
                <!-- Column 2: Quick Links -->
                <div class="space-y-10">
                    <h4 class="text-white font-display text-lg tracking-wider font-light">Quick Links</h4>
                    <ul class="space-y-5 text-[13px] text-white/40 font-sans tracking-wide">
                        <li><a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="hover:text-white transition-all hover:pl-2 uppercase">Tiles</a></li>
                        <li><a href="<?php echo esc_url( home_url( "/faucets/" ) ); ?>" class="hover:text-white transition-all hover:pl-2 uppercase">Bathware</a></li>
                        <li><a href="#" class="hover:text-white transition-all hover:pl-2 uppercase">Projects</a></li>
                    </ul>
                </div>
                <!-- Column 3: Corporate -->
                <div class="space-y-10">
                    <h4 class="text-white font-display text-lg tracking-wider font-light">Corporate</h4>
                    <ul class="space-y-5 text-[13px] text-white/40 font-sans tracking-wide">
                        <li><a href="<?php echo esc_url( home_url( "/about/" ) ); ?>" class="hover:text-white transition-all hover:pl-2 uppercase">Our Story</a></li>
                        <li><a href="<?php echo esc_url( home_url( "/contact/" ) ); ?>" class="hover:text-white transition-all hover:pl-2 uppercase">Contact Us</a></li>
                    </ul>
                </div>
                <!-- Column 4: Contact -->
                <div class="space-y-10">
                    <h4 class="text-white font-display text-lg tracking-wider font-light">Contact Us</h4>
                    <div class="space-y-6 text-[13px] text-white/40 font-sans leading-relaxed">
                        <div class="flex items-start gap-4 border-b border-white/5 pb-6">
                            <i data-lucide="map-pin" size="18" class="shrink-0 text-white/20 mt-1"></i>
                            <p>Morbi, Gujarat (INDIA)</p>
                        </div>
                        <p>PH: +91 94274 10127</p>
                    </div>
                </div>
            </div>
            
            <div class="pt-16 border-t border-white/5 flex flex-col items-center gap-10">
                <div class="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/20 uppercase tracking-[0.3em] font-medium">
                    <p>© 2024 R Ceramica Global. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
</main>
<?php get_footer(); ?>
