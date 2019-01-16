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
        $room->fill($request);
        return $room;
    }

    public function create(Request $request)
    {
        return var_dump($request);

    }
}