<?php
/**
 * Created by PhpStorm.
 * User: Броненосец
 * Date: 25.01.2019
 * Time: 11:06
 */

namespace App\Http\Controllers;


use App\Room;

class TestController extends Controller
{

    public function index()
    {
        return view('test');
    }

}