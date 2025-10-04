/* ===== PRODUCTS PAGE JAVASCRIPT ===== */

$(document).ready(function() {
    'use strict';

    // ===== MOBILE MENU TOGGLE =====
    $('#mobile-menu-btn').on('click', function() {
        $('.main-nav').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.mobile-menu-toggle').length && !$(e.target).closest('.main-nav').length) {
            $('.main-nav').removeClass('active');
            $('#mobile-menu-btn').removeClass('active');
        }
    });

    // ===== CATEGORY FILTERING =====
    $('.category-list a').on('click', function(e) {
        e.preventDefault();

        // Remove active class from all items
        $('.category-item').removeClass('active');

        // Add active class to clicked item
        $(this).parent().addClass('active');

        // Get category from href
        var category = $(this).attr('href').substring(1);

        // Here you would filter products based on category
        // For now, we'll just scroll to top of products
        $('html, body').animate({
            scrollTop: $('.products-content').offset().top - 100
        }, 500);
    });

    // ===== COLLECTION FILTERING =====
    $('.collection-list a').on('click', function(e) {
        e.preventDefault();

        var collection = $(this).attr('href').substring(1);

        // Here you would filter products based on collection
        // For now, we'll just scroll to top of products
        $('html, body').animate({
            scrollTop: $('.products-content').offset().top - 100
        }, 500);
    });

    // ===== LOAD MORE FUNCTIONALITY =====
    $('.load-more-btn').on('click', function() {
        var $btn = $(this);
        var $grid = $('.products-grid');

        // Show loading state
        $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Loading...');

        // Simulate loading delay (replace with actual AJAX call)
        setTimeout(function() {
            // Add more products (in real implementation, this would come from AJAX)
            var newProducts = `
                <div class="product-item">
                    <div class="product-image">
                        <img src="images/TORO M-1004.jpg" alt="TORO M-1004" loading="lazy">
                        <div class="product-overlay">
                            <a href="#" class="view-product-btn">View Details</a>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">TORO M-1004</h3>
                        <p class="product-category">Premium Toilet</p>
                        <div class="product-meta">
                            <span class="collection">TORO Collection</span>
                        </div>
                    </div>
                </div>

                <div class="product-item">
                    <div class="product-image">
                        <img src="images/ARIS M-1106.jpg" alt="ARIS M-1106" loading="lazy">
                        <div class="product-overlay">
                            <a href="#" class="view-product-btn">View Details</a>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">ARIS M-1106</h3>
                        <p class="product-category">Modern Toilet</p>
                        <div class="product-meta">
                            <span class="collection">ARIS Collection</span>
                        </div>
                    </div>
                </div>

                <div class="product-item">
                    <div class="product-image">
                        <img src="images/LATRA M-1704.jpg" alt="LATRA M-1704" loading="lazy">
                        <div class="product-overlay">
                            <a href="#" class="view-product-btn">View Details</a>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">LATRA M-1704</h3>
                        <p class="product-category">Designer Toilet</p>
                        <div class="product-meta">
                            <span class="collection">LATRA Collection</span>
                        </div>
                    </div>
                </div>
            `;

            $grid.append(newProducts);

            // Reset button
            $btn.prop('disabled', false).html('<i class="fas fa-plus"></i> Load More Products');

            // Update product count
            var currentCount = $('.product-item').length;
            $('.products-count span').text('Showing 1-' + Math.min(currentCount, currentCount) + ' of 104 products');

        }, 1500);
    });

    // ===== PRODUCT HOVER EFFECTS =====
    $('.product-item').hover(
        function() {
            $(this).addClass('hovered');
        },
        function() {
            $(this).removeClass('hovered');
        }
    );

    // ===== SMOOTH SCROLLING =====
    $('a[href^="#"]').on('click', function(e) {
        var target = $(this).attr('href');
        if (target !== '#') {
            e.preventDefault();
            var $target = $(target);
            if ($target.length) {
                $('html, body').animate({
                    scrollTop: $target.offset().top - 80
                }, 500);
            }
        }
    });

    // ===== RESPONSIVE ADJUSTMENTS =====
    function handleResize() {
        var windowWidth = $(window).width();

        if (windowWidth <= 768) {
            // Mobile adjustments
            $('.products-sidebar').removeClass('sticky');
        } else {
            // Desktop adjustments
            $('.products-sidebar').addClass('sticky');
        }
    }

    // Initial check
    handleResize();

    // Check on resize
    $(window).on('resize', function() {
        handleResize();
    });

    // ===== LAZY LOADING ENHANCEMENT =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        // Observe all lazy images
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== ACCESSIBILITY IMPROVEMENTS =====
    // Keyboard navigation for mobile menu
    $('#mobile-menu-btn').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });

    // Focus management for mobile menu
    $('.main-nav a').on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('.main-nav').removeClass('active');
            $('#mobile-menu-btn').removeClass('active');
            $('#mobile-menu-btn').focus();
        }
    });
});