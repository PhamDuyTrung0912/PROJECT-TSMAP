<?php

namespace App\Http\Controllers;

use App\Models\CemeterySingle;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CemeterySingleController extends Controller
{
    public function index()
    {
        return response()->json(CemeterySingle::with([])
            ->select()
            ->get());
    }

    public function status_map()
    {
        $cemeteries_ids = CemeterySingle::select('gid', 'status');
        $data = $cemeteries_ids->get();
        return response()->json($data);
    }

    public function show($id)
    {
        $cemetery =  CemeterySingle::where('gid', $id)
            ->with([
                'province' => function ($query) {
                    $query->select('id', 'name');
                },
                'district' => function ($query) {
                    $query->select('id', 'name');
                },
                'ward' => function ($query) {
                    $query->select('id', 'name');
                },
                'cemetery' => function ($query) {
                    $query->select('gid', 'name');
                },
            ])
            ->select()
            ->selectRaw("ST_AsGeoJSON(cemetery_single.the_geom) coordinates")
            ->first();
        return response()
            ->json(
                $cemetery

            );
    }





    public function byFilter(Request $request)
    {
        try {
            $request->has('offset') && $request->input('offset') ? $offset = $request->input('offset') : $offset = 0;

            $validatedFilters = $request->validate([
                'limit' => 'nullable|integer',
                'gids' => 'json|nullable',
                'cim_table' => 'string|nullable',
                'hoten' => 'string|nullable',
                'nguyenquanxa' => 'string|nullable',
                'nguyenquanhuyen' => 'string|nullable',
                'nguyenquantinh' => 'string|nullable',
                'birth_day' => 'integer|nullable',
                'namhysinh' => 'string|nullable',
                'donvi' => 'string|nullable',
                'capbac' => 'string|nullable',
                'chucvu' => 'string|nullable',
                'khumo' => 'string|nullable',
                'hangmo' => 'string|nullable',
                'somo' => 'string|nullable',
                'status' => 'string|nullable',
                'province_id' => 'integer|nullable',
                'district_id' => 'integer|nullable',
                'ward_id' => 'integer|nullable',
            ]);
            if (isset($validatedFilters['limit'])) {
                $limit = $validatedFilters['limit'];
            } else {
                $limit = 5;
            }

            $cemeteryFilter = [];

            foreach ($validatedFilters as $key => $value) {
                if ($value && !in_array($key, ['limit', 'hoten', 'birth_day'])) {
                    if (in_array($key, ['province_id', 'district_id', 'ward_id'])) {
                        // Nếu trường là 'province_id', 'district_id', hoặc 'ward_id'
                        // Sử dụng = để tìm theo giá trị chính xác, không sử dụng ilike
                        $cemeteryFilter[] = [$key, '=', $value];
                    } else {
                        // Các trường khác sử dụng ilike để tìm kiếm tương tự
                        $cemeteryFilter[] = [$key, 'ilike', '%' . $value . '%'];
                    }
                }
            }

            $cemeteries = CemeterySingle::select()
                ->with([
                    'province' => function ($query) {
                        $query->select('id', 'name');
                    },
                    'district' => function ($query) {
                        $query->select('id', 'name');
                    },
                    'ward' => function ($query) {
                        $query->select('id', 'name');
                    },
                    'cemetery' => function ($query) {
                        $query->select('gid', 'name');
                    },
                ])
                ->where($cemeteryFilter);

            if ($validatedFilters['hoten']) {
                $hoten = $validatedFilters['hoten'];
                $cemeteries->whereRaw("unaccent(hoten) ILIKE unaccent('%$hoten%')");
                
            }

            if (isset($validatedFilters['birth_day']) && $validatedFilters['birth_day']) {
                $birth_day = $validatedFilters['birth_day'];
                $cemeteries->whereRaw("EXTRACT(YEAR FROM TO_DATE(namsinh::text, 'YYYY')) = EXTRACT(YEAR FROM TO_DATE(?::text, 'YYYY'))", [$birth_day]);
            }
            

            $cemeteries_out = $cemeteries
                ->orderBy('gid', 'DESC')
                ->offset($offset)
                ->limit($limit)
                ->get();

            $cemeteries_query_count = CemeterySingle::where($cemeteryFilter);
            if ($validatedFilters['hoten']) {
                $hoten = $validatedFilters['hoten'];
                $cemeteries_query_count->whereRaw("unaccent(hoten) ILIKE unaccent('%$hoten%')");
            }
            if (isset($validatedFilters['birth_day']) && $validatedFilters['birth_day']) {
                $birth_day = $validatedFilters['birth_day'];
                $cemeteries_query_count->whereRaw("EXTRACT(YEAR FROM TO_DATE(namsinh::text, 'YYYY')) = EXTRACT(YEAR FROM TO_DATE(?::text, 'YYYY'))", [$birth_day]);
            }
            $cemeteries_count = $cemeteries_query_count->count();

            return response()->json([
                'count' => $cemeteries_count,
                'cemeteries' => $cemeteries_out,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }



    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            'name' => 'string|required',
            'status' => 'boolean|nullable',
        ]);

        $itemCheck = CemeterySingle::where([
            ['name', '=', $validateData['name']],
            ['id', '!=', $id]
        ])->first();
        if ($itemCheck) {
            return response()->json([
                'message' => 'Đã tồn tại loại hình'
            ], 500);
        }


        $cemeterySingle = CemeterySingle::with([])
            ->where('id', intval($id))
            ->first();
        $cemeterySingle->update($validateData);

        return  response()->json(CemeterySingle::with([])->where('id', $id)->first());
    }

    public function create(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'string|required',
            'status' => 'boolean|nullable',
        ]);

        $itemCheck = CemeterySingle::where([
            ['name', '=', $validateData['name']],
        ])->first();
        if ($itemCheck) {
            return response()->json([
                'message' => 'Đã tồn tại loại hình'
            ], 500);
        }
        $cemeterySingle = CemeterySingle::create($validateData);
        return response()->json($cemeterySingle);
    }

    public function delete($id)
    {
        $cemeterySingleDelete = CemeterySingle::with([])->where('id', $id)->first();

        if (isset($cemeterySingleDelete)) {
            $cemeterySingleDelete->delete();
            return response()->json(['message' => 'Đã xóa']);
        }
        return response()->json(['message' => "Không tồn tại"]);
    }
}
