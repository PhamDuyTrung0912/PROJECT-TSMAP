<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;


class AttachmentController extends Controller
{
    public function index() {
        return response()->json(Attachment::all());
    }

    public function show(Attachment $attachment) {
        return response()->json($attachment);
    }

    public function display($path)
    {
        $attachment = Storage::disk('local')->get('attachments/' . $path);
        $type = Storage::disk('local')->mimeType('attachments/' . $path);
        return Response::make($attachment, 200)->header("Content-type", $type);
    }

    public function displaySymbol($path)
    {
        $attachment = Storage::disk('public')->get('symbols/' . $path);
        $type = Storage::disk('public')->mimeType('symbols/' . $path);
        return Response::make($attachment, 200)->header("Content-type", $type);
    }

    public function create(Request $request) {
        $attachmentable_id = intval($request->input('attachmentable_id'));

        if ($attachmentable_id > 0) {
            $validatedData = $request->validate([
                'attachment' => 'required|file|max:5128',
                'attachmentable_type' => 'required|string',
                'uploaded_by' => Auth::user()->id
            ]);

            $extension = $request->file('attachment')->getClientOriginalExtension();
            $hashName = $request->file('attachment')->hashName();
            if ($extension !== 'docx') {
                $extensionToRemove = $request->file('attachment')->extension();
                $hashName = substr($hashName, -0, strlen($extensionToRemove));
            }
            $name = $hashName . '.' . $extension;

            $request->file('attachment')->storeAs(
                'attachments',
                $name,
                'local'
            );

            $path = 'attachments/' . $name;

            $attachment = new Attachment();
            $attachment->path = $path;
            $attachment->original_name = $validatedData['attachment']->getClientOriginalName();
            $attachment->mime_type = $validatedData['attachment']->getClientMimeType();

            $attachment->save();
            return response()->json($attachment);
        }
        return abort(500, 'Error during the validation');
    }

    public function delete(Attachment $attachment) {
        try {
            $attachment->delete();
            return response()->json('Pièce jointe supprimée');
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

}
