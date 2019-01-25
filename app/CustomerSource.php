<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


/**
 * Class CustomerSource
 * @package App
 *
 * @property integer $id
 * @property string $name
 * @property string $link
 */
class CustomerSource extends Model
{
    /**
     * @var string
     */
    protected $table = 'customer_sources';

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @var array
     */
    public $fillable = [
        'name',
        'link'
    ];
}
