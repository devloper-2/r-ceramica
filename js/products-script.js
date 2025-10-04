/* ===== PRODUCTS PAGE JAVASCRIPT ===== */

$(document).ready(function() {
    'use strict';

    // Global variables
    let currentProducts = [];
    let currentFilter = 'all-basins';
    let currentPage = 1;
    const productsPerPage = 12;

    // Get category from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Determine initial filter and category based on URL parameter
    let initialFilter = 'all-basins';
    let initialCategory = 'basins';
    
    if (categoryParam) {
        switch(categoryParam.toLowerCase()) {
            case 'toilets':
                initialFilter = 'all-toilets';
                initialCategory = 'toilets';
                break;
            case 'faucets':
                initialFilter = 'all-fusion';
                initialCategory = 'faucets';
                break;
            case 'manhole':
                initialFilter = 'all-manhole';
                initialCategory = 'manhole';
                break;
            case 'basins':
            default:
                initialFilter = 'all-basins';
                initialCategory = 'basins';
                break;
        }
    }

    // Initialize page with the correct category
    loadProducts(initialFilter, initialCategory);
    
    // Set the correct accordion state based on URL parameter
    if (categoryParam) {
        // Close all accordions first
        $('.accordion-collapse').removeClass('show');
        $('.accordion-button').addClass('collapsed').attr('aria-expanded', 'false');
        
        // Open the correct accordion
        switch(categoryParam.toLowerCase()) {
            case 'toilets':
                $('#toiletsCollapse').addClass('show');
                $('#toiletsCollapse').prev().find('.accordion-button').removeClass('collapsed').attr('aria-expanded', 'true');
                break;
            case 'faucets':
                $('#fusionCollapse').addClass('show');
                $('#fusionCollapse').prev().find('.accordion-button').removeClass('collapsed').attr('aria-expanded', 'true');
                break;
            case 'manhole':
                // Manhole doesn't have an accordion, just highlight it
                $('.category-link[href="#all-manhole"]').addClass('active');
                break;
            case 'basins':
            default:
                $('#basinsCollapse').addClass('show');
                $('#basinsCollapse').prev().find('.accordion-button').removeClass('collapsed').attr('aria-expanded', 'true');
                break;
        }
        
        // Update active link in sidebar
        $('.subcategory-list a, .category-link').removeClass('active');
        $('.subcategory-list a[href="#' + initialFilter + '"], .category-link[href="#' + initialFilter + '"]').addClass('active');
    }

    // ===== PRODUCT LOADING FUNCTIONS =====
    function loadProducts(filter, category = '') {
        currentFilter = filter;
        currentPage = 1;
        
        // Update download button based on category
        updateDownloadButton(category || getCategoryFromFilter(filter));
        
        // Get products based on filter
        switch(filter) {
            case 'all-basins':
                currentProducts = getAllWashBasins();
                break;
            case 'table-top-basin':
                currentProducts = getProductsByType('washBasins', 'Table Top Basin');
                break;
            case 'wall-hung-basin':
                currentProducts = getProductsByType('washBasins', 'Wall Hung Basin');
                break;
            case 'counter-basin':
                currentProducts = getProductsByType('washBasins', 'Counter Basin');
                break;
            case 'full-pedestal-basin':
                currentProducts = getProductsByType('washBasins', 'Full Pedestal Basin');
                break;
            case 'half-pedestal-basin':
                currentProducts = getProductsByType('washBasins', 'Half Pedestal Basin');
                break;
            case 'under-counter-basin':
                currentProducts = getProductsByType('washBasins', 'Under Counter Basin');
                break;
            case 'corner-basin':
                currentProducts = getProductsByType('washBasins', 'Corner Basin');
                break;
            case 'one-piece-basin':
                currentProducts = getProductsByType('washBasins', 'One Piece Basin');
                break;
            case 'art-basin':
                currentProducts = getProductsByType('washBasins', 'Art Basin');
                break;
            case 'bowl-basin':
                currentProducts = getProductsByType('washBasins', 'Bowl Basin');
                break;
            case 'cabinet-basin':
                currentProducts = getProductsByType('washBasins', 'Cabinet Basin');
                break;
            case 'counter-top-basin':
                currentProducts = getProductsByType('washBasins', 'Counter Top Basin');
                break;
            case 'wall-mounted-basin':
                currentProducts = getProductsByType('washBasins', 'Wall Mounted Basin');
                break;
            case 'designer-basin':
                currentProducts = getProductsByType('washBasins', 'Designer Basin');
                break;
            case 'all-fusion':
                currentProducts = getAllFusionTaps();
                break;
            case 'rivo-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'rivo');
                break;
            case 'curve-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'curve');
                break;
            case 'eva-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'eva');
                break;
            case 'roma-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'roma');
                break;
            case 'artiz-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'artiz');
                break;
            case 'metro-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'metro');
                break;
            case 'iris-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'iris');
                break;
            case 'cadiz-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'cadiz');
                break;
            case 'amaze-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'amaze');
                break;
            case 'rossa-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'rossa');
                break;
            case 'punch-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'punch');
                break;
            case 'jazz-collection':
                currentProducts = getProductsByCollection('fusionTiles', 'jazz');
                break;
            case 'corner-basin':
                currentProducts = getProductsByType('fusionTiles', 'Corner Basin');
                break;
            case 'one-piece-basin':
                currentProducts = getProductsByType('fusionTiles', 'One Piece Basin');
                break;
            case 'art-basin':
                currentProducts = getProductsByType('fusionTiles', 'Art Basin');
                break;
            case 'bowl-basin':
                currentProducts = getProductsByType('fusionTiles', 'Bowl Basin');
                break;
            case 'cabinet-basin':
                currentProducts = getProductsByType('fusionTiles', 'Cabinet Basin');
                break;
            case 'counter-top-basin':
                currentProducts = getProductsByType('fusionTiles', 'Counter Top Basin');
                break;
            case 'wall-mounted-basin':
                currentProducts = getProductsByType('fusionTiles', 'Wall Mounted Basin');
                break;
            case 'designer-basin':
                currentProducts = getProductsByType('fusionTiles', 'Designer Basin');
                break;
            case 'all-toilets':
                currentProducts = getProductsByCollection('toilets', 'basic');
                break;
            case 'table-top':
                currentProducts = getProductsByType('toilets', 'TABLE TOP');
                break;
            case 'one-piece-basin':
                currentProducts = getProductsByType('toilets', 'ONE PIECE BASIN');
                break;
            case 'wash-basin-pedestal':
                currentProducts = getProductsByType('toilets', 'WASH BASIN PEDESTAL');
                break;
            case 'wash-basin':
                currentProducts = getProductsByType('toilets', 'WASH BASIN');
                break;
            case 'counter-basin':
                currentProducts = getProductsByType('toilets', 'COUNTER BASIN');
                break;
            case 'designer-table-top':
                currentProducts = getProductsByType('toilets', 'DESIGNER TABLE TOP');
                break;
            case 'all-manhole':
                currentProducts = getAllManholeCovers();
                break;
            default:
                currentProducts = getAllWashBasins();
        }

        displayProducts();
        updateProductCount();
    }

    function updateDownloadButton(category) {
        let pdfPath = 'pdf/R CERAMICA CP.pdf'; // Default catalog
        
        // Determine PDF based on category
        if (category === 'manhole') {
            pdfPath = 'pdf/manhole.pdf';
        } else if (category === 'toilets') {
            pdfPath = 'pdf/toilets.pdf';
        } else if (category === 'faucets') {
            pdfPath = 'pdf/faucets.pdf';
        } else if (category === 'basins') {
            pdfPath = 'pdf/wash-besin.pdf';
        }
        
        // Update both download buttons
        $('.download-btn').attr('href', pdfPath);
    }

    function getCategoryFromFilter(filter) {
        if (filter === 'all-manhole') return 'manhole';
        if (filter.startsWith('all-toilets') || ['table-top', 'wash-basin-pedestal', 'wash-basin', 'counter-basin', 'designer-table-top'].includes(filter)) return 'toilets';
        if (filter.startsWith('all-fusion') || ['rivo-collection', 'curve-collection', 'eva-collection', 'roma-collection', 'artiz-collection', 'metro-collection', 'iris-collection', 'cadiz-collection', 'amaze-collection', 'rossa-collection', 'punch-collection', 'jazz-collection'].includes(filter)) return 'faucets';
        if (filter.startsWith('all-basins') || ['table-top-basin', 'wall-hung-basin', 'counter-basin', 'full-pedestal-basin', 'half-pedestal-basin', 'under-counter-basin', 'corner-basin', 'art-basin', 'bowl-basin', 'cabinet-basin', 'counter-top-basin', 'wall-mounted-basin', 'designer-basin'].includes(filter)) return 'basins';
        // Handle duplicate filters
        if (filter === 'one-piece-basin') {
            // This could be basins or toilets, default to basins
            return 'basins';
        }
        return '';
    }

    function getAllWashBasins() {
        let allBasins = [];
        const collections = ['toro', 'aris', 'beetle', 'latra', 'lava', 'levis', 'strom'];
        collections.forEach(collection => {
            allBasins = allBasins.concat(getProductsByCollection('washBasins', collection));
        });
        return allBasins;
    }

    function getAllFusionTaps() {
        let allTaps = [];
        const collections = ['cadiz', 'rivo', 'rossa', 'curve', 'eva', 'roma', 'artiz', 'metro', 'iris', 'amaze', 'punch', 'jazz'];
        collections.forEach(collection => {
            allTaps = allTaps.concat(getProductsByCollection('fusionTiles', collection));
        });
        return allTaps;
    }

    function getAllManholeCovers() {
        let allCovers = [];
        const collections = ['frp', 'ceramic'];
        collections.forEach(collection => {
            allCovers = allCovers.concat(getProductsByCollection('manholeCovers', collection));
        });
        return allCovers;
    }

    function displayProducts() {
        const $grid = $('#productsGrid');
        
        // Only clear grid if it's a new category/filter, not for load more
        if (currentPage === 1) {
            $grid.empty();
        }

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = currentProducts.slice(startIndex, endIndex);

        productsToShow.forEach((product, index) => {
            const productHtml = createProductHTML(product);
            const $productElement = $(productHtml);
            
            // Add staggered animation delay for load more
            if (currentPage > 1) {
                $productElement.css('animation-delay', `${index * 0.1}s`);
            }
            
            $grid.append($productElement);
        });

        // Force grid recalculation after adding new products
        $grid[0].offsetHeight; // Trigger reflow
        
        // Update load more button visibility
        const $loadMoreBtn = $('#loadMoreBtn');
        if (currentPage * productsPerPage >= currentProducts.length) {
            $loadMoreBtn.hide();
        } else {
            $loadMoreBtn.show();
        }

        // Add product hover effects
        addProductHoverEffects();
    }

    function createProductHTML(product) {
        const collectionName = getCollectionName(product.code);
        return `
            <div class="product-item" data-code="${product.code}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-category">${product.type}</p>
                    <div class="product-meta">
                        <span class="collection">${product.type}</span>
                    </div>
                </div>
            </div>
        `;
    }

    function getCollectionName(code) {
        if (code.startsWith('TORO')) return 'TORO Collection';
        if (code.startsWith('ARIS')) return 'ARIS Collection';
        if (code.startsWith('BEETLE')) return 'BEETLE Collection';
        if (code.startsWith('LATRA')) return 'LATRA Collection';
        if (code.startsWith('LAVA')) return 'LAVA Collection';
        if (code.startsWith('LEVIS')) return 'LEVIS Collection';
        if (code.startsWith('STROM')) return 'STROM Collection';
        if (code.startsWith('CA')) return 'Cadiz Series';
        if (code.startsWith('RI')) return 'Rivo Series';
        if (code.startsWith('RS')) return 'Rossa Series';
        return 'R CERAMICA';
    }

    function updateProductCount() {
        const showing = Math.min(currentPage * productsPerPage, currentProducts.length);
        $('.products-count span').text(`Showing 1-${showing} of ${currentProducts.length} products`);
    }

    function addProductHoverEffects() {
        $('.product-item').hover(
            function() {
                $(this).addClass('hovered');
            },
            function() {
                $(this).removeClass('hovered');
            }
        );
    }

    // ===== EVENT HANDLERS =====

    // ===== ACCORDION CATEGORY HANDLING =====
    $('.accordion-button').on('click', function(e) {
        // Let Bootstrap handle the accordion toggle
    });

    // ===== SUBCATEGORY FILTERING =====
    $('.subcategory-list a').on('click', function(e) {
        e.preventDefault();

        // Remove active class from all subcategory links
        $('.subcategory-list a').removeClass('active');

        // Add active class to clicked subcategory
        $(this).addClass('active');

        // Get subcategory from href
        var subcategory = $(this).attr('href').substring(1);

        // Determine category from accordion parent
        var category = '';
        var $accordion = $(this).closest('.accordion-item');
        if ($accordion.find('.accordion-header .accordion-button').text().includes('Wash Basins')) {
            category = 'basins';
        } else if ($accordion.find('.accordion-header .accordion-button').text().includes('Faucets & Taps')) {
            category = 'faucets';
        } else if ($accordion.find('.accordion-header .accordion-button').text().includes('Toilets')) {
            category = 'toilets';
        }

        // Load products for this subcategory with category context
        loadProducts(subcategory, category);

        // Scroll to products
        $('html, body').animate({
            scrollTop: $('.products-content').offset().top - 100
        }, 500);

        console.log('Filtering by subcategory:', subcategory);
    });

    // ===== CATEGORY LINK FILTERING =====
    $('.category-link').on('click', function(e) {
        e.preventDefault();

        // Remove active class from all subcategory links
        $('.subcategory-list a').removeClass('active');

        // Get category from href
        var categoryHref = $(this).attr('href').substring(1);
        var category = categoryHref === 'all-manhole' ? 'manhole' : '';

        // Load products for this category
        loadProducts(categoryHref, category);

        // Scroll to products
        $('html, body').animate({
            scrollTop: $('.products-content').offset().top - 100
        }, 500);

        console.log('Filtering by category:', categoryHref);
    });

    // ===== MOBILE FILTER TOGGLE =====
    $(document).on('click', '.filter-toggle-btn', function() {
        var $sidebar = $('.products-sidebar');
        var $btn = $(this);
        var $toggleContainer = $('.mobile-filter-toggle');

        if ($(window).width() > 768) {
            return;
        }

        var isOpen = $sidebar.hasClass('mobile-show');

        if (isOpen) {
            $sidebar.removeClass('mobile-show');
            $btn.attr({'aria-label': 'Show filters', 'aria-expanded': 'false'});
            $btn.html('<i class="fas fa-filter"></i>');
            $toggleContainer.css('margin-bottom', '18px');
        } else {
            if (!$sidebar.parent().is($toggleContainer)) {
                $toggleContainer.append($sidebar);
            }

            $sidebar.addClass('mobile-show');
            $btn.attr({'aria-label': 'Hide filters', 'aria-expanded': 'true'});
            $btn.html('<i class="fas fa-times"></i>');

            var sidebarHeight = $sidebar.outerHeight(true) || 0;
            $toggleContainer.css('margin-bottom', (18 + sidebarHeight) + 'px');
        }
    });

    // ===== LOAD MORE FUNCTIONALITY =====
    $('#loadMoreBtn').on('click', function(e) {
        e.preventDefault();
        const $btn = $(this);
        
        // Disable button and show loading
        $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Loading...');
        
        setTimeout(() => {
            currentPage++;
            displayProducts();
            
            // Wait for images to load before resetting button
            const $newImages = $('.product-item img').slice(-productsPerPage);
            let loadedCount = 0;
            const totalImages = $newImages.length;
            
            if (totalImages === 0) {
                // No images to load, reset button immediately
                $btn.prop('disabled', false).html('<i class="fas fa-plus"></i> Load More Products');
                return;
            }
            
            $newImages.each(function() {
                if (this.complete) {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        $btn.prop('disabled', false).html('<i class="fas fa-plus"></i> Load More Products');
                    }
                } else {
                    $(this).on('load error', function() {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            $btn.prop('disabled', false).html('<i class="fas fa-plus"></i> Load More Products');
                        }
                    });
                }
            });
            
            // Fallback: reset button after 3 seconds max
            setTimeout(() => {
                $btn.prop('disabled', false).html('<i class="fas fa-plus"></i> Load More Products');
            }, 3000);
            
        }, 500);
    });

    // ===== SMOOTH SCROLLING =====
    $('a[href^="#"]').on('click', function(e) {
        var target = $(this).attr('href');
        if (target !== '#' && target !== '#!') {
            e.preventDefault();
            var $target = $(target);
            if ($target.length) {
                $('html, body').animate({
                    scrollTop: $target.offset().top - 80
                }, 500);
            }
        }
    });

    // ===== MOBILE FILTER TOGGLE =====
    // ===== RESPONSIVE HANDLING =====
    $(window).on('resize', function() {
        // Handle responsive changes
        if ($(window).width() > 768) {
            var $sidebar = $('.products-sidebar');
            var $layout = $('.products-layout');
            var $toggleContainer = $('.mobile-filter-toggle');

            if (!$sidebar.parent().is($layout)) {
                $sidebar.prependTo($layout);
            }

            $sidebar.removeClass('mobile-show');
            $toggleContainer.css('margin-bottom', '0');
            $('.filter-toggle-btn')
                .attr({'aria-label': 'Show filters', 'aria-expanded': 'false'})
                .html('<i class="fas fa-filter"></i>');
        }
    });

});