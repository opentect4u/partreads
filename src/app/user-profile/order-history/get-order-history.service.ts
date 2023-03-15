import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class GetOrderHistoryService {
 private url=GlobalConstants.apiURL+'/api/user/orderhistory';
  constructor(private http:HttpClient) { }
  getOrderHistory(id:any,user_type:any,rememberToken:any){
    const formData=new FormData();
    formData.append('id',id);
    formData.append('user_type',user_type);
    formData.append('remember_token',rememberToken);
    return this.http.post(this.url,formData);
  }
  getOrderHistoryByDate(id:any,user_type:any,rememberToken:any,start_date:any,end_date:any){
    const formData=new FormData();
    formData.append('id',id);
    formData.append('user_type',user_type);
    formData.append('remember_token',rememberToken);
    formData.append('frm_date',start_date);
    formData.append('to_date',end_date);
    return this.http.post(this.url,formData);
  }
}
