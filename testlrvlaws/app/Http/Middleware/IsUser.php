<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\MdUserLogin;
use DB;

class IsUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        // $users=DB::table('md_user_login')->where('_id',$request->id)->get();
        $users=MdUserLogin::where('_id',$request->id)->get();
        foreach ($users as $value) {
            $user_type=$value->user_type;
            $remember_token=$value->remember_token;
        }
        if($request->user_type==$user_type && $request->remember_token==$remember_token){
            return $next($request);
        }
        return response()->json( [
                    'success' => 0,
                    'message' => "Logout",
                ], 201 );
    }
}
