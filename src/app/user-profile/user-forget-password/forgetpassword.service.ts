import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  constructor(private http:HttpClient) { }

  url=GlobalConstants.apiURL+'/api/change/forgotpassword';
  forget_password(email:any){
    const formdata=new FormData();
    formdata.append('user_id',email);
    return this.http.post(this.url,formdata);
  }
}
