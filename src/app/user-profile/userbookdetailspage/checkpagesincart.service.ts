import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class CheckpagesincartService {
 url=GlobalConstants.apiURL+'/api/user/showbookcart'
  constructor(private http:HttpClient) { }
  checkpages(uid:any,utype:any,utoken:any,bid:any){
    const formdata=new FormData();
    formdata.append('id',uid);
    formdata.append('user_type',utype);
    formdata.append('remember_token',utoken);
    formdata.append('book_id',bid);
    // console.log(formdata.get('id'));
    // console.log(formdata.get('book_id'))
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
