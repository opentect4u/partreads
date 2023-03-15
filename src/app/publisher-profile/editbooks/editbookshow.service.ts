import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class EditbookshowService {
  url=GlobalConstants.apiURL+'/api/publisher/editbookshow';
  constructor(private http:HttpClient) { }
  edit_show(id:any,book_id:any,flag:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('book_id',book_id);
    formdata.append('flag',flag);
    console.log(formdata.get('id'));
    console.log(formdata.get('book_id'));
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
