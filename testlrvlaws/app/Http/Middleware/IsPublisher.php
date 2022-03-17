<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use DB;
use App\Models\MdUserLogin;

class IsPublisher
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
        $user_type=MdUserLogin::where('_id',$request->id)->value('user_type');
        if($user_type == $request->user_type){
            return $next($request);
        }
        return response()->json( [
                    'success' => 0,
                    'message' => "Logout",
                ], 201 );
    }
}
