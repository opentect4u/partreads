<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\MdUserLogin;
use App\Models\TdPublisherDetails;

class PublisherController extends Controller
{
	// public function __construct()
 //    {
 //        $this->middleware('is_admin');
 //    }
	
    public function Show()
    {
    	$publisher=MdUserLogin::where('user_type','P')->get();
    	// return $publisher;
    	return response()->json( [
                    'success' => 1,
                    'message' =>$publisher
                    ], 200 );
    }

    public function Details(Request $request)
    {
        $publisher_id=$request->id;
        $users=TdPublisherDetails::where('publisher_id',$publisher_id)->get();

        return response()->json( [
                    'success' => 1,
                    'message' =>$users,
                    ], 200 );
    }
}
