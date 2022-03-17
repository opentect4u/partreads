<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\TdUserDetails;
use App\Models\TdPublisherBookDetails;
use App\Models\TdPublisherSplitBookDetails;
use App\Models\MdCategory;
use App\Models\MdSubCategory;

class SearchBookController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_user');
    }

    public function ALLCategory(){
    	$all_category=MdCategory::orderBy('name','asc')->get();
        // return $all_category;
        return response()->json( [
                    'success' => 1,
                    'message' =>$all_category
                    ], 200 );
    }

    public function SubCategory(Request $request){
        if ($request->category_id!='') {
            $subcategory=MdSubCategory::
            where('category_id',$request->category_id)->orderBy('name','asc')->
            get();
        } else {
            $subcategory=MdSubCategory::
            // where('category_id',$request->category_id)->
            orderBy('name','asc')->
            get();
        }
        
        
        // return $all_subcategory;
        return response()->json( [
                        'success' => 1,
                        'message' => $subcategory,
                    ], 200 );
    }

    public function AutoComSearch(Request $request){
    	// $search_value=$request->search_value;
    	$search=TdPublisherBookDetails::
    				// where('book_name', 'LIKE', "%{$search_value}%")
        //             ->orWhere('publisher_name', 'LIKE', "%{$search_value}%")
        //             ->orWhere('author_name', 'LIKE', "%{$search_value}%")
        //             ->orWhere('isbn_no', 'LIKE', "%{$search_value}%")
                    // ->where('category_id','=',$category_id)
    				// ->where('sub_category_id','=',$subcategory_id)
					// ->
                    where('active_book','A')
    				->where('show_book','Y')
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

    public function SearchBook(Request $request){
    	$search_value=$request->search_value;
    	$category_id=$request->category_id;
    	$subcategory_id=$request->subcategory_id;
    	// $search_value="32rgw5hju67y";
    	if ($category_id != null && $subcategory_id != null) {
    		$search=TdPublisherBookDetails::
    				where('book_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('publisher_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('author_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('isbn_no', 'LIKE', "%{$search_value}%")
                    ->where('category_id','=',$category_id)
    				->where('sub_category_id','=',$subcategory_id)
					->where('active_book','A')
    				->where('show_book','Y')
                    ->get();
    	}else if ($category_id != null) {
    		// return "hii";
    		$search=TdPublisherBookDetails::
    				orWhere('book_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('publisher_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('author_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('isbn_no', 'LIKE', "%{$search_value}%")
                    ->where('category_id','=',$category_id)
					->where('active_book','A')
    				->where('show_book','Y')
                    ->get();
    	}else if ($subcategory_id != null) {
    		$search=TdPublisherBookDetails::
    				where('book_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('publisher_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('author_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('isbn_no', 'LIKE', "%{$search_value}%")
                    // ->where('category_id','=',$category_id)
    				->where('sub_category_id','=',$subcategory_id)
					->where('active_book','A')
    				->where('show_book','Y')
                    ->get();
    	}else{
    		$search=TdPublisherBookDetails::
    				where('book_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('publisher_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('author_name', 'LIKE', "%{$search_value}%")
                    ->orWhere('isbn_no', 'LIKE', "%{$search_value}%")
                    // ->where('category_id','=',$category_id)
    				// ->where('sub_category_id','=',$subcategory_id)
					->where('active_book','A')
    				->where('show_book','Y')
                    ->get();
        }            
    	// return $search;
        $search_data = array();
        foreach ($search as $value) {
        	$book_image_path=env('APP_URL')."/public/book-images/".$value->book_image;
            $value->book_image_path = $book_image_path;
            array_push($search_data, $value);
        }
    	return response()->json( [
                'success' => 1,
                'search_value'=>$search_value,
                'category_id'=>$category_id,
                'subcategory_id'=>$subcategory_id,
                'message' =>$search_data
            ], 200 );
    }
}
