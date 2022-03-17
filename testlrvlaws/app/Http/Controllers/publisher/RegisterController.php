<?php

namespace App\Http\Controllers\publisher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MdUserLogin;
use App\Models\TdPublisherDetails;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyRegisterEmail;
use App\Mail\SuccessRegisterEmail;
use Illuminate\Support\Facades\Crypt;
use DB;

class RegisterController extends Controller
{
    public function Create(Request $request){
    	// return $request->user_id;
    	$publisher=MdUserLogin::where('user_id',$request->user_id)->get();
    	if (count($publisher)>0) {
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
		           "verify_flag"  => "N",
		           "user_type"  => "P",
		           "created_by" =>$request->user_name,
		        ));

		        // return $publisher;
		    	$publisher=MdUserLogin::where('user_id',$request->user_id)->get();
		        foreach ($publisher as $publishers) {
		        	$id=$publishers->id;
		        }

		        TdPublisherDetails::create(array(
		           "publisher_id"  => $id,
		           "name"  => $request->user_name,
		           "phone"  => $request->phone,
		           "email"  => $request->user_id,
		           "address"  => "",
		           "bank_name"=>$request->bank_name,
                   "gst_no"=>$request->gst_no,
                   "acc_no"=>$request->acc_no,
                   "ifsc_code"=>$request->ifsc_code,
		           "created_by" =>$request->user_name,
		        ));
    		}else{
    			MdUserLogin::create(array(
		           "user_id"  => $request->user_id,
		           "user_pass"  => Hash::make($request->user_pass),
		           "user_name"  => $request->user_name,
		           "user_status"  => "A",
		           "verify_flag"  => "N",
		           "user_type"  => "P",
		           "created_by" =>$request->user_name,
		        ));

		        // return $publisher;
		    	$publisher=MdUserLogin::where('user_id',$request->user_id)->get();
		        foreach ($publisher as $publishers) {
		        	$id=$publishers->id;
		        }

		        TdPublisherDetails::create(array(
		           "publisher_id"  => $id,
		           "name"  => $request->user_name,
		           "phone"  => $request->phone,
		           "email"  => $request->user_id,
		           "address"  => "",
		           "bank_name"=>$request->bank_name,
                   "gst_no"=>$request->gst_no,
                   "acc_no"=>$request->acc_no,
                   "ifsc_code"=>$request->ifsc_code,
		           "created_by" =>$request->user_name,
		        ));

		        $email=$request->user_id;
		        $user_name=$request->user_name;
		        $url='http://ec2-65-1-39-181.ap-south-1.compute.amazonaws.com/#/publisher/verification/'.Crypt::encryptString($request->user_id);
	            // Mail::to($email)->send(new SuccessRegisterEmail($user_name,$url));
    		}
	    	

	        if (count($publisher)>0) {
	        	// return $publisher;
	        	return response()->json( [
	                                    'success' => 1,
	                                    'message' => $publisher,
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
    	// return $from_email;
    	$user_id=Crypt::decryptString($request->user_id);
    	$succes=MdUserLogin::where('user_id', $user_id)
          ->update(['verify_flag' => "Y"]);
        // return $succes;


        if ($succes>0) {
        	$data=MdUserLogin::where('user_id', $user_id)->get();
        	$user_name=$data[0]['user_name'];
        	// return $user_name;
        	$sub="Successful registration as a publisher";  
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
}
