<?php
/**
 * Template for the Login page.
 */
get_header();
?>
<main id="site-content" role="main">


    <!-- Ambient Mobile Background (Visible only on small screens) -->
    <div class="fixed inset-0 z-0 md:hidden opacity-20">
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80" alt="Background" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
    </div>

    <!-- Navigation (Overlay) -->
    <nav class="absolute top-0 left-0 w-full z-50 py-8 px-8 md:px-16 flex justify-between items-center pointer-events-none">
        <a href="<?php echo esc_url( home_url( "/" ) ); ?>" class="group flex flex-col items-center pointer-events-auto">
            <img src="https://rceramica.com/logo/logo.png" alt="R CERAMICA" class="h-10 md:h-14 w-auto object-contain transition-all group-hover:opacity-80">
        </a>
        <a href="<?php echo esc_url( home_url( "/" ) ); ?>" class="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all flex items-center gap-2 pointer-events-auto">
            <span class="material-symbols-outlined text-[14px]">arrow_back</span>
            <span class="hidden xs:inline">Back</span>
        </a>
    </nav>

    <main class="flex-grow flex flex-col md:flex-row min-h-[calc(100vh-100px)] relative z-10 transition-all duration-1000">
        <!-- Left Side: Cinematic Visual (Landscape Emphasis - Desktop Only) -->
        <div class="hidden md:block md:w-1/2 lg:w-3/5 h-full min-h-[600px] relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80" alt="Architecture" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            <div class="absolute bottom-16 left-16 max-w-sm">
                <h2 class="text-4xl font-display font-light uppercase tracking-[0.2em] mb-4 text-white">Elevating <br>Spaces</h2>
                <p class="text-[10px] uppercase tracking-[0.3em] text-white/40 leading-relaxed">Exquisite surfaces for the modern architectural masterpiece.</p>
            </div>
        </div>

        <!-- Right Side: Login Interface -->
        <div class="w-full md:w-1/2 lg:w-2/5 h-full min-h-[600px] flex items-center justify-center bg-[#0a0a0a]/80 md:bg-[#0a0a0a] backdrop-blur-sm md:backdrop-blur-none md:border-l border-white/5 relative">
            <!-- Decorative Subtle Accent -->
            <div class="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-[#c5a059]/40 to-transparent transform -translate-x-1/2 hidden lg:block"></div>

            <div class="w-full max-w-[400px] px-10 flex flex-col justify-start md:justify-center pt-32 md:pt-0 pb-20 md:pb-0">
                <header class="mb-10 md:mb-12 text-center md:text-left">
                    <h1 class="text-4xl md:text-5xl font-display font-light uppercase tracking-[0.15em] mb-4">Sign In</h1>
                    <p class="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/20 leading-relaxed mx-auto md:mx-0 max-w-[240px] md:max-w-none">Access the exclusive <br class="hidden md:block">architectural catalogue</p>
                </header>

                <form id="loginForm" class="space-y-8 md:space-y-10">
                    <div class="group/input relative flex items-end">
                        <div class="pb-4 border-b border-white/10 text-white/40 text-sm font-light tracking-[0.2em] pr-4">+91</div>
                        <div class="flex-grow relative">
                            <label for="mobile" class="absolute -top-6 left-0 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 group-focus-within/input:text-[#c5a059] transition-all">Mobile Number</label>
                            <input type="tel" id="mobile" required 
                                class="w-full bg-transparent border-b border-white/10 py-4 text-sm font-light tracking-[0.2em] outline-none transition-all gold-glow focus:border-white/40"
                                placeholder="000 000 0000"
                                maxlength="10">
                        </div>
                    </div>

                    <div class="group/input relative">
                        <label for="password" class="absolute -top-6 left-0 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 group-focus-within/input:text-[#c5a059] transition-all">Password</label>
                        <input type="password" id="password" required 
                            class="w-full bg-transparent border-b border-white/10 py-4 text-sm font-light tracking-[0.2em] outline-none transition-all gold-glow focus:border-white/40"
                            placeholder="••••••••">
                    </div>

                    <div class="flex items-center justify-between pt-2">
                        <label class="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" class="w-3.5 h-3.5 rounded-none border border-white/20 bg-transparent checked:bg-[#c5a059] transition-all appearance-none cursor-pointer">
                            <span class="text-[9px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">Remember</span>
                        </label>
                        <a href="#" class="text-[9px] uppercase tracking-[0.3em] text-white/30 hover:text-[#c5a059] transition-colors">Recovery</a>
                    </div>

                    <div class="pt-6">
                        <button type="submit" class="w-full py-5 md:py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-medium hover:bg-[#c5a059] hover:text-white transition-all duration-700 relative overflow-hidden group/btn shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)]">
                            <span class="relative z-10">Login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>

    
</main>
<?php get_footer(); ?>
