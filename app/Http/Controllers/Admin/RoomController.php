<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{

    /**
     * @return string
     */
    public function index()
    {
        $rooms = Room::all();
        return $rooms->toJson();
    }

    /**
     * @param Request $request
     * @param Room $room
     * @return Room
     */
    public function store(Request $request, Room $room)
    {
        if ($room === null) {
            return response()->setStatusCode(500)->setContent(json_encode(['id' => null, 'message' => 'Room not found']));
        }
        $room->fill($request->post());
        $room->save();
        return $room;
    }

    /**
     * @param Request $request
     * @return Room
     */
    public function create(Request $request)
    {
        $room = new Room();
        $id = $request->post('id');
        if (Room::findOrFail($id) !== null) {
            return response()->setStatusCode(500)->setContent(json_encode(['id' => $id, 'message' => 'Room already exists']));
        }
        return $this->store($request, $room);
    }

    /**
     * @param Request $request
     * @param $id
     * @return Room
     */
    public function update(Request $request, $id)
    {
        $room = Room::findOrFail($id);
        return $this->store($request, $room);
    }
}