<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $table="provinces";

    protected $primaryKey = "id";

    protected $fillable=[
        'name',
        'code',
        'isActive',
    ];

    public function districts()
    {
        return $this->hasMany('App\Models\District', 'provinceId');
    }
}
