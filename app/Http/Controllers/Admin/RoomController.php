<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Room;

class RoomController extends Controller
{
    public function index() {

        $rooms = Room::all();

        return $rooms->toJson();

    }
}