<?php

namespace App\Http\Controllers\Admin;

use App\Facility;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FacilityController extends Controller
{
    /**
     * @return Facility | string
     */
    public function index()
    {
        return Facility::all()->toJson();
    }

    /**
     * @param Request $request
     * @param Facility $facility
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function store(Request $request, Facility $facility)
    {
        if ($facility === null) {
            return response(json_encode(['category' => 'facilities', 'id' => null, 'message' => 'Facility not found', 'code' => 1]), 500);
        }
        $facility->fill($request->post());
        $facility->save();
        return $facility->toJson();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function create(Request $request)
    {
        $facility = new Facility();
        return $this->store($request, $facility);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function update(Request $request, $id)
    {
        if ($request->isMethod('get')) {
            return json_encode(['facility' => Facility::findOrFail($id)]);
        }
        $facility = Facility::findOrFail($id);
        return $this->store($request, $facility);
    }

    /**
     * @param $id
     * @return string
     */
    public function delete($id)
    {
        return (string) Facility::findOrFail($id)->delete();
    }
}
