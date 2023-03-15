import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class ShowcatsuserService {
  url=GlobalConstants.apiURL+'/api/user/showcategory';
  constructor(private http:HttpClient) { }
  get_categories(id:any,usertype:any,remembertoken:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',usertype);
    formdata.append('remember_token',remembertoken);
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
