import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ILogin } from '../login';
import { LogserveService } from '../logserve.service';
import { ConnectionService } from 'ng-connection-service';
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
  '../../assets/adminassets/css/font-awesome.css',
  '../../assets/adminassets/css/apps.css',
  '../../assets/adminassets/css/apps_inner.css',
  '../../assets/adminassets/css/res.css'

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
export class LoginComponent implements OnInit {
  show_loader=true;

  Hide = true;
  show_alert:boolean=false;
  loggedin=false;
  loggedin1=false;
  loginForm:any;
  log=false;
  forget=true;
  sign=true;
  userData:any;
  k:string='';
  usermodel=new ILogin('admin', 'admin123');
  isConnected = true;
  noInternetConnection = false;
  notconnectedmodal:any
  notconnectedmodal1:any
  inpt_pass:any;
  constructor(private connectionService: ConnectionService, private formBuilder: FormBuilder,private router: Router,private cookieService:CookieService,private users:LogserveService) {    this.connectionService.monitor().subscribe(isConnected => {
    this.isConnected = isConnected;
    if (this.isConnected) {
      this.noInternetConnection = false;
      //alert("You are back online");
      this.notconnectedmodal1=document.getElementById('myModal1')
      this.notconnectedmodal1.style.display='block';
      this.notconnectedmodal=document.getElementById('myModal11')
      this.notconnectedmodal.style.display='none';
    }
    else {
      this.noInternetConnection = true;
      //alert("You are offline");
      this.notconnectedmodal1=document.getElementById('myModal1')
      this.notconnectedmodal1.style.display='none';
      this.notconnectedmodal=document.getElementById('myModal11')
      this.notconnectedmodal.style.display='block';
    }
  })

  }
  ngOnInit(): void {
    this.inpt_pass=document.getElementById("exampleInputPassword1");

   this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required],
     
   });
  }
  // // login_show()
  // // {
  // // this.log=false;
  // // this.forget=true;
  // // this.sign=true;
  
  // }
  // forgot_show()
  // {
  // this.log=true;
  // this.forget=false;
  // this.sign=true;

  // }
  // sign_show()
  // {
  // this.log=true;
  // this.forget=true;
  // this.sign=false;

  // }
  hide(){this.notconnectedmodal=document.getElementById('myModal11')
  this.notconnectedmodal.style.display='none';}
  hide1(){this.notconnectedmodal1=document.getElementById('myModal1')
  this.notconnectedmodal1.style.display='none';
  }
  get f() { return this.loginForm.controls; }

  login() {
    this.show_loader=false;
    if (this.loginForm.invalid) {
    this.show_loader=true;
        return;
    }
  /*  if(this.f.userid.value == 'sss_admin' && this.f.password.value == '123'){
      console.log(this.f.userid.value);
      this.usermodel.user_id=this.f.userid.value;
      this.usermodel.user_pass=this.f.password.value;
     this.users.getData(this.usermodel).subscribe(data=>{console.log('Success!',data); 
        this.userData=data;
       console.log(this.userData);
          
      },
      error=>console.log('Error!',error))
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token',this.f.userid.value);
      this.cookieService.set('cookie-name',this.f.userid.value);
      this.router.navigate(['/dashboard']);
    }*/
    else{
      this.usermodel.user_id=this.f.userid.value;
      this.usermodel.user_pass=this.f.password.value;
      const fb = new FormData();
      fb.append("user_id",this.f.userid.value);
  fb.append("user_pass",this.f.password.value);
     this.users.getData(fb).subscribe(data=>{console.log('Success!',data); 
        this.userData=data;
       console.log(this.userData);
       if(this.userData.success==1)
     {
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token',this.f.userid.value);
      this.cookieService.set('cookie-name',this.f.userid.value);
      localStorage.setItem('user-type_user', this.userData.message[0].user_type);

      if(this.userData.message[0].user_type=='B')
     { localStorage.setItem("all_bk",this.userData.message[0].user_permission.all_books)
      localStorage.setItem("cat_mgmt",this.userData.message[0].user_permission.category_manage)
      localStorage.setItem("subcat_mgmt",this.userData.message[0].user_permission.subcategory_manage)
      localStorage.setItem("pub_mgmt",this.userData.message[0].user_permission.publisher_manage)
      localStorage.setItem("user_mgmt",this.userData.message[0].user_permission.user_manage);
      localStorage.setItem("admin_type",this.userData.message[0].user_type);
      localStorage.setItem("rev_rat",this.userData.message[0].user_permission.review_rating)
      localStorage.setItem("h_copy",this.userData.message[0].user_permission.hard_copy)
      localStorage.setItem("u_report",this.userData.message[0].user_permission.user_reports)
      localStorage.setItem("p_report",this.userData.message[0].user_permission.publisher_reports)
      localStorage.setItem("pay_history",this.userData.message[0].user_permission.payment_history);
      localStorage.setItem("com_mgmt",this.userData.message[0].user_permission.commission_management);
      localStorage.setItem("gen_coupon",this.userData.message[0].user_permission.coupon_manage);
      localStorage.setItem("used_coupon",this.userData.message[0].user_permission.used_coupon);


    }
      else{
        localStorage.setItem("all_bk",'Y');
      localStorage.setItem("cat_mgmt",'Y');
      localStorage.setItem("subcat_mgmt",'Y');
      localStorage.setItem("pub_mgmt",'Y');
      localStorage.setItem("user_mgmt",'Y');
      localStorage.setItem("rev_rat",'Y');
      localStorage.setItem("h_copy",'Y');
      localStorage.setItem("u_report",'Y');
      localStorage.setItem("p_report",'Y');
      localStorage.setItem("pay_history",'Y');
      localStorage.setItem("com_mgmt",'Y');
      localStorage.setItem("gen_coupon",'Y');
      localStorage.setItem("used_coupon",'Y');
      localStorage.setItem("admin_type",this.userData.message[0].user_type)
      }
      this.router.navigate(['admin/dashboard']);
    
     }
     else if(this.userData.success==0){
        this.show_loader=true;
        console.log(this.userData.message);
        this.k=this.userData.message;
        this.show_alert=true;
    }
          
      },
      error=>console.log('Error!',error))
    
    }
}     

change_type(){this.inpt_pass.type= this.inpt_pass.type=='text' ? 'password' : 'text';}
hide_alert(){this.show_alert=false;}

}
