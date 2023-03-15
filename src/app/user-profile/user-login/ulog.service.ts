import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class UlogService {
  url=GlobalConstants.apiURL+'/api/user/login';
  constructor(private http:HttpClient) { }
  login_user(v1:any,v2:any,v3:any)
  {
    const formdata=new FormData();
    formdata.append('user_id',v1);
    formdata.append('user_pass',v2);
    formdata.append('register_with_google',v3)
    return this.http.post(this.url,formdata,{responseType:'text'});
  }
}
