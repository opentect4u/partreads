import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BuyhardcopyService {
  url=GlobalConstants.apiURL+'/api/user/printbook'
  constructor(private http:HttpClient) { }
  buyHardCopy(uid:any,utype:any,remember_token:any,book_id:any,publisher_id:any,state:any,city:any,pincode:any,address:any){
    const formdata=new FormData();
    formdata.append('id',uid);
    formdata.append('user_type',utype);
    formdata.append('remember_token',remember_token);
    formdata.append('book_id',book_id);
    formdata.append('publisher_id',publisher_id);
    formdata.append('state',state);
    formdata.append('city',city);
    formdata.append('pincode',pincode);
    formdata.append('address',address);
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
