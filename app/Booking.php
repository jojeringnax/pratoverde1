<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Booking
 * @package App
 *
 * @property integer $id
 * @property int $customer_id
 * @property string $check_in
 * @property string $check_out
 * @property string $created_at
 * @property string $updated_at
 * @property integer $price
 * @property integer $pay_method
 * @property int $status
 *
 */
class Booking extends Model
{
    const STATUSES = [
        0 => 'Not approved',
        1 => 'Approved'
    ];

    /**
     * @var string
     */
    protected $table = 'bookings';

    /**
     * @var array
     */
    protected $fillable = [
        'customer_id',
        'check_in',
        'check_out',
        'price',
        'pay_method',
        'status'
    ];

    /**
     * @var array
     */
    public $rules = [
        'status' => 'required|integer|max:8'
    ];

    /**
     * @var bool
     */
    public $timestamps = true;
}
