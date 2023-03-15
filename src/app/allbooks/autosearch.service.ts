import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class AutosearchService {
  url=GlobalConstants.apiURL+'/api/searchbooks';//For getting all activated books list
  constructor(private http:HttpClient) { }
  getbook(){
    return this.http.get(this.url,{responseType:'text'});
  }
}
