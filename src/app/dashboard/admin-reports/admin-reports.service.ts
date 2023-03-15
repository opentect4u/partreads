import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class AdminReportsService {
   url = GlobalConstants.apiURL+'/api/admin/showuserreport';
   pub_url=GlobalConstants.apiURL+'/api/admin/showpublisherreport';
  constructor(private http:HttpClient) { }
  getReports(){return this.http.get(this.url);}
  getPubReports(){return this.http.get(this.pub_url);}
  getReportsById(id:any){return this.http.get(this.url+'?table_id='+id);}
  getpubReportsById(id:any){return this.http.get(this.pub_url+'?table_id='+id);}
}
