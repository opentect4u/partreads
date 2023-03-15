import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GlobalConstants } from '../globalvar/global';


@Injectable({
  providedIn: 'root'
})
export class NotificatiobelliconService {
  url=GlobalConstants.apiURL+'/api/user/notificationcount';
  constructor(private http:HttpClient) { }
  count(id:any,user_type:any,remember_token:any){
    // console.log(id);
    // console.log(user_type);
    // console.log(remember_token);
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',user_type);
    formdata.append('remember_token',remember_token);
    // console.log(formdata);
    return this.http.post(this.url,formdata,{responseType:'text'});

  }
}
