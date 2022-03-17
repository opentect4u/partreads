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
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use setasign\Fpdi\Tcpdf\Fpdi;

use App\Models\TdRecentShareBook;
use App\Models\TdNotification;
use Illuminate\Support\Facades\Mail;
use App\Mail\SharepageEmail;
use App\Mail\SharebookPageEmail;

use App\Models\TdAddCart;
use App\Models\TdBuyBookPayment;


class ShareBookController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_user');
    }

    // link share and copy link 
    public function ShareBookPage(Request $request){
    	$user_id=$request->id;
    	$pages_no=$request->page;
		$Toemail=$request->recipient;
    	// return $pages_no;

    	$publisher_id=$request->publisher_id;
    	$book_id=$request->book_id;

    	$main_url=DB::table('md_param')->where('_id','6019359d72de67741be6cc51')->value('param_value');

    	// $pages_no=array(1,6,7,8);
    	// $pages_no=["1","6","7","8"];
    	// return count($pages_no);
    	// return $pages_no;

    	$book_pages = array();
    	if ($Toemail!='') {
    		$url=$main_url.'/#/user/clickonlink?v1='.$publisher_id.'&v2='.$book_id.'&v3='.Crypt::encrypt($pages_no);
            //start notification and mail section
            $emails=explode(',', $Toemail);
            // return $emails;
            for ($i=0; $i < count($emails); $i++) { 
                // return $emails[$i];
                $to_user_id=MdUserLogin::where('user_id',$emails[$i])->value('id');
                // return $to_user_id;
                if ($to_user_id!=null) { 
                    $pages='';
                    for ($i=0; $i < count($pages_no); $i++) { 
                        if ($i==0) {
                           $pages.=$pages_no[$i]; 
                        }else{
                           $pages.=", ".$pages_no[$i]; 

                        }
                    }
                    TdNotification::create(array(
                        'date'=>date('Y-m-d h:i:s'),
                        'from_user_type'=>'U',
                        'from_user_id'=>$user_id,
                        'to_user_type'=>'U',
                        'to_user_id'=>$to_user_id,
                        'publisher_id'=>$publisher_id,
                        'book_id'=>$book_id,
                        'subject'=>'LinkShare',
                        // 'body'=>$pages_no,
                        'body'=>$pages,
                        'path'=>$url,
                        'read_flag'=>'N',
                    ));
                }
                // pleaswe code here to mail 
                // $Toemail 
                $user_name='Reader';
                $email=$emails[$i];
                // return $url;
                Mail::to($email)->send(new SharebookPageEmail($user_name,$url));
            }
    		//end notification and mail section
            

    	}else{
    		// for ($i=0; $i < count($pages_no); $i++) { 
    		// echo $pages_no[$i];
    			$url=$main_url.'/#/user/clickonlink?v1='.$publisher_id.'&v2='.$book_id.'&v3='.Crypt::encrypt($pages_no);
    		// $buy_book_page=TdBuyBookPages::where('user_id',$user_id)
    		// 		->where('publisher_id',$publisher_id)
    		// 		->where('book_id',$book_id)
    		// 		->where('book_page_no',$pages_no[$i])
    		// 		->get();
    		// if (count($buy_book_page)>0) {
    		// 	foreach ($buy_book_page as $buy_book_pages) {
    		// 		echo $buy_book_pages->book_page_no;
    		// 		array_push($book_pages, $buy_book_pages->book_page_no);
    		// 	}
    		// }
    			// array_push($book_pages, $url);

    		// }
    	}

        // start share data store into DB
        $data=TdRecentShareBook::orderBy('_id','desc')->take(1)->get();
        if (count($data)>0) {
            if ($data[0]['user_id']==$user_id && $data[0]['book_id']==$book_id) {
                
            }else{
                TdRecentShareBook::create(array(
                    'user_id'=>$user_id,
                    'book_id'=>$book_id,
                    'page_no'=>$pages_no,
                ));
            }
        }else{
            TdRecentShareBook::create(array(
                'user_id'=>$user_id,
                'book_id'=>$book_id,
                'page_no'=>$pages_no,
            ));
        }
        
        // end share data store into DB
    	
    	

    	// return $main_url;
    	// return $pages_no;
    	return response()->json( [
                    'success' => 1,
                    'message' =>$url
                    ], 200 );
    }

    // click on particular page 
    public function ClickLink(Request $request){
    	$user_id=$request->id;
    	$publisher_id=$request->publisher_id;
    	$book_id=$request->book_id;
        $page_no=Crypt::decrypt($request->page);
    	// $page_no=$request->page;
        // return $page_no;
    	// $book_page_name=$book_id.'_'.$page_no.'.pdf';
    	// return $page_no;
        $files = array();
        $not_buy_page = array();
        $buy_book_pages = array();
        for ($i=0; $i < count($page_no); $i++) { 
            $page_1= $page_no[$i];
            // return $page_1;
            $book_page_name=$book_id.'_'.$page_1.'.pdf';
            $buy_book_page=TdBuyBookPages::where('user_id',$user_id)
                    ->where('publisher_id',$publisher_id)
                    ->where('book_id',$book_id)
                    ->where('book_page_no',(int)$page_1)
                    // ->where('book_page_name',$book_page_name)
                    ->get();
            // return $buy_book_page;
            if (count($buy_book_page)>0) {
                foreach ($buy_book_page as $value) {
                   // echo $value->book_page_url;
                   array_push($files, $value->book_page_url);
                   array_push($buy_book_pages, $value);
                }
            }else{
                array_push($not_buy_page, $page_1);
            }

        }
        // return $page_url;

        $todate=microtime("Ymdhis");
        $directory1=public_path('/merge/').$todate.".pdf";
        $i=1;
        $newPdf = new Fpdi();
        foreach($files as $file) {
            // return $file;
            $val=explode('/public/', $file);
            $url=public_path()."/".$val[1];
            $newPdf->addPage();
            $newPdf->setSourceFile($url);
            $newPdf->useTemplate($newPdf->importPage($i));
        }
        $newPdf->output($directory1, 'F');
        $mergepdfurl=env('APP_URL')."/public/merge/".$todate.".pdf";

        $book_details=TdPublisherBookDetails::where('book_id',$book_id)
            ->with('Contents')
            ->get();

        return response()->json( [
                    'success' => 1,
                    'mergepdfurl'=>$mergepdfurl,
                    'not_buy_page'=>$not_buy_page,
                    'message' =>$buy_book_pages,
                    'book_details'=>$book_details,
                    ], 200 );
    	// $buy_book_page=TdBuyBookPages::where('user_id',$user_id)
    	// 			->where('publisher_id',$publisher_id)
    	// 			->where('book_id',$book_id)
    	// 			// ->where('book_page_no',$page)
    	// 			->where('book_page_name',$book_page_name)
    	// 			->get();
    	// return $buy_book_page;
    	// if (count($buy_book_page)>0) {
    	// 	return response()->json( [
     //                'success' => 1,
     //                'message' =>$buy_book_page
     //                ], 200 );

    	// }else{
    	// 	return response()->json( [
     //                'success' => 0,
     //                'message' =>"buy page"
     //                ], 201 );
    	// }
    }

    //buy book on model click
    public function BuyBookModelClick(Request $request){
        $user_id=$request->id;
        $publisher_id=$request->publisher_id;
        $book_id=$request->book_id;
        $page_no=$request->not_buy_page;
        // return $page_no;
        $whole_book=$request->whole_book;

        $user_name=DB::table('md_user_login')->where('_id',$user_id)->value('user_name');

        $price=0;
        $total_price=0;
        for ($i=0; $i < count($page_no) ; $i++) { 
            // return $page_no[$i];
            $book_page_name=$book_id.'_'.$page_no[$i].".pdf";
            $split_book_details=TdPublisherSplitBookDetails::where('book_id',$book_id)
                    ->where('publisher_id',$publisher_id)
                    ->where('book_page_no',(int)$page_no[$i])
                    // ->where('book_page_name',$book_page_name)
                    ->get();
            // return $split_book_details;
            foreach ($split_book_details as $split_book_details_pages) {
                $publisher_id=$split_book_details_pages->publisher_id;
                $book_page_no=$split_book_details_pages->book_page_no;
                $bookid=$split_book_details_pages->book_id;
                $book_page_name=$split_book_details_pages->book_page_name;
                $book_page_url=$split_book_details_pages->book_page_url;
                $price=$split_book_details_pages->price;
            }
            $total_price=$total_price+$price;
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

        }

        //payment history
        $order_id=rand(11111,99999);
        TdBuyBookPayment::create(array(
                    'user_id'=>$user_id,
                    'publisher_id'=>$publisher_id,
                    'book_id'=>$book_id,
                    'book_page_no'=>$page_no[0]." - ".$page_no[(count($page_no) - 1)],
                    'date'=>date('Y-m-d h:i:s'),
                    'price'=>$price,
                    'total_price'=>$total_price,
                    'order_id'=>$order_id,
                ));

        //start notification section
        if ($whole_book=='Y') {
            TdNotification::create(array(
                    'date'=>date('Y-m-d h:i:s'),
                    'from_user_type'=>'U',
                    'from_user_id'=>$user_id,
                    'to_user_type'=>'U',
                    'to_user_id'=>$user_id,
                    'publisher_id'=>$publisher_id,
                    'book_id'=>$book_id,
                    'subject'=>'BuyBookPages',
                    'body'=>'',
                    'path'=>'',
                    'read_flag'=>'N',
                ));
        }else{
            TdNotification::create(array(
                    'date'=>date('Y-m-d h:i:s'),
                    'from_user_type'=>'U',
                    'from_user_id'=>$user_id,
                    'to_user_type'=>'U',
                    'to_user_id'=>$user_id,
                    'publisher_id'=>$publisher_id,
                    'book_id'=>$book_id,
                    'subject'=>'BuyBookPages',
                    'body'=>$page_no[0]."-".$page_no[(count($page_no) - 1)],
                    'path'=>'',
                    'read_flag'=>'N',
                ));
        }
        //end notification section

        // start cempty cart logic implement here
        $cart_data=TdAddCart::where('user_id',$user_id)
                    ->where('book_id',$book_id)
                    ->get();
        if (count($cart_data)>0) {
            $deletedRows = TdAddCart::where('user_id',$user_id)
                    ->where('book_id',$book_id)
                    ->delete();
        }
        // end empty cart logic implement here

        return response()->json( [
                'success' => 1,
                // 'mergepdfurl'=>$mergepdfurl,
                'not_buy_page'=>$page_no,
                'message' =>$msg
                ], 200 );
    }

    // copy link
    public function CopyLink(Request $request){

    }

    public function PurchaseBookShow(Request $request){
    	$user_id=$request->id;
    	$publisher_id=$request->publisher_id;
    	$book_id=$request->book_id;
    	$allpurchasepages=TdBuyBookPages::where('user_id',$user_id)
    			->where('book_id',$book_id)
    			->get();
    	return response()->json( [
                'success' => 1,
                'message' =>$allpurchasepages
            ], 200 );
    }
}
