/* ===== AASHI FAUCETS INSPIRED JAVASCRIPT FOR R CERAMICA ===== */

$(document).ready(function() {
    'use strict';

    // ===== PRELOADER =====
    $(window).on('load', function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });

    // ===== HERO CAROUSEL =====
    $('.hero-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        nav: true,
        dots: true,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1000,
        responsive: {
            0: {
                nav: false,
                dots: true
            },
            768: {
                nav: true,
                dots: true
            }
        }
    });

    // ===== BESTSELLER CAROUSEL =====
    $('.bestseller-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        smartSpeed: 800,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            576: {
                items: 2,
                nav: false
            },
            768: {
                items: 3,
                nav: true
            },
            992: {
                items: 4,
                nav: true
            }
        }
    });

    // ===== BLOG CAROUSEL =====
    $('.blog-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 4500,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        smartSpeed: 800,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            768: {
                items: 2,
                nav: true
            },
            992: {
                items: 3,
                nav: true
            }
        }
    });

    // ===== FEATURED PRODUCTS CAROUSEL =====
    setTimeout(function() {
        if ($('.featured-carousel').length > 0) {
            console.log('Found featured carousel, initializing...');
            $('.featured-carousel').owlCarousel({
                items: 3,
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                nav: false,
                dots: true,
                smartSpeed: 1000,
                animateOut: 'slideOutLeft',
                animateIn: 'slideInRight',
                margin: 20,
                onInitialized: function() {
                    startProgressBar();
                },
                onChanged: function() {
                    resetProgressBar();
                },
                responsive: {
                    0: {
                        items: 1,
                        nav: false,
                        dots: true
                    },
                    576: {
                        items: 2,
                        nav: false,
                        dots: true
                    },
                    992: {
                        items: 3,
                        nav: false,
                        dots: true
                    }
                }
            });
            console.log('Featured carousel initialized successfully');
        } else {
            console.log('Featured carousel not found');
        }
    }, 1000);

    // Progress bar functions
    function startProgressBar() {
        $('.carousel-progress-bar').css('width', '0%');
        $('.carousel-progress-bar').animate({width: '100%'}, 3000, 'linear');
    }

    function resetProgressBar() {
        $('.carousel-progress-bar').stop().css('width', '0%');
        setTimeout(function() {
            $('.carousel-progress-bar').animate({width: '100%'}, 3000, 'linear');
        }, 100);
    }

    // ===== PARTNERS CAROUSEL =====
    $('.partners-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        nav: false,
        dots: false,
        smartSpeed: 600,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });

    // ===== SMOOTH SCROLL =====
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 80
            }, 1000, 'swing');
        }
    });

    // ===== STICKY NAVIGATION =====
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        
        if (scroll >= 100) {
            $('.main-navigation').addClass('sticky-nav');
        } else {
            $('.main-navigation').removeClass('sticky-nav');
        }
    });

    // ===== SCROLL TO TOP =====
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-to-top').addClass('show');
        } else {
            $('.scroll-to-top').removeClass('show');
        }
    });

    $('.scroll-to-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    // ===== MOBILE MENU TOGGLE =====
    $('#mobile-menu-btn').on('click', function() {
        $(this).toggleClass('active');
        $('.main-navigation').toggleClass('mobile-active');
    });

    // ===== CONSOLE LOG FOR DEBUGGING =====
    console.log('R CERAMICA - Aashi Inspired Theme Loaded Successfully!');
    console.log('All animations and interactions are ready.');

}); // End Document Ready

// ===== CATEGORY SECTIONS ANIMATIONS =====

// Initialize category animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for category animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const category = entry.target;
                
                // Add animation classes with delays
                setTimeout(() => {
                    const content = category.querySelector('.category-content');
                    if (content) content.classList.add('animate__animated', 'animate__fadeInLeft');
                }, 200);
                
                setTimeout(() => {
                    const showcase = category.querySelector('.category-product-showcase');
                    if (showcase) showcase.classList.add('animate__animated', 'animate__fadeInRight');
                }, 400);
                
                // Animate feature items one by one
                const featureItems = category.querySelectorAll('.feature-item');
                featureItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        item.style.transition = 'all 0.5s ease';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    }, 600 + (index * 150));
                });
            }
        });
    }, observerOptions);

    // Observe all category showcases
    document.querySelectorAll('.category-showcase').forEach(category => {
        categoryObserver.observe(category);
    });

    // Parallax effect for category backgrounds
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        document.querySelectorAll('.category-showcase').forEach(category => {
            const elementTop = category.offsetTop;
            const elementHeight = category.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Calculate if element is in viewport
            if (elementTop < scrollTop + windowHeight && elementTop + elementHeight > scrollTop) {
                const yPos = -(scrollTop - elementTop) * 0.5;
                const bgImage = category.querySelector('.category-bg-image');
                if (bgImage) {
                    bgImage.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    });

    // Category product hover effects
    document.querySelectorAll('.product-highlight').forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            const image = this.querySelector('.product-image');
            if (image) {
                image.classList.add('animate__animated', 'animate__pulse');
            }
        });
        
        highlight.addEventListener('mouseleave', function() {
            const image = this.querySelector('.product-image');
            if (image) {
                image.classList.remove('animate__animated', 'animate__pulse');
            }
        });
    });

    // Smooth scroll for category buttons
    document.querySelectorAll('.category-cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.classList.add('animate__animated', 'animate__heartBeat');
            
            setTimeout(() => {
                this.classList.remove('animate__animated', 'animate__heartBeat');
            }, 1000);
            
            // You can add navigation logic here
            console.log('Category button clicked:', this.querySelector('span').textContent);
        });
    });

    // Enhanced category badge animations
    document.querySelectorAll('.category-badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__rubberBand');
        });
        
        badge.addEventListener('mouseleave', function() {
            this.classList.remove('animate__animated', 'animate__rubberBand');
        });
    });

    // Category section intro animation
    const categoriesIntro = document.querySelector('.categories-intro');
    if (categoriesIntro) {
        const introObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const title = entry.target.querySelector('.section-title');
                    const subtitle = entry.target.querySelector('.section-subtitle');
                    
                    if (title) title.classList.add('animate__animated', 'animate__fadeInUp');
                    setTimeout(() => {
                        if (subtitle) subtitle.classList.add('animate__animated', 'animate__fadeInUp');
                    }, 300);
                }
            });
        }, { threshold: 0.1 });
        
        introObserver.observe(categoriesIntro);
    }
});

// ===== ADDITIONAL CSS FOR NOTIFICATIONS =====
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            min-width: 300px;
            max-width: 400px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: all 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .bounce {
            animation: bounce 0.6s ease;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
        
        .loading {
            opacity: 0.7;
            pointer-events: none;
            position: relative;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid #fff;
            border-top: 2px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `)
    .appendTo('head');