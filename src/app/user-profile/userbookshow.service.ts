import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { GlobalConstants } from '../globalvar/global';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserbookshowService {
  url=GlobalConstants.apiURL+'/api/user/allbooks';
  constructor(private http:HttpClient) { }
  getbooks(v1:any,v2:any,v3:any,min:any,max:any,category_id:any,sub_category_id:any,sort:any,pub_id:any){
    const formdata=new FormData();
    formdata.append('id',v1);
    formdata.append('user_type',v2);
    formdata.append('remember_token',v3);
    formdata.append('min',min);
    formdata.append('max',max);
    formdata.append('sort_by',sort);
    formdata.append('category_id',category_id);
    formdata.append('subcategory_id',sub_category_id);
    formdata.append('publisher_id',pub_id);
    return this.http.post(this.url,formdata,{responseType:'text'}).pipe(
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
