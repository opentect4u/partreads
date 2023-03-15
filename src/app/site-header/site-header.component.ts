import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';
import { PublisherLogoutServiceService } from '../publisher-logout-service.service';
import { CookieService } from 'ngx-cookie-service';
import { PubsiderbarinfoService } from '../pubsiderbarinfo.service';
import { ChangepasswordserveService } from './changepasswordserve.service';
import { NotificationbelliconspubService } from './notificationbelliconspub.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PublishnotificationsService } from '../publisher-profile/publishernotification/publishnotifications.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UtilityTService } from '../Utility/utility-t.service';
import { AlertDialogComponent } from '../user-profile/alert-dialog/alert-dialog.component';
declare const showprofile:any;
declare var $:any;
@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css',
  '../../assets/cssfiles/bootstrap.css',
  '../../assets/cssfiles/font-awesome.css',
  '../../assets/chosen/chosen.css',
  '../../assets/cssfiles/apps.css',
  '../../assets/cssfiles/res.css',
  '../../assets/cssfiles/apps_inner.css'
]
})
export class SiteHeaderComponent implements OnInit,OnDestroy{
  @Output() outputFromChild : EventEmitter<string> = new EventEmitter();
  show_loader=true;
  searchData:any=[];
   searchKeyWord:any='name';
  constructor(private utiliT:UtilityTService,public dialog: MatDialog,private pub:PublishnotificationsService,  public toastr: ToastrManager,private cookie:CookieService, private c:ChangepasswordserveService, private pblogout:PublisherLogoutServiceService,private pubinfo:PubsiderbarinfoService,private not_count:NotificationbelliconspubService) { 
    this.utiliT.sendShowHideContactButton(false);
  }
  profile:any;
  inpt_chk:any;
  userdata:any;
  chpdata:any;
  show_notif=false;

  publisherdata:any=[];
  let_count:any='';
  counter:boolean=true;
  user:any;
  old_not:any;
  new_not:any;
  inpt_pass:any;
  inpt_con:any;
  userDataFilter:any=[];
  userData:any=[];
  count=0;
  msg:any='Admin has ';
  inpt_old_pss:any;
  showNotification:any=[];
  Name:any;
  hide = true;hide1=true;hide2=true
  ngOnInit(): void {
    this.inpt_pass=document.getElementById("pss");
    this.inpt_con=document.getElementById("con_pss");
    this.inpt_old_pss=document.getElementById("old_pss");
    this.not_count.get_count(localStorage.getItem('pub-id')).subscribe(data=>{
      console.log(data);
      this.publisherdata=JSON.parse(data);
      console.log(this.publisherdata.Notification_count);
      this.let_count=this.publisherdata.Notification_count.toString();
      console.log(this.let_count);
      if(this.let_count== 0 || localStorage.getItem('address')=='/publisher/notification'){
           this.counter=true;
       }
       else{
         this.counter=false;
         this.old_not=this.let_count;
        
       }
  });
     this.user=interval(20000).subscribe(val =>{
      this.not_count.get_count(localStorage.getItem('pub-id')).subscribe(data=>{
        console.log(data);
        this.publisherdata=JSON.parse(data);
        console.log(typeof(this.publisherdata.Notification_count));
        this.let_count=this.publisherdata.Notification_count.toString();
        console.log(typeof(this.let_count));
        console.log(this.publisherdata.Notification_count);
        console.log(this.let_count);
        if(this.let_count== 0 || localStorage.getItem('address')=='/publisher/notification'){
             this.counter=true;
         }
         else{
           this.counter=false;
           this.new_not=this.let_count;
           if(this.new_not!=this.old_not)
           {
            // this.count_dif=Number(this.new_not)-Number(this.old_not);
            // console.log(this.count_dif);
            this.toastr.warningToastr(this.let_count+" Unread",'You have new notifications')
            this.old_not=this.new_not;
           }
         }
    })
    });
     this.pubinfo.get_pub_info(localStorage.getItem('pub-id')).subscribe(data=>{console.log(data);
      this.userdata=JSON.parse(data);  
      this.profile=this.userdata.message[0].image_url;
      this.Name=this.userdata.message[0].name;
      this.outputFromChild.emit(this.Name)
      })
  }
 show(){showprofile();}
 logout(){
   this.pblogout.logout_pub();
 }
 Logout(){
   this.dialog.open(AlertDialogComponent, {
    width: '400px',
    data:{_b_id:'',_pub_id:'',_flag:'L',_type:'P'}
  });

 }
 count_it() {
  $('#pub_notification').show();
  this.counter = true;
  this.pub.get_notification(localStorage.getItem('pub-id')).subscribe(data => {
    console.log(data);
   //  this.userData=JSON.parse(data);
   this.show_notif=true
    this.userDataFilter=JSON.parse(data);
    for(let i=0;i<this.userDataFilter.message.length;i++){
      if(this.userDataFilter.message[i].subject=='BookUpload')
       this.userData[this.count++]=this.userDataFilter.message[i]
    }
    // console.log(this.let_count)
    if(this.let_count!='0')
       this.showNotification=this.userDataFilter.message.slice(0,this.let_count)
       else
       {
        //  alert("hi")
       this.showNotification=this.userDataFilter.message.slice(0,3)
       }
         this.show_notif=true;
       
         console.log(this.showNotification)
    // console.log(this.userData.slice(0,2))
  })
  // this.user.unsubscribe();
}
 ngOnDestroy() {
  this.user.unsubscribe();
}

// change_type(){

// if(this.inpt_con.type=="text" && this.inpt_con.type=="text" && this.inpt_old_pss=="text")
// {
//   this.inpt_con.type="password";
//   this.inpt_pass.type="password";
//   this.inpt_old_pss.type="password";
// }
// else
// {
//   this.inpt_pass.type="text";
//   this.inpt_con.type="text";
//   this.inpt_old_pss.type="text";
// }
 
// }



//For Change type of input field (password)
change_type(type:any){
  if(type=='new_pass'){
    this.inpt_pass.type=this.inpt_pass.type=='password'?'text':'password';
  }
  else if(type=="con_pass"){
     this.inpt_con.type=this.inpt_con.type=='password'?'text':'password';
  }
  else if(type="old_pass"){
    this.inpt_old_pss.type=this.inpt_old_pss.type=='password' ? 'text' : 'password';
  }
}
// For Submitting Passwords
change_pass(v1:any,v2:any,old_password:any){ 
  this.show_loader=false;
  
  if(v1==v2 && v1!=''){ 
    this.c.change_pass(this.cookie.get('pub-cookie-name'),v1,old_password).subscribe(data=>{console.log(data)
    this.chpdata=JSON.parse(data);
    if(this.chpdata.success=='1'){
      this.show_loader=true;
      this.toastr.successToastr('Password changed successfully!.', '');
      const modal_close=document.getElementById('close_mymodal_changepass');
      modal_close?.click();

     }
    else{
      this.show_loader=true;
      this.toastr.errorToastr('Old password does not exist', '');
    }
  
  },error=>{
    console.log("error");
    this.show_loader=true;
    this.toastr.errorToastr('There was an error while updating password.', '');
  })
  }
  else
    {
      this.show_loader=true;
      this.toastr.errorToastr('Password fields do not match!', 'Oops!');
    }
}
openmodal(){$('#old_pss').val('');$('#pss').val('');$('#con_pss').val('');}
}


// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: '../user-profile/alert-dialog/alert-dialog.component.html',
// })
// export class DialogOverviewExampleDialog {
//   constructor(private pblogout:PublisherLogoutServiceService,
//     public dialogRef: MatDialogRef<AlertDialogComponent>,
//   ) {}
//   logOutUser(){
//     this.dialogRef.close();
//     this.pblogout.logout_pub();
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }