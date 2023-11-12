<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    use HasFactory;

    protected $table = "icar_routes";

    public $timestamps = false;

    protected $primaryKey = "gid";

    protected $hidden = [
       'recid', 'type', 'fiscitid', 'upddate', 'shape_len'
    ];

    public function villages() {
        return $this->belongsToMany('App\Models\Village', 'route_village', 'route_cad_gid', 'village_cad_gid');
    }
}
