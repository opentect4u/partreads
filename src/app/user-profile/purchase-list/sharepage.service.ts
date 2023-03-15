import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class SharepageService {
  url=GlobalConstants.apiURL+'/api/user/sharebookpage';
  constructor(private http:HttpClient) { }
  share_page(id:any,type:any,remembertoken:any,book_id:any,publisher_id:any,page:any[],recipient:any){
    const formdata=new FormData();
    // console.log(page.length);
    formdata.append('id',id);
    formdata.append('user_type',type);
    formdata.append('remember_token',remembertoken);
    formdata.append('book_id',book_id);
    formdata.append('publisher_id',publisher_id);
    formdata.append('recipient',recipient);
    for(let i=0;i<page.length;i++)
    {
      // console.log("showing="+page[i]);
      formdata.append('page[]',page[i]);
    }
    console.log(formdata.get('id'))
    console.log(formdata.get('user_type'))
    console.log(formdata.get('remember_token'))
    console.log(formdata.get('book_id'))
    console.log(formdata.get('publisher_id'))
    // for(let i=0;i<page.length;i++)
    // {
    //   //console.log("showing="+page[i]);
    //   formdata.get('page[]');
    // }
    // console.log(formdata.getAll('page[]'));
    return this.http.post(this.url,formdata,{responseType:'text'});
  }
}
