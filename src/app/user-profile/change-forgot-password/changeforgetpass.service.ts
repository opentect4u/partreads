import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class ChangeforgetpassService {

  constructor(private http:HttpClient) { }
  url=GlobalConstants.apiURL+'/api/change/forgotpasswordconfirm';

  change_forgot_password(user_id:any,password:any){
    const formdata=new FormData();
    formdata.append('user_id',user_id);
    formdata.append('password',password);
    return this.http.post(this.url,formdata);
  }
}
