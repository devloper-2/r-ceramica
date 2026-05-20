<?php
/**
 * Template for the About page.
 */
get_header();
?>
<main id="site-content" role="main">

    <header class="relative min-h-screen md:min-h-[85vh] flex items-center justify-center pt-20 md:pt-24 pb-20 overflow-hidden group/hero">
        <div class="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" alt="Office Facility" class="w-full h-full object-cover opacity-60 transition-all duration-[2s] group-hover/hero:scale-105">
            <div class="absolute inset-0 bg-gradient-to-b from-[#111]/90 via-[#111]/20 to-[#111] group-hover/hero:via-transparent transition-all duration-1000"></div>
        </div>
        
        <div class="relative z-10 max-w-[1440px] px-6 text-center">
            <div class="inline-flex items-center gap-4 mb-8 blur-in">
                <div class="w-12 h-px bg-white/20"></div>
                <span class="text-[10px] uppercase tracking-[0.5em] text-white/40">Since 1994</span>
                <div class="w-12 h-px bg-white/20"></div>
            </div>
            <h1 class="text-4xl md:text-8xl font-display font-light text-white uppercase tracking-[-0.02em] leading-tight blur-in">
                The Heritage of <br>
                <span class="text-white/20" style="-webkit-text-stroke: 1px rgba(255,255,255,0.3); color: transparent;">Excellence</span>
            </h1>
        </div>
    </header>

    <main class="relative">
        <!-- Philosophy Section -->
        <section class="py-24 md:py-40 bg-[#111]">
            <div class="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div class="space-y-12">
                    <h2 class="text-3xl md:text-5xl font-display font-light text-white leading-tight uppercase">
                        We don’t just manufacture surfaces; we engineer <span class="italic text-white/40 font-serif">sensory experiences.</span>
                    </h2>
                    <div class="space-y-8 text-white/40 font-light leading-relaxed max-w-xl">
                        <p class="text-lg">
                            R Ceramica was born out of a vision to redefine the architectural landscape through high-performance porcelain and ceramic solutions. 
                        </p>
                        <p>
                            Starting as a boutique facility in Morbi, the hub of ceramic innovation, we have evolved into a global powerhouse, merging traditional craftsmanship with state-of-the-art nanotechnology. Our journey is driven by one core philosophy: the surface is the soul of any space.
                        </p>
                    </div>
                </div>
                <!-- Interactive Visual Element -->
                <div class="relative group aspect-[4/5] rounded-sm overflow-hidden border border-white/5">
                    <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80" alt="Material Lab" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105">
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                    <!-- Technical Overlay -->
                    <div class="absolute bottom-8 right-8 p-8 bg-black/60 backdrop-blur-xl border border-blue-500/20 max-w-[200px] hidden md:block group-hover:border-blue-500/50 transition-all">
                        <span class="text-[8px] uppercase tracking-[0.3em] text-blue-400 block mb-2">Technical Analysis</span>
                        <div class="h-px w-full bg-blue-500/20 mb-4 group-hover:bg-blue-500/50"></div>
                        <p class="text-[10px] text-white/80 leading-relaxed uppercase tracking-wider">0.05% Water Absorption Certified</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Section (Glass Bento Grid) -->
        <section class="py-24 bg-[#0d0d0d] border-y border-white/5">
            <div class="max-w-[1440px] mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="p-12 bg-white/[0.02] border border-white/5 rounded-sm group hover:border-amber-500/30 hover:bg-amber-500/[0.03] transition-all">
                        <div class="text-4xl md:text-5xl font-display font-light text-white mb-4 group-hover:text-amber-500">20+</div>
                        <p class="text-[10px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">Global Markets Served</p>
                    </div>
                    <div class="p-12 bg-white/[0.02] border border-white/5 rounded-sm group hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all">
                        <div class="text-4xl md:text-5xl font-display font-light text-white mb-4 group-hover:text-blue-500">5000+</div>
                        <p class="text-[10px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">Surface Designs</p>
                    </div>
                    <div class="p-12 bg-white/[0.02] border border-white/5 rounded-sm group hover:border-emerald-500/30 hover:bg-emerald-500/[0.03] transition-all">
                        <div class="text-4xl md:text-5xl font-display font-light text-white mb-4 group-hover:text-emerald-500">30+</div>
                        <p class="text-[10px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">Industry Awards</p>
                    </div>
                    <div class="p-12 bg-white/[0.02] border border-white/5 rounded-sm group hover:border-purple-500/30 hover:bg-purple-500/[0.03] transition-all">
                        <div class="text-4xl md:text-5xl font-display font-light text-white mb-4 group-hover:text-purple-500">12M+</div>
                        <p class="text-[10px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">SQM Annual Production Capacity</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Manufacturing Excellence -->
        <section class="py-24 md:py-40">
            <div class="max-w-[1440px] mx-auto px-6">
                <div class="flex flex-col items-center text-center mb-24">
                    <span class="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-6">Industrial Innovation</span>
                    <h2 class="text-4xl md:text-7xl font-display font-light text-white uppercase tracking-tight">The Factory of the Future</h2>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Tech Item 1 -->
                    <div class="group relative aspect-square overflow-hidden bg-[#1a1a1a]">
                        <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80" alt="Nanotechnology" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-[1.5s] group-hover:scale-110">
                        <div class="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                            <h3 class="text-xl font-display font-light text-white mb-4 uppercase tracking-widest group-hover:text-blue-400 transition-colors">Nano-Trek Tech</h3>
                            <p class="text-[11px] text-white/40 leading-relaxed uppercase tracking-wider group-hover:text-white/90 transition-colors">Micro-pore sealing for absolute hygienic surfaces and stain resistance across all porcelain ranges.</p>
                        </div>
                    </div>
                    <!-- Tech Item 2 (Emphasis) -->
                    <div class="group relative aspect-square overflow-hidden bg-[#1a1a1a] lg:scale-105 lg:z-10 border border-white/10 hover:border-amber-500/50 transition-all overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80" alt="Quality Control" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-[1.5s] group-hover:scale-110">
                        <div class="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-amber-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                            <h3 class="text-xl font-display font-light text-white mb-4 uppercase tracking-widest group-hover:text-amber-500 transition-colors">Continuum Slabs</h3>
                            <p class="text-[11px] text-white/40 leading-relaxed uppercase tracking-wider group-hover:text-white/90 transition-colors">Large format engineering allowing for seamless architectural transitions from floor to ceiling.</p>
                        </div>
                    </div>
                    <!-- Tech Item 3 -->
                    <div class="group relative aspect-square overflow-hidden bg-[#1a1a1a]">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" alt="Process" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-[1.5s] group-hover:scale-110">
                        <div class="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                            <h3 class="text-xl font-display font-light text-white mb-4 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Eco-Thermal Kilns</h3>
                            <p class="text-[11px] text-white/40 leading-relaxed uppercase tracking-wider group-hover:text-white/90 transition-colors">Reducing carbon footprint through revolutionary energy recovery systems in the firing phase.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Chairman Quote section -->
        <section class="py-24 md:py-40 bg-[#0d0d0d] relative overflow-hidden">
             <!-- Background Texture -->
             <div class="absolute top-1/2 left-0 -translate-y-1/2 text-[30vw] font-display font-black text-white/[0.015] whitespace-nowrap pointer-events-none uppercase tracking-tighter select-none">
                VISIONARY
            </div>
            
            <div class="max-w-[1440px] mx-auto px-6 relative z-10">
                <div class="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <div class="w-24 h-24 rounded-full overflow-hidden mb-12 border border-white/20 transition-all duration-700 hover:scale-110">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" alt="Chairman" class="w-full h-full object-cover">
                    </div>
                    <h4 class="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8">Chairman's Perspective</h4>
                    <p class="text-2xl md:text-4xl font-display font-light text-white leading-relaxed italic">
                        "Innovation is not about adding more features; it's about stripping away everything that isn't essential until the soul of the material is all that remains."
                    </p>
                    <div class="mt-12">
                        <div class="text-sm uppercase tracking-widest text-white mb-2 font-display">Rajesh Patel</div>
                        <div class="text-[9px] uppercase tracking-[0.3em] text-white/30">Founder & Chairman, R Ceramica</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Global Footprint/Presence -->
        <section class="py-24 md:py-40">
             <div class="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
                <div class="lg:col-span-4 space-y-10">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-10 h-px bg-white/30"></div>
                        <span class="text-[10px] uppercase tracking-[0.4em] text-white/40">Global Echo</span>
                    </div>
                    <h2 class="text-4xl md:text-6xl font-display font-light text-white uppercase tracking-tight">Across <br>Borders</h2>
                    <p class="text-sm text-white/40 font-light leading-relaxed uppercase tracking-widest">
                        With operational hubs in Gujarat, Dubai, and emerging centers in Europe, our logistics network ensures architectural excellence is delivered to every continent without compromise.
                    </p>
                    <div class="pt-6">
                         <a href="<?php echo esc_url( home_url( "/contact/" ) ); ?>" class="inline-flex items-center gap-6 group text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all">
                            View Logistics Centers <div class="w-12 h-px bg-white/20 group-hover:w-20 transition-all duration-500"></div>
                        </a>
                    </div>
                </div>
                <div class="lg:col-span-8">
                    <div class="relative aspect-video rounded-sm overflow-hidden border border-white/10 group shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80" alt="Abstract World Map" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s]">
                        <div class="absolute inset-0 bg-[#111]/40 group-hover:bg-transparent transition-all"></div>
                        <!-- Strategic Nodes -->
                        <div class="absolute top-1/4 left-[30%] w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                        <div class="absolute top-1/2 left-[55%] w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <div class="absolute top-[40%] left-[65%] w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
             </div>
        </section>

        <!-- Final CTA section removed per request -->
    </main>


    <!-- Scripts -->
</main>
<?php get_footer(); ?>
