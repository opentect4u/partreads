<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TdBuyBookPages;
use App\Models\TdRating;
use App\Models\TdPrintBook;
use DB;

class PrintBookController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('is_admin');
    // }
    
    public function Show()
    {
        $ratings=TdPrintBook::with('BookName')
            ->with('UserName')
            ->with('PublisherName')
            ->get();

        return response()->json( [
                    'success' => 1,
                    'message' =>$ratings
                    ], 200 );
    }

    public function ShowRating(Request $request){
        $id=$request->id;
        $user_id=$request->user_id;
        $user_status=$request->Show_flag;
        // return $id;
        if($user_status=="Y"){
            $alluser=DB::table('td_ratings')
                        ->where('_id',$request->id)
                        ->update([
                            'Show_flag' => "Y",
                            'updated_at' =>date('Y-m-d H:i:s')
                        ]);
            if($alluser>0){
                $users=TdRating::where('_id',$request->id)->get();
                return response()->json( [
                    'success' => 1,
                    'message' =>$users
                    ], 200 );
            }else{
                return response()->json( [
                    'success' => 0,
                    'message' =>"error"
                    ], 200 );
            }
        }else if($user_status=="N"){
            $alluser=DB::table('td_ratings')
                        ->where('_id',$request->id)
                        ->update([
                            'Show_flag' => "N",
                            'updated_at' =>date('Y-m-d H:i:s')
                        ]);
            if($alluser>0){
                $users=TdRating::where('_id',$request->id)->get();
                return response()->json( [
                    'success' => 1,
                    'message' =>$users
                    ], 200 );
            }else{
                return response()->json( [
                    'success' => 0,
                    'message' =>"error"
                    ], 200 );
            }
        }
    }
}
