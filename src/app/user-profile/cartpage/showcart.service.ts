import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class ShowcartService {
   url=GlobalConstants.apiURL+'/api/user/showcartdetails'
  constructor(private http:HttpClient) { }
  getcart(uid:any,utype:any,utoken:any){
    const formdata=new FormData();
    formdata.append('id',uid);
    formdata.append('user_type',utype);
    formdata.append('remember_token',utoken)
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
  removeCart(id:any,utype:any,utoken:any,tableid:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',utype);
    formdata.append('remember_token',utoken)
    formdata.append('table_id',tableid);
    return this.http.post(GlobalConstants.apiURL+'/api/user/removetocart',formdata,{responseType:'text'})

  }
}
  
