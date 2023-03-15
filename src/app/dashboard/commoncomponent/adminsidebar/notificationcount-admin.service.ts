import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class NotificationcountAdminService {
  _url=GlobalConstants.apiURL+'/api/admin/notificationcount';
  constructor(private http:HttpClient) { }
  get_notification_Count(v2:any){
  const formdata=new FormData();
   formdata.append('admin_id',v2);
    return this.http.post(this._url,formdata,{responseType:'text'})


  }
}
