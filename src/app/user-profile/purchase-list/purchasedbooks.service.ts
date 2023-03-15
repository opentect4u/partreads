import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PurchasedbooksService {
  url=GlobalConstants.apiURL+'/api/user/purchaselist';
  related_books=GlobalConstants.apiURL+'/api/user/relatedbook';
  constructor(private http:HttpClient) { }
  purchasedlist(id: any, usertype: any, remembertoken: any) {
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('user_type', usertype);
    formdata.append('remember_token', remembertoken);
    
    return this.http.post(this.url, formdata, { responseType: 'text' }).pipe(
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

  relatedBooks(cat_id:any,id: any, usertype: any, remembertoken: any,book_id:any){
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('user_type', usertype);
    formdata.append('remember_token', remembertoken);
    formdata.append('category_id',cat_id);
    formdata.append('book_id',book_id);
    return this.http.post(this.related_books, formdata, { responseType: 'text' }).pipe(
      timeout(40000),
       retry(1),catchError(this.handleError));
  }
}
