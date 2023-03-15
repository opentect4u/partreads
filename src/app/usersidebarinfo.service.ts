import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class UsersidebarinfoService {
  url=GlobalConstants.apiURL+'/api/user/home';
  constructor(private http:HttpClient) { }
  get_info_user(v:any,v2:any,v3:any)
  {
    const formdata=new FormData();
    formdata.append('id',v);
    formdata.append('user_type',v2);
    formdata.append('remember_token',v3);
    return this.http.post(this.url,formdata,{responseType:'text'});
  }
}
