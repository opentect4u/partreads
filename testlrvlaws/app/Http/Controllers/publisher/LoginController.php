<?php

namespace App\Http\Controllers\publisher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use App\Models\MdUserLogin;
use App\Models\User;
use DB;

class LoginController extends Controller
{
    // use AuthenticatesUsers;

    // public function __construct()
    // {
    //     $this->middleware('guest')->except('logout');
    // }

    public function Login(Request $request){
        $publisher=MdUserLogin::where('user_id',$request->user_id)
            // ->where('user_type','P')
            ->get();
        // $user_pass=DB::table('md_user_login')->where('user_id',$request->user_id)->value('user_pass');
        foreach ($publisher as $publishers) {
            $user_pass_de=$publishers->user_pass;
            $verify_flag=$publishers->verify_flag;
            $user_type=$publishers->user_type;
            // $user_pass_de=Crypt::decrypt($publishers->user_pass);
        }
        // return $user_pass_de;
        if (count($publisher)>0) {
           // return count($publisher);
            if ($user_type=='P') {
                if ($verify_flag=="Y") {
                    // return count($publisher);  
                    if (Hash::check($request->user_pass, $user_pass_de)) {
                        $p=MdUserLogin::where('user_id',$request->user_id)->where('user_type','P')->where('user_status','A')->get();

                        // return $publisher;
                        if(count($p)>0){
                            return response()->json( [
                                    'success' => 1,
                                    'message' =>$p
                                    ], 200 );
                        }else{
                            return response()->json( [
                                    'success' => 0,
                                    'message' =>"User Inactive"
                                    ], 200 );
                        }
                    }else{
                        return response()->json( [
                                'success' => 0,
                                'message' => "Email-Address And Password Are Wrong.",
                                ], 201 );
                    } 
                }else{
                    return response()->json( [
                        'success' => 0,
                        'message' => "Verify",
                        ], 201 ); 
                }
            }else{
                return response()->json( [
                    'success' => 0,
                    'message' => "You are registered as a user",
                    ], 201 ); 
            }
        }else{
            return response()->json( [
                    'success' => 0,
                    'message' => "Email-Address And Password Are Wrong.",
                    ], 201 ); 
        }
        

        // return $publisher;
    	// if(Auth::attempt(array('user_id' => $request->user_id, 'user_pass' => Hash::make($request->user_pass))))
     //    {
     //        if (auth()->user()->user_type == "P") {
     //            return Auth::user();
     //            // return redirect()->route('admin.home');
     //        }else{
     //            return response()->json( [
     //                                'success' => 0,
     //                                'message' => "Some error occurred",
     //                                ], 405 );
     //            // return redirect()->route('home');
     //        }
     //    }else{
     //        return response()->json( [
     //                                'success' => 0,
     //                                'message' => "Email-Address And Password Are Wrong.",
     //                                ], 405 );
     //    }
    }

    public function ChangePassword(Request $request){
        $old_pass=$request->old_pass;
        $user_id=$request->user_id;
        $password=$request->password;
        $publisher=MdUserLogin::where('user_id',$request->user_id)->get();
        foreach ($publisher as $publishers) {
            $user_pass_de=$publishers->user_pass;
            $verify_flag=$publishers->verify_flag;
            // $user_pass_de=Crypt::decrypt($publishers->user_pass);
        }
        if (Hash::check($old_pass, $user_pass_de)) {
            $user=DB::table('md_user_login')
                ->where('user_id',$user_id)
                ->update([
                    'user_pass'  => Hash::make($request->password),
                    'updated_at' =>date('Y-m-d H:i:s')
                ]); 
        }else{
            return response()->json( [
                    'success' => 0,
                    'message' => "old_pass_not_match",
                    ], 200 ); 
        }

        
        if($user>0){
            $users=MdUserLogin::where('user_id',$user_id)
            ->get();
            return response()->json( [
                    'success' => 1,
                    'message' => $users,
                    ], 200 );
        }else{
            return response()->json( [
                    'success' => 0,
                    'message' => "error",
                    ], 200 );
        }
    }
}
