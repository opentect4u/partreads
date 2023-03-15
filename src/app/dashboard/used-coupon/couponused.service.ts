import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class CouponusedService {
   URL=GlobalConstants.apiURL+'/api/admin/usedcoupon';
  constructor(private http:HttpClient) { }
  getAllcouponHistory(){
    return this.http.get(this.URL);
  }
}
