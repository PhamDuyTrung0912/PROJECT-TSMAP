<?php

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

Route::post('/resetPassword', 'App\Http\Controllers\AuthController@resetPassword');
Route::post('/password/confirm/{id}/{userType}/{hash}', 'App\Http\Controllers\AuthController@confirmResetPassword')->name('password.confirmReset');
Route::get('/password/reset/{id}/{userType}/{hash}', 'App\Http\Controllers\AuthController@redirectResetPassword')->name('password.redirect');

Route::post('/email/resend', 'App\Http\Controllers\AuthController@resend')->name('verification.resend');
Route::get('/email/verify/{id}/{hash}', 'App\Http\Controllers\AuthController@verify')->name('verification.verify');


Route::prefix('map/layers')->group(function () {
    Route::get('/', 'App\Http\Controllers\LayerController@index');
});

Route::prefix('provinces')->group(function () {
    Route::get('/', 'App\Http\Controllers\ProvinceController@index');
});

Route::prefix('districts')->group(function () {
    Route::get('/', 'App\Http\Controllers\DistrictController@index');

    Route::get('/by_province/{id}', 'App\Http\Controllers\DistrictController@byProvince');
});

Route::prefix('wards')->group(function () {
    Route::get('/', 'App\Http\Controllers\WardController@index');

    Route::get('/by_district/{id}', 'App\Http\Controllers\WardController@byDistrict');
});

Route::prefix('cemetery_country')->group(function () {
    Route::get('/', 'App\Http\Controllers\CemeteryCountryController@index');
    
    Route::get('/select', 'App\Http\Controllers\CemeteryCountryController@select');
});

Route::prefix('cemetery_single')->group(function () {

    Route::post('/byFilter', 'App\Http\Controllers\CemeterySingleController@byFilter');

    Route::get('/status', 'App\Http\Controllers\CemeterySingleController@status_map');

    Route::get('/{id}', 'App\Http\Controllers\CemeterySingleController@show');
});

Route::prefix('trees')->group(function () {
    Route::get('/', 'App\Http\Controllers\TreeController@index');

    Route::get('/{id}', 'App\Http\Controllers\TreeController@show');

    Route::post('/{id}', 'App\Http\Controllers\TreeController@update');

    Route::post('/', 'App\Http\Controllers\TreeController@create');

    Route::delete('/{id}', 'App\Http\Controllers\TreeController@delete');
});

Route::prefix('tree_users')->group(function () {
    Route::get('/', 'App\Http\Controllers\TreeUserController@index');

    Route::get('/byTree/{id}', 'App\Http\Controllers\TreeUserController@byTree');

    Route::get('/{id}', 'App\Http\Controllers\TreeUserController@show');

    Route::post('/nodeTree', 'App\Http\Controllers\TreeUserController@updateNodeTree');

    Route::post('/{id}', 'App\Http\Controllers\TreeUserController@update');

    Route::post('/', 'App\Http\Controllers\TreeUserController@create');

    Route::delete('/{id}', 'App\Http\Controllers\TreeUserController@delete');
});

//Aws s3 storage
Route::prefix('s3')->group(function () {
    Route::post('/upload', 'App\Http\Controllers\Aws\UploadFileController@upload');
});



Route::group(['middleware' => ['auth:map_admin', 'verified', 'logs']], function () {



    Route::prefix('index')->group(function () {
        Route::get('/cemeteries', 'App\Http\Controllers\IndexController@indexCemeteries');
    });

    // attachments
    Route::prefix('attachments')->group(function () {
        Route::get('/', 'App\Http\Controllers\AttachmentController@index');

        Route::get('/{attachment}', 'App\Http\Controllers\AttachmentController@show');

        Route::post('/', 'App\Http\Controllers\AttachmentController@create');

        Route::post('/{id}', 'App\Http\Controllers\AttachmentController@update');

        Route::delete('/{attachment}', 'App\Http\Controllers\AttachmentController@delete');
    });

    Route::prefix('countries')->group(function () {
        Route::get('/', 'App\Http\Controllers\CountryController@index');

        Route::get('/{id}', 'App\Http\Controllers\CountryController@show');

        Route::post('/{id}', 'App\Http\Controllers\CountryController@update');

        Route::post('/', 'App\Http\Controllers\CountryController@create');

        Route::delete('/{id}', 'App\Http\Controllers\CountryController@delete');
    });

    Route::prefix('cemetery_country')->group(function () {

        Route::get('/{id}', 'App\Http\Controllers\CemeteryCountryController@show');

        Route::post('/{id}', 'App\Http\Controllers\CemeteryCountryController@update');

        Route::post('/', 'App\Http\Controllers\CemeteryCountryController@create');

        Route::delete('/{id}', 'App\Http\Controllers\CemeteryCountryController@delete');
    });

    Route::prefix('cemetery_single_type')->group(function () {
        Route::get('/', 'App\Http\Controllers\CemeterySingleTypeController@index');

        Route::get('/{id}', 'App\Http\Controllers\CemeterySingleTypeController@show');

        Route::post('/{id}', 'App\Http\Controllers\CemeterySingleTypeController@update');

        Route::post('/', 'App\Http\Controllers\CemeterySingleTypeController@create');

        Route::delete('/{id}', 'App\Http\Controllers\CemeterySingleTypeController@delete');
    });

    Route::prefix('cemetery_area')->group(function () {
        Route::get('/', 'App\Http\Controllers\CemeteryAreaController@index');

        Route::get('/{id}', 'App\Http\Controllers\CemeteryAreaController@show');

        Route::post('/{id}', 'App\Http\Controllers\CemeteryAreaController@update');

        Route::post('/', 'App\Http\Controllers\CemeteryAreaController@create');

        Route::delete('/{id}', 'App\Http\Controllers\CemeteryAreaController@delete');
    });

    Route::prefix('cemetery_single')->group(function () {

        Route::get('/', 'App\Http\Controllers\CemeterySingleController@index');

        Route::post('/{id}', 'App\Http\Controllers\CemeterySingleController@update');

        Route::post('/', 'App\Http\Controllers\CemeterySingleController@create');

        Route::delete('/{id}', 'App\Http\Controllers\CemeterySingleController@delete');
    });

    Route::prefix('geojsons')->group(function () {
        Route::get('/', 'App\Http\Controllers\Map\LayerController@getAppGeojsons');

        Route::get('/{path}', 'App\Http\Controllers\Map\LayerController@getGeojsonByPath');
    });
});