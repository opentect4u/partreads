import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class EditbookserviceService {
  url=GlobalConstants.apiURL+''
  constructor(private http:HttpClient) { }
  edit_book(v:any){
    return this.http.post(this.url,v);
  }
}
