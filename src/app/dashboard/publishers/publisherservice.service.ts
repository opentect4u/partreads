import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class PublisherserviceService {

  
   url=GlobalConstants.apiURL+'/api/admin/publisher';
  constructor(private http:HttpClient) { }
  get_apipublisher(){
    return this.http.get(this.url,{responseType:'text'})
    .pipe(
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



}
