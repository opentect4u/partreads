import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class ReviewratingService {
 
  url=GlobalConstants.apiURL+'/api/user/createrating';
  
  constructor(private http:HttpClient) { 

  }
  post_review(id:any,user_type:any,remember_token:any,book_id:any,rating:any,review:any){
    const formdata=new FormData();
    formdata.append("id",id);
    formdata.append("user_type",user_type);
    formdata.append("remember_token",remember_token);
    formdata.append("book_id",book_id);
    formdata.append("rating_no",rating);
    formdata.append("review",review);
    return this.http.post(this.url,formdata);

  }
  getReview(id:any,user_type:any,remember_token:any,book_id:any){
    const formdata=new FormData();
    formdata.append("id",id);
    formdata.append("user_type",user_type);
    formdata.append("remember_token",remember_token);
    formdata.append("book_id",book_id);
   return this.http.post(GlobalConstants.apiURL+'/api/user/showratingperuser',formdata)
  }
  getavgRating(id:any,user_type:any,remember_token:any,book_id:any){
    const formdata=new FormData();
    formdata.append("id",id);
    formdata.append("user_type",user_type);
    formdata.append("remember_token",remember_token);
    formdata.append("book_id",book_id);
   return this.http.post(GlobalConstants.apiURL+'/api/user/showavaragerating',formdata)
  }
}
