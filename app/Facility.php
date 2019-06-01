<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Facility
 * @package App
 *
 * @property int $id
 * @property string $name
 */
class Facility extends Model
{
    /**
     * @var string
     */
    protected $table = 'facilities';

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
