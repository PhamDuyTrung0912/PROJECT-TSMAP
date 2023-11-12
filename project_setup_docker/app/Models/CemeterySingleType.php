<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CemeterySingleType extends Model
{
    use HasFactory;

    protected $table="cemetery_single_type";

    protected $primaryKey = "id";

    protected $fillable=[
        'name',
        'code',
        'status'
    ];

    public function cemeterySingles()
    {
        return $this->hasMany('App\Models\CemeterySingle', 'type_id');
    }

}
