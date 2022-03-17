<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use setasign\Fpdi\Fpdi;
// use setasign\Fpdf\Fpdf
use setasign\Fpdi\Tcpdf\Fpdi;
// use setasign\Fpdi\TcpdfFpdi;
// use setasign\Fpdi\FpdiException;
// use setasign\Fpdi\FpdfTplTrait;
// use setasign\Fpdi\Tfpdf\Fpdi;
// use setasign\Fpdi\Tcpdf\Fpdi;
// use setasign\Tcpdf\Fpdf;
// use setasign\Fpdi\FpdiTrait;
// use setasign\Fpdi\FpdfTplTrait;

use App\Models\MdSubCategory;
use DB;
use Image;
use App\Models\TdPublisherSplitBookDetails;
use App\Models\TdPublisherBookDetails;
// use setasign\Fpdi\PdfParser\CrossReference;
// use setasign\FpdiPdfParser\PdfParser\CrossReference;
// use TCPDF;
use TCPDI;
// use Elibyy\TCPDF\Facades\TCPDF;
// use Exception;
use Illuminate\Support\Facades\Crypt;
use App\Models\TdBuyBookPages;
use PdfMerger;
// use LynX39\LaraPdfMerger\Facades\PdfMerger;
use Illuminate\Support\Facades\Mail;
use App\Mail\SharepageEmail;
class TestController extends Controller
{
    public function Show()
    {
    	$filename="/home/chitta/Downloads/js_api_reference.pdf";
    	// $sourcefile="";
    	// initiate FPDI
		$pdf = new Fpdi();
		// add a page
		$pdf->AddPage();
		// set the source file
		$pdf->setSourceFile($filename);
		// import page 1
		$tplIdx = $pdf->importPage(2);
		// use the imported page and place it at position 10,10 with a width of 100 mm
		// $pdf->useTemplate($tplIdx, 10, 10, 100);
		$pdf->useTemplate($tplIdx);

		// now write some text above the imported page
		$pdf->SetFont('Helvetica');
		$pdf->SetTextColor(255, 0, 0);
		// $pdf->SetXY(30, 30);
		// $pdf->Write(0, "<input type='checkbox' name='checkbox' value='Content'>");
		$pdf->write(0, 'This is just a simple text');



		$pdf->Output('I', 'generated.pdf');
    }

    public function Test(){
        // $p= Crypt::encrypt(45);
        // $p= Crypt::decrypt(45);
        // return $p;
         $email="chittaranjan@synergicsoftek.com";
    $subject="subject";
    $message="message";
    $headers="headers";
    mail($email,$subject,$message,$headers);
    return "mail send";

        // $form_page=7;
        // $to_page=8;
        // $arr=array(1,2,3,4,5,6,10,11);
        // // $a=array("a"=>"red","b"=>"green","c"=>"blue");
        // array_search($form_page,$arr);
        // if (array_search($form_page,$arr)=='' || array_search($to_page,$arr)=='' ) {
        //     return "hii1";
        // }else{
        //     return "hii2";  
        // }
        // for ($i=0; $i < count($arr); $i++) { 
        //     echo $i;
        //     if ($form_page==$arr[]) {
        //         # code...
        //     }
        // }
        // return "hii";
    	// $all_subcategory = DB::table('md_sub_category')
    	// 	->join('md_category','md_sub_category.category_id','=','md_category.id')
    	// 	->get();
    	// $all_subcategory = MdSubCategory::with('Category')
     //        ->get();

     //    return $all_subcategory;

        // APP_URL
        // $books=TdPublisherBookDetails::where('publisher_id','603624329c976714ce6ae98f')->where('book_id','20210222113321_602cdfcad9db56676f16e954')->where('active_book','A')->where('show_book','Y')->get();
        // return $books;

        // $pub_id='602cdfcad9db56676f16e954';
        // $data=DB::table('td_publisher_book_details')->where('publisher_id',$pub_id)->get();
        // return $data;
        $data= TdPublisherSplitBookDetails::
        where('book_id','20210309100806_6047472a60d66a0ae10e0fa3')->
        orderBy('book_page_no','asc')->
        get();
        return $data;
        // $data= TdPublisherBookDetails::
        // get();
        // return $data;
        // $url =env('APP_URL');
        // return $url;

        $data=TdPublisherSplitBookDetails::
            // where('show_page','Y')
            where('contain_page','Y')
                ->orWhere('show_page','Y')

        ->where('publisher_id','6037a32b8488a50d5b1d33c3')
                ->where('book_id','20210225131812_6037a32b8488a50d5b1d33c3')
                // ->where('show_page','Y')
                // ->where('contain_page','Y')
                // ->orWhere('contain_page','Y')
                ->get();
        return $data;
    }

    public function Test1(){
        $data= TdPublisherSplitBookDetails::
        where('book_id','20210309132231_602cdfcad9db56676f16e954')->
        // orderBy('book_page_no','asc')->
        get();
        // $data= TdPublisherBookDetails::
        // get();
        return $data;
       $data= TdPublisherBookDetails::
        // where('book_id','20210303070000_602cdfcad9db56676f16e954')->
        get(); 
        return $data;

    }

    public function Fileupload(Request $request){

        $image=$request->book_image;
        // return $image;
        $workpicname=date('YmdHis').".jpg";
        // $image = $request->image_url;
        list($type, $image) = explode(';', $image);
        list(, $image)      = explode(',', $image);
        $image = base64_decode($image);
        // $teampicname= date('YmdHis') .'_'.$sc_id.'.jpg';
        $path = public_path('merge/'.$workpicname);
        file_put_contents($path, $image);

        return env('APP_URL')."/public/merge/".$workpicname;
    	// return $request->book_pdf;
    	// return response()->json( [
     //                'success' => 1,
     //                'message' => $request->book_pdf,
     //                ], 200 );

    	// if ($request->hasFile('book_pdf')) {
     //        $book_path = $request->file('book_pdf');
     //        $book_path_extension=$book_path->getClientOriginalExtension();
     //        // return $cv_path_extension;
     //        $cv_path_format = explode("/tmp/",$book_path);
     //        // print_r($cv_path_format);
     //        // $format_video_path="";
     //        $full_book_name=$book_id.".".$book_path_extension;
     //        // echo "<br/>".$format_cv_path;
     //        $book_path->move(public_path('main-pdf/'),$full_book_name);

     //        // return $cv_path;
     //        // if($profile->cv_path!=null){
     //        //     $filecv = public_path('sc-cv/') . $profile->cv_path;
     //        //     if (file_exists($filecv) != null) {
     //        //           unlink($filecv);
     //        //     }
     //        // } 
     //        return $full_book_name;

     //    }

    	if ($request->hasFile('book_image')) {
            $book_image_path = $request->file('book_image');
            $book_image_name= $book_id. '.' . $book_image_path->getClientOriginalExtension();
            // $image_resize=$this->resizeBookImage($book_image_path);
            // $image_resize->save(public_path('book-images/' . $book_image_name));
            $book_image_path->move(public_path('book-images/'), $book_image_name);

        // if($profile->book_image_path!=null){
        // $filesc = public_path('profile-images/subcontractor/') . $profile->book_image_path;
        // if (file_exists($filesc) != null) {
        //         unlink($filesc);
        //     }
        // } 
        return $book_image_name;
        }
        return "Error";
    }


    public function Test3(Request $request){
        // $mainbook_url="/home/chitta/Downloads/testing-cm.pdf";
        $mainbook_url="/home/chitta/Downloads/js_api_reference.pdf";
        // return $mainbook_url;
        $directory="/home/chitta/Downloads/pdf/";
       
        // $loader = new \Example\Psr4AutoloaderClass;
        // $loader->register();
        // $loader->addNamespace('setasign\Fpdi', $mainbook_url);
        // return $loader;
            $pdf = new Fpdi();
            $pageCount = $pdf->setSourceFile($mainbook_url);
            // if (condition) {
            //     # code...
            // }

        try{
            $pdf = new TCPDI();
            // $pdf = new Fpdi();
            // $pdf = new FpdiTrait();
            
            // PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false
            // $pdf = new Fpdi();

            $pageCount = $pdf->setSourceFile($mainbook_url);

            // return $pageCount;

            $file = pathinfo($mainbook_url, PATHINFO_FILENAME);
            // return $file;
            // Split each page into a new PDF
            for ($i = 1; $i <= $pageCount; $i++) {
                // $newPdf = new Fpdi();
                if($i<=50){
                $newPdf = new TCPDI();
                $newPdf->addPage();
                $newPdf->setSourceFile($mainbook_url);
                $newPdf->useTemplate($newPdf->importPage($i));

                $dir_newFilename = sprintf('%s/%s_%s.pdf', $directory, $file, $i);
                // echo $dir_newFilename;
                // return $dir_newFilename;
                // $newFilename=$file.'_'.$i.'.pdf';
                // $dir_splitFilename=env('APP_URL')."/public/split-pdf/".$newFilename;
                // return $newFilename;
                $newPdf->output($dir_newFilename, 'F');
                }
                // return "success";
            }
        }catch(expection $e){
            
            $pdf = new Fpdi();   
            // $pdf = new Fpdi();
            // $pdf = new FpdiTrait();
            
            // PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false
            // $pdf = new Fpdi();

            $pageCount = $pdf->setSourceFile($mainbook_url);

            // return $pageCount;

            $file = pathinfo($mainbook_url, PATHINFO_FILENAME);
            // return $file;
            // Split each page into a new PDF
            for ($i = 1; $i <= $pageCount; $i++) {
                // $newPdf = new Fpdi();
                if($i<=50){
                $newPdf = new Fpdi();
                $newPdf->addPage();
                $newPdf->setSourceFile($mainbook_url);
                $newPdf->useTemplate($newPdf->importPage($i));

                $dir_newFilename = sprintf('%s/%s_%s.pdf', $directory, $file, $i);
                // echo $dir_newFilename;
                // return $dir_newFilename;
                // $newFilename=$file.'_'.$i.'.pdf';
                // $dir_splitFilename=env('APP_URL')."/public/split-pdf/".$newFilename;
                // return $newFilename;
                $newPdf->output($dir_newFilename, 'F');
            }
                // return "success";
            }
        }
        
        

            return "success";

    }

    public function Test4(){
        // $mainbook_url="/home/chitta/Downloads/testing-cm.pdf";
        $image="/home/chitta/Downloads/partRead.png";
        $mainbook_url="/home/chitta/Downloads/js_api_reference.pdf";
        // return $mainbook_url;  
        $directory="/home/chitta/Downloads/pdf/";
            $pdf = new Fpdi();   
            // $pdf = new Fpdi();
            // $pdf = new FpdiTrait();
            
            // PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false
            // $pdf = new Fpdi();

            $pageCount = $pdf->setSourceFile($mainbook_url);

            // return $pageCount;

            $file = pathinfo($mainbook_url, PATHINFO_FILENAME);
            // return $file;
            // Split each page into a new PDF
            for ($i = 1; $i <= $pageCount; $i++) {
                // $newPdf = new Fpdi();
                if($i<=50){
                $newPdf = new Fpdi();
                $newPdf->addPage();
                $newPdf->setSourceFile($mainbook_url);
                $newPdf->useTemplate($newPdf->importPage($i));

                //start Watermark
                // $newPdf->SetXY(100, 50);
                // $newPdf->Rotate(0);
                // $newPdf->SetXY(25, 135);

                $newPdf->SetFont('', 'I', 12);
                $newPdf->SetTextColor(191, 191, 191);
                // $newPdf->Rotate(45,25, 150);
                // $newPdf->Text(45, 0, "Copyright © 2021 | PARTREAD | All Rights Reserved");
                $newPdf->Text(48, 270, "Copyright © 2021 | PARTREAD | All Rights Reserved");
                
                // $newPdf->Image('/home/chitta/Downloads/partRead.png', 10, 30, 200, 200, 'png');
                // $newPdf->Image('/home/chitta/Downloads/200210_Blog_Feature_Construction_Schedule.jpg', 50, 130, 100, 50, 'jpg');
            
                // $newPdf->Write(0, "PART READ");

                $dir_newFilename = sprintf('%s/%s_%s.pdf', $directory, $file, $i);
                // echo $dir_newFilename;
                // return $dir_newFilename;
                // $newFilename=$file.'_'.$i.'.pdf';
                // $dir_splitFilename=env('APP_URL')."/public/split-pdf/".$newFilename;
                // return $newFilename;
                $newPdf->output($dir_newFilename, 'F');
                }
                // return "success";
            }
                return "success";
            
    }

    public function Test5(){
        // return "call Test5 function";
        // $mainbook_url="/home/chitta/Downloads/js_api_reference.pdf";
        $mainbook_url1="/home/chitta/Downloads/pdf/js_api_reference_1.pdf";
        $mainbook_url2="/home/chitta/Downloads/pdf/js_api_reference_2.pdf";
        $mainbook_url3="/home/chitta/Downloads/pdf/js_api_reference_3.pdf";
        // return $mainbook_url;  
        // $directory="/home/chitta/Downloads/pdf/";
         // array to hold list of PDF files to be merged
        $files = array($mainbook_url1,$mainbook_url2, $mainbook_url3);
        // $pageCount = 0;
        // initiate FPDI
        $pdf = new FPDI();

        // iterate through the files
        foreach ($files AS $file) {
            // get the page count
            $pageCount = $pdf->setSourceFile($file);
            // iterate through all pages
            for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
                // import a page
                $templateId = $pdf->importPage($pageNo);
                // get the size of the imported page
                $size = $pdf->getTemplateSize($templateId);

                // create a page (landscape or portrait depending on the imported page size)
                // if ($size['w'] > $size['h']) {
                //     $pdf->AddPage('L', array($size['w'], $size['h']));
                // } else {
                //     $pdf->AddPage('P', array($size['w'], $size['h']));
                // }

                // use the imported page
                $pdf->useTemplate($templateId);
                $pdf->AddPage('P', $size);

                $pdf->SetFont('Helvetica');
                $pdf->SetXY(5, 5);
                $pdf->Write(0, 'Generated by FPDI');
                // $pdf->Output('I','merged.pdf');

            }
        }
                $pdf->Output('merged.pdf');


    }

    public function Test6(Request $request){
        $user_id="6049e83cbe10e65ef0140163";
        // $publisher_id=$request->publisher_id;
        $book_id="20210309110940_6047472a60d66a0ae10e0fa3";
        $allpurchasepages=TdBuyBookPages::where('user_id',$user_id)
                ->where('book_id',$book_id)
                ->get();
        // return count($allpurchasepages);
        $files = array();
        foreach ($allpurchasepages as $value) {
           $book_page_url=$value->book_page_url;
           // return $book_page_url;
           array_push($files,$book_page_url);
        }

        // return $files;
        $pdf = new Fpdi();
        // use \setasign\Fpdi\PdfParser\StreamReader;
        foreach($files AS $file) {
            $fileContent = file_get_contents($file,'rb');
            $pageCount =$pdf->setSourceFile(\setasign\Fpdi\PdfParser\StreamReader::createByString($fileContent));
            // $pageCount = $pdf->setSourceFile($a);
            // $pageCount = $pdf->setSourceFile($file);
            // return $pageCount;
            for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
                $pageId = $pdf->ImportPage($pageNo);
                // return $pageId;
                $s = $pdf->getTemplatesize($pageId);
                // return $s;
                $pdf->AddPage('P', $s);
                 // $pdf->useTemplate($pageId, 100, 100, 100, 100, TRUE);
                $pdf->useImportedPage($pageId);
            
            }
        }
        // return $pdf->merge('download', 'Download.pdf');
        // $path = public_path('main-pdf/'.$pdf->Output('concat.pdf'));
        // return file_put_contents($path,$pdf->Output('concat.pdf'));
       // $document = $pdf->getDocument();
       //  $document->setWriter(new SetaPDF_Core_Writer_Http('Download.pdf'));
       //  $document->save()->finish();
        // return $pdf->Output('concat.pdf');
    }

    public function Test7(){
        $mainbook_url1="/home/chitta/Downloads/pdf/js_api_reference_1.pdf";
        $mainbook_url2="/home/chitta/Downloads/pdf/js_api_reference_2.pdf";
        $mainbook_url3="/home/chitta/Downloads/pdf/js_api_reference_3.pdf";
        $files=array($mainbook_url1, $mainbook_url2, $mainbook_url3);
        // return $files;
        // $pageCount1=array(5,8,9);
        $pdf = new Fpdi();

        foreach($files AS $file) {
            $pageCount = $pdf->setSourceFile($file);
            // return $pageCount;
            for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
                $pageId = $pdf->ImportPage($pageNo);
                // return $pageId;
                $s = $pdf->getTemplatesize($pageId);
                // return $s;
                $pdf->AddPage('P', $s);
                $pdf->useImportedPage($pageId);
            
            }
        }
        

        // $pdf->setFiles(array($mainbook_url1, $mainbook_url2, $mainbook_url3));
        // $pdf-> $this->concat();
        return $pdf->Output('concat.pdf');
    }

    public function Test8(){

        // empty folder
        // $dir=public_path('merge/*');
        // $files = glob($dir); // get all file names
        // foreach($files as $file){ // iterate files
        //   if(is_file($file)) {
        //     unlink($file); // delete file
        //   }
        // }
           $time = microtime("Ymdhis");
           return $time;
        return date("Ymd h:i:sa");


        // $directory=public_path('merge/merge.pdf');
        // return $directory;
        $user_id="6049e83cbe10e65ef0140163";
        // $publisher_id=$request->publisher_id;
        $book_id="20210309110940_6047472a60d66a0ae10e0fa3";
        $allpurchasepages=TdBuyBookPages::where('user_id',$user_id)
                ->where('book_id',$book_id)
                ->get();
        // return count($allpurchasepages);
        $files = array();
        foreach ($allpurchasepages as $value) {
           $book_page_url=$value->book_page_url;
           // return $book_page_url;
           $val=explode('/public/', $book_page_url);
           // print_r($val);
           array_push($files,$val[1]);
           // array_push($files,$book_page_url);
        }
        // /home/admin/web/ec2-65-1-39-181.ap-south-1.compute.amazonaws.com/public_html/testlrvlaws/public/merge/merge.pdf

        // $mainbook_url1="/home/chitta/Downloads/pdf/js_api_reference_1.pdf";
        $mainbook_url2="/home/chitta/Downloads/pdf/js_api_reference_2.pdf";
        $mainbook_url3="/home/chitta/Downloads/pdf/js_api_reference_3.pdf";
        // $mainbook_url4="http://ec2-65-1-39-181.ap-south-1.compute.amazonaws.com/testlrvlaws/public/split-pdf/20210309110940_6047472a60d66a0ae10e0fa3_40.pdf";
        // $directory="/home/chitta/Downloads/pdf/merge.pdf";
        // $directory=public_path('/');
        // $directory=public_path();
        $directory=public_path('merge/merge.pdf');
        // return $files;
        // return $directory;
        // return "hii";

        // $pdf = PDFMerger::init();
        // $pdf = new \Jurosh\PDFMerge\PDFMerger;
        // return "hii1";
        // $merger->addPDF($mainbook_url4, 'all','L');

        // foreach($files AS $file) {
        //     $url=public_path()."/".$file;
        //     $pdf->addPDF($url, 'all');
        //     $pdf->setPageFormat('P', $orientation = 'P');

        // }
        $i=1;
        $newPdf = new Fpdi();
        foreach($files as $file) {
            echo $file."<br/>";
            // $url=public_path()."/".$file;
            $newPdf->addPage();
            $newPdf->setSourceFile($mainbook_url2);
            $newPdf->useTemplate($newPdf->importPage($i));
        }

            // $dir_newFilename
        return $newPdf->output($directory, 'F');

        // $pdf->addPDF($mainbook_url2, 'all')
        //     ->addPDF($mainbook_url3, 'all');
            // ->addPDF($mainbook_url3, 'all');
            // $pdf->setPageFormat('P', $orientation = 'P');
        // $merger->addPDFString(file_get_contents(base_path('/vendor/grofgraf/laravel-pdf-merger/examples/two.pdf')), 'all', 'L');
        // $pdf->merge();
        // $pdf->save($directory);
        // $pdf->merge('file',$directory); 

        // $merger->save($directory);
        echo "done";

        // $mainbook_url1="/home/chitta/Downloads/pdf/js_api_reference_1.pdf";
        // $mainbook_url2="/home/chitta/Downloads/pdf/js_api_reference_6.pdf";
        // $mainbook_url3="/home/chitta/Downloads/pdf/js_api_reference_7.pdf";


        // $directory="/home/chitta/Downloads/pdf/merge.pdf";

        // $merger = PdfMerger::init();
        // $merger->addPDF($mainbook_url1, 'all');
        // $merger->addPDF($mainbook_url2, 'all');
        // $merger->addPDF($mainbook_url3, 'all');
        // // $merger->addPDFString(file_get_contents(base_path('/vendor/grofgraf/laravel-pdf-merger/examples/two.pdf')), 'all', 'L');
        // $merger->merge();
        // $merger->save($directory);
    }

    public $files = array();
    public function setFiles($files)
    {
        $this->files = $files;
    }
    public function concat()
    {
        foreach($this->files AS $file) {
            $pageCount = $this->setSourceFile($file);
            for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
                $pageId = $this->ImportPage($pageNo);
                $s = $this->getTemplatesize($pageId);
                $this->AddPage($s['orientation'], $s);
                $this->useImportedPage($pageId);
            }
        }
    }

     



// ==================================================
    public function Sendemail(Request $request){
        // $Toemail="chitta@gmail.com";
        // $Toemail="chitta@gmail.com,chitta1@gmail.com,chitta2@gmail.com";
        // $sp=explode(",",$Toemail);
        // // print_r ($sp);

        // for ($i=0; $i <count($sp) ; $i++) { 
        //     echo $sp[$i];
        //     echo "<br/>";
        // }

        // return "<br/> Email send";
        $email="chittaranjan@synergicsoftek.com";
        $user_name="test";
        $remarks="test";

        Mail::to($email)->send(new SharepageEmail($user_name,$remarks));
    }
}
