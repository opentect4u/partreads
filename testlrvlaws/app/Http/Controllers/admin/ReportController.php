<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TdBuyBookPages;
use DB;
use App\Models\TdReport;

class ReportController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('is_admin');
    // }
    public function ShowUser(Request $request)
    {
        $id=$request->table_id;
        // return $id;
        if ($id!='') {
        // return $id;
            $data=TdReport::where('user_type','U')
                ->where('_id',$id)
                ->with('UserName')->get();
        } else {
            $data=TdReport::where('user_type','U')->with('UserName')->get();
        }
        

        return response()->json( [
                'success' => 1,
                'message' =>$data
            ], 201 );
    }

    // public function UserDetails(Request $request)
    // {
    //     $id=$request->id;
    // }

    public function ShowPublisher(Request $request)
    {
        $id=$request->table_id;
        if ($id!='') {
            $data=TdReport::where('user_type','P')
            ->where('_id',$id)
            ->with('PublisherName')->get();
        } else {
            $data=TdReport::where('user_type','P')->with('PublisherName')->get();
        }
        

        return response()->json( [
                'success' => 1,
                'message' =>$data
            ], 201 );
    }


}
