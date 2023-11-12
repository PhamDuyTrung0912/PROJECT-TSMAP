<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CemeterySingle extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $connection = "map";

    protected $table = "cemetery_single";

    protected $primaryKey = "gid";

    public $timestamps = false;

    protected $fillable = [
        'type_id',
        'nature_id',
        'cemetery_country_id',
        'province_id',
        'district_id',
        'ward_id',
    ];

    protected $hidden = [
        'the_geom',
    ];

    public function cemetery()
    {
        return $this->belongsTo('App\Models\CemeteryCountry', 'cemetery_country_id');
    }

    public function type()
    {
        return $this->belongsTo('App\Models\CemeterySingleType', 'type_id');
    }

    public function nature()
    {
        return $this->belongsTo('App\Models\CemeterySingleNature', 'nature_id');
    }

    public function province()
    {
        return $this->belongsTo('App\Models\Province', 'province_id');
    }

    public function district()
    {
        return $this->belongsTo('App\Models\District', 'district_id');
    }

    public function ward()
    {
        return $this->belongsTo('App\Models\Ward', 'ward_id');
    }

}
