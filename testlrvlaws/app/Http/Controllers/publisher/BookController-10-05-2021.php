<?php

namespace App\Http\Controllers\publisher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TdPublisherBookDetails;
use App\Models\TdPublisherSplitBookDetails;
use DB;
use Image;
// use setasign\Fpdi\Fpdi;
use setasign\Fpdi\Tcpdf\Fpdi;

use App\Models\MdCategory;
use App\Models\MdSubCategory;
use Illuminate\Support\Facades\Response;
use TCPDI;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_publisher');
    }

    public function ListBook(Request $request){
        $publisher_id=$request->id;
        // return $publisher_id;
        // $publisher_id="602cdfcad9db56676f16e954";
    	$bookdetails=TdPublisherBookDetails::
        where('publisher_id', $publisher_id)->
        // with('Category')->with('SubCategory')->
        orderBy('updated_at','DESC')->
    	get();

        $bookdetailsarray = array();
        foreach ($bookdetails as $value) {
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

        // $value->favorite = $favorite;
        // array_push($search, $value);
        // return "hii";
    	// return $bookdetails;
        return response()->json( [
                    'success' => 1,
                    'message' =>$bookdetailsarray
                    ], 200 );
    }

    public function Show(){
        return view('upload');
    }

    //use for all category 
    public function ALLCategory(){
        $all_category=MdCategory::get();
        // return $all_category;
        return response()->json( [
                    'success' => 1,
                    'message' =>$all_category
                    ], 200 );
    }

    // after select category then show all subcategory 
    public function SubCategory(Request $request){
        $subcategory=MdSubCategory::where('category_id',$request->category_id)->get();
        // return $all_subcategory;
        return response()->json( [
                        'success' => 1,
                        'message' => $subcategory,
                    ], 200 );
    }



    protected function resizeBookImage($book_image_path) {
        $image_resize = Image::make($book_image_path->getRealPath());
        $image_resize->resize(438, null, function($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        return $image_resize;
    }

    public function UplodBook(Request $request){
        $id=$request->id;
        // $id="001";

        // $user_id=$request->user_id;
        // $user_type=$request->user_type;
    	// $user_name=$request->user_name;

    	// $user_token=$request->user_token;


        $book_id=date('YmdHis') .'_'.$id;

        // start book image section 
        // return "same controller";

        // $image=$request->book_image;
        // $book_image_name=$book_id.".jpeg";
        // list($type, $image) = explode(';', $image);
        // list(, $image)      = explode(',', $image);
        // $image = base64_decode($image);
        // $path = public_path('book-images/'.$book_image_name);
        // file_put_contents($path, $image);
       
        if ($request->hasFile('book_image')) {
            $book_image_path = $request->file('book_image');
            // $book_image_name= "1111". '.' . $book_image_path->getClientOriginalExtension();
            $book_image_name= $book_id. '.' . $book_image_path->getClientOriginalExtension();
            // $image_resize=$this->resizeBookImage($book_image_path);
            // $image_resize->save(public_path('book-images/' . $book_image_name));
            $book_image_path->move(public_path('book-images/'), $book_image_name);

        // if($profile->book_image_path!=null){
        // $filesc = public_path('profile-images/subcontractor/') . $profile->book_image_path;
        // if (file_exists($filesc) != null) {
        //         unlink($filesc);
        //     }
        } 
        // return $book_image_name;
        // }
        // return "Error--";
        // end book image section 
//  ==============================================================
        // start full book pdf section 
        if ($request->hasFile('file_book')) {
            $book_path = $request->file('file_book');
            $book_path_extension=$book_path->getClientOriginalExtension();
            // return $cv_path_extension;
            $cv_path_format = explode("/tmp/",$book_path);
           
            $full_book_name=$book_id.".".$book_path_extension;
            // echo "<br/>".$format_cv_path;
            $book_path->move(public_path('main-pdf/'),$full_book_name);

            // return $cv_path;
            // if($profile->cv_path!=null){
            //     $filecv = public_path('sc-cv/') . $profile->cv_path;
            //     if (file_exists($filecv) != null) {
            //           unlink($filecv);
            //     }
            // } 
            // return $full_book_name;
        }
        // return "Error";

        $mainbook_url=public_path('main-pdf/').$full_book_name;
        // return $mainbook_url."<br/>".$full_book_name;
        // end full book pdf section 
//  ================================================================
        // $directory=public_path('split-pdf');
        // $pdf = new Fpdi();
        // $pageCount = $pdf->setSourceFile($mainbook_url);
        // $file = pathinfo($mainbook_url, PATHINFO_FILENAME);
        // // return $file;
        // // Split each page into a new PDF
        // for ($i = 1; $i <= $pageCount; $i++) {
        //     $newPdf = new Fpdi();
        //     $newPdf->addPage();
        //     $newPdf->setSourceFile($mainbook_url);
        //     $newPdf->useTemplate($newPdf->importPage($i));

        //     $dir_newFilename = sprintf('%s/%s_%s.pdf', $directory, $file, $i);
        //     // echo $dir_newFilename;
        //     // return $dir_newFilename;
        //     $newFilename=$file.'_'.$i.'.pdf';
        //     // return $newFilename;
        //     $newPdf->output($dir_newFilename, 'F');

        //     return "pdf split success ";
        // }
//  ==========================================================
    	// $publisher_id=$request->publisher_id;

    	// $book_id=$request->book_id;
    	// $book_name=$request->book_name;
    	// $author_name=$request->author_name;
    	// $book_image=$request->book_image;
    	// $category_id=$request->category_id;
    	// $sub_category_id=$request->sub_category_id;
    	// $suggestion=$request->suggestion;
    	// $isbn_no=$request->isbn_no;
    	// $full_book_name=$request->full_book_name;
    	// $active_book=$request->active_book;

    	// $show_book=$request->show_book;

    	$bookdetails=TdPublisherBookDetails::create(array(
	           "publisher_id"  => $request->id,
               "category_id"  => $request->category_id,
               "sub_category_id"  => $request->sub_category_id,
	           "book_id"  => $book_id,
	           "book_name"  => $request->book_name,
               "publisher_name"  => $request->publisher_name,
	           "author_name"  => $request->author_name,
               "price"  => $request->price,
               "isbn_no"  => $request->isbn_no,
	           "book_image"  => $book_image_name,
               "about_author"  => $request->about_author,
               "about_book"  => $request->about_book,
               // "suggestion"  => "P",
               "full_book_name"  => $full_book_name,
               "active_book"  => "A",
               "show_book"  => "R",
	           "created_by" =>$request->user_name,
	    ));

        $contents_from=$request->contents_from;
        $contents_to=$request->contents_to;
        $random_from=$request->random_from;
        $random_to=$request->random_to;
        $price=$request->price;
        $user_name=$request->user_name;



        // try{
        //     $pdf = new TCPDI();
        //     $pdftype="TCPDI";
        // }catch (expection $e){
        //     $pdf = new Fpdi();
        //     $pdftype="Fpdi";
        // }
        $pdf = new TCPDI();
        $pageCount = $pdf->setSourceFile($mainbook_url);
        

        return response()->json( [
                    'success' => 1,
                    'mainbook_url' =>$mainbook_url , 
                    'id' =>$id , 
                    'book_id' =>$book_id , 
                    'contents_from' =>$contents_from , 
                    'contents_to' =>$contents_to , 
                    'random_from' =>$random_from , 
                    'random_to' =>$random_to , 
                    'price' =>$price , 
                    'user_name' =>$user_name,
                    'uploaded_page' =>0,
                    'totalpage' =>$pageCount,
                    'message' => $bookdetails,
                    ], 200 );
// ==========================================================
        // contents page details
        $contents_from=$request->contents_from;
        $contents_to=$request->contents_to;
        // $contents_from=1;
        // $contents_to=3;
        // random page details
        $random_from=$request->random_from;
        $random_to=$request->random_to;
        // $random_from=5;
        // $random_to=6;
        // start split pdf section
        $directory=public_path('split-pdf');
        $pdf = new Fpdi();
        $pageCount = $pdf->setSourceFile($mainbook_url);
        $file = pathinfo($mainbook_url, PATHINFO_FILENAME);
        // return $file;
        // Split each page into a new PDF
        for ($i = 1; $i <= $pageCount; $i++) {
            $newPdf = new Fpdi();
            $newPdf->addPage();
            $newPdf->setSourceFile($mainbook_url);
            $newPdf->useTemplate($newPdf->importPage($i));

            $dir_newFilename = sprintf('%s/%s_%s.pdf', $directory, $file, $i);
            // echo $dir_newFilename;
            // return $dir_newFilename;
            $newFilename=$file.'_'.$i.'.pdf';
            $dir_splitFilename=env('APP_URL')."/public/split-pdf/".$newFilename;
            // return $newFilename;
            $newPdf->output($dir_newFilename, 'F');
            if($i<=$contents_to){
                for ($j=$contents_from; $j <= $contents_to; $j++) {
                    if ($j==$i) {
                        // echo "contents ".$i." ";
                       TdPublisherSplitBookDetails::create(array(
                           "publisher_id"  => $id,
                           "book_id"  => $book_id,
                           "book_page_name"  => $newFilename,
                           "book_page_url"  => $dir_splitFilename,
                           "contain_page"  => "Y",
                           "show_page"  => "N",
                           "price"  => $request->price,
                           "created_by" =>$request->user_name,
                        )); 
                    }
                }
            }else if ($i>=$random_from && $i<=$random_to) {
                for ($k=$random_from; $k <= $random_to; $k++) {
                    if ($k==$i) {
                        // echo "random ".$i ." ";
                        TdPublisherSplitBookDetails::create(array(
                           "publisher_id"  => $id,
                           "book_id"  => $book_id,
                           "book_page_name"  => $newFilename,
                           "book_page_url"  => $dir_splitFilename,
                           "contain_page"  => "N",
                           "show_page"  => "Y",
                           "price"  => $request->price,
                           "created_by" =>$request->user_name,
                        ));
                    }
                }
            }else{
                // echo "page ".$i." ";
                TdPublisherSplitBookDetails::create(array(
                   "publisher_id"  => $id,
                   "book_id"  => $book_id,
                   "book_page_name"  => $newFilename,
                   "book_page_url"  => $dir_splitFilename,
                   "contain_page"  => "N",
                   "show_page"  => "N",
                   "price"  => $request->price,
                   "created_by" =>$request->user_name,
                ));
            }
            $checkparam=50;
            if ($pageCount>=$checkparam ) {
                if ($i==$checkparam+10) {
                    $totalper=((($i+10)/$pageCount)*100);
                    // $params=[
                    //     'success' => 1,
                    //     'counting' => $totalper,
                    //     'message' => $bookdetails,
                    //     ];
                    echo "runing";
                    // throwResponse
                    // echo Response::make([
                    //     'success' => 1,
                    //     'counting' => $totalper,
                    //     'message' => $bookdetails,
                    //     ],200)->send();
                    // response()->json($params, 200)->send();
                    // return response()
                    // ->json(['name' => 'Abigail', 'state' => 'CA'])
                    // ->withCallback("testcall");
                    // response()->json( [
                    //         'success' => 1,
                    //         'counting' => $totalper,
                    //         'message' =>"bookdetails"
                    //         ], 200 )->send();
                    // $msg="success".$i;
                    // try {
                    //     return response($params, 200).$this->test();
                    // } finally {
                    //     // echo "runing";
                    //     $i++;
                    // }
                }   
                // echo $pageCount." ".$i;
            }else if($pageCount==$i-1){
                // echo $pageCount." ".$i;
                // echo "total";
                // Response::make([
                //         'success' => 1,
                //         'counting' => 100,
                //         'message' => $bookdetails,
                //         ],200)->send();
                return response()->json( [
                            'success' => 1,
                            'counting' => 100,
                            'message' =>"bookdetails"
                            ], 200 );
            }
            // return "pdf split success ";
        }
        // end split pdf section


        // return $i;
        // return $pageCount;
        // $checkparam=100;
        // if ($pageCount>=$checkparam ) {
        //     if ($i==$checkparam+10) {
        //        $totalper=((($i+10)/$pageCount)*100);
        //         return response()->json( [
        //             'success' => 1,
        //             'counting' => $totalper,
        //             'message' => $bookdetails,
        //             ], 200 );
        //     }   
        //     // echo $pageCount." ".$i;
        // }else if($pageCount==$i-1){
        //     // echo $pageCount." ".$i;
        //     // echo "total";
        //     return response()->json( [
        //             'success' => 1,
        //             'counting' => 100,
        //             'message' => $bookdetails,
        //             ], 200 );
        // }

        // return "hii";
	    // return $bookdetails;
        return response()->json( [
                    'success' => 1,
                    'message' => $bookdetails,
                    ], 200 );
    }

    public function Splitbook(Request $request){
    // public function Splitbook($mainbook_url,$id,$book_id,$contents_from,$contents_to,$random_from,$random_to,$price,$user_name,$uploaded_page){
        $mainbook_url=$request->mainbook_url;
        $id=$request->id;
        $book_id=$request->book_id;
        $contents_from=$request->contents_from;
        $contents_to=$request->contents_to;
        $random_from=$request->random_from;
        $random_to=$request->random_to;
        $price=$request->price;
        $user_name=$request->user_name;

        // $uploaded_page=$request->uploaded_page;
        $start_page=$request->start_page;
        $end_page=$request->end_page;

        $bookdetails = array(
            'mainbook_url' =>$mainbook_url , 
            'id' =>$id , 
            'book_id' =>$book_id , 
            'contents_from' =>$contents_from , 
            'contents_to' =>$contents_to , 
            'random_from' =>$random_from , 
            'random_to' =>$random_to , 
            'price' =>$price , 
            'user_name' =>$user_name
        );
        
        // start split pdf section
        $directory=public_path('split-pdf');
        // try{
            
        // }catch(expection $e){
            $pdf = new Fpdi();
            $pageCount1 = $pdf->setSourceFile($mainbook_url);
            $file = pathinfo($mainbook_url, PATHINFO_FILENAME);
            // return $file;
            // Split each page into a new PDF
            for ($i = 1; $i <= $pageCount1; $i++) {
                if($i>=$start_page && $i<=$end_page){
                    $newPdf = new Fpdi();
                    $newPdf->addPage();
                    $newPdf->setSourceFile($mainbook_url);
                    $newPdf->useTemplate($newPdf->importPage($i));

                    // start Watermark
                    $newPdf->SetFont('', 'I', 12);
                    $newPdf->SetTextColor(191, 191, 191);
                    // $newPdf->Rotate(45,25, 150);
                    // $newPdf->Text(45, 0, "Copyright © 2021 | PARTREAD | All Rights Reserved");
                    $newPdf->Text(48, 270, "Copyright © 2021 | PARTREAD | All Rights Reserved");
                    // end Watermark

                    $dir_newFilename = sprintf('%s/%s_%s.pdf', $directory, $file, $i);
                    // echo $dir_newFilename;
                    // return $dir_newFilename;
                    $newFilename=$file.'_'.$i.'.pdf';
                    $dir_splitFilename=env('APP_URL')."/public/split-pdf/".$newFilename;
                    // return $newFilename;
                    $newPdf->output($dir_newFilename, 'F');
                    if($i<=$contents_to){
                        for ($j=$contents_from; $j <= $contents_to; $j++) {
                            if ($j==$i) {
                                // echo "contents ".$i." ";
                               TdPublisherSplitBookDetails::create(array(
                                   "publisher_id"  => $id,
                                   "book_id"  => $book_id,
                                   "book_page_name"  => $newFilename,
                                   "book_page_no"  => $i,
                                   "book_page_url"  => $dir_splitFilename,
                                   "contain_page"  => "Y",
                                   "show_page"  => "N",
                                   "price"  => $price,
                                   "created_by" =>$user_name,
                                )); 
                            }
                        }
                    }else if ($i>=$random_from && $i<=$random_to) {
                        for ($k=$random_from; $k <= $random_to; $k++) {
                            if ($k==$i) {
                                // echo "random ".$i ." ";
                                TdPublisherSplitBookDetails::create(array(
                                   "publisher_id"  => $id,
                                   "book_id"  => $book_id,
                                   "book_page_name"  => $newFilename,
                                   "book_page_no"  => $i,
                                   "book_page_url"  => $dir_splitFilename,
                                   "contain_page"  => "N",
                                   "show_page"  => "Y",
                                   "price"  => $price,
                                   "created_by" =>$user_name,
                                ));
                            }
                        }
                    }else{
                        // echo "page ".$i." ";
                        TdPublisherSplitBookDetails::create(array(
                            "publisher_id"  => $id,
                            "book_id"  => $book_id,
                            "book_page_name"  => $newFilename,
                            "book_page_no"  => $i,
                            "book_page_url"  => $dir_splitFilename,
                            "contain_page"  => "N",
                            "show_page"  => "N",
                            "price"  => $price,
                            "created_by" =>$user_name,
                        ));
                    }
                    $totalper=(($end_page/$pageCount1)*100);
                }

            }
        // }
       	
        // return "hello ";
        return response()->json( [
                        'success' => 1,
                        'totalpage'=>$pageCount1,
                        'uploaded_page'=>$end_page,
                        'counting' => $totalper,
                        'message' => $bookdetails,
                        ], 200 );
    }

    public function ActiveBook(Request $request){
        $id = $request->input('id');
        $active_book = $request->input('active_book');
        $tablename = "td_publisher_book_details";

        // return $id." ".$active_book ." ".$tablename;
        $date = date('Y-m-d H:i:s');
        if ($active_book == 'A') {
            DB::table($tablename)
                ->where('_id', $id)
                ->update([
                    'active_book' => 'I',
                    'updated_at' =>$date
                ]);
            $msg = 'success';
            $success=1;
            $active_books = 'I';
        } else if ($active_book == 'I') {
            DB::table($tablename)
                ->where('_id', $id)
                ->update([
                    'active_book' => 'A',
                    'updated_at' =>$date
                ]);
            $msg = 'success';
            $success=1;
            $active_books = 'A';
        } else {
            $success=0;
            $msg = 'fail';
        }

        $arrNewResult = array();
        $arrNewResult['id'] = $id;
        $arrNewResult['msg'] = $msg;
        $arrNewResult['active_book'] = $active_books;
//        array_push( , $msg);
        // $status_json = json_encode($arrNewResult);
        // echo $status_json;
        return response()->json( [
                'success' => $success,
                'message' =>$arrNewResult
            ], 200 );
    }
     
}
