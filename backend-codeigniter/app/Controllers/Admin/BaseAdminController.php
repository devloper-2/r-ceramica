<?php

namespace App\Controllers\Admin;

use App\Libraries\Audit;
use CodeIgniter\Controller;

/**
 * Base for all /admin controllers. Provides the current admin, an audit
 * helper, and a small view() wrapper that injects shared layout data.
 */
abstract class BaseAdminController extends Controller
{
    protected Audit $audit;

    public function initController($request, $response, $logger)
    {
        parent::initController($request, $response, $logger);
        $this->audit = new Audit();
        helper(['form', 'url', 'text']);
    }

    protected function currentAdmin(): array
    {
        return [
            'id'    => session()->get('admin_id'),
            'name'  => session()->get('admin_name'),
            'email' => session()->get('admin_email'),
            'role'  => session()->get('admin_role'),
        ];
    }

    protected function render(string $view, array $data = [], string $active = ''): string
    {
        $data['admin']  = $this->currentAdmin();
        $data['active'] = $active;

        return view('admin/' . $view, $data);
    }
}
