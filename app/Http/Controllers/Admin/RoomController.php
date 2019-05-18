<?php
namespace App\Http\Controllers\Admin;

use App\File;
use App\Http\Controllers\Controller;
use App\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function store(Request $request, Room $room)
    {
        if ($room === null) {
            return response(json_encode(['category' => 'rooms', 'id' => null, 'message' => 'Room not found', 'code' => 1]), 500);
        }
        if ($facilities = $request->post('facilities')) {
            $room->flushFacilities();
            $room->setFacilities($facilities);
        }
        $this->uploadMainPhotos($request, $room);
        $room->fill($request->post());
        $room->save();
        $files = $request->post('files');
        foreach ($files as $index => $file) {
            File::savePhotoInStorageFromBase64($file, $index, $room->id);
        }
        return $room->toJson();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function create(Request $request)
    {
        $room = new Room();
        $id = $request->post('id');
        if (Room::find($id) !== null) {
            return response(json_encode(['category' => 'rooms', 'id' => $id, 'message' => 'Room already exists', 'code' => 2]), 500);
        }
        return $this->store($request, $room);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function update(Request $request, $id)
    {
        $room = Room::findOrFail($id);
        $room->deleteMainPhoto();
        return $this->store($request, $room);
    }

    /**
     * @param $id
     * @return string
     */
    public function delete($id)
    {
        return (string) Room::findOrFail($id)->delete();
    }

    /**
     * @param Request $request
     * @param Room $room
     * @return bool
     */
    public function uploadMainPhotos(Request $request, Room $room)
    {
        $photo = $request->file('main_photo');
        if ($photo === null) return false;
        $path = 'rooms/' . $room->id . '_main.' . $photo->getClientOriginalExtension();
        Storage::disk('public')->put($path, file_get_contents($photo->getPathname()));
        $photo = new File();
        $photo->path = '/storage/' . $path;
        $photo->size = $photo->getSize();
        $photo->size_x = getimagesize($photo->getPathname())[0];
        $photo->size_y = getimagesize($photo->getPathname())[1];
        $photo->type = File::TYPES['photo'];
        $photo->save();
        $room->update([
            'main_photo_id' => $photo->id,
        ]);
        return true;
    }
}