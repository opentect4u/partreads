import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class ApproveratingService {
  url=GlobalConstants.apiURL+'/api/admin/showratingajax'
  constructor(private http:HttpClient) { }
  approveRating(id:any,show_flag:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('Show_flag',show_flag)
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
