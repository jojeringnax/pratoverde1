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

/**
 * Room routes
 */
Route::get('admin/rooms', 'Admin\RoomController@index');
Route::post('admin/rooms/create', 'Admin\RoomController@create');
Route::get('admin/rooms/update/{id}', 'Admin\RoomController@update');
Route::post('admin/rooms/update/{id}', 'Admin\RoomController@update');
Route::delete('admin/rooms/delete/{id}', 'Admin\RoomController@delete');


/**
 * RoomType routes
 */
Route::get('admin/room_types', 'Admin\RoomTypeController@index');
Route::post('admin/room_types/create', 'Admin\RoomTypeController@create');
Route::post('admin/room_types/update/{id}', 'Admin\RoomTypeController@update');
Route::delete('admin/room_types/delete/{id}', 'Admin\RoomTypeController@delete');

Route::get('admin/room_type/{id}', function($id) {
   return \App\RoomType::find($id);
});


/**
 * Problem routes
 */
Route::get('admin/problems', 'Admin\ProblemCotroller@index');
Route::post('admin/problems/create', 'Admin\ProblemCotroller@create');
Route::get('admin/problems/update/{id}', 'Admin\ProblemCotroller@update');
Route::post('admin/problems/update/{id}', 'Admin\ProblemCotroller@update');
Route::delete('admin/problems/delete/{id}', 'Admin\ProblemCotroller@delete');

/**
 * ProblemCategory routes
 */
Route::get('admin/problem_categories', 'Admin\ProblemCategoryController@index');
Route::post('admin/problem_categories/create', 'Admin\ProblemCategoryController@create');
Route::post('admin/problem_categories/update/{id}', 'Admin\ProblemCategoryController@update');
Route::delete('admin/problem_categories/delete/{id}', 'Admin\ProblemCategoryController@delete');