import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UregService } from './ureg.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { GoogleLoginAuthService } from 'src/app/SERVICE/google-login-auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $:any;
declare var gapi: any;
@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css',
    '../../../assets/cssfiles/bootstrap.css',
    '../../../assets/cssfiles/font-awesome.css',
    '../../../assets/chosen/chosen.css',
    '../../../assets/cssfiles/apps.css',
    '../../../assets/cssfiles/res.css',
    '../../../assets/cssfiles/apps_inner.css'
  ],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class UserRegComponent implements OnInit {
  check_response:any='';
  type:any='';
  ref_code:any='';
  msg_type:any='';
  check_name: string = '';
  check_pass: string = '';
  check_email: string = ''
  confirm_message: string = '';
  password: string = '';
  flag: number = 0;
  show_loader = true;
  constructor(private toastr:ToastrManager,private ref: ChangeDetectorRef, private urg: UregService, private googleserve: GoogleLoginAuthService) { }
  userdata: any;
  pass_message: string = '';
  flag_pass: number = 0;
  password1: string = '';
  cnf: string = '';
  confirm_email: string = '';
  email_flag: number = 0;
  show_eye: boolean = false;
  show_eye_conf: boolean = false;
  invalid: string = '';
  inputname: any;
  inputemail: any;
  inputpass: any;
  inputconf: any;
  alert_show_okay = true;
  alert_show_wrong = true;
  alert_div: any;
  disable_button: boolean = false;
  check_phone_number: any;
  x: any;
  caps_lock: any = 'Caps Lock is on';
  
  status: any = '';
  yourSuccessMethod: any
  title = 'socialsignin';
  Name: any;
  Email: any;
  Provider: any
  loged: boolean = false;
  id: any;
  user!: gapi.auth2.GoogleUser;
  js: any;
  fjs: any;
  google_login: any;
  hide_type:boolean=true;
  ngOnInit(): void {
    this.alert_show_okay = true;
    this.alert_show_wrong = true;
    // this.disable_button=document.getElementById('submit');
    // this.disable_button.setAttribute('disabled',false);
    // document.getElementById('submit')?.setAttribute('disable', 'false');
    this.googleserve.observable().subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.google_login = this.user;
      console.log(this.google_login.su.ev);

      this.urg.register(this.google_login.su.qf, this.google_login.su.ev, '', '', 'Y', this.google_login.su.SM,this.type,this.ref_code).subscribe(data => {
        console.log(data);
        this.userdata = data;
        var obj = JSON.parse(this.userdata);
        if (obj.success == '1') {
          this.alert_show_okay = false;
          this.invalid = 'Registration Successful, please log in.';
          this.inputname = document.getElementById('uname');
          this.inputname.value = '';
          this.inputemail = document.getElementById('uemail');
          this.inputemail.value = '';
          this.inputpass = document.getElementById('passwd');
          this.inputpass.value = '';
          this.inputconf = document.getElementById('conf_passwd');
          this.inputconf.value = '';
          this.inputpass = document.getElementById('p_nm');
          this.inputpass.value = '';
        }
        else {
          this.alert_show_wrong = false;
          this.alert_div = document.getElementById('uploaded_1');
          this.alert_div.style.display = 'block';
          this.invalid = obj.message;
        }
      })
      // this.ref.detectChanges();

    })
    this.ref.detectChanges();

  }
  show_hide_pass() {
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
    this.alert_div = document.getElementById('uploaded');
    this.alert_div.style.display = 'none';
  }
  close_alert_1() {
    this.alert_div = document.getElementById('uploaded_1');
    this.alert_div.style.display = 'none';
  }
  show_hide_conf() {
    //alert("Show_Hide");
    this.show_eye_conf = !this.show_eye_conf;
    if (this.show_eye_conf == true) {
      document.getElementById('eye_conf')?.setAttribute("class", "fa fa-eye");
      document.getElementById('conf_passwd')?.setAttribute('type', 'text');
      document.getElementById('conf_passwd')?.setAttribute('click', 'show_hide()');
      console.log("hello eye");
    }
    else {
      document.getElementById('eye_conf')?.setAttribute("class", "fa fa-eye-slash");
      document.getElementById('conf_passwd')?.setAttribute('type', 'password');
      document.getElementById('conf_passwd')?.setAttribute('click', 'show_hide()');
      console.log("hello eye slash");
    }
  }
  check_valid_email(event: any) {
    var em = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!em.test(event.target.value)) { this.confirm_email = "Not a valid email id"; this.email_flag = 0; }
    else { this.confirm_email = ""; this.email_flag = 1; }
  }
  show_input_user(event: any) {
    this.password = event.target.value;
  }
  confirm_pass_user(event: any) {
    if (event.getModifierState("CapsLock")) {
      this.x = document.getElementById("snackbar");
      this.x.className = "show";
      setTimeout(() => { this.x.className = this.x.className.replace("show", ""); }, 3000);
    }
    if (event.target.value != this.password) { this.confirm_message = "Passwords not matching"; this.flag = 0; }
    else { this.confirm_message = ''; this.flag = 1; }
    this.cnf = event.target.value;
  }
  check_valid(event: any) {
    if (event.getModifierState("CapsLock")) {
      this.x = document.getElementById("snackbar");
      this.x.className = "show";
      setTimeout(() => { this.x.className = this.x.className.replace("show", ""); }, 3000);
    }
    this.password1 = event.target.value;
    var pass = new RegExp(/^([a-zA-Z0-9#?!@$%^&*-_]{4,})$/);
    if (!pass.test(event.target.value)) { this.pass_message = "Passwords should be atleast 4 characters long"; this.flag_pass = 0; }
    else { this.pass_message = ""; this.flag_pass = 1; }


  }
  u_register(v1: any, v2: any, v3: any, v4: any) {
    this.show_loader = false;
    if (v1 == '' || v2 == '' || v3 == '' || v4 == '' || this.type=='') {
        {
        if (v1 == '')
          this.check_name = "*Please provide name."
        }
       if (v2 == '')
        this.check_email = "*Please provide email."
      if (v3 == '')
        this.check_pass = "*Please provide password."
      if (v4 == '')
        this.check_phone_number = "*Please provide phone number";
      if(this.type== ''){
        this.msg_type="*Please select an option";
        this.hide_type=false;
      }
      this.show_loader = true;

    }
    else {
      if (this.email_flag == 1 && this.flag == 1 && this.flag_pass == 1 && ((this.cnf == this.password) || (this.cnf == this.password1) || (v3 == this.cnf))) {
        this.ref_code=this.check_response==1 ? this.ref_code : '';
        console.log("coupon_code:"+this.ref_code,this.check_response);
        
        // this.urg.register(v1, v2, v3, v4, 'N', '',this.type,this.ref_code).subscribe(data => {
        //   console.log(data)
        //   this.userdata = data;
        //   var obj = JSON.parse(this.userdata);
        //   if (obj.success == '1') {
        //     this.alert_show_okay = false;
        //     this.invalid = 'Registration Successful, please log in.';
        //     this.inputname = document.getElementById('uname');
        //     this.inputname.value = '';
        //     this.inputemail = document.getElementById('uemail');
        //     this.inputemail.value = '';
        //     this.inputpass = document.getElementById('passwd');
        //     this.inputpass.value = '';
        //     this.inputconf = document.getElementById('conf_passwd');
        //     this.inputconf.value = '';
        //     this.inputpass = document.getElementById('p_nm');
        //     this.inputpass.value = '';
        //     this.type='';
        //     this.ref_code='';
        //     this.show_loader = true;
        //     this.hide_type=true;
        //   }
        //   else {
        //     this.alert_show_wrong = false;
        //     this.alert_div = document.getElementById('uploaded_1');
        //     this.alert_div.style.display = 'block';
        //     this.invalid = obj.message;
        //     this.show_loader = true;
        //   }
        // })
      }
      else {
        if (this.email_flag == 0) {
          this.alert_show_wrong = false;
          this.alert_div = document.getElementById('uploaded_1');
          this.alert_div.style.display = 'block';
          this.invalid = 'Please enter a valid email Id';
          this.show_loader = true;

        }
        else {
          this.alert_show_wrong = false;
          this.alert_div = document.getElementById('uploaded_1');
          this.alert_div.style.display = 'block';
          this.show_loader = true;

          this.invalid = "Please confirm your password! It should be atleast 4 characters long";
        }
      }
    }
  }

  checked_term_and_condition(event: any) {
    if (event.target.checked == true) {
      this.disable_button = false;
    }
    else {
      this.disable_button = true;


    }

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


  getUserprofileDetails(token: any) {
    // FB.api('/v3.1/me', 'get', {access_token: token, fields: 'id,name,email,picture'},(res:any) => {
    //    console.log(res,res.email, res.id, 'Facebook');
    // });
  }


  google_signin() {
    this.loged = true;
    this.googleserve.signin();
  }
  signout() {
    this.loged = false;
    this.googleserve.signout();
  }

  fblogout() {
    // this.loged=false;
    // this.status='';
    // FB.logout((response:any) => {
    //   console.log(response);

    //   console.log(this.status)
    // });
  }
  applyCoupon(){
     this.urg.couponcheck(this.ref_code).subscribe(data=>{
       console.log(data);
       this.check_response=data;
       if(this.check_response.success==1){
           this.toastr.successToastr('Coupon has been applied successfully','');
           this.check_response=this.check_response.success;
           $('#ref_code').css("border", "1px solid green");

       }
       else if(this.check_response.success==0){
        this.toastr.errorToastr('Coupon is invalid','');
        this.check_response=this.check_response.success;
        $('#ref_code').css("border", "1px solid red");

       }
       else{
        this.toastr.errorToastr('Coupon is already in use','');
        this.check_response=this.check_response.success;
        $('#ref_code').css("border", "1px solid red");

       }
       console.log(this.check_response)  
     })
  }
}
