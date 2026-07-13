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

    /** Allowed upload types: extension → accepted MIME types. */
    protected const UPLOAD_ALLOWED = [
        'jpg'  => ['image/jpeg'],
        'jpeg' => ['image/jpeg'],
        'png'  => ['image/png'],
        'webp' => ['image/webp'],
        'avif' => ['image/avif'],
        'gif'  => ['image/gif'],
        'pdf'  => ['application/pdf'],
    ];
    protected const UPLOAD_MAX_BYTES = 15 * 1024 * 1024; // 15 MB

    /**
     * Validate + store an uploaded file (image or PDF) using the same hardened
     * rules as Admin\Media (ext+MIME whitelist, random name, size cap). Also
     * records it in the media library. Returns the public URL, or null when no
     * file was submitted. Throws \RuntimeException on a rejected upload so the
     * caller can flash the message and keep the existing value.
     *
     * @param string $field  the multipart form field name
     * @param string $folder media library folder tag
     */
    protected function saveUpload(string $field, string $folder = 'general'): ?string
    {
        $file = $this->request->getFile($field);
        if (! $file || ! $file->isValid()) {
            // "no file chosen" reports error 4 (UPLOAD_ERR_NO_FILE) — treat as absent.
            if ($file && $file->getError() === UPLOAD_ERR_NO_FILE) {
                return null;
            }

            return null;
        }
        if ($file->getSize() > self::UPLOAD_MAX_BYTES) {
            throw new \RuntimeException('File too large (max 15 MB).');
        }

        $ext  = strtolower($file->getExtension());
        $mime = $file->getMimeType();
        if (! isset(self::UPLOAD_ALLOWED[$ext]) || ! in_array($mime, self::UPLOAD_ALLOWED[$ext], true)) {
            throw new \RuntimeException('Unsupported file type (' . $ext . ' / ' . $mime . ').');
        }

        $dir = FCPATH . 'uploads';
        if (! is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        $newName = bin2hex(random_bytes(16)) . '.' . $ext;
        $file->move($dir, $newName);

        $width = $height = null;
        if (str_starts_with($mime, 'image/') && $mime !== 'image/avif') {
            $info = @getimagesize($dir . DIRECTORY_SEPARATOR . $newName);
            if ($info) {
                [$width, $height] = $info;
            }
        }

        $url = base_url('uploads/' . $newName);

        model(\App\Models\MediaModel::class)->insert([
            'filename'   => $newName,
            'path'       => $url,
            'alt_text'   => '',
            'folder'     => $folder,
            'mime'       => $mime,
            'width'      => $width,
            'height'     => $height,
            'size_bytes' => $file->getSize(),
        ]);

        return $url;
    }

    /** Turn a name into a URL slug (lowercase, hyphenated). */
    protected function makeSlug(string $value): string
    {
        return trim(preg_replace('/[^a-z0-9]+/', '-', strtolower(trim($value))), '-');
    }
}
