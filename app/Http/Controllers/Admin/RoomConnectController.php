<?php

namespace App\Http\Controllers\Admin;

use App\RoomConnect;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoomConnectController extends Controller
{
    /**
     * @var string
     */
    private $modelName = RoomConnect::class;


    /**
     * @param Request $request
     * @param RoomConnect $roomConnect
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function store(Request $request, RoomConnect $roomConnect)
    {
        if ($roomConnect === null) {
            return response(json_encode(['category' => 'roomConnects', 'id' => null, 'message' => 'RoomConnect not found', 'code' => 1]), 500);
        }
        $roomConnect->fill($request->post());
        $roomConnect->save();
        return $roomConnect->toJson();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function create(Request $request)
    {
        $roomConnect = new $this->modelName();
        return $this->store($request, $roomConnect);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function update(Request $request, $id)
    {
        $roomConnect = $this->modelName::findOrFail($id);
        return $this->store($request, $roomConnect);
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
