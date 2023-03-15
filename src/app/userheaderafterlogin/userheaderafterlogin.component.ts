import { Component, OnDestroy, OnInit,Input, ViewChild,Inject } from '@angular/core';
import { UserdetailsService } from '../user-profile/userdetails.service';
import { UserlogoutService } from '../userlogout.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { UserAllbooksComponent } from '../user-profile/user-allbooks/user-allbooks.component';
import { AutocompletesearchService } from '../user-profile/autocompletesearch.service';
import { SearchinitService } from './searchinit.service';
import { UserbookdetailspageComponent } from '../user-profile/userbookdetailspage/userbookdetailspage.component';
import { NotificatiobelliconService } from './notificatiobellicon.service';
import { interval, observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ChangepasswordserveService } from '../site-header/changepasswordserve.service';
import { ShowcartService } from '../user-profile/cartpage/showcart.service';
import { DashboardserviceService } from '../user-profile/dash/dashboardservice.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityTService } from '../Utility/utility-t.service';
import { AlertDialogComponent } from '../user-profile/alert-dialog/alert-dialog.component';
import { environment } from 'src/environments/environment';
import { NotificationserveService } from '../user-profile/notifications/notificationserve.service';
// import { ConsoleReporter } from 'jasmine';
// import { interval } from 'rxjs';
declare var showprofile: any;
declare var $:any;
@Component({
  selector: 'app-userheaderafterlogin',
  templateUrl: './userheaderafterlogin.component.html',
  styleUrls: ['./userheaderafterlogin.component.css',
    '../../assets/cssfiles/bootstrap.css',
    '../../assets/cssfiles/font-awesome.css',
    '../../assets/chosen/chosen.css',
    '../../assets/cssfiles/apps.css',
    '../../assets/cssfiles/res.css',
    '../../assets/cssfiles/apps_inner.css']
})
export class UserheaderafterloginComponent implements OnInit, OnDestroy{
  bk_url= environment.book_url;
  Coupon_Form!:FormGroup;
  button_div: any;
  hide:boolean = true;
  hide1:boolean = true;
  hide2:boolean=true;
  constructor(private utiliT:UtilityTService, private fb:FormBuilder, public dialog: MatDialog, private userlogout:UserlogoutService,private dash_data:DashboardserviceService,private cats:NotificationserveService, private show1:ShowcartService, public toastr: ToastrManager,private cookie:CookieService,private ch:ChangepasswordserveService, private det: UserbookdetailspageComponent, private srcchinit: SearchinitService, private auto: AutocompletesearchService, private all: UserAllbooksComponent, private router: Router, private uslg: UserlogoutService, private details: UserdetailsService, private notification:NotificatiobelliconService) { 
    this.Coupon_Form = this.fb.group({
      otp1:['',Validators.required],
      otp2:['',Validators.required],
      otp3:['',Validators.required],
      otp4:['',Validators.required],
      otp5:['',Validators.required],
      otp6:['',Validators.required],
    }) 
    this.utiliT.sendShowHideContactButton(true);
  }
  profile: any;
  @Input() c: any;
  chpdata:any;
  x:any;
  search_item: any;
  obj: any;
  inpt_pass:any;
  inpt_con:any;
  // obj2:any;
  old_not:any;
  new_not:any;
  bookname: any;
  placeholder: string = 'Search via book,author,publisher,ISBN';
  bookname1: any;
  keyword = "book_name";
  counter: boolean = true;
  msg:any='published'
   show_notif=false;
   userdata2: any;
  id:any;
  user_type:any;
  remember_token:any;
  user:any;
  let_count:any='';
  userdata1:any=[];
  count_dif:any;
  input_old_pass:any;
  mymodal_changepass:any;
  userData:any;
  showNotification:any=[];
  name:any;
  check_response:any='';
  load:boolean=false;
  ngOnInit(): void {
    if(this.c==0||this.c==undefined||this.c==''||this.c==null)
    this.getcartvalue(); 
    this.inpt_pass=document.getElementById("pss");
    this.inpt_con=document.getElementById("con_pss");
    this.input_old_pass=document.getElementById('old_pss');
      this.id=localStorage.getItem('u-id');
      this.user_type=localStorage.getItem('user-type_user');
      this.remember_token=localStorage.getItem('remember_token');
      this.notification.count(this.id,this.user_type,this.remember_token).subscribe(res=>{
         this.userdata2=JSON.parse(res);
         this.let_count=this.userdata2.Notification_count; 
         if(this.let_count == 0 || localStorage.getItem('address') =='/user/notifications'){
              this.counter=true;
          }
          else{
            this.counter=false;
            this.old_not=this.let_count;
          }
      });
      this.user=interval(20000).subscribe(val =>{
        this.notification.count(this.id,this.user_type,this.remember_token).subscribe(res=>{ 
           this.userdata2=JSON.parse(res);
           this.let_count=this.userdata2.Notification_count.toString();
           if(this.let_count== 0 || localStorage.getItem('address')=='/user/notifications'){
                this.counter=true;
            }
            else{
              this.counter=false;
              this.new_not=this.let_count;
              if(this.new_not!=this.old_not)
              {
               this.count_dif=Number(this.new_not)-Number(this.old_not);
               this.toastr.warningToastr(this.let_count+" Unread",'You have new notifications');
               this.old_not=this.new_not;
              } 
            }
        });
      });
    this.srcchinit.getdet(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
      this.obj = JSON.parse(data);
      this.bookname = this.obj.message;
      this.bookname1 = this.obj.message;
    });
    this.details.get_Details(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
      var obj = JSON.parse(data);
      this.profile = obj.message[0].image_url;
      this.name=obj.message[0].name;
       if(obj.success==0&&obj.message=='Logout')
     { this.userlogout.logout_user();}
    });
  }
  ngAfterContentInit() {
    if (localStorage.getItem('search-item') == 'null' || localStorage.getItem('search-item') == 'undefined' || localStorage.getItem('search-item') == '')
      this.search_item = '';
    else
      this.search_item = localStorage.getItem('search-item');  
  }
  show() { showprofile(); }
  onChangeSearch(event: any) {
    localStorage.setItem('search-item', event);
    function checkKey(val: any) {
      return (val.book_name.toUpperCase()).includes(event.toUpperCase()) || (val.isbn_no.toUpperCase()).includes(event.toUpperCase()) || (val.author_name.toUpperCase()).includes(event.toUpperCase()) || (val.publisher_name.toUpperCase()).includes(event.toUpperCase());
    }
    this.bookname = this.bookname1!=undefined ? this.bookname1.filter(checkKey) : '';
  }
  onFocused(event: any) { }
  selectEvent(event: any) {
    localStorage.setItem('search-item', event.book_name);
    localStorage.setItem('user_book_id', event.book_id);
    localStorage.setItem('user_pub_id', event.publisher_id);
    this.det.ngOnInit();
    this.router.navigate(['/user/bookdetails']);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data:{_b_id:'',_pub_id:'',_flag:'L',_type:'U'}

    });

    dialogRef.afterClosed().subscribe((result:any) => {
      // console.log('The dialog was closed');
    });
  }
  show_result() {
    this.all.ngOnInit();
    this.router.navigate(['/user/user_allbooks']);
  }
  logout() {
    this.uslg.logout_user();
  }
  count_it() {
    $('#notification').show();
    this.counter = true;
    this.cats.getData(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe((data:any) => {
       this.userData =JSON.parse(data);
       this.userData=this.userData.message
       if(this.let_count)
       this.showNotification=this.userData.slice(0,this.let_count)
       else
       this.showNotification=this.userData.slice(0,3)
         this.show_notif=true;
      })


  }
  ngOnDestroy() {
    this.user.unsubscribe();
  }
  go(v:any){
    if(v!=0)
     this.router.navigate(['/user/cart'])
    else 
     this.myFunction();  
  }
  myFunction() {
    // Get the snackbar DIV
    this.x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    this.x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
  }
    getcartvalue(){
      this.show1.getcart(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data=>{this.userdata1=JSON.parse(data); 
        if(this.userdata1.success=='1')
        this.c=this.userdata1.message.length;
        else
        this.c=0;
      })
    }

    show_hide_password(){
    if(this.input_old_pass.type=='text'){
      this.input_old_pass.type='password';
    }
    else{
      this.input_old_pass.type='text';
    }
    }
    omit_special_char(event:any){
      var regex = new RegExp("^[a-zA-Z0-9 ]+$");
      var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (regex.test(str)) {return true}
      event.preventDefault();
      return false;
      
    }
    setfocus(event:any,mode:any,i:any){
      if(event.keyCode!=8){ 
        var regex = new RegExp("^[a-zA-Z0-9 ]+$");
        var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (regex.test(str)) {$('#'+mode).focus();}
        else{}
      }
     else if(event.keyCode==8 && i > 1){$('#OTP'+(i-1)).focus();}
   }
   get f(){return this.Coupon_Form.controls;}
   submitcounpon(){
     var couponCode=this.f.otp1.value+''+this.f.otp2.value+''+this.f.otp3.value+''+this.f.otp4.value+''+this.f.otp5.value+''+this.f.otp6.value;
      this.load=true;
      this.utiliT.validateCoupon(couponCode,'R').then(res => {
        // console.log(res)
      if(res==1){
      localStorage.setItem('book_Index',this.check_response.book_id);
      this.load=false;
      // this.toastr.successToastr('Coupon Code has been applied successfully','');
      this.utiliT.showToastr('Coupon Code has been applied successfully','S');
      $('#close').click();
      $('.modal-backdrop').remove();
      $('body').removeClass( "modal-open" );
      setTimeout(()=>{
        this.router.navigate(['/user/purchaselist']).then(()=>{
          location.reload();
        });
      },1000)
      }
      else if(res==2){
         this.resetForm('Coupon code has already been used');
      }
      else if(res==3){
        this.resetForm('Book already been purchased');
      }
      else{
        this.resetForm('Invalid coupon code');
      }
      });

       
    //  this.dash_data.applyCoupon(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),couponCode.toUpperCase()).subscribe(data=>{
    //   this.check_response=data;
    //   if(this.check_response.success==1){
    //   localStorage.setItem('book_Index',this.check_response.book_id);
    //   this.load=false;
    //   this.toastr.successToastr('Coupon Code has been applied successfully','');
    //   $('#close').click();
    //   $('.modal-backdrop').remove();
    //   $('body').removeClass( "modal-open" );
    //   setTimeout(()=>{
    //     this.router.navigate(['/user/purchaselist']).then(()=>{
    //       location.reload();
    //     });
    //   },1000)
    //   }
    //   else if(this.check_response.success==2){
    //      this.resetForm('Coupon code has already been used');
    //   }
    //   else{
    //     this.resetForm('Invalid coupon code');
    //   }
    // },error=>{
    //   this.resetForm('Invalid coupon code');
    // })

    
   }
   openModal(){
    this.Coupon_Form.patchValue({
      otp1:'',
      otp2:'',
      otp3:'',
      otp4:'',
      otp5:'',
      otp6:''
    })
   }
   resetForm(msg:string){
    this.Coupon_Form.patchValue({
      otp1:'',
      otp2:'',
      otp3:'',
      otp4:'',
      otp5:'',
      otp6:''
    })
    this.load=false;
    // this.toastr.errorToastr(msg,'');
    this.utiliT.showToastr(msg,'E');
  }
}
// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: '../user-profile/alert-dialog/alert-dialog.component.html',
// })
// export class DialogOverviewExampleDialog {
//   constructor(private uslg: UserlogoutService,
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//   ) {}
//   logOutUser(){
//     this.dialogRef.close();
//     this.uslg.logout_user();

//   }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
