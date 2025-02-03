<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::inertia('/pages/pageone', 'Page')->name('pages.pageone');
Route::inertia('/pages/pagetwo', 'Page')->name('pages.pagetwo');

Route::inertia('/pages/error', 'Error')->name('pages.error');
Route::inertia('/pages/error400', 'Error', ['status' => 400])->name('pages.error400');
Route::inertia('/pages/error403', 'Error', ['status' => 403])->name('pages.error403');
Route::inertia('/pages/error404', 'Error', ['status' => 404])->name('pages.error404');
Route::inertia('/pages/error500', 'Error', ['status' => 500])->name('pages.error500');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
