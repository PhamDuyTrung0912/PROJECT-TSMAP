<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CemeteryUser extends Model
{
    use HasFactory;

    protected $table="cemetery_user";

    public $timestamps = false;
    protected $primaryKey = "id";

    protected $fillable=[
        'name',
        'code',
        'status'
    ];

    public function cemeterySingles()
    {
        return $this->hasMany('App\Models\CemeterySingle', 'cemetery_user_id');
    }

}
