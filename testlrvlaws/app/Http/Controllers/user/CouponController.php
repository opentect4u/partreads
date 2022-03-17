<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\TdUserDetails;
use App\Models\MdUserLogin;
use App\Models\TdRecentShareBook;
use App\Models\TdRecentVisitBook;
use App\Models\TdReport;
use App\Models\MdCoupon;
use App\Models\TdCoupon;
use App\Models\TdBuyBookPages;
use App\Models\TdBuyBookPayment;
use App\Models\TdNotification;
use App\Models\TdPublisherBookDetails;

class CouponController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_user');
    }

    public function Apply(Request $request)
    {
        $user_id=$request->id;
        $coupon_code=$request->coupon_code;
        $is_has=MdCoupon::where('coupon_code',$coupon_code)->get();
        if (count($is_has)>0) {
            $data=TdCoupon::where('user_id',$user_id)
                ->where('coupon_code',$coupon_code)
                ->get();
            if (count($data)>0) {
                return response()->json( [
                    'success' => 2,
                    'message' =>'Already Used',
                ], 200 );
            } else {
                foreach ($is_has as $value) {
                    $book_id=$value->book_id;
                    $publisher_id=$value->publisher_id;
                    $coupon_from_date=$value->coupon_from_date;
                    $coupon_to_date=$value->coupon_to_date;
                }
                $today=date('Y-m-d');
                if ($coupon_from_date<=$today && $coupon_to_date>=$today) {
                
                    TdCoupon::create(array(
                        'user_id'=>$user_id,
                        'book_id'=>$book_id,
                        'coupon_code'=>$coupon_code,
                    ));

                    $is_has_row=TdBuyBookPages::where('book_id',$book_id)
                        ->where('publisher_id',$publisher_id)
                        ->get();
                    if (count($is_has_row)>0) {
                        TdBuyBookPages::where('book_id',$book_id)
                                ->where('publisher_id',$publisher_id)
                                ->delete();
                    }

                    $user_name=DB::table('md_user_login')->where('_id',$user_id)->value('user_name');
                    $book_details=TdPublisherBookDetails::where('book_id',$book_id)
                        ->where('publisher_id',$publisher_id)
                        ->get();
                    foreach ($book_details as $value2) {
                        $full_book_name=$value2->full_book_name;
                        $price=$value2->price;
                        $total_price=$value2->price_fullbook;
                    }
                    $book_page_url=env('APP_URL')."/public/main-pdf/".$full_book_name;
                    $msg=TdBuyBookPages::create(array(
                        'user_id'=>$user_id,
                        'publisher_id'=>$publisher_id,
                        'book_id'=>$book_id,
                        'book_page_name'=>'',
                        'book_page_no'=>'',
                        'book_page_url'=>$book_page_url,
                        'full_book'=>'Y',
                        'price'=>$price,
                        'created_by'=>$user_name,
                    ));

                    $order_id=rand(11111,99999);
                    TdBuyBookPayment::create(array(
                                'user_id'=>$user_id,
                                'publisher_id'=>$publisher_id,
                                'book_id'=>$book_id,
                                'book_page_no'=>"Whole Book ",
                                'date'=>date('Y-m-d h:i:s'),
                                'price'=>$price,
                                'total_price'=>$total_price,
                                'order_id'=>$order_id,
                            ));

                    TdNotification::create(array(
                        'date'=>date('Y-m-d h:i:s'),
                        'from_user_type'=>'U',
                        'from_user_id'=>$user_id,
                        'to_user_type'=>'U',
                        'to_user_id'=>$user_id,
                        'publisher_id'=>$publisher_id,
                        'book_id'=>$book_id,
                        'subject'=>'BuyBookPages',
                        'body'=>'',
                        'path'=>'',
                        'read_flag'=>'N',
                    ));

                    // $msg=[];
                    return response()->json( [
                            'success' => 1,
                            'message' =>$msg,
                            // 'form_page' =>$form_page,
                            // 'to_page' =>$to_page,
                            'book_id' =>$book_id,
                            'publisher_id' =>$publisher_id
                        ], 200 );
                }else{
                    return response()->json( [
                        'success' => 0,
                        'message' =>'Invalid',
                    ], 200 );
                }
            }
        } else {
            return response()->json( [
                'success' => 0,
                'message' =>'Invalid',
            ], 200 );
        }
        
    }

  
}
