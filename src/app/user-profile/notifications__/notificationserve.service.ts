import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class NotificationserveService {
  user_remove_notification=GlobalConstants.apiURL+'/api/user/notificationremove';

  url=GlobalConstants.apiURL+'/api/user/notificationshow';
  constructor(private http:HttpClient) { }
  getData(id:any,user_type:any,remember_token:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',user_type);
    formdata.append('remember_token',remember_token);

    return this.http.post(this.url,formdata,{responseType:'text'}) .pipe(
      // timeout(20000),
      retry(1),catchError(this.handleError));
  }
  handleError(error:HttpErrorResponse,Error:any) {
    let errorMessage= '';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = `Error: ${error.error.message}`;
    
     
    } else {
   
      errorMessage = `${error.status}Message: ${error.message}`;
     
    }
     return throwError(errorMessage);
  }
  remove_notification(id:any,user_type:any,remember_token:any,flag:any,table_id:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_type',user_type);
    formdata.append('remember_token',remember_token);
    formdata.append('flag',flag);
    formdata.append('table_id',table_id);
    return this.http.post(this.user_remove_notification,formdata);
    } 


}
