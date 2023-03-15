import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class RejectbookService {
  url=GlobalConstants.apiURL+'/api/admin/rejectbook';
  constructor(private http:HttpClient) { }
  rejectbooks(v1:any,v2:any,v3:any){
   const formdata=new FormData()
   formdata.append('id',v1);
   formdata.append('show_book',v2);
   formdata.append('reject_msg',v3);
   return this.http.post(this.url,formdata,{responseType:'text'})

  }
}
