import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class ActiveserviceService {
   url=GlobalConstants.apiURL+'/api/publisher/activepages';
  constructor(private http:HttpClient) { }
  get_pages(){
    return this.http.get(this.url,{responseType:'text'});
  }
}
