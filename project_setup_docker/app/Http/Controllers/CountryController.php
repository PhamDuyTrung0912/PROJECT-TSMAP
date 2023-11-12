<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        return response()->json(Country::with([])->get());
    }

    public function show($id)
    {
        return response()
            ->json(Country::find($id));
    }

    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            'name' => 'string|required',
        ]);

        $itemCheck = Country::where([
            ['name', '=', $validateData['name']],
            ['id', '!=', $id]
        ])->first();
        if ($itemCheck) {
            return response()->json([
                'message' => 'Đã tồn tại quốc gia'
            ], 500);
        }


        $country = Country::with([])
            ->where('id', intval($id))
            ->first();
        $country->update($validateData);

        return  response()->json(Country::with([])->where('id', $id)->first());
    }

    public function create(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'string|required',
        ]);

        $itemCheck = Country::where([
            ['name', '=', $validateData['name']],
        ])->first();
        if ($itemCheck) {
            return response()->json([
                'message' => 'Đã tồn tại quốc gia'
            ], 500);
        }
        $country = Country::create($validateData);
        return response()->json($country);
    }

    public function delete($id)
    {
        $countryDelete = Country::with([])->where('id', $id)->first();

        if (isset($countryDelete)) {
            $countryDelete->delete();
            return response()->json(['message' => 'Đã xóa']);
        }
        return response()->json(['message' => "Không tồn tại"]);
    }

}
