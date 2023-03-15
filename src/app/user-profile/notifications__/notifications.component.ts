import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { map, pluck } from 'rxjs/operators';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
import { UserbookdetailspageComponent } from '../userbookdetailspage/userbookdetailspage.component';
import { NotificationserveService } from './notificationserve.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css'
 ]
})
export class NotificationsComponent implements OnInit {
  userData:any=[]; 
  substring:any='';
  category: any = [];
  loader:boolean=true;
  errormessage:any;
  id:any;
  user_type:any;
  remembertoken:any;
  msg:any='published'
  row:boolean=true;
  check_response:any=''
  constructor(private utilyT:UtilityTService,private toastr:ToastrManager,private cats:NotificationserveService,private router:Router,private bookpage:UserbookdetailspageComponent) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = ['Image','Notification'];

  dataSource = new MatTableDataSource<any>([]);
  
  ngOnInit(): void {
    this.fetch_data();
    localStorage.setItem('address','/user/notifications');
}
 applyFilter(event: Event) {
   this.row=false;
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

public fetch_data() { 
    this.id=localStorage.getItem('u-id');
    this.user_type=localStorage.getItem('user-type_user');
    this.remembertoken=localStorage.getItem('remember_token');
    this.cats.getData(this.id,this.user_type,this.remembertoken).pipe(map(x => JSON.parse(x)),pluck("message")).subscribe((data:any) => {
      this.userData = data;
      this.loader=false;
        this.put_data(this.userData);
      }, (errorMessage:any) => {
      this.substring = errorMessage.substr(0, 3);
      if (this.substring != 'und') {                      
        this.errormessage = errorMessage.substr(11, 132);      

        // this.router.navigate(['404pagenotfound', this.substring]);
        this.toastr.warningToastr("Something went wrong , please try again later",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000,maxShown:'1'})
      }
      else {
        this.substring = errorMessage.substr(18, 27);

        // this.router.navigate(['404pagenotfound', this.substring]);
        this.toastr.warningToastr("Something went wrong , please try again later",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000,maxShown:'1'})
      }
    })
}
public put_data(v:any[]) {
  this.dataSource = new MatTableDataSource(v);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}


got_book_details_page(book_id:any,pub_id:any){
  localStorage.setItem('user_book_id',book_id);
  localStorage.setItem('user_pub_id',pub_id);
  this.bookpage.ngOnInit();
  this.router.navigate(['/user/bookdetails']);
}

expandMore(index:any){
  if($('#matcard'+index).is(':visible')){
    $('#date_'+index).fadeOut('slow');
    $('#Date_'+index).fadeIn('slow');
    $('#matcard'+index).slideUp("slow");
  }
  else{
    $('#Date_'+index).fadeOut('slow');
    $('#date_'+index).fadeIn('slow');
    $('#matcard'+index).slideDown("slow");
  }
  
}
clear_all_notification(flag:any,table_id:any,_index:any){
  this.loader=true;
  this.cats.remove_notification(this.id,this.user_type,this.remembertoken,flag,table_id).subscribe(data=>{
    this.check_response=data;
    if(this.check_response.success==1){
      this.loader=false
      _index!= '-1' ? this.userData.splice(_index,1) : this.userData.splice(0,this.userData.length);
         this.utilyT.showToastr('Deletion successful','S');}
      else{this.loader=false;this.utilyT.showToastr('Deletion not possible,try again later','E');}
  })
}

}
