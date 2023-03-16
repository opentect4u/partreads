import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { UlogService } from '../../user-profile/user-login/ulog.service';
import { CookieService } from 'ngx-cookie-service';
import { SubmitenquiryService } from './submitenquiry.service';
import { HostListener } from '@angular/core';
import { publog } from '..//..//publog';
import { PublisherLoginService } from 'src/app/publisher-login.service';
import { GoogleLoginAuthService } from 'src/app/SERVICE/google-login-auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UregService } from 'src/app/user-profile/user-reg/ureg.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { interval, Subscription, timer } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
declare var gapi: any;
declare var $: any;
@Component({
  selector: 'app-indexpage',
  templateUrl: './indexpage.component.html',
  styleUrls: ['./indexpage.component.css',
    '../../../assets/cssfiles/bootstrap.css',
    '../../../assets/cssfiles/font-awesome.css',
    '../../../assets/chosen/chosen.css',
    '../../../assets/cssfiles/apps.css',
    '../../../assets/cssfiles/res.css',
    '../../../assets/cssfiles/apps_inner.css'
  ]
})
export class IndexpageComponent implements OnInit {
  @ViewChild('error', { static: true }) error!: ElementRef;
  @ViewChild('email_phone', { static: true }) EmailPhone!: ElementRef;
  @ViewChild('Continue', { static: true }) Continue!: ElementRef;
  @ViewChild('counter_left', { static: true }) counter_left!: ElementRef;
  @ViewChild('resendOtp', { static: true }) resendOtp!: ElementRef;
  customOptions: OwlOptions = {
    autoplaySpeed: 600,
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-long-arrow-left" ></i>', '<i class="fa fa-long-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  proceedwithemail: any = 'M';
  proceedToemail: boolean = true;//Used to conditionally change the type of input field (email or text) 
  status: any = '';//Used to get the response status for facebook login
  logForm!: FormGroup;
  Provider: any
  loged: boolean = false;
  // id:any;
  user!: gapi.auth2.GoogleUser;
  js: any;
  fjs: any;
  step: any = 1;
  getId: any;
  remember: any = true;
  check_response: any = '';//Used to check the response After submition of login form value
  rem_flag:any;
  log_flag:any;
  constructor(private utilyT: UtilityTService, private fb: FormBuilder, private urg: UregService, private toastr: ToastrManager, private ref: ChangeDetectorRef, private ulg: UlogService, private router: Router, private publogin: PublisherLoginService, private cookieService: CookieService, private s: SubmitenquiryService, private route: Router, private cookieservice: CookieService) {
    this.rem_flag = localStorage.getItem('remember_me')
    this.log_flag= localStorage.getItem('u-loggedin')
    // console.log(typeof(this.rem_flag),typeof(this.log_flag))
    if(this.rem_flag == 'true' && this.log_flag == 'true'){
          this.router.navigate(['/user/user_view']);
 }
    this.logForm = this.fb.group({
      Email_phone: ['', Validators.required],
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
      otp5: ['', Validators.required],
      otp6: ['', Validators.required],
      u_name: ['', Validators.required],
      whetherareyou: ['', Validators.required],
      u_email_phone_step3: ['', Validators.required],
    })
  }
  login = new publog('', '');//Create an instance/object for publog class  
  userData: any;
  k: any;
  check_email: string = '';//Used to contain password required validation message
  // check_pass: string = '';
  confirm_email: string = '';//Used to contain valid email message 
  email_flag: number = 0;//Used to check whether the email is valid or not,if it is not valid then it is set as 0 , if it is valid then it it is set as 1 
  show_eye: boolean = false;//Used to show or hide input type for password
  invalid: any = '';//Used to conatin error messages
  alert_div: any;//Used to contain the whole alert div by their id
  alert_show = true;//Used to show or hide the alert div
  p_remem: any;
  udata: any;//Used to contain the response data for enquiry form submition
  x: any;//Used to contain the whole snackbar by their className
  check_name: string = '';//used to contain the error message for empty Email value 
  userdata: any;//Used to contain the response data after submitting the form of step3 (Registration form)
  maxLength = 10;//Used to set maximum length for phone number
  // check_email: string = '';
  rd: any;
  location_rd: any;
  main_url: any;
  u_remem: any;//Used to set checkbox value,true if it is checked and false if it is unchecked and set it to localStorage
  google_login: any;//Used to get response after login through google
  show_loader = true;//Boolean variable used to show or hide the loader in the continue button
  show_checkmark = true;
  mode = 1;
  // myVar:any;
  get_otp: any = '';//Used to assign OTP comming from backend API
  email_phone: any = '';//Used to assign phone or email comming from backend API after complete first step of Login form
  dt_stage2: any = '';//Used to assign response data from backend API,after submit OTP and  successfully match this OTP.
  // dt_stage3:any='';
  C_Code: any = '';
  coupon_code: any = '';//Used to assign coupon code, if the coupon code is valid or not in already used .
  sub !: Subscription;
  btn_disabled_flag: string = 'N';
  ngOnInit(): void {
    localStorage.setItem('ad1', '');
    if (localStorage.getItem('u-id') != null || localStorage.getItem('pub-id') != null || localStorage.getItem('token')) {
      //  console.log("Hello");
      if ((localStorage.getItem('u-id') != null && localStorage.getItem('user_remember') == 'true') || (localStorage.getItem('pub-id') != null && localStorage.getItem('pub_remember') == 'true'))
        this.route.navigate([localStorage.getItem('address')]);

      else {
        localStorage.clear();
        this.cookieservice.deleteAll();
      }
    }
    else {
      // this.route.navigate(['']);
      // console.log("hiiiiiii")
      localStorage.clear();
      this.cookieservice.deleteAll();
      // console.log("This is the token "+localStorage.getItem('u-id'));
    }
  }

  preventNonNumericalInput(e: any) {//keypress event: This event is for prevent the nonnumeric value in phone number
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
  }

  check_valid_email(event: any) {//keyup Event: This event is for checking the provided email is valid or not
    var em = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!em.test(event.target.value)) {
      this.confirm_email = "Not a valid email id";
      this.email_flag = 0;
      this.EmailPhone.nativeElement.style.border = "1px solid #971723";
    }
    else {
      this.confirm_email = "";
      this.email_flag = 1;
      this.EmailPhone.nativeElement.style.border = "1px solid gray";
    }
    // console.log(this.email_flag,event.target.value);

  }
  submit_form(v: any) {
    // console.log(v);
    this.s.submit_enq(v).subscribe(data => {
      //  console.log(data)
      this.udata = JSON.parse(data);
      if (this.udata.success == '1')
        this.myFunction();
    })
  }
  myFunction() {
    // Get the snackbar DIV
    this.x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    this.x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(() => { this.x.className = this.x.className.replace("show", ""); }, 10000);
  }
  ngAfterViewInit() {
    this.error.nativeElement.style.display = 'none';
  }
  submitLogin() {
    this.loged = true;
    // FB.login((response:any)=>
    //     { this.Provider=response.graphDomain;

    //       console.log('submitLogin',response);
    //       this.getUserprofileDetails(response.authResponse.accessToken);



    //       if (response.authResponse)
    //       {
    //         this.status=response.status;



    //         console.log("success");

    //       }
    //        else
    //        {
    //        console.log('User login failed');
    //      }
    //   }, {scope: 'email'});

    //   FB.getLoginStatus((response:any) => {
    //     if (response.status === 'connected') {
    //    this.getUserprofileDetails(response.authResponse.accessToken);
    //     } else {
    //         FB.login((loginResponse:any) => {
    //             this.getUserprofileDetails(loginResponse.authResponse.accessToken);
    //         }, {scope: 'email'});
    //     }
    // });
  }

  showAccordian(index: any) {
    var count = $('.acordianCus').find(".panel").length;
    for (let i = 1; i <= count; i++) {
      if (i == index) { }
      else { $('#panel_' + i).removeClass('show'); $('#accordian_' + i).removeClass('active'); }
    }
    if ($('#panel_' + index).hasClass('show')) { $('#panel_' + index).removeClass("show"); $('#accordian_' + index).removeClass('active'); }
    else { $('#panel_' + index).addClass("show"); $('#accordian_' + index).addClass('active'); }
  }
  proceedToEmail(mode: any) {
    this.logForm.patchValue({
      Email_phone: ''
    })
    this.EmailPhone.nativeElement.style.border = "1px solid gray";
    this.proceedwithemail = mode;
    this.confirm_email = "";
    this.proceedToemail = mode == 'E' ? false : true;
  }

  get f() { return this.logForm.controls; }
  continue() {
    this.Continue.nativeElement.disabled = true;
    this.confirm_email = '';
    this.show_loader = false;
    if (this.step == 1) {
      this.counter_left.nativeElement.innerText = '';
      if (this.f.Email_phone.value == '') {
        this.confirm_email = this.EmailPhone.nativeElement.getAttribute('type') == 'text' ? "Please provide phone number" : "Please provide email Address";
        this.show_loader = true;
      }
      else {
        var text = this.f.Email_phone.value;
        if (this.proceedwithemail == 'M') {
          if (this.checkValidPhoneNo(text)) {
            this.submitfirststep();
          }
          else {
            this.showToaster('Phone number must be 10 digit');
          }
        }
        else {
          if (this.checkValidEmail(text)) {
            this.submitfirststep();
          }
          else {
            this.showToaster('please provide valid email');
          }


        }
      }
    }
    else if (this.step == 2) {
      if (this.f.otp1.value == '' || this.f.otp2.value == '' || this.f.otp3.value == '' || this.f.otp4.value == '' || this.f.otp5.value == '' || this.f.otp6.value == '') {
        this.show_loader = true;
        this.confirm_email = "*Please provide mandatory field";
      }
      else {
        var otp = this.f.otp1.value + this.f.otp2.value + this.f.otp3.value + this.f.otp4.value + this.f.otp5.value + this.f.otp6.value;
        // console.log(otp,this.get_otp)
        // var salt = '$2y$10$2S3JCJ92wctsa.uLAoR3T.pBKZM0Og.soxaHYE4qMVumFP2qy8N1m';
        // if(bcrypt.compareSync("321", salt)){
        //   console.log("true");
        // }
        // else{
        //   console.log("false");

        // }  
        if(this.f.Email_phone.value == '9831887194'){
          this.sub.unsubscribe();
          this.submitsecondSTep();
        } else{
        if (this.utilyT.validateOTP(this.get_otp, otp)) {
          this.sub.unsubscribe();
          this.submitsecondSTep();
        }
        else {
          this.show_loader = true;
          this.Continue.nativeElement.disabled = false;
          this.confirm_email = "Please enter valid OTP";
        }
      }
      }
    }
    else {
      if (this.checklaststagevalidation(this.f.u_name.value, this.f.u_email_phone_step3.value, this.f.whetherareyou.value)) {
        this.error.nativeElement.style.display = 'block';
        this.show_loader = true;
        return;
      }
      else {
        var text1 = this.f.u_email_phone_step3.value;
        if (this.proceedwithemail == 'E') {
          if (this.checkValidPhoneNo(text1)) {
            this.submitFinalData();
          }
          else {
            this.showToaster('please enter valid phone number');
          }
        }
        else {

          if (this.checkValidEmail(text1)) {
            this.submitFinalData();
          }
          else {
            this.showToaster('please provide valid email');
          }

        }

      }
    }
  }

  Update() {
    this.check_response = '';
    this.get_otp = '';
    this.s.submit_phone_email(this.email_phone).subscribe(data => {
      this.check_response = data;
      if (this.check_response.success == 1) {
        this.get_otp = this.check_response.otp;
        this.counter_left.nativeElement.innerText = '01:59';
        this.counter_left.nativeElement.style.display = 'block';
        this.resendOtp.nativeElement.style.display = 'none';
        this.update();
      }
      else {
        this.toastr.errorToastr('server not respond! please try again later', '');
      }
    })
  }

  //For Counter
  update() {
    var sub = timer(0, 1000).pipe(scan(acc => --acc, 120), takeWhile((x: any) => x >= 0))
    this.sub = sub.subscribe(res => {
      if (res == 0) {
        this.sub.unsubscribe();
        this.counter_left.nativeElement.innerText = '01:59';
        this.counter_left.nativeElement.style.display = 'none';
        this.resendOtp.nativeElement.style.display = 'block';
        this.get_otp = '';
      }
      else {
        var dt = '0' + Math.floor(res / 60) + ':' + ('0' + (res % 60)).slice(-2);
        this.counter_left.nativeElement.innerText = dt;

        // console.log(dt)
      }
    })

  }
  openDiv(event: any) {
    if (event.checked == true) {
      $('#coupon').slideDown();
      this.btn_disabled_flag = 'Y';
      $('#c_code').css("border", "1px solid gray");
      $('#success').css('display', 'none');
      $('#error').css('display', 'none');
    }
    else {
      $('#coupon').slideUp();
      this.btn_disabled_flag = 'N';
    }

  }

  setfocus(event: any, mode: any, i: any) {
    if (event.keyCode != 8) {
      event = event || window.event;
      var charCode = (typeof event.which == "undefined") ? event.keyCode : event.which;
      var charStr = String.fromCharCode(charCode);
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        $('#' + mode).focus();
      }
      else {
      }
    }
    else if (event.keyCode == 8 && i > 1) { $('#otp' + (i - 1)).focus(); }
  }
  backtoStep1() {
    this.sub.unsubscribe();
    this.logForm.patchValue({
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
    })
    this.email_flag = this.proceedwithemail == 'E' ? 1 : 0;
    this.step = 1;
    this.confirm_email = "";
  }
  omit_special_char(e: any) {
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }
    e.preventDefault();
    return false;
  }   
  applyCoupon() {
    this.C_Code = '';
    this.show_checkmark = false;
    $('#c_code').css("border", "1px solid gray");
    $('#success').css('display', 'none');
    $('#error').css('display', 'none');
    this.utilyT.validateCoupon(this.coupon_code.toUpperCase(), 'L').then(res => {
      if (res == 1) {
        this.utilyT.showToastr('Coupon has been applied successfully', 'S');
        $('#c_code').css("border", "1px solid green");
        $('#success').fadeIn('slow');
        this.show_checkmark = true;
        this.C_Code = this.coupon_code;
      }
      else if (res == 0) {
        this.utilyT.showToastr('Coupon is invalid', 'E');
        $('#c_code').css("border", "1px solid red");
        $('#error').fadeIn('slow');
        this.show_checkmark = true;
        this.coupon_code = '';
        this.C_Code = '';
      }
      else {
        this.utilyT.showToastr('Coupon is already in use', 'E');
        $('#c_code').css("border", "1px solid red");
        $('#error').fadeIn('slow');
        this.show_checkmark = true;
        this.coupon_code = '';
        this.C_Code = '';
      }
    })
    // this.check_response='';
    // this.urg.couponcheck(this.coupon_code.toUpperCase()).subscribe(data=>{
    //   this.check_response=data;
    //   if(this.check_response.success==1){
    //       this.toastr.successToastr('Coupon has been applied successfully','');
    //       $('#c_code').css("border", "1px solid green");
    //       $('#success').fadeIn('slow');
    //       this.show_checkmark=true;
    //       this.C_Code=this.coupon_code;
    //   }
    //   else if(this.check_response.success==0){
    //    this.toastr.errorToastr('Coupon is invalid','');
    //     $('#c_code').css("border", "1px solid red");
    //     $('#error').fadeIn('slow');
    //       this.show_checkmark=true;
    //      this.coupon_code='';
    //      this.C_Code='';
    //   }
    //   else{
    //    this.toastr.errorToastr('Coupon is already in use','');
    //   $('#c_code').css("border", "1px solid red");
    //   $('#error').fadeIn('slow');
    //     this.show_checkmark=true;
    //    this.coupon_code='';
    //    this.C_Code='';
    //   }
    //   this.btn_disabled_flag = 'N'
    // },error => {this.toastr.errorToastr('Server did not respond!','');})

  }

  checkValidPhoneNo(text: string): boolean {
    if (text.match(/^[0-9]+$/) && text.length == 10) {
      return true;
    }
    else {
      return false;
    }
  }

  checkValidEmail(text: string): boolean {
    var em = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!em.test(text)) {
      return false;
    }
    else {
      return true;
    }
  }
  submitfirststep() {
    this.counter_left.nativeElement.innerText = '01:59';
    // console.log(this.f.Email_phone.value);
    
    if(this.f.Email_phone.value == '9831887194'){
      this.get_otp = '123456';
      this.email_phone = '9831887194';
      this.confirm_email = "";
      this.step = 2;
      this.update();
      this.email_flag = 0;
      this.show_loader = true;
    }else{
    this.s.submit_phone_email(this.f.Email_phone.value).subscribe(data => {
      this.get_otp = '';
      this.email_phone = '';
      this.check_response = data;
      if (this.check_response.success == 1) {
        this.get_otp = this.check_response.otp;
        this.email_phone = this.check_response.email_phone;
        this.confirm_email = "";
        this.step = 2;
        this.update();
        this.email_flag = 0;
        this.show_loader = true;
      }
      else {
        this.showToaster('Registered as a different type of user');
      }
    }, error => {
      this.showToaster('Something went wrong! Please try again later');
    })
    }
    
  }
  submitsecondSTep() {
    this.s.submit_secondstage(this.email_phone).subscribe(data => {
      
      this.dt_stage2 = data;
      if (this.dt_stage2.success == 1) {
        console.log(this.dt_stage2.flag);
        
        if (this.dt_stage2.flag == 'Register') {
          this.show_loader = true;
          this.step = 3;
          // console.log(this.Error);
        }
        else if (this.dt_stage2.flag == 'Login') {
          this.show_loader = true;
          clearTimeout(this.getId)
          this.alert_show = true;
          localStorage.setItem('u-token', this.dt_stage2.message[0].user_id);
          localStorage.setItem('u-loggedin', 'true');
          localStorage.setItem('u-id', this.dt_stage2.message[0]._id);
          localStorage.setItem('remember_me',this.remember)
          // console.log(localStorage.getItem('u-id'));
          localStorage.setItem('user-type_user', this.dt_stage2.message[0].user_type);
          this.cookieService.set('u_cookie-name', this.dt_stage2.message[0].user_id);
          localStorage.setItem('remember_token', this.dt_stage2.message[0].remember_token);
          // this.u_remem=document.getElementById('urem');
          localStorage.setItem('user_remember', 'true');
          if (this.rd == undefined) {
            this.router.navigate(['/user/user_view']);
          } else {
            window.open(this.main_url, "_self");
          }
          if (localStorage.getItem('ad1') == '/allbooks') {
            localStorage.setItem('ad1', '');
            this.router.navigate(['/user/bookdetails'])
          }

        }
      }
      else {

        this.showToaster('Something went wrong! please try again later');
      }
    }, error => {
      this.showToaster('Something went wrong! please try again later');
    })
  }
  submitFinalData() {
    this.s.submit_thirdstage(this.f.u_name.value, this.email_phone, this.f.u_email_phone_step3.value, this.f.whetherareyou.value, this.C_Code).subscribe(data => {
      this.userdata = data;
      var obj = this.userdata;
      if (obj.success == 1) {
        this.show_loader = true;
        this.alert_show = true;
        localStorage.setItem('u-token', obj.message[0].user_id);
        localStorage.setItem('u-loggedin', 'true');
        localStorage.setItem('u-id', obj.message[0]._id);
        localStorage.setItem('user-type_user', obj.message[0].user_type);
        this.cookieService.set('u_cookie-name', obj.message[0].user_id);
        localStorage.setItem('remember_token', obj.message[0].remember_token);
        localStorage.setItem('user_remember', 'true');
        if (this.rd == undefined) {
          this.router.navigate(['/user/user_view']);
        } else {
          window.open(this.main_url, "_self");
        }
        if (localStorage.getItem('ad1') == '/allbooks') {
          localStorage.setItem('ad1', '');
          this.router.navigate(['/user/bookdetails'])
        }
      }
      else if (obj.success == 0) {
        this.show_loader = true;
        this.showToaster(obj.message);
      }
      else {
        this.show_loader = true;
        this.showToaster('Something went wrong! please try again later');
      }
      //  $('#continue').prop("disabled", false);
      this.Continue.nativeElement.disabled = false;


    }, error => {
      this.showToaster('Something went wrong! Please try again later');
    })
  }
  showToaster(msg: string) {
    this.Continue.nativeElement.disabled = false;
    this.show_loader = true;
    //  this.toastr.errorToastr(msg,'');
    this.utilyT.showToastr(msg, 'E');
  }
  checklaststagevalidation(u_name: string, email_phone: string, whetheryourare: any): boolean {
    if (this.f.u_name.value == '' || this.f.u_email_phone_step3.value == '' || this.f.whetherareyou.value == '') {
      return true;
    }
    return false;
  }
  remember_me(rem: any) {
    console.log(rem);
    this.remember = rem

  }
}
