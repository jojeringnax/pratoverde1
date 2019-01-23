<?php

namespace App\Http\Controllers\Admin;

use App\ProblemCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProblemCatgoryController extends Controller
{
    /**
     * @var string
     */
    private $modelName = ProblemCategory::class;

    /**
     * @return string
     */
    public function index()
    {
        return $this->modelName::all()->toJson();
    }

    /**
     * @param Request $request
     * @param ProblemCategory $problemCategory
     * @return ProblemCategory|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function store(Request $request, ProblemCategory $problemCategory)
    {
        if ($problemCategory === null) {
            return response(json_encode(['category' => 'problemCategories', 'id' => null, 'message' => 'Problem not found', 'code' => 1]), 500);
        }
        $problemCategory->fill($request->post());
        $problemCategory->save();
        return $problemCategory;
    }

    /**
     * @param Request $request
     * @return ProblemCategory|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $problem = new $this->modelName();
        $id = $request->post('id');
        if ($this->modelName::find($id) !== null) {
            return response(json_encode(['category' => 'problemCategories', 'id' => $id, 'message' => 'Problem already exists', 'code' => 2]), 500);
        }
        return $this->store($request, $problem);
    }

    /**
     * @param Request $request
     * @param $id
     * @return ProblemCategory
     */
    public function update(Request $request, $id)
    {
        $problemCategory = $this->modelName::findOrFail($id);
        return $this->store($request, $problemCategory);
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