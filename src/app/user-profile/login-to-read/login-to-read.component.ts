import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { UlogService } from './ulog.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UlogService } from '../user-login/ulog.service';
import { GoogleLoginAuthService } from 'src/app/SERVICE/google-login-auth.service';
import { SubmitenquiryService } from 'src/app/publisher-profile/indexpage/submitenquiry.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UregService } from '../user-reg/ureg.service';
declare var $:any;
@Component({
  selector: 'app-login-to-read',
  templateUrl: './login-to-read.component.html',
  styleUrls: ['./login-to-read.component.css',

  // '../../../assets/cssfiles/bootstrap.css',
  // '../../../assets/cssfiles/font-awesome.css',
  // '../../../assets/chosen/chosen.css',
  // '../../../assets/cssfiles/apps.css',
  // '../../../assets/cssfiles/res.css',
  // '../../../assets/cssfiles/apps_inner.css'
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css' 
]
})
export class LoginToReadComponent implements OnInit {
  C_Code:any='';
  step:any=1;
  show_checkmark=true;
  proceedToemail:boolean=true;//Used to conditionally change the type of input field (email or text) 
  maxLength = 10;//Used to set maximum length for phone number
  coupon_code:any='';//Used to assign coupon code, if the coupon code is valid or not in already used .
  show_loader=true;//Boolean variable used to show or hide the loader in the continue button
  email_phone:any='';//Used to assign phone or email comming from backend API after complete first step of Login form
  check_response:any='';//Used to check the response After submition of login form value
  get_otp:any='';//Used to assign OTP comming from backend API
  dt_stage2:any='';//Used to assign response data from backend API,after submit OTP and  successfully match this OTP.
  dt_stage3:any='';
  getId:any;
  check_name: string = '';
  check_email: string = '';
  rd:any;
  location_rd:any;
  main_url:any;
  u_remem:any;
  status:any='';
  yourSuccessMethod:any
  title = 'socialsignin';
  Name:any;
  Email:any;
  Provider:any
  loged:boolean=false;
  id:any;
  user!:gapi.auth2.GoogleUser;
  js:any;
  fjs:any;
  constructor(private urg: UregService,private toastr:ToastrManager,private s:SubmitenquiryService, private ref:ChangeDetectorRef,private googleserve: GoogleLoginAuthService,private activatedRoutes: ActivatedRoute, private ulg: UlogService, private router: Router, private cookieService: CookieService) {
    this.activatedRoutes.queryParams.subscribe(params => {
      this.rd = params['rd_url'];
      //alert(params['rd_url'] );
    });
    this.location_rd=location.href.substring(location.href.indexOf('rd_url'));
    var res = this.location_rd.split("rd_url=");
    this.main_url=res[1];
  
  }
  userdata: any;
  invalid: any = '';
  confirm_email: string = '';
  email_flag: number = 0;
  show_eye: boolean = false;
  alert_show = true;
  alert_div: any;
  google_login:any;
  setLogin=false;
  ngOnInit(): void {
    if('message' in localStorage){
      this.invalid=localStorage.getItem('message');
      this.alert_show=false;
    }
    this.googleserve.observable().subscribe(user=>{
      this.user=user;
    this.google_login=this.user;

      // console.log(this.user);
     
        this.ulg.login_user(this.google_login.su.ev, '','Y').subscribe(data => {
          // console.log(data)
          this.userdata = data;
          /*if(this.userdata.success=='1')
           alert("You have been registered!");*/
          var obj = JSON.parse(this.userdata);
          if (obj.success == '1') {
            this.alert_show = true;
            localStorage.setItem('u-token', this.google_login.su.ev);
            localStorage.setItem('u-loggedin', 'true');
            localStorage.setItem('u-id', obj.message[0]._id);
            // console.log(localStorage.getItem('u-id'));
            localStorage.setItem('user-type_user', obj.message[0].user_type);
            this.cookieService.set('u_cookie-name', this.google_login.su.ev);
            localStorage.setItem('remember_token', obj.message[0].remember_token);
            // this.u_remem=document.getElementById('urem');
            // localStorage.setItem('user_remember',this.u_remem.checked);
            //alert(this.rd);
            if(this.rd==undefined){
            //alert(this.rd);
            this.router.navigate(['/user/user_view']).then(()=>{location.reload()});
            
      // this.ref.detectChanges();

            }else{
            //  alert("else pppp");
            // alert(this.rd);
            window.open(this.main_url,"_self");
            }
            if(localStorage.getItem('ad1')=='/allbooks')
            { localStorage.setItem('ad1','');
              this.router.navigate(['/user/bookdetails'])}
          }
          else {
            this.invalid = obj.message;
            this.alert_show = false;
          }
          this.alert_div = document.getElementById('uploaded');
          this.alert_div.style.display = 'block';
        })
     
      this.ref.detectChanges();
   })
  }


  preventNonNumericalInput(e: any) {//keypress event: This event is for prevent the nonnumeric value in phone number
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
}

checkLength(event:any){
  // console.log(event.target.value.length);
}
proceedToEmail(mode:any){
  $('#email_phone').val('');
  this.confirm_email="";
 this.proceedToemail=mode=='E' ? false : true;
}

backtoStep1(){
  this.step=1;this.confirm_email="";clearTimeout(this.getId);
$('#otp1').val(''); $('#otp2').val(''); $('#otp3').val(''); $('#otp4').val(); $('#otp5').val(); $('#otp6').val();

}

setfocus(event:any,mode:any,i:any){
  // console.log(event.keyCode)
  // if(event.keyCode!=8){$('#'+mode).focus();}
  if(event.keyCode!=8){
    event = event || window.event;
    var charCode = (typeof event.which == "undefined") ? event.keyCode : event.which;
    var charStr = String.fromCharCode(charCode);
    // if (!charStr.match(/^[0-9]+$/))event.preventDefault(); 
    // else $('#'+mode).focus();
    if((event.keyCode>= 48 && event.keyCode<=57) || (event.keyCode>= 96 && event.keyCode<=105)){
      $('#'+mode).focus();
      // console.log('success')
    }
    else{

    }
    
    // $('#'+mode).focus();
  }
  else if(event.keyCode==8 && i > 1){$('#otp'+(i-1)).focus();}
}

// preventNonNumericalInput(e: any) {//keypress event: This event is for prevent the nonnumeric value in phone number
//   e = e || window.event;
//   var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
//   var charStr = String.fromCharCode(charCode);

//   if (!charStr.match(/^[0-9]+$/))
//     e.preventDefault();
// }

Update(){
  // setTimeout(()=>{},1000)
  // console.log("resend",this.email_phone);
  this.check_response='';
  this.get_otp='';
  this.s.submit_phone_email(this.email_phone).subscribe(data=>{
    this.check_response=data;
    if(this.check_response.success==1){
      this.get_otp=this.check_response.otp;
      clearTimeout(this.getId)
      $('#counter_left').text('01:59');
      $('#counter_left').show();
      $('#resendOtp').hide();
      this.update();
    }
    else{
      this.toastr.errorToastr('Something went wrong! please try again later','');
    }
  })
}

update(){
  var myTime =$('#counter_left').text();
  var ss = myTime.split(":");
  // console.log("SS:" +ss);
  var dt = new Date();
  dt.setHours(0);
  dt.setMinutes(ss[0]);
  dt.setSeconds(ss[1]);
  // console.log("DT:" +dt);
  var dt2 = new Date(dt.valueOf() - 1000);
  var temp = dt2.toTimeString().split(" ");
  var ts = temp[0].split(":");
  $('#counter_left').text(ts[1]+":"+ts[2]);
  if(ts[1]=='00' && ts[2]=='00'){
  $('#counter_left').hide();
  $('#resendOtp').show();
  $('#counter_left').text('01:59');
  this.get_otp='';
  }
  else{
   this.getId=setTimeout(() => {
      this.update() 
    }, 1000);
  
  }
}

omit_special_char(e:any){
  var regex = new RegExp("^[a-zA-Z0-9 ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
      return true;
  }
  e.preventDefault();
  return false;
}

applyCoupon(){
  this.C_Code='';
  this.show_checkmark=false;
    $('#c_code').css("border", "1px solid gray");
    $('#success').css('display','none');
    $('#error').css('display','none')
  this.check_response='';
  this.urg.couponcheck(this.coupon_code.toUpperCase()).subscribe(data=>{
    this.check_response=data;
    if(this.check_response.success==1){
        this.toastr.successToastr('Coupon has been applied successfully','');
        // this.check_response=this.check_response.success;
        // $('#c_code').css("border", "1px solid green");
        $('#c_code').css("border", "1px solid green");
        $('#success').fadeIn('slow');
        this.show_checkmark=true;
        this.C_Code=this.coupon_code;

    }
    else if(this.check_response.success==0){
     this.toastr.errorToastr('Coupon is invalid','');
    //  this.check_response=this.check_response.success;
     $('#c_code').css("border", "1px solid red");
     $('#error').fadeIn('slow');
     this.show_checkmark=true;
      this.coupon_code='';
      this.C_Code='';

    }
    else{
     this.toastr.errorToastr('Coupon is already in use','');
    //  this.check_response=this.check_response.success;
     $('#c_code').css("border", "1px solid red");
     $('#error').fadeIn('slow');
     this.show_checkmark=true;
     this.coupon_code='';
     this.C_Code='';
    }
    // console.log(this.check_response)  
  })
}

continue(){
  // this.step=this.step==1;
   this.confirm_email='';
  this.show_loader=false;
  if(this.step==1){
    $('#counter_left').text('')
    if($('#email_phone').val()==''){this.confirm_email=$('#email_phone').attr('type')=='text' ? "Please provide phone number" : "Please provide email Address";
    this.show_loader=true;}
    else{
     $('#counter_left').text('01:59')
       this.s.submit_phone_email($('#email_phone').val()).subscribe(data=>{
        //  console.log(data);
         this.get_otp='';
         this.email_phone='';
         this.check_response=data;
         if(this.check_response.success==1){
           this.get_otp=this.check_response.otp;
           this.email_phone=this.check_response.email_phone;
            clearTimeout(this.getId);
            this.confirm_email="";
            this.step=2;
            this.update() ;
            this.email_flag=0;
            this.show_loader=true;    
         }
         else{
          this.show_loader=true;    
          this.toastr.errorToastr('Registered as a different type of user','');
         }
       },error=>{
        this.show_loader=true;
         this.toastr.errorToastr('Something went wrong! Please try again later','');
       }) 
    } 
  }
  else if(this.step==2){
    if($('#otp1').val()=='' || $('#otp2').val()=='' || $('#otp3').val()=='' || $('#otp4').val()=='' || $('#otp5').val()=='' || $('#otp6').val()==''){
      this.show_loader=true;    
      this.confirm_email="Please provide mandatory field"; 
    } 
    else{
      // this.step=3; 
      var otp=$('#otp1').val()+$('#otp2').val()+$('#otp3').val()+$('#otp4').val()+$('#otp5').val()+$('#otp6').val();
      // console.log(otp,this.get_otp)
      if(this.get_otp==otp){
      this.s.submit_secondstage(this.email_phone).subscribe(data=>{
        this.dt_stage2=data;
        if(this.dt_stage2.success==1){
             if(this.dt_stage2.flag=='Register'){
                 this.show_loader=true;    
                this.step=3;  
             }
             else if(this.dt_stage2.flag=='Login'){
              this.show_loader=true;    
              clearTimeout(this.getId)
              this.alert_show = true;
              localStorage.setItem('u-token', this.dt_stage2.message[0].user_id);
              localStorage.setItem('u-loggedin', 'true');
              localStorage.setItem('u-id', this.dt_stage2.message[0]._id);
              // console.log(localStorage.getItem('u-id'));
              localStorage.setItem('user-type_user', this.dt_stage2.message[0].user_type);
              this.cookieService.set('u_cookie-name', this.dt_stage2.message[0].user_id);
              localStorage.setItem('remember_token', this.dt_stage2.message[0].remember_token);
              // this.u_remem=document.getElementById('urem');
              localStorage.setItem('user_remember','true');
              if(this.rd==undefined){
              this.router.navigate(['/user/user_view']);
              }else{
              window.open(this.main_url,"_self");
              }
              if(localStorage.getItem('ad1')=='/allbooks')
              { localStorage.setItem('ad1','');
                this.router.navigate(['/user/bookdetails'])}

             }
        }
        else{
            this.show_loader=true;    
            this.toastr.errorToastr('Something went wrong! please try again later','')
        }
      },error=>{
        this.show_loader=true;
         this.toastr.errorToastr('Something went wrong! Please try again later','');
       })
      }
      else{
        this.show_loader=true;    
         this.confirm_email="Invalid OTP";
      }

    }
  // this.show_loader=true;    
  }
  else{
    if($('#u_name').val()=='' || $('#Email_Phone').val()=='' || $('#whetheryouare').val()=='')
    {
      if($('#u_name').val()==''){$('#Name').text('*please provide your name');}
      else if($('#Email_Phone').val()==''){$('#emailphone').text(this.proceedToemail ? '*please provide your email':'*please provide your phone no.');}
      else if($('#whetheryouare').val()==''){$('#wyouare').text('*please provide this field');}
      this.show_loader=true;    
    }
    else if($('#u_name').val()=='' && $('#Email_Phone').val()=='' && $('#whetheryouare').val()==''){
      this.show_loader=true;    
      $('#Name').text('*please provide your name');$('#emailphone').text('*please provide your '+ this.proceedToemail ? 'email':'phone no.');$('#wyouare').text('*please provide this field');
    }
    else{
      clearTimeout(this.getId);
      this.s.submit_thirdstage($('#u_name').val(),this.email_phone,$('#Email_Phone').val(),$('#whetheryouare').val(),this.C_Code).subscribe(data=>{
        // this.dt_stage3=data;
        // if(this.dt_stage3.success==1){
        // } 
        // else{
        //   this.toastr.errorToastr('Something went wrong! please try again later','');
        // }
        this.userdata = data;
        var obj = this.userdata;
        if (obj.success == 1) {
          this.show_loader=true;    
          this.alert_show = true;
          localStorage.setItem('u-token', obj.message[0].user_id);
          localStorage.setItem('u-loggedin', 'true');
          localStorage.setItem('u-id', obj.message[0]._id);
          // console.log(localStorage.getItem('u-id'));
          localStorage.setItem('user-type_user', obj.message[0].user_type);
          this.cookieService.set('u_cookie-name', obj.message[0].user_id);
          localStorage.setItem('remember_token', obj.message[0].remember_token);
          // this.u_remem=document.getElementById('urem');
          localStorage.setItem('user_remember','true');
          if(this.rd==undefined){
          this.router.navigate(['/user/user_view']);
          }else{
          window.open(this.main_url,"_self");
          }
          if(localStorage.getItem('ad1')=='/allbooks')
          { localStorage.setItem('ad1','');
            this.router.navigate(['/user/bookdetails'])}
        }
        else if(obj.success== 0){
          this.show_loader=true;    
          this.toastr.errorToastr(obj.message);
        }
        else{
          this.show_loader=true;    
          this.toastr.errorToastr('Something went wrong! please try again later','');}
      },error=>{
        this.show_loader=true;
         this.toastr.errorToastr('Something went wrong! Please try again later','');
       })
    }
  // this.show_loader=true;    
  }

}







  remember_me(v:any){
    
    localStorage.setItem('user_remember',v);
    // alert(localStorage.getItem('user_remember'));
  }
  show_hide() {
    //alert("Show_Hide");
    this.show_eye = !this.show_eye;
    if (this.show_eye == true) {
      document.getElementById('eye')?.setAttribute("class", "fa fa-eye");
      document.getElementById('passwd')?.setAttribute('type', 'text');
      document.getElementById('passwd')?.setAttribute('click', 'show_hide()');
      // console.log("hello eye");
    }
    else {
      document.getElementById('eye')?.setAttribute("class", "fa fa-eye-slash");
      document.getElementById('passwd')?.setAttribute('type', 'password');
      document.getElementById('passwd')?.setAttribute('click', 'show_hide()');
      // console.log("hello eye slash");
    }
  }
  close_alert() {
    if('message' in localStorage){
     this.alert_show=true;
     localStorage.removeItem('message');
    }
    else{
      this.alert_div = document.getElementById('uploaded');
      this.alert_div.style.display = 'none';
    }
  }
  check_valid_email(event: any) {
    var em = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!em.test(event.target.value)) { this.confirm_email = "Not a valid email id"; this.email_flag = 0; }
    else { this.confirm_email = ""; this.email_flag = 1; }
  }
  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  u_login(v1: any, v2: any) {
   
    if (v1 == '' || v2 == '') {
      if (v1 == '')
        this.check_name = "*Please provide email";
      if (v2 == '')
        this.check_email = "*Please provide password";
    }
    else {
      // alert("hii")
      // this.spinner.show();
      // if (this.email_flag == 1) {
        this.ulg.login_user(v1, v2,'N').subscribe(data => {
          // console.log(data)
          this.userdata = data;
          /*if(this.userdata.success=='1')
           alert("You have been registered!");*/
          var obj = JSON.parse(this.userdata);
          if (obj.success == '1') {
            this.alert_show = true;
            localStorage.setItem('u-token', v1);
            localStorage.setItem('u-loggedin', 'true');
            localStorage.setItem('u-id', obj.message[0]._id);
            // console.log(localStorage.getItem('u-id'));
            localStorage.setItem('user-type_user', obj.message[0].user_type);
            this.cookieService.set('u_cookie-name', v1);
            localStorage.setItem('remember_token', obj.message[0].remember_token);
            // this.u_remem=document.getElementById('urem');
            // localStorage.setItem('user_remember',this.u_remem.checked);
            //alert(this.rd);
            if(this.rd==undefined){
            //alert(this.rd);
            this.router.navigate(['/user/user_view']);
            }else{
            //  alert("else pppp");
            // alert(this.rd);
            window.open(this.main_url,"_self");
            }
            if(localStorage.getItem('ad1')=='/allbooks')
            { localStorage.setItem('ad1','');
              this.router.navigate(['/user/bookdetails'])}
          }
          else {
            this.invalid = obj.message;
            this.alert_show = false;
          }
          // this.alert_div = document.getElementById('uploaded');
          // this.alert_div.style.display = 'block';
        })
      // }
      // else {
        // this.alert_show = false;

        // // this.alert_div = document.getElementById('uploaded');
        // // this.alert_div.style.display = 'block';
        // this.invalid = 'Enter valid email id';
      // }
    }
  }

  back(){this.step=1;this.confirm_email=""; clearTimeout(this.getId);
  $('#otp1').val(''); $('#otp2').val(''); $('#otp3').val(''); $('#otp4').val(); $('#otp5').val(); $('#otp6').val();
}
  submitLogin(){
    this.loged=true;
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


    getUserprofileDetails(token: any) {
      // FB.api('/v3.1/me', 'get', {access_token: token, fields: 'id,name,email,picture'},(res:any) => {
      //    console.log(res,res.email, res.id, 'Facebook');
      // });
  }


  google_signin(){
    this.loged=true;
    this.googleserve.signin();
  }
  signout(){
    this.loged=false;
    this.googleserve.signout();
  }

  fblogout(){
    // this.loged=false;
    // this.status='';
    // FB.logout((response:any) => {
    //   console.log(response);

    //   console.log(this.status)
    // });
  }
  isCheck(e:any){
    // console.log(e)
    this.setLogin=!e.target.checked
    // alert(this.setLogin)
  }
  openTermsPloicy(mode:any){
    window.open(mode=='T' ? '/terms' : '/Privacypolicy','_blank')
  }
}
