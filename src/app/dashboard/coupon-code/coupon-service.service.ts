import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';

@Injectable({
  providedIn: 'root'
})
export class CouponServiceService {
   private URL=GlobalConstants.apiURL+'/api/admin/addcoupon';
   private couponURL=GlobalConstants.apiURL+'/api/admin/showcoupon';
   private coupondownloadurl=GlobalConstants.apiURL+'/api/admin/pdfdownload';
  constructor(private http:HttpClient) { }
  generateCoupon(
    book_name:any, 
    no_of_coupon:any, 
    coupon_from_date:any, 
    coupon_to_date:any,
    book_from_date:any,
    book_to_date:any,
    credit_amount:any,
    mode:any,
    c_start:any,
    c_end:any,
    temp_book_id: any | undefined = ''){
   const formdata=new FormData();
   formdata.append('book_name',book_name);
   formdata.append('no_of_coupon',no_of_coupon);
   formdata.append('coupon_from_date',coupon_from_date);
   formdata.append('coupon_to_date',coupon_to_date);
   formdata.append('book_from_date',book_from_date);
   formdata.append('book_to_date',book_to_date);
   formdata.append('credit_amount',credit_amount);
   formdata.append('flag',mode);
   formdata.append('countstart',c_start);
   formdata.append('countend',c_end);
   formdata.append('temp_book_id',temp_book_id);


  return this.http.post(this.URL,formdata);
  }
  searchCoupon(book_id:any | undefined = '',frm_date:any,to_date:any,temp_book_id: any | undefined = ''){
    const formdata=new FormData();
    formdata.append('book_id',book_id);
    formdata.append('coupon_from_date',frm_date);
    formdata.append('coupon_to_date',to_date)
    formdata.append('temp_book_id',temp_book_id);
    return this.http.post(this.couponURL,formdata);
  }
  downloadcoupon(book_id:any,frm_dt:any,to_dt:any,temp_book_id: any | undefined = ''){
    const formdata=new FormData();
   formdata.append('book_id',book_id);
   formdata.append('temp_book_id',temp_book_id);
   formdata.append('coupon_from_date',frm_dt);
   formdata.append('coupon_to_date',to_dt);
   return this.http.post(this.coupondownloadurl,formdata);
  }
}
