<?php

namespace App\Http\Controllers\Admin;

use App\CustomerSource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CustomerSourceController extends Controller
{
    /**
     * @var CustomerSource | string
     */
    private $modelName = CustomerSource::class;

    /**
     * @return string
     */
    public function index()
    {
        return $this->modelName::all()->toJson();
    }

    /**
     * @param Request $request
     * @param CustomerSource $customerSource
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function store(Request $request, CustomerSource $customerSource)
    {
        if ($customerSource === null) {
            return response(json_encode(['category' => 'customers', 'id' => null, 'message' => 'CustomerSource not found', 'code' => 1]), 500);
        }
        $customerSource->fill($request->post());
        $customerSource->save();
        return $customerSource->toJson();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function create(Request $request)
    {
        $customerSource = new $this->modelName();
        return $this->store($request, $customerSource);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function update(Request $request, $id)
    {
        $customerSource = $this->modelName::findOrFail($id);
        return $this->store($request, $customerSource);
    }

    /**
     * @param $id
     * @return string
     */
    public function delete($id)
    {
        return (string) $this->modelName::findOrFail($id)->delete();
    }
}
