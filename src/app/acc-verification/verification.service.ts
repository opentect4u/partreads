import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http:HttpClient) { }
  verfiy_email(id:any){
    const formdata=new FormData()
    formdata.append("user_id",id);
    return this.http.post(GlobalConstants.apiURL+'/api/user/confirmregister',formdata,{responseType:'text'})
  }
}
