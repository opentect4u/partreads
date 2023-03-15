import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class DashboardserviceService {
url=GlobalConstants.apiURL+'/api/user/dsahboarddata';
URL=GlobalConstants.apiURL+'/api/user/applycoupon';
  constructor(private http:HttpClient) { }
  get_dashboard_data(id:any,usertype:any,remembertoken:any){
    const formdata=new FormData();
    formdata.append('id',id);
    // formdata.append('search_value',item);
    formdata.append('user_type',usertype);
    formdata.append('remember_token',remembertoken);
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
  applyCoupon(id:any,user_type:any,remember_token:any,coupon_code:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',user_type);
    formdata.append('remember_token',remember_token);
    formdata.append('coupon_code',coupon_code);
    // formdata.append('id',id);
    return this.http.post(this.URL,formdata);
  }
}
