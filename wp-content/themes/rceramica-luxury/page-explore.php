<?php
/**
 * Template for the Explore page.
 */
get_header();
?>
<main id="site-content" role="main">


    <?php $rc_nav_active = 'explore'; include get_template_directory() . '/partials/nav.php'; ?>

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
                        <a href="<?php echo esc_url( add_query_arg( 'category', 'tiles', home_url( '/shop/' ) ) ); ?>" class="inline-flex items-center gap-6 group/link">
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
                        <a href="<?php echo esc_url( add_query_arg( 'category', 'showers', home_url( '/shop/' ) ) ); ?>" class="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.5em] text-white/60 hover:text-white transition-all font-medium border-b border-white/10 pb-2 hover:border-white transition-all">
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
                        <a href="<?php echo esc_url( add_query_arg( 'category', 'faucets', home_url( '/shop/' ) ) ); ?>" class="inline-flex items-center gap-8 group/link">
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
                    <a href="<?php echo esc_url( add_query_arg( 'category', 'sanitary', home_url( '/shop/' ) ) ); ?>" class="inline-block py-5 px-16 border border-white/10 hover:bg-white hover:text-black transition-all text-[12px] uppercase tracking-[0.5em] font-medium">Browse Complete Series</a>
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
                    <a href="<?php echo esc_url( add_query_arg( 'category', 'basins', home_url( '/shop/' ) ) ); ?>" class="inline-block py-5 px-16 border border-white/10 hover:bg-white hover:text-black transition-all text-[12px] uppercase tracking-[0.5em] font-medium">Explore Gallery</a>
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
                    <a href="<?php echo esc_url( add_query_arg( 'category', 'frp', home_url( '/shop/' ) ) ); ?>" class="inline-flex items-center gap-8 group/link">
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
                        <li><a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="hover:text-white transition-all hover:pl-2 uppercase">Explore</a></li>
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
