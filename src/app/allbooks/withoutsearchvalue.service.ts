import { Injectable } from '@angular/core';
import { GlobalConstants } from '../globalvar/global';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WithoutsearchvalueService {
  url=GlobalConstants.apiURL+'/api/allbooks';
  constructor(private http:HttpClient) { }
  getbooks(){ 
    return this.http.post(this.url,'',{responseType:'text'}).pipe(
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
      errorMessage = `${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
