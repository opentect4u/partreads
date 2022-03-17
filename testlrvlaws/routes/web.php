<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/upload',[App\Http\Controllers\publisher\BookController::class,'Show'])->name('upload');

Route::post('/upload', [App\Http\Controllers\publisher\BookController::class,'UplodBook'])->name('uploadcreate');

Route::get('/mytest',[App\Http\Controllers\TestController::class,'Show'])->name('mytest');
