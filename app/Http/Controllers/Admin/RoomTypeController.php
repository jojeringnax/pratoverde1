<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\RoomType;
use Illuminate\Http\Request;

class RoomTypeController extends Controller
{

    /**
     * @return string
     */
    public function index()
    {
        return RoomType::all()->toJson();
    }

    /**
     * @param Request $request
     * @param RoomType $roomType
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function store(Request $request, RoomType $roomType)
    {
        if ($roomType === null) {
            return response(json_encode(['category' => 'roomTypes', 'id' => null, 'message' => 'Type of room not found', 'code' => 1]), 500);
        }
        $roomType->fill($request->post());
        $roomType->save();
        return $roomType->toJson();
    }

    /**
     * @param Request $request
     * @return RoomType|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $roomType = new RoomType();
        return $this->store($request, $roomType);
    }

    /**
     * @param Request $request
     * @param $id
     * @return RoomType|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function update(Request $request, $id)
    {
        if ($request->isMethod('get')) {
            return json_encode(['roomType' => RoomType::findOrFail($id)]);
        }
        $roomType = RoomType::findOrFail($id);
        return $this->store($request, $roomType);
    }

    /**
     * @param $id
     * @return string
     */
    public function delete($id)
    {
        return (string) RoomType::findOrFail($id)->delete();
    }
} 