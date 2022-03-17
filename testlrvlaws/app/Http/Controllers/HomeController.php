<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Hash;
use App\Models\TdPublisherBookDetails;
use App\Models\TdRating;
// use App\Models\TdPublisherBookDetails;

class HomeController extends Controller
{
	// all api url
    public function Get_API_URL()
    {
    	$url=DB::table('md_param')->where('_id','=','60192a1272de67741be6cc4d')->value('param_value');
    	return $url;
    }
    // main url
    public function GetURL(){
    	$url=DB::table('md_param')->where('_id','=','6019359d72de67741be6cc51')->value('param_value');
    	return $url;
    }

    // some check
    public function Test(){
        // return Hash::make('123');
        $id="001";
        $book_id=date('YmdHis') .'_'.$id;

        return $book_id;
        // return "hii";
    }

    public function AutoComSearch(Request $request){
        // $search_value=$request->search_value;
        $search=TdPublisherBookDetails::where('active_book','A')
                    ->where('show_book','Y')
                    ->with('Ratings')
                    ->get();
        $search_data = array();
        foreach ($search as $value) {
            $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
            $value->book_image_path = $book_image_path;
            array_push($search_data, $value);
        }
        return response()->json( [
                'success' => 1,
                // 'search_value'=>$search_value,
                'message' =>$search
            ], 200 );
    }

    public function AllBooks(Request $request){
        $search_value=$request->search_value;
        if ($search_value!=null) {
            $allbooks=TdPublisherBookDetails::
                    where('book_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('publisher_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('author_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('isbn_no', 'LIKE', "%{$search_value}%")
                    // ->where('category_id','=',$category_id)
                    // ->where('sub_category_id','=',$subcategory_id)
                    ->where('active_book','A')
                    ->where('show_book','Y')
                    ->with('Ratings')
                    ->get();
           // return $search_value;
        }else{
            $allbooks=TdPublisherBookDetails::where('active_book','A')->where('show_book','Y')
            ->with('Ratings')
            ->get();
        }
        // return $allbooks;
        $bookdetailsarray=array();
        foreach ($allbooks as $value) {
            $book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
            $value->book_image_path = $book_image_path;
            array_push($bookdetailsarray, $value);
        }
        
        return response()->json( [
                'success' => 1,
                'search_value'=>$search_value,
                'message' =>$bookdetailsarray
            ], 200 );
    }
}
