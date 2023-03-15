import { Component, OnInit } from '@angular/core';
import { ForgetpasswordService } from './forgetpassword.service';

@Component({
  selector: 'app-user-forget-password',
  templateUrl: './user-forget-password.component.html',
  styleUrls: ['./user-forget-password.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class UserForgetPasswordComponent implements OnInit {
  msg:any='';
  alert_show:boolean=true;
  check_response:any;
  constructor(private forgetpassword:ForgetpasswordService) { }

  ngOnInit(): void {
  }
  check_valid_email(event:any){
    
  }

  Check_password(email:any){
    this.forgetpassword.forget_password(email).subscribe(data=>{
      console.log(data);
      this.check_response=data;
      // this.check_response=JSON.parse(this.check_response)
      this.alert_show=false;
      if(this.check_response.success==1){
        this.msg=this.check_response.message;
        
      }
    else{
        this.msg=this.check_response.message;
      }
    })
  }
  close_alert(){
    this.alert_show=true;
  }

}
