<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    const STATUSES = [
        0 => 'Готова',
        1 => ''
    ];

    protected $table = 'rooms';

    protected $fillable = [
        'id',
        'floor',
        'status',
        'type_id',
        'last_washing_date',
        'need_wash',
        'number_of_beds',
    ];

    public $rules = [
        'floor' => 'required|integer|max:1',
        'status' => 'required|integer|max:1'
    ];

    public $timestamps = false;
}
