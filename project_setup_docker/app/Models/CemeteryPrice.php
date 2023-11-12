<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CemeteryPrice extends Model
{
    use HasFactory;

    protected $table="cemetery_price";

    public $timestamps = false;
    protected $primaryKey = "id";

    protected $fillable=[
        'name',
        'amount',
    ];

    public function cemeterySingles()
    {
        return $this->hasMany('App\Models\CemeterySingle', 'price_id');
    }

}
