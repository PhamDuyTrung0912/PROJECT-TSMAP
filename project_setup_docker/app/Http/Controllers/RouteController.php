<?php

namespace App\Http\Controllers;

use App\Models\Route;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index(Request $request) {
        return response()->json(Route::all());
    }

    public function show($id) {
        return response()->json(Route::select()->selectRaw('ST_asGeojson(ST_Centroid(the_geom)::geometry, 9, 8) as center')->where('gid', $id)->first());
    }
}
