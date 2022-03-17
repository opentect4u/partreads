<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MdCategory;
use App\Models\MdSubCategory;
use DB;

class MdSubCategoryController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('is_admin');
    // }

    public function Show(){
    	$all_subcategory=MdSubCategory::get();
    	// return $all_subcategory;
        $subcategory=[];
        foreach ($all_subcategory as $key => $value) {
            $value['category_name']=DB::table('md_category')->where('_id',$value->category_id)->value('name');
            array_push($subcategory,$value);
        }
        // return $subcategory;
    	return response()->json( [
                        'success' => 1,
                        'message' => $subcategory,
                    ], 200 );
    }

    public function Create(Request $request){
    	$subcategory=MdSubCategory::where('category_id','=',$request->category_id)->where('name','=',ucwords($request->name))->get();
    	if (count($subcategory)>0) {
    		return response()->json( [
                                    'success' => 0,
                                    'message' => 'Already exists',
                                    ], 201 );
    	}else if ($request->name!="" ) {
	    	$subcategory=MdSubCategory::create(array(
		           "category_id"  =>$request->category_id,
		           "name"  => ucwords($request->name),
		           "created_by" =>"admin",
		        ));
            // return $subcategory;
            return response()->json( [
                                    'success' => 0,
                                    'message' => $subcategory,
                                    ], 200 );
    	}else{
    		return response()->json( [
	                    'success' => 0,
	                    'message' => 'Some value is missing',
	                ], 405 );
    	}
    }

    public function ShowUpdate(Request $request){
        // $id="601a59541a8b33249e126a63";
        $id=$request->id;
        $category = MdSubCategory::find($id);
        // return $category;
        if ($category!=null) {
            return response()->json( [
                    'success' => 1,
                    'message' =>$category
                    ], 200 );
        }else{
            return response()->json( [
                        'success' => 0,
                        'message' => 'Not found',
                    ], 201 );
        }
        
    }


    public function Update(Request $request){
    	$id=$request->id;
        $subcategory=MdSubCategory::
        where('category_id',$request->category_id)->
        where('name',ucwords($request->name))->get();
        if (count($subcategory)>0) {
            return response()->json( [
                                    'success' => 0,
                                    'message' => 'Already exists',
                                    ], 201 );
        }else if ($request->name!="" ) {
        	// $name=$request->name;
            $subcategorys = MdSubCategory::find($id);
		    $subcategorys->category_id = $request->category_id;
            $subcategorys->name = ucwords($request->name);
            $subcategorys->save();

            // return $subcategorys;
            return response()->json( [
                    'success' => 1,
                    'message' =>$subcategorys
                    ], 200 );
        }else{
            return response()->json( [
                        'success' => 0,
                        'message' => 'Some value is missing',
                    ], 201 );
        }
    }
}
