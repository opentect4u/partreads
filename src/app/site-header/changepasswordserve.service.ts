import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class ChangepasswordserveService {
  url=GlobalConstants.apiURL+'/api/change/changepassword'
  constructor(private http:HttpClient) { }
  change_pass(id:any,p:any,old_password:any){
    const formdata=new FormData()
    formdata.append('user_id',id);
    formdata.append('password',p);
    formdata.append('old_pass',old_password);
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
  change_pass1(uid:any,utype:any,utoken:any,id:any,p:any,old_pass:any){
    const formdata=new FormData()
    formdata.append('user_id',uid);
    formdata.append('user_type',utype);
    formdata.append('remember_token',utoken);
    formdata.append('user_id',id);
    formdata.append('password',p);
    formdata.append('old_pass',old_pass);
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
