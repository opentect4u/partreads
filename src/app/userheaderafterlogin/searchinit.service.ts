import { Injectable } from '@angular/core';
import { GlobalConstants } from '../globalvar/global';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchinitService {

  constructor(private http:HttpClient) { }
  url=GlobalConstants.apiURL+'/api/user/autocomsearch';
  getdet(id:any,usertype:any,remembertoken:any){
      const formdata=new FormData();
      formdata.append('id',id);
      formdata.append('user_type',usertype);
      formdata.append('remember_token',remembertoken);
      return this.http.post(this.url,formdata,{responseType:'text'})
    }
  }

