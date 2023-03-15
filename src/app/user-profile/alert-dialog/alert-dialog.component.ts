import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { PublisherLogoutServiceService } from 'src/app/publisher-logout-service.service';
// import { DialogOverviewExampleDialog } from 'src/app/userheaderafterlogin/userheaderafterlogin.component';
import { UserlogoutService } from 'src/app/userlogout.service';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
import { map, pluck } from 'rxjs/operators';
export interface DialogData {
  _b_id:any,
  _pub_id:any,
  _flag:any,
  _type:any
}
@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class AlertDialogComponent implements OnInit {

  constructor(private utilyT:UtilityTService,private cookieService:CookieService, private authserv:AuthService,private router:Router, public dialogRef: MatDialogRef<AlertDialogComponent>,private uslg: UserlogoutService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private pblogout:PublisherLogoutServiceService,) { }
  check_response:any;
  ngOnInit(): void {
    console.log(this.data);
    
  }
  logOutUser(){
    switch(this.data._type){
      case 'P':this.pblogout.logout_pub();break;
      case 'U':this.uslg.logout_user();break;
      case 'A':this.authserv.logout(),this.cookieService.delete('cookie-name');this.router.navigate(['/admin/login']);
    }
    this.dialogRef.close();
   console.log('s')
  }
  onNoClick(): void {
    this.dialogRef.close(0);
  }
  delete(){
    //  this.utilyT.delete(this.data._b_id,this.data._pub_id).subscribe(res => {
    //   this.check_response = res;
    //    this.dialogRef.close(this.check_response.success);
    //    if(this.check_response.success > 0){this.utilyT.showToastr('Book Removed Successfully','S')}
    //    else{this.utilyT.showToastr('Book deletion not possible','E')}
    //  })
    this.dialogRef.close(1);
  }

}
