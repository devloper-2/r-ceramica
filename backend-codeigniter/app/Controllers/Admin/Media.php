<?php

namespace App\Controllers\Admin;

use App\Models\MediaModel;
use App\Models\ProductModel;

class Media extends BaseAdminController
{
    /** Allowed upload types: extension → accepted MIME types */
    private const ALLOWED = [
        'jpg'  => ['image/jpeg'],
        'jpeg' => ['image/jpeg'],
        'png'  => ['image/png'],
        'webp' => ['image/webp'],
        'avif' => ['image/avif'],
        'gif'  => ['image/gif'],
        'mp4'  => ['video/mp4'],
        'pdf'  => ['application/pdf'],
    ];
    private const MAX_BYTES = 15 * 1024 * 1024; // 15 MB

    /** Folder options shown in the upload form and filter tabs */
    public const FOLDERS = [
        'general'   => 'General',
        'hero'      => 'Hero Banners',
        'products'  => 'Products',
        'about'     => 'About',
        'bathroom'  => 'Bathrooms',
        'catalogue' => 'Catalogue',
        'other'     => 'Other',
    ];

    public function index(): string
    {
        $model  = model(MediaModel::class);
        $folder = $this->request->getGet('folder') ?? '';

        $builder = $model->orderBy('id', 'DESC');
        if ($folder && array_key_exists($folder, self::FOLDERS)) {
            $builder->where('folder', $folder);
        }
        $media = $builder->findAll();

        // Count per folder for the tab badges
        $counts = [];
        foreach (self::FOLDERS as $fk => $fl) {
            $counts[$fk] = $model->where('folder', $fk)->countAllResults();
        }
        $counts['all'] = $model->countAll();

        // Products list for the upload form (link media to a product)
        $products = model(ProductModel::class)
            ->select('id, name, slug')
            ->orderBy('name', 'ASC')
            ->findAll();

        return $this->render('media/index', [
            'media'          => $media,
            'folders'        => self::FOLDERS,
            'activeFolder'   => $folder,
            'folderCounts'   => $counts,
            'products'       => $products,
        ], 'media');
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

        $ext  = strtolower($file->getExtension());
        $mime = $file->getMimeType();
        if (! isset(self::ALLOWED[$ext]) || ! in_array($mime, self::ALLOWED[$ext], true)) {
            return redirect()->to('/admin/media')
                ->with('error', 'Unsupported file type (' . esc($ext) . ' / ' . esc($mime) . ').');
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

        $folder    = $this->request->getPost('folder') ?? 'general';
        $folder    = array_key_exists($folder, self::FOLDERS) ? $folder : 'general';
        $productId = (int) $this->request->getPost('product_id') ?: null;

        $id = model(MediaModel::class)->insert([
            'filename'   => $newName,
            'path'       => base_url('uploads/' . $newName),
            'alt_text'   => (string) $this->request->getPost('alt_text'),
            'folder'     => $folder,
            'product_id' => $productId,
            'mime'       => $mime,
            'width'      => $width,
            'height'     => $height,
            'size_bytes' => $file->getSize(),
        ], true);

        $this->audit->log('media_upload', 'media', (int) $id);

        $back = '/admin/media' . ($folder !== 'general' ? '?folder=' . $folder : '');
        return redirect()->to($back)->with('success', 'File uploaded successfully.');
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

        $back = '/admin/media' . ($this->request->getPost('folder') ? '?folder=' . $this->request->getPost('folder') : '');
        return redirect()->to($back)->with('success', 'File deleted.');
    }
}
