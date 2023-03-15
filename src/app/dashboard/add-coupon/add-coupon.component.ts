import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { pluck } from "rxjs/operators";
import { PublisherbookserviceService } from "src/app/publisherbookservice.service";
import { CouponServiceService } from "../coupon-code/coupon-service.service";
// import from "../../../assets/adminassets/js/select2dropdown.js";
// import select2 from '../../../assets/adminassets/js/select2dropdown.js';
// declare var select2:any;
declare var $: any;
declare var XLSX : any;
@Component({
  selector: "app-add-coupon",
  templateUrl: "./add-coupon.component.html",
  styleUrls: [
    "./add-coupon.component.css",
    "../../../assets/adminassets/css/font-awesome.css",
    "../../../assets/adminassets/css/apps.css",
    "../../../assets/adminassets/css/apps_inner.css",
    "../../../assets/adminassets/css/res.css",
    // "../../../assets/adminassets/css/select2.css",
    
  ],
})
export class AddCouponComponent implements OnInit {

  @ViewChild('LogForm') logFrom!:NgForm

  total_coupon:any=0
  flag: any = "B";
  checked = true;
  indeterminate = false;
  ActivelBooks: any = [];
  allBooks: any = [];
  load: boolean = false;
  counterstart:any;
  counterend:any;
  searchTxt: any;
  view_coupon:boolean=true;
  constructor(
    private router:Router,
    private toastr: ToastrManager,
    private g_coupon: CouponServiceService,
    private allbooks: PublisherbookserviceService
  ) {}
  checkResponse: any = "";
  // bk_name:any;
  book_id:any;
  frm_date:any;
  to_date:any;
  ngOnInit(): void {}


  submit(v: any) {
    console.log(v.form.value,v.form.value.no_of_coupon);
    this.book_id='';
    this.frm_date='';
    this.to_date='';
    this.load = true;
    this.total_coupon=0;
    if (this.flag == "B") {
      if (v.form.value.startDate > v.form.value.endDate) {
        this.load = false;
        this.toastr.errorToastr("Please provide valid coupon date range", "");
      } else if (v.form.value.bookstartDate > v.form.value.bookendDate) {
        this.load = false;
        this.toastr.errorToastr("Please provide valid book date range", "");
      } else {
        var totalcount=50;
        this.counterstart=1;
        this.counterend=50;
        if(v.form.value.no_of_coupon<=totalcount){
          this.g_coupon
          .generateCoupon(
            v.form.value.bookname,
            v.form.value.no_of_coupon,
            v.form.value.startDate,
            v.form.value.endDate,
            v.form.value.bookstartDate,
            v.form.value.bookendDate,
            "",
            this.flag,
            this.counterstart,
           v.form.value.no_of_coupon
          )
          .subscribe(
            (data) => {
              console.log(data);
              this.checkResponse = data;
              if (this.checkResponse.success == 1) {
                this.total_coupon=0;
                this.load = false;
                // this.toastr.successToastr(
                //   "Coupon code has been generated successfully",
                //   ""
                // );
                this.book_id=this.checkResponse.message.temp_book_id;
                this.frm_date=this.checkResponse.message.coupon_from_date;
                this.to_date=this.checkResponse.message.coupon_to_date;
                this.view_coupon=false;
                this.logFrom.reset()
              } else {
                this.load = false;
                this.toastr.errorToastr(
                  "Something went wrong! please try again later",
                  ""
                );
              }
            },
            (error) => {
              this.load = false;
              this.toastr.errorToastr(
                "Something went wrong! please try again later",
                ""
              );
            }
          );
        }else{
           this.total_coupon= v.form.value.no_of_coupon;
          this.splitCoupon(v.form.value.bookname,
            v.form.value.no_of_coupon,
            v.form.value.startDate,
            v.form.value.endDate,
            v.form.value.bookstartDate,
            v.form.value.bookendDate,
            this.counterstart,
            this.counterend);
          // console.log('reCall');
        }
      }
    } else {
      if (v.form.value.startDate > v.form.value.endDate) {
        this.load = false;
        this.toastr.errorToastr("Please provide valid coupon date range", "");
      } else {
        this.g_coupon
          .generateCoupon(
            "",
            "",
            v.form.value.StartDate,
            v.form.value.EndDate,
            "",
            "",
            v.form.value.creaditammount,
            this.flag,
            '',''
          )
          .subscribe(
            (data) => {
              console.log(data);
              this.checkResponse = data;
              if (this.checkResponse.success == 1) {
                this.load = false;
                // this.toastr.successToastr(
                //   "Coupon code has been generated successfully",
                //   ""
                // );
                this.book_id='G';
                this.frm_date=this.checkResponse.message.coupon_from_date;
                this.to_date=this.checkResponse.message.coupon_to_date;
                this.view_coupon=false;
                this.logFrom.reset()
              } else {
                this.load = false;
                this.toastr.errorToastr(
                  "Something went wrong! please try again later",
                  ""
                );
              }
            },
            (error) => {
              this.load = false;
              this.toastr.errorToastr(
                "Something went wrong! please try again later",
                ""
              );
            }
          );
      }
    }
  }
  checkmode(event: any) {
    this.flag = event.value;
  }
  getToday() {
    var dt = new Date();
    // console.log(dt.toISOString().substring(0, 10));
    return dt.toISOString().substring(0, 10);
  }
  get_start_date(date:any){
     console.log(date);
     this.logFrom.control.patchValue({bookstartDate:date})
  }
  
  get_end_date(date:any){
    console.log(date);
    
    this.logFrom.control.patchValue({bookendDate:date}) 
   } 
  splitCoupon(bk_name:any,no_of_coupon:any,start_date:any,to_date:any,bk_startDate:any,bk_toDate:any,counterstart:any,counterend:any,temp_book_id:any | undefined = ''){ 
    this.g_coupon
          .generateCoupon(
           bk_name,
           no_of_coupon,
           start_date,
           to_date,
           bk_startDate,
           bk_toDate,
            "",
            this.flag,
            counterstart,
            counterend,
            temp_book_id
          )
          .subscribe(
            (data) => {
              console.log(data);
              this.checkResponse = data;
              if (this.checkResponse.success == 1) {
                if(this.checkResponse.countend!=no_of_coupon && this.checkResponse.countend<=no_of_coupon){
                  this.counterstart = Number(this.checkResponse.countend) + 1;
                  this.counterend = Number(this.checkResponse.countend) + 50;
                   console.log( "After: "+this.counterend, Number(no_of_coupon))
                  if(this.counterend > Number(no_of_coupon)){
                    this.counterend = Number(no_of_coupon);
                    this.splitCoupon(bk_name,
                      no_of_coupon,
                      start_date,
                      to_date,
                      bk_startDate,bk_toDate,
                      this.counterstart,
                      this.counterend,
                      this.checkResponse.temp_book_id);
                  }else{
                    this.splitCoupon(bk_name,
                      no_of_coupon,
                      start_date,
                      to_date,
                      bk_startDate,bk_toDate,
                      this.counterstart,
                      this.counterend,
                      this.checkResponse.temp_book_id);
                  }
                }else{
                  //upload complete message
                  this.total_coupon=0;
                  this.load=false;
                  this.view_coupon=false;
                  this.book_id=this.checkResponse.message.temp_book_id;
                  this.frm_date=this.checkResponse.message.coupon_from_date;
                  this.to_date=this.checkResponse.message.coupon_to_date;
                  this.logFrom.reset()
                }
              } else {
                this.load = false;
                this.toastr.errorToastr(
                  "Something went wrong! please try again later",
                  ""
                );
              }
            },
            (error) => {
              this.load = false;
              this.toastr.errorToastr(
                "Something went wrong! please try again later",
                ""
              );
            }
          );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ActivelBooks.filter = filterValue.trim().toLowerCase();
  }

  clickToPreview(){
    this.router.navigate(['/admin/couponCode'],
    {queryParams:
      this.flag == 'B' ? {
      flag: this.flag,
      start_date:this.frm_date,
      end_date: this.to_date,
      temp_book_id: this.book_id
    } : {
      flag: this.flag,
      start_date:this.frm_date,
      end_date: this.to_date
    }
  
  });
  }
}
