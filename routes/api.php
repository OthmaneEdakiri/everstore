<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(static function () {
    Route::apiResources([
        'categories' => CategorieController::class,
        'products' => ProductController::class,
        'orders'=>OrderController::class
    ]);
    Route::post('/categories/delete', [CategorieController::class, 'destroyall']);
    Route::post('/products/delete', [ProductController::class, 'destroyall']);

    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers/delete', [CustomerController::class, 'destroyall']);
});

Route::middleware(['auth:sanctum'])->group(static function () {
    Route::apiResources([
        'carts' => CartController::class,
        'orders' => OrderController::class
    ]);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
