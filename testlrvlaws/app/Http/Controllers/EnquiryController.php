<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    public function Enquiry(Request $request){
        $email=$request->email;
        $phone=$request->phone;
        $about=$request->about;
        $enquiry=$request->enquiry;

        //email send
        
        return response()->json( [
                    'success' => 1,
                    'message' => $email,
                    ], 200 );
    }
}
