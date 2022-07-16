<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['middleware' => 'auth:sanctum'], function (){
    Route::get('/all', [\App\Http\Controllers\SpaController::class, 'all']);
    Route::get('/get/{id}', [\App\Http\Controllers\SpaController::class, 'show']);
    Route::put('/update/{id}', [\App\Http\Controllers\SpaController::class, 'update']);
    Route::post('/save', [\App\Http\Controllers\SpaController::class, 'save']);
    Route::delete('/del/{id}', [\App\Http\Controllers\SpaController::class, 'delete']);
});


