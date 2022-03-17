<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MdUserLogin;
use App\Models\User;
use App\Models\TdUserDetails;
use DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;

class ForgotController extends Controller
{
    public function Forgot(Request $request)
    {
        // $user_id=$request->user_id;
        $users=MdUserLogin::where('user_id',$request->user_id)->get();
        if (count($users)>0) {
            foreach ($users as $userss) {
                $id=$userss->id;
                $user_name=$userss->user_name;
                $verify_flag=$userss->verify_flag;
                $user_status=$userss->user_status;
                $user_type=$userss->user_type;
                // $user_pass_de=Crypt::decrypt($userss->user_pass);
            }
            if ($user_type=='U') {
                $url='http://ec2-65-1-39-181.ap-south-1.compute.amazonaws.com/#/user/changeforgotpassword/'.Crypt::encryptString($request->user_id);
            } else {
                $url='http://ec2-65-1-39-181.ap-south-1.compute.amazonaws.com/#/publisher/changeforgotpassword/'.Crypt::encryptString($request->user_id);
            }
            
            // return $url;
            // Mail send
            return response()->json( [
                    'success' => 1,
                    'url'=>$url,
                    'message' => "Password reset link send your email id",
                    ], 200 ); 

        }else{
            return response()->json( [
                    'success' => 0,
                    'message' => "Email id not register",
                    ], 201 ); 
        }

    }

    public function ChangeForgot(Request $request)
    {
        $user_id=Crypt::decryptString($request->user_id);
        $id=MdUserLogin::where('user_id',$user_id)->value('id');
        $password=$request->password;
        $editdata=MdUserLogin::find($id);
        if($editdata->id!=''){
            $editdata->user_pass=Hash::make($password);
            $editdata->save();
            return response()->json( [
                        'success' => 1,
                        'message' => "Password change successfully",
                        ], 200 ); 
        }else{
            return response()->json( [
                        'success' => 0,
                        'message' => "error",
                        ], 200 );   
        }
    }
}
