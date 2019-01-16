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
     */
    public function store(Request $request, $id = null)
    {
        $room = Room::findOrNew($id);
        $room->fill($request);
        return $room;
    }
}