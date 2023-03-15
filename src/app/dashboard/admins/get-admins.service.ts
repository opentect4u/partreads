import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class GetAdminsService {
  url=GlobalConstants.apiURL+'/api/admin/showsubadmin'
  constructor(private http:HttpClient) { }
  showSubAdmin(){
    return this.http.get(this.url)
  }
}
