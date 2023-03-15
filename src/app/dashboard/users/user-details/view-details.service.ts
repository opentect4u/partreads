import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ViewDetailsService {
  url=GlobalConstants.apiURL+'/api/admin/userdetails'
  constructor(private http:HttpClient) { }
  getUserDetails(id:any){
    const formdata=new FormData();
    formdata.append("id",id);
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
