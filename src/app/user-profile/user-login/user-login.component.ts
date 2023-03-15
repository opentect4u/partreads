import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UlogService } from './ulog.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { NgxSpinnerService } from "ngx-spinner";
// import { SocialAuthService } from "angularx-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { GoogleLoginAuthService } from 'src/app/SERVICE/google-login-auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $:any;

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css',
    '../../../assets/cssfiles/bootstrap.css',
    '../../../assets/cssfiles/font-awesome.css',
    '../../../assets/chosen/chosen.css',
    // '../../../assets/cssfiles/apps.css',
    // '../../../assets/cssfiles/apps_inner.css',
    '../../../assets/cssfiles/apps__login.css',
    '../../../assets/cssfiles/res.css'
    
  ]
})
export class UserLoginComponent implements OnInit {
  load:boolean=false;
  check_name: string = '';
  check_email: string = '';
  rd:any;
  location_rd:any;
  main_url:any;
  u_remem:any;

  google_login:any;
  user!:gapi.auth2.GoogleUser;
  constructor(private toastr:ToastrManager,private ref:ChangeDetectorRef,private googleserve: GoogleLoginAuthService,private activatedRoutes: ActivatedRoute, private ulg: UlogService, private router: Router, private cookieService: CookieService) {

    this.activatedRoutes.queryParams.subscribe(params => {
      this.rd = params['rd_url'];
      //alert(params['rd_url'] );
    });
    this.location_rd=location.href.substring(location.href.indexOf('rd_url'));
    var res = this.location_rd.split("rd_url=");
    this.main_url=res[1];
   //alert(res[1]);
   }
  userdata: any;
  invalid: any = '';
  confirm_email: string = '';
  email_flag: number = 0;
  show_eye: boolean = false;
  alert_show = true;
  alert_div: any;
  ngOnInit(): void {
    // alert(this.rd);
    if('message' in localStorage){
      this.invalid=localStorage.getItem('message');
      this.alert_show=false;
    }
    this.googleserve.observable().subscribe(user=>{
      this.user=user;
    this.google_login=this.user;
    this.ulg.login_user(this.google_login.su.ev, '','Y').subscribe(data => {
          this.userdata = data;
          var obj = JSON.parse(this.userdata);
          if (obj.success == '1') {
            this.alert_show = true;
            localStorage.setItem('u-token', this.google_login.su.ev);
            localStorage.setItem('u-loggedin', 'true');
            localStorage.setItem('u-id', obj.message[0]._id);
            console.log(localStorage.getItem('u-id'));
            localStorage.setItem('user-type_user', obj.message[0].user_type);
            this.cookieService.set('u_cookie-name', this.google_login.su.ev);
            localStorage.setItem('remember_token', obj.message[0].remember_token);
            this.u_remem=document.getElementById('urem');
            localStorage.setItem('user_remember',this.u_remem.checked);
            if(this.rd==undefined){
            this.router.navigate(['/user/user_view']).then(()=>{location.reload()});
            }else{
            window.open(this.main_url,"_self");
            }
            if(localStorage.getItem('ad1')=='/allbooks')
            { localStorage.setItem('ad1','');
              this.router.navigate(['/user/bookdetails'])}
          }
          else {
            // this.invalid = obj.message;
            // this.alert_show = false;
            // this.toastr.errorToastr('')
          }
          this.alert_div = document.getElementById('uploaded');
          this.alert_div.style.display = 'block';
        })
     
      this.ref.detectChanges();
   })
  }

  // public socialSignIn(socialPlatform : string) {
  //   let socialPlatformProvider;
  //   if(socialPlatform == "facebook"){
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   }else if(socialPlatform == "google"){
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   } else {
  //     socialPlatformProvider ='';
  //   }
    
  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (userData) => {
  //       console.log(socialPlatform+" sign in data : " , userData);
  //       // Now sign-in with userData
  //       // ...
            
  //     }
  //   );
  // }
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
      console.log("hello eye");
    }
    else {
      document.getElementById('eye')?.setAttribute("class", "fa fa-eye-slash");
      document.getElementById('passwd')?.setAttribute('type', 'password');
      document.getElementById('passwd')?.setAttribute('click', 'show_hide()');
      console.log("hello eye slash");
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
    console.log(this.load);
    
   this.load=true;
    if (v1 == '' || v2 == '') {
      if (v1 == ''){
          this.load=false;
          this.check_name = "*Please provide email";
      }
      if (v2 == ''){
        this.load=false;
        this.check_email = "*Please provide password";
      }
    }
    else {
      // this.spinner.show();
      if (this.email_flag == 1) {
        this.ulg.login_user(v1, v2,'N').subscribe(data => {
          console.log(data)
          this.userdata = data;
          var obj = JSON.parse(this.userdata);
          if (obj.success == '1') {
             this.load=false;
            this.alert_show = true;
            localStorage.setItem('u-token', v1);
            localStorage.setItem('u-loggedin', 'true');
            localStorage.setItem('u-id', obj.message[0]._id);
            console.log(localStorage.getItem('u-id'));
            localStorage.setItem('user-type_user', obj.message[0].user_type);
            this.cookieService.set('u_cookie-name', v1);
            localStorage.setItem('remember_token', obj.message[0].remember_token);
            this.u_remem=document.getElementById('urem');
            localStorage.setItem('user_remember',this.u_remem.checked);
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
            this.load=false;
            // this.alert_show = false;
            $('#alertDanger').fadeIn('slow');
          }
          // this.alert_div = document.getElementById('uploaded');
          // this.alert_div.style.display = 'block';
        })
      }
      else {
        this.load=false;
        // this.alert_show = false;
        // this.alert_div = document.getElementById('uploaded');
        // this.alert_div.style.display = 'block';
        this.invalid = 'Enter valid email id';
        // this.invalid = obj.message;
        // this.alert_show = false;
        $('#alertDanger').fadeIn('slow');
      }
    }
  }


  google_signin(){ this.googleserve.signin();}
  submitLogin(){}
}
