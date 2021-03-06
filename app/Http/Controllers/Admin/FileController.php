<?php

namespace App\Http\Controllers\Admin;
ini_set('upload_max_filesize', '10000000');
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

    /**
     * Test
     * Test
     * @param Request $request
     */
    public function create(Request $request)
    {
        return var_dump($request->allFiles());
    }

    /**
     * @param $id
     * @return string
     */
    public function delete($id)
    {
        return (string) File::findOrFail($id)->delete();
    }

    /**
     * @param Request $request
     * @return bool
     */
    public function uploadPhotosForArticle(Request $request)
    {
        return File::uploadPhotoOfArticleContent(
            $request->post('photo', ''),
            $request->post('photo_id', 0),
            $request->post('article_id', 0),
            $request->post('extension', 'jpg'),
            $request->post('width', 1)
        );
    }
}
