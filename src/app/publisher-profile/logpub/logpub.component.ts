import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PublisherLoginService } from 'src/app/publisher-login.service';
import { publog } from '..//..//publog';
declare var $:any;
@Component({
  selector: 'app-logpub',
  templateUrl: './logpub.component.html',
  styleUrls: ['./logpub.component.css',
    '../../../assets/cssfiles/bootstrap.css',
    '../../../assets/cssfiles/font-awesome.css',
    '../../../assets/chosen/chosen.css',
    // '../../../assets/cssfiles/apps.css',
    '../../../assets/cssfiles/res.css',
    // '../../../assets/cssfiles/apps_inner.css'
    '../../../assets/cssfiles/apps__login.css'
  ]
})
export class LogpubComponent implements OnInit {

  constructor(private router: Router, private publogin: PublisherLoginService, private cookieService: CookieService) { }
  login = new publog('', '');
  userData: any;
  k: any;
  check_email: string = '';
  check_pass: string = '';
  confirm_email: string = '';
  email_flag: number = 0;
  show_eye: boolean = false;
  invalid: any = '';
  alert_div: any;
  alert_show = true;
  p_remem:any;
  ngOnInit(): void {
    // localStorage.clear();
    if('message_pub' in localStorage){
      this.invalid=localStorage.getItem('message_pub');
      this.alert_show=false;
    }
  }
  hide_show() { console.log("hello"); }
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
  remember_me(v:any){
    
    localStorage.setItem('pub_remember',v);
  //   alert(localStorage.getItem('pub_remember'));
  }
  close_alert() {
    if('message_pub' in localStorage){
      this.alert_show=true;
      localStorage.removeItem('message_pub');
     }
     else{
      this.alert_div = document.getElementById('uploaded');
      this.alert_div.style.display = 'none';
     }


  
  }
  check_email_validity(event: any) {
    var em = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!em.test(event.target.value)) { this.confirm_email = "Not a valid email id"; this.email_flag = 0; }
    else { this.confirm_email = ""; this.email_flag = 1; }
  }
  show(v1: string, v2: string) {
    if (v1 == '' || v2 == '') {
      if (v1 == '')
        this.check_email = "*Please provide email.";
      if (v2 == '')
        this.check_pass = "*Please provide password";
    }
    else {

      if (this.email_flag == 1) {
        this.login.user_id = v1;
        this.login.user_pass = v2;
        this.publogin.login_pub(this.login).subscribe(data => {
          console.log('Success!', data)
          this.userData = data;
          if (this.userData.success == 1) {
            this.alert_show = true;
            localStorage.setItem('uploader', '0');
            localStorage.setItem('pub-token', this.login.user_id);
            localStorage.setItem('pub-loggedin', 'true');
            localStorage.setItem('pub-id', this.userData.message[0]._id);
            localStorage.setItem('user-type', this.userData.message[0].user_type);
            this.cookieService.set('pub-cookie-name', this.login.user_id);
            this.router.navigate(['/publisher/publisher-dashboard']);
            this.p_remem=document.getElementById('prem');
            localStorage.setItem('pub_remember',this.p_remem.checked);
          }
          else if (this.userData.success == 0) {
            this.invalid = this.userData.message;
            // this.alert_show = false;
            $('#alertdanger').fadeIn('slow');

          }
          // this.alert_div = document.getElementById('uploaded');
          // this.alert_div.style.display = 'block';
        })
      }
      else {
        // this.alert_show = false;

        // this.alert_div = document.getElementById('uploaded');
        // this.alert_div.style.display = 'block';
        this.invalid = 'Enter valid email id';
        $('#alertdanger').fadeIn('slow');
      }
    }
  }
}
