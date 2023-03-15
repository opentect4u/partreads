import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class TopfiveService {
  url=GlobalConstants.apiURL+'/api/admin/hometopbook'
  constructor(private http:HttpClient) { }
  getTopFive(){
    return this.http.get(this.url,{responseType:'text'});
  }
}
