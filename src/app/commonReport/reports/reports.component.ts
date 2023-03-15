import { Component,OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDashboardServiceService } from 'src/app/user-profile/user-dashboard/user-dashboard-service.service';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
declare var $:any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class ReportsComponent implements OnInit {
  @ViewChild('logForm') logform!:NgForm;
  // u_type:any=localStorage.getItem('user-type_user')
  u_type:any;//Contain user type , that is used to show/hide header +sidebar for publisher/user conditionally
  check_response:any;//Get response after submitted report data 
  loading:boolean=true;//For show/hide loader
  message:any;//contain successfull or error message
  uploaded_file:any='';//Contain file that are to be uploaded
  constructor(private utilyT:UtilityTService,private userService:UserDashboardServiceService) { }
  ngOnInit(): void {
    localStorage.setItem('address','reports');
    if('user-type_user' in localStorage){this.u_type=localStorage.getItem('user-type_user');}
    else if('user-type' in localStorage){this.u_type=localStorage.getItem('user-type');}
  }
  submit(logForm:any){
    if(this.logform.invalid){
       return ;
    }
    this.message='';
    this.loading=false;
    var Id=this.u_type=='U' ? localStorage.getItem('u-id') : localStorage.getItem('pub-id');
    var remember_token=this.u_type=='U' ? localStorage.getItem('remember_token') : '';
    this.userService.postreports(Id,this.u_type,remember_token,this.logform.form.value.subject,this.logform.form.value.description,this.uploaded_file).subscribe(data=>{
        this.check_response=JSON.parse(data);
        if(this.check_response.success==1){
          this.message='A Report with id '+this.check_response.message.report_id+' has been generated successfully';
          this.loading=true;
          this.utilyT.showToastr(this.message,'S');
         $('#reset').click();
      }
        else{this.loading=true;this.utilyT.showToastr("Server didn't responds! please try again later",'E');
      }
    })
  }
  fileChangeevent(event:any){
    this.message='';
    var size=Math.round((event.target.files[0].size/1024));
    console.log(size);
    if(size <= 1024){
    if(event.target.files[0].name.split('.')[1]=='pdf' || event.target.files[0].name.split('.')[1]=='jpg' ||  event.target.files[0].name.split('.')[1]=='jpeg' || event.target.files[0].name.split('.')[1]=='doc' || event.target.files[0].name.split('.')[1]=='docx' || event.target.files[0].name.split('.')[1]=='png' || event.target.files[0].name.split('.')[1]=='csv' || event.target.files[0].name.split('.')[1]=='xlsx')
      {this.uploaded_file=event.target.files[0]; }
     else{
      this.utilyT.showToastr('Please provide valid file format','E');
      }
    }
    else{
      this.utilyT.showToastr('Size of file must be less than or equal to 1MB','E');

    }
  }
}
