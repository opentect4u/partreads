import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { map, pluck } from 'rxjs/operators';
// import { PeriodicElement } from '../review-rating/review-rating.component';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
import { UserbookdetailspageComponent } from '../userbookdetailspage/userbookdetailspage.component';
import { NotificationserveService } from './notificationserve.service';
import { NotificationAdminService } from 'src/app/dashboard/adnminnotification/notification-admin.service';
import { PeriodicElement } from 'src/app/dashboard/review-rating/review-rating.component';

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
@ViewChild(MatAccordion) accordion!: MatAccordion;
  userData:any=[]; 
  substring:any='';
  category: any = [];
  loader:boolean=true;
  errormessage:any;
  msg:any='published'
  row:boolean=true;
  check_response:any=''
  constructor(private utilyT:UtilityTService,private toastr:ToastrManager,private cats:NotificationserveService,private router:Router,private bookpage:UserbookdetailspageComponent,private read:NotificationAdminService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = ['select','name','date','action'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
    this.cats.getData(localStorage.getItem('u-id'),localStorage.getItem('user-type_user'),localStorage.getItem('remember_token')).pipe(map(x => JSON.parse(x)),pluck("message")).subscribe((data:any) => {
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
  // this.dataSource.sort = this.sort;
  console.log(this.dataSource);
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
  // this.loader=true;
  // this.cats.remove_notification(localStorage.getItem('u-id'),localStorage.getItem('user-type_user'),localStorage.getItem('remember_token'),flag,table_id).subscribe(data=>{
  //   this.check_response=data;
  //   if(this.check_response.success==1){
  //     this.loader=false
  //     _index!= '-1' ? this.userData.splice(_index,1) : this.userData.splice(0,this.userData.length);
  //        this.utilyT.showToastr('Deletion successful','S');}
  //     else{this.loader=false;this.utilyT.showToastr('Deletion not possible,try again later','E');}
  // })
}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}

checkboxLabel(row?: PeriodicElement): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}

delete(){
  this.read.remove_notification('','',JSON.stringify(this.selection.selected)).pipe(pluck("success")).subscribe(res =>{
    if(res == 1){
        this.deleteRows();
        this.toastr.successToastr('Deletion successful','');
    }
    else{
      this.toastr.errorToastr('Deletion failed','');
    }
  })
}

deleteRows(){
  this.selection.selected.forEach((item) => {
    let index: number = this.userData.findIndex((d: any) => d === item);
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator = this.paginator;
  });
  this.selection = new SelectionModel<PeriodicElement>(true, []);
}

navigateToCorrsopondingPage(__items: any){
  console.log(__items);
  
 if(__items.subject == "BookUpload"){
     this.router.navigate(['/admin/publisherbooks']);
 }
 else if(__items.subject == 'NewUserRegister'){
   this.router.navigate(['/admin/user_details',__items.from_user_id]); 
 }
 else if(__items.subject == 'NewPublisherRegister'){
   this.router.navigate(['/admin/pub_details',__items.from_user_id]); 
 }

}

}
