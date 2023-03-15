import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MgmtcommisionService } from './mgmtcommision.service';
 declare var $:any;
@Component({
  selector: 'app-commission-mgmt',
  templateUrl: './commission-mgmt.component.html',
  styleUrls: ['./commission-mgmt.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class CommissionMgmtComponent implements OnInit {
  dataSource= new MatTableDataSource();
  @ViewChild('logForm') logform!:NgForm
  displayedColumns: any[] = ['No','publishername','publisherEmail','Amount','Action'];
   commission:any=[];
   publisher_id:any;
   @ViewChild(MatPaginator) matPaginator!:MatPaginator;
   @ViewChild(MatSort) matSort!:MatSort;
   loading:boolean=false;
   flag:any='D';
   check_response:any;
   pub_ammount:any;
   error:boolean=false;
   dt:any;
  constructor(private commissionService:MgmtcommisionService,private toastr:ToastrManager) { }

  ngOnInit(): void {this.loading=true;
    this.fetchdata('/api/admin/showcommissionmanage');
  }
  fetchdata(v:any){
    this.commissionService.getCommision(v).subscribe(data=>{
      console.log(data)
      this.commission=data;
      this.commission=this.commission.message;
      this.putdata(this.commission);
    },
    error=>{
      this.loading=false;
      this.toastr.errorToastr('Something went wrong! please try again later','');
    })
  }
  putdata(v:any){
    this.dataSource=new MatTableDataSource(v);
    this.dataSource.paginator=this.matPaginator;
    this.dataSource.sort=this.matSort;
    this.loading=false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
  }
  check_radio(event:any){
    this.loading=true;
    this.flag=event.value;
    this.displayedColumns=event.value=='D' ? ['No','publishername','publisherEmail','Amount','Action']:['No','publishername','publisherEmail','Amount','Date']
    this.fetchdata(event.value=='D' ? '/api/admin/showcommissionmanage': '/api/admin/paidcommissionmanage');
  }
  get_publisher(pub_name:any,ammount:any,pub_id:any){
       $('#pub_details').text(pub_name+' ( ₹'+ammount+' )');
       this.publisher_id=pub_id;
       this.pub_ammount=ammount;
  }
  submit_details(v:Form){
    // console.log("log", this.pub_ammount,this.logform.form.value.ammount) 
    this.loading=true;
    if(this.pub_ammount==this.logform.form.value.ammount || this.pub_ammount > this.logform.form.value.ammount){
     this.commissionService.postCommission(this.publisher_id,this.logform.form.value.ammount).subscribe(data=>{
       this.check_response=data;
       if(this.check_response.success==1){
         this.loading=false;
        this.fetchdata('/api/admin/showcommissionmanage');
        this.dt=document.getElementById('close_modal');
        this.dt.click();
           this.error=false;this.logform.form.value.ammount.clear();
       }
       else{
        this.error=false;
        this.loading=false;
       }
     })
    }
    else{
      this.loading=false;
      this.error=true;
    }
  }
}
