<?php

namespace App\Http\Controllers;

use App\Models\CemeterySingleType;
use Illuminate\Http\Request;

class CemeterySingleTypeController extends Controller
{
    public function index()
    {
        return response()->json(CemeterySingleType::with([])->get());
    }

    public function show($id)
    {
        return response()
            ->json(CemeterySingleType::find($id));
    }

    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            'name' => 'string|required',
            'status' => 'boolean|nullable',
        ]);

        $itemCheck = CemeterySingleType::where([
            ['name', '=', $validateData['name']],
            ['id', '!=', $id]
        ])->first();
        if ($itemCheck) {
            return response()->json([
                'message' => 'Đã tồn tại loại hình'
            ], 500);
        }


        $cemeterySingleType = CemeterySingleType::with([])
            ->where('id', intval($id))
            ->first();
        $cemeterySingleType->update($validateData);

        return  response()->json(CemeterySingleType::with([])->where('id', $id)->first());
    }

    public function create(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'string|required',
            'status' => 'boolean|nullable',
        ]);

        $itemCheck = CemeterySingleType::where([
            ['name', '=', $validateData['name']],
        ])->first();
        if ($itemCheck) {
            return response()->json([
                'message' => 'Đã tồn tại loại hình'
            ], 500);
        }
        $cemeterySingleType = CemeterySingleType::create($validateData);
        return response()->json($cemeterySingleType);
    }

    public function delete($id)
    {
        $cemeterySingleTypeDelete = CemeterySingleType::with([])->where('id', $id)->first();

        if (isset($cemeterySingleTypeDelete)) {
            $cemeterySingleTypeDelete->delete();
            return response()->json(['message' => 'Đã xóa']);
        }
        return response()->json(['message' => "Không tồn tại"]);
    }

}
