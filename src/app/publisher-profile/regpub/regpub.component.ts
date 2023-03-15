import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PublisherRegistrationService } from 'src/app/publisher-registration.service';
import { pub } from '..//..//pub';
import {trigger, style, animate, transition} from '@angular/animations';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-regpub',
  templateUrl: './regpub.component.html',
  styleUrls: ['./regpub.component.css',

    // '../../../assets/cssfiles/bootstrap.css',
    // '../../../assets/cssfiles/font-awesome.css',
    // '../../../assets/chosen/chosen.css',
    // '../../../assets/cssfiles/apps.css',
    // '../../../assets/cssfiles/res.css',
    // '../../../assets/cssfiles/apps_inner.css'

    '../../../assets/cssfiles/bootstrap.css',
    '../../../assets/cssfiles/font-awesome.css',
    '../../../assets/chosen/chosen.css',
    // '../../../assets/cssfiles/apps.css',
    // '../../../assets/cssfiles/apps_inner.css'
    '../../../assets/cssfiles/apps__login.css',
    '../../../assets/cssfiles/res.css'
  ],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(1000, style({opacity: 1}))
      ]) 
    ])
  ]

})
export class RegpubComponent implements OnInit {
  show_loader=true;
  unamePattern = "^[a-zA-Z .]{3,30}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isValidFormSubmitted = false;
  validateEmail = true;
  book_pub = new pub('', '', '','');
  userData: any;
  k: any;
  constructor(private toastr:ToastrManager,private router: Router, private registration_pub: PublisherRegistrationService) { }
  check_name: string = '';
  check_email: string = '';
  check_password: string = '';
  password: string = '';
  confirm: string = '';
  conf_message: string = '';
  flag: number = 0;
  confirm_email: string = '';
  email_flag: number = 0;
  pass_message: string = '';
  flag_pass: number = 0;
  conf: string = '';
  show_eye: boolean = false;
  show_eye_conf: boolean = false;
  password1: string = '';
  invalid: string = '';
  inputname: any;
  inputemail: any;
  inputpass: any;
  inputconf: any;
  alert_show_okay=true;
  alert_show_wrong=true;
  alert_div:any;
  disabled_button:boolean=false;
  mobile_number:any;
  caps_lock:any='Caps Lock is on';
  x:any;
  ngOnInit(): void {
  }
  onFormSubmit(form: NgForm) {
   /* this.isValidFormSubmitted = false;
    if (form.invalid) {
       return;
    }
    this.isValidFormSubmitted = true;
    this.book_pub.email=form.value.email;
    console.log(form.value);*/

    //this.user = form.value;
    //localStorage.setItem('token',this.user.email);
    //console.log(localStorage.getItem('token'));
    /*this.userService.createUser(this.user).subscribe(data=>{
      console.log('Success!',data);
   },
   error=>console.log('Error!',error))
    this.user = new User('','','','');
    form.resetForm();
    alert("Registration Successful!!")
    this.router.navigate(['login1'])
    
   }*/}
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
  check_email_validity(event: any) {
    $('#checkEmail').css('display','none');
    var em = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!em.test(event.target.value)) { this.confirm_email = "Not a valid email id"; this.email_flag = 0; $('#confEmail').fadeIn('slow');}
    else { this.confirm_email = ""; this.email_flag = 1; $('#confEmail').css('display','none')}
  }
  show_input(event: any) {
    console.log(event.target.value);
    this.password = event.target.value;
    console.log(this.password);
  }
  check_valid_pass(event: any) {
    if(event.getModifierState("CapsLock")){
      this.x = document.getElementById("snackbar");
      this.x.className = "show";
      setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
    }

    this.password1 = event.target.value;
    var pass = new RegExp(/^([a-zA-Z0-9#?!@$%^&*-_]{4,})$/);
    if (!pass.test(event.target.value)) { this.pass_message = "Passwords should be atleast 4 characters long"; this.flag_pass = 0;}
    else { this.pass_message = ""; this.flag_pass = 1;}
  }
  confirm_password(event: any) {
    if(event.getModifierState("CapsLock")){
      this.x = document.getElementById("snackbar");
      this.x.className = "show";
      setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
    }

    this.conf = event.target.value;
    if (event.target.value != this.password) { this.conf_message = "Passwords not matching"; this.flag = 0; $('#confPassword').fadeIn('slow')}
    else { this.conf_message = ''; this.flag = 1; $('#confPassword').css('display','none')}
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
  close_alert(){
    this.alert_div=document.getElementById('uploaded');
    this.alert_div.style.display='none';
  }
  close_alert_1(){
    this.alert_div=document.getElementById('uploaded_1');
    this.alert_div.style.display='none';
  }
  show(v1: string, v2: string, v3: string,v4:any) {
    // $('.error').hide('slow');
    $('#mobileNumber').css('display','none');
    $('#checkEmail').css('display','none');
    $('#checkName').css('display','none');
    $('#passNew').css('display','none');
    $('#confEmail').css('display','none');
    this.check_name='';
    this.check_email='';
    this.check_password='';
    this.mobile_number='';
    this.invalid='';
    this.show_loader=false
    this.alert_show_wrong=true;
    if (v1 == '' || v2 == '' || v3 == '' || v4== '') {
      if (v1 == ''){
        this.check_name = "*Please provide name.";
        $('#checkName').fadeIn('slow');
      }
      if (v2 == ''){
        this.check_email = "*Please provide email.";
        $('#checkEmail').fadeIn('slow');
      }
      if (v4 == ''){
      this.mobile_number = "*Please provide phone number";
      $('#mobileNumber').fadeIn('slow');}
      if (v3 == ''){
        this.check_password = "*Please provide password";
        $('#passNew').fadeIn('slow');
      }
      this.show_loader=true;
    }
    else {
      // this.alert_div=document.getElementById('uploaded');
      //       this.alert_div.style.display='block';
     
      if (this.flag == 1 && this.email_flag == 1 && this.flag_pass == 1 && v3 == this.conf) {
        this.book_pub.user_name = v1;
        this.book_pub.user_id = v2;
        this.book_pub.user_pass = v3;
        this.book_pub.phone=v4;
        this.registration_pub.registration(this.book_pub).subscribe(data => {
          console.log('Success!', data)
          this.userData = data;
          if (this.userData.success == 1) {
            this.alert_show_okay=false;
            this.invalid = 'Registration Successful, please log in.';
            this.inputname = document.getElementById('p_nm');
            this.inputname.value = '';
            this.inputemail = document.getElementById('p_em');
            this.inputemail.value = '';
            this.inputpass = document.getElementById('passwd');
            this.inputpass.value = '';
            this.inputconf = document.getElementById('conf_passwd');
            this.inputconf.value = '';
            this.inputpass = document.getElementById('p_phone');
            this.inputpass.value = '';
            this.show_loader=true;

          }
          else if (this.userData.success == 0) {
            this.alert_show_wrong=false;
            this.alert_div=document.getElementById('uploaded_1');
            this.alert_div.style.display='block';
            this.invalid = this.userData.message;
             this.show_loader=true;
          }
        })
        // console.log(this.book_pub.email);

      }
      else {  
        if (this.email_flag == 0){
          this.alert_show_wrong=false;
          // this.alert_div=document.getElementById('uploaded_1');
          //   this.alert_div.style.display='block';
          this.invalid='Please enter a valid email.';
          this.toastr.errorToastr(this.invalid,'',{maxShown:1});
          this.show_loader=true;
        }
        else{
          this.alert_show_wrong=false;
          // this.alert_div=document.getElementById('uploaded_1');
          //   this.alert_div.style.display='block';
          this.invalid='Please confirm passwords';
          this.toastr.errorToastr(this.invalid,'',{maxShown:1})
          this.show_loader=true;
        
        }
      }
    }
  }

  check_terms_and_condition(event:any){
    if(event.target.checked==true){
       this.disabled_button=false;
    }
    else{
      this.disabled_button=true;
    
    }
  }
  preventNonNumericalInput(e: any) {//keypress event: This event is for prevent the nonnumeric value in phone number
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
}
}
