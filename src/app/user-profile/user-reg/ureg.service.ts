import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class UregService {
  url=GlobalConstants.apiURL+'/api/user/register';
  couponacheckurl=GlobalConstants.apiURL+'/api/user/registerapplycoupon';
  url_otp_user_profile=GlobalConstants.apiURL+'/api/user/verifyphoneemail';
  url_otp_sent_user_profile=GlobalConstants.apiURL+'/api/user/verifyphoneemailotp';


  
constructor(private http:HttpClient) { }
  register(v1:any,v2:any,v3:any,v4:any,v5:any,v6:any,v7:any,v8:any){
    const formdata=new FormData();
    formdata.append('user_id',v2);
    formdata.append('user_pass',v3);
    formdata.append('user_name',v1);
    formdata.append('phone',v4);
    formdata.append('register_with_google',v5);
    formdata.append('profile_image',v6);
    formdata.append('type',v7);
    formdata.append('referral code',v8);
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
  couponcheck(c_code:any){
    const formdata=new FormData();
    formdata.append('coupon_code',c_code);
    return this.http.post(this.couponacheckurl,formdata);
  }
  getOtp(u_id:any,u_type:any,rem_token:any,phone:any){
    const formdata= new FormData()
    formdata.append('id',u_id);
    formdata.append('user_type',u_type);
    formdata.append('remember_token',rem_token);
    formdata.append('phone',phone);
    return this.http.post(this.url_otp_sent_user_profile,formdata);
  }
  verifyphoneemail(u_id:any,u_type:any,rem_token:any,phone:any){
    const formdata= new FormData()
    formdata.append('id',u_id);
    formdata.append('user_type',u_type);
    formdata.append('remember_token',rem_token);
    formdata.append('phone',phone);
    return this.http.post(this.url_otp_user_profile,formdata);
  }
}
