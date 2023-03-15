import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PaymentServiceService } from '../paymenthistory/payment-service.service';
declare var XLSX:any;
@Component({
  selector: 'app-publisher-commission',
  templateUrl: './publisher-commission.component.html',
  styleUrls: ['./publisher-commission.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class PublisherCommissionComponent implements OnInit {
  displayedColumns: any[] = ['orderId','Ammount','month','Date'];
  dataSource=new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Payment:any=[];
  loading:boolean=false;
  constructor(private commission:PaymentServiceService,private toastr:ToastrManager) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {this.loading=true;localStorage.setItem('address','/publisher/paymenthistory');this.fetchdata();}
   
  fetchdata(){
   this.commission.getPublisherCommissionHistory(localStorage.getItem('pub-id'),'','').subscribe(data=>{
     console.log(data); 
        this.Payment=data;
        this.putdata(this.Payment.message);
   })
  }
   putdata(v:any){
     this.dataSource=new MatTableDataSource(v);
     this.dataSource.sort=this.sort;
     this.dataSource.paginator=this.paginator;
     this.loading=false;
   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  importAsXlsx(){
    if(this.Payment.message.length > 0){
    let data=document.getElementById('data_table');
    var fp=XLSX.utils.table_to_book(data,{sheet:'Sheet1'});
    XLSX.write(fp,{
      bookType:'xlsx',
      type:'base64'
    });
    XLSX.writeFile(fp,'Commission.xlsx');}
    else{
      this.toastr.errorToastr('No data available to download','');
    }
  }

  submit(v:NgForm){
    this.loading=true;
    console.log(v.form.value.startDate,v.form.value.enddate);
    if(v.form.value.startDate > v.form.value.enddate){
    this.loading=false;this.toastr.errorToastr('Start date must not exceed end date','');
    }
    else{
      this.commission.getPublisherCommissionHistory(localStorage.getItem('pub-id'),v.form.value.startDate,v.form.value.enddate).subscribe(data=>{
         this.loading=false;
        console.log(data);
        this.Payment.length=0;
        this.Payment=data;
        this.putdata(this.Payment.message);
      },
      error=>{
        this.loading=false;
        this.toastr.errorToastr('Something went wrong! please trye again later','');
      })
    }
  }
  getToday(){//For Getting Date Only
    return new Date().toISOString().substring(0,10);
  }
}
