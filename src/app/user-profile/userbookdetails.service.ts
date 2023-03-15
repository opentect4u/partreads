import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserbookdetailsService {
  url=GlobalConstants.apiURL+'/api/user/showbook';
  constructor(private http:HttpClient) { }
  get_book_details(v1:any,v2:any,v3:any,v4:any,v5:any){
    const formdata=new FormData();
    formdata.append('id',v1);
    formdata.append('user_type',v2);
    formdata.append('remember_token',v3);
    formdata.append('book_id',v4);
    formdata.append('publisher_id',v5);
   // console.log(formdata.get('publisher_id'));
    return this.http.post(this.url,formdata,{responseType:'text'}).pipe(
      timeout(50000), 
      retry(1),
      catchError(this.handleError1)
      );
  }
  handleError1(error:HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `${error.status}\nMessage: ${error.message}`;
    }
   
    return throwError(errorMessage);
  }
}
