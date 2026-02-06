<?php

use Illuminate\Support\Facades\Route;

Route::get('/{path?}', fn () => view('home'))->where('path', '.*');
