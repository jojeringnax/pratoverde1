<?php

namespace App\Http\Controllers\Admin;

use App\Booking;
use App\Room;
use App\RoomConnect;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BookingController extends Controller
{
    /**
     * @var string
     */
    private $modelName = Booking::class;

    /**
     * @return string
     */
    public function index()
    {
        return $this->modelName::all()->toJson();
    }

    /**
     * @param Request $request
     * @param Booking $booking
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function store(Request $request, Booking $booking)
    {
        if ($booking === null) {
            return response(json_encode(['category' => 'bookings', 'id' => null, 'message' => 'Booking not found', 'code' => 1]), 500);
        }
        $booking->fill($request->post());
        $booking->save();
        if ($guestsNumber = $request->post('guests_number')) {
            if (!($room_id = $request->post('room_id')) || $room_id === null) {
                $roomId = Room::createPlug()->id;
            } else {
                if (!Room::isExist($room_id)) {
                    return response(json_encode(['category' => 'rooms', 'id' => $room_id, 'message' => 'Room not found', 'code' => 3]), 500);
                }
                $roomId = $room_id;
            }
            $roomConnect = new RoomConnect();
            $roomConnect->room_id = $roomId;
            $roomConnect->booking_id = $booking->id;
            $roomConnect->guests_number = $guestsNumber;
            $roomConnect->save();
        }
        return $booking->toJson();
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
     * @return boolean
     */
    public function delete($id)
    {
        return (string) $this->modelName::findOrFail($id)->delete();
    }
}
