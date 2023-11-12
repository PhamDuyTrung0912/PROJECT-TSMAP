<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Map\Connection;
use App\Models\Map\Dialog;
use App\Models\Layer;
use App\Models\Map\OpendatasoftApi;
use App\Models\Map\SubGroup;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Exception;
use stdClass;

class LayerController extends Controller
{
  public function index()
  {
    $layers = Layer::on('map')->get();
    return response()->json($layers);
  }
}
