import { AfterViewInit, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';
/*For angular material*/
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PublisherserviceService } from './publisherservice.service';
import { ChangepubstatusService } from './changepubstatus.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

// export interface UserData {
//   name: any;
//   email: any;
//   address: any;
//   status: any;
// }
// const ELEMENT_DATA: UserData[] = [
//   {
//      name:'Penguin',
//       email:'penguinindia@gmail.com',
//       address:'Loudon St.',
//      status:'Active'
//      },
//      {
//       name:'McMillan',
//        email:'mcmillan@gmail.com',
//     address:'College Street',
//        status:'Active'
//       },
//        {
//         name:'Kiran Publishers',
//         email:'kiran@gmail.com',
//         address:'Park St.',
//         status:'active'
//       },
//       {
//         name:'Arya Publications',
//         email:'arya@gmail.com',
//         address:'Bhawanipur',
//          status:'active'  
//        },
//          {
//             name:"Corgi Books",
//           email:'corgibooks@gmail.com',
//           address:"Baker St.",
//           status:'active'
//       },
//       {
//           name:'Mobi Books',
//           email:'mobibooks@gmail.com',
//           address:'ChesterLee St.',
//           status:'active'
//         }
// ];

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class PublishersComponent implements AfterViewInit  {
  // displayedColumns: string[] = ['name', 'email', 'address', 'status'];
  // dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar,private toastr:ToastrManager,private ch:ChangepubstatusService, private router:Router, private cookieService:CookieService,private authserve:AuthService,private data1:PublisherserviceService) { }
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
 stat_data:any=[];
 pubStatus:any;
 
  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  
  // page:number=1;
  // totalrecords:number=0;
  show_checkmark:boolean=true;
  config:any;
  us_id:any;
  us_status:any;
  userData:any=[];
  loading:boolean=true;
  substring:any='';
  errormessage:any;
  reason='';
  i:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumns: string[] = ['#', 'Name', 'Email','Created Date','Updated Date','Status','View'];
  // displayedColumns: string[] = ['#', 'Book Name', 'Author Name', 'ISBN No.','Status'];
  dataSource= new MatTableDataSource<any>();

  modalopen:any;
  ngOnInit(): void {
    
    localStorage.setItem('address','/admin/publisher');
    this.fetch_data1();
  }

  // logout():void
  // {
  //   this.authserve.logout();
  //   this.cookieService.delete('cookie-name');
  //   this.router.navigate(['/admin/login']);
  // }

  ngAfterViewInit(): void {
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
  pageChanged(event:any){
    this.config.currentPage=event;

}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }

}




public fetch_data1() {
  this.data1.get_apipublisher().subscribe((data:any)=>{
        this.userData=JSON.parse(data),
        console.log(this.userData);
        this.loading=false;
         
        this.put_data();
     
     },
     
     (errorMessage) => {  
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
  this.dataSource = new MatTableDataSource(this.userData.message);
  console.log(this.userData);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

Inactive_me(v:any,v2:any,v3:any,status:any){
  // alert("Are you sure you want to Inactive??")
  this.i=v;
  this.us_id=v2;
  this.us_status=v3;
  this.pubStatus=status
  if(this.pubStatus==1)
  this.reason='';
  // console.log(v);
  $('#id02').fadeIn('slow');

//   this.modalopen=document.getElementById('myModal1');
//   this.modalopen.style.display='block'
}
change_status(){
//  alert(this.reason)
//  console.log(this.i+" "+this.us_id+" "+this.us_status);
this.show_checkmark=false;
 this.ch.change_status(this.i,this.us_status,this.us_id,this.reason).subscribe((data:any)=>{console.log(data)
this.stat_data=JSON.parse(data);
if(this.stat_data.success > 0){
 this.show_checkmark=true;
  this.fetch_data1();
  $('#id02').fadeOut('slow');
  this._snackBar.open('Status change successful', 'Close', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}
else{
  this.show_checkmark=true;
  this.toastr.errorToastr('Status change failed!','');
}
},error=>{
  this.show_checkmark=true;
  this.toastr.errorToastr('Status change failed!','');
})
}
closeModal(){
  $('#id02').fadeOut('slow');
  this.reason='';
}
viewDetails(id:any){
  this.router.navigate(['/admin/pub_details',id])
}
}
