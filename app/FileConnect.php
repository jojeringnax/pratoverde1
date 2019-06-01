<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class FileConnect
 * @package App
 *
 * @property integer $file_id
 * @property integer $foreign_id
 * @property integer $type
 *
 */
class FileConnect extends Model
{
    const TYPES = [
        'article' => 0,
    ];

    /**
     * @var string
     */
    protected $table = 'files_connect';

    /**
     * @var array
     */
    protected $fillable = [
        'file_id',
        'foreign_id',
        'type'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;
}
