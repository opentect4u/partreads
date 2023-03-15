import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class MgmtcommisionService {

  constructor(private http:HttpClient) { }
  private url=GlobalConstants.apiURL;
  getCommision(v:any){
   return this.http.get(this.url+v);
  }
  postCommission(pub_id:any,ammount:any){
    const formData=new FormData();
    formData.append('publisher_id',pub_id);
    formData.append('amount',ammount)
    return this.http.post(this.url+'/api/admin/paycommission',formData);
  }
}
