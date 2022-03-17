<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TdBuyBookPages;
use DB;
use App\Models\TdReport;
use App\Models\MdCoupon;
use App\Models\TdCoupon;
use App\Models\TdPublisherBookDetails;

class CouponController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('is_admin');
    // }
    public function Show(Request $request)
    {
        $book_id=$request->book_id;
        $coupon_from_date=$request->coupon_from_date;
        $coupon_to_date=$request->coupon_to_date;
        if ($book_id!='' && $coupon_from_date!='' && $coupon_to_date!='') {
            $data=MdCoupon::where('book_id',$book_id)
                ->where('coupon_from_date','>=',$coupon_from_date)
                ->where('coupon_to_date','<=',$coupon_to_date)
                ->with('bookDetails')
                ->groupBy('coupon_from_date')
                ->orderBy('created_at','desc')
                ->select('book_id','publisher_id','coupon_from_date','coupon_to_date','book_from_date','book_to_date','coupon_code','created_at','updated_at')
                ->get();
        } else if ($coupon_from_date!='' && $coupon_to_date!='') {
            // return 'date';
            $data=MdCoupon::where('coupon_from_date','>=',$coupon_from_date)
                ->where('coupon_to_date','<=',$coupon_to_date)
                ->with('bookDetails')
                ->groupBy('coupon_from_date')
                ->orderBy('created_at','desc')
                ->select('book_id','publisher_id','coupon_from_date','coupon_to_date','book_from_date','book_to_date','coupon_code','created_at','updated_at')
                ->get();
            // return $data;
        } else if ($book_id!='') {
            $data=MdCoupon::where('book_id',$book_id)
                ->with('bookDetails')
                ->groupBy('coupon_from_date')
                ->orderBy('created_at','desc')
                ->select('book_id','publisher_id','coupon_from_date','coupon_to_date','book_from_date','book_to_date','coupon_code','created_at','updated_at')
                ->get();
        }
        $data1=[];
        foreach ($data as $value) {
            $book_id1=$value->book_id;
            $coupon_from_date=$value->coupon_from_date;
            $coupon_to_date=$value->coupon_to_date;
            if ($book_id1!='') {
                $total_coupon=MdCoupon::where('book_id',$book_id1)
                    ->where('coupon_from_date','=',$coupon_from_date)
                    ->where('coupon_to_date','=',$coupon_to_date)
                    ->orderBy('created_at','desc')
                    ->get();
               $value->total_coupon=count($total_coupon);
            }else{
                $value->total_coupon=1;
            }
            array_push($data1,$value);
        }
        
        return response()->json( [
                'success' => 1,
                'message' =>$data1,
            ], 200 );
    }

    public function PdfDownload(Request $request)
    {
        $book_id=$request->book_id;
        $coupon_from_date=$request->coupon_from_date;
        $coupon_to_date=$request->coupon_to_date;
        $total_coupon=MdCoupon::where('book_id',$book_id)
                    ->where('coupon_from_date','=',$coupon_from_date)
                    ->where('coupon_to_date','=',$coupon_to_date)
                    ->with('bookDetails')
                    ->get();
        return response()->json( [
                'success' => 1,
                'message' =>$total_coupon,
            ], 200 );
    }

    public function Add(Request $request)
    {
        // return $request;
        $no_of_coupon=$request->no_of_coupon;
        $flag=$request->flag;
        if ($flag=='B') {
            // return $request;
            $countstart=$request->countstart;
            $countend=$request->countend;
            $publisher_id=TdPublisherBookDetails::where('book_id',$request->book_id)
                ->value('publisher_id');

            for ($i=1; $i <=(int)$no_of_coupon; $i++) { 
                if($i>=$countstart && $i<=$countend){
                    $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    $coupon_code=substr(str_shuffle($str_result),0, 6);
                    $data=MdCoupon::create(array(
                        'book_id'=>$request->book_id,
                        'publisher_id'=>$publisher_id,
                        'coupon_code'=>$coupon_code,
                        'coupon_amount'=>'',
                        'coupon_from_date'=>$request->coupon_from_date,
                        'coupon_to_date'=>$request->coupon_to_date,
                        'book_from_date'=>$request->book_from_date,
                        'book_to_date'=>$request->book_to_date,
                        'allow_flag'=>'Y',
                    ));
                }
            }
            return response()->json( [
                'success' => 1,
                'message' =>$data,
                'countend'=>$countend,
            ], 200 );
        }else{
            $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $coupon_code=substr(str_shuffle($str_result),0, 6);
            $data=MdCoupon::create(array(
                    'book_id'=>'',
                    'publisher_id'=>'',
                    'coupon_code'=>$coupon_code,
                    'coupon_amount'=>'',
                    'coupon_from_date'=>$request->coupon_from_date,
                    'coupon_to_date'=>$request->coupon_to_date,
                    'book_from_date'=>'',
                    'book_to_date'=>'',
                    'allow_flag'=>'Y',
                )); 
            return response()->json( [
                'success' => 1,
                'message' =>$data
            ], 200 );
        }
        
        
    }



    public function UsedCoupon(Request $request)
    {
        $data=MdCoupon::groupBy('book_id')
            ->select('book_id','publisher_id','coupon_from_date','coupon_to_date','book_from_date','book_to_date')
            ->with('bookDetails')
            ->get();
        // return $data;
        $data1=[];
        foreach ($data as $value) {
            $book_id=$value->book_id;
            $publisher_id=$value->publisher_id;
            $total_coupon=MdCoupon::where('book_id',$book_id)->where('publisher_id',$publisher_id)->count();
            $value->total_coupon=$total_coupon;
            $used_coupon=TdCoupon::where('book_id',$book_id)->count();
            $value->used_coupon=$used_coupon;
            array_push($data1,$value);
        }
        // return $data1;
        return response()->json( [
                'success' => 1,
                'message' =>$data1
            ], 200 );
    }



}
