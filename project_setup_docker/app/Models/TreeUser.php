<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TreeUser extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table="tree_users";

    public $timestamps = true;

    protected $primaryKey = "uid";

    protected $fillable=[
        'uid',
        'id',
        'name',
        'fid',
        'mid',
        'pids',
        'birth_day',
        'death_day',
        'address',
        'gender',
        'photo',
        'status',
        'tree_id',
    ];

}
