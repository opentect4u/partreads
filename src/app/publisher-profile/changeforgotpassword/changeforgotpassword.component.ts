import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ChangeforgetpassService } from 'src/app/user-profile/change-forgot-password/changeforgetpass.service';

@Component({
  selector: 'app-changeforgotpassword',
  templateUrl: './changeforgotpassword.component.html',
  styleUrls: ['./changeforgotpassword.component.css',
  // '../../../assets/cssfiles/bootstrap.css',
  // '../../../assets/cssfiles/font-awesome.css',
  // '../../../assets/chosen/chosen.css',
  // '../../../assets/cssfiles/apps.css',
  // '../../../assets/cssfiles/res.css',
  // '../../../assets/cssfiles/apps_inner.css'
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps__login.css',
  '../../../assets/cssfiles/res.css'
]
})
export class ChangeforgotpasswordComponent implements OnInit {
  load:boolean=false;
  alert_show:boolean=true;
  msg:any='';
  con_pass:any;
  pass:any;
  user_id:any;
  chack_response:any;
  constructor(private toastr:ToastrManager,private router:Router,private activatedroute:ActivatedRoute,private changeforgetpassword:ChangeforgetpassService) { }

  ngOnInit(): void {
    if('message_pub' in localStorage){
      localStorage.removeItem('message_pub')
    }
    this.activatedroute.params.forEach((params: any) => {
      this.user_id= params['user_id'];
    console.log(this.user_id);
    
    })
    this.con_pass=document.getElementById('con_pass');
    this.pass=document.getElementById('pss');
  }

  change_password(pass:any,new_pass:any){
    this.load=true;
    if(pass!='' && new_pass!==''){
    if(pass==new_pass){
         this.changeforgetpassword.change_forgot_password(this.user_id,pass).subscribe(data=>{
       this.chack_response='';
       this.chack_response=data;
         if(this.chack_response.success==1){
           this.load=false;
           localStorage.setItem('message_pub',this.chack_response.message);
          //  this.router.navigate(['/publisher/logpub']);
          this.router.navigate(['/publisher/publishernav']);
         }
         else{
          // this.alert_show=false;
          this.load=false;
          this.msg="Something went wrong,please try again later";
          this.toastr.errorToastr(this.msg,'')
         }
         })
    }
    else{
      // this.alert_show=false;
      this.load=false;
      this.msg="Password and confirm password does not match";
     this.toastr.errorToastr(this.msg,'')

    }
   }
   else{
    this.load=false;
    this.toastr.errorToastr('Please provide passwords.')
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
