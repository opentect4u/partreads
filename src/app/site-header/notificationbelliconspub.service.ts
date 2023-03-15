import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class NotificationbelliconspubService {
  _url=GlobalConstants.apiURL+'/api/publisher/notificationcount';
  constructor(private http:HttpClient) { }
   get_count(v1:any){
   const formdata=new FormData();
   formdata.append('id',v1);
   return this.http.post(this._url,formdata,{responseType:'text'});
 }
}
