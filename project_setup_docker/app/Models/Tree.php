<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tree extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "trees";

    public $timestamps = true;

    protected $primaryKey = "id";

    protected $fillable = [
        'name',
        'province_id',
        'district_id',
        'ward_id',
        'status',
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
