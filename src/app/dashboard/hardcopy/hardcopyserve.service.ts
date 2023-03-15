import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class HardcopyserveService {
  url=GlobalConstants.apiURL+'/api/admin/showprintbook'
  constructor(private http:HttpClient) { }
  getHardCopyData(){
    return this.http.get(this.url)
  }
}
