<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $table="districts";

    protected $primaryKey = "id";

    protected $fillable=[
        'name',
        'code',
        'isActive',
        'provinceId',
    ];

    public function province()
    {
        return $this->belongsTo('App\Models\Province', 'provinceId');
    }

    public function wards()
    {
        return $this->hasMany('App\Models\Ward', 'districtId');
    }
}
