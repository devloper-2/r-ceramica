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

    // Categories
    $routes->get('categories', 'Categories::index');
    $routes->post('categories', 'Categories::store');
    $routes->post('categories/(:num)', 'Categories::update/$1');
    $routes->post('categories/(:num)/delete', 'Categories::delete/$1');

    // Navigation
    $routes->get('navigation', 'Navigation::index');
    $routes->post('navigation', 'Navigation::save');

    // Media
    $routes->get('media', 'Media::index');
    $routes->post('media/upload', 'Media::upload');
    $routes->post('media/(:num)/delete', 'Media::delete/$1');

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
