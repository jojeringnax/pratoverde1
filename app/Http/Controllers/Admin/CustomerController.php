<?php

namespace App\Http\Controllers\Admin;

use App\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CustomerController extends Controller
{
    /**
     * @var string
     */
    private $modelName = Customer::class;

    /**
     * @return string
     */
    public function index()
    {
        return $this->modelName::all()->toJson();
    }

    /**
     * @param Request $request
     * @param Customer $customer
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function store(Request $request, Customer $customer)
    {
        if ($customer === null) {
            return response(json_encode(['category' => 'customers', 'id' => null, 'message' => 'Customer not found', 'code' => 1]), 500);
        }
        $customer->fill($request->post());
        $customer->save();
        return $customer->toJson();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function create(Request $request)
    {
        $customer = new $this->modelName();
        return $this->store($request, $customer);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function update(Request $request, $id)
    {
        $customer = $this->modelName::findOrFail($id);
        return $this->store($request, $customer);
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
