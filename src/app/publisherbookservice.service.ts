import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from './globalvar/global';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PublisherbookserviceService {
 url=GlobalConstants.apiURL+'/api/admin/allbooks';
 constructor(private http:HttpClient) { }
  getBooks(){
    return this.http.get(this.url).pipe(
      timeout(40000),
       retry(1),catchError(this.handleError));
  }
  handleError(error:HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.status}Message: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }


  getBooksByFlag(__flag: string){
    return this.http.get(this.url+'?flag='+__flag).pipe(
      timeout(40000),
       retry(1),catchError(this.handleError));
  }
  
}
