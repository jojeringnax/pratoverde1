<?php

namespace App\Http\Controllers\Admin;

use App\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FileController extends Controller
{
    /**
     * @param Request $request
     * @param File $file
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function store(Request $request, File $file)
    {
        if ($file === null) {
            return response(json_encode(['category' => 'files', 'id' => null, 'message' => 'File not found', 'code' => 1]), 500);
        }
        $file->save();
        return $file->toJson();
    }

    public function create(Request $request)
    {
        return var_dump($request->file());
    }

    public function delete($id)
    {
        return (string) File::findOrFail($id)->delete();
    }
}
