<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CemeteryCountry extends Model
{
    use HasFactory;

    protected $table = "cemetery_country";

    public $timestamps = false;
    protected $primaryKey = "gid";

    protected $fillable = [
        'name',
        'country_id',
        'province_id',
        'district_id',
        'ward_id',
        'the_geom',
    ];

    public function cemeterySingles()
    {
        return $this->hasMany('App\Models\CemeteryCountry', 'country_id');
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
