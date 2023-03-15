import { Injectable } from '@angular/core';
import { activebook } from './activatebook';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {

 url=GlobalConstants.apiURL+'/api/publisher/activebooks';

  constructor(private http:HttpClient) { }
  activate(a:activebook){
    const formData=new FormData();
    formData.append('id',a.id);
    formData.append('active_book',a.active_book);
    return this.http.post(this.url,formData,{responseType:'text'})

  }
}
