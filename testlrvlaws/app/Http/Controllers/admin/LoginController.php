<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use DB;
use App\Models\MdUserLogin;
use App\Models\MdUserPermission;

class LoginController extends Controller
{
    public function Login(Request $request){
        // UserPermission
        $admin=MdUserLogin::where('user_id',$request->user_id)
            // ->with('UserPermission')
            ->get();
    	// $admin=MdUserLogin::where('user_id',$request->user_id)->where('user_type','A')->get();
        if (count($admin)>0) {
            foreach ($admin as $admins) {
                $user_pass_de=$admins->user_pass;
                $user_type=$admins->user_type;
                // $user_pass_de=Crypt::decrypt($admins->user_pass);
            }
            // return $user_pass_de;
            if (Hash::check($request->user_pass, $user_pass_de)) {
                if ($user_type=='A') {
                    return response()->json( [
                            'success' => 1,
                            'message' =>$admin
                            ], 200 );
                    // return $admin;
                }else{
                    $admin1=MdUserLogin::where('user_id',$request->user_id)
                        ->with('UserPermission')->get();
                    return response()->json( [
                            'success' => 1,
                            'message' =>$admin1
                            ], 200 );
                }
            }else{
                return response()->json( [
                        'success' => 0,
                        'message' => "User-Id and Password are Wrong.",
                        ], 201 );
            }
        } else {
            return response()->json( [
                        'success' => 0,
                        'message' => "User-Id and Password are Wrong.",
                        ], 201 );
        }
    }

    // public function Logout(){}


    public function Create(Request $request)
    {
        // return $request;
        // return "hello";
        $id=$request->id;
            if($request->user_manage=='true'){
                $user_manage= 'Y';
            }else{
                $user_manage= 'N';
            }
            if($request->category_manage=='true'){
                $category_manage= 'Y';
            }else{
                $category_manage= 'N';
            }
            if($request->publisher_manage=='true'){
                $publisher_manage= 'Y';
            }else{
                $publisher_manage= 'N';
            }
            if($request->subcategory_manage=='true'){
                $subcategory_manage= 'Y';
            }else{
                $subcategory_manage= 'N';
            }
            if($request->all_books=='true'){
                $all_books= 'Y';
            }else{
                $all_books= 'N';
            }


            if($request->review_rating=='true'){
                $review_rating= 'Y';
            }else{
                $review_rating= 'N';
            }
            if($request->hard_copy=='true'){
                $hard_copy= 'Y';
            }else{
                $hard_copy= 'N';
            }
            if($request->user_reports=='true'){
                $user_reports= 'Y';
            }else{
                $user_reports= 'N';
            }
            if($request->publisher_reports=='true'){
                $publisher_reports= 'Y';
            }else{
                $publisher_reports= 'N';
            }
            if($request->payment_history=='true'){
                $payment_history= 'Y';
            }else{
                $payment_history= 'N';
            }
            if($request->commission_management=='true'){
                $commission_management= 'Y';
            }else{
                $commission_management= 'N';
            }
            
            if($request->coupon_manage=='true'){
                $coupon_manage= 'Y';
            }else{
                $coupon_manage= 'N';
            }

            if($request->used_coupon=='true'){
                $used_coupon= 'Y';
            }else{
                $used_coupon= 'N';
            }
        if ($id =='') {
            
            $count=MdUserLogin::where('user_id',$request->user_id)->get();
            if(count($count)>0){
                return response()->json( [
                            'success' => 0,
                            'message' =>"already registered"
                            ], 201 );
            }else{
                // $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                // $user_pass=substr(str_shuffle($str_result), 0,8);
                // $user_pass=rand(1000,100);
                $user_pass=1234;
               

                $data=MdUserLogin::create(array(
                        "user_id"  => $request->user_id,
                        "user_pass"  => Hash::make($user_pass),
                        "user_name"  => $request->user_name,
                        "mobile_no" => $request->mobile_no,
                        "user_status"  => "A",
                        "verify_flag"  => "Y",
                        "user_type"  => "B",
                    ));
                $user_id=$data->_id;
                MdUserPermission::create(array(
                        "user_id"  => $user_id,
                        "user_manage"  =>$user_manage ,
                        "publisher_manage"  => $publisher_manage,
                        "category_manage" =>$category_manage,
                        "subcategory_manage"  =>$subcategory_manage,
                        "all_books"  =>$all_books,
                        "review_rating"=>$review_rating,
                        "hard_copy"=>$hard_copy,
                        "user_reports"=>$user_reports,
                        "publisher_reports"=>$publisher_reports,
                        "payment_history"=>$payment_history,
                        "commission_management"=>$commission_management,
                        "coupon_manage"=>$coupon_manage,
                        "used_coupon"=>$used_coupon,
                        // "user_type"  => "B",
                        // "created_by" =>$request->user_name,
                    ));
                return response()->json( [
                            'success' => 1,
                            'message' =>$data
                            ], 200 );
            }
        }else{
            $id=$request->id;


            $editdata=MdUserLogin::find($id);
            $editdata->user_name=$request->user_name;
            $editdata->mobile_no=$request->mobile_no;
            $editdata->save();

            $per_id=MdUserPermission::where('user_id',$id)->value('_id');
            $editdata1=MdUserPermission::find($per_id);
            $editdata1->user_manage=$user_manage;
            $editdata1->publisher_manage=$publisher_manage;
            $editdata1->category_manage=$category_manage;
            $editdata1->subcategory_manage=$subcategory_manage;
            $editdata1->all_books=$all_books;

            $editdata1->review_rating=$review_rating;
            $editdata1->hard_copy=$hard_copy;
            $editdata1->user_reports=$user_reports;
            $editdata1->publisher_reports=$publisher_reports;
            $editdata1->payment_history=$payment_history;
            $editdata1->commission_management=$commission_management;
            $editdata1->coupon_manage=$coupon_manage;
            $editdata1->used_coupon=$used_coupon;
            $editdata1->save();
            return response()->json( [
                        'success' => 1,
                        'message' =>$editdata1
                        ], 200 );
        }
    }

    public function AdminManage()
    {
        $data=MdUserLogin::where('user_type','B')->with('UserPermission')->get();
        return response()->json( [
                        'success' => 1,
                        'message' =>$data
                        ], 200 );
    }

    public function ShowEdit(Request $request)
    {
        $id=$request->id;
        // return $id;
        $data=MdUserLogin::where('_id',$id)->with('UserPermission')->get();
        return response()->json( [
                        'success' => 1,
                        'message' =>$data
                        ], 200 );
    }

    public function Edit(Request $request)
    {
        $id=$request->id;

            if($request->user_manage=='true'){
                $user_manage= 'Y';
            }else{
                $user_manage= 'N';
            }
            if($request->category_manage=='true'){
                $category_manage= 'Y';
            }else{
                $category_manage= 'N';
            }
            if($request->publisher_manage=='true'){
                $publisher_manage= 'Y';
            }else{
                $publisher_manage= 'N';
            }
            if($request->subcategory_manage=='true'){
                $subcategory_manage= 'Y';
            }else{
                $subcategory_manage= 'N';
            }
            if($request->all_books=='true'){
                $all_books= 'Y';
            }else{
                $all_books= 'N';
            }


        $editdata=MdUserLogin::find($id);
        $editdata->user_name=$request->user_name;
        $editdata->mobile_no=$request->mobile_no;
        $editdata->save();

        $per_id=MdUserPermission::where('user_id',$id)->value('_id');
        $editdata1=MdUserPermission::find($per_id);
        $editdata1->user_manage=$user_manage;
        $editdata1->publisher_manage=$publisher_manage;
        $editdata1->category_manage=$category_manage;
        $editdata1->subcategory_manage=$subcategory_manage;
        $editdata1->all_books=$all_books;
        $editdata1->save();
        return response()->json( [
                        'success' => 1,
                        'message' =>$editdata1
                        ], 200 );
    }



}
