<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CemeterySingleNature extends Model
{
    use HasFactory;

    protected $table="cemetery_single_nature";

    protected $primaryKey = "id";

    protected $fillable=[
        'name',
        'status'
    ];

    public function cemeterySingles()
    {
        return $this->hasMany('App\Models\CemeterySingle', 'nature_id');
    }
}
