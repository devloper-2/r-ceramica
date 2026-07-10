<?php

/*
 * PRODUCTION front controller for Hostinger.
 *
 * Upload this file into  public_html/admin/  (the admin.rceramica.com docroot).
 * The rest of the CodeIgniter app (app/, vendor/, writable/, .env) lives in a
 * SIBLING folder ABOVE the web root:  ../../ci4-app/
 *
 *   /home/u715248258/domains/rceramica.com/
 *   ├── public_html/admin/   ← this index.php + .htaccess + uploads/
 *   └── ci4-app/             ← app/  vendor/  writable/  .env
 *
 * Only the require line below differs from the default CI4 index.php.
 */

use CodeIgniter\Boot;
use Config\Paths;

$minPhpVersion = '8.2';
if (version_compare(PHP_VERSION, $minPhpVersion, '<')) {
    header('HTTP/1.1 503 Service Unavailable.', true, 503);
    echo sprintf('Your PHP version must be %s or higher. Current: %s', $minPhpVersion, PHP_VERSION);
    exit(1);
}

define('FCPATH', __DIR__ . DIRECTORY_SEPARATOR);
if (getcwd() . DIRECTORY_SEPARATOR !== FCPATH) {
    chdir(FCPATH);
}

// ▼▼▼ THE ONLY CHANGED LINE — points up to the app folder above the web root ▼▼▼
require FCPATH . '../../ci4-app/app/Config/Paths.php';
// ▲▲▲ If your ci4-app folder is elsewhere, adjust this relative path ▲▲▲

$paths = new Paths();

require $paths->systemDirectory . '/Boot.php';

exit(Boot::bootWeb($paths));
