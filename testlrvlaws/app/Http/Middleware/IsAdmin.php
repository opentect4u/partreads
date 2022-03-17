<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use DB;

class IsAdmin
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
        $user_type=MdUserLogin::where('user_id',$request->user_id)->value('user_type');
        if($user_type == $request->user_type){
            return $next($request);
        }
        return response()->json( [
                    'success' => "logout",
                    'message' => "You don't have admin access.",
                ], 401 );
    }
}
