import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class ClickserviceService {
  url=GlobalConstants.apiURL+'/api/user/clickonlink1';
  constructor(private http:HttpClient) { }
  sendpage(publisher_id:any,book_id:any,page:any,id:any,user_type:any,remember_token:any){
    const formdata=new FormData();
    formdata.append('publisher_id',publisher_id);
    formdata.append('book_id',book_id);
    formdata.append('page',page);
    formdata.append('id',id);
    formdata.append('user_type',user_type);
    formdata.append('remember_token',remember_token);
    return this.http.post(this.url,formdata,{responseType:'text'});
  }
}
