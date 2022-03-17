<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TdRating;
use DB;

class RatingController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_user');
    }

    public function Create(Request $request)
    {
        // $user_id=$request->user_id;
        // $book_id=$request->book_id;
        // $rating_no=$request->rating_no;
        // $review=$request->review;
        $user_name='';
        $is_has=DB::table('td_ratings')->where('user_id',$request->id)->where('book_id',$request->book_id)->get();
        // $is_has=TdRating::where('user_id',$request->id)->where('book_id',$request->book_id)->get();
        // return $is_has;
        // return $is_has[0]['_id'];
        if (count($is_has)>0) {
            $id=$is_has[0]['_id'];
            $data=TdRating::find($id);
            $data->rating_no=$request->rating_no;
            $data->review=$request->review;
            $data->save();
        } else {
            // return $request->id. "/ ". $request->book_id." /".$request->rating_no."/".$request->review;
            $data=TdRating::create(array(
                "user_id"  => $request->id,
                "book_id"  => $request->book_id,
                "rating_no"  => $request->rating_no,
                "review"  => $request->review,
                "Show_flag"=>'I',
                "create_date"  => date('Y-m-d'),
                "created_by"  => $user_name,
            ));
        }
        
        
        return response()->json( [
                'success' => 1,
                'message' => $data,
            ], 200 );
    }

    public function ShowRatingUser(Request $request)
    {
        $user_id=$request->id;
        $book_id=$request->book_id;
        // $rating_no=$request->rating_no;
        // $review=$request->review;
        $is_has=TdRating::where('user_id',$user_id)->where('book_id',$book_id)
        ->where('Show_flag','Y')
        ->get();
        $is_has1=TdRating::where('book_id',$book_id)->where('Show_flag','Y')->get();
        return response()->json( [
                'success' => 1,
                'message' => $is_has,
                'allreview' => $is_has1,
            ], 200 );
    }

    public function AvarageRating(Request $request)
    {
        $book_id=$request->book_id;
        // $rating_no=$request->rating_no;
        // $review=$request->review;
        $is_has=TdRating::where('book_id',$book_id)->where('Show_flag','Y')->get();
        if (count($is_has)>0) {
            $avcount=0;
            $usercount=count($is_has);
            // return $usercount;
            foreach($is_has as $value){
                $avcount=$avcount + $value->rating_no;
            }
            $avrating=$avcount/$usercount;
        }else{
            $avrating=0;
        }
        $message=collect();
        $message['averagerating']=$avrating;
        return response()->json( [
                'success' => 1,
                'message' => $message,
            ], 200 );
    }
}
