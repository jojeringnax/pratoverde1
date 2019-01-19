<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Room
 * @package App
 */
class Room extends Model
{
    const STATUSES = [
        0 => 'Готова',
        1 => ''
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
    ];

    /**
     * @var array
     */
    public $rules = [
        'floor' => 'required|integer|max:1',
        'status' => 'required|integer|max:1'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;

}
