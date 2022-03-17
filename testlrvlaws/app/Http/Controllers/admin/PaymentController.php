<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TdBuyBookPages;
use App\Models\TdRating;
use App\Models\TdPrintBook;
use App\Models\TdBuyBookPayment;
use DB;
use Carbon\Carbon;
use App\Models\TdPublisherPayment;

class PaymentController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('is_admin');
    // }
    
    public function Show(Request $request)
    {
        if ($request->frm_date!='' && $request->to_date!='') {
            $start_date=Carbon::parse($request->frm_date)->format('Y-m-d');
            $end_date=Carbon::parse($request->to_date)->format('Y-m-d');

            $ratings=TdBuyBookPayment::with('BookDetails')
                    // ->where('user_id',$user_id)
                    ->whereBetween('date', [$start_date, $end_date])
                    ->get();
        } else {
            $ratings=TdBuyBookPayment::with('BookDetails')
                    // ->where('user_id',$user_id)
                    ->get();
        }

        return response()->json( [
                    'success' => 1,
                    'message' =>$ratings
                    ], 200 );
    }


    public function PayCommissionManage(Request $request)
    {
        $fromDate = Carbon::now()->subMonth()->startOfMonth()->toDateString();
        $tillDate = Carbon::now()->subMonth()->endOfMonth()->toDateString();
        $this_month = Carbon::now()->startOfMonth()->toDateString();
        $today=date('Y-m-d');
        // return $this_month;
        $data=TdBuyBookPayment::groupBy('publisher_id')->with('PublisherDetails')->get();
        // return $data;
        $data1=[];
        foreach ($data as $value) {
            $publisher_id=$value->publisher_id;
            $payment=TdPublisherPayment::where('publisher_id',$publisher_id)
                ->whereBetween('date', [$this_month, $today])
                // ->whereMonth('date', $today)
                // ->whereDate('date','<=',$this_month)->whereDate('date','>=',$today)
                // ->whereDateBetween('date',$this_month,$today)
                ->get();
                // return $payment;
            if (count($payment)>0) {
                $paid_flag='Y';
            } else {
                $paid_flag='N';
            }
            
            $one_pub=TdBuyBookPayment::where('publisher_id',$publisher_id)
                ->whereBetween('date', [$fromDate, $tillDate])
                ->get();
            $total_price=0;
            foreach ($one_pub as $key => $one) {
                $total_price=$total_price + $one->total_price;
            }
            // $value1->publisher_id=$publisher_id;
            $value->total_price=$total_price;
            $value->paid_flag=$paid_flag;
            array_push($data1,$value);
        }
        // return $data1;
        return response()->json( [
                    'success' => 1,
                    'message' =>$data1
                    ], 200 );

    }

    public function PayCommission(Request $request)
    {
        $publisher_id=$request->publisher_id;
        $amount=$request->amount;
        $date=date('Y-m-d H:i:s');
        $fromDate= Carbon::now()->subMonth()->startOfMonth()->toDateString();
        $order_id=rand(11111,99999);
        $data=TdPublisherPayment::create(array(
            'publisher_id'=>$publisher_id,
            'month'=>$fromDate,
            'amount'=>$amount,
            'order_id'=>$order_id,
            'date'=>$date,
        ));

        return response()->json( [
                    'success' => 1,
                    'message' =>$data
                    ], 200 );
        
    }

    public function PaidCommissionManage()
    {
        $data=TdPublisherPayment::orderBy('created_at','desc')->with('PublisherDetails')->get();

        return response()->json( [
                    'success' => 1,
                    'message' =>$data
                    ], 200 );
    }

    
}
