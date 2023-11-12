<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $table="wards";

    protected $primaryKey = "id";

    protected $fillable=[
        'name',
        'code',
        'isActive',
        'districtId',
    ];

    public function district()
    {
        return $this->belongsTo('App\Models\District', 'districtId');
    }
}
