<?php

namespace App\Http\Controllers;

use App\Models\District;
use Illuminate\Http\Request;

class DistrictController extends Controller
{
    public function index()
    {
        return response()->json(District::with([])->get());
    }

    public function byProvince($id)
    {
        $districts = District::where('provinceId', $id)->select()->get();
        return response()->json($districts);
    }
}
