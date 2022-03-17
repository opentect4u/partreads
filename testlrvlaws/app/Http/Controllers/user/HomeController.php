<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\TdUserDetails;
use App\Models\MdUserLogin;
use App\Models\TdRecentShareBook;
use App\Models\TdRecentVisitBook;
use App\Models\TdReport;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_user');
    }

    public function Home(Request $request){
    	$id=$request->id;
    	$data=TdUserDetails::where('user_id',$id)->get();
    	if (count($data)>0) {
    		return response()->json( [
                'success' => 1,
                'message' =>$data
            ], 200 );
    	}else{
    		return response()->json( [
                'success' => 0,
                'message' =>"some error"
            ], 201 );
    	}
    }

    public function Update(Request $request){
        $id=$request->id;
        $name=$request->name;
        $phone=$request->phone;
        // $email=$request->email;
        $address=$request->address;

        $street=$request->street;
        $state=$request->state;
        $city=$request->city;
        $pincode=$request->pincode;
        $country=$request->country;

        $img_id=date('YmdHis')."_".$id;

        if ($request->hasFile('profile_image')) {
            $profile_iamge_path = $request->file('profile_image');
            // $book_image_name= "1111". '.' . $book_image_path->getClientOriginalExtension();
            $profile_iamge_name= $img_id. '.' . $profile_iamge_path->getClientOriginalExtension();
            // $image_resize=$this->resizeBookImage($book_image_path);
            // $image_resize->save(public_path('book-images/' . $book_image_name));
            $profile_iamge_path->move(public_path('user-images/'), $profile_iamge_name);
            $img_url=env('APP_URL')."/public/user-images/".$profile_iamge_name;

            $data1=DB::table('td_user_details')
                        ->where('user_id',$id)
                        ->update([
                            'name' => $name,
                            'phone' => $phone,
                            'street' => $street,
                            'state' => $state,
                            'city' => $city,
                            'pincode' => $pincode,
                            'country' => $country,
                            'profile_image' =>$profile_iamge_name,
                            'image_url' =>$img_url,
                            'student_academician'=>$request->student_academician,
                            'college_university'=>$request->college_university,
                            'update_by' => $name,
                            // 'name' => $name,
                            'updated_at' =>date('Y-m-d H:i:s')
                        ]);
        } else{
            $data1=DB::table('td_user_details')
                        ->where('user_id',$id)
                        ->update([
                            'name' => $name,
                            'phone' => $phone,
                            'street' => $street,
                            'state' => $state,
                            'city' => $city,
                            'pincode' => $pincode,
                            'country' => $country,
                            // 'profile_image' =>$profile_iamge_name,
                            // 'image_url' =>$img_url,
                            'student_academician'=>$request->student_academician,
                            'college_university'=>$request->college_university,
                            'update_by' => $name,
                            // 'name' => $name,
                            'updated_at' =>date('Y-m-d H:i:s')
                        ]);
        }

        
        $data=MdUserLogin::find($id);
        $data->name=$name;
        $data->save();
        if ($data1>0) {
            $data2=TdUserDetails::where('user_id',$id)->get();
            return response()->json( [
                'success' => 1,
                'message' =>$data2
            ], 200 );
        }else{
            return response()->json( [
                'success' => 0,
                'message' =>"some error"
            ], 201 );
        }

    }

    public function GraphData(Request $request)
    {
        $user_id=$request->id;
        $TdRecentShareBook=TdRecentShareBook::groupBy('book_id')->where('user_id',$user_id)->orderBy('_id','desc')->select('publisher_id','created_at')->get();
        $TdRecentShareBooks=[];
        foreach ($TdRecentShareBook as $key => $value) {
            $value->book_name=DB::table('td_publisher_book_details')->where('book_id',$value->book_id)->value('book_name');
            if (count($TdRecentShareBooks)<5) {
                array_push($TdRecentShareBooks,$value);
            }
        }
        $TdRecentVisitBook=TdRecentVisitBook::where('user_id',$user_id)->orderBy('_id','desc')->groupBy('book_id')->select('publisher_id','created_at')->get();
        $TdRecentVisitBooks=[];
        foreach ($TdRecentVisitBook as $keys => $value1) {
            $value1->book_name=DB::table('td_publisher_book_details')->where('book_id',$value1->book_id)->value('book_name');
            
            if (count($TdRecentVisitBooks)<5) {
                
                array_push($TdRecentVisitBooks,$value1);
            }
        }
        return response()->json( [
                'success' => 1,
                'td_recent_share_book' =>$TdRecentShareBooks,
                'td_recent_visit_book' =>$TdRecentVisitBooks,
            ], 200 );
    }


    public function Report(Request $request)
    {
        $user_id=$request->id;
        $user_type=$request->user_type;
        $subject=$request->subject;
        $description=$request->description;

        // $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        // $report_id=substr(str_shuffle($str_result),
        //                0, 8);
        $str_result =TdReport::get();
        $report_id=date('YmdHis')."_".(count($str_result) + 1);

        $img_id=date('YmdHis')."_".$user_id;
        $profile_iamge_name='';
        $img_url='';
        if ($request->hasFile('file')) {
            $profile_iamge_path = $request->file('file');
            $profile_iamge_name= $img_id. '.' . $profile_iamge_path->getClientOriginalExtension();
            $profile_iamge_path->move(public_path('report-images/'), $profile_iamge_name);
            $img_url=env('APP_URL')."/public/report-images/".$profile_iamge_name;
        }
        $data=TdReport::create(array(
            'user_publisher_id'=>$user_id,
            'user_type'=>$user_type,
            'report_id'=>$report_id,
            'subject'=>$subject,
            'description'=>$description,
            'file_name'=>$profile_iamge_name,
            'file_url'=>$img_url,
            'create_date'=>date('Y-m-d H:i:s'),
        ));

        return response()->json( [
                'success' => 1,
                'message' =>$data
            ], 200 );
    }
    
}
