<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use App\Models\MdUserLogin;
use App\Models\User;
use App\Models\TdUserDetails;
use DB;

class LoginController extends Controller
{
    public function Login(Request $request){
        if(filter_var($request->user_id, FILTER_VALIDATE_EMAIL)!=false){
            $users=MdUserLogin::where('user_id',$request->user_id)
                // ->where('user_type','U')
                ->get();
            // return "email";
        }else{
            $is_mobile=TdUserDetails::where('phone',$request->user_id)->get();
            // return $is_mobile[0]['email'];
            if (count($is_mobile)>0) {
                $request->user_id=$is_mobile[0]['email'];
                $users=MdUserLogin::where('user_id',$request->user_id)
                    // ->where('user_type','U')
                    ->get();
            }else{
               $users=[]; 
            }
            // return "phone";
        }
        // $user_pass=DB::table('md_user_login')->where('user_id',$request->user_id)->value('user_pass');
            // return $users;

        foreach ($users as $userss) {
            $user_pass_de=$userss->user_pass;
            $verify_flag=$userss->verify_flag;
            $user_status=$userss->user_status;
            $user_type=$userss->user_type;
            // $user_pass_de=Crypt::decrypt($userss->user_pass);
        }
        // return $user_pass_de;
        
        // return count($users);

        if (count($users)>0) {
           // return count($users);
            if ($user_type=='U') {
                if ($verify_flag=="Y") {
                    // return count($users);  
                    if ($request->register_with_google=='Y') {
                        // return $request->register_with_google;
                        $remember_token=Hash::make(rand(10,100));
                        $alluser=DB::table('md_user_login')
                                ->where('user_id',$request->user_id)
                                ->update([
                                    'remember_token' => $remember_token,
                                    'updated_at' =>date('Y-m-d H:i:s')
                                ]);
                            // return $users;
                            if ($alluser>0) {
                                $u=MdUserLogin::where('user_id',$request->user_id)->where('user_status','A')->get();
                                if(count($u)>0){
                                    return response()->json( [
                                        'success' => 1,
                                        'message' =>$u
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

                        if (Hash::check($request->user_pass, $user_pass_de)) {
                            $remember_token=Hash::make(rand(10,100));
                            $alluser=DB::table('md_user_login')
                                ->where('user_id',$request->user_id)
                                ->update([
                                    'remember_token' => $remember_token,
                                    'updated_at' =>date('Y-m-d H:i:s')
                                ]);
                            // return $users;
                            if ($alluser>0) {
                                $u=MdUserLogin::where('user_id',$request->user_id)->where('user_status','A')->get();
                                if(count($u)>0){
                                    return response()->json( [
                                        'success' => 1,
                                        'message' =>$u
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
                                    'message' => "Email-Address And Password Are Wrong.",
                                    ], 201 );
                        } 
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
                    'message' => "You are registered as a publisher ",
                    ], 201 ); 
            }
        }
        // else if (count($is_mobile)>0) {
        //     // return $is_mobile;
        //     $id=$is_mobile[0]['user_id'];
        //     // return $id;
        //     $userss=MdUserLogin::find($id);
        //     // return $userss;
        //     $user_pass_de=$userss->user_pass;
        //     $verify_flag=$userss->verify_flag;
        //     $user_status=$userss->user_status;
        //     if ($verify_flag=="Y") {
        //         // return count($users);  
        //         if (Hash::check($request->user_pass, $user_pass_de)) {
        //             $remember_token=Hash::make(rand(10,100));
        //             $alluser=DB::table('md_user_login')
        //                 ->where('user_id',$request->user_id)
        //                 ->update([
        //                     'remember_token' => $remember_token,
        //                     'updated_at' =>date('Y-m-d H:i:s')
        //                 ]);
        //             // return $users;
        //             if ($alluser>0) {
        //                 $u=MdUserLogin::where('user_id',$request->user_id)->where('user_status','A')->get();
        //                 if(count($u)>0){
        //                     return response()->json( [
        //                         'success' => 1,
        //                         'message' =>$u
        //                         ], 200 );
        //                 }else{
        //                     return response()->json( [
        //                         'success' => 0,
        //                         'message' =>"User Inactive"
        //                         ], 200 );
        //                 }
        //             }else{
        //                 return response()->json( [
        //                     'success' => 0,
        //                     'message' => "Email-Address And Password Are Wrong.",
        //                     ], 201 ); 
        //             }
                    
        //         }else{
        //             return response()->json( [
        //                     'success' => 0,
        //                     'message' => "Email-Address And Password Are Wrong.",
        //                     ], 201 );
        //         } 
        //     }else{
        //         return response()->json( [
        //             'success' => 0,
        //             'message' => "Verify",
        //             ], 201 ); 
        //     }

        // } 
        else{
            return response()->json( [
                    'success' => 0,
                    'message' => "Email-Address And Password Are Wrong.",
                    ], 201 ); 
        }
        

        // return $users;
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
}
