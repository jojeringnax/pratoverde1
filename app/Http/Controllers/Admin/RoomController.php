<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Room;
use App\RoomType;
use Illuminate\Http\Request;

class RoomController extends Controller
{

    /**
     * @return string
     */
    public function index()
    {
        return Room::all()->toJson();
    }

    /**
     * @param Request $request
     * @param Room $room
     * @return Room
     */
    public function store(Request $request, Room $room)
    {
        if ($room === null) {
            return response(json_encode(['id' => null, 'message' => 'Room not found', 'code' => 1]), 500);
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
        if ($request->isMethod('get')) {
            return json_encode(['types' => RoomType::all()]);
        };
        $room = new Room();
        $id = $request->post('id');
        if (Room::findOrFail($id) !== null) {
            return response(json_encode(['id' => $id, 'message' => 'Room already exists', 'code' => 2]), 500);
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
        if ($request->isMethod('get')) {
            return json_encode(['room' => Room::findOrFail($id), 'types' => RoomType::all()]);
        }
        $room = Room::findOrFail($id);
        return $this->store($request, $room);
    }

    /**
     * @param $id
     * @return boolean
     */
    public function delete($id)
    {
        return (string) Room::findOrFail($id)->delete();
    }
}