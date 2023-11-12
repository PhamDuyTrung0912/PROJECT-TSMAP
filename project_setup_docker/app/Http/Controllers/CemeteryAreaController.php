<?php

namespace App\Http\Controllers;

use App\Models\CemeteryArea;
use Illuminate\Http\Request;

class CemeteryAreaController extends Controller
{
    public function index()
    {
        return response()->json(CemeteryArea::with([])
            ->select()
            ->selectRaw('ST_AsGeoJSON(ST_Centroid(the_geom)) as center')
            ->get());
    }

    public function show($id)
    {
        return response()
            ->json(CemeteryArea::find($id));
    }

    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            'name' => 'string|required',
            'status' => 'boolean|nullable',
        ]);

        $itemCheck = CemeteryArea::where([
            ['name', '=', $validateData['name']],
            ['id', '!=', $id]
        ])->first();
        if ($itemCheck) {
            return response()->json([
                'message' => 'Đã tồn tại loại hình'
            ], 500);
        }


        $cemeteryArea = CemeteryArea::with([])
            ->where('id', intval($id))
            ->first();
        $cemeteryArea->update($validateData);

        return  response()->json(CemeteryArea::with([])->where('id', $id)->first());
    }

    public function create(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'string|required',
            'status' => 'boolean|nullable',
        ]);

        $itemCheck = CemeteryArea::where([
            ['name', '=', $validateData['name']],
        ])->first();
        if ($itemCheck) {
            return response()->json([
                'message' => 'Đã tồn tại loại hình'
            ], 500);
        }
        $cemeteryArea = CemeteryArea::create($validateData);
        return response()->json($cemeteryArea);
    }

    public function delete($id)
    {
        $cemeteryAreaDelete = CemeteryArea::with([])->where('id', $id)->first();

        if (isset($cemeteryAreaDelete)) {
            $cemeteryAreaDelete->delete();
            return response()->json(['message' => 'Đã xóa']);
        }
        return response()->json(['message' => "Không tồn tại"]);
    }
}
