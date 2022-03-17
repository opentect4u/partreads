<?php

namespace App\Http\Controllers\publisher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\TdPublisherDetails;
use App\Models\MdUserLogin;
use App\Models\TdReport;
use App\Models\TdPublisherPayment;
use App\Models\TdBuyBookPayment;
use Carbon\Carbon;

class HomeController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('is_publisher');
    // }

    public function Home(Request $request){
    	$id=$request->id;
    	$data=TdPublisherDetails::where('publisher_id',$id)->get();
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
            $profile_iamge_path->move(public_path('publisher-images/'), $profile_iamge_name);
            $img_url=env('APP_URL')."/public/publisher-images/".$profile_iamge_name;

            $data1=DB::table('td_publisher_details')
                        ->where('publisher_id',$id)
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
                            'bank_name'=>$request->bank_name,
                            'gst_no'=>$request->gst_no,
                            'acc_no'=>$request->acc_no,
                            'ifsc_code'=>$request->ifsc_code,
                            'update_by' => $name,
                            // 'name' => $name,
                            'updated_at' =>date('Y-m-d H:i:s')
                        ]);
        } else{
            $data1=DB::table('td_publisher_details')
                        ->where('publisher_id',$id)
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
                            'bank_name'=>$request->bank_name,
                            'gst_no'=>$request->gst_no,
                            'acc_no'=>$request->acc_no,
                            'ifsc_code'=>$request->ifsc_code,
                            'update_by' => $name,
                            // 'name' => $name,
                            'updated_at' =>date('Y-m-d H:i:s')
                        ]);
        }

        
        $data=MdUserLogin::find($id);
        $data->name=$name;
        $data->save();
        if ($data1>0) {
            $data2=TdPublisherDetails::where('publisher_id',$id)->get();
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


    public function Report(Request $request)
    {
        $user_id=$request->id;
        $user_type=$request->user_type;
        $subject=$request->subject;
        $description=$request->description;

        // $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        // $report_id=substr(str_shuffle($str_result), 0, 8);
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


    public function PaymentHistory(Request $request)
    {
        $publisher_id=$request->publisher_id;
        if ($request->frm_date!='' && $request->to_date!='') {
            // return "if";
            $start_date=Carbon::parse($request->frm_date)->format('Y-m-d');
            $end_date=Carbon::parse($request->to_date)->format('Y-m-d');
            $data=TdPublisherPayment::where('publisher_id',$publisher_id)
                ->whereBetween('date', [$start_date, $end_date])
                ->orderBy('date','desc')
                ->get();
        }else{
            $data=TdPublisherPayment::where('publisher_id',$publisher_id)
                ->orderBy('date','desc')
                ->get();
        }

        return response()->json( [
                'success' => 1,
                'message' =>$data
            ], 200 );
    }


    public function SoldBookHistory(Request $request)
    {
        $publisher_id=$request->publisher_id;
         if ($request->frm_date!='' && $request->to_date!='') {
            // return "if";
            $start_date=Carbon::parse($request->frm_date)->format('Y-m-d');
            $end_date=Carbon::parse($request->to_date)->format('Y-m-d');
            $order_details=TdBuyBookPayment::with('BookDetails')
                    ->with('UserDetails')
                    ->where('publisher_id',$publisher_id)
                    ->whereBetween('date', [$start_date, $end_date])
                    ->orderBy('date','desc')
                    ->get();
        }else{
            $order_details=TdBuyBookPayment::with('BookDetails')
                    ->with('UserDetails')
                    ->where('publisher_id',$publisher_id)
                    ->orderBy('date','desc')
                    ->get();
        }

        return response()->json( [
                'success' => 1,
                'message' =>$order_details
            ], 200 );


    }


    public function HomeDetails(Request $request)
    {
        $publisher_id=$request->publisher_id;
        $order_details=TdBuyBookPayment::where('publisher_id',$publisher_id)
                    ->get();
        $total_amount=0;
        foreach ($order_details as $value) {
            $total_price=$value->total_price;
            $total_amount=$total_amount+$total_price;
        }

        $data=TdPublisherPayment::where('publisher_id',$publisher_id)->get();
        $earned_amount=0;
        foreach ($data as $value1) {
            $amount=$value1->amount;
            $earned_amount=$earned_amount+$amount;
        }

        $array=[];
        $array['sold_amount']=$total_amount;
        $array['earned_amount']=$earned_amount;

        return response()->json( [
                'success' => 1,
                'message' =>$array
            ], 200 );

    }
}
