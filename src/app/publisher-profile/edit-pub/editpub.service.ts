import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditpubService {

  url=GlobalConstants.apiURL+'/api/publisher/home';
  constructor(private http:HttpClient) { }
  edit_profile(v:any){
    const formdata=new FormData();
    formdata.append('id',v);
    return this.http.post(this.url,formdata,{responseType:'text'});
  }
}
