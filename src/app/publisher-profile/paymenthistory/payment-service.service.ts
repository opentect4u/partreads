import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http:HttpClient) { }
  private URL=GlobalConstants.apiURL+'/api/publisher/paymenthistory';
  private pub_pay_url=GlobalConstants.apiURL+'/api/publisher/soldbookhistory'
  getPublisherpaymenthistory(pub_id:any,frm_date:any,to_date:any){
    const formdata=new FormData();
    formdata.append('publisher_id',pub_id);

    formdata.append('frm_date',frm_date);
    formdata.append('to_date',to_date);
    return this.http.post(this.pub_pay_url,formdata);
  }
  getPublisherCommissionHistory(pub_id:any,frm_date:any,to_date:any){
    return this.http.get(this.URL+'?publisher_id='+pub_id+'&frm_date='+frm_date+'&to_date='+to_date);

  }
}
