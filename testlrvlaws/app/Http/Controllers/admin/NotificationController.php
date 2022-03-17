<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\TdNotification;
use App\Models\TdPublisherBookDetails;
use App\Models\TdPublisherDetails;

class NotificationController extends Controller
{
    public function Count(Request $request){
        $admin_id='60191c1b72de67741be6cc4c';
    	$notification_count=TdNotification::where('to_user_id',$admin_id)
            ->where('read_flag','N')
            ->get();
        return response()->json( [
                'success' => 1,
                'Notification_count' =>count($notification_count),
                'message' =>$notification_count,
            ], 200 );
    }

    public function Show(Request $request){
        $admin_id='60191c1b72de67741be6cc4c';
    	TdNotification::where('to_user_id', $admin_id)
               ->update([
                  'read_flag' => "Y",
                  // 'updated_by' => Session::get('subcontractor')[0]['user_name'],
                ]); 
    	$notification_data=TdNotification::where('to_user_id',$admin_id)
            ->where('read_flag','!=','R')
            // ->orderBy('date','desc')
            ->orderBy('created_at','desc')
            ->get();
        $notifications=array();
        foreach ($notification_data as $value) {
        	if ($value->from_user_type=='P') {
                // $from_user_name=TdPublisherDetails::where('user_id',$value->from_user_id)->value('name');
                $from_user_name=TdPublisherDetails::where('publisher_id',$value->from_user_id)->value('name');
                $value->from_user_name=$from_user_name;
        	}
            if ($value->publisher_id!=null && $value->book_id!=null) {
                $data1=TdPublisherBookDetails::where('publisher_id',$value->publisher_id)->where('book_id',$value->book_id)->get();
                foreach ($data1 as $value1) {
                    $value->publisher_name=$value1->publisher_name;
                    $value->book_name=$value1->book_name;
                    $value->author_name=$value1->author_name;
                }
                
            }
            $image_url=TdPublisherDetails::where('publisher_id',$value->from_user_id)->value('image_url');
            $value->from_user_image=$image_url;
            array_push($notifications, $value);
        }
        return response()->json( [
                'success' => 1,
                'message' =>$notifications,
            ], 200 );
    }
}
