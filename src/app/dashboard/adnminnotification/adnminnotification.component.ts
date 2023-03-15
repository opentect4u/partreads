import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { map, pluck } from 'rxjs/operators';
import { PeriodicElement } from '../review-rating/review-rating.component';
import { NotificationAdminService } from './notification-admin.service';

@Component({
  selector: 'app-adnminnotification',
  templateUrl: './adnminnotification.component.html',
  styleUrls: ['./adnminnotification.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class AdnminnotificationComponent implements OnInit {
  displayedColumns: string[] = ['select','name','date','action'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<PeriodicElement>(true, []);
  userData:any=[];
  loader:boolean=true;
  // loader:any;
  substring:any='';
  errormessage:any;
  msg:any='uploaded';
  row:boolean=true;
  check_response:any='';
  subject:boolean=true;
  currDate:any=new Date()
  yestDate:any=new Date();
  constructor(private toastr:ToastrManager,private read:NotificationAdminService,private router:Router) { }
  @ViewChild('paginator',{static:true}) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  
  // displayedColumns: string[] = ['Image','Notification'];

  // dataSource = new MatTableDataSource<any>([]);

  

  ngOnInit(): void {
    this.fetch_data();
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
    //  this.userData.length=0;
    this.read.get_admin_notification(localStorage.getItem('token')).pipe(map(x => JSON.parse(x)),pluck('message')).subscribe(data => {
      // this.userData =JSON.parse(data);
      this.userData = Object.assign(data);
      // this.currDate = new Date();
      // this.yestDate = new Date();
      this.yestDate = new Date(this.yestDate.setDate(this.yestDate.getDate()-1))
      // this.currDate = `${this.currDate.getFullYear()}-${this.currDate.getMonth()>9 ? this.currDate.getMonth() : '0'+this.currDate.getMonth()}-${this.currDate.getDate() > 9 ? this.currDate.getDate() : '0'+this.currDate.getDate()}`
      // this.yestDate = `${this.yestDate.getFullYear()}-${this.yestDate.getMonth()>9 ? this.yestDate.getMonth() : '0'+this.yestDate.getMonth()}-${this.yestDate.getDate() > 9 ? this.yestDate.getDate() : '0'+this.yestDate.getDate()}`
      // console.log(this.currDate, this.yestDate);
      
      for(let dt of this.userData){
        console.log(new Date(dt.date.split(' ')[0]),this.currDate);
        
        dt.date = new Date(dt.date.split(' ')[0]) == this.currDate ? 'Today' : (new Date(dt.date.split(' ')[0]) == this.yestDate ? 'Yesterday' : dt.date)
      }
      console.log(this.userData);
      
        this.put_data(this.userData);
       this.loader=false;

      }, error => {
      this.toastr.errorToastr('Server not respond! please try again later')
      this.loader=false;
    })
}
public put_data(v:any[]) {
  this.dataSource = new MatTableDataSource(v);
  this.dataSource.paginator = this.paginator;
  // this.dataSource.sort = this.sort;
  console.log(this.dataSource);

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
  // this.read.remove_notification(flag,table_id).subscribe(data=>{
  //   console.log(data);
  //   this.check_response=data;
  //   if(this.check_response.success==1){
  //     this.toastr.successToastr('Deletion successful','');
  //     this.fetch_data();
  //   }
  //   else{
  //     this.loader=false;
  //     this.toastr.errorToastr('Deletion not possible,try again later','');
  //   }
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

