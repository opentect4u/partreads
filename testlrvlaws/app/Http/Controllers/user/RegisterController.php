<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MdUserLogin;
use App\Models\TdUserDetails;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyRegisterEmail;
use App\Mail\SuccessRegisterEmail;
use Illuminate\Support\Facades\Crypt;
use Image;
use App\Models\MdCoupon;
use App\Models\TdCoupon;

class RegisterController extends Controller
{
    public function Create_old(Request $request){
    	// return $request->user_id;
    	$users=MdUserLogin::where('user_id',$request->user_id)->get();
    	if (count($users)>0) {
    		return response()->json( [
                                    'success' => 0,
                                    'message' => 'This email already registered.',
                                    ], 200 );
    	}else if ($request->user_id!="" && $request->user_name!="") {
    	// }else if ($request->user_id!="" && $request->user_pass!="" && $request->user_name!="") {
    		if ($request->register_with_google=='Y') {
    			$request->user_pass='Pass@#123';
    			

    			MdUserLogin::create(array(
		           "user_id"  => $request->user_id,
		           "user_pass"  => Hash::make($request->user_pass),
		           "user_name"  => $request->user_name,
		           "user_status"  => "A",
		           "verify_flag"  => "Y",
		           "user_type"  => "U",
		           "created_by" =>$request->user_name,
		        ));
		    	// return $users;
		    	$users=MdUserLogin::where('user_id',$request->user_id)->get();
		        foreach ($users as $userss) {
		        	$id=$userss->id;
		        }
        		

        		$profile_iamge_name=date('YmdHis')."_".$id.'.png';

		        $url=$request->profile_image;
    			// $url = 'http://example.com/image.png';
		        $img = public_path('user-images').'/'.$profile_iamge_name;
		        file_put_contents($img, file_get_contents($url));

            	$img_url=env('APP_URL')."/public/user-images/".$profile_iamge_name;

            	// $path = 'https://i.stack.imgur.com/koFpQ.png';
		        // $path=$request->profile_image;
				// $filename = basename($path);

				// Image::make($path)->save(public_path('images/' . $filename));

    		//      $img_url=env('APP_URL')."/public/user-images/".$filename;

		        TdUserDetails::create(array(
		           "user_id"  => $id,
		           "name"  => $request->user_name,
		           "phone"  => $request->phone,
		           "email"  => $request->user_id,
		           "address"  => "",
		           "profile_iamge" =>$profile_iamge_name,
                   "image_url" =>$img_url,
                   "referral_code" =>$request->referral_code,
		           "type" =>$request->type,
		           "student_academician"=>$request->student_academician,
                   "college_university"=>$request->college_university,
		           "created_by" =>$request->user_name,
		        ));
    		}else{
		    	MdUserLogin::create(array(
		           "user_id"  => $request->user_id,
		           "user_pass"  => Hash::make($request->user_pass),
		           "user_name"  => $request->user_name,
		           "user_status"  => "A",
		           "verify_flag"  => "N",
		           "user_type"  => "U",
		           "created_by" =>$request->user_name,
		        ));
		    	// return $users;
		    	$users=MdUserLogin::where('user_id',$request->user_id)->get();
		        foreach ($users as $userss) {
		        	$id=$userss->id;
		        }

		        TdUserDetails::create(array(
		           "user_id"  => $id,
		           "name"  => $request->user_name,
		           "phone"  => $request->phone,
		           "email"  => $request->user_id,
		           "address"  => "",
		           "referral_code" =>$request->referral_code,
		           "type" =>$request->type,
		           "student_academician"=>$request->student_academician,
                   "college_university"=>$request->college_university,
		           "created_by" =>$request->user_name,
		        ));
		        $email=$request->user_id;
		        $user_name=$request->user_name;
		        $url='http://ec2-65-1-39-181.ap-south-1.compute.amazonaws.com/#/user/verification/'.Crypt::encryptString($request->user_id);
	            // Mail::to($email)->send(new VerifyRegisterEmail($user_name,$url));
        	}

	        if (count($users)>0) {
	        	// return $users;
	        	return response()->json( [
	                                    'success' => 1,
	                                    'message' => $users,
	                                    ], 200 );
	        }else{
	        	return response()->json( [
	                                    'success' => 0,
	                                    'message' => 'Error some problem',
	                                    ], 405 );
	        }
    	}else{
    		return response()->json( [
	                                    'success' => 0,
	                                    'message' => 'Error value is missing',
	                                    ], 405 );
    	}
    }

    public function ConfirmCreate(Request $request){
    	$user_id=Crypt::decryptString($request->user_id);
    	$succes=MdUserLogin::where('user_id', $user_id)
          ->update(['verify_flag' => "Y"]);
        // return $succes;

        if ($succes>0) {
        	$data=MdUserLogin::where('user_id', $user_id)->get();
        	$user_name=$data[0]['user_name'];
        	// return $user_name;
        	$sub="Successful registration as a user";  
        	Mail::to($user_id)->send(new SuccessRegisterEmail($user_name,$sub));
        	return response()->json( [
	                        'success' => 1,
	                        'message' => 'Verify Success',
	                        ], 200 );
        }else{
        	return response()->json( [
        						'success' => 0,
		                        'message' => 'Verify Error',
		                    ], 405 );
        }
    }
    // create step 1
    public function Create(Request $request)
    {
        $otp=rand(000000,999999);
    	$text = 'Thank%20you%20for%20the%20bill%20payment%20of%20'.
    	$otp
    	.'%20against%20'.
    	$otp
    	.'%20%2C%20Consumer%20No.%20TAPOMOY%20%2CTransaction%20ref%20ID%20TAPOMOY%20received%20on%20TAPOMOY%20vide%20TAPOMOY.-SYNERGIC%20SOFTEK%20SOLUTIONS%20PVT.%20LTD.&route=Informative&type=text';
    	// $phone=$request->phone;
        if(filter_var($request->phone, FILTER_VALIDATE_EMAIL)!=false){
        	// return 'email';
        	$email_phone=$request->phone;
        }else{
        	// return 'phone';
        	$email_phone=$request->phone;
        	$curl = curl_init();
			curl_setopt_array($curl, array(
			  CURLOPT_URL => 'http://bulksms.sssplsales.in/api/api_http.php?'.
			  'username=SYNERGIC'.
			  '&password=api@2021'.
			  '&senderid=SYNRGC'.
			  '&to='.$email_phone.
			  '&text='.$text,
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => '',
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 0,
			  CURLOPT_FOLLOWLOCATION => true,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => 'GET',
			));

			$response = curl_exec($curl);
			curl_close($curl);
			// echo $response;

        }

        return response()->json( [
        						'success' => 1,
		                        'message' => $response,
		                        'email_phone'=>$email_phone,
		                        'otp'=>$otp,
		                    ], 200 );
    }
    // create step 2
    public function Create1(Request $request)
    {
    	// return $request;
    	if(filter_var($request->phone, FILTER_VALIDATE_EMAIL)!=false){
        	// return 'email';
        	$is_has=MdUserLogin::where('user_id',$request->phone)->get();
        	if (count($is_has)>0) {
        		// login
        		$flag='Login';
        	} else {
        		// register
        		$flag='Register';
        		$email_phone=$request->phone;
        	}
        }else{
        	$is_has=TdUserDetails::where('phone',$request->phone)->get();
        	if (count($is_has)>0) {
        		$flag='Login';
        		// login
        	} else {
        		// register
        		$flag='Register';
        		$email_phone=$request->phone;
        	}
        	
        }
        $msg=[];
        return response()->json( [
        						'success' => 1,
        						'flag'=>$flag,
		                        'message' => $msg,
		                        'email_phone'=>$email_phone,
		                    ], 200 );
    }
    // create step 3
    public function Create2(Request $request)
    {
    	// return $request;
    	$phone=$request->phone;
    	$user_name=$request->user_name;
    	$email=$request->email;
    	$u_type=$request->u_type;
    	$coupon_code=$request->coupon_code;

    	if(filter_var($request->phone, FILTER_VALIDATE_EMAIL)!=false){
    		// email
    		MdUserLogin::create(array(
		           "user_id"  => $request->phone,
		           // "user_pass"  => Hash::make($request->user_pass),
		           "user_name"  => $request->user_name,
		           "user_status"  => "A",
		           "verify_flag"  => "Y",
		           "user_type"  => "U",
		           "created_by" =>$request->user_name,
		        ));
		    	// return $users;
		    	$users=MdUserLogin::where('user_id',$request->user_id)->get();
		        foreach ($users as $userss) {
		        	$id=$userss->id;
		        }

		        TdUserDetails::create(array(
		           "user_id"  => $id,
		           "name"  => $request->user_name,
		           "phone"  => $request->email,
		           "email"  => $request->phone,
		           "address"  => "",
		           "referral_code" =>$request->referral_code,
		           "type" =>$request->u_type,
		           "student_academician"=>$request->student_academician,
                   "college_university"=>$request->college_university,
		           "created_by" =>$request->user_name,
		        ));
		    $this->CouponCode($coupon_code,$id);

    	}else{
    		// phone
    		MdUserLogin::create(array(
		           "user_id"  => $request->email,
		           // "user_pass"  => Hash::make($request->user_pass),
		           "user_name"  => $request->user_name,
		           "user_status"  => "A",
		           "verify_flag"  => "Y",
		           "user_type"  => "U",
		           "created_by" =>$request->user_name,
		        ));
		    	// return $users;
		    	$users=MdUserLogin::where('user_id',$request->user_id)->get();
		        foreach ($users as $userss) {
		        	$id=$userss->id;
		        }

		        TdUserDetails::create(array(
		           "user_id"  => $id,
		           "name"  => $request->user_name,
		           "phone"  => $request->phone,
		           "email"  => $request->email,
		           "address"  => "",
		           "referral_code" =>$request->referral_code,
		           "type" =>$request->u_type,
		           "student_academician"=>$request->student_academician,
                   "college_university"=>$request->college_university,
		           "created_by" =>$request->user_name,
		        ));
		    $this->CouponCode($coupon_code,$id);
    	}

		return response()->json( [
        						'success' => 1,
        						// 'flag'=>$flag,
		                        'message' => $users,
		                        // 'email_phone'=>$email_phone,
		                    ], 200 );

    }


    public function CouponCode($coupon_code,$user_id)
    {
        $is_has=MdCoupon::where('coupon_code',$coupon_code)->get();
        		foreach ($is_has as $value) {
                    $book_id=$value->book_id;
                    $publisher_id=$value->publisher_id;
                    $coupon_from_date=$value->coupon_from_date;
                    $coupon_to_date=$value->coupon_to_date;
                }
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
    	
    }



    public function ApplyCoupon(Request $request)
    {
    	$coupon_code=$request->coupon_code;
    	$is_has=MdCoupon::where('coupon_code',$coupon_code)->get();
    	if (count($is_has)>0) {
			$is_coupon=TdCoupon::where('coupon_code',$coupon_code)->get();
			if (count($is_coupon)>0) {
				$success=2;
    			$message='Already Used';
			} else {
				foreach ($is_has as $value) {
					$coupon_from_date=$value->coupon_from_date;
					$coupon_to_date=$value->coupon_to_date;
				}
				$today=date('Y-m-d');
				if ($coupon_from_date<=$today && $coupon_to_date>=$today) {
					// return 'if';
					$success=1;
    				$message='Applied';
				}else{
					$success=0;
    				$message='Invalid Coupon';
				}
			}
    	} else {
    		$success=0;
    		$message='Invalid Coupon';
    		
    	}
    	return response()->json( [
        						'success' => $success,
		                        'message' => $message,
		                    ], 201 );


    }
}
