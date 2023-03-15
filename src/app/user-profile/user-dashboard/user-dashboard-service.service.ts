import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardServiceService {
  url=GlobalConstants.apiURL+'/api/user/showcategory';
  subcate_url=GlobalConstants.apiURL+'/api/user/showsubcategory';
  top_rated_url=GlobalConstants.apiURL+'/api/user/topratedbook';
  publisher_list_url=GlobalConstants.apiURL+'/api/user/allpublishers';
  constructor(private http:HttpClient) { }
  getcategory(id:any,type:any,remember_token:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',type);
    formdata.append('remember_token',remember_token);
    return this.http.post(this.url,formdata,{responseType:'text'});
  }

  getsubcategory(cat_id:any,id:any,type:any,remember_token:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',type);
    formdata.append('remember_token',remember_token);
    formdata.append('category_id',cat_id);
    return this.http.post(this.subcate_url,formdata,{responseType:'text'});
  }


  getTopratedBooks(id:any,type:any,remember_token:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',type);
    formdata.append('remember_token',remember_token);
    return this.http.post(this.top_rated_url,formdata,{responseType:'text'});
  }

  getPublishers(id:any,type:any,remember_token:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',type);
    formdata.append('remember_token',remember_token);
    return this.http.post(this.publisher_list_url,formdata,{responseType:'text'});
  }

  postreports(id:any,type:any,remember_token:any,subject:any,description:any,file:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',type);
    formdata.append('remember_token',remember_token);
    formdata.append('subject',subject);
    formdata.append('description',description);
    formdata.append('file',file,file.name);
    var reports_api=type=='U' ? GlobalConstants.apiURL+'/api/user/report' : GlobalConstants.apiURL+'/api/publisher/report';
    return this.http.post(reports_api,formdata,{responseType:'text'});
  }
}
