import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class ShowsubatsuserService {
  url=GlobalConstants.apiURL+'/api/user/showsubcategory';
  constructor(private http:HttpClient) { }
  get_subcategories(id:any,usertype:any,remember_token:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',usertype);
    formdata.append('remember_token',remember_token);
    return this.http.post(this.url,formdata,{responseType:'text'});
  }
}
