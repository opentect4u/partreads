<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\MdUserLogin;
use App\Models\TdUserDetails;
use App\Models\TdRecentVisitBook;
use App\Models\MdCategory;
use App\Models\TdPublisherBookDetails;
use App\Models\TdBuyBookPayment;

class UserController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('is_admin');
    // }
	
    public function Show()
    {
    	$users=MdUserLogin::where('user_type','U')->get();
    	// return $users;
        return response()->json( [
                    'success' => 1,
                    'message' =>$users
                    ], 200 );
    }

    public function UsersActive(Request $request){
        $id=$request->id;
        $user_id=$request->user_id;
        $user_status=$request->user_status;
        // return $id;
        if($user_status=="A"){
            $alluser=DB::table('md_user_login')
                        ->where('_id',$request->id)
                        ->where('user_id',$request->user_id)
                        ->update([
                            'user_status' => "I",
                            'reason' => $request->reason,
                            'updated_at' =>date('Y-m-d H:i:s')
                        ]);
            if($alluser>0){
                $users=MdUserLogin::where('_id',$request->id)->where('user_id',$user_id)->get();
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
        }else if($user_status=="I"){
            $alluser=DB::table('md_user_login')
                        ->where('_id',$request->id)
                        ->where('user_id',$request->user_id)
                        ->update([
                            'user_status' => "A",
                            'reason' => "",
                            'updated_at' =>date('Y-m-d H:i:s')
                        ]);
            if($alluser>0){
                $users=MdUserLogin::where('_id',$request->id)->where('user_id',$user_id)->get();
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


    public function Details(Request $request)
    {
        $user_id=$request->id;
        $users=TdUserDetails::where('user_id',$user_id)->get();
        $visitbook=TdRecentVisitBook::where('user_id',$user_id)->orderBy('created_at','desc')->groupBy('book_id')->select('publisher_id','created_at')
            // ->with('bookDetails')
            // ->select('bookDetails.category_id')
            ->get();
            // return $visitbook;
            $data1=[];
            $allcate=[];
        foreach ($visitbook as $key => $value) {
            $book_id= $value->book_id;
            $book_details=TdPublisherBookDetails::where('book_id',$book_id)->get();
            foreach ($book_details as $key => $value1) {
                $category_id=$value1->category_id;
                $category_name=MdCategory::where('_id','=',$category_id)->value('name');
                $value1->category_name=$category_name;
                array_push($allcate, $category_name);
            }
            $value->book_details=$book_details;
            array_push($data1, $value);
        }
        // $unicate=[];
        $unicate=array_unique($allcate);
        // return $unicate;
        $aa=[];
        for ($i=0; $i < count($unicate); $i++) { 
            // return $unicate[$i];
            $cnt = count(array_keys($allcate,$unicate[$i]));
           // $cnt = count(array_filter($allcate,function($a) {return $a==$unicate[$i];}));
            // $count1 = $num_amount / $num_total;
            //   $count2 = $count1 * 100;
            //   $count = number_format($count2, 0);
            //   return $count;
            $per=(($cnt/count($allcate))* 100);
            // $per = $count1 * 100;
           $bb=[];
           $bb['category_name']=$unicate[$i];
           $bb['count']=$cnt;
           $bb['percentage']=$per;
           array_push($aa,$bb);

        }

        // payement details
        $allpay=TdBuyBookPayment::where('user_id',$user_id)
            ->groupBy('date')
            ->orderBy('date','desc')
            ->get();
        $payment_history=[];
        foreach ($allpay as $key => $value3) {
            $total_payment=0;
            $allpay1=TdBuyBookPayment::where('user_id',$user_id)
            ->where('date',$value3->date)
            ->orderBy('date','desc')
            ->get();
            foreach ($allpay1 as $key => $value4) {
                $total_price=$value4->total_price;
                $total_payment=$total_payment+$total_price;
            }
            $value3->total_payment=$total_payment;
            array_push($payment_history,$value3);
        }

        return response()->json( [
                    'success' => 1,
                    'message' =>$users,
                    'visitbook'=>$data1,
                    'allcategory'=>$aa,
                    'payment_history'=>$payment_history,
                    ], 200 );
    }
}
