import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BuynowInitService {
  url=GlobalConstants.apiURL+'/api/user/showpreviewindexandbuypages';
  constructor(private http:HttpClient) { }
  show_book(book_id: any, p_id: any, id: any, usertype: any, remembertoken: any) {
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('user_type', usertype);
    formdata.append('remember_token', remembertoken);
    formdata.append('book_id', book_id);
    formdata.append('publisher_id', p_id);
    return this.http.post(this.url, formdata, { responseType: 'text' }).pipe(
      timeout(40000), retry(1),catchError(this.handleError));
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
