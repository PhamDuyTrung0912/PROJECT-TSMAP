<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CemeteryAreaType extends Model
{
    use HasFactory;

    protected $table="cemetery_area_type";

    protected $primaryKey = "id";

    protected $fillable=[
        'name',
        'status'
    ];

    public function cemeteryAreas()
    {
        return $this->hasMany('App\Models\CemeteryArea', 'type_id');
    }
}
