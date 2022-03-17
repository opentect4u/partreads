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


// use setasign\Fpdi\Tfpdf\Fpdi;

use App\Models\MdCategory;
use App\Models\MdSubCategory;
use Illuminate\Support\Facades\Response;
use TCPDI;
use App\Models\TdNotification;
use App\Models\MdUserLogin;
use Illuminate\Support\Facades\Mail;
use App\Mail\UploadbookEmail;
use App\Models\TdTableofContent;
use App\Models\TdBuyBookPages;

class BookController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('is_publisher');
    // }

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
        // $category_id=$request->request;
        $category_id=json_decode($request->category_id,true);
        // $category_id=json_decode($request->category_id);
        // return $category_id;
        if (count($category_id)>2) {
            $subcategory=MdSubCategory::
            whereIn('category_id',array($category_id[0],$category_id[1],$category_id[2]))
            // where('category_id',$category_id[0])
            // ->where('category_id',$category_id[1])
            // ->where('category_id',$category_id[2])
            // ->select('Category')
            ->get();
        }else if (count($category_id)>1) {
            $subcategory=MdSubCategory::
            whereIn('category_id',array($category_id[0],$category_id[1]))
            // ->where('category_id',$category_id[1])
            // ->where('category_id',$category_id[2])
            // ->select('Category')
            ->get();
        } else {
            $subcategory=MdSubCategory::
                where('category_id',$category_id[0])
                ->get();
        }
        $val1=[];
        foreach($subcategory as $val){
            $category_name=DB::table('md_category')->where('_id','=',$val->category_id)->value('name');
            $val->category_name=$category_name;
            array_push($val1,$val);
        }
        // $subcategory=MdSubCategory::where('category_id=$req',$request->category_id)->get();
        // $subcategory=MdSubCategory::get();
        // return $all_subcategory;
        return response()->json( [
                        'success' => 1,
                        'message' => $val1,
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
        // return $request;
        // $table_of_content=json_decode($request->table_of_content,true);
        // return $table_of_content;
        // foreach ($table_of_content as $key => $value) {
        //     return $value['title'];
        // }
        // return $table_of_content;
        // return $request->category_id;
        // return json_decode($request->category_id,true);
        // sub_category_id
        $id=$request->id;
        // $id="001";

        // $user_id=$request->user_id;
        // $user_type=$request->user_type;
    	// $user_name=$request->user_name;

    	// $user_token=$request->user_token;


        $book_id=date('YmdHis') .'_'.$id;

        // start book image section 
        // return "same controller";

        $image=$request->book_image;
        $book_image_name=$book_id.".jpeg";
        list($type, $image) = explode(';', $image);
        list(, $image)      = explode(',', $image);
        $image = base64_decode($image);
        $path = public_path('book-images/'.$book_image_name);
        file_put_contents($path, $image);
       
        // if ($request->hasFile('book_image')) {
        //     $book_image_path = $request->file('book_image');
        //     // $book_image_name= "1111". '.' . $book_image_path->getClientOriginalExtension();
        //     $book_image_name= $book_id. '.' . $book_image_path->getClientOriginalExtension();
        //     // $image_resize=$this->resizeBookImage($book_image_path);
        //     // $image_resize->save(public_path('book-images/' . $book_image_name));
        //     $book_image_path->move(public_path('book-images/'), $book_image_name);

        // // if($profile->book_image_path!=null){
        // // $filesc = public_path('profile-images/subcontractor/') . $profile->book_image_path;
        // // if (file_exists($filesc) != null) {
        // //         unlink($filesc);
        // //     }
        // } 
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
        // $mainbook_url=env('APP_URL')."/public/main-pdf/".$full_book_name;
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
        $category_id=json_decode($request->category_id,true);
        $sub_category_id=json_decode($request->sub_category_id,true);
        // return $category_id[0];
        // $author_name=$request->author_name;
        // $author_names=explode(",",$author_name);

    	$bookdetails=TdPublisherBookDetails::create(array(
	           "publisher_id"  => $request->id,
               "category_id"  => $category_id[0],
               "category_id_1"  => isset($category_id[1])?$category_id[1]:'',
               "category_id_2"  => isset($category_id[2])?$category_id[2]:'',
               "sub_category_id"  => $sub_category_id[0],
               "sub_category_id_1"  => isset($sub_category_id[1])?$sub_category_id[1]:'',
               "sub_category_id_2"  => isset($sub_category_id[2])?$sub_category_id[2]:'',
	           "book_id"  => $book_id,
	           "book_name"  => $request->book_name,
               "publisher_name"  => $request->publisher_name,
	           "author_name"  => $request->author_name,
               "price"  => $request->price,
               "price_fullbook"  => $request->price_fullbook,
               "edition" =>$request->edition,
               "publication_date" =>$request->publication_date,
               "isbn_no"  => $request->isbn_no,
	           "book_image"  => $book_image_name,
               "about_author"  => $request->about_author,
               "about_book"  => $request->about_book,
               'print_book_mrp'=>$request->print_book_mrp,
               'print_book_offermrp'=>$request->print_book_offermrp,
               'print_book_deliverycharge'=>$request->print_book_deliverycharge,
               // "suggestion"  => "P",
               "full_book_name"  => $full_book_name,
               "active_book"  => "A",
               "show_book"  => "R",
	           "created_by" =>$request->user_name,
	    ));
        // return $category_id[0];

        // strat book content entry
        $table_of_content=json_decode($request->table_of_content,true);
        // $book_id
        // $publisher_id=$request->id;
        foreach ($table_of_content as $key => $value) {
            TdTableofContent::create(array(
                "book_id"=>$book_id,
                "publisher_id"=>$request->id,
                "title"=>$value['title'],
                "description"=>$value['description'],
                "actual_page"=>$value['actual_page'],
                "pdf_page"=>$value['pdf_page'],
                "created_by" =>$request->user_name,
            ));
        }

        // end book content entry

        $contents_from=$request->contents_from;
        $contents_to=$request->contents_to;
        $random_from=$request->random_from;
        $random_to=$request->random_to;
        $price=$request->price;
        $user_name=$request->user_name;

        // pages count 
        $random_pages=$request->random_pages;
        // return $random_pages;
        $pages=[];
        $content_pages=explode(",",$random_pages);
        foreach ($content_pages as $value) {
            if (str_contains($value, '-')) {
                $val1=explode("-",$value);
                for ($i=$val1[0]; $i <= $val1[1] ; $i++) { 
                   array_push($pages,(int)$i);
                }
            }else{
                array_push($pages,(int)$value);
            }
        }
        $pagecountstart=$request->pagecountstart;
        // return $bookdetails;

        // return $category_id[0];

        // try{
        //     $pdf = new TCPDI();
        //     $pdftype="TCPDI";
        // }catch (expection $e){
        //     $pdf = new Fpdi();
        //     $pdftype="Fpdi";
        // }
        // return $mainbook_url;
        // $newpdf = new TCPDI();
        $pdf = new TCPDI();
        // $newpdf = new Fpdi();
        // $pdf = new Fpdi();
        // $pdf = new TCPDI(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

        // $pageCount = $pdf->setSourceData(base64_decode($mainbook_url));
        // $pageCount = $pdf->setSourceData($mainbook_url);
        // $pdfdata=file_get_contents($mainbook_url);
        // $pageCount = $pdf->setSourceData($pdfdata);
        // $pageCount = $newpdf->setSourceData($pdfdata);
        // $pageCount = $newpdf->setSourceFile(VarStream::createReference($pdfdata));
        // $pageCount = $newpdf->setSourceFile($mainbook_url);
        // $pageCount = $newpdf->setSourceFile($mainbook_url);
        $pageCount = $pdf->setSourceFile($mainbook_url);
        
        // return $bookdetails;

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
                    'random_pages' =>$pages , 
                    'pagecountstart' =>$pagecountstart , 
                    'pagecounter'=>1,
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
        // return $request;
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

        $random_pages=json_decode($request->random_pages,true);
        // $random_pages=$request->random_pages;
        $pagecountstart=$request->pagecountstart;
        $pagecounter=$request->pagecounter;
        

        $bookdetails = array(
            'mainbook_url' =>$mainbook_url , 
            'id' =>$id , 
            'book_id' =>$book_id , 
            'contents_from' =>$contents_from , 
            'contents_to' =>$contents_to , 
            'random_from' =>$random_from , 
            'random_to' =>$random_to , 
            'price' =>$price , 
            'user_name' =>$user_name,
            'random_pages' =>$random_pages,
            'pagecountstart' =>$pagecountstart,
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
                    if($i>=$contents_from && $i<=$contents_to){
                        // for ($j=$contents_from; $j <= $contents_to; $j++) {
                        //     if ($j==$i) {
                                // echo "contents ".$i." ";
                               TdPublisherSplitBookDetails::create(array(
                                   "publisher_id"  => $id,
                                   "book_id"  => $book_id,
                                   "book_page_name"  => $newFilename,
                                   "book_page_no"  => 'contect_'.$i,
                                   "book_page_url"  => $dir_splitFilename,
                                   "contain_page"  => "Y",
                                   "show_page"  => "N",
                                   "price"  => $price,
                                   "created_by" =>$user_name,
                                )); 
                        //     }
                        // }
                    }
                    
                    else{
                        // echo "page ".$i." ";
                        if ($i >= $pagecountstart) {
                            if (in_array( $i ,$random_pages )){
                                TdPublisherSplitBookDetails::create(array(
                                       "publisher_id"  => $id,
                                       "book_id"  => $book_id,
                                       "book_page_name"  => $newFilename,
                                       "book_page_no"  => (int)$pagecounter,
                                       "book_page_url"  => $dir_splitFilename,
                                       "contain_page"  => "N",
                                       "show_page"  => "Y",
                                       "price"  => $price,
                                       "created_by" =>$user_name,
                                    ));

                                $pagecounter++ ;
                            }else{
                                TdPublisherSplitBookDetails::create(array(
                                    "publisher_id"  => $id,
                                    "book_id"  => $book_id,
                                    "book_page_name"  => $newFilename,
                                    "book_page_no"  => (int)$pagecounter,
                                    "book_page_url"  => $dir_splitFilename,
                                    "contain_page"  => "N",
                                    "show_page"  => "N",
                                    "price"  => $price,
                                    "created_by" =>$user_name,
                                ));
                                $pagecounter++ ;
                            }
                        }else{
                            TdPublisherSplitBookDetails::create(array(
                                "publisher_id"  => $id,
                                "book_id"  => $book_id,
                                "book_page_name"  => $newFilename,
                                "book_page_no"  => 'NIL_'.$i,
                                "book_page_url"  => $dir_splitFilename,
                                "contain_page"  => "N",
                                "show_page"  => "Y",
                                "price"  => $price,
                                "created_by" =>$user_name,
                            )); 
                        }

                        // counter incresed form start page
                        
                    }
                    $totalper=(($end_page/$pageCount1)*100);
                }

            }
        // }
        // start notification and email section
        if ($pageCount1==$end_page) {
            $admin_id='60191c1b72de67741be6cc4c';
            TdNotification::create(array(
                    'date'=>date('Y-m-d h:i:s'),
                    'from_user_type'=>'P',
                    'from_user_id'=>$id,
                    'to_user_type'=>'A',
                    'to_user_id'=>$admin_id,
                    'publisher_id'=>$id,
                    'book_id'=>$book_id,
                    'subject'=>'BookUpload',
                    'body'=>'',
                    'path'=>'',
                    'read_flag'=>'N',
                ));
            // send Email
            $email='cmaity905@gmail.com';
            $name='Admin';
            $publisher_name=$user_name;
            $book_name=DB::table('td_publisher_book_details')->where('book_id',$book_id)->value('book_name');
            // Mail::to($email)->send(new UploadbookEmail($name,$publisher_name,$book_name));

        }
        //end notification and email section
       	
        // return "hello ";
        return response()->json( [
                        'success' => 1,
                        'totalpage'=>$pageCount1,
                        'uploaded_page'=>$end_page,
                        'counting' => $totalper,
                        'pagecounter'=>$pagecounter,
                        'random_pages'=>$random_pages,
                        'pagecountstart'=>$pagecountstart,
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

    // edit book section
    public function EditbookShow(Request $request){
        $publisher_id=$request->id;
        $book_id=$request->book_id;
        $bookdetails=TdPublisherBookDetails::where('publisher_id',$publisher_id)
            ->where('book_id',$book_id)
            ->with('Category')
            ->with('Category_1')
            ->with('Category_2')
            ->with('SubCategory')
            ->with('SubCategory_1')
            ->with('SubCategory_2')
            ->get();
        // return $bookdetails;
        $buy_pages=[];
        if ($request->flag=='V') {
            $buybooks=TdBuyBookPages::where('publisher_id',$publisher_id)
                ->where('book_id',$book_id)
                ->groupBy('book_page_no')
                ->orderBy('created_at')
                ->get();
            foreach ($buybooks as $key => $value) {
                $book_page_no=$value->book_page_no;
                $value->count_user=0;
                $user=TdBuyBookPages::where('publisher_id',$publisher_id)
                    ->where('book_id',$book_id)
                    ->where('book_page_no',$book_page_no)
                    ->get();
                $value->count_user=count($user);
                array_push($buy_pages,$value);
            }
        }
        if(count($bookdetails)>0){
            return response()->json( [
                    'success' => 1,
                    'message' => $bookdetails,
                    'buy_pages' => $buy_pages,
                    ], 200 ); 
        }else{
            return response()->json( [
                    'success' => 0,
                    'message' => "No book details found",
                    ], 200 );  
        }
        
    }

    public function Editbook(Request $request){
        // return $request;
        $publisher_id=$request->id;
        $book_id=$request->book_id;

        $category_id=json_decode($request->category_id,true);
        $sub_category_id=json_decode($request->sub_category_id,true);

        if ($request->Book_image!='') {
            $image_id=date('YmdHis') .'_'.$publisher_id;

            $image=$request->Book_image;
            $book_image_name=$image_id.".jpeg";
            list($type, $image) = explode(';', $image);
            list(, $image)      = explode(',', $image);
            $image = base64_decode($image);
            $path = public_path('book-images/'.$book_image_name);
            file_put_contents($path, $image);
            // $book_image_name_exsist=DB::table('td_publisher_book_details')
            //     ->where('publisher_id',$publisher_id)
            //     ->where('book_id',$book_id)
            //     ->value('book_image');
            // if($book_image_name_exsist!=null){
            //     $filesc = public_path('book-images/') . $book_image_name_exsist;
            //     if (file_exists($filesc) != null) {
            //         unlink($filesc);
            //     }
            // }

            $bookdetails=DB::table('td_publisher_book_details')
                ->where('publisher_id',$publisher_id)
                ->where('book_id',$book_id)
                ->update([
                    "category_id"  => $category_id[0],
                    "category_id_1"  => isset($category_id[1])?$category_id[1]:'',
                    "category_id_2"  => isset($category_id[2])?$category_id[2]:'',
                    "sub_category_id"  => $sub_category_id[0],
                    "sub_category_id_1"  => isset($sub_category_id[1])?$sub_category_id[1]:'',
                    "sub_category_id_2"  => isset($sub_category_id[2])?$sub_category_id[2]:'',
                    // "book_id"  => $book_id,
                    "book_name"  => $request->book_name,
                    "publisher_name"  => $request->publisher_name,
                    "author_name"  => $request->author_name,
                    "price"  => $request->price,
                    "price_fullbook"  => $request->price_fullbook,
                    "print_book_deliverycharge"  => $request->print_book_deliverycharge,
                    "print_book_mrp"  => $request->print_book_mrp,
                    "print_book_offermrp"  => $request->print_book_offermrp,
                    "publication_date"  => $request->publication_date,
                    "isbn_no"  => $request->isbn_no,
                    "edition"  => $request->edition,
                    "book_image"  => $book_image_name,
                    "about_author"  => $request->about_author,
                    "about_book"  => $request->about_book,
                    // 'remember_token' => $remember_token,
                    'updated_at' =>date('Y-m-d H:i:s')
                ]);
        } else {
            $bookdetails=DB::table('td_publisher_book_details')
                ->where('publisher_id',$publisher_id)
                ->where('book_id',$book_id)
                ->update([
                    "category_id"  => $category_id[0],
                    "category_id_1"  => isset($category_id[1])?$category_id[1]:'',
                    "category_id_2"  => isset($category_id[2])?$category_id[2]:'',
                    "sub_category_id"  => $sub_category_id[0],
                    "sub_category_id_1"  => isset($sub_category_id[1])?$sub_category_id[1]:'',
                    "sub_category_id_2"  => isset($sub_category_id[2])?$sub_category_id[2]:'',
                    // "book_id"  => $book_id,
                    "book_name"  => $request->book_name,
                    "publisher_name"  => $request->publisher_name,
                    "author_name"  => $request->author_name,
                    "price"  => $request->price,
                    "price_fullbook"  => $request->price_fullbook,
                    "print_book_deliverycharge"  => $request->print_book_deliverycharge,
                    "print_book_mrp"  => $request->print_book_mrp,
                    "print_book_offermrp"  => $request->print_book_offermrp,
                    "publication_date"  => $request->publication_date,
                    "isbn_no"  => $request->isbn_no,
                    "edition"  => $request->edition,
                    // "book_image"  => $book_image_name,
                    "about_author"  => $request->about_author,
                    "about_book"  => $request->about_book,
                    // 'remember_token' => $remember_token,
                    'updated_at' =>date('Y-m-d H:i:s')
                ]);
        }
        if($bookdetails>0){
            $bookdetails=TdPublisherBookDetails::where('publisher_id',$publisher_id)
            ->where('book_id',$book_id)
            ->get();
            return response()->json( [
                    'success' => 1,
                    'message' => $bookdetails,
                    ], 200 );
        }else{
            return response()->json( [
                    'success' => 0,
                    'message' => "Error Update",
                    ], 200 );
        }
    }
     
}
