import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublisherLoginService } from 'src/app/publisher-login.service';
import { CookieService } from 'ngx-cookie-service';
import { publog } from 'src/app/publog';

@Component({
  selector: 'app-publishernav',
  templateUrl: './publishernav.component.html',
  styleUrls: ['./publishernav.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css'
]
})
export class PublishernavComponent implements OnInit {

  constructor(private router: Router, private publogin: PublisherLoginService, private cookieService: CookieService) { }
  login = new publog('','')//Create an instance of publog class
  show_loader=true;//boolean variable which is used to show or hide loader in log in button 
  userData: any;//used to hold user details after successfully login
  check_email: string = '';//used to show email required validation message
  check_pass: string = '';//used to show password required validation message
  confirm_email: string = '';//used to show 'Valid email' error message
  email_flag: number = 0;//used to check whether the email is valid or not,if not show 'Valid email' error message
  show_eye: boolean = false;//used to change input type text or password 
  invalid: any = '';//used to show error alert message,when a publisher enter wrong user_id or password 
  alert_div: any;//used to contain Id of the "alert alertLogin" div 
  alert_show = true;//Used to conditionally hide or show the alert div
  p_remem:any;//used to contain the Id of the checkbox
  ngOnInit(): void {
    localStorage.setItem('ad1','/publisher/publishernav');
    if('message_pub' in localStorage){
      this.invalid=localStorage.getItem('message_pub');
      this.alert_show=false;
    }
    
  }
  show_hide() {//Click Event : used to show or hide password  
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
  remember_me(v:any){//Click Event: When a user close the application without log out,then on loading the page once again, he will be redirected to the same page 
    localStorage.setItem('pub_remember',v);
  //   alert(localStorage.getItem('pub_remember'));
  }
  close_alert() {//Click Event: Used to show or hide the alert div,on click on cross button on the alert div
    if('message_pub' in localStorage){
      this.alert_show=true;
      localStorage.removeItem('message_pub');
     }
     else{
      this.alert_div = document.getElementById('uploaded');
      this.alert_div.style.display = 'none';
     }


  
  }
  check_email_validity(event: any) {//Change Event: Used to check whether the provided email is valid or not.If not valid then the email_flag will be 0 and if valid then the email_flag will be 1
    var em = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!em.test(event.target.value)) { this.confirm_email = "Not a valid email id"; this.email_flag = 0; }
    else { this.confirm_email = ""; this.email_flag = 1; }
  }
  show(v1: string, v2: string) {//Click Event: Used for final submition of user_id and password
    if (v1 == '' || v2 == '') { //Usage: Used for checking whether the user_id or password field is empty or not
      if (v1 == '') //Usage: Used for checking whether the user_id field is empty or not
        this.check_email = "*Please provide email.";
      if (v2 == '') //Usage: Used for checking whether the  password field is empty or not
        this.check_pass = "*Please provide password";
    }
    else {//if user_id and password fields are not empty
       this.show_loader=false;
      if (this.email_flag == 1) {//if email is a valid email
        this.login.user_id = v1;
        this.login.user_pass = v2;
        this.publogin.login_pub(this.login).subscribe(data => {
          // console.log('Success!', data)
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
            this.alert_show = false;
            this.show_loader=true;
          }
          this.alert_div = document.getElementById('uploaded');
          this.alert_div.style.display = 'block';
        })
      }
      else {//if email is not a valid email
        this.alert_show = false;
        this.show_loader=true;

        this.alert_div = document.getElementById('uploaded');
        this.alert_div.style.display = 'block';
        this.invalid = 'Enter valid email id';
      }
    }
  }
}
