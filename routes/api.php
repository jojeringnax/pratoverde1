<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('get_config', function () {
    return json_encode(['rooms_number' => \App\Room::MAXIMUM_ROOM_NUMBER, 'floors_number' => \App\Room::MAXIMUM_FLOOR]);
});

/**
 * Room routes
 */
Route::get('admin/rooms', 'Admin\RoomController@index');
Route::post('admin/rooms/create', 'Admin\RoomController@create');
Route::post('admin/rooms/update/{id}', 'Admin\RoomController@update');
Route::delete('admin/rooms/delete/{id}', 'Admin\RoomController@delete');

Route::get('room/{id}', function ($id) {
   return \App\Room::findOrFail($id)->toJson();
});

        /**
         * RoomConnect routes
         */
        Route::post('admin/room_connects/create', 'Admin\RoomConnectController@create');
        Route::post('admin/room_connects/update/{id}', 'Admin\RoomConnectController@update');
        Route::delete('admin/room_connects/delete/{id}', 'Admin\RoomConnectController@delete');

        Route::get('room_connect/{id}', function($id) {
            return \App\Customer::findOrFail($id)->toJson();
        });

        /**
         * RoomType routes
         */
        Route::get('admin/room_types', 'Admin\RoomTypeController@index');
        Route::post('admin/room_types/create', 'Admin\RoomTypeController@create');
        Route::post('admin/room_types/update/{id}', 'Admin\RoomTypeController@update');
        Route::delete('admin/room_types/delete/{id}', 'Admin\RoomTypeController@delete');

        Route::get('room_type/{id}', function($id) {
            return \App\RoomType::findOrFail($id)->toJson();
        });


        /**
         * Facilities routes
         */
        Route::get('admin/facilities', 'Admin\FacilityController@index');
        Route::post('admin/facilities/create', 'Admin\FacilityController@create');
        Route::post('admin/facilities/update/{id}', 'Admin\FacilityController@update');
        Route::delete('admin/facilities/delete/{id}', 'Admin\FacilityController@delete');

        Route::get('facility/{id}', function($id) {
            return \App\Facility::findOrFail($id)->toJson();
        });



/**
 * Problem routes
 */
Route::get('admin/problems', 'Admin\ProblemController@index');
Route::post('admin/problems/create', 'Admin\ProblemController@create');
Route::post('admin/problems/update/{id}', 'Admin\ProblemController@update');
Route::delete('admin/problems/delete/{id}', 'Admin\ProblemController@delete');

Route::get('problem/{id}', function($id) {
    return \App\Problem::findOrFail($id)->toJson();
});
        /**
         * ProblemCategory routes
         */
        Route::get('admin/problem_categories', 'Admin\ProblemCategoryController@index');
        Route::post('admin/problem_categories/create', 'Admin\ProblemCategoryController@create');
        Route::post('admin/problem_categories/update/{id}', 'Admin\ProblemCategoryController@update');
        Route::delete('admin/problem_categories/delete/{id}', 'Admin\ProblemCategoryController@delete');

        Route::get('problem_category/{id}', function($id) {
            return \App\ProblemCategory::findOrFail($id)->toJson();
        });


/**
 * Customer routes
 */
Route::get('admin/customers', 'Admin\CustomerController@index');
Route::post('admin/customers/create', 'Admin\CustomerController@create');
Route::post('admin/customers/update/{id}', 'Admin\CustomerController@update');
Route::delete('admin/customers/delete/{id}', 'Admin\CustomerController@delete');

Route::get('customer/{id}', function($id) {
    return \App\Customer::findOrFail($id)->toJson();
});


        /**
         * CustomerSource routes
         */
        Route::get('admin/customer_sources', 'Admin\CustomerSourceController@index');
        Route::post('admin/customer_sources/create', 'Admin\CustomerSourceController@create');
        Route::post('admin/customer_sources/update/{id}', 'Admin\CustomerSourceController@update');
        Route::delete('admin/customer_sources/delete/{id}', 'Admin\CustomerSourceController@delete');

        Route::get('customer_source/{id}', function($id) {
            return \App\CustomerSource::findOrFail($id)->toJson();
        });




/**
 * Article routes
 */
Route::post('admin/articles/create', 'Admin\ArticleController@create');
Route::post('admin/articles/update/{id}', 'Admin\ArticleController@update');
Route::delete('admin/articles/delete/{id}', 'Admin\ArticleController@delete');

Route::get('article/{id}', function($id) {
    return \App\Article::findOrFail($id)->toJson();
});



/**
 * Files routes
 */
Route::post('admin/files/create', 'Admin\FileController@create');
Route::delete('admin/files/delete/{id}', 'Admin\FileController@delete');

Route::get('file/{id}', function($id) {
    return \App\File::findOrFail($id)->toJson();
});

/**
 * Booking routes
 */
Route::get('admin/bookings', 'Admin\BookingController@index');
Route::post('admin/bookings/create', 'Admin\BookingController@create');
Route::post('admin/bookings/update/{id}', 'Admin\BookingController@update');
Route::delete('admin/bookings/delete/{id}', 'Admin\BookingController@delete');

Route::get('booking/{id}', function($id) {
    return \App\Booking::findOrFail($id)->toJson();
});