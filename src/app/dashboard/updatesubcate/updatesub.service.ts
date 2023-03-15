import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class UpdatesubService {
  _url=GlobalConstants.apiURL+'/api/admin/subcategoryupdate';
  constructor(private http:HttpClient) { }
  update_subcat(v1:any,v2:any,v3:any){
    // const formdata
    const formdata=new FormData();
    formdata.append('id',v1);
    formdata.append('category_id',v2);
    formdata.append('name',v3);
    return this.http.post(this._url,formdata,{responseType:'text'})




  }
}
