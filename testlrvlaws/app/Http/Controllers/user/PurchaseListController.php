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
// use setasign\Fpdi\Fpdi;
use App\Models\TdRating;
use App\Models\TdRecentVisitBook;
use TCPDI;

class PurchaseListController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_user');
    }

    public function PurchaseList(Request $request){
    	$user_id=$request->id;
    	// $publisher_id=$request->publisher_id;
    	// $book_id=$request->book_id;

    	$groupbybooks=TdBuyBookPages::where('user_id',$user_id)
    			// ->where('publisher_id',$publisher_id)
    			// ->where('book_id',$book_id)
    			->groupBy('book_id')
    			->groupBy('publisher_id')
    			// ->with('BookDetails')
                // ->orderBy('date','DESC')
    			->get();
        // return $groupbybooks;
        // return env('APP_URL');

    	$totalarray=array();
    	$bookdetailsarray=array();

        $pdf = new TCPDI();

    	foreach ($groupbybooks as $value) {
    		$book_id=$value->book_id;
    		// echo "<br/>";
    		$publisher_id=$value->publisher_id;
    		// echo "<br/>";
    		$bookdtails=TdPublisherBookDetails::where('publisher_id',$publisher_id)->where('book_id',$book_id)
                ->with('Ratings')
                ->with('Contents')
                ->get();
    		foreach ($bookdtails as $value1) {
    			$book_image_path=env('APP_URL')."/public/book-images/".$value1->book_image;
                $value1->book_image_path = $book_image_path;
            	$value1->user_id = $user_id;
                // $full_book_name=env('APP_URL')."/public/main-pdf/".$value1->full_book_name;
                // $full_book_name=public_path('main-pdf/').$value1->full_book_name;
                // $pageCount = $pdf->setSourceFile($full_book_name);
                // $value1->page_count = $pageCount;
    			array_push($totalarray, $value1);
    		}

    		// $value->bookdetails=$bookdetailsarray;
    		// $allpurchasebooks=TdBuyBookPages::where('user_id',$user_id)
    		// 	->where('book_id',$book_id)
    		// 	->get();
    		// $value->allpurchasebooks=$allpurchasebooks;
    		// array_push($totalarray, $value);
    	}
    	// $allpurchasebooks=TdBuyBookPages::where('user_id',$user_id)
    	// 		// ->where('publisher_id',$publisher_id)
    	// 		->where('book_id',$book_id)
    	// 		->with('BookDetails')
    	// 		->get();
        // $bookdetailsarray=array();
        // foreach ($allbooks as $value) {
        //     $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
        //     $value->book_image_path = $book_image_path;
        //     array_push($bookdetailsarray, $value);
        // }
        // return $totalarray;
        // return $book_image;
        return response()->json( [
                'success' => 1,
                'message' =>$totalarray
            ], 200 );
    }

    public function PurchaseBookShow(Request $request){
        // empty folder
        // $dir=public_path('merge/*');
        // $files = glob($dir); // get all file names
        // foreach($files as $file){ // iterate files
        //   if(is_file($file)) {
        //     unlink($file); // delete file
        //   }
        // }
        // $unlinkmergepdf =public_path('/merge/merge.pdf');
        // unlink($unlinkmergepdf);
    	$user_id=$request->id;
    	$publisher_id=$request->publisher_id;
    	$book_id=$request->book_id;

        // start recent book view data store into DB
        $data=TdRecentVisitBook::orderBy('_id','desc')->take(1)->get();
        if (count($data)>0) {
            if ($data[0]['user_id']==$user_id && $data[0]['book_id']==$book_id) {
                
            }else{
                TdRecentVisitBook::create(array(
                    'user_id'=>$user_id,
                    'book_id'=>$book_id,
                    'publisher_id'=>$publisher_id,
                )); 
            }
        }else{
            TdRecentVisitBook::create(array(
                'user_id'=>$user_id,
                'book_id'=>$book_id,
                'publisher_id'=>$publisher_id,
            ));
        }
        // end recent book view data store into DB

    	$allpurchasepages=TdBuyBookPages::where('user_id',$user_id)
    			->where('book_id',$book_id)
    			->get();
        // return count($allpurchasepages);
        $files = array();
        if (count($allpurchasepages)>0) {
            foreach ($allpurchasepages as $value) {
                $book_page_url=$value->book_page_url;
                if (isset($value->full_book)) {
                    $splite_data=TdPublisherSplitBookDetails::where('publisher_id',$publisher_id)
                        ->where('book_id',$book_id)
                        ->get();
                    foreach ($splite_data as $value2) {
                        $book_page_url1=$value2->book_page_url;
                        $val=explode('/public/', $book_page_url1);
                        // print_r($val);
                        array_push($files,$val[1]);
                    }
                    if (count($splite_data)>0) {
                        $allpurchasepages=$splite_data;
                    } 
                    $full_book='Y';
                    // return response()->json( [
                    //         'success' => 1,
                    //         'mergepdf'=>$book_page_url,
                    //         'message' =>$splite_data,
                    //         'full_book'=>'Y',
                    //     ], 200 ); 
                }else{
                   // return $book_page_url;
                   $val=explode('/public/', $book_page_url);
                   // print_r($val);
                   array_push($files,$val[1]);
                    $full_book='N';
                   // array_push($files,$book_page_url);
                }
            }

        } else {
            $full_book='N';
        }

        // return $files;
        
        

        // return $files;
        $todate=microtime("Ymdhis");
        $directory1=public_path('/merge/').$todate.".pdf";
        // return $directory;
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
        // return $newPdf->output($directory, 'F');
        // if ($newPdf->output($directory1, 'F')) {
            $mergepdfurl=env('APP_URL')."/public/merge/".$todate.".pdf";
        // return $pdf->Output('concat.pdf');
            return response()->json( [
                    'success' => 1,
                    'mergepdf'=>$mergepdfurl,
                    'message' =>$allpurchasepages,
                    'full_book'=>$full_book,
                ], 200 );
        // }else{
        //     return response()->json( [
        //             'success' => 0,
        //             // 'mergepdf'=>$mergepdfurl,
        //             'message' =>"error"
        //         ], 200 );
        // }
        
    }
}
