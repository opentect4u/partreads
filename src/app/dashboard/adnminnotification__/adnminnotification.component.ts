import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { map, pluck } from 'rxjs/operators';
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

  userData:any=[];
  loader:boolean=true;
  substring:any='';
  errormessage:any;
  msg:any='uploaded';
  row:boolean=true;
  check_response:any='';
  constructor(private toastr:ToastrManager,private read:NotificationAdminService,private router:Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = ['Image','Notification'];

  dataSource = new MatTableDataSource<any>([]);

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
     this.userData.length=0;
    this.read.get_admin_notification(localStorage.getItem('token')).pipe(map(x => JSON.parse(x)),pluck('message')).subscribe(data => {
      // this.userData =JSON.parse(data);
      this.userData = data;
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
  this.dataSource.sort = this.sort;

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
  this.read.remove_notification(flag,table_id).subscribe(data=>{
    console.log(data);
    this.check_response=data;
    if(this.check_response.success==1){
      // this.fetch_data();
      this.loader=false;
      _index!= '-1' ? this.userData.splice(_index,1) : this.userData.splice(0,this.userData.length);
      this.toastr.successToastr('Deletion successful','');
    }
    else{
      this.loader=false;
      this.toastr.errorToastr('Deletion not possible,try again later','');
    }
  })
}
































}
