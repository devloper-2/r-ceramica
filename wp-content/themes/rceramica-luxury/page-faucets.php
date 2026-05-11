<?php
/**
 * Template for the Faucets page.
 */
get_header();
?>
<main id="site-content" role="main">


    <?php $rc_nav_active = 'bathrooms'; include get_template_directory() . '/partials/nav.php'; ?>

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
