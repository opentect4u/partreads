import { Injectable } from '@angular/core';
import { ILogin } from './login';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class LogserveService {
 _url=GlobalConstants.apiURL+'/api/admin/login';
  constructor(private http:HttpClient) { }
  // getData(user:ILogin){
  getData(user:any){
    return this.http.post<any>(this._url,user);
  }
}
