import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class AdminorderhistoryserveService {
   private url=GlobalConstants.apiURL+'/api/admin/paymentHistory';
  constructor(private http:HttpClient) { }
  getOrderHistory(){return this.http.get(this.url);}
  getOrderHistoryByDate(start_date:any,to_date:any){
    const formdata=new FormData();
    formdata.append('frm_date',start_date);
    formdata.append('to_date',to_date);
      return this.http.get(this.url+'?frm_date='+start_date+'&to_date='+to_date);
  }
}
