import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';
import { DataService } from '../../data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ChanguserstatService } from './changuserstat.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class UsersComponent implements OnInit {
  modal_type:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  show_checkmark:boolean=true;
  constructor(private _snackBar: MatSnackBar,private toastr:ToastrManager,private ch:ChanguserstatService, private router:Router,private cookieService:CookieService,private authserv:AuthService,private data11:DataService) { }
  userData:any=[];
  user_detials:any=[];
  page:number=1;
  totalrecords:number=0;
  config:any;
  cats:any;
  show=true;
  datatable=false;
  us_id:any;
  us_stat:any;
  pubStatus:any;
  // table:boolean=false;
  // p_tag:boolean=true;
  errormessage:any;
  // public errorMsg:any;
  loading:boolean=true;
  substring:any='';
  i:any;
  reason='';
  admin_remarks:any='';
  tab_id:any='';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  check_response:any='';
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumns: string[] = ['#', 'Name', 'Email','createdDate','updatedDate','Status','View'];
  // displayedColumns: string[] = ['#', 'Book Name', 'Author Name', 'ISBN No.','Status'];
  dataSource= new MatTableDataSource([]);




  ngOnInit(): void {
    localStorage.setItem('address','/admin/users');
     this.fetch_data();


    // var id = localStorage.getItem('token1');
    // var name=this.cookieService.get('cookie-name');
    // if(name=='')
    // this.router.navigate(['/login']);
    //   this.data.get_api().subscribe(data=>{
    //       this.userData=data;
    //   });
    //   this.config={
    //     itemsPerPage: 3,
    //     currentPage: 1,
    //     totalRecords: this.userData.length}
  }
  // logout()
  // {
  //   this.authserv.logout();
  //   this.cookieService.delete('cookie-name');
  //   this.router.navigate(['/admin/login']);
  // }
 
  // pageChanged(event:any){
  //   this.config.currentPage=event;
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
  }


  public fetch_data() {
    this.userData.length=0;
    this.user_detials.length=0;
    this.data11.get_api().subscribe((data:any)=>{
          this.userData=JSON.parse(data);
          for(let i=0;i<this.userData.message.length;i++){
            if(this.userData.message[i].user_details!=null){
               this.user_detials.push({_id:this.userData.message[i]._id,
                user_name:this.userData.message[i].user_name,
                user_id:this.userData.message[i].user_id,
                phone:this.userData.message[i].user_details.phone,
                type:this.userData.message[i].user_details.type,
                user_status:this.userData.message[i].user_status,
                admin_remarks:this.userData.message[i].admin_remarks!=undefined ? this.userData.message[i].admin_remarks : ''
              })
            }
          }
         
          this.loading=false;
          console.log(this.user_detials);
           this.put_data();
       },(errorMessage) => {  
        this.loading=false;
        console.log("Error Status:" + errorMessage)
        this.substring = errorMessage.substr(0, 3);

        if (this.substring != 'und') {
          // console.log("After Cutting:" +this.substring)                         
          console.error('error caught in component')
          this.errormessage = errorMessage.substr(11, 132);
          //  console.log("Error:" +  this.errormessage);
        
          console.log("this.substring:" + this.substring);
          // this.router.navigate(['404pagenotfound', this.substring]);
          this.toastr.warningToastr("Something went wrong , please try again later",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000,maxShown:'1'})
        }
        else {
          this.substring = errorMessage.substr(18, 27);
          console.log(this.substring);
          // this.router.navigate(['404pagenotfound', this.substring]);
          this.toastr.warningToastr("Something went wrong , please try again later",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000,maxShown:'1'})

        }
       });
   
  }
  public put_data() {
    // this.dataSource = new MatTableDataSource(this.userData.message);
    this.dataSource = new MatTableDataSource(this.user_detials);
    // console.log(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  Inactive_me(v:any,v2:any,v3:any,status:any){
    // console.log(v);
    this.modal_type='S';
    this.i=v;
    this.us_stat=v2;
    this.us_id=v3;
    this.pubStatus=status
    if(this.pubStatus==1)
    this.reason='';
    $('#id02').fadeIn('slow')
    //  alert("Are you sure you want to Inactive??")
  }

change_status(){console.log(this.i)
  // alert(this.reason)
  // this.loading=true;
  this.show_checkmark=false;
  this.ch.change_status(this.i,this.us_stat,this.us_id,this.reason).subscribe((data:any)=>{
    console.log(data);
    this.check_response=JSON.parse(data);
    if(this.check_response.success > 0){
      this.fetch_data();
     this.show_checkmark=true; 
     $('#id02').fadeOut('slow');
     this._snackBar.open('Status change successful', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    } 
    else{
      this.show_checkmark=true;
      this.toastr.errorToastr('Submition failed!!','')
    }
  },error=>{
    this.show_checkmark=true;
    this.toastr.errorToastr('Submition failed!!','')
  })
}
viewDetails(id:any){this.router.navigate(['/admin/user_details',id])}
OpenModal(admin_remarks:any,table_id:any){
// console.log(this.admin_remarks);
this.modal_type='N';
// this.show_checkmark=admin_remarks==''? true : false;
this.admin_remarks='';this.admin_remarks=admin_remarks;this.tab_id=table_id;
$('#id02').fadeIn('slow');

}
closeModal(){$('#id02').fadeOut('slow');
this.reason='';
this.admin_remarks='';
this.modal_type='';

}
saveItem(){
  // this.loading=true;
  this.show_checkmark=false;
  this.ch.add_annotation(this.admin_remarks,this.tab_id).subscribe(data=>{
    // console.log(data);
    this.check_response=JSON.parse(data);
    if(this.check_response.success==1){
    //  this.loading=false;
    this.show_checkmark=true;
      this.fetch_data();
      $('#id02').fadeOut('slow');
      this._snackBar.open('Note Addition Successfull!!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else{
    this.show_checkmark=true;
      // this.loading=false;
      // this._snackBar.open('Note Addition Failed!!', 'Close', {
      //   horizontalPosition: this.horizontalPosition,
      //   verticalPosition: this.verticalPosition,
      // });
      this.toastr.errorToastr('Note Addition Failed!!','');
    }
  },error=>{
    this.show_checkmark=true;
    // this._snackBar.open('Note Addition Failed!!', 'Close', {
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
    this.toastr.errorToastr('Note Addition Failed!!','');

  })
}
}


