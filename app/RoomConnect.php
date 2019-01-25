<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


/**
 * Class RoomConnect
 * @package App
 *
 * @property integer $room_id
 * @property integer $booking_id
 * @property integer $guests_number
 */
class RoomConnect extends Model
{
    /**
     * @var string
     */
    protected $table = 'room_connects';

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @var array
     */
    public $fillable = [
        'room_id',
        'booking_id',
        'guests_number'
    ];
}
