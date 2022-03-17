<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MdUserLogin;
use App\Models\TdAddCart;
use DB;

class AddToCartController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_user');
    }

    public function CreateCart(Request $request){
        $user_id=$request->id;
        $book_id=$request->book_id;
        $publisher_id=$request->publisher_id;
        $book_page_form=$request->from;
        $book_page_to=$request->to;
        
        $whole_book=$request->whole_book;

        $user_name=DB::table('md_user_login')->where('_id',$user_id)->value('user_name');
        $msg=TdAddCart::create(array(
                    'user_id'=>$user_id,
                    'publisher_id'=>$publisher_id,
                    'book_id'=>$book_id,
                    // 'book_page_name'=>$book_page_name,
                    'book_page_form'=>$book_page_form,
                    'book_page_to'=>$book_page_to,
                    'full_book'=>$whole_book,
                    // 'book_page_url'=>$book_page_url,
                    // 'price'=>$price,
                    'created_by'=>$user_name,
                ));
        // return $msg;
        if($msg!=''){
            return response()->json( [
                'success' => 1,
                'message' =>$msg,
                'form_page' =>$book_page_form,
                'to_page' =>$book_page_to,
                'book_id' =>$book_id,
                'publisher_id' =>$publisher_id
            ], 200 );
        }else{
            return response()->json( [
                'success' => 0,
                'message' =>"Error",
                'form_page' =>$book_page_form,
                'to_page' =>$book_page_to,
                'book_id' =>$book_id,
                'publisher_id' =>$publisher_id
            ], 200 ); 
        }
    }

    public function ShowCart(Request $request){
        $user_id=$request->id;
        $details=TdAddCart::with('BookDetails')
                    ->where('user_id',$user_id)
                    ->get();
        if(count($details)>0){
            return response()->json( [
                'success' => 1,
                'message' => $details
            ], 200 ); 
        }else{
            return response()->json( [
                'success' => 0,
                'message' =>"Error"
            ], 200 ); 
        }
        

    }

    public function ShowBookCart(Request $request){
        $user_id=$request->id;
        $book_id=$request->book_id;
        $details=TdAddCart::with('BookDetails')
                    ->where('user_id',$user_id)
                    ->where('book_id',$book_id)
                    ->get();
        return response()->json( [
                'success' => 1,
                'message' => $details
            ], 200 ); 
        // if(count($details)>0){
            
        // }else{
        //     return response()->json( [
        //         'success' => 0,
        //         'message' =>"Error"
        //     ], 200 ); 
        // }
    }

    public function Remove(Request $request)
    {
        $id=$request->table_id;
        $data=TdAddCart::find($id);
        $data->delete();
        // $data->delete();

        return response()->json( [
                'success' => 1,
                'message' =>$data
            ], 200 ); 
    }
}
