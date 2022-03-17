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
use App\Models\TdBuyBookPayment;
use App\Models\TdAddCart;
use App\Models\TdRating;
use App\Models\TdNotification;
use App\Models\TdRecentVisitBook;
use App\Models\MdCategory;
use App\Models\MdSubCategory;
use App\Models\TdTableofContent;
use TCPDI;
use App\Models\TdPublisherDetails;
use App\Models\TdPrintBook;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_user');
    }

    public function Publishers()
    {
        $publishers=TdPublisherDetails::orderBy('name','asc')->get();
        return response()->json( [
                'success' => 1,
                'message' =>$publishers
            ], 200 ); 
    }  

    public function ALLBooks(Request $request){
        $min=$request->min;
        $max=$request->max;
        // if ($request->category_id!='' && $request->subcategory_id!='' && $request->sort_by!='') {
        //     if ($request->sort_by=="AtoZ") {
        //         $orderby='asc';
        //     }else if ($request->sort_by=="ZtoA") {
        //         $orderby='desc';
        //     } else {
        //     }
        //     // category_id
        //     // sub_category_id
        //     $allbooks=TdPublisherBookDetails::where('active_book','A')
        //     ->where('show_book','Y')
        //     ->where('category_id',$request->category_id)
        //     ->where('sub_category_id',$request->subcategory_id)
        //     ->with('Ratings')
        //     ->orderBy('book_name',$orderby)
        //     // ->orderBy('created_at','desc')
        //     ->get();
        // }else 
        if ($request->category_id!='' && $request->subcategory_id!='' ) {
            // category_id
            // sub_category_id
            $allbooks=TdPublisherBookDetails::where('active_book','A')
            ->where('show_book','Y')
            ->where('category_id',$request->category_id)
            ->where('sub_category_id',$request->subcategory_id)
            ->with('Ratings')
            ->orderBy('created_at','desc')
            ->get();
        } 
        // else if ($request->category_id!='' && $request->sort_by!='') {
        //     if ($request->sort_by=="AtoZ") {
        //         $orderby='asc';
        //     }else if ($request->sort_by=="ZtoA") {
        //         $orderby='desc';
        //     } else {
        //     }
        //     $allbooks=TdPublisherBookDetails::where('active_book','A')
        //     ->where('show_book','Y')
        //     ->where('category_id',$request->category_id)
        //     // ->whereIn('category_id_1',array($request->category_id))
        //     // ->whereIn('category_id_2',array($request->category_id))
        //     // ->orwhere('category_id_1',$request->category_id)
        //     // ->orwhere('category_id_2',$request->category_id)
        //     // ->where('sub_category_id',$request->subcategory_id)
        //     ->with('Ratings')
        //     ->orderBy('book_name',$orderby)
        //     // ->orderBy('created_at','desc')
        //     ->get();

        // }
        else if ($request->category_id!='') {
            $allbooks=TdPublisherBookDetails::where('active_book','A')
            ->where('show_book','Y')
            ->where('category_id',$request->category_id)
            // ->whereIn('category_id_1',array($request->category_id))
            // ->whereIn('category_id_2',array($request->category_id))
            // ->orwhere('category_id_1',$request->category_id)
            // ->orwhere('category_id_2',$request->category_id)
            // ->where('sub_category_id',$request->subcategory_id)
            ->with('Ratings')
            ->orderBy('created_at','desc')
            ->get();

        
        }
        else if ($request->publisher_id!='') {
            $allbooks=TdPublisherBookDetails::where('active_book','A')
            ->where('show_book','Y')
            ->where('publisher_id',$request->publisher_id)
            ->with('Ratings')
            ->orderBy('created_at','desc')
            ->get();
        }
        // else if ($request->sort_by!='') {
        //     if ($request->sort_by=="AtoZ") {
        //         $orderby='asc';
        //         $allbooks=TdPublisherBookDetails::where('active_book','A')->where('show_book','Y')
        //         ->with('Ratings' )
        //         ->orderBy('book_name',$orderby)
        //         ->get();
        //     }else if ($request->sort_by=="ZtoA") {
        //         $orderby='desc';
        //         $allbooks=TdPublisherBookDetails::where('active_book','A')->where('show_book','Y')
        //         ->with('Ratings' )
        //         ->orderBy('book_name',$orderby)
        //         ->get();
        //     }else{
        //        $allbooks=TdPublisherBookDetails::where('active_book','A')->where('show_book','Y')
        //             ->with('Ratings')
        //             ->orderBy('created_at','desc')
        //             ->get(); 
        //     }
            
        // } 
        else {
            $allbooks=TdPublisherBookDetails::where('active_book','A')->where('show_book','Y')
            ->with('Ratings')
            ->orderBy('created_at','desc')
            ->get();
        }
        
        
        if ($request->sort_by=="lowtohigh") {
            $arrayName = [];
            foreach ($allbooks as $key => $value) {
                // return $value;
                $total_rating=0;
                foreach($value->ratings as $ratings){
                    // return $ratings;
                    $total_rating=$total_rating+$ratings->rating_no;
                }
                $value->total_rating=$total_rating;
                array_push($arrayName,$value);
            }
            // return $arrayName;
            // $total_rating1 = array_column($arrayName, 'total_rating');
            usort($arrayName, function ($item1, $item2) {
                 // return $item2['total_rating'] <=> $item1['total_rating'];
                return $item1['total_rating'] <=> $item2['total_rating'];
            });
            $bookdetailsarray=array();
            $i=0;
            foreach($arrayName as $value) {
                if ($i>=$min && $i<$max) {
                
                $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
                $value->book_image_path = $book_image_path;
                array_push($bookdetailsarray, $value);
                }
                $i++;
            }
        }else if ($request->sort_by=="hightolow") {
            $arrayName = [];
            foreach ($allbooks as $key => $value) {
                // return $value;
                $total_rating=0;
                foreach($value->ratings as $ratings){
                    // return $ratings;
                    $total_rating=$total_rating+$ratings->rating_no;
                }
                $value->total_rating=$total_rating;
                array_push($arrayName,$value);
            }
            // return $arrayName;
            // $total_rating1 = array_column($arrayName, 'total_rating');
            usort($arrayName, function ($item1, $item2) {
                 return $item2['total_rating'] <=> $item1['total_rating'];
                // return $item1['total_rating'] <=> $item2['total_rating'];
            });
            $bookdetailsarray=array();
            $i=0;
            foreach($arrayName as $value) {
                if ($i>=$min && $i<$max) {
                
                $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
                $value->book_image_path = $book_image_path;
                array_push($bookdetailsarray, $value);
                }
                $i++;
            }
        
        }else if ($request->sort_by=="AtoZ") {
            $arrayName = [];
            foreach($allbooks as $vv){
               array_push($arrayName,$vv) ;
            }
            usort($arrayName, function ($item1, $item2) {
                 return $item1['book_name'] <=> $item2['book_name'];
            });
            $bookdetailsarray=array();
            $i=0;
            foreach($arrayName as $value) {
                if ($i>=$min && $i<$max) {
                
                $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
                $value->book_image_path = $book_image_path;
                array_push($bookdetailsarray, $value);
                }
                $i++;
            }
        }else if ($request->sort_by=="ZtoA") {
            $arrayName = [];
            foreach($allbooks as $vv){
               array_push($arrayName,$vv) ;
            }
            usort($arrayName, function ($item1, $item2) {
                 return $item2['book_name'] <=> $item1['book_name'];
            });
            $bookdetailsarray=array();
            $i=0;
            foreach($arrayName as $value) {
                if ($i>=$min && $i<$max) {
                
                $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
                $value->book_image_path = $book_image_path;
                array_push($bookdetailsarray, $value);
                }
                $i++;
            }
        }else{
            $bookdetailsarray=array();
            $i=0;
            foreach($allbooks as $value) {
                if ($i>=$min && $i<$max) {
                
                $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
                $value->book_image_path = $book_image_path;
                array_push($bookdetailsarray, $value);
                }
                $i++;
            }
        }


        

        // if ($request->sort_by='AtoZ') {
        //     $bookdetailsarray = collect($bookdetailsarray)->sortBy('book_name')->toArray();
        // }else if ($request->sort_by='ZtoA') {
        //     $bookdetailsarray = collect($bookdetailsarray)->sortByDesc('book_name')->toArray();
        // }

        return response()->json( [
                'success' => 1,
                'total_book'=>count($allbooks),
                'message' =>$bookdetailsarray
            ], 200 );
    }

    public function TopRatedBook()
    {
        $ratingdata=TdRating::groupBy('book_id')
               ->get();
        $rating=[];      
        foreach ($ratingdata as $key => $value) {
            $book_id=$value->book_id;
            $total_rating=0;
            $variable1=TdRating::where('book_id',$book_id)
                ->where('Show_flag','Y')->get();
            foreach ($variable1 as $key => $value1) {
                $total_rating=$total_rating+$value1->rating_no;
            }
            $value->total_rating=(int)$total_rating;
            $dddd=TdPublisherBookDetails::where('book_id',$book_id)->with('Ratings')->get();
            $value->data=$dddd;
            $value->img_url=env('APP_URL')."/public/book-images/";
            // if (count($rating)<8) {
            //     array_push($rating, $value);
            // }
                array_push($rating, $value);
        }

        usort($rating, function ($item1, $item2) {
                 return $item2['total_rating'] <=> $item1['total_rating'];
                // return $item1['total_rating'] <=> $item2['total_rating'];
        });
        $arrayName=[];
        foreach ($rating as $key => $value1) {
            if (count($arrayName)<8) {
                array_push($arrayName, $value1);
            }
        }

        return response()->json( [
                'success' => 1,
                'message' =>$arrayName
            ], 200 );
    }

    public function CateWithSubcategory()
    {
        $catwithsubcat=MdCategory::orderBy('name','asc')->get();
        $ccc=[];
        foreach ($catwithsubcat as $key => $value) {
            $sub_category=MdSubCategory::where('category_id',$value->_id)->orderBy('name','asc')->get();
            $value->sub_category=$sub_category;
            array_push($ccc,$value);
        }
        return response()->json( [
                'success' => 1,
                'message' =>$ccc
            ], 200 );
    }

    public function RelatedBook(Request $request)
    {
        if ($request->category_id!='') {
            $book_id=$request->book_id;
            $books=TdPublisherBookDetails::where('book_id','!=',$book_id)->where('active_book','A')->where('show_book','Y')->where('category_id',$request->category_id)
            // ->with('Ratings')
            // ->with('Contents')
            ->take(6)
            ->get();
            return response()->json( [
                    'success' => 1,
                    'message' =>$books
                ], 200 );
        } else {
            return response()->json( [
                'success' => 0,
                'message' =>'Something wrong'
            ], 201 );
        }
        
        
    }

    public function Book(Request $request){
    	$publisher_id=$request->publisher_id;
    	$book_id=$request->book_id;
    	// return $id." ".$book_id;
        // start recent book view data store into DB
        $user_id=$request->id;
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


    	$books=TdPublisherBookDetails::where('publisher_id',$publisher_id)->where('book_id',$book_id)->where('active_book','A')->where('show_book','Y')
            ->with('Ratings')
            ->with('Contents')
            ->get();
    	// return $books;
        $bookarray=array();
        foreach ($books as $value) {
            $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
            $value->book_image_path = $book_image_path;
            // $full_book_name=env('APP_URL')."/main-pdf/".$value->full_book_name;
            $full_book_name=public_path('main-pdf/').$value->full_book_name;

            // $pdf = new Fpdi();
            $pdf = new TCPDI();
            $pageCount = $pdf->setSourceFile($full_book_name);
            $value->page_count = $pageCount;
            $Buy_pages = TdBuyBookPages::where('user_id',$user_id)->where('publisher_id',$publisher_id)->where('book_id',$book_id)->get();
            $value->Buy_pages =$Buy_pages;
            if (count($Buy_pages)>0) {
                foreach ($Buy_pages as $value5) {
                    if (isset($value5->full_book)) {
                        $full_book=$value5->full_book;
                    } else {
                        $full_book='N';
                    }
                    
                }
            }else{
                $full_book='N';
            }
            $value->full_book =$full_book;
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
        // $newPdf = new TCPDI();
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

        // start get content 
        $book_of_content=TdTableofContent::where('book_id',$book_id)->where('publisher_id',$publisher_id)->get();
        // end get content 

        // return $id;
        return response()->json( [
                'success' => 1,
                'message' =>$data,
                'mergepdf' =>$mergepdfurl,
                'book_id' =>$book_id,
                'publisher_id' =>$publisher_id,
                'book_of_content' =>$book_of_content
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

        $whole_book=$request->whole_book;

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
            $price=0;
        $total_price=0;
        foreach ($split_book_details as $split_book_details_pages) {
            $publisher_id=$split_book_details_pages->publisher_id;
            $book_page_no=$split_book_details_pages->book_page_no;
            $bookid=$split_book_details_pages->book_id;
            $book_page_name=$split_book_details_pages->book_page_name;
            $book_page_url=$split_book_details_pages->book_page_url;
            $price=$split_book_details_pages->price;
            if ($whole_book=='Y') {
               $msg=TdBuyBookPages::create(array(
                    'user_id'=>$user_id,
                    'publisher_id'=>$publisher_id,
                    'book_id'=>$bookid,
                    'book_page_name'=>$book_page_name,
                    'book_page_no'=>$book_page_no,
                    'book_page_url'=>$book_page_url,
                    'full_book'=>'Y',
                    'price'=>$price,
                    'created_by'=>$user_name,
                ));
            } else {
               

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
                    $total_price=$total_price+$price;
                    
                }
            }
        }
        //payment history
        $order_id=rand(11111,99999);
        TdBuyBookPayment::create(array(
                    'user_id'=>$user_id,
                    'publisher_id'=>$pub_id,
                    'book_id'=>$book_id,
                    'book_page_no'=>$form_page." - ".$to_page,
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
                    'publisher_id'=>$pub_id,
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
                    'publisher_id'=>$pub_id,
                    'book_id'=>$book_id,
                    'subject'=>'BuyBookPages',
                    'body'=>$form_page."-".$to_page,
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
        $msg=[];
        return response()->json( [
                'success' => 1,
                'message' =>$msg,
                'form_page' =>$form_page,
                'to_page' =>$to_page,
                'book_id' =>$book_id,
                'publisher_id' =>$pub_id
            ], 200 );
    }


    public function PrintBook(Request $request)
    {
        $user_id=$request->id;
        $book_id=$request->book_id;
        $publisher_id=$request->publisher_id;

        $address=$request->address;
        $state=$request->state;
        $city=$request->city;
        $pincode=$request->pincode;

        $data=TdPrintBook::create(array(
            'create_date'=>date('Y-m-d h:i:s'),
            'user_id'=>$user_id,
            'book_id'=>$book_id,
            'publisher_id'=>$publisher_id,
            'address'=>$address,
            'state'=>$state,
            'city'=>$city,
            'pincode'=>$pincode,
            'read_flag'=>'N',
        ));

        //start buy book 
        $user_name=DB::table('md_user_login')->where('_id',$user_id)->value('user_name');

        $is_has_row=TdBuyBookPages::where('book_id',$book_id)
                    ->where('publisher_id',$publisher_id)
                    ->get();
        if (count($is_has_row)>0) {
            TdBuyBookPages::where('book_id',$book_id)
                    ->where('publisher_id',$publisher_id)
                    ->delete();
        }
        $book_details=TdPublisherBookDetails::where('book_id',$book_id)
                    ->where('publisher_id',$publisher_id)
                    ->get();
                foreach ($book_details as $value2) {
                    $full_book_name=$value2->full_book_name;
                    $price=$value2->price;
                    $total_price=$value2->price_fullbook;
                    $book_name=$value2->book_name;
                    $active_book=$value2->active_book;
                    $author_name=$value2->author_name;
                }
                $book_page_url=env('APP_URL')."/public/main-pdf/".$full_book_name;
                $msg=TdBuyBookPages::create(array(
                    'user_id'=>$user_id,
                    'publisher_id'=>$publisher_id,
                    'book_id'=>$book_id,
                    'book_page_name'=>'',
                    'book_page_no'=>'',
                    'book_page_url'=>$book_page_url,
                    'full_book'=>'Y',
                    'price'=>$price,
                    'created_by'=>$user_name,
                ));

                $order_id=rand(11111,99999);
                TdBuyBookPayment::create(array(
                            'user_id'=>$user_id,
                            'publisher_id'=>$publisher_id,
                            'book_id'=>$book_id,
                            'book_page_no'=>"Whole Book ",
                            'date'=>date('Y-m-d h:i:s'),
                            'price'=>$price,
                            'total_price'=>$total_price,
                            'order_id'=>$order_id,
                        ));

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

        //end buy book 

        return response()->json( [
                'success' => 1,
                'message' =>$data,
                'book_name'=>$book_name,
                'active_book'=>$active_book,
                'author_name'=>$author_name,
            ], 200 );
    }
}
