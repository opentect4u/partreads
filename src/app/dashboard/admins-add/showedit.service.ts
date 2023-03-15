import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class ShoweditService {
  url=GlobalConstants.apiURL+'/api/admin/showeditsubadmin'
  constructor(private http:HttpClient) { }
  show_edit_admin(id:any){
    const formdata=new FormData();
    formdata.append('id',id)
    // formdata.append("user_id",email);
    // formdata.append("user_name",name);
    // formdata.append("mobile_no",phone);
    // formdata.append("user_manage",user_manage);
    // formdata.append("publisher_manage",publisher_manage);
    // formdata.append("category_manage",category_manage);
    // formdata.append("subcategory_manage",subcategory_manage);
    // formdata.append("all_books",all_books);
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
