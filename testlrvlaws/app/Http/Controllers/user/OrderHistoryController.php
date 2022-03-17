<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\TdUserDetails;
use App\Models\TdPublisherBookDetails;
use App\Models\TdPublisherSplitBookDetails;
use App\Models\TdBuyBookPages;
use App\Models\MdUserLogin;
use App\Models\TdBuyBookPayment;
use Carbon\Carbon;

class OrderHistoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_user');
    }

    public function OrderHistory(Request $request){
        $user_id=$request->id;
        if ($request->frm_date!='' && $request->to_date!='') {
            // return "if";
            $start_date=Carbon::parse($request->frm_date)->format('Y-m-d');
            $end_date=Carbon::parse($request->to_date)->format('Y-m-d');
                // return $start_date;                
            // ->whereBetween('date', [1, 100])

            $order_details=TdBuyBookPayment::with('BookDetails')
                    ->where('user_id',$user_id)
                    ->whereBetween('date', [$start_date, $end_date])
                    ->orderBy('date','desc')
                    ->get();
            
        } else {
            // return "else";
            $order_details=TdBuyBookPayment::with('BookDetails')
                    ->where('user_id',$user_id)
                    ->orderBy('date','desc')
                    ->get();
        }
        // $order_details=TdBuyBookPayment::with('BookDetails')
        //             ->where('user_id',$user_id)
        //             ->get();

        return response()->json( [
                'success' => 1,
                'message' =>$order_details
            ], 200 );
    }
}
