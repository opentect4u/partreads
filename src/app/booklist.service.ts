import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { pubid} from './pubid';
import { GlobalConstants } from './globalvar/global';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BooklistService {
 url=GlobalConstants.apiURL+'/api/publisher/allbooks';
 constructor(private http:HttpClient) { }
  getBooks(id:pubid){
    const formData=new FormData();
    formData.append('id',id.id);
    console.log(id);
    return this.http.post(this.url,formData,{responseType:'text'}).pipe(
      timeout(40000),
       retry(1),catchError(this.handleError));
  }
  handleError(error:HttpErrorResponse){
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
