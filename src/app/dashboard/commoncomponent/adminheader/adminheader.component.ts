import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import { ConnectionService } from 'ng-connection-service'
import { NotificationcountAdminService } from '../adminsidebar/notificationcount-admin.service';
import { interval } from 'rxjs';
import { ChangepasswordserveService } from 'src/app/site-header/changepasswordserve.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
import { AlertDialogComponent } from 'src/app/user-profile/alert-dialog/alert-dialog.component';
import { GlobalConstants } from 'src/app/globalvar/global';
// import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
// import { AuthService } from '../../auth.service';
declare var showprofile: any;

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css',
  '../../../../assets/adminassets/css/font-awesome.css',
  '../../../../assets/adminassets/css/apps.css',
  '../../../../assets/adminassets/css/apps_inner.css',
  '../../../../assets/adminassets/css/res.css'



       ]
})
export class AdminheaderComponent implements OnInit,OnDestroy {
  show_spinner:boolean=false;
  hideold=true;
  hidecon=true;
  hidenew=true;
  isConnected = true;
  notconnectedmodal:any
  notconnectedmodal1:any
  noInternetConnection = false;
  admin:any;
  admindata:any=[];
  let_count:any='';
  counter:boolean=true;
  profile:any;
  input_old_pass: any;
  inpt_pass:any;
  inpt_con: any;
  mymodal_changepass:any;
  chpdata:any;
  show_load:boolean=false;
  constructor(public dialog: MatDialog,private toastr:ToastrManager,private ch:ChangepasswordserveService,private connectionService: ConnectionService, private router:Router,private cookieService:CookieService, private authserv:AuthService,private notifyadmin:NotificationcountAdminService) {
    this.connectionService.monitor().subscribe(isConnected => {
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
  logout()
  {
    this.authserv.logout();
    this.cookieService.delete('cookie-name');
    this.router.navigate(['/admin/login']);
  }
  ngOnInit(): void {
    this.inpt_pass=document.getElementById("pss");
    this.inpt_con=document.getElementById("con_pss");
    this.input_old_pass=document.getElementById('old_pss')
    // this.profile="https://partreads.com/partreadsapi/public/admin.png";
    this.profile = GlobalConstants.apiURL+'/public/admin.png';
    this.admin=interval(15000).subscribe(val =>{
      this.notifyadmin.get_notification_Count(localStorage.getItem('token')).subscribe(data=>{
        console.log(data);
        this.admindata=JSON.parse(data);
        console.log(typeof(this.admindata.Notification_count));
        this.let_count=this.admindata.Notification_count.toString();
        console.log(typeof(this.let_count));
        console.log(this.admindata.Notification_count);
        console.log(this.let_count);
        if(this.let_count== 0 || localStorage.getItem('address')=='/publisher/notification'){
             this.counter=true;
         }
         else{
           this.counter=false;
         }
      })
    })
  }
  show() { showprofile(); }
  hide(){this.notconnectedmodal=document.getElementById('myModal11')
  this.notconnectedmodal.style.display='none';}
  hide1(){this.notconnectedmodal1=document.getElementById('myModal1')
  this.notconnectedmodal1.style.display='none';
  // if(localStorage.getItem('address')!='/publisher/ebookupload')
  // location.reload();
  }
  ngOnDestroy() {
    this.admin.unsubscribe();
  }
  show_hide_password(){
    //  this.inpt_chk=document.getElementById("show_pass");
  if(this.input_old_pass.type=='text'){
    this.input_old_pass.type='password';
  }
  else{
    this.input_old_pass.type='text';

  }
  }
  change_type(type:any){
    if(type=='new_pass'){
      this.inpt_pass.type=this.inpt_pass.type=='password'?'text':'password';
    }
    else{
       this.inpt_con.type=this.inpt_con.type=='password'?'text':'password';
    }
  
    //  this.inpt_chk=document.getElementById("show_pass");
    // if(this.inpt_con.type=="text" && this.inpt_con.type=="text")
    // {
    //   this.inpt_con.type="password";
    //   this.inpt_pass.type="password";
    //   this.input_old_pass.type="password";
    // }
    // else
    // {
    //   this.inpt_pass.type="text";
    //   this.inpt_con.type="text";
    //   this.input_old_pass.type="text";

    // }
  
    }
    change_pass(old_password:any,v1:any,v2:any){
    this.show_load=true;
    if(v1==v2&&v1!='')
    { 
      this.ch.change_pass1(localStorage.getItem('u-id'),localStorage.getItem('user-type_user'),localStorage.getItem('remember_token'),this.cookieService.get('u_cookie-name'),v1,old_password).subscribe(data=>{console.log(data)
      this.chpdata=JSON.parse(data);
      if(this.chpdata.success=='1'){
      this.toastr.successToastr('Password changed successfully!.', '');
      this.mymodal_changepass=document.getElementById('close_mymodal_changepass');
      this.mymodal_changepass.click();
      this.show_load=false;
    }
      else{
      this.show_load=false;
      this.toastr.errorToastr('Old password does not match.', '');
      }
      
      },error=>{ this.show_load=false; this.toastr.errorToastr('There was an error while updating password.', '');})
    }
    else
    {
      this.show_load=false;
      this.toastr.errorToastr('Password fields do not match!', '');
    }
      
    
    }
    opendialog(): void {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '400px',
        data:{_b_id:'',_pub_id:'',_flag:'L',_type:'A'}
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        // console.log('The dialog was closed');
      });
    }
}


// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: '../../../user-profile/alert-dialog/alert-dialog.component.html',
// })
// export class DialogOverviewExampleDialog {
//   constructor(private utiliT:UtilityTService, private authserv:AuthService,private cookieService:CookieService,private router:Router,
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//   ) {this.utiliT.sendShowHideContactButton(false)}
//   logOutUser(){
//     this.dialogRef.close();
//     this.authserv.logout();
//     this.cookieService.delete('cookie-name');
//     this.router.navigate(['/admin/login']);

//   }

//   onNoClick(): void {
//     this.dialogRef.close();}
//   }
