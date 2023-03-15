import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeforgetpassService } from './changeforgetpass.service';

@Component({
  selector: 'app-change-forgot-password',
  templateUrl: './change-forgot-password.component.html',
  styleUrls: ['./change-forgot-password.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class ChangeForgotPasswordComponent implements OnInit {
  alert_show:boolean=true;
  msg:any='';
  con_pass:any;
  pass:any;
  user_id:any;
  chack_response:any;
  constructor(private router:Router,private activatedroute:ActivatedRoute,private changeforgetpassword:ChangeforgetpassService) { }

  ngOnInit(): void {
    if('message' in localStorage){
      localStorage.removeItem('message')
    }
    this.activatedroute.params.forEach((params: any) => {
      this.user_id= params['user_id'];
    console.log(this.user_id);
    
    })
    this.con_pass=document.getElementById('con_pass');
    this.pass=document.getElementById('pss');
  }

  change_password(pass:any,new_pass:any){
    if(pass==new_pass){
         this.changeforgetpassword.change_forgot_password(this.user_id,pass).subscribe(data=>{
       this.chack_response='';
       this.chack_response=data;
         if(this.chack_response.success==1){
           localStorage.setItem('message',this.chack_response.message);
           this.router.navigate(['/user/userlogin']);
         }
         else{
          this.alert_show=false;
          this.msg="Something went wrong,please try again later";
         }
         })
    }
    else{
      this.alert_show=false;
      this.msg="Password and confirm password does not match";
    }
  }
  close_alert(){
    this.alert_show=true;
  }
  change_type(type:any){
    if(type=='pass'){
      this.pass.type=this.pass.type=='text'?'password':'text';
    }
    else{
      this.con_pass.type=this.con_pass.type=='text'?'password':'text';
    }
  }

}
