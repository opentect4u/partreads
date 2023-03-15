import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsereditService {
  k='';
  m:any;
 url=GlobalConstants.apiURL+'/api/user/update';
  constructor(private http:HttpClient) { }
  edit_profile(id:any,v1:any,v2:any,v3:any,v4:any,v5:any,v6:any,v7:any,v8:any,usertype:any,Type:any,mode_value:any,remembertoken:any,file?:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('name',v1);
    formdata.append('phone',v3);
    if(typeof(file)!=="undefined")
    formdata.append('profile_image',file,file.name);
    else{
      // file=null;
      // formdata.append('profile_image',file,'old');
    }
    formdata.append('state',v7);
    formdata.append('city',v5);
    formdata.append('pincode',v6);
    formdata.append('country',v8);
    formdata.append('street',v4);
    formdata.append('user_type',usertype);
    formdata.append('remember_token',remembertoken);
    formdata.append('student_academician',Type);
    formdata.append('college_university',mode_value);
   // console.log(formdata.get('remember_token'));
    return this.http.post(this.url,formdata,{responseType:'text'}).pipe(
      timeout(30000),
       retry(1),catchError(this.handleError1));
  }
  handleError1(error:HttpErrorResponse) {
    let errorMessage1 = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage1 = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage1 = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage1);
  }
}
