import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class PubCommisssionService {

  // constructor(private http:HttpClient) { }
  // private URL=GlobalConstants.apiURL+'/api/publisher/paymenthistory';
  // getPublisherpaymenthistory(pub_id:any){
  //   return this.http.get(this.URL+'?publisher_id='+pub_id);
  // }
}
