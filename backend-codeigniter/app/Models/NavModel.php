<?php

namespace App\Models;

use CodeIgniter\Model;

class NavModel extends Model
{
    protected $table         = 'nav_links';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;
    protected $allowedFields = ['label', 'url', 'parent_id', 'sort_order', 'is_active'];

    /** Active links as a nested tree (parents with a `children` array). */
    public function tree(): array
    {
        $rows = $this->where('is_active', 1)->orderBy('sort_order', 'ASC')->findAll();

        $byId = [];
        foreach ($rows as $row) {
            $row['children'] = [];
            $byId[$row['id']] = $row;
        }

        $tree = [];
        foreach ($byId as $id => $row) {
            if ($row['parent_id'] && isset($byId[$row['parent_id']])) {
                $byId[$row['parent_id']]['children'][] = &$byId[$id];
            } else {
                $tree[] = &$byId[$id];
            }
        }

        return $tree;
    }
}
