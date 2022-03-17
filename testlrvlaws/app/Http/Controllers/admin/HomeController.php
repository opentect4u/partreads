<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TdBuyBookPages;
use DB;

class HomeController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('is_admin');
    // }
    public function TopBooks(){
        // $books_details=TdBuyBookPages::get();
        $books_details= TdBuyBookPages::
                    with('BookDetails')
                 // ->select('book_id', TdBuyBookPages::where('book_id' ,'book_id')->count() )
                 // ->select('book_id', DB::raw('count(*) as total'))
                 ->groupBy('book_id')
                 // ->orderBy('total','desc')
                 ->get();
                 // get();
        // return $books_details;
        // $nameA = array();
        // foreach ($inventory as $key => $row)
        // {
        //     $nameA[$key] = $row['name'];
        // }
        // array_multisort($nameA, SORT_ASC, $inventory);
        $vararray=array();
        foreach ($books_details as $value) {
            $data=TdBuyBookPages::where('book_id',$value->book_id)->count();
            // $value->countdata=$data;
            // array_push($vararray,$data);
            // if(count($vararray)>=5){
                array_push($vararray,$value);
            // }
        }
        // $vararray = sort($vararray);
        // $vararray = collect($vararray)->sortBy('countdata')->toArray();
        // $vararray1 = collect($vararray)->sortByDesc('countdata')->toArray();
        // $vararray=usort($vararray, 'countdata');
        // return $vararray;
        // return $books_details;
        return response()->json( [
                'success' => 1,
                'message' =>$books_details
            ], 200 );
    }
}
