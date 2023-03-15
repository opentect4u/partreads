import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class RatingManageService {
url=GlobalConstants.apiURL+'/api/admin/showrating'
  constructor(private http:HttpClient) { }
  showrating(){
    return this.http.get(this.url)
  }
}
