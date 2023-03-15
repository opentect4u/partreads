import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class PublishnotificationsService {
  url=GlobalConstants.apiURL+'/api/publisher/notificationshow';
  publisher_remove_notification=GlobalConstants.apiURL+'/api/publisher/notificationremove';
  constructor(private http:HttpClient) { }
     get_notification(pub_id:any){
     console.log("get_id:" +pub_id);
     const formData = new FormData();
     formData.append('id',pub_id);
     return this.http.post(this.url,formData,{responseType:'text'});
     
   }
   remove_notification(id:any,flag:any,table_id:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('flag',flag);
    formdata.append('table_id',table_id);
    return this.http.post(this.publisher_remove_notification,formdata);
    } 
}
