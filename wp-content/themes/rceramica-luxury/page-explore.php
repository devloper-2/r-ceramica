<?php
/**
 * Template for the Explore page.
 */
get_header();
?>
<main id="site-content" role="main">

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
            <img src="https://6a3e669989587270ec843fee.imgix.net/Luxury-Shower-240975.jpeg" class="absolute inset-0 w-full h-full object-cover explore-img opacity-30 transition-transform duration-[4s]" alt="Showers">
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
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/A-kitchen-faucet-443674.jpeg" class="absolute inset-0 w-full h-full object-cover explore-img opacity-50" alt="Artisan Faucets">
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
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hygiene-ystems.webp" class="w-full h-full object-cover explore-img opacity-40 transition-transform duration-[3s]" alt="Bathware">
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
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/maram-alkrdy.webp" class="absolute inset-0 w-full h-full object-cover explore-img opacity-30" alt="FRP Manhole">
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

    <!-- Scripts -->
</main>
<?php get_footer(); ?>
