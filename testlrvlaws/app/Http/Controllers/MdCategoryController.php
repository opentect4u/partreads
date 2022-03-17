<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\MdCategory;
use App\Models\MdSubCategory;

class MdCategoryController extends Controller
{
	// public function __construct()
 //    {
 //        $this->middleware('is_admin');
 //    }

    public function Show(){
    	$all_category=MdCategory::get();
    	// return $all_category;
        return response()->json( [
                    'success' => 1,
                    'message' =>$all_category
                    ], 200 );
    }

    public function Create(Request $request){
    	$category=MdCategory::where('name','=',ucwords($request->name))->get();
    	if (count($category)>0) {
    		return response()->json( [
                                    'success' => 0,
                                    'message' => 'Already exists',
                                    ], 201 );
    	}else if ($request->name!="" ) {
	    	$category=MdCategory::create(array(
		           "name"  => ucwords($request->name),
		           "created_by" =>"admin",
		        ));
            // return $category;
            return response()->json( [
                    'success' => 1,
                    'message' =>$category
                    ], 200 );
    	}else{
    		return response()->json( [
	                    'success' => 0,
	                    'message' => 'Some value is missing',
	                ], 201 );
    	}
    }

    public function ShowUpdate(Request $request){
        $id=$request->id;
        // $id="601a59541a8b33249e126a63";
        $category = MdCategory::find($id);
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
        $category=MdCategory::where('name',ucwords($request->name))->get();
        if (count($category)>0) {
            return response()->json( [
                                    'success' => 0,
                                    'message' => 'Already exists',
                                    ], 201 );
        }else if ($request->name!="" ) {
        	// $name=$request->name;
            $categorys = MdCategory::find($id);
            $categorys->name = ucwords($request->name);
            $categorys->save();

            // return $categorys;
            return response()->json( [
                    'success' => 1,
                    'message' =>$categorys
                    ], 200 );
        }else{
            return response()->json( [
                        'success' => 0,
                        'message' => 'Some value is missing',
                    ], 201 );
        }
    }

    public function ShowSubCategory(Request $request)
    {
        $category_id=$request->category_id;
        $all_subcategory=MdSubCategory::where('category_id',$category_id)->get();
        return response()->json( [
                    'success' => 1,
                    'message' =>$all_subcategory
                    ], 200 );
    }
}
