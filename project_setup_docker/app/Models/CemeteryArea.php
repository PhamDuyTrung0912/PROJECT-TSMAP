<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CemeteryArea extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $connection = "map";

    protected $table = "cim_zones";

    protected $primaryKey = "gid";

    public $timestamps = false;

    protected $fillable = [
        'type_id',
    ];

    protected $hidden = [
        'the_geom',
    ];

    // public function type()
    // {
    //     return $this->belongsTo('App\Models\CemeteryAreaType', 'type_id');
    // }


}
