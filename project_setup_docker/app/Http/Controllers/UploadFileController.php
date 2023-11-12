<?php

namespace App\Http\Controllers\Aws;

use App\Http\Controllers\Controller;
use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadFileController extends Controller
{
    public function getPathUpload(Request $request)
    {
        $path = Storage::disk('s3')->put('files', $request->file);
        $path = Storage::disk('s3')->url($path);
        $this->addAttachments($path);
        $path_files = env('AWS_PATH') . $path;
        if($path_files) return $path_files;

    }

    public function upload(Request $request)
    {
        $path = Storage::disk('s3')->put('files', $request->file);
        $path = Storage::disk('s3')->url($path);
        $this->addAttachments($path);
        $path_files = env('AWS_PATH') . $path;

        return response()->json(['files' => $path_files]);
    }

    public function resizeFile()
    {
    }

    public function addAttachments($path, $model = null)
    {
        Attachment::create([
            'path' => $path ? $path : null,
            'mime_type' =>  $model ? $model->mime_type : null,
            'original_name' =>  $model ? $model->original_name : null,
            'attachmentable_type' =>  $model ? $model->attachmentable_type : null,
            'attachmentable_id' =>  $model ? $model->attachmentable_id : null,
        ]);
    }

    public function removeAttachments($ids){

    }
}
