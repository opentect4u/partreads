import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../globalvar/global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddAdminService {
  url=GlobalConstants.apiURL+'/api/admin/createsubadmin';
  constructor(private http:HttpClient) { }
  add_admin(id:any,name:any,email:any,phone:any,user_manage:any,publisher_manage:any,category_manage:any,subcategory_manage:any,all_books:any,review_rates:any,h_copy:any,u_reports:any,p_reports:any,pay_history:any,com_mgmt:any,gen_coupon:any,use_coupon:any){
    var Id=id!='0' ? id : '';
    const formdata=new FormData();
    formdata.append("id",Id);
    formdata.append("user_id",email);
    formdata.append("user_name",name);
    formdata.append("mobile_no",phone);
    formdata.append("user_manage",user_manage);
    formdata.append("publisher_manage",publisher_manage);
    formdata.append("category_manage",category_manage);
    formdata.append("subcategory_manage",subcategory_manage);
    formdata.append("all_books",all_books);
    formdata.append("review_rating",review_rates);
    formdata.append("hard_copy",h_copy);
    formdata.append("user_reports",u_reports);
    formdata.append("publisher_reports",p_reports);
    formdata.append("payment_history",pay_history);
    formdata.append("commission_management",com_mgmt);
    formdata.append("coupon_manage",gen_coupon);
    formdata.append('used_coupon',use_coupon)
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
