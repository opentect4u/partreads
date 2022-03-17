<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Illuminate\Contracts\Encryption\DecryptException;
use setasign\Fpdi\PdfParser\CrossReference\CrossReferenceException;
use TCPDI;
use App\Models\TdPublisherSplitBookDetails;
use Symfony\Component\ErrorHandler\Error\FatalError;
use setasign\Fpdi\Tcpdf\Fpdi;
use App\Models\TdNotification;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        // post method call error
        $this->renderable(function (MethodNotAllowedHttpException $e, $request) {
        return response()->json( [
                                        'success' => 0,
                                        'message' => 'Method is not allowed for the requested route',
                                    ], 405 );
        });

        // decription error
        $this->renderable(function (DecryptException $e, $request) {
        return response()->json( [
                                        'success' => 0,
                                        'message' => 'notfound',
                                    ], 405 );
        });

        // pdf upload error Handler
        $this->renderable(function (CrossReferenceException $e, $request) {
            $mainbook_url=$request->mainbook_url;
            $id=$request->id;
            $book_id=$request->book_id;
            $contents_from=$request->contents_from;
            $contents_to=$request->contents_to;
            $random_from=$request->random_from;
            $random_to=$request->random_to;
            $price=$request->price;
            $user_name=$request->user_name;

            $uploaded_page=$request->uploaded_page;
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

            $directory=public_path('split-pdf');

            $pdf = new TCPDI();
            $pageCount = $pdf->setSourceFile($mainbook_url);
            $file = pathinfo($mainbook_url, PATHINFO_FILENAME);
            // return $file;
            // Split each page into a new PDF
            for ($i = 1; $i <= $pageCount; $i++) {
                if($i>=$start_page && $i<=$end_page){
                    $newPdf = new TCPDI();
                    $newPdf->addPage();
                    $newPdf->setSourceFile($mainbook_url);
                    $newPdf->useTemplate($newPdf->importPage($i));

                    // $tpl=$newPdf->importPage($i)
                    // start Watermark
                    $newPdf->SetFont('', 'I', 12);
                    $newPdf->SetTextColor(191, 191, 191);
                    $newPdf->Text(48, 270, "Copyright © 2021 | PARTREAD | All Rights Reserved");
                    // end Watermark
                    // $newPdf->useTemplate($tpl);

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
                    $totalper=(($end_page/$pageCount)*100);
                    
                }

            }
            // start notification and email section
            if ($pageCount==$end_page) {
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
            }
            //end notification and email section

            return response()->json( [
                        'success' => 1,
                        'totalpage'=>$pageCount,
                        'uploaded_page'=>$end_page,
                        'counting' => $totalper,
                        'pagecounter'=>$pagecounter,
                        'random_pages'=>$random_pages,
                        'pagecountstart'=>$pagecountstart,
                        'message' => $bookdetails,
                        ], 200 );
            // return parent::render($request, $e);
        });


        //pdf preview  error handler
            // FatalError
        $this->renderable(function (FatalError $e, $request) {
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
            // $newPdf = new Fpdi();

                // $newPdf = new TCPDI();
                $newPdf = new TCPDI();
                // $newPdf = new TCPDI(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
                foreach($files as $file) {
                    // return $file;
                    $url=public_path()."/".$file;
                    // return $url;
                    $pdfdata = file_get_contents($url);
                    // $newPdf->setSourceData($pdfdata);
                    $newPdf->setSourceData(base64_decode($pdfdata));
                    // $newPdf->setSourceFile(base64_decode($pdfdata));
                    $newPdf->AddPage();
                    // $newPdf->setSourceFile(base64_decode($pdfdata));
                    // $newPdf->setSourceFile(base64_decode($url));
                    // return "hii";
                    $newPdf->useTemplate($newPdf->importPage($i));
                }
                

            
            // return $newPdf;
            // return response()->json( [
            //                             'success' => 0,
            //                             'message' => 'notfound',
            //                         ], 405 );
            // $newPdf->output($directory1);
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
        });

        // $this->reportable(function (Throwable $e) {
        //     //
        // });
    }
}
