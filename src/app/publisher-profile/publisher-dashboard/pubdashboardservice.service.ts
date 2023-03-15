import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class PubdashboardserviceService {

  constructor(private http:HttpClient) { }
  private url=GlobalConstants.apiURL+'/api/publisher/homedetails';
  getdetailsofheader(pub_id:any){
    const formdata=new FormData();
    formdata.append('publisher_id',pub_id);
     return this.http.post(this.url,formdata);
  }
}
