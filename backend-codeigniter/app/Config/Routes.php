<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

/*
 * ---------------------------------------------------------------------------
 * Public read-only content API  (/api/v1/*)
 * ---------------------------------------------------------------------------
 * Consumed by the Next.js build (server-to-server) and by the storefront for
 * commerce reads. Guarded by the `apikey` filter (X-API-Key header).
 */
$routes->group('api/v1', ['filter' => 'apikey', 'namespace' => 'App\Controllers\Api'], static function ($routes) {
    $routes->get('pages', 'Pages::index');
    $routes->get('pages/(:segment)', 'Pages::show/$1');

    $routes->get('products', 'Products::index');
    $routes->get('products/(:segment)', 'Products::show/$1');

    $routes->get('categories', 'Categories::index');
    $routes->get('categories/(:segment)', 'Categories::show/$1');

    $routes->get('subcategories/(:segment)', 'Subcategories::show/$1');

    $routes->get('catalogues', 'Catalogues::index');

    $routes->get('navigation', 'Navigation::index');
    $routes->get('settings', 'Settings::index');
});

/*
 * ---------------------------------------------------------------------------
 * Storefront commerce API (/api/v1/checkout/*) — browser-facing, public
 * ---------------------------------------------------------------------------
 * No API key (the browser has none). Safe because pricing is server-side and
 * payment authenticity is proven by the Razorpay signature. CORS-guarded.
 */
$routes->group('api/v1/checkout', ['filter' => 'storecors', 'namespace' => 'App\Controllers\Api'], static function ($routes) {
    $routes->options('order', 'Checkout::order');   // CORS preflight
    $routes->options('verify', 'Checkout::verify');
    $routes->post('order', 'Checkout::order');
    $routes->post('verify', 'Checkout::verify');
});

/*
 * ---------------------------------------------------------------------------
 * Storefront customer auth (/api/v1/auth/*) — browser-facing, public
 * ---------------------------------------------------------------------------
 * Mobile+password and Google login. Returns a signed bearer token. CORS-guarded;
 * `me` additionally requires a valid token (customerauth).
 */
$routes->group('api/v1/auth', ['filter' => 'storecors', 'namespace' => 'App\Controllers\Api'], static function ($routes) {
    $routes->options('(:any)', static fn () => service('response')->setStatusCode(204)); // preflight
    $routes->post('register', 'Auth::register');
    $routes->post('login', 'Auth::login');
    $routes->post('google', 'Auth::google');
    $routes->get('me', 'Auth::me', ['filter' => 'customerauth']);
});

/*
 * ---------------------------------------------------------------------------
 * Storefront order history (/api/v1/orders/*) — browser-facing, token-guarded
 * ---------------------------------------------------------------------------
 */
$routes->group('api/v1/orders', ['filter' => 'storecors', 'namespace' => 'App\Controllers\Api'], static function ($routes) {
    // Preflight: the list request (GET /orders with an Authorization header)
    // preflights the bare group root, so an OPTIONS handler is needed there too.
    $routes->options('/', static fn () => service('response')->setStatusCode(204));
    $routes->options('(:any)', static fn () => service('response')->setStatusCode(204));
    $routes->get('/', 'Orders::index', ['filter' => 'customerauth']);
    $routes->get('(:segment)', 'Orders::show/$1', ['filter' => 'customerauth']);
});

/*
 * ---------------------------------------------------------------------------
 * Admin panel  (/admin/*)  — PHP-session, server-rendered
 * ---------------------------------------------------------------------------
 */
// Public auth routes (no adminauth gate; CSRF still applies to the POST).
$routes->get('admin/login', 'Admin\Auth::login');
$routes->post('admin/authenticate', 'Admin\Auth::attempt');
$routes->get('admin/logout', 'Admin\Auth::logout');

// Everything else requires an authenticated admin.
$routes->group('admin', ['filter' => 'adminauth', 'namespace' => 'App\Controllers\Admin'], static function ($routes) {
    $routes->get('/', 'Dashboard::index');

    // Pages & sections
    $routes->get('pages', 'Pages::index');
    $routes->get('pages/(:num)', 'Pages::edit/$1');
    $routes->post('pages/(:num)', 'Pages::update/$1');
    $routes->post('pages/(:num)/sections/(:num)', 'Pages::updateSection/$1/$2');

    // Products
    $routes->get('products', 'Products::index');
    $routes->get('products/new', 'Products::create');
    $routes->post('products', 'Products::store');
    $routes->get('products/(:num)', 'Products::edit/$1');
    $routes->post('products/(:num)', 'Products::update/$1');
    $routes->post('products/(:num)/delete', 'Products::delete/$1');

    // Categories (rich editor + subcategory management)
    $routes->get('categories', 'Categories::index');
    $routes->post('categories', 'Categories::store');
    $routes->get('categories/(:num)', 'Categories::edit/$1');
    $routes->post('categories/(:num)', 'Categories::update/$1');
    $routes->post('categories/(:num)/delete', 'Categories::delete/$1');
    $routes->post('categories/(:num)/subcategories', 'Categories::storeSub/$1');
    $routes->post('categories/(:num)/subcategories/(:num)', 'Categories::updateSub/$1/$2');
    $routes->post('categories/(:num)/subcategories/(:num)/delete', 'Categories::deleteSub/$1/$2');

    // Catalogue (CMS-driven /catalogue page)
    $routes->get('catalogue', 'Catalogue::index');
    $routes->get('catalogue/new', 'Catalogue::create');
    $routes->post('catalogue', 'Catalogue::store');
    $routes->get('catalogue/(:num)', 'Catalogue::edit/$1');
    $routes->post('catalogue/(:num)', 'Catalogue::update/$1');
    $routes->post('catalogue/(:num)/delete', 'Catalogue::delete/$1');

    // Navigation is now system-fixed (menu defined in the frontend, not editable).

    // Media upload/delete still used internally by product/category forms
    $routes->post('media/upload', 'Media::upload');
    $routes->post('media/(:num)/delete', 'Media::delete/$1');

    // JSON image upload for AJAX (section editor, etc.)
    $routes->post('upload-image', 'Pages::uploadImage');

    // Settings
    $routes->get('settings', 'Settings::index');
    $routes->post('settings', 'Settings::save');

    // Orders
    $routes->get('orders', 'Orders::index');
    $routes->get('orders/(:num)', 'Orders::show/$1');
    $routes->post('orders/(:num)/status', 'Orders::updateStatus/$1');

    // Publish → trigger the static rebuild pipeline (Phase 8)
    $routes->post('publish', 'Publish::trigger');
});
