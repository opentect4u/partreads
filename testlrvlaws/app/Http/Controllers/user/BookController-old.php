<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\TdUserDetails;
use App\Models\TdPublisherBookDetails;
use App\Models\TdPublisherSplitBookDetails;
use App\Models\TdBuyBookPages;
use App\Models\MdUserLogin;
use setasign\Fpdi\Tcpdf\Fpdi;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_user');
    }

    public function ALLBooks(){
        $allbooks=TdPublisherBookDetails::where('active_book','A')->where('show_book','Y')->get();
        $bookdetailsarray=array();
        foreach ($allbooks as $value) {
            $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
            $value->book_image_path = $book_image_path;
            array_push($bookdetailsarray, $value);
        }
        
        return response()->json( [
                'success' => 1,
                'message' =>$bookdetailsarray
            ], 200 );
    }

    public function Book(Request $request){
    	$publisher_id=$request->publisher_id;
    	$book_id=$request->book_id;
    	// return $id." ".$book_id;
    	$books=TdPublisherBookDetails::where('publisher_id',$publisher_id)->where('book_id',$book_id)->where('active_book','A')->where('show_book','Y')->get();
    	// return $books;
        $bookarray=array();
        foreach ($books as $value) {
            $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
            $value->book_image_path = $book_image_path;
            array_push($bookarray, $value);
        }
        
        return response()->json( [
                'success' => 1,
                'message' =>$bookarray
            ], 200 );
    }

    public function BookPreviewIndex(Request $request){
        $publisher_id=$request->publisher_id;
        $book_id=$request->book_id;
        $data=TdPublisherSplitBookDetails::where('contain_page','Y')
                ->orWhere('show_page','Y')
                ->where('publisher_id',$publisher_id)
                ->where('book_id',$book_id)
                ->get();
        $files = array();
        foreach ($data as $value) {
           $book_page_url=$value->book_page_url;
           $val=explode('/public/', $book_page_url);
           array_push($files,$val[1]);
        }

        $todate=microtime("Ymdhis");
        // $directory1=public_path('/merge/');
        $directory1=public_path('/merge/').$todate.".pdf";
        // return $directory1;
        $i=1;
        $newPdf = new Fpdi();
        foreach($files as $file) {
            // return $file;
            $url=public_path()."/".$file;
            // return $url;
            $newPdf->addPage();
            $newPdf->setSourceFile($url);
            // return "hii";
            $newPdf->useTemplate($newPdf->importPage($i));
        }
        $newPdf->output($directory1, 'F');
        $mergepdfurl=env('APP_URL')."/public/merge/".$todate.".pdf";

        // return $id;
        return response()->json( [
                'success' => 1,
                'message' =>$data,
                'mergepdf' =>$mergepdfurl,
                'book_id' =>$book_id,
                'publisher_id' =>$publisher_id
            ], 200 );
    }

    public function PreviewAndBuyPages(Request $request){
        $publisher_id=$request->publisher_id;
        $book_id=$request->book_id;
        $user_id=$request->id;

        $totalPages = array();
        $data1=TdPublisherSplitBookDetails::where('contain_page','Y')
                ->orWhere('show_page','Y')
                ->where('publisher_id',$publisher_id)
                ->where('book_id',$book_id)
                ->get();
        foreach ($data1 as $value1) {
            array_push($totalPages, $value1);
        }
        $data2=TdBuyBookPages::where('user_id',$user_id)
                ->where('publisher_id',$publisher_id)
                ->where('book_id',$book_id)
                ->get();
        foreach ($data2 as $key => $value2) {
            array_push($totalPages, $value2);
        }

        $total=TdPublisherSplitBookDetails::where('publisher_id',$publisher_id)
                ->where('book_id',$book_id)
                ->get();
        // return count($total);
        return response()->json( [
                'success' => 1,
                'message' =>$totalPages,
                'count_totalpages'=>count($total),
                'user_id' =>$user_id,
                'book_id' =>$book_id,
                'publisher_id' =>$publisher_id
            ], 200 );

    }


    public function BuybookPages(Request $request){
        $user_id=$request->id;
        $book_id=$request->book_id;
        $pub_id=$request->publisher_id;
        $form_page=$request->from;
        $to_page=$request->to;
        // return $form_page;
        // return $to_page;
        $user_name=DB::table('md_user_login')->where('_id',$user_id)->value('user_name');
        // $user_name = MdUserLogin::where('_id',$user_id)->pluck('user_name');

        // return $user_name;

        $split_book_details=TdPublisherSplitBookDetails::where('book_id',$book_id)
            ->where('publisher_id',$pub_id)
            ->get();
        // return $split_book_details;
        // return $user_id;
        foreach ($split_book_details as $split_book_details_pages) {
           $publisher_id=$split_book_details_pages->publisher_id;
           $book_page_no=$split_book_details_pages->book_page_no;
           $bookid=$split_book_details_pages->book_id;
           $book_page_name=$split_book_details_pages->book_page_name;
           $book_page_url=$split_book_details_pages->book_page_url;
           $price=$split_book_details_pages->price;
            if ($book_page_no>=$form_page && $book_page_no<=$to_page) {
                $msg=TdBuyBookPages::create(array(
                    'user_id'=>$user_id,
                    'publisher_id'=>$publisher_id,
                    'book_id'=>$bookid,
                    'book_page_name'=>$book_page_name,
                    'book_page_no'=>$book_page_no,
                    'book_page_url'=>$book_page_url,
                    'price'=>$price,
                    'created_by'=>$user_name,
                ));
                // echo $bookid;
                
            }
        }

        //start notification section
        TdNotification::create(array(
                    'date'=>date('Y-m-d h:i:s'),
                    'from_user_type'=>'U',
                    'from_user_id'=>$user_id,
                    'to_user_type'=>'U',
                    'to_user_id'=>$user_id,
                    'publisher_id'=>$publisher_id,
                    'book_id'=>$book_id,
                    'subject'=>'BuyBookPages',
                    'body'=>$form_page.",".$to_page,
                    'path'=>'',
                    'read_flag'=>'N',
                ));
        //end notification section

        return response()->json( [
                'success' => 1,
                'message' =>$msg,
                'form_page' =>$form_page,
                'to_page' =>$to_page,
                'book_id' =>$book_id,
                'publisher_id' =>$publisher_id
            ], 200 );
    }
}
