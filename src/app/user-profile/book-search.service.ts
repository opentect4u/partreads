import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class BookSearchService {
  url=GlobalConstants.apiURL+'/api/user/searchbook';
  constructor(private http:HttpClient) { }
  getsearch(item:any,id:any,type:any,remember_token:any){
   const formdata=new FormData();
   formdata.append('id',id);
   formdata.append('user_type',type);
   formdata.append('remember_token',remember_token);
   formdata.append('search_value',item);
   return this.http.post(this.url,formdata,{responseType:'text'});
  }
}
