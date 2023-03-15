import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class NotificationAdminService {
  _url=GlobalConstants.apiURL+'/api/admin/notificationshow';
  admin_remove_notification=GlobalConstants.apiURL+'/api/admin/notificationremove';
  constructor(private http:HttpClient) { }
  get_admin_notification(v1:any){
   const formdata = new FormData();
  formdata.append('admin_id',v1);
  return this.http.post(this._url,formdata,{responseType:'text'})
  .pipe(
    // timeout(15000),
    retry(1));
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
remove_notification(flag:any,table_id:any){
const formdata=new FormData();
formdata.append('flag',flag);
formdata.append('table_id',table_id);
return this.http.post(this.admin_remove_notification,formdata);
} 
}
