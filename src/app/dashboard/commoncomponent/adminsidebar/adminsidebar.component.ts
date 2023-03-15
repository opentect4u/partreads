import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { NotificationcountAdminService } from './notificationcount-admin.service';

@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css',
  '../../../../assets/adminassets/css/font-awesome.css',
  '../../../../assets/adminassets/css/apps.css',
  '../../../../assets/adminassets/css/apps_inner.css',
  '../../../../assets/adminassets/css/res.css']
})
export class AdminsidebarComponent implements OnInit {




  admin:any;
  admindata:any=[];
  let_count:any='';
  counter:boolean=true;


  constructor(private router:Router,private cookieService:CookieService, private authserv:AuthService) { }
  gen_coupon:any;
  use_coupon:any;
  all_bk:any;
  pub_mgmt:any;
  u_mgmt:any;
  cat_mgmt:any;
  subcat_mgmt:any;
  review_rating:any;
  hard_copy:any;
  user_report:any;
  publisher_report:any;
  payment_history:any;
  comm_mgmt:any;

  type:any;
 ngOnInit(): void {

  this.all_bk=localStorage.getItem('all_bk');
  this.pub_mgmt=localStorage.getItem('pub_mgmt');
  this.u_mgmt=localStorage.getItem('user_mgmt');
  this.cat_mgmt=localStorage.getItem('cat_mgmt');
  this.subcat_mgmt=localStorage.getItem('subcat_mgmt');
  this.type=localStorage.getItem('admin_type')
  this.publisher_report=localStorage.getItem("p_report")
  this.payment_history=localStorage.getItem("pay_history")
  this.comm_mgmt=localStorage.getItem("com_mgmt")
  this.review_rating=localStorage.getItem("rev_rat")
  this.hard_copy=localStorage.getItem("h_copy")
  this.user_report=localStorage.getItem("u_report");
   this.gen_coupon=localStorage.getItem('gen_coupon');
  this.use_coupon= localStorage.getItem("used_coupon");
 }
  


  logout()
  {
    this.authserv.logout();
    this.cookieService.delete('cookie-name');
    this.router.navigate(['/admin/login']);
  }

  go_to(mode:any)
  {
    this.router.navigate(['/admin/reports',mode]);
  }

}
