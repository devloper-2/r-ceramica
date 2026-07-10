<?php

namespace App\Controllers\Admin;

use App\Models\SettingModel;

class Settings extends BaseAdminController
{
    public function index(): string
    {
        $rows = model(SettingModel::class)->orderBy('key', 'ASC')->findAll();
        foreach ($rows as &$r) {
            $r['value_pretty'] = json_encode($r['value'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        }

        return $this->render('settings/index', ['settings' => $rows], 'settings');
    }

    public function save()
    {
        $model = model(SettingModel::class);
        $key   = (string) $this->request->getPost('key');
        $raw   = (string) $this->request->getPost('value');

        $row = $model->where('key', $key)->first();
        if (! $row) {
            return redirect()->to('/admin/settings')->with('error', 'Unknown setting.');
        }

        $decoded = json_decode($raw, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return redirect()->to('/admin/settings')->with('error', 'Setting "' . $key . '" not saved — invalid JSON: ' . json_last_error_msg());
        }

        $model->put($key, $decoded);
        $this->audit->log('setting_update', 'settings', (int) $row['id']);

        return redirect()->to('/admin/settings')->with('success', 'Setting "' . $key . '" saved.');
    }
}
