<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class File
 * @package App
 *
 * @property integer $id
 * @property string $created_at
 * @property string $updated_at
 * @property integer $size
 * @property integer $size_x
 * @property integer $size_y
 * @property string $path
 * @property string $type
 */
class File extends Model
{
    /**
     * @var string
     */
    protected $table = 'files';

    /**
     * @var array
     */
    protected $fillable = [
        'size',
        'size_x',
        'size_y',
        'path',
        'type'
    ];

    /**
     * @var bool
     */
    public $timestamps = true;

    const TYPES = [
        'photo' => 0
        ];


    /**
     * File constructor.
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }
}
