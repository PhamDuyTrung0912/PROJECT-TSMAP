<?php

namespace App\Http\Controllers;

use App\Models\CemeteryCountry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CemeteryCountryController extends Controller
{
    public function index()
    {
        $cemeteryCountries = CemeteryCountry::with([
            'province' => function ($query) {
                $query->select('id', 'name');
            },
            'district' => function ($query) {
                $query->select('id', 'name');
            },
            'ward' => function ($query) {
                $query->select('id', 'name');
            },
        ])
            ->select()
            ->get();


        return response()->json($cemeteryCountries);
    }



    public function select()
    {
        $cemeteryCountries = CemeteryCountry::with([
            'province' => function ($query) {
                $query->select('id', 'name');
            },
            'district' => function ($query) {
                $query->select('id', 'name');
            },
            'ward' => function ($query) {
                $query->select('id', 'name');
            },
        ])
            ->select(['*', DB::raw("ST_AsGeoJSON(the_geom) as coordinates")])
            ->get();


        return response()->json($cemeteryCountries);
    }

    public function show($id)
    {
        return response()
            ->json(CemeteryCountry::find($id));
    }

    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            'name' => 'string|required',
            'country_id' => 'integer|nullable',
        ]);

        $itemCheck = CemeteryCountry::where([
            ['name', '=', $validateData['name']],
            ['id', '!=', $id]
        ])->first();
        if ($itemCheck) {
            return response()->json([
                'message' => 'Đã tồn tại nghĩa trang'
            ], 500);
        }


        $cemeteryCountry = CemeteryCountry::with([])
            ->where('id', intval($id))
            ->first();
        $cemeteryCountry->update($validateData);

        return  response()->json(CemeteryCountry::with([])->where('id', $id)->first());
    }

    public function create(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'string|required',
            'country_id' => 'integer|nullable',
        ]);

        $itemCheck = CemeteryCountry::where([
            ['name', '=', $validateData['name']],
        ])->first();
        if ($itemCheck) {
            return response()->json([
                'message' => 'Đã tồn tại nghĩa trang'
            ], 500);
        }
        $cemeteryCountry = CemeteryCountry::create($validateData);
        return response()->json($cemeteryCountry);
    }

    public function delete($id)
    {
        $cemeteryCountryDelete = CemeteryCountry::with([])->where('id', $id)->first();

        if (isset($cemeteryCountryDelete)) {
            $cemeteryCountryDelete->delete();
            return response()->json(['message' => 'Đã xóa']);
        }
        return response()->json(['message' => "Không tồn tại"]);
    }
}
