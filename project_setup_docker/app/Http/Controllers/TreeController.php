<?php

namespace App\Http\Controllers;

use App\Models\Tree;
use Exception;
use Illuminate\Http\Request;

class TreeController extends Controller
{
    public function index()
    {
        return response()->json(Tree::with([
            'province' => function ($query) {
                $query->select('id', 'name');
            },
            'district' => function ($query) {
                $query->select('id', 'name');
            },
            'ward' => function ($query) {
                $query->select('id', 'name');
            },
        ])->get());
    }

    public function show($id)
    {

        return response()
            ->json(Tree::find($id));
    }

    public function create(Request $request)
    {
        try {
            $validateData = $request->validate([
                'name' => 'string|required',
                'province_id' => 'integer|nullable',
                'district_id' => 'integer|nullable',
                'ward_id' => 'integer|nullable',
                'status' => 'string|nullable',
            ]);

            $itemCheck = Tree::where([
                ['name', '=', $validateData['name']],
            ])->first();
            if ($itemCheck) {
                return response()->json([
                    'message' => 'Đã tồn tại dòng họ'
                ], 500);
            }
            $tree = Tree::create($validateData);
            return response()->json($tree);
        } catch (Exception $e) {
            error_log($e);
            abort(403);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validateData = $request->validate([
                'name' => 'string|required',
                'province_id' => 'integer|nullable',
                'district_id' => 'integer|nullable',
                'ward_id' => 'integer|nullable',
                'status' => 'string|nullable',
            ]);

            $itemCheck = Tree::where([
                ['name', '=', $validateData['name']],
                ['id', '!=', $id]
            ])->first();
            if ($itemCheck) {
                return response()->json([
                    'message' => 'Đã tồn tại dòng họ'
                ], 500);
            }


            $tree = Tree::with([])
                ->where('id', intval($id))
                ->first();
            $tree->update($validateData);

            return  response()->json(Tree::with([])->where('id', $id)->first());
        } catch (Exception $e) {
            error_log($e);
            abort(403);
        }
    }



    public function delete($id)
    {
        $treeDelete = Tree::with([])->where('id', $id)->first();

        if (isset($treeDelete)) {
            $treeDelete->delete();
            return response()->json(['message' => 'Đã xóa']);
        }
        return response()->json(['message' => "Không tồn tại"]);
    }
}
