import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ForgetpasswordService } from 'src/app/user-profile/user-forget-password/forgetpassword.service';

@Component({
  selector: 'app-publisherforgotpassword',
  templateUrl: './publisherforgotpassword.component.html',
  styleUrls: ['./publisherforgotpassword.component.css',
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
]
})
export class PublisherforgotpasswordComponent implements OnInit {
  alert_show:boolean=true;
  invalid:any='';
  check_response:any;
  alert_show_success:boolean=true;
  load:boolean=false;
  email_flag=0;
  constructor(private Forgetpassword:ForgetpasswordService,private toastr:ToastrManager) { }

  ngOnInit(): void {
  }

  show(email:any){
    this.load=true;
    if(email!=''){
      this.Forgetpassword.forget_password(email).subscribe(data=>{
        this.check_response=data;
        if(this.check_response.success==1){
        // this.invalid=this.check_response.message;
        // this.alert_show_success=false;
        this.load=false;
        this.toastr.successToastr(this.check_response.message,'');
        }
        else{
          // this.invalid=this.check_response.message
          // this.alert_show=false;
          this.load=false;
          this.toastr.errorToastr(this.check_response.message,'');
        }
        },
        error=>{
          this.load=false;this.toastr.errorToastr('Something went wrong! please try again later','');
  
        })
    }
    else{
      this.load=false;
      this.toastr.errorToastr('Please provide email','');
    }
     
  }
  close_alert(){this.alert_show=true;}
  close_alert_success(){this.alert_show_success=true;}

  check_valid_email(event: any) {//keyup Event: This event is for checking the provided email is valid or not
    var em = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!em.test(event.target.value)) { 
      // this.confirm_email = "Not a valid email id"; 
      this.email_flag = 0;$('#errorEmail').show('slow');
    }
    else { 
      // this.confirm_email = ""; 
      this.email_flag = 1;$('#errorEmail').hide('slow');
  } }
}
