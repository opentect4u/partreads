import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddAdminService } from './add-admin.service';
import { ShoweditService } from './showedit.service';
@Component({
  selector: 'app-admins-add',
  templateUrl: './admins-add.component.html',
  styleUrls: ['./admins-add.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class AdminsAddComponent implements OnInit {
   load:boolean=true;
  constructor(private addAdmin:AddAdminService,private activatedRoute:ActivatedRoute,private showEdit:ShoweditService) { }
  review_rates=false;
  h_copy=false;
  u_reports=false;
  p_reports=false;
  pay_history=false;
  com_mgmt=false;
  p_mgmt=false;
  u_mgmt=false;
  cat_mgmt=false;
  subcat_mgmt=false;
  allbooks_mgmt=false;  
  gen_coupon:boolean=false;
  use_coupon:boolean=false;
  id:any;
  adminName='';
  adminEmail='';
  adminPhone='';
  readonly=false;
  adminData:any;
  pubDiv:any;
  userDiv:any;
  catDiv:any;
  subDiv:any;
  allDiv:any;
  x:any;
  m="";
  anm:any;
  aem:any;
  aphone:any;
  Review_rates:any;
  H_copy:any;
  U_reports:any;
  P_reports:any;
  Pay_history:any;
  Com_mgmt:any;
  Gen_Coupon:any;
  Used_coupon:any;

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.pubDiv=document.getElementById('pub1');
    this.userDiv=document.getElementById('u2');
    this.catDiv=document.getElementById('c3');
    this.subDiv=document.getElementById('s4');
    this.allDiv=document.getElementById('a5');
    this.Review_rates=document.getElementById('r6');
    this.H_copy=document.getElementById('h7');
    this.U_reports=document.getElementById('u8');
    this.P_reports=document.getElementById('p9');
    this.Pay_history=document.getElementById('ph10');
    this.Com_mgmt=document.getElementById('cm11');
    this.Gen_Coupon=document.getElementById('gc12');
    this.Used_coupon=document.getElementById('uc13');


    if(this.id!='0'){
        this.readonly=true;
        this.showEdit.show_edit_admin(this.id).subscribe(data=>{console.log(data)
        this.adminData=JSON.parse(data);
        this.adminName=this.adminData.message[0].user_name;
        this.adminEmail=this.adminData.message[0].user_id;
        this.adminPhone=this.adminData.message[0].mobile_no;
        this.pubDiv.checked=this.adminData.message[0].user_permission.publisher_manage=='Y'?true:false;
        this.userDiv.checked=this.adminData.message[0].user_permission.user_manage=='Y'?true:false;
        this.catDiv.checked=this.adminData.message[0].user_permission.category_manage=='Y'?true:false;
        this.subDiv.checked=this.adminData.message[0].user_permission.subcategory_manage=='Y'?true:false;
        this.allDiv.checked=this.adminData.message[0].user_permission.all_books=='Y'?true:false;
        this.Review_rates.checked=this.adminData.message[0].user_permission.review_rating=='Y'?true:false;
        this.H_copy.checked=this.adminData.message[0].user_permission.hard_copy=='Y'?true:false;
        this.U_reports.checked=this.adminData.message[0].user_permission.user_reports=='Y'?true:false;
        this.P_reports.checked=this.adminData.message[0].user_permission.publisher_reports=='Y'?true:false;
        this.Pay_history.checked=this.adminData.message[0].user_permission.payment_history=='Y'?true:false;
        this.Com_mgmt.checked=this.adminData.message[0].user_permission.commission_management=='Y'?true:false;
        this.Gen_Coupon.checked=this.adminData.message[0].user_permission.coupon_manage=='Y'?true:false;
        this.Used_coupon.checked=this.adminData.message[0].user_permission.used_coupon=='Y'?true:false;
        })
        this.load=false;
    }
    else
    {
      this.adminEmail='';
      this.adminName='';
      this.adminPhone='';
      this.readonly=false;
      this.pubDiv.checked=false;
      this.userDiv.checked=false;
      this.catDiv.checked=false;
      this.subDiv.checked=false;
      this.allDiv.checked=false;
      this.Review_rates.checked=false;
      this.H_copy.checked=false;
      this.U_reports.checked=false;
      this.P_reports.checked=false;
      this.Pay_history.checked=false;
      this.Com_mgmt.checked=false;
      this.Gen_Coupon.checked=false;
      this.Used_coupon.checked=false;
      this.load=false;
    }
  }
add_admin(a_name:any,a_email:any,a_phone:any){
  this.load=true;
  this.addAdmin.add_admin(this.id,a_name,a_email,a_phone,this.u_mgmt,this.p_mgmt,this.cat_mgmt,this.subcat_mgmt,this.allbooks_mgmt,this.review_rates,this.h_copy,this.u_reports,this.p_reports,this.pay_history,this.com_mgmt,this.gen_coupon,this.use_coupon).
   subscribe((data)=>{
     console.log(data);
     this.m="Insertion successful!";
     this.load=false;
     this.reset();
     this.myFunction();
   },error=>{
        this.m="Something went wrong! please try again later";
        this.load=false;
        this.myFunction();
   })

} 
check_privilege(e:any,i:any){
 switch(i){
   case 1:
     this.p_mgmt=e.target.checked;
     break;
   case 2:
     this.u_mgmt=e.target.checked;
     break;
   case 3:
     this.cat_mgmt=e.target.checked;
     break; 
   case 4:
     this.subcat_mgmt=e.target.checked;
     break;
   case 5:
     this.allbooks_mgmt=e.target.checked;
     break;
     case 6:
      this.review_rates=e.target.checked;
      break;
    case 7:
      this.h_copy=e.target.checked;
      break;
    case 8:
      this.u_reports=e.target.checked;
      break; 
    case 9:
      this.p_reports=e.target.checked;
      break;
    case 10:
      this.pay_history=e.target.checked;
      break;
    case 11:
      this.com_mgmt=e.target.checked;
      break;
    case 12:
      this.gen_coupon=e.target.checked;
      break;
      case 13:
        this.use_coupon=e.target.checked;
        break;
   }
  // console.log(this.p_mgmt+" "+this.u_mgmt+" "+this.cat_mgmt+" "+this.subcat_mgmt+" "+this.allbooks_mgmt+" "+this.review_rates+" "+this.h_copy+" "+this.u_reports+" "+this.p_reports+" "+this.pay_history+" "+this.com_mgmt);
}
edit_admin(a_name:any,a_email:any,a_phone:any){
  // console.log(a_name+" "+a_email+" "+a_phone)
  this.load=true;
  this.pubDiv=document.getElementById('pub1');
    this.userDiv=document.getElementById('u2');
    this.catDiv=document.getElementById('c3');
    this.subDiv=document.getElementById('s4');
    this.allDiv=document.getElementById('a5');
    this.Review_rates=document.getElementById('r6');
    this.H_copy=document.getElementById('h7');
    this.U_reports=document.getElementById('u8');
    this.P_reports=document.getElementById('p9');
    this.Pay_history=document.getElementById('ph10');
    this.Com_mgmt=document.getElementById('cm11');
    this.Gen_Coupon=document.getElementById('gc12');
    this.Used_coupon=document.getElementById('uc13');
    this.p_mgmt= this.pubDiv.checked;
    this.u_mgmt=this.userDiv.checked;
    this.cat_mgmt=this.catDiv.checked;
    this.subcat_mgmt=this.subDiv.checked;
    this.allbooks_mgmt=this.allDiv.checked;
    this.review_rates=this.Review_rates.checked
    this.h_copy=this.H_copy.checked
    this.u_reports=this.U_reports.checked
    this.p_reports=this.P_reports.checked
    this.pay_history=this.Pay_history.checked
    this.com_mgmt=this.Com_mgmt.checked;
    this.gen_coupon=this.Gen_Coupon.checked;
    this.use_coupon=this.Used_coupon.checked;
  console.log(this.p_mgmt+" "+this.u_mgmt+" "+this.cat_mgmt+" "+this.subcat_mgmt+" "+this.allbooks_mgmt+" "+this.review_rates+" "+this.h_copy+" "+this.u_reports+" "+this.p_reports+" "+this.pay_history+" "+this.com_mgmt+" "+this.gen_coupon);

  this.addAdmin.add_admin(this.id,a_name,a_email,a_phone,this.u_mgmt,this.p_mgmt,this.cat_mgmt,this.subcat_mgmt,this.allbooks_mgmt,this.review_rates,this.h_copy,this.u_reports,this.p_reports,this.pay_history,this.com_mgmt,this.gen_coupon,this.use_coupon).
   subscribe((data)=>{
     console.log(data);
     this.m="Update successful!";
     this.load=false;
     this.myFunction();
   },error=>{
        this.m="Something went wrong! please try again later";
     this.load=false;
     this.myFunction();
   })

} 
myFunction() {
  // Get the snackbar DIV
 this.x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  this.x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
}
reset(){
  this.adminEmail='';
  this.adminName='';
  this.adminPhone='';
  this.readonly=false;
  this.pubDiv.checked=false;
  this.userDiv.checked=false;
  this.catDiv.checked=false;
  this.subDiv.checked=false;
  this.allDiv.checked=false;
  this.userDiv=document.getElementById('u2');
  this.catDiv=document.getElementById('c3');
  this.subDiv=document.getElementById('s4');
  this.allDiv=document.getElementById('a5')
  this.pubDiv.checked=false;
  this.userDiv.checked=false;
  this.catDiv.checked=false;
  this.subDiv.checked=false;
  this.allDiv.checked=false;
  this.anm=document.getElementById('a_nm');
  this.anm.value='';
  this.aem=document.getElementById('a_em');
  this.aem.value='';
  this.aphone=document.getElementById('a_phone');
  this.aphone.value='';
  this.Com_mgmt.checked=false;
  this.Gen_Coupon.checked=false;
  this.Used_coupon.checked=false;
}
}
