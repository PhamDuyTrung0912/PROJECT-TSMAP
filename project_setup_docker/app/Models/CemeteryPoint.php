<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CemeteryPoint extends Model
{
    use HasFactory;

    protected $table = "cim_points";

    public $timestamps = false;
    protected $primaryKey = "gid";

    protected $fillable = [
        'cim_table',
    ];

    protected $hidden = [
        'the_geom',
    ];
}
