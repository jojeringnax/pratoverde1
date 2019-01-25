<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


/**
 * Class RoomType
 * @package App
 *
 * @property integer $id
 * @property string $name
 */
class RoomType extends Model
{
    /**
     * @var string
     */
    protected $table = 'room_types';

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @var array
     */
    public $fillable = [
        'name'
    ];

}
