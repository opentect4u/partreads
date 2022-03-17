<?php

namespace App\Http\Controllers\publisher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TdPublisherBookDetails;
use App\Models\TdPublisherSplitBookDetails;
use DB;
use App\Models\TdBuyBookPages;
use Illuminate\Database\Eloquent\Collection;

class ActivePagesController extends Controller
{
    public function ShowPages(Request $request){
        // DB::enableQueryLog();
        $details=TdBuyBookPages::with('ActivePages')
        // ->where('ActivePages.active_book','I')
        // ->where('active_book','I')
        ->groupBy('book_id')
        ->get();
        // foreach ($details as $value) {
        //     // return $value;
        //     return $value->active_pages;
        // }
        // return $details;
        // return dd($details->getQueryLog());
        return response()->json( [
                    'success' => 1,
                    'message' => $details,
                    ], 200 );
    }
}
