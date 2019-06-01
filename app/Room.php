<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Room
 * @package App
 *
 *
 * @property integer $id
 * @property integer $floor
 * @property integer $status
 * @property integer $type_id
 * @property string $last_washing_date
 * @property bool $need_wash
 * @property integer $number_of_beds
 * @property integer $main_photo_id
 */
class Room extends Model
{
    const MAXIMUM_ROOM_NUMBER = 36;
    const MAXIMUM_FLOOR = 3;

    const STATUSES = [
        0 => 'ready',
        1 => 'little problematic',
        2 => 'booked',
        3 => 'unusable'
    ];

    /**
     * @var string
     */
    protected $table = 'rooms';

    /**
     * @var array
     */
    protected $fillable = [
        'id',
        'floor',
        'status',
        'type_id',
        'last_washing_date',
        'need_wash',
        'number_of_beds',
        'main_photo_id'
    ];

    /**
     * @var array
     */
    public $rules = [
        'floor' => 'required|integer|max:3',
        'status' => 'required|integer|max:8'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return Facility[]
     */
    public function facilities()
    {
        $connects = FacilityConnect::select('id')->where('room_id', $this->id);
        return Facility::whereIn('id', $connects)->get();
    }

    /**
     * @return bool
     */
    public function flushFacilities()
    {
        return FacilityConnect::where('room_id', $this->id)->delete();
    }

    /**
     * @param $facilities
     * @return $this
     */
    public function setFacilities($facilities)
    {
        foreach ($facilities as $facility) {
            $facilityConnect = new FacilityConnect();
            $facilityConnect->room_id = $this->id;
            $facilityConnect->facility_id = is_object($facility) ? $facility->id : $facility['id'];
            $facilityConnect->save();
        }
        return $this;
    }

    /**
     * @param $id
     * @return bool
     */
    public static function isExist($id)
    {
        return self::find($id) !== null;
    }

    /**
     * @return self
     */
    public static function createPlug()
    {
        $id = self::MAXIMUM_ROOM_NUMBER + 1;
        $floor = self::MAXIMUM_FLOOR + 1;
        $plug = Room::firstOrNew([
            'id' => $id,
            'floor' => $floor,
            'status' => 0,
            'type_id' => null,
            'last_washing_date' => date('Y-m-d H:i:s'),
            'need_wash' => 0,
            'number_of_beds' => 0
        ]);
        return $plug;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne|File|null
     */
    public function photo()
    {
        return $this->hasOne(File::class, 'id', 'main_photo_id');
    }

    /**
     * @return bool
     */
    public function deleteMainPhoto()
    {
        if ($this->main_photo_id !== null) return $this->photo->delete();
        return false;
    }

    /**
     * @return Room[]
     */
    public static function getUsableRoomsByTypeId($typeId)
    {
        return self::where('status', '<=', 2)->where('type_id', $typeId)->get();
    }

}
