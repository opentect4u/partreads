<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TdPublisherBookDetails;
use App\Models\TdPublisherSplitBookDetails;
use DB;
use Image;

class BookController extends Controller
{
    public function Show(){
    	$all_book=TdPublisherBookDetails::
        with('Category')->
        with('SubCategory')->
        with('PubName')->
        orderBy('updated_at','DESC')->
        get();
        // return $all_book;
        $bookdetailsarray = array();
        foreach ($all_book as $value) {
            if ($value->show_book=="R") {
                $show_book_msg="Under Review";
            }else if ($value->show_book=="Y") {
                $show_book_msg="Approved";
            }else if ($value->show_book=="N") {
                $show_book_msg="Rejected";
            }
            $value->show_book_msg = $show_book_msg;
            
            $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
            $value->book_image_path = $book_image_path;
            $full_book_path=env('APP_URL')."/public/main-pdf/".$value->full_book_name;
            $value->full_book_path = $full_book_path;
            array_push($bookdetailsarray, $value);
        }

    	return response()->json( [
                'success' => 1,
                'message' =>$all_book
            ], 200 );
    }

    public function ApprovalBook(Request $request){
    	$show_book = $request->input('show_book');
        $id = $request->input('id');
        $tablename = "td_publisher_book_details";

        $approved_book='';
        $date = date('Y-m-d H:i:s');
        if ($show_book == 'R') {
            $data=TdPublisherBookDetails::find($id);
            $data->show_book="Y";
            $data->save();
           // $data= DB::table($tablename)->where('id', $id)->update(['show_book' => 'Y']);
           // return $data;
            $msg = 'success';
            $success=1;
            $approved_book = 'Y';
        } else if ($show_book == 'Y') {
            $data=TdPublisherBookDetails::find($id);
            $data->show_book="N";
            $data->save();
            // DB::table($tablename)
            //     ->where('id', $id)
            //     ->update([
            //         'show_book' => 'N'
            //     ]);
            $msg = 'success';
            $success=1;
            $approved_book = 'N';
        } else {
            $success=0;
            $msg = 'fail';
        }

        $arrNewResult = array();
        $arrNewResult['id'] = $id;
        $arrNewResult['msg'] = $msg;
        $arrNewResult['approved_book'] = $approved_book;
//        array_push( , $msg);
        // $status_json = json_encode($arrNewResult);
        // echo $status_json;
        return response()->json( [
                'success' => $success,
                'message' =>$arrNewResult
            ], 200 );
    }

    public function RejectBook(Request $request){
        $show_book = $request->input('show_book');
        $id = $request->input('id');
        $tablename = "td_publisher_book_details";

        $reject_book = '';
        $date = date('Y-m-d H:i:s');
        if ($show_book == 'R') {
            $data=TdPublisherBookDetails::find($id);
            $data->show_book="N";
            $data->save();
            // DB::table($tablename)
            //     ->where('id', $id)
            //     ->update([
            //         'show_book' => 'N'
            //     ]);
            $msg = 'success';
            $success=1;
            $reject_book = 'N';
        } 
        // else if ($show_book == 'Y') {
        //     DB::table($tablename)
        //         ->where('id', $id)
        //         ->update([
        //             'show_book' => 'N',
        //             'updated_at' =>$date
        //         ]);
        //     $msg = 'success';
        //     $success=1;
        //     $reject_book = 'N';
        // } 
        else {
            $success=0;
            $msg = 'fail';
        }

        $arrNewResult = array();
        $arrNewResult['id'] = $id;
        $arrNewResult['msg'] = $msg;
        $arrNewResult['reject_book'] = $reject_book;
//        array_push( , $msg);
        // $status_json = json_encode($arrNewResult);
        // echo $status_json;
        return response()->json( [
                'success' => $success,
                'message' =>$arrNewResult
            ], 200 );
    }
}
