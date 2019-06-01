<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Problem
 * @package App
 *
 * @property integer $id
 * @property string $created_at
 * @property string $update_at
 * @property integer $room_id
 * @property string $title
 * @property string $content
 * @property integer $status
 * @property integer $parent_id
 * @property integer $category_id
 */
class Problem extends Model
{
    const STATUSES = [
        0 => 'Добавлена',
        1 => 'В работе',
        2 => 'Неопределенный',
        3 => 'Завершена'
    ];

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
    public $timestamps = true;
}
