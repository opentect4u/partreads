import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class AddtocartserveService {
url=GlobalConstants.apiURL+'/api/user/addtocart'
  constructor(private http:HttpClient) { }
  add_to_cart(uid:any,utype:any,rtoken:any,pid:any,bid:any,from:any,to:any,whole_book:any){
    const formdata=new FormData();
    formdata.append('id',uid);
    formdata.append('user_type',utype);
    formdata.append('remember_token',rtoken);
    formdata.append('publisher_id',pid);
    formdata.append('book_id',bid);
    formdata.append('from',from);
    formdata.append('to',to);
    formdata.append('whole_book',whole_book);
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
