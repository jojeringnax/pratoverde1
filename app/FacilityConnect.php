<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class FacilityConnect
 * @package App
 *
 * @property integer $id
 * @property integer $room_id
 * @property integer $facility_id
 *
 */
class FacilityConnect extends Model
{
    /**
     * @var string
     */
    protected $table = 'facility_connects';

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @var array
     */
    public $fillable = [
        'room_id',
        'facility_id'
    ];
}
