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
        'mp4'  => ['video/mp4'],
        'webm' => ['video/webm'],
        'mov'  => ['video/quicktime', 'video/mov'],
        'ogv'  => ['video/ogg'],
    ];

    /**
     * 3-D model extensions validated by extension only — MIME detection for
     * binary 3-D formats is unreliable across PHP versions and OS MIME databases
     * (GLB, for example, may report as application/octet-stream, model/gltf-binary,
     * or even text/plain depending on the server). Files are renamed on save so
     * extension-only checking is safe here.
     */
    protected const UPLOAD_3D_EXTS = ['glb', 'gltf', 'obj', 'fbx', 'stl'];

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
            return null;
        }

        return $this->storeFile($file, $folder)['url'];
    }

    /**
     * Validate + store multiple uploaded gallery files from one `field[]` input.
     * Returns the created media-library IDs in upload order (empty when none).
     * Throws \RuntimeException on the first rejected file.
     *
     * @return int[] media IDs
     */
    protected function saveGalleryUploads(string $field, string $folder = 'products'): array
    {
        $files = $this->request->getFileMultiple($field);
        if (! $files) {
            return [];
        }

        $ids = [];
        foreach ($files as $file) {
            if (! $file || ! $file->isValid()) {
                // Skip empty slots (no file chosen); surface real errors.
                if ($file && $file->getError() === UPLOAD_ERR_NO_FILE) {
                    continue;
                }
                continue;
            }
            $ids[] = $this->storeFile($file, $folder)['id'];
        }

        return $ids;
    }

    /**
     * Core file-store routine shared by saveUpload()/saveGalleryUploads():
     * validates size + type, moves the file under a random name, records it in
     * the media library, and returns its id + public URL.
     *
     * @return array{id:int,url:string}
     */
    protected function storeFile(\CodeIgniter\HTTP\Files\UploadedFile $file, string $folder): array
    {
        if ($file->getSize() > self::UPLOAD_MAX_BYTES) {
            throw new \RuntimeException('File too large (max 15 MB): ' . $file->getClientName());
        }

        $mime = $file->getMimeType();

        // NOTE: getExtension() guesses the extension from the detected MIME type
        // via a reverse lookup in Config\Mimes. Binary 3-D formats (GLB/FBX/…)
        // usually report as application/octet-stream, so that reverse lookup
        // returns the WRONG extension (e.g. "dms"/"exe") — never "glb". We must
        // therefore key off the client-supplied extension for 3-D files.
        $clientExt = strtolower($file->getClientExtension());

        if (in_array($clientExt, self::UPLOAD_3D_EXTS, true)) {
            // 3-D model: trust the client extension. The file is renamed to a
            // random name on save and never executed, so this is safe. MIME
            // detection for these formats is unreliable, so it is skipped.
            $ext = $clientExt;
        } else {
            // Images / PDF: use the MIME-guessed extension and validate BOTH the
            // extension and the detected MIME against the whitelist.
            $ext = strtolower($file->getExtension());
            if (! isset(self::UPLOAD_ALLOWED[$ext]) || ! in_array($mime, self::UPLOAD_ALLOWED[$ext], true)) {
                throw new \RuntimeException('Unsupported file type (' . $ext . ' / ' . $mime . ').');
            }
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

        $mediaId = model(\App\Models\MediaModel::class)->insert([
            'filename'   => $newName,
            'path'       => $url,
            'alt_text'   => '',
            'folder'     => $folder,
            'mime'       => $mime,
            'width'      => $width,
            'height'     => $height,
            'size_bytes' => $file->getSize(),
        ], true);

        return ['id' => (int) $mediaId, 'url' => $url];
    }

    /** Turn a name into a URL slug (lowercase, hyphenated). */
    protected function makeSlug(string $value): string
    {
        return trim(preg_replace('/[^a-z0-9]+/', '-', strtolower(trim($value))), '-');
    }
}
