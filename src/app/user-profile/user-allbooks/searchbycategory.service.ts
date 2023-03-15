import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';


@Injectable({
  providedIn: 'root'
})
export class SearchbycategoryService {
  url=GlobalConstants.apiURL+'/api/user/searchbook';
  constructor(private http:HttpClient) { }
  getsearch(cat:any,subcat:any,id:any,type:any,remember_token:any,item:any){
    const formdata=new FormData();
    formdata.append('category_id',cat);
    formdata.append('subcategory_id',subcat);
    formdata.append('id',id);
    formdata.append('user_type',type);
    formdata.append('remember_token',remember_token);
    formdata.append('search_value',item);
    return this.http.post(this.url,formdata,{responseType:'text'});
   }
}
