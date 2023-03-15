import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
import { BuysharedpagesService } from '../clickonlink/buysharedpages.service';
import { ClickserviceService } from '../clickonlink/clickservice.service';
import { BuynowService } from '../userbookdetailspage/buynow.service';
declare var $:any
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  loading:boolean=false;
  // load:boolean=true;
  constructor(private Buy: BuysharedpagesService,private click: ClickserviceService,private toastr:ToastrManager,private router:Router,private buy: BuynowService,private route:ActivatedRoute) { }
  x:any;
  pub_id:any;
  book_id:any;
  full_book:any;
  frm_page:any;
  to_page:any;
  book_name:any;
  check_response:any;
  pagenotbought = [];

  ngOnInit(): void {
     this.book_id=this.route.snapshot.params['book_id'];
     this.pub_id=this.route.snapshot.params['pub_id'];
     this.book_name=this.route.snapshot.params['book_name'];
     this.frm_page=this.route.snapshot.params['frm'];
     this.to_page=this.route.snapshot.params['to'];
     this.full_book=this.route.snapshot.params['whole_book'];
     if(this.to_page > 0 ){
       if(this.full_book=='N'){}
       else{this.to_page=0;this.frm_page=0;}
       console.log(this.frm_page+' '+this.to_page);
     }
     else{
      this.click.sendpage(this.pub_id, this.book_id, this.frm_page, localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
        var obj1 = JSON.parse(data);
        this.pagenotbought = obj1.not_buy_page;
       console.log(this.pagenotbought);
      })
     
     }
    localStorage.setItem('address','/user/payment');
    console.log("payment");
    // this.buy.buybook(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), v1, v2, v3, v4, v5,this.whole_book).subscribe(data => {})
    // this.load=false;
    
  }
show_message(){
  this.loading=true;
  if(this.to_page > 0){
  this.buy.buybook(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),  this.book_name, this.book_id, this.pub_id, this.frm_page,this.to_page,this.full_book).subscribe(data => {
   this.check_response=JSON.parse(data);
   if(this.check_response.success==1){
    // localStorage.removeItem('book_name');
    // localStorage.removeItem('Pub_id');
    // localStorage.removeItem('frm');
    // localStorage.removeItem('to');
    // localStorage.removeItem('whole_book');
    localStorage.setItem('book_Index',this.book_id)
    // this.x = document.getElementById("snackbar");
    // this.x.className = "show";
    // setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
    // setTimeout(()=>{ 
   this.loading=false;
   this.toastr.successToastr('Payment Successful!!','');
   setTimeout(()=>{ 
   this.router.navigate(['user/purchaselist']).then(()=>{
    location.reload();
  })}, 3000); 
   }
   else{
     this.loading=false;
   this.toastr.errorToastr('Something went wrong! please try again later','')
   }

  },error=>{
    this.loading=false;
   this.toastr.errorToastr('Something went wrong! please try again later','');
  })
  }
  else{
   this.buy.buybook(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), this.book_name,this.book_id, this.pub_id, this.frm_page,this.to_page,this.full_book).subscribe(dataonbuymodal => {
      this.check_response=JSON.parse(dataonbuymodal);
      if(this.check_response.success==1){
        localStorage.setItem('book_Index',this.book_id);
        this.loading=false;
        this.toastr.successToastr('Payment Successful!!','');
        setTimeout(()=>{ 
        this.router.navigate(['user/purchaselist']).then(()=>{
          location.reload();
        })}, 3000); 
      }
      else{
        this.loading=false;
      this.toastr.errorToastr('Something went wrong! please try again later','')
      }
   
     },error=>{
       this.loading=false;
      this.toastr.errorToastr('Something went wrong! please try again later','');
     })
  }
  
}
}
