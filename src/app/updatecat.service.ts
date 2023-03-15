import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IupCat } from './/upcat';
import { GlobalConstants } from './globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class UpdatecatService {
 url=GlobalConstants.apiURL+'/api/admin/categoryshowUpadte';
  constructor(private http:HttpClient) { }
  update_cat(v:IupCat){
    return this.http.post(this.url,v);
  }

}
