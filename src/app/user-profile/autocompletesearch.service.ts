import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class AutocompletesearchService {
  url=GlobalConstants.apiURL+'/api/user/autocomsearch';
  constructor(private http:HttpClient) { }
  get_search_details(item:any,id:any,usertype:any,remembertoken:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('search_value',item);
    formdata.append('user_type',usertype);
    formdata.append('remember_token',remembertoken);
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
