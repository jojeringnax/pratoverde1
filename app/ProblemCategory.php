<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ProblemCategory
 * @package App
 *
 * @property int $id
 * @property string $name
 *
 */
class ProblemCategory extends Model
{
    /**
     * @var string
     */
    protected $table = 'problem_categories';

    /**
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;

}
