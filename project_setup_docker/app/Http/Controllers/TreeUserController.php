<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Aws\UploadFileController;
use App\Models\TreeUser;
use Exception;
use Illuminate\Http\Request;

class TreeUserController extends Controller
{
    public function index()
    {
        return response()->json(TreeUser::with([])->get());
    }

    public function byTree($id)
    {
        try {
            $tree_users = TreeUser::where('tree_id', $id)
                ->orderBy('uid', 'ASC')
                ->select()->get();
            return response()
                ->json($tree_users);
        } catch (Exception $e) {
            error_log($e);
            abort(403);
        }
    }

    public function show($id)
    {
        return response()
            ->json(TreeUser::find($id));
    }

    public function updateNodeTree(Request $request)
    {
        try {
            $itemResponse = null;

            $validateData = $request->validate([
                'id' => 'string|required',
                'name' => 'string|required',
                'fid' => 'string|nullable',
                'mid' => 'string|nullable',
                'pids' => 'json|nullable',
                'birth_day' => 'date|nullable',
                'death_day' => 'date|nullable',
                'address' => 'string|nullable',
                'gender' => 'string|nullable',
                'photo' => 'string|nullable',
                'status' => 'string|nullable',
                'tree_id' => 'integer|nullable',
            ]);

            if (isset($validateData['id'])) {
                $path_aws = null;
                if ($request->has('file')) {
                    $path_aws = app()->call('App\Http\Controllers\Aws\UploadFileController@getPathUpload', ['request' => $request]);
                }
                $itemCheck = TreeUser::where('id', $validateData['id'])->first();

                if (!$itemCheck) {
                    $treeUser = new TreeUser;
                    $treeUser->id = isset($validateData['id']) ? $validateData['id'] : null;
                    $treeUser->name = isset($validateData['name']) ? $validateData['name'] : null;
                    $treeUser->fid = isset($validateData['fid']) ? $validateData['fid'] : null;
                    $treeUser->mid = isset($validateData['mid']) ? $validateData['mid'] : null;
                    $treeUser->pids = isset($validateData['pids']) ? $validateData['pids'] : null;
                    $treeUser->birth_day = isset($validateData['birth_day']) ? $validateData['birth_day'] : null;
                    $treeUser->death_day = isset($validateData['death_day']) ? $validateData['death_day'] : null;
                    $treeUser->address = isset($validateData['address']) ? $validateData['address'] : null;
                    $treeUser->gender = isset($validateData['gender']) ? $validateData['gender'] : null;
                    $treeUser->photo = $path_aws ? $path_aws : (isset($validateData['photo']) ? $validateData['photo'] : null);
                    $treeUser->tree_id = isset($validateData['tree_id']) ? $validateData['tree_id'] : null;
                    $treeUser->save();
                    $itemResponse = $treeUser;
                    $this->updateCouple($treeUser->id);
                } else {
                    $pids_update = [];
                    if (isset($validateData['pids'])) {
                        $pids_input = json_decode($validateData['pids']);
                        foreach ($pids_input as $pid) {
                            $item_check = TreeUser::where('id', $pid)->first();
                            if ($item_check) {
                                array_push($pids_update, $pid);
                            }
                        }
                    }
                    $itemCheck->update([
                        "id" => isset($validateData['id']) ? $validateData['id'] : null,
                        "name" => isset($validateData['name']) ? $validateData['name'] : null,
                        "fid" => isset($validateData['fid']) ? $validateData['fid'] : null,
                        "mid" => isset($validateData['mid']) ? $validateData['mid'] : null,
                        "pids" => isset($validateData['pids']) ? json_encode($pids_update) : null,
                        "birth_day" => isset($validateData['birth_day']) ? $validateData['birth_day'] : null,
                        "death_day" => isset($validateData['death_day']) ? $validateData['death_day'] : null,
                        "address" => isset($validateData['address']) ? $validateData['address'] : null,
                        "gender" => isset($validateData['gender']) ? $validateData['gender'] : null,
                        "photo" => $path_aws ? $path_aws : (isset($validateData['photo']) ? $validateData['photo'] : $itemCheck->photo),
                        "tree_id" => isset($validateData['tree_id']) ? $validateData['tree_id'] : null,
                    ]);
                    $itemResponse = $itemCheck;
                    $this->updateCouple($validateData['id']);
                }
            }
            return response()->json([$itemResponse]);
        } catch (Exception $e) {
            error_log($e);
            abort(403);
        }
    }

    public function updateCouple($id)
    {
        $user_input = TreeUser::where('id', $id)->first();
        if ($user_input) {
            $pids_in = $user_input->pids;
            if ($pids_in) {
                $pids_in = json_decode($pids_in);
                foreach ($pids_in as $pid) {
                    $user_pid = TreeUser::where('id', $pid)->first();
                    $pids_out = $user_pid->pids;
                    if ($pids_out) {
                        $pids_out = json_decode($pids_out);
                        $item_check = in_array($id, $pids_out);
                        if (!$item_check) {
                            array_push($pids_out, $id);
                        }
                        $user_pid->update([
                            'pids' => json_encode($pids_out)
                        ]);
                    } else {
                        $pids_out = [];
                        array_push($pids_out, $id);
                        $user_pid->update([
                            'pids' => json_encode($pids_out)
                        ]);
                    }
                }
            }
        }
    }

    public function create(Request $request)
    {
        try {
            $validateData = $request->validate([
                'name' => 'string|required',
                'fid' => 'integer|nullable',
                'mid' => 'integer|nullable',
                'pids' => 'json|nullable',
                'birth_day' => 'date|nullable',
                'death_day' => 'date|nullable',
                'address' => 'string|nullable',
                'gender' => 'string|nullable',
                'photo' => 'string|nullable',
                'status' => 'string|nullable',
                'tree_id' => 'integer|nullable',
            ]);

            $itemCheck = TreeUser::where([
                ['name', '=', $validateData['name']],
            ])->first();
            if ($itemCheck) {
                return response()->json([
                    'message' => 'Đã tồn tại thành viên'
                ], 500);
            }
            $treeUser = TreeUser::create($validateData);
            return response()->json($treeUser);
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
                'fid' => 'integer|nullable',
                'mid' => 'integer|nullable',
                'pids' => 'json|nullable',
                'birth_day' => 'date|nullable',
                'death_day' => 'date|nullable',
                'address' => 'string|nullable',
                'gender' => 'string|nullable',
                'photo' => 'string|nullable',
                'status' => 'string|nullable',
                'tree_id' => 'integer|nullable',
            ]);

            $itemCheck = TreeUser::where([
                ['name', '=', $validateData['name']],
                ['id', '!=', $id]
            ])->first();
            if ($itemCheck) {
                return response()->json([
                    'message' => 'Đã tồn tại thành viên'
                ], 500);
            }


            $treeUser = TreeUser::with([])
                ->where('id', intval($id))
                ->first();
            $treeUser->update($validateData);

            return  response()->json(TreeUser::with([])->where('id', $id)->first());
        } catch (Exception $e) {
            error_log($e);
            abort(403);
        }
    }



    public function delete($id)
    {
        $treeUserDelete = TreeUser::with([])->where('id', $id)->first();

        if (isset($treeUserDelete)) {
            $treeUserDelete->delete();
            return response()->json(['message' => 'Đã xóa']);
        }
        return response()->json(['message' => "Không tồn tại"]);
    }
}
