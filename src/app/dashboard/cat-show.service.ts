import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
import { throwError } from 'rxjs';
import { retry, catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatShowService {

  url=GlobalConstants.apiURL+'/api/admin/categoryshow';
  constructor(private http:HttpClient) { }
  getData(){
    return this.http.get(this.url) 
    .pipe(
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
  getSub(id:any){
    const formdata=new FormData();
    formdata.append("category_id",id);
    return this.http.post(GlobalConstants.apiURL+'/api/admin/showsubcatincat',formdata,{responseType:'text'})
  }
 }





