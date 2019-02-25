<?php

namespace App\Http\Controllers\Admin;

use App\Article;
use App\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * @var Article | string
     */
    private $modelName = Article::class;

    /**
     * @return string
     */
    public function index()
    {
        return $this->modelName::all()->toJson();
    }

    /**
     * @param Request $request
     * @param Article $article
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function store(Request $request, Article $article)
    {
        if ($article === null) {
            return response(json_encode(['category' => 'bookings', 'id' => null, 'message' => 'Booking not found', 'code' => 1]), 500);
        }
        $article->fill($request->post());
        $article->save();
        $this->uploadMainPhotos($request, $article);
        return $article->toJson();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function create(Request $request)
    {
        $article = new $this->modelName();
        return $this->store($request, $article);
    }

    /**
     * @param Request $request
     * @param Article $article
     * @return bool
     */
    public function uploadMainPhotos(Request $request, Article $article)
    {
        if ($request->file() === null) return false;
        $photos = [
            'index' => $request->file('file1'),
            'single' => $request->file('file2')
        ];
        foreach ($photos as $key => $photo) {
            if ($photo !== null) {
                $path = 'news/' . $article->id . '_' . $key . '.' . $photo->getClientOriginalExtension();
                Storage::disk('public')->put($path, file_get_contents($photo->getPathname()));
                $variableName = $key.'File';
                $$variableName = new File();
                $$variableName->path = '/storage/' . $path;
                $$variableName->size = $photo->getSize();
                $$variableName->size_x = getimagesize($photo->getPathname())[0];
                $$variableName->size_y = getimagesize($photo->getPathname())[1];
                $$variableName->type = File::TYPES['photo'];
                $$variableName->save();
            }
        }
        $article->update([
            'for_index_page_photo_id' => isset($indexFile) ? $indexFile->id : null,
            'single_page_photo_id' => isset($singleFile) ? $singleFile->id : null,
        ]);
        return true;
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function update(Request $request, $id)
    {
        $article = $this->modelName::findOrFail($id);
        return $this->store($request, $article);
    }

    /**
     * @param $id
     * @return boolean
     */
    public function delete($id)
    {
        return (string) $this->modelName::findOrFail($id)->delete();
    }
}
