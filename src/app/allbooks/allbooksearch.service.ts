import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AllbooksearchService {
  url=GlobalConstants.apiURL+'/api/allbooks';
  constructor(private http:HttpClient) { }
  getbooks(search_value:string){
    const formdata=new FormData();
    formdata.append('search_value',search_value);
    return this.http.post(this.url,formdata,{responseType:'text'}).pipe(
      timeout(40000),
       retry(1),catchError(this.handleError1));
  }
  handleError1(error:HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
}
