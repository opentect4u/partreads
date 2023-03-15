import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from './globalvar/global';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PubsiderbarinfoService {
 url=GlobalConstants.apiURL+'/api/publisher/home';
  constructor(private router:Router,private http:HttpClient) { }
  get_pub_info(v:any){
    const formdata=new FormData();
    formdata.append('id',v);
    return this.http.post(this.url,formdata,{responseType:'text'});
  }
}
