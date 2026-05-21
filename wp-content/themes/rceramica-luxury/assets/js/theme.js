(function() {
    const doc = document;

    function safeQuery(selector) {
        return doc.querySelector(selector);
    }

    function toggleClass(element, className) {
        if (!element) return;
        element.classList.toggle(className);
    }

    function addClass(element, className) {
        if (!element) return;
        element.classList.add(className);
    }

    function removeClass(element, className) {
        if (!element) return;
        element.classList.remove(className);
    }

    function createIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    function initNavbarScroll() {
        const navbar = safeQuery('#navbar');
        if (!navbar) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                addClass(navbar, 'bg-[#1B1B1B]/80');
                addClass(navbar, 'backdrop-blur-xl');
                addClass(navbar, 'border-b');
                addClass(navbar, 'border-white/5');
            } else {
                removeClass(navbar, 'bg-[#1B1B1B]/80');
                removeClass(navbar, 'backdrop-blur-xl');
                removeClass(navbar, 'border-b');
                removeClass(navbar, 'border-white/5');
            }
        });
    }

    function toggleMobileMenu() {
        const mobileMenu = safeQuery('#mobile-menu');
        if (!mobileMenu) return;

        const isOpening = mobileMenu.classList.contains('mobile-menu-hidden');
        if (isOpening) {
            mobileMenu.classList.remove('mobile-menu-hidden');
            mobileMenu.classList.add('mobile-menu-visible');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('mobile-menu-visible');
            mobileMenu.classList.add('mobile-menu-hidden');
            document.body.style.overflow = '';
        }
    }

    function toggleMobileTools(e) {
        if (e) e.stopPropagation();
        const dropdown = safeQuery('#mobile-tools-dropdown');
        if (!dropdown) return;
        dropdown.classList.toggle('hidden');
    }

    function toggleLangDropdown(e) {
        if (e) e.stopPropagation();
        const dropdown = safeQuery('#lang-dropdown');
        const loginDropdown = safeQuery('#login-dropdown');
        if (!dropdown) return;
        dropdown.classList.toggle('hidden');
        if (loginDropdown) {
            loginDropdown.classList.add('hidden');
        }
    }

    function toggleLoginDropdown(e) {
        if (e) e.stopPropagation();
        const loginDropdown = safeQuery('#login-dropdown');
        const langDropdown = safeQuery('#lang-dropdown');
        const mobileToolsDropdown = safeQuery('#mobile-tools-dropdown');
        if (!loginDropdown) return;
        loginDropdown.classList.toggle('hidden');
        if (langDropdown) {
            langDropdown.classList.add('hidden');
        }
        if (mobileToolsDropdown) {
            mobileToolsDropdown.classList.add('hidden');
        }
    }

    function initLoginHover() {
        const loginButton = doc.querySelector('button[onclick="toggleLoginDropdown(event)"]');
        const loginDropdown = safeQuery('#login-dropdown');
        if (!loginButton || !loginDropdown) return;

        let timeout;
        const clear = () => clearTimeout(timeout);
        const close = () => { timeout = setTimeout(() => loginDropdown.classList.add('hidden'), 300); };

        loginButton.parentElement?.addEventListener('mouseenter', () => {
            clear();
            loginDropdown.classList.remove('hidden');
            safeQuery('#lang-dropdown')?.classList.add('hidden');
        });
        loginButton.parentElement?.addEventListener('mouseleave', close);
        loginDropdown.addEventListener('mouseenter', clear);
        loginDropdown.addEventListener('mouseleave', close);
    }

    function checkAuth() {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const loggedOutView = safeQuery('#logged-out-view');
        const loggedInView = safeQuery('#logged-in-view');
        const userDisplayName = safeQuery('#user-display-name');
        const loginIcon = doc.querySelector('button[onclick="toggleLoginDropdown(event)"] .material-symbols-outlined');
        const mobileSigninLink = safeQuery('#mobile-signin-link');
        const mobileOrdersLink = safeQuery('#mobile-orders-link');
        const mobileUserInfo = safeQuery('#mobile-user-info');
        const mobileUserName = safeQuery('#mobile-user-name');

        if (isAuthenticated) {
            loggedOutView?.classList.add('hidden');
            loggedInView?.classList.remove('hidden');
            if (userDisplayName) userDisplayName.innerText = localStorage.getItem('userName') || 'User';
            if (loginIcon) loginIcon.style.color = '#c5a059';
            mobileSigninLink?.classList.add('hidden');
            mobileOrdersLink?.classList.remove('hidden');
            mobileUserInfo?.classList.remove('hidden');
            if (mobileUserName) mobileUserName.innerText = localStorage.getItem('userName') || 'User';
        } else {
            loggedOutView?.classList.remove('hidden');
            loggedInView?.classList.add('hidden');
            if (loginIcon) loginIcon.style.color = '';
            mobileSigninLink?.classList.remove('hidden');
            mobileOrdersLink?.classList.add('hidden');
            mobileUserInfo?.classList.add('hidden');
        }
    }

    function logout() {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMobile');
        window.location.reload();
    }

    function selectLang(code) {
        const langText = safeQuery('#lang-text');
        if (langText) langText.innerText = code;
        safeQuery('#lang-dropdown')?.classList.add('hidden');
        safeQuery('#mobile-tools-dropdown')?.classList.add('hidden');
    }

    function toggleSearch() {
        const navbar = safeQuery('#navbar');
        const searchInput = safeQuery('#search-input');
        if (!navbar) return;
        navbar.classList.toggle('is-searching');
        if (navbar.classList.contains('is-searching')) {
            setTimeout(() => searchInput?.focus(), 100);
            safeQuery('#lang-dropdown')?.classList.add('hidden');
            safeQuery('#mobile-tools-dropdown')?.classList.add('hidden');
        } else {
            if (searchInput) {
                searchInput.value = '';
                searchInput.blur();
            }
            navbar.classList.remove('has-query');
        }
    }

    function initSearchListener() {
        const searchInput = safeQuery('#search-input');
        const navbar = safeQuery('#navbar');
        if (!searchInput || !navbar) return;
        searchInput.addEventListener('input', function(e) {
            if (e.target.value.trim().length > 0) {
                navbar.classList.add('has-query');
            } else {
                navbar.classList.remove('has-query');
            }
        });
    }

    function initGlobalClick() {
        doc.addEventListener('click', () => {
            safeQuery('#lang-dropdown')?.classList.add('hidden');
            safeQuery('#login-dropdown')?.classList.add('hidden');
            safeQuery('#mobile-tools-dropdown')?.classList.add('hidden');
        });
    }

    function initCarousel() {
        const videoElement = safeQuery('#carousel-video');
        const videoSource = safeQuery('#video-source');
        const titleElement = safeQuery('#carousel-title');
        const subtitleElement = safeQuery('#carousel-subtitle');
        const indicators = doc.querySelectorAll('.indicator');
        const carouselContainer = safeQuery('#carousel-container');
        if (!videoElement || !videoSource || !titleElement || !subtitleElement || !carouselContainer) return;

        const slides = [
            { title: 'Petra Vessel', subtitle: 'Natural Granite / Matte Finish', video: 'https://hindwarestg.blob.core.windows.net/container1/products/ae5eb07a-52f8-45fa-98ea-c427f8dde36f.mp4' },
            { title: 'Obsidian Mono', subtitle: 'Hand-Carved Basalt / Textured', video: 'https://assets.mixkit.co/videos/preview/mixkit-modern-bathroom-interior-4158-large.mp4' },
            { title: 'Calcite Flow', subtitle: 'Sandstone / Minimalist', video: 'https://assets.mixkit.co/videos/preview/mixkit-hand-spraying-water-on-the-ceramic-31834-large.mp4' }
        ];

        let currentSlide = 0;

        function updateCarousel() {
            carouselContainer.style.opacity = '0';
            setTimeout(() => {
                const slide = slides[currentSlide];
                videoSource.src = slide.video;
                videoElement.load();
                const playPromise = videoElement.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }
                titleElement.innerText = slide.title;
                subtitleElement.innerText = slide.subtitle;
                indicators.forEach((ind, i) => {
                    if (i === currentSlide) {
                        ind.classList.add('w-12', 'md:w-20', 'bg-white');
                        ind.classList.remove('w-8', 'md:w-12', 'bg-white/20');
                    } else {
                        ind.classList.remove('w-12', 'md:w-20', 'bg-white');
                        ind.classList.add('w-8', 'md:w-12', 'bg-white/20');
                    }
                });
                carouselContainer.style.opacity = '1';
            }, 500);
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        function goToSlide(n) {
            currentSlide = n;
            updateCarousel();
        }

        safeQuery('[data-carousel-next]')?.addEventListener('click', nextSlide);
        safeQuery('[data-carousel-prev]')?.addEventListener('click', prevSlide);
        doc.querySelectorAll('[data-carousel-slide]').forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });

        videoElement.addEventListener('ended', nextSlide);
        updateCarousel();
    }

    function initSeoToggle() {
        const seoButton = safeQuery('#seo-toggle-button');
        if (!seoButton) return;
        seoButton.addEventListener('click', () => {
            const content = safeQuery('#seo-content');
            const buttonText = safeQuery('#seo-toggle-text');
            const icon = safeQuery('#seo-toggle-icon');
            const gradient = safeQuery('#seo-gradient');
            if (!content || !buttonText || !icon || !gradient) return;
            const expanded = content.classList.toggle('expanded');
            if (expanded) {
                content.style.maxHeight = '1000px';
                buttonText.innerText = 'Show Less';
                icon.style.transform = 'rotate(180deg)';
                gradient.style.opacity = '0';
            } else {
                content.style.maxHeight = '140px';
                buttonText.innerText = 'Discover More';
                icon.style.transform = 'rotate(0deg)';
                gradient.style.opacity = '1';
            }
        });
    }

    function init() {
        createIcons();
        initNavbarScroll();
        initLoginHover();
        checkAuth();
        initSearchListener();
        initGlobalClick();
        initCarousel();
        initSeoToggle();

        window.toggleMobileMenu = toggleMobileMenu;
        window.toggleMobileTools = toggleMobileTools;
        window.toggleLangDropdown = toggleLangDropdown;
        window.toggleLoginDropdown = toggleLoginDropdown;
        window.logout = logout;
        window.selectLang = selectLang;
        window.toggleSearch = toggleSearch;
    }

    document.addEventListener('DOMContentLoaded', init);
})();
/* Theme JavaScript for R Ceramica Luxury Surfaces */

function rceramicaInitLucide() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function rceramicaToggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;

    const isHidden = mobileMenu.classList.contains('mobile-menu-hidden');
    if (isHidden) {
        mobileMenu.classList.remove('mobile-menu-hidden');
        mobileMenu.classList.add('mobile-menu-visible');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.remove('mobile-menu-visible');
        mobileMenu.classList.add('mobile-menu-hidden');
        document.body.style.overflow = '';
    }
}

function rceramicaToggleMobileTools(event) {
    if (event) event.stopPropagation();
    const mobileToolsDropdown = document.getElementById('mobile-tools-dropdown');
    if (!mobileToolsDropdown) return;
    mobileToolsDropdown.classList.toggle('hidden');
}

function rceramicaToggleLangDropdown(event) {
    if (event) event.stopPropagation();
    const langDropdown = document.getElementById('lang-dropdown');
    const loginDropdown = document.getElementById('login-dropdown');
    if (!langDropdown) return;
    langDropdown.classList.toggle('hidden');
    if (loginDropdown) loginDropdown.classList.add('hidden');
}

function rceramicaToggleLoginDropdown(event) {
    if (event) event.stopPropagation();
    const loginDropdown = document.getElementById('login-dropdown');
    const langDropdown = document.getElementById('lang-dropdown');
    const mobileToolsDropdown = document.getElementById('mobile-tools-dropdown');
    if (!loginDropdown) return;
    loginDropdown.classList.toggle('hidden');
    if (langDropdown) langDropdown.classList.add('hidden');
    if (mobileToolsDropdown) mobileToolsDropdown.classList.add('hidden');
}

function rceramicaSetupLoginHover() {
    const loginToggleButton = document.querySelector('button[onclick="toggleLoginDropdown(event)"]');
    const loginDropdown = document.getElementById('login-dropdown');
    const langDropdown = document.getElementById('lang-dropdown');
    let timeoutId;

    if (!loginToggleButton || !loginDropdown) return;

    const parent = loginToggleButton.parentElement;
    parent.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
        loginDropdown.classList.remove('hidden');
        if (langDropdown) langDropdown.classList.add('hidden');
    });
    parent.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => loginDropdown.classList.add('hidden'), 300);
    });
    loginDropdown.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    loginDropdown.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => loginDropdown.classList.add('hidden'), 300);
    });
}

function rceramicaCheckAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const loggedOutView = document.getElementById('logged-out-view');
    const loggedInView = document.getElementById('logged-in-view');
    const userDisplayName = document.getElementById('user-display-name');
    const loginIcon = document.querySelector('button[onclick="toggleLoginDropdown(event)"] .material-symbols-outlined');
    const mobileSigninLink = document.getElementById('mobile-signin-link');
    const mobileOrdersLink = document.getElementById('mobile-orders-link');
    const mobileUserInfo = document.getElementById('mobile-user-info');
    const mobileUserName = document.getElementById('mobile-user-name');

    if (isAuthenticated) {
        if (loggedOutView) loggedOutView.classList.add('hidden');
        if (loggedInView) loggedInView.classList.remove('hidden');
        if (userDisplayName) userDisplayName.innerText = localStorage.getItem('userName') || 'User';
        if (loginIcon) loginIcon.style.color = '#c5a059';
        if (mobileSigninLink) mobileSigninLink.classList.add('hidden');
        if (mobileOrdersLink) mobileOrdersLink.classList.remove('hidden');
        if (mobileUserInfo) mobileUserInfo.classList.remove('hidden');
        if (mobileUserName) mobileUserName.innerText = localStorage.getItem('userName') || 'User';
    } else {
        if (loggedOutView) loggedOutView.classList.remove('hidden');
        if (loggedInView) loggedInView.classList.add('hidden');
        if (loginIcon) loginIcon.style.color = '';
        if (mobileSigninLink) mobileSigninLink.classList.remove('hidden');
        if (mobileOrdersLink) mobileOrdersLink.classList.add('hidden');
        if (mobileUserInfo) mobileUserInfo.classList.add('hidden');
    }
}

function rceramicaLogout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userMobile');
    window.location.reload();
}

function rceramicaSelectLang(code) {
    const langText = document.getElementById('lang-text');
    const langDropdown = document.getElementById('lang-dropdown');
    const mobileToolsDropdown = document.getElementById('mobile-tools-dropdown');
    if (langText) langText.innerText = code;
    if (langDropdown) langDropdown.classList.add('hidden');
    if (mobileToolsDropdown) mobileToolsDropdown.classList.add('hidden');
}

function rceramicaToggleSearch() {
    const navbar = document.getElementById('navbar');
    const searchInput = document.getElementById('search-input');
    if (!navbar) return;

    navbar.classList.toggle('is-searching');
    if (navbar.classList.contains('is-searching')) {
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
        }
        const langDropdown = document.getElementById('lang-dropdown');
        const mobileToolsDropdown = document.getElementById('mobile-tools-dropdown');
        if (langDropdown) langDropdown.classList.add('hidden');
        if (mobileToolsDropdown) mobileToolsDropdown.classList.add('hidden');
    } else {
        if (searchInput) {
            searchInput.value = '';
            searchInput.blur();
        }
        navbar.classList.remove('has-query');
    }
}

function rceramicaSetupSearchListener() {
    const searchInput = document.getElementById('search-input');
    const navbar = document.getElementById('navbar');
    if (!searchInput || !navbar) return;

    searchInput.addEventListener('input', function (e) {
        if (e.target.value.trim().length > 0) {
            navbar.classList.add('has-query');
        } else {
            navbar.classList.remove('has-query');
        }
    });
}

function rceramicaInitCarousel() {
    const videoElement = document.getElementById('carousel-video');
    const videoSource = document.getElementById('video-source');
    const titleElement = document.getElementById('carousel-title');
    const subtitleElement = document.getElementById('carousel-subtitle');
    const indicators = document.querySelectorAll('.indicator');

    if (!videoElement || !videoSource || !titleElement || !subtitleElement || indicators.length === 0) {
        return;
    }

    const slides = [
        { title: 'Petra Vessel', subtitle: 'Natural Granite / Matte Finish', video: 'https://hindwarestg.blob.core.windows.net/container1/products/ae5eb07a-52f8-45fa-98ea-c427f8dde36f.mp4' },
        { title: 'Obsidian Mono', subtitle: 'Hand-Carved Basalt / Textured', video: 'https://assets.mixkit.co/videos/preview/mixkit-modern-bathroom-interior-4158-large.mp4' },
        { title: 'Calcite Flow', subtitle: 'Sandstone / Minimalist', video: 'https://assets.mixkit.co/videos/preview/mixkit-hand-spraying-water-on-the-ceramic-31834-large.mp4' }
    ];

    let currentSlide = 0;

    function updateCarousel() {
        const carouselContainer = document.getElementById('carousel-container');
        if (carouselContainer) carouselContainer.style.opacity = '0';

        setTimeout(() => {
            const slide = slides[currentSlide];
            if (videoSource) videoSource.src = slide.video;
            if (videoElement) {
                videoElement.load();
                const playPromise = videoElement.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }
            }
            titleElement.innerText = slide.title;
            subtitleElement.innerText = slide.subtitle;

            indicators.forEach((ind, i) => {
                if (i === currentSlide) {
                    ind.classList.add('w-12', 'md:w-20', 'bg-white');
                    ind.classList.remove('w-8', 'md:w-12', 'bg-white/20');
                } else {
                    ind.classList.remove('w-12', 'md:w-20', 'bg-white');
                    ind.classList.add('w-8', 'md:w-12', 'bg-white/20');
                }
            });

            if (carouselContainer) carouselContainer.style.opacity = '1';
        }, 500);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function goToSlide(n) {
        currentSlide = n;
        updateCarousel();
    }

    window.rceramicaCarouselNext = nextSlide;
    window.rceramicaCarouselPrev = prevSlide;
    window.rceramicaCarouselGoTo = goToSlide;

    videoElement.addEventListener('ended', nextSlide);
    updateCarousel();
}

function rceramicaToggleSEO() {
    const content = document.getElementById('seo-content');
    const buttonText = document.getElementById('seo-toggle-text');
    const icon = document.getElementById('seo-toggle-icon');
    const gradient = document.getElementById('seo-gradient');
    if (!content || !buttonText || !icon || !gradient) return;

    const isExpanded = content.style.maxHeight === '1000px';
    if (isExpanded) {
        content.style.maxHeight = '140px';
        buttonText.innerText = 'Discover More';
        icon.style.transform = 'rotate(0deg)';
        gradient.style.opacity = '1';
    } else {
        content.style.maxHeight = '1000px';
        buttonText.innerText = 'Show Less';
        icon.style.transform = 'rotate(180deg)';
        gradient.style.opacity = '0';
    }
}

function rceramicaSetupGlobalClickClose() {
    const langDropdown = document.getElementById('lang-dropdown');
    const loginDropdown = document.getElementById('login-dropdown');
    const mobileToolsDropdown = document.getElementById('mobile-tools-dropdown');

    window.addEventListener('click', () => {
        if (langDropdown) langDropdown.classList.add('hidden');
        if (loginDropdown) loginDropdown.classList.add('hidden');
        if (mobileToolsDropdown) mobileToolsDropdown.classList.add('hidden');
    });
}

function rceramicaInitTheme() {
    rceramicaInitLucide();
    rceramicaSetupLoginHover();
    rceramicaCheckAuth();
    rceramicaSetupSearchListener();
    rceramicaSetupGlobalClickClose();
    rceramicaInitCarousel();
}

document.addEventListener('DOMContentLoaded', rceramicaInitTheme);

/* =========================================
   FILTER SIDEBAR TOGGLE
========================================= */

function rceramicaInitFilterToggles() {

    const toggleButtons = document.querySelectorAll('[data-filter-toggle]');

    toggleButtons.forEach(button => {

        button.addEventListener('click', function () {

            const target = this.nextElementSibling;
            const icon = this.querySelector('.filter-toggle-icon');

            if (!target) return;

            target.classList.toggle('hidden');

           if (icon) {

    const isOpen = !target.classList.contains('hidden');

    icon.setAttribute(
        'data-lucide',
        isOpen ? 'minus' : 'plus'
    );

    if (window.lucide) {
        lucide.createIcons();
    }
}

        });

    });

}

document.addEventListener('DOMContentLoaded', function () {

    rceramicaInitFilterToggles();

});

document.addEventListener('DOMContentLoaded', function () {

    const range = document.getElementById('priceRange');
    const minInput = document.getElementById('minPrice');
    const maxInput = document.getElementById('maxPrice');

    if (!range || !minInput || !maxInput) return;

    range.addEventListener('input', function () {

        maxInput.value = this.value;

        // Optional dynamic min
        minInput.value = Math.max(0, this.value - 5000);

    });

});