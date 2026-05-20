<?php
/**
 * Template for the Contact page.
 */
get_header();
?>
<main id="site-content" role="main">

    <header class="relative min-h-screen md:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black pt-20 md:pt-24 group/hero">
        <div class="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80" alt="Contact Us Background" class="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-all duration-[2s]">
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a] group-hover/hero:from-black/20 transition-all duration-1000"></div>
        </div>
        
        <div class="relative z-10 text-center fade-in px-6">
            <div class="flex items-center justify-center gap-4 mb-6">
                <div class="w-12 h-px bg-white/20"></div>
                <span class="text-[9px] uppercase tracking-[0.5em] text-white/50">Connectivity</span>
                <div class="w-12 h-px bg-white/20"></div>
            </div>
            <h1 class="text-5xl md:text-8xl font-display tracking-[0.1em] font-light text-white uppercase mb-6">
                Get In Touch
            </h1>
            <p class="text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/40 max-w-lg mx-auto leading-relaxed">
                Experience architectural excellence first hand. Our consultants are ready to assist your vision.
            </p>
        </div>
    </header>

    <main class="relative z-20 px-6 md:px-16 max-w-[1440px] mx-auto pb-24 mt-12 md:mt-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
            
            <!-- Left Side: Contact Form -->
            <div class="lg:col-span-7 bg-white/[0.03] backdrop-blur-3xl p-8 md:p-10 border border-white/10 rounded-sm shadow-2xl relative overflow-hidden group">
                <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-30 group-hover:via-white transition-all duration-1000"></div>
                <div class="absolute -top-24 -left-24 w-48 h-48 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
                <div class="mb-10">
                    <h2 class="text-2xl md:text-3xl font-display font-light text-white uppercase tracking-wider mb-3">Send a Message</h2>
                    <p class="text-xs text-white/40 uppercase tracking-widest leading-relaxed">Fill out the form below and an R Ceramica expert will reach out to you within 24 hours.</p>
                </div>

                <form id="contact-form" class="space-y-10">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div class="relative">
                            <input type="text" id="name" name="name" required placeholder=" " class="peer w-full bg-transparent border-b border-white/10 text-white py-3 focus:outline-none focus:border-white transition-all text-sm tracking-widest uppercase input-focus-effect">
                            <label for="name" class="absolute left-0 top-3 text-[10px] text-white/30 uppercase tracking-[0.3em] transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-white/60 peer-[:not(:placeholder-shown)]:-top-4">Full Name</label>
                        </div>
                        <div class="relative">
                            <input type="email" id="email" name="email" required placeholder=" " class="peer w-full bg-transparent border-b border-white/10 text-white py-3 focus:outline-none focus:border-white transition-all text-sm tracking-widest uppercase input-focus-effect">
                            <label for="email" class="absolute left-0 top-3 text-[10px] text-white/30 uppercase tracking-[0.3em] transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-white/60 peer-[:not(:placeholder-shown)]:-top-4">Email Address</label>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div class="relative">
                            <input type="tel" id="phone" name="phone" placeholder=" " class="peer w-full bg-transparent border-b border-white/10 text-white py-3 focus:outline-none focus:border-white transition-all text-sm tracking-widest uppercase input-focus-effect">
                            <label for="phone" class="absolute left-0 top-3 text-[10px] text-white/30 uppercase tracking-[0.3em] transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-white/60 peer-[:not(:placeholder-shown)]:-top-4">Phone Number</label>
                        </div>
                        <div class="relative" id="custom-select-container">
                            <button type="button" onclick="toggleCustomSelect(event)" id="custom-select-trigger" class="w-full bg-transparent border-b border-white/10 text-white/80 py-3 focus:outline-none focus:border-white transition-all text-[10px] tracking-widest uppercase text-left flex justify-between items-center group">
                                <span id="selected-text">Select Project Type</span>
                                <i data-lucide="chevron-down" size="16" class="text-white/20 group-hover:text-white/50 transition-colors"></i>
                            </button>
                            <input type="hidden" name="project-type" id="project-type-input" required>
                            <label class="absolute left-0 -top-4 text-[10px] text-white/60 uppercase tracking-[0.3em]">Subject</label>
                            
                            <!-- Custom Glass Dropdown -->
                            <div id="custom-select-menu" class="hidden absolute left-0 top-full w-full mt-2 bg-black/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-sm shadow-2xl z-[30]">
                                <button type="button" onclick="selectOption('residential', 'Residential')" class="w-full text-left px-5 py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.25em] font-medium">Residential</button>
                                <button type="button" onclick="selectOption('commercial', 'Commercial')" class="w-full text-left px-5 py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.25em] font-medium">Commercial</button>
                                <button type="button" onclick="selectOption('industrial', 'Industrial')" class="w-full text-left px-5 py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.25em] font-medium">Industrial</button>
                                <button type="button" onclick="selectOption('dealer', 'Dealer Inquiry')" class="w-full text-left px-5 py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.25em] font-medium">Dealer Inquiry</button>
                            </div>
                        </div>
                    </div>

                    <div class="relative">
                        <textarea id="message" name="message" rows="4" placeholder=" " class="peer w-full bg-transparent border-b border-white/10 text-white py-3 focus:outline-none focus:border-white transition-all text-sm tracking-widest uppercase resize-none input-focus-effect"></textarea>
                        <label for="message" class="absolute left-0 top-3 text-[10px] text-white/30 uppercase tracking-[0.3em] transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-white/60 peer-[:not(:placeholder-shown)]:-top-4">Message / Requirements</label>
                    </div>

                    <div class="pt-6">
                        <button type="submit" class="w-full md:w-auto bg-white text-black px-16 py-5 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-200 transition-all rounded-sm flex items-center justify-center gap-4 group">
                            Submit Inquiry
                            <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-2 transition-transform"></i>
                        </button>
                    </div>
                </form>

                <!-- Our Offices Section -->
                <div class="mt-20 border-t border-white/10 pt-12">
                    <h3 class="text-[10px] uppercase tracking-[0.6em] text-white/20 mb-12">Our Regional Presences</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        <div class="group">
                            <h4 class="text-[9px] uppercase tracking-[0.5em] text-white/40 mb-4 group-hover:text-white transition-colors tracking-[0.5em]">Corporate Headquarter</h4>
                            <p class="text-[11px] text-white/30 leading-relaxed uppercase tracking-[0.2em] mb-4">Opp. Ceramic City, Lalpar, 8-A National Highway, Morbi-363642, Gujarat, India.</p>
                            <div class="flex flex-col gap-2">
                                <a href="tel:+919427410127" class="text-[10px] text-white/50 hover:text-white transition-colors font-sans italic tracking-widest">+91 94274 10127</a>
                                <a href="tel:+919998528523" class="text-[10px] text-white/50 hover:text-white transition-colors font-sans italic tracking-widest">+91 99985 28523</a>
                            </div>
                        </div>
                        <div class="group">
                            <h4 class="text-[9px] uppercase tracking-[0.5em] text-white/40 mb-4 group-hover:text-white transition-colors tracking-[0.5em]">Experience Center</h4>
                            <p class="text-[11px] text-white/30 leading-relaxed uppercase tracking-[0.2em] mb-4">Luxury Hub, S.G. Highway, Near Thaltej Cross Roads, Ahmedabad-380054, Gujarat.</p>
                            <div class="flex flex-col gap-2">
                                <a href="tel:+919876543210" class="text-[10px] text-white/50 hover:text-white transition-colors font-sans italic tracking-widest">+91 98765 43210</a>
                                <a href="mailto:info@rceramica.com" class="text-[10px] text-white/50 hover:text-white transition-colors font-sans italic tracking-widest">info@rceramica.com</a>
                            </div>
                        </div>
                        <div class="group">
                            <h4 class="text-[9px] uppercase tracking-[0.5em] text-white/40 mb-4 group-hover:text-white transition-colors tracking-[0.5em]">International Desk</h4>
                            <p class="text-[11px] text-white/30 leading-relaxed uppercase tracking-[0.2em] mb-4">Suite 1204, Architecture Tower, Business Bay, Dubai, UAE.</p>
                            <div class="flex flex-col gap-2">
                                <a href="tel:+971501234567" class="text-[10px] text-white/50 hover:text-white transition-colors font-sans italic tracking-widest">+971 50 123 4567</a>
                            </div>
                        </div>
                        <div class="group">
                            <h4 class="text-[9px] uppercase tracking-[0.5em] text-white/40 mb-4 group-hover:text-white transition-colors tracking-[0.5em]">Logistic Hub</h4>
                            <p class="text-[11px] text-white/30 leading-relaxed uppercase tracking-[0.2em] mb-4">Plot 45, Port Industrial Park, Mundra SEZ, Kutch, Gujarat.</p>
                            <div class="flex flex-col gap-2">
                                <a href="tel:+919998528523" class="text-[10px] text-white/50 hover:text-white transition-colors font-sans italic tracking-widest">+91 99985 28523</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Side: Contact Info & Map -->
            <div class="lg:col-span-5 space-y-16">
                
                <!-- Info Grid -->
                <div class="space-y-8">
                    <div class="flex items-start gap-6 group">
                        <div class="mt-1 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex shrink-0 items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                            <i data-lucide="map-pin" size="20"></i>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[9px] uppercase tracking-[0.4em] text-white/20 block">Our Headquarters</span>
                            <p class="text-[13px] text-white/50 leading-relaxed font-sans">
                                Opp. Ceramic City, B/h. Meldi Ma Temple, Lalpar, 8-A National Highway, Morbi-363642. <br>Gujarat (INDIA)
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start gap-6 group">
                        <div class="mt-1 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex shrink-0 items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                            <i data-lucide="phone" size="20"></i>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[9px] uppercase tracking-[0.4em] text-white/20 block">Support Line</span>
                            <div class="space-y-1 font-sans italic">
                                <a href="tel:+919427410127" class="block text-[13px] text-white/60 hover:text-white transition-colors tracking-wider">+91 94274 10127</a>
                                <a href="tel:+919998528523" class="block text-[13px] text-white/60 hover:text-white transition-colors tracking-wider">+91 99985 28523</a>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-start gap-6 group">
                        <div class="mt-1 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex shrink-0 items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                            <i data-lucide="mail" size="20"></i>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[9px] uppercase tracking-[0.4em] text-white/20 block">Business Email</span>
                            <div class="font-sans italic">
                                <a href="mailto:info@rceramica.com" class="text-[13px] text-white/60 hover:text-white transition-colors">info@rceramica.com</a>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-start gap-6 group">
                        <div class="mt-1 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex shrink-0 items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                            <i data-lucide="clock" size="20"></i>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[9px] uppercase tracking-[0.4em] text-white/20 block">Office Hours</span>
                            <div class="font-sans">
                                <p class="text-[12px] text-white/40 uppercase tracking-widest">Mon — Sat</p>
                                <p class="text-[13px] text-white/60 uppercase tracking-widest">09:00 AM — 07:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Visual Element / Map Placeholder -->
                <div class="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 transition-all duration-1000 group">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.341398862413!2d70.86484401150337!3d22.810253824050278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598dcd562cce57%3A0xfc120b911b2d75ab!2sR%20CERAMICA!5e0!3m2!1sen!2sin!4v1714896000000!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <!-- WhatsApp Direct -->
                <a href="https://wa.me/919427410127" target="_blank" class="flex flex-col items-center gap-4 p-8 border border-[#25D366]/20 bg-[#25D366]/5 rounded-sm group hover:bg-[#25D366]/10 transition-all">
                    <div class="flex items-center gap-3">
                        <svg class="w-6 h-6 fill-[#25D366]" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.046c0 2.121.554 4.191 1.606 6.034L0 24l6.117-1.604a11.803 11.803 0 005.93 1.587h.005c6.634 0 12.043-5.413 12.046-12.049a11.796 11.796 0 00-3.417-8.412z"/></svg>
                        <span class="text-xs uppercase tracking-[0.3em] font-medium text-[#25D366]">Express Support</span>
                    </div>
                    <span class="text-[10px] text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">Start a WhatsApp conversation now</span>
                </a>

            </div>
        </div>
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

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="hidden fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col p-8 overflow-y-auto transform -translate-x-full transition-transform duration-500">
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
            <a href="<?php echo esc_url( home_url( "/faucets/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">BATHROOMS</a>
            <a href="<?php echo esc_url( home_url( "/explore/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">ACCESSORIES</a>
            <a href="<?php echo esc_url( home_url( "/orders/" ) ); ?>" id="mobile-orders-link" class="hidden text-xl font-light tracking-widest hover:text-[#c5a059] py-3 border-b border-white/5 uppercase">ORDERS</a>
            <a href="#" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">CATALOGUE</a>
            <a href="<?php echo esc_url( home_url( "/contact/" ) ); ?>" class="text-xl font-light tracking-widest hover:text-white py-3 border-b border-white/5 uppercase text-white">CONTACT US</a>
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

    <!-- Global Language Dropdown -->
    <div id="lang-dropdown" class="hidden absolute right-4 md:right-12 top-[80px] md:top-[128px] lg:top-[144px] w-48 bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-sm shadow-2xl z-[110]">
        <button onclick="selectLang('EN', 'English')" class="w-full text-left px-5 py-3 md:py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all flex justify-between items-center uppercase tracking-[0.25em] font-medium">
            English <div class="lang-indicator w-1.5 h-1.5 bg-white rounded-full"></div>
        </button>
        <button onclick="selectLang('FR', 'Français')" class="w-full text-left px-5 py-3 md:py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all flex justify-between items-center uppercase tracking-[0.25em] font-medium">
            Français <div class="lang-indicator hidden w-1.5 h-1.5 bg-white rounded-full"></div>
        </button>
        <button onclick="selectLang('IT', 'Italiano')" class="w-full text-left px-5 py-3 md:py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all flex justify-between items-center uppercase tracking-[0.25em] font-medium">
            Italiano <div class="lang-indicator hidden w-1.5 h-1.5 bg-white rounded-full"></div>
        </button>
    </div>

    <!-- Global Login Dropdown -->
    <div id="login-dropdown" class="hidden absolute right-4 md:right-12 top-[80px] md:top-[128px] lg:top-[144px] w-56 bg-black/60 backdrop-blur-2xl border border-white/10 p-1.5 rounded-sm shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] z-[110]">
        <div id="logged-out-view">
            <a href="<?php echo esc_url( home_url( "/login/" ) ); ?>" class="block w-full text-left px-6 py-5 text-[11px] md:text-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.3em] font-medium">
                Sign In
            </a>
        </div>
        <div id="logged-in-view" class="hidden">
            <div class="px-6 py-4 border-b border-white/5">
                <p id="user-display-name" class="text-[10px] uppercase tracking-[0.2em] text-white font-medium truncate">Client User</p>
            </div>
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
            <button onclick="toggleLangDropdown(event)" class="w-full px-6 py-4 text-left text-[10px] uppercase tracking-[0.25em] hover:bg-white/5 flex items-center gap-4 transition-colors">
                <span class="material-symbols-outlined font-light text-white/60">translate</span>
                <span>Change Language</span>
            </button>
            <button onclick="toggleLoginDropdown(event)" class="w-full px-6 py-4 text-left text-[10px] uppercase tracking-[0.25em] hover:bg-white/5 flex items-center gap-4 transition-colors">
                <span class="material-symbols-outlined font-light text-white/60">account_circle</span>
                <span>My Account</span>
            </button>
        </div>
    </div>

    <!-- WhatsApp Sticky Icon (Refined Placement) -->
    <a href="https://wa.me/919427410127" target="_blank" class="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] group cursor-pointer" aria-label="Contact us on WhatsApp">
        <div class="flex flex-col items-center relative">
            <span class="absolute bottom-full mb-4 whitespace-nowrap bg-white/90 backdrop-blur-md text-[8px] text-black font-bold px-3 py-1.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 uppercase tracking-widest shadow-2xl shadow-black/20">
                Chat with us
            </span>
            <div class="transition-all duration-500 group-hover:scale-110 flex items-center justify-center">
                <svg class="w-10 h-10 fill-white/40 group-hover:fill-[#25D366] transition-all duration-500 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.046c0 2.121.554 4.191 1.606 6.034L0 24l6.117-1.604a11.803 11.803 0 005.93 1.587h.005c6.634 0 12.043-5.413 12.046-12.049a11.796 11.796 0 00-3.417-8.412z"/>
                </svg>
            </div>
        </div>
    </a>

    <!-- Scripts -->
</main>
<?php get_footer(); ?>
