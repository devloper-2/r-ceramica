<?php

namespace App\Controllers\Admin;

use App\Models\MediaModel;

class Media extends BaseAdminController
{
    /** Whitelisted upload types (extension => real MIME). */
    private const ALLOWED = [
        'jpg'  => ['image/jpeg'],
        'jpeg' => ['image/jpeg'],
        'png'  => ['image/png'],
        'webp' => ['image/webp'],
        'avif' => ['image/avif'],
        'gif'  => ['image/gif'],
        'mp4'  => ['video/mp4'],
    ];
    private const MAX_BYTES = 15 * 1024 * 1024; // 15 MB

    public function index(): string
    {
        $media = model(MediaModel::class)->orderBy('id', 'DESC')->findAll();

        return $this->render('media/index', ['media' => $media], 'media');
    }

    public function upload()
    {
        $file = $this->request->getFile('file');

        if (! $file || ! $file->isValid()) {
            return redirect()->to('/admin/media')->with('error', 'No valid file uploaded.');
        }

        if ($file->getSize() > self::MAX_BYTES) {
            return redirect()->to('/admin/media')->with('error', 'File too large (max 15 MB).');
        }

        // Extension + real MIME must both be whitelisted and must agree.
        $ext  = strtolower($file->getExtension());
        $mime = $file->getMimeType();
        if (! isset(self::ALLOWED[$ext]) || ! in_array($mime, self::ALLOWED[$ext], true)) {
            return redirect()->to('/admin/media')
                ->with('error', 'Unsupported or mismatched file type (' . esc($ext) . ' / ' . esc($mime) . ').');
        }

        // Store under public/uploads with a random, safe name (never the user's).
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

        $id = model(MediaModel::class)->insert([
            'filename'   => $newName,
            'path'       => base_url('uploads/' . $newName),
            'alt_text'   => (string) $this->request->getPost('alt_text'),
            'mime'       => $mime,
            'width'      => $width,
            'height'     => $height,
            'size_bytes' => $file->getSize(),
        ], true);

        $this->audit->log('media_upload', 'media', (int) $id);

        return redirect()->to('/admin/media')->with('success', 'File uploaded.');
    }

    public function delete(int $id)
    {
        $model = model(MediaModel::class);
        $row   = $model->find($id);
        if ($row) {
            $path = FCPATH . 'uploads' . DIRECTORY_SEPARATOR . $row['filename'];
            if (is_file($path)) {
                @unlink($path);
            }
            $model->delete($id);
            $this->audit->log('media_delete', 'media', $id);
        }

        return redirect()->to('/admin/media')->with('success', 'File deleted.');
    }
}
