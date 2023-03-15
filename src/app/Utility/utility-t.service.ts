import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { filter, map, pluck } from 'rxjs/operators';
import { ShowcartService } from '../user-profile/cartpage/showcart.service';
import { AddtocartserveService } from '../user-profile/userbookdetailspage/addtocartserve.service';
import { BuyhardcopyService } from '../user-profile/userbookdetailspage/buyhardcopy.service';
import { UserbookdetailspageComponent } from '../user-profile/userbookdetailspage/userbookdetailspage.component';
import * as bcrypt from 'bcryptjs';
import { HttpClient } from '@angular/common/http';
import { DashboardserviceService } from '../user-profile/dash/dashboardservice.service';
import { UregService } from '../user-profile/user-reg/ureg.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConstants } from '../globalvar/global';
import { BooklistService } from '../booklist.service';
import { PublisherserviceService } from '../dashboard/publishers/publisherservice.service';
import { Publishers } from './__publisher';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UtilityTService {

  url=GlobalConstants.apiURL;
   public isConnected = new BehaviorSubject<any>(true);
   public _user_type = new BehaviorSubject<boolean>(false);
  constructor(private publishers:PublisherserviceService,private urg: UregService,private dash_data:DashboardserviceService,private http:HttpClient, private addtocart: AddtocartserveService, private toastr: ToastrManager, private router: Router, private show1: ShowcartService, private buyhardcopy: BuyhardcopyService) {
   }
  
   api_call(flag: number,api_name: string,__dt: any){
    if(flag > 0){
       return this.http.post(this.url+api_name,__dt);
    }
    else{
      var dt = __dt ? '?' + __dt : '';
      return this.http.get(this.url+api_name + dt);

    }

   }

  showToastr(msg: any, type: any) {
    switch (type) {
      case 'E': this.toastr.errorToastr(msg, ''); break;
      case 'S': this.toastr.successToastr(msg, ''); break;
      case 'W': this.toastr.warningToastr(msg, ''); break;
    }
  }
  go_to_user_bookDeatils_page(_book_id: any, _pub_id: any) {
    localStorage.setItem("user_book_id", _book_id);
    localStorage.setItem("user_pub_id", _pub_id);
    this.router.navigate(["/user/bookdetails"]);
  }
  preventNonNumericalInput(e: any) {
    e = e || window.event;
    var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
  }
  gotcart() {
    this.router.navigate(["/user/cart"]).then(() => {
      // location.reload();
    });
  }
  getcartvalue() {
   return new Promise((resolve,reject)=> {
      this.show1.getcart(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).pipe(map(x => JSON.parse(x))).subscribe(data => {
       resolve(data.success == '1' ? data.message.length : 0);
      })
    })
  
  }
  buyHardCopy(_state: any, _city: any, _pincode: any, _address: any, _book_id: any, _pub_id: any) {
    // this.buyhardcopy.buyHardCopy(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), _book_id, _pub_id, _state, _city, _pincode, _address).pipe(map(x => JSON.parse(x))).subscribe(data => {
    //   console.log(data);
    //   if (data.success == 1) {
    //     this.showToastr('You will be notified when the item is shipped!! you can show the whole book right now', 'S');
    //       localStorage.setItem('book_Index',data.message.book_id);
    //       setTimeout(()=>{
    //         this.router.navigate(['/user/purchaselist']).then(()=>{
    //           location.reload();
    //         })  
    //       },2000)
    //   }
    //   else {
    //     this.showToastr('Server did not responds', 'E');
    //   }

    // }, error => {
    //   this.showToastr('Server did not responds! Please try again later', 'E');
    // });

  }
  cart_add(_pub_id: any, _book_id: any, _frm_value: any, _to_value: any, _pages: any[], _whole_book: any, _total_pages: any,_flag:any) {
   return new Promise((resolve,reject) => {
    if (_whole_book == 'N') {
      if (_frm_value == '' || _to_value == '') {
        this.showToastr('Please provide page numbers', 'E');
        resolve(0) ;
      }
      else if ((parseInt(_to_value) < parseInt(_frm_value)) || parseInt(_to_value) < 0 || parseInt(_frm_value) < 0) {
        this.showToastr('Please provide a valid range of pages', 'E');
        resolve(0);
      }
      else if (parseInt(_to_value) > _total_pages || parseInt(_frm_value) > _total_pages) {
        this.showToastr('Page does not exist.(Total Pages: ' + _total_pages + ')', 'E');
        resolve(0);
      }
      else {
        var result = _pages.find(res => res == _frm_value || res == _to_value)
        if (result == undefined) {
          const  _response = this.Add_to_cartAPiCall(_pub_id, _book_id, _frm_value, _to_value, _whole_book,_flag)
          _response.then(res => {resolve(res)})
        }
        else {
          this.showToastr('*Please select a page which is neither bought nor shown in preview', 'E');
          resolve(0);
        }
      }
    }
    else {
     const _response =  this.Add_to_cartAPiCall(_pub_id, _book_id, _frm_value, _to_value, _whole_book,_flag);
     _response.then(res => {resolve(res)})
    }
   })
   
  }
  Add_to_cartAPiCall(_pub_id: any, _book_id: any, _frm_value: any, _to_value: any, _whole_book: any,_flag:any){
    return new Promise((resolve,reject) => {
      if(_flag == 'C'){
        this.addtocart.add_to_cart(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), _pub_id, _book_id, _frm_value, _to_value, _whole_book).pipe(map(x => JSON.parse(x))).subscribe(data => {
          if (data.success == 1) {
            this.showToastr('Added to cart successfull', 'S');
            resolve(1);
          }
          else {
            this.showToastr('Cart addition failed', 'E');
            resolve(0);
          }
        });
      }
      else{
         //   // this.buy.buybook(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), b_name, b_id, pub_id, v1, v2,this.whole_book).subscribe(data => {
    //   // console.log(data)
    //   // var objbuy=JSON.parse(data);
    //   // if(objbuy.success==1)
    //   //alert("You have successfully subscribed to the pages!");
    //   $("#subscribenow").prop("disabled", false);
    //   this.show_hide = false;
    //   // localStorage.setItem('book_Index',v2);
    //   this.router
    //     .navigate([
    //       "/user/payment",
    //       b_id,
    //       pub_id,
    //       b_name,
    //       1,
    //       1,
    //       this.whole_book,
    //     ])
    //     .then(() => {
    //       // location.reload();
    //     });
    //   // });
        resolve(1);
      }
    })
  }
  validateOTP(otphashCode:string,otp:any){
    console.log(otp, otphashCode);
    
    if(bcrypt.compareSync(otp, otphashCode)){
      return true
    }
   else{
     return false;

   }    
  }
  validateCoupon(_coupon_code:any,_flag:any){
    return new Promise((resolve,reject)=>{
      switch(_flag){
        case 'R':this.dash_data.applyCoupon(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),_coupon_code.toUpperCase()).pipe(pluck('success')).subscribe(data=>{
                     resolve(data);
                 })
                  break;
        case 'L': this.urg.couponcheck(_coupon_code.toUpperCase()).pipe(pluck('success')).subscribe(data=>{
                     resolve(data);
                    })
                   break;
      }
    })
          
  }
  delete(_b_id:any,_pub_id:any){
    const formData = new FormData();
    formData.append('book_id',_b_id);
    formData.append('id',_pub_id);
    return this.http.post(this.url+'/api/publisher/deletebook',formData); 
  }

  getPublishers():Promise<Publishers[]>{
  return new Promise((resolve,reject)=>{
    this.publishers.get_apipublisher().pipe(map(x => JSON.parse(x)),pluck('message')).subscribe(res=>{
          resolve(res)
    })
  })
  }

  submitEmail(_api_name:any,_dt:any){
       return this.http.post(this.url+_api_name,_dt,{responseType:"text"});
  }

  sendIsConnected(_isConnected:any){this.isConnected.next(_isConnected)}
  getIsConnected(){return this.isConnected.asObservable()}

  sendShowHideContactButton(_flag:any){this._user_type.next(_flag)}
  getShowHideContactButton(){return this._user_type.asObservable()}
  
  getuserType():Promise<any>{
    return new Promise((resolve,reject)=>{
    this.http.get('assets/Constants/_userType.json').subscribe(res => {
        resolve(res);
     })
    })
  }

}
