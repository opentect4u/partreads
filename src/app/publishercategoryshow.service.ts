import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class PublishercategoryshowService {
  url=GlobalConstants.apiURL+'/api/publisher/showcategory';
  constructor(private http:HttpClient) { }
  getData(){
    return this.http.get(this.url);
  }
}
