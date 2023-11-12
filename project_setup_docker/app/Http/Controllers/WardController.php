<?php

namespace App\Http\Controllers;

use App\Models\Ward;
use Illuminate\Http\Request;

class WardController extends Controller
{
    public function index()
    {
        return response()->json(Ward::with([])->get());
    }

    public function byDistrict($id)
    {
        $wards = Ward::where('districtId', $id)->select()->get();
        return response()->json($wards);
    }
}
