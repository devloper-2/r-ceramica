<?php
/**
 * Shared Navigation Partial for R Ceramica Luxury Surfaces.
 *
 * Usage: Set $rc_nav_active before including this file.
 * Values: 'home' | 'about' | 'tiles' | 'bathrooms' | 'accessories' | 'catalogue' | 'contact'
 */
if ( ! isset( $rc_nav_active ) ) {
    $rc_nav_active = '';
}

function rc_nav_link_class( $link, $active ) {
    if ( $link === $active ) {
        return "text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-white transition-colors";
    }
    return 'hover:text-white transition-colors';
}

function rc_mobile_link_class( $link, $active ) {
    $base = 'text-xl font-light tracking-widest py-3 border-b border-white/5 uppercase ';
    if ( $link === $active ) {
        return $base . 'text-[#c5a059] hover:text-[#c5a059]';
    }
    return $base . 'hover:text-gray-400';
}
?>
<nav id="navbar" class="fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans font-light">
    <!-- Top Row -->
    <div class="relative flex justify-between items-center px-4 md:px-12 h-20 md:h-32 lg:h-36">
<?php if ( is_cart() ) : ?>

<div class="flex-1 flex items-center">
    <a href="<?php echo esc_url( home_url( "/products/" ) ); ?>" class="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity">
        <i data-lucide="arrow-left" size="14"></i>
        <span class="hidden sm:inline">Continue Shopping</span>
        <span class="sm:hidden">Back</span>
    </a>
</div>

<?php endif; ?>
        <!-- Top Left: Spacer (Desktop Only) -->
        <div id="nav-left" class="flex-1 hidden lg:flex items-center relative z-20"></div>

        <!-- Mobile Left: Menu Button -->
        <div id="mobile-menu-btn" class="flex-1 lg:hidden flex items-center relative z-[60] transition-opacity duration-300">
            <button onclick="toggleMobileMenu()" class="text-white hover:text-white/80 transition-colors relative z-[70] p-2 -ml-2">
                <i data-lucide="menu" size="24"></i>
            </button>
        </div>
        <!-- Centered Logo -->
        <div id="logo-container" class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="pointer-events-auto">
                <img id="navbar-logo" src="https://rceramica.com/logo/logo.png" alt="R Ceramica Logo" class="h-10 md:h-16 w-auto object-contain cursor-pointer">
            </a>
        </div>

        <!-- Top Right: Tools -->
        <div id="nav-right" class="flex-1 flex justify-end items-center relative z-20">
            <!-- Desktop Icons -->
            <div class="hidden lg:flex items-center gap-10">
                <div onclick="toggleSearch()" class="flex items-center cursor-pointer group">
                    <span class="material-symbols-outlined font-light text-3xl text-white/80 group-hover:text-white transition-colors">search</span>
                </div>
                <div class="flex items-center gap-10">
                    <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>" class="flex items-center hover:text-white/80 transition-colors group">
                        <div class="relative">
                            <i data-lucide="shopping-cart" size="28" stroke-width="1.2" class="text-white/80 group-hover:text-white group-hover:scale-110 transition-all"></i>
                            <span class="absolute -top-2 -right-3 bg-white text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
                        </div>
                    </a>
                    <button onclick="toggleLangDropdown(event)" class="hover:text-white/80 transition-colors focus:outline-none ring-0 border-0">
                        <span id="lang-text" class="text-[12px] font-medium uppercase tracking-[0.2em] opacity-80">EN</span>
                    </button>
                    <button onclick="toggleLoginDropdown(event)" class="hover:text-white/80 transition-colors focus:outline-none ring-0 border-0">
                        <span class="material-symbols-outlined font-light text-3xl">account_circle</span>
                    </button>
                </div>
            </div>

            <!-- Mobile Icons -->
            <div class="lg:hidden flex items-center gap-6">
                <div onclick="toggleSearch()" class="flex items-center cursor-pointer group">
                    <span class="material-symbols-outlined font-light text-2xl text-white/80">search</span>
                </div>
                <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>" class="relative group">
                    <i data-lucide="shopping-cart" size="22" stroke-width="1.2" class="text-white/80"></i>
                    <span id="cart-count-mobile" class="absolute -top-2 -right-2 bg-white text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                </a>
            </div>
        </div>

        <!-- Search Area -->
        <div id="nav-center" class="absolute inset-0 flex justify-center items-center pointer-events-none px-12">
            <div id="search-input-container" class="w-full max-w-xl opacity-0 pointer-events-none translate-y-4 transition-all duration-500 relative">
                <div class="flex items-center w-full relative pointer-events-auto">
                    <input type="text" id="search-input" placeholder="SEARCH THE COLLECTION..." class="w-full bg-transparent border-b border-white text-white text-xs md:text-sm font-display font-light placeholder:text-white/30 focus:outline-none focus:border-white transition-all py-1.5 px-1 text-center uppercase tracking-[0.3em]">
                    <button onclick="toggleSearch()" class="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all hover:scale-110">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Desktop Navigation Links (Bottom Row) -->
    <div id="desktop-nav-links" class="hidden lg:flex justify-center items-center py-4 border-t border-white/5 space-x-12 xl:space-x-16 text-[11px] uppercase tracking-[0.3em] font-medium text-white/80 transition-all duration-500">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="<?php echo rc_nav_link_class( 'home', $rc_nav_active ); ?>">HOME</a>
        <a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="<?php echo rc_nav_link_class( 'about', $rc_nav_active ); ?>">ABOUT US</a>
        <a href="<?php echo esc_url( home_url( '/explore/' ) ); ?>" class="<?php echo rc_nav_link_class( 'explore', $rc_nav_active ); ?>">EXPLORE</a>
        <a href="#" class="<?php echo rc_nav_link_class( 'catalogue', $rc_nav_active ); ?>">CATALOGUE</a>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="<?php echo rc_nav_link_class( 'contact', $rc_nav_active ); ?>">CONTACT US</a>
    </div>

    <!-- Global Language Dropdown -->
    <div id="lang-dropdown" class="hidden absolute right-4 md:right-12 top-[80px] md:top-[128px] lg:top-[144px] w-48 bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-sm shadow-2xl z-[110]">
        <button onclick="selectLang('EN', 'English')" class="w-full text-left px-5 py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all flex justify-between items-center uppercase tracking-[0.25em] font-medium">
            English <div class="lang-indicator w-1.5 h-1.5 bg-white rounded-full"></div>
        </button>
        <button onclick="selectLang('AR', 'Arabic')" class="w-full text-left px-5 py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.25em] font-medium">Arabic</button>
        <button onclick="selectLang('HI', 'Hindi')" class="w-full text-left px-5 py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.25em] font-medium">Hindi</button>
    </div>

    <!-- Global Login Dropdown -->
    <div id="login-dropdown" class="hidden absolute right-4 md:right-12 top-[80px] md:top-[128px] lg:top-[144px] w-56 bg-black/60 backdrop-blur-2xl border border-white/10 p-1.5 rounded-sm shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] z-[110]">
        <div id="logged-out-view">
            <a href="<?php echo esc_url( home_url( '/login/' ) ); ?>" class="block w-full text-left px-6 py-5 text-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.3em] font-medium">
                Sign In
            </a>
        </div>
        <div id="logged-in-view" class="hidden">
            <div class="px-6 py-4 border-b border-white/5">
                <p id="user-display-name" class="text-[10px] uppercase tracking-[0.2em] text-white font-medium truncate">Client User</p>
            </div>
            <a href="<?php echo esc_url( home_url( '/orders/' ) ); ?>" class="block w-full text-left px-6 py-4 text-[10px] text-white/60 hover:text-[#c5a059] hover:bg-white/5 transition-all uppercase tracking-[0.3em] font-medium flex items-center gap-3">
                <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                Orders
            </a>
            <button onclick="logout()" class="w-full text-left px-6 py-4 text-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.3em] font-medium flex items-center gap-3">
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
            <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>" class="px-6 py-4 text-[10px] uppercase tracking-[0.25em] hover:bg-white/5 flex items-center justify-between transition-colors">
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
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="<?php echo rc_mobile_link_class( 'home', $rc_nav_active ); ?>">HOME</a>
        <a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="<?php echo rc_mobile_link_class( 'about', $rc_nav_active ); ?>">ABOUT US</a>
        <a href="<?php echo esc_url( home_url( '/explore/' ) ); ?>" class="<?php echo rc_mobile_link_class( 'explore', $rc_nav_active ); ?>">EXPLORE</a>
        <a href="<?php echo esc_url( home_url( '/orders/' ) ); ?>" id="mobile-orders-link" class="hidden text-xl font-light tracking-widest hover:text-[#c5a059] py-3 border-b border-white/5 uppercase">ORDERS</a>
        <a href="#" class="<?php echo rc_mobile_link_class( 'catalogue', $rc_nav_active ); ?>">CATALOGUE</a>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="<?php echo rc_mobile_link_class( 'contact', $rc_nav_active ); ?>">CONTACT US</a>
        <a href="<?php echo esc_url( home_url( '/login/' ) ); ?>" id="mobile-signin-link" class="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase">SIGN IN</a>
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
