<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\TdNotification;
use App\Models\TdPublisherBookDetails;
use App\Models\TdUserDetails;
use App\Models\TdPublisherDetails;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_user');
    }

    public function Count(Request $request){
    	$user_id=$request->id;
    	$notification_count=TdNotification::where('to_user_id',$user_id)
            ->where('read_flag','N')
            ->get();
        return response()->json( [
                'success' => 1,
                'Notification_count' =>count($notification_count),
                'message' =>$notification_count,
            ], 200 );
    }

    public function Show(Request $request){
    	$user_id=$request->id;
    	TdNotification::where('to_user_id', $user_id)
               ->update([
                  'read_flag' => "Y",
                  // 'updated_by' => Session::get('subcontractor')[0]['user_name'],
                ]); 
    	$notification_data=TdNotification::where('to_user_id',$user_id)
            ->where('read_flag','!=','R')
            // ->orderBy('date','desc')
            ->orderBy('created_at','desc')
            ->get();
        $notifications=array();
        foreach ($notification_data as $value) {
        	if ($value->from_user_type=='U') {
        		$from_user_name=TdUserDetails::where('user_id',$value->from_user_id)->value('name');
                $value->from_user_name=$from_user_name;
                // $image_url=TdUserDetails::where('user_id',$value->from_user_id)->value('image_url');
                // $value->from_user_image=$image_url;
        	}
            if ($value->publisher_id!=null && $value->book_id!=null) {
                $data1=TdPublisherBookDetails::where('publisher_id',$value->publisher_id)->where('book_id',$value->book_id)->get();
                foreach ($data1 as $value1) {
                    $value->publisher_name=$value1->publisher_name;
                    $value->book_name=$value1->book_name;
                    $value->author_name=$value1->author_name;
                    $book_image_url=env('APP_URL').'/public/book-images/'.$value1->book_image;
                    $value->book_image=$book_image_url;

                }
                $image_url=TdPublisherDetails::where('publisher_id',$value->publisher_id)->value('image_url');
                $value->from_user_image=$image_url;
                
            }
            // $value->from_user_image=$image_url;

            array_push($notifications, $value);
        }
        return response()->json( [
                'success' => 1,
                'message' =>$notifications,
            ], 200 );
    }
}
