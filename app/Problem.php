<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Problem
 * @package App
 */
class Problem extends Model
{

    /**
     * @var string
     */
    protected $table = 'problems';

    /**
     * @var array
     */
    protected $fillable = [
        'room_id',
        'title',
        'content',
        'status',
        'parent_id',
        'category_id'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;
}
