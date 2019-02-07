<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


/**
 * Class Customer
 * @package App
 *
 * @property integer $id
 * @property string $created_at
 * @property string $updated_at
 * @property string $surname
 * @property string $name
 * @property integer $source_id
 * @property integer $phone_number
 *
 */
class Customer extends Model
{
    /**
     * @var string
     */
    protected $table = 'customers';

    /**
     * @var array
     */
    protected $fillable = [
        'surname',
        'name',
        'source_id',
        'phone_number',
        'email'
    ];

    /**
     * @var bool
     */
    public $timestamps = true;
}
