import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class SubmitenquiryService {
   url=GlobalConstants.apiURL+'/api/enquiry';
   u_regurl=GlobalConstants.apiURL+'/api/user/registerlogin';
   u_regurl_step2=GlobalConstants.apiURL+'/api/user/registerlogin1';
   u_regurl_step3=GlobalConstants.apiURL+'/api/user/registerlogin2';
  constructor(private http:HttpClient) { }
  submit_enq(v:any){
    const formdata=new FormData();
    formdata.append('name',v.nm);
    formdata.append('email',v.em);
    formdata.append('phone',v.ph);
    formdata.append('about',v.about);
    formdata.append('enquiry',v.remarks)
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
  submit_phone_email(phone:any){
    const formdata=new FormData();
    formdata.append('phone',phone);
  return this.http.post(this.u_regurl,formdata);
  }
  submit_secondstage(phone:any){
    const formdata=new FormData();
    formdata.append('phone',phone);
  return this.http.post(this.u_regurl_step2,formdata);
  }
  submit_thirdstage(user_name:any,phone:any,email:any,u_type:any,coupon_code:any){
    const formdata=new FormData();
    formdata.append('user_name',user_name);
    formdata.append('phone',phone);
    formdata.append('email',email);
    formdata.append('u_type',u_type);
    formdata.append('coupon_code',coupon_code);
    return this.http.post(this.u_regurl_step3,formdata);

  }
}
