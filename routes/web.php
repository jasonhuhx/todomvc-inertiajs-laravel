<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodoController;

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
    return redirect()->route('todos.index');
});

Route::patch('/todos/batch', [TodoController::class, 'batchUpdate'])->name('todos.batchUpdate');
Route::post('/todos/destroy-completed', [TodoController::class, 'destroyCompleted'])->name('todos.destroyCompleted');
Route::resources([
    'todos' => TodoController::class,
]);

require __DIR__.'/auth.php';
