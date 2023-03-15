import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class BuysharedpagesService {
  url=GlobalConstants.apiURL+'/api/user/clickbuyonmodel';
  constructor(private http:HttpClient) { }
  buypage(id:any,usertype:any,remembertoken:any,publisherid:any,bookid:any,page:any[]){

    const formdata=new FormData();
    // console.log(page.length);
    formdata.append('id',id);
    formdata.append('user_type',usertype);
    formdata.append('remember_token',remembertoken);
    formdata.append('book_id',bookid);
    formdata.append('publisher_id',publisherid);
    
    for(let i=0;i<page.length;i++)
    {
      console.log("showing="+page[i]);
      formdata.append('not_buy_page[]',page[i]);
      
    }
    console.log(formdata.get('book_id'));
    console.log(formdata.get('publisher_id'));
    console.log(formdata.getAll('not_buy_page[]'));
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
