<?php

namespace App\Http\Controllers\Admin;

use App\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        return var_dump($request->allFiles());
        $article->save();
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


    public function uploadPhotos(Request $request)
    {
        return var_dump($request->post());
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
