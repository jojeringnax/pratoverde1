<?php

namespace App\Http\Controllers\Admin;

use App\Problem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProblemController extends Controller
{
    /**
     * @var string
     */
    private $modelName = Problem::class;

    /**
     * @return string
     */
    public function index()
    {
        return $this->modelName::all()->toJson();
    }

    /**
     * @param Request $request
     * @param Problem $problem
     * @return Problem
     */
    public function store(Request $request, Problem $problem)
    {
        if ($problem === null) {
            return response(json_encode(['category' => 'problems', 'id' => null, 'message' => 'Problem not found', 'code' => 1]), 500);
        }
        $problem->fill($request->post());
        $problem->save();
        return $problem;
    }

    /**
     * @param Request $request
     * @return Problem
     */
    public function create(Request $request)
    {
        $problem = new $this->modelName();
        $id = $request->post('id');
        if ($this->modelName::find($id) !== null) {
            return response(json_encode(['category' => 'problems', 'id' => $id, 'message' => 'Problem already exists', 'code' => 2]), 500);
        }
        return $this->store($request, $problem);
    }

    /**
     * @param Request $request
     * @param $id
     * @return Problem
     */
    public function update(Request $request, $id)
    {
        $problem = $this->modelName::findOrFail($id);
        return $this->store($request, $problem);
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
