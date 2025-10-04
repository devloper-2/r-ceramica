// ===== PROFESSIONAL JAVASCRIPT FOR R CERAMICA =====

// Product data organized by categories
const productData = {
    ARIS: [
        { name: "ARIS M-1102", code: "M-1102", type: "Matt Finish", image: "images/ARIS M-1102.jpg" },
        { name: "ARIS M-1103", code: "M-1103", type: "Matt Finish", image: "images/ARIS M-1103.jpg" },
        { name: "ARIS M-1105", code: "M-1105", type: "Matt Finish", image: "images/ARIS M-1105.jpg" },
        { name: "ARIS M-1106", code: "M-1106", type: "Matt Finish", image: "images/ARIS M-1106.jpg" },
        { name: "ARIS M-1108", code: "M-1108", type: "Matt Finish", image: "images/ARIS M-1108.jpg" },
        { name: "ARIS T-4102", code: "T-4102", type: "Textured", image: "images/ARIS T-4102.jpg" },
        { name: "ARIS T-4103", code: "T-4103", type: "Textured", image: "images/ARIS T-4103.jpg" },
        { name: "ARIS T-4106", code: "T-4106", type: "Textured", image: "images/ARIS T-4106.jpg" },
        { name: "ARIS T-4109", code: "T-4109", type: "Textured", image: "images/ARIS T-4109.jpg" },
        { name: "ARIS T-4112", code: "T-4112", type: "Textured", image: "images/ARIS T-4112.jpg" }
    ],
    BEETLE: [
        { name: "BEETLE M-1301", code: "M-1301", type: "Matt Finish", image: "images/BEETLE M-1301.jpg" },
        { name: "BEETLE M-1304", code: "M-1304", type: "Matt Finish", image: "images/BEETLE M-1304.jpg" },
        { name: "BEETLE M-1306", code: "M-1306", type: "Matt Finish", image: "images/BEETLE M-1306.jpg" },
        { name: "BEETLE M-1307", code: "M-1307", type: "Matt Finish", image: "images/BEETLE M-1307.jpg" },
        { name: "BEETLE T-4303", code: "T-4303", type: "Textured", image: "images/BEETLE T-4303.jpg" },
        { name: "BEETLE T-4306", code: "T-4306", type: "Textured", image: "images/BEETLE T-4306.jpg" },
        { name: "BEETLE T-4309", code: "T-4309", type: "Textured", image: "images/BEETLE T-4309.jpg" },
        { name: "BEETLE T-4310", code: "T-4310", type: "Textured", image: "images/BEETLE T-4310.jpg" },
        { name: "BEETLE T-4311", code: "T-4311", type: "Textured", image: "images/BEETLE T-4311.jpg" }
    ],
    LATRA: [
        { name: "LATRA M-1701", code: "M-1701", type: "Matt Finish", image: "images/LATRA M-1701.jpg" },
        { name: "LATRA M-1703", code: "M-1703", type: "Matt Finish", image: "images/LATRA M-1703.jpg" },
        { name: "LATRA M-1704", code: "M-1704", type: "Matt Finish", image: "images/LATRA M-1704.jpg" },
        { name: "LATRA M-1705", code: "M-1705", type: "Matt Finish", image: "images/LATRA M-1705.jpg" },
        { name: "LATRA M-1706", code: "M-1706", type: "Matt Finish", image: "images/LATRA M-1706.jpg" },
        { name: "LATRA M-1707", code: "M-1707", type: "Matt Finish", image: "images/LATRA M-1707.jpg" },
        { name: "LATRA M-1708", code: "M-1708", type: "Matt Finish", image: "images/LATRA M-1708.jpg" },
        { name: "LATRA T-4701", code: "T-4701", type: "Textured", image: "images/LATRA T-4701.jpg" },
        { name: "LATRA T-4711", code: "T-4711", type: "Textured", image: "images/LATRA T-4711.jpg" },
        { name: "LATRA T-4712", code: "T-4712", type: "Textured", image: "images/LATRA T-4712.jpg" },
        { name: "LATRA T-4713", code: "T-4713", type: "Textured", image: "images/LATRA T-4713.jpg" },
        { name: "LATRA T-4714", code: "T-4714", type: "Textured", image: "images/LATRA T-4714.jpg" }
    ],
    LAVA: [
        { name: "LAVA M-1201", code: "M-1201", type: "Matt Finish", image: "images/LAVA M-1201.jpg" },
        { name: "LAVA M-1202", code: "M-1202", type: "Matt Finish", image: "images/LAVA M-1202.jpg" }
    ],
    LEVIS: [
        { name: "LEVIS M-1801", code: "M-1801", type: "Matt Finish", image: "images/LEVIS M-1801.jpg" },
        { name: "LEVIS M-1802", code: "M-1802", type: "Matt Finish", image: "images/LEVIS M-1802.jpg" },
        { name: "LEVIS M-1803", code: "M-1803", type: "Matt Finish", image: "images/LEVIS M-1803.jpg" },
        { name: "LEVIS M-1804", code: "M-1804", type: "Matt Finish", image: "images/LEVIS M-1804.jpg" },
        { name: "LEVIS M-1805", code: "M-1805", type: "Matt Finish", image: "images/LEVIS M-1805.jpg" },
        { name: "LEVIS T-4801", code: "T-4801", type: "Textured", image: "images/LEVIS T-4801.jpg" },
        { name: "LEVIS T-4802", code: "T-4802", type: "Textured", image: "images/LEVIS T-4802.jpg" },
        { name: "LEVIS T-4803", code: "T-4803", type: "Textured", image: "images/LEVIS T-4803.jpg" },
        { name: "LEVIS T-4804", code: "T-4804", type: "Textured", image: "images/LEVIS T-4804.jpg" },
        { name: "LEVIS T-4805", code: "T-4805", type: "Textured", image: "images/LEVIS T-4805.jpg" }
    ],
    STROM: [
        { name: "STROM M-1403", code: "M-1403", type: "Matt Finish", image: "images/STROM M-1403.jpg" },
        { name: "STROM M-1405", code: "M-1405", type: "Matt Finish", image: "images/STROM M-1405.jpg" },
        { name: "STROM M-1406", code: "M-1406", type: "Matt Finish", image: "images/STROM M-1406.jpg" },
        { name: "STROM M-1407", code: "M-1407", type: "Matt Finish", image: "images/STROM M-1407.jpg" },
        { name: "STROM T-4402", code: "T-4402", type: "Textured", image: "images/STROM T-4402.jpg" },
        { name: "STROM T-4403", code: "T-4403", type: "Textured", image: "images/STROM T-4403.jpg" },
        { name: "STROM T-4404", code: "T-4404", type: "Textured", image: "images/STROM T-4404.jpg" },
        { name: "STROM T-4405", code: "T-4405", type: "Textured", image: "images/STROM T-4405.jpg" },
        { name: "STROM T-4408", code: "T-4408", type: "Textured", image: "images/STROM T-4408.jpg" }
    ],
    TORO: [
        { name: "TORO M-1001", code: "M-1001", type: "Matt Finish", image: "images/TORO M-1001.jpg" },
        { name: "TORO M-1003", code: "M-1003", type: "Matt Finish", image: "images/TORO M-1003.jpg" },
        { name: "TORO M-1004", code: "M-1004", type: "Matt Finish", image: "images/TORO M-1004.jpg" },
        { name: "TORO M-1005", code: "M-1005", type: "Matt Finish", image: "images/TORO M-1005.jpg" },
        { name: "TORO M-1006", code: "M-1006", type: "Matt Finish", image: "images/TORO M-1006.jpg" },
        { name: "TORO M-1007", code: "M-1007", type: "Matt Finish", image: "images/TORO M-1007.jpg" },
        { name: "TORO M-1008", code: "M-1008", type: "Matt Finish", image: "images/TORO M-1008.jpg" },
        { name: "TORO M-1010", code: "M-1010", type: "Matt Finish", image: "images/TORO M-1010.jpg" },
        { name: "TORO M-1012", code: "M-1012", type: "Matt Finish", image: "images/TORO M-1012.jpg" },
        { name: "TORO M-1015", code: "M-1015", type: "Matt Finish", image: "images/TORO M-1015.jpg" },
        { name: "TORO M-1016", code: "M-1016", type: "Matt Finish", image: "images/TORO M-1016.jpg" },
        { name: "TORO M-1018", code: "M-1018", type: "Matt Finish", image: "images/TORO M-1018.jpg" },
        { name: "TORO M-1022", code: "M-1022", type: "Matt Finish", image: "images/TORO M-1022.jpg" },
        { name: "TORO M-1024", code: "M-1024", type: "Matt Finish", image: "images/TORO M-1024.jpg" },
        { name: "TORO M-1025", code: "M-1025", type: "Matt Finish", image: "images/TORO M-1025.jpg" },
        { name: "TORO M-1026", code: "M-1026", type: "Matt Finish", image: "images/TORO M-1026.jpg" },
        { name: "TORO M-1028", code: "M-1028", type: "Matt Finish", image: "images/TORO M-1028.jpg" },
        { name: "TORO T-4001", code: "T-4001", type: "Textured", image: "images/TORO T-4001.jpg" },
        { name: "TORO T-4004", code: "T-4004", type: "Textured", image: "images/TORO T-4004.jpg" },
        { name: "TORO T-4005", code: "T-4005", type: "Textured", image: "images/TORO T-4005.jpg" },
        { name: "TORO T-4006", code: "T-4006", type: "Textured", image: "images/TORO T-4006.jpg" },
        { name: "TORO T-4007", code: "T-4007", type: "Textured", image: "images/TORO T-4007.jpg" },
        { name: "TORO T-4011", code: "T-4011", type: "Textured", image: "images/TORO T-4011.jpg" },
        { name: "TORO T-4015", code: "T-4015", type: "Textured", image: "images/TORO T-4015.jpg" },
        { name: "TORO T-4018", code: "T-4018", type: "Textured", image: "images/TORO T-4018.jpg" },
        { name: "TORO T-4020", code: "T-4020", type: "Textured", image: "images/TORO T-4020.jpg" },
        { name: "TORO T-4021", code: "T-4021", type: "Textured", image: "images/TORO T-4021.jpg" },
        { name: "TORO T-4023", code: "T-4023", type: "Textured", image: "images/TORO T-4023.jpg" }
    ]
};

// ===== APPLICATION INITIALIZATION =====
class RCeramicaApp {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = true;
        this.animations = {};
        this.init();
    }

    init() {
        this.setupGSAP();
        this.handleLoading();
        this.setupEventListeners();
        this.initAnimations();
        this.setupScrollTriggers();
        this.preloadImages();
    }

    // ===== GSAP SETUP =====
    setupGSAP() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Set default GSAP settings
        gsap.defaults({
            duration: 0.8,
            ease: "power2.out"
        });
    }

    // ===== LOADING SCREEN =====
    handleLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        const progressBar = document.querySelector('.progress-bar');
        
        // Simulate loading progress
        gsap.to(progressBar, {
            width: '100%',
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
                setTimeout(() => {
                    gsap.to(loadingOverlay, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            loadingOverlay.style.display = 'none';
                            this.isLoading = false;
                            this.startMainAnimations();
                        }
                    });
                }, 500);
            }
        });
    }

    // ===== MAIN ANIMATIONS =====
    startMainAnimations() {
        // Animate header
        gsap.from('.header', {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        // Animate hero content
        this.animateHeroContent();
        
        // Start counter animations
        this.animateCounters();
    }

    animateHeroContent() {
        const tl = gsap.timeline();
        
        tl.from('.title-line', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        })
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.6
        }, "-=0.3")
        .from('.hero-stats', {
            y: 50,
            opacity: 0,
            duration: 0.6
        }, "-=0.2")
        .from('.hero-buttons', {
            y: 50,
            opacity: 0,
            duration: 0.6
        }, "-=0.2")
        .from('.hero-visual', {
            x: 100,
            opacity: 0,
            duration: 0.8
        }, "-=0.4")
        .from('.scroll-indicator', {
            y: 50,
            opacity: 0,
            duration: 0.6
        }, "-=0.2");
    }

    // ===== COUNTER ANIMATIONS =====
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            
            gsap.to(counter, {
                innerHTML: target,
                duration: 2,
                ease: "power2.out",
                snap: { innerHTML: 1 },
                delay: 1
            });
        });
    }

    // ===== SCROLL TRIGGERS =====
    setupScrollTriggers() {
        // Header scroll effect
        ScrollTrigger.create({
            trigger: "body",
            start: "100px top",
            onEnter: () => document.querySelector('.header').classList.add('scrolled'),
            onLeaveBack: () => document.querySelector('.header').classList.remove('scrolled')
        });

        // Collections section animation
        gsap.from('.collection-card', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.collections-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Section header animations
        gsap.from('.section-header', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.section-header',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Collection cards
        this.setupCollectionCards();
        
        // Smooth scrolling
        this.setupSmoothScrolling();
        
        // Menu toggle
        this.setupMobileMenu();
        
        // Search functionality
        this.setupSearch();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                
                if (target.startsWith('#')) {
                    this.scrollToSection(target);
                    this.setActiveNav(link);
                }
            });
        });
    }

    setupCollectionCards() {
        const collectionCards = document.querySelectorAll('.collection-card');
        
        collectionCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                this.showProductsPage(category);
            });

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    setupSmoothScrolling() {
        const exploreBtn = document.querySelector('.explore-btn');
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                this.scrollToSection('#collections');
            });
        }

        // Hero buttons
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = btn.getAttribute('data-target');
                if (target) {
                    e.preventDefault();
                    this.scrollToSection(target);
                }
            });
        });
    }

    setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        menuToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            this.animateMenuToggle(menuToggle);
        });
    }

    setupSearch() {
        const searchBtn = document.querySelector('.search-btn');
        
        searchBtn?.addEventListener('click', () => {
            // Implement search functionality
            console.log('Search clicked');
        });
    }

    // ===== UTILITY FUNCTIONS =====
    scrollToSection(target) {
        const element = document.querySelector(target);
        if (element) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: element,
                    offsetY: 80
                },
                ease: "power2.out"
            });
        }
    }

    setActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    animateMenuToggle(toggle) {
        const spans = toggle.querySelectorAll('span');
        const isActive = toggle.classList.contains('active');
        
        if (!isActive) {
            gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.3 });
            gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.3 });
            toggle.classList.add('active');
        } else {
            gsap.to(spans, { rotation: 0, y: 0, opacity: 1, duration: 0.3 });
            toggle.classList.remove('active');
        }
    }

    showProductsPage(category) {
        // Create products page with animations
        const products = productData[category] || [];
        
        // Animate transition to products page
        gsap.to('.collections-section', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                this.renderProductsPage(category, products);
            }
        });
    }

    renderProductsPage(category, products) {
        // This would create the products page
        // For now, just console log
        console.log(`Showing ${category} products:`, products);
    }

    // ===== PRELOAD IMAGES =====
    preloadImages() {
        const imageUrls = [];
        
        Object.values(productData).forEach(products => {
            products.forEach(product => {
                imageUrls.push(product.image);
            });
        });
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // ===== INIT ANIMATIONS =====
    initAnimations() {
        // Floating ceramics animation
        gsap.to('.ceramic-item', {
            y: -20,
            duration: 2,
            ease: "power1.inOut",
            stagger: 0.5,
            repeat: -1,
            yoyo: true
        });

        // Particle animation
        gsap.to('.hero-particles', {
            rotation: 360,
            duration: 100,
            ease: "none",
            repeat: -1
        });
    }
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    new RCeramicaApp();
});

// ===== ADDITIONAL FEATURES =====

// Intersection Observer for scroll animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.collection-card, .section-header').forEach(el => {
        observer.observe(el);
    });
};

// Performance monitoring
const trackPerformance = () => {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });
    }
};

// Initialize additional features
observeElements();
trackPerformance();

// Export for global access
window.RCeramica = {
    productData,
    app: null
};

window.addEventListener('load', () => {
    window.RCeramica.app = new RCeramicaApp();
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);

    setupEventListeners();
    addScrollEffects();
    preloadImages();
    initBackToTop();
    initProductFilters();
});

// Setup event listeners
function setupEventListeners() {
    // Category click handlers
    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', function() {
            const categoryName = this.getAttribute('data-category');
            showProducts(categoryName);
        });
    });

    // Back button handler
    backBtn.addEventListener('click', function() {
        showCategories();
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 46, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact icons animation
    document.querySelectorAll('.contact-icons a').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
}

// Show products for a specific category
function showProducts(categoryName) {
    // Hide categories section
    categoriesSection.style.display = 'none';
    
    // Show products section
    productsSection.style.display = 'block';
    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Set category title
    categoryTitle.textContent = `${categoryName} Collection`;
    
    // Clear existing products
    productGrid.innerHTML = '<div class="loading"></div>';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        displayProducts(categoryName);
    }, 300);
}

// Display products for the selected category
function displayProducts(categoryName) {
    const products = productData[categoryName] || [];
    
    productGrid.innerHTML = '';
    
    if (products.length === 0) {
        productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3 style="color: #b8b8d1; margin-bottom: 1rem;">No products found</h3>
                <p style="color: #888;">Products for this category will be available soon.</p>
            </div>
        `;
        return;
    }
    
    products.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productGrid.appendChild(productCard);
    });
    
    // Add stagger animation to product cards
    animateProductCards();
}

// Create a product card element
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" onerror="handleImageError(this)">
        <h4>${product.name}</h4>
        <div class="product-code">Code: ${product.code}</div>
        <div class="product-type">${product.type}</div>
    `;
    
    // Add click event for potential future expansion
    card.addEventListener('click', function() {
        // Could open a modal with detailed product information
        console.log(`Clicked on ${product.name}`);
    });
    
    return card;
}

// Handle image loading errors
function handleImageError(img) {
    img.style.background = 'linear-gradient(45deg, #2c2c54, #40407a)';
    img.style.display = 'flex';
    img.style.alignItems = 'center';
    img.style.justifyContent = 'center';
    img.style.color = '#b8b8d1';
    img.style.fontSize = '0.9rem';
    img.alt = 'Image not available';
    img.innerHTML = '<i class="fas fa-image" style="font-size: 2rem; opacity: 0.5;"></i>';
}

// Show categories section
function showCategories() {
    productsSection.style.display = 'none';
    categoriesSection.style.display = 'block';
    categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Animate product cards with stagger effect
function animateProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add scroll effects and animations
function addScrollEffects() {
    // Intersection Observer for category cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`;
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe category cards
    document.querySelectorAll('.category').forEach(category => {
        observer.observe(category);
    });
    
    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Preload images for better performance
function preloadImages() {
    const imageUrls = [];
    
    // Collect all image URLs
    Object.values(productData).forEach(products => {
        products.forEach(product => {
            imageUrls.push(product.image);
        });
    });
    
    // Preload images
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Add touch gesture support for mobile
function addTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - could navigate to next category
                console.log('Swipe left detected');
            } else {
                // Swipe right - could navigate to previous category or back
                console.log('Swipe right detected');
                if (productsSection.style.display !== 'none') {
                    showCategories();
                }
            }
        }
    }
}

// Initialize touch support
addTouchSupport();

// Add search functionality (for future enhancement)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search products...';
    searchInput.className = 'search-input';
    
    searchInput.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1001;
        padding: 10px 20px;
        border: none;
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        color: white;
        font-size: 16px;
        width: 300px;
        display: none;
    `;
    
    document.body.appendChild(searchInput);
    
    // Toggle search with Ctrl+K or Cmd+K
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
            if (searchInput.style.display === 'block') {
                searchInput.focus();
            }
        }
        
        if (e.key === 'Escape') {
            searchInput.style.display = 'none';
        }
    });
}

// Initialize search functionality
addSearchFunctionality();

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Add loading states and error handling
function addLoadingStates() {
    // Add loading spinner for category cards
    document.querySelectorAll('.category img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(45deg, #2c2c54, #40407a)';
            this.style.opacity = '0.7';
        });
    });
}

// Initialize additional features
addLoadingStates();

// Export functions for potential external use
window.RCeramica = {
    showProducts,
    showCategories,
    productData,
    categoryDescriptions
};

// Initialize Back to Top functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize Product Filters
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

// Filter products based on type
function filterProducts(filter) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productType = card.querySelector('.product-type').textContent.toLowerCase();
        
        if (filter === 'all') {
            card.style.display = 'block';
        } else if (filter === 'matt' && productType.includes('matt')) {
            card.style.display = 'block';
        } else if (filter === 'textured' && productType.includes('textured')) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Re-animate visible cards
    setTimeout(() => {
        const visibleCards = document.querySelectorAll('.product-card[style*="block"]');
        visibleCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
}

// Enhanced product card creation with better error handling
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" onerror="handleImageError(this)" loading="lazy">
        <h4>${product.name}</h4>
        <div class="product-code">Code: ${product.code}</div>
        <div class="product-type">${product.type}</div>
        <div class="product-actions">
            <button class="view-btn" onclick="viewProductDetails('${product.name}', '${product.code}', '${product.type}', '${product.image}')">
                <i class="fas fa-eye"></i> View Details
            </button>
        </div>
    `;
    
    return card;
}

// View product details (can be expanded for modal functionality)
function viewProductDetails(name, code, type, image) {
    // For now, just log the details - can be expanded to show modal
    console.log('Product Details:', { name, code, type, image });
    
    // Could implement a modal here
    alert(`Product: ${name}\nCode: ${code}\nType: ${type}`);
}

// Enhanced image error handling
function handleImageError(img) {
    img.style.background = 'linear-gradient(45deg, #2c2c54, #40407a)';
    img.style.display = 'flex';
    img.style.alignItems = 'center';
    img.style.justifyContent = 'center';
    img.style.color = '#b8b8d1';
    img.style.fontSize = '0.9rem';
    img.style.flexDirection = 'column';
    img.style.gap = '0.5rem';
    
    // Create placeholder content
    const placeholder = document.createElement('div');
    placeholder.innerHTML = `
        <i class="fas fa-image" style="font-size: 2rem; opacity: 0.5; margin-bottom: 0.5rem;"></i>
        <span style="font-size: 0.8rem;">Image not available</span>
    `;
    
    // Replace img with placeholder
    img.parentNode.replaceChild(placeholder, img);
    placeholder.className = 'image-placeholder';
    placeholder.style.cssText = img.style.cssText;
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to go back to categories
    if (e.key === 'Escape' && productsSection.style.display !== 'none') {
        showCategories();
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const categories = document.querySelectorAll('.category');
        const currentCategory = document.querySelector('.category.active');
        
        if (currentCategory) {
            let currentIndex = Array.from(categories).indexOf(currentCategory);
            let newIndex;
            
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
            } else {
                newIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
            }
            
            categories[newIndex].click();
        }
    }
});

// Add performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });
    }
}

trackPerformance();