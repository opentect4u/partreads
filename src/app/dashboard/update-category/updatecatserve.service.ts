import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class UpdatecatserveService {
  _url=GlobalConstants.apiURL+'/api/admin/categoryupdate';
  constructor(private http:HttpClient) { }
   Post_data(v1:any,v2:any)
   {
       const formdata=new FormData();
       formdata.append('id',v1);
       formdata.append('name',v2);
       return this.http.post(this._url,formdata,{responseType:'text'});
   }
    
}
