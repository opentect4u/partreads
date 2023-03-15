import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PublishnotificationsService } from './publishnotifications.service';

@Component({
  selector: 'app-publishernotification',
  templateUrl: './publishernotification.component.html',
  styleUrls: ['./publishernotification.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class PublishernotificationComponent implements OnInit {
  
  constructor(private pub:PublishnotificationsService,private toastr:ToastrManager) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = ['Image','Notification'];
  dataSource = new MatTableDataSource([]);
  userData:any=[];
  publisher_id:any;
  loader:boolean=true;
  row:boolean=true;
  msg:any='Admin has ';
  counter=0;
  userDataFilter:any=[];
  check_response:any='';
  ngOnInit(): void {
    console.log("ASA")
    this.counter=0;
       this.fetch_notification();
      localStorage.setItem('address','/publisher/notification');
  }


  public fetch_notification()
  {
     this.publisher_id=localStorage.getItem('pub-id');
    console.log(localStorage.getItem('pub-id'));
    // this.userData.length=0;
    this.userDataFilter.length=0;
   this.pub.get_notification(this.publisher_id).subscribe(data => {
     console.log(data);
    //  this.userData=JSON.parse(data);
     this.userDataFilter=JSON.parse(data);
    //  for(let i=0;i<this.userDataFilter.message.length;i++){
    //    if(this.userDataFilter.message[i].subject=='BookUpload')
    //     this.userData[this.counter++]=this.userDataFilter.message[i]
    //  }
     this.loader=false;
     
    //  console.log(this.userData);
     this.put_notification();
     });

  }
  public put_notification(){
    // this.dataSource = new MatTableDataSource(this.userData);
     this.dataSource = new MatTableDataSource(this.userDataFilter.message);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}
  applyFilter(event: Event) {
    this.row=false;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  expandMore(index:any){
    // $('#expand_more_'+index).toggleClass("down");
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
  clear_all_notification(flag:any,table_id:any){
    this.loader=true;
    this.pub.remove_notification(this.publisher_id,flag,table_id).subscribe(data=>{
      console.log(data);
      this.check_response=data;
      if(this.check_response.success==1){this.fetch_notification();this.toastr.successToastr('Deletion successful','');}
      else{this.loader=false;this.toastr.errorToastr('Deletion not possible,try again later','');}
    })
  }
}
