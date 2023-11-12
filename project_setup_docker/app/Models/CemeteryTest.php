<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CemeteryTest extends Model
{
    use HasFactory;

    protected $connection = "map";

    protected $table = "cemeteries_test_01";

    protected $primaryKey = "gid";

    public $timestamps = false;

    protected $fillable = [
        'zone',
        'zone0',
        'zone1',
        'zone2',
    ];

}
