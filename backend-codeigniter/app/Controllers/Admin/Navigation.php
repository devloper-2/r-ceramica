<?php

namespace App\Controllers\Admin;

use App\Models\NavModel;

class Navigation extends BaseAdminController
{
    public function index(): string
    {
        $links = model(NavModel::class)->orderBy('sort_order', 'ASC')->findAll();

        return $this->render('navigation/index', ['links' => $links], 'navigation');
    }

    /**
     * Save the whole nav list. The form posts parallel arrays keyed by row.
     * Existing rows are updated, blank-label rows removed, and one optional
     * new row appended.
     */
    public function save()
    {
        $model = model(NavModel::class);

        $ids     = (array) $this->request->getPost('id');
        $labels  = (array) $this->request->getPost('label');
        $urls    = (array) $this->request->getPost('url');
        $orders  = (array) $this->request->getPost('sort_order');
        $actives = (array) $this->request->getPost('is_active'); // map rowIndex => "1"

        foreach ($ids as $i => $id) {
            $label = trim((string) ($labels[$i] ?? ''));
            $url   = trim((string) ($urls[$i] ?? ''));
            $id    = (int) $id;

            if ($label === '' || $url === '') {
                if ($id) {
                    $model->delete($id);
                }
                continue;
            }

            $data = [
                'label'      => $label,
                'url'        => $url,
                'sort_order' => (int) ($orders[$i] ?? 0),
                'is_active'  => isset($actives[$i]) ? 1 : 0,
            ];

            if ($id) {
                $model->update($id, $data);
            } else {
                $model->insert($data);
            }
        }

        $this->audit->log('navigation_update', 'nav_links', null);

        return redirect()->to('/admin/navigation')->with('success', 'Navigation saved.');
    }
}
