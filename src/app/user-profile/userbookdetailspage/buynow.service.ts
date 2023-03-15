import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class BuynowService {
  url=GlobalConstants.apiURL+'/api/user/buybookpages';
  constructor(private http:HttpClient) { }
  buybook(id:any,type:any,remembertoken:any,book_name:any,book_id:any,publisher_id:any,from_pg:any,to_pg:any,whole_book:any)
  {
    // console.log("id="+id);
    // console.log("user_type="+type);
    // console.log("remember_token="+remembertoken);
    // console.log("bookname="+book_name);
    // console.log("book_id="+book_id);
    // console.log("publisher_id="+publisher_id);
    // console.log("From="+from_pg);
    // console.log("To="+to_pg);
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',type);
    formdata.append('remember_token',remembertoken);
    formdata.append('book_id',book_id);
    formdata.append('publisher_id',publisher_id);
    formdata.append('from',from_pg);
    formdata.append('to',to_pg);
    formdata.append('whole_book',whole_book);
    return this.http.post(this.url,formdata,{responseType:'text'});
  }
}
