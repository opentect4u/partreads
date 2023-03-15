import { Component, OnInit, ViewChild} from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { pluck } from 'rxjs/operators';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
import { GetOrderHistoryService } from './get-order-history.service';
declare var XLSX : any;
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class OrderHistoryComponent implements OnInit  {
  @ViewChild('logForm') LogForm!:NgForm;
  displayedColumns: any[] = ['No','orderId', 'bookname','authorname', 'TotalPurchasedPages','Amount','DateOfPurchase'];
  dataSource=new MatTableDataSource();
  x:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   order_history:any=[];
   maxDate:any;
   message:any;
   loading:boolean=true;
   base_dt:any=[];
  constructor(private utilyT:UtilityTService,private orderHistory:GetOrderHistoryService) { 
  }

  ngOnInit(): void {
    // this.loading=true;
    this.fetchdata();}
  fetchdata(){
     this.orderHistory.getOrderHistory(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).pipe(pluck('message')).subscribe(data=>{
      this.order_history=data;
      this.putdata();
     })
  }
  putdata(){
    this.dataSource=new MatTableDataSource(this.order_history);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
    //FOR SEARCH OF NESTED LEVEL IN ARRAY OF OBJECTS
  this.dataSource.filterPredicate = (data:any, filter: string) => {
    const accumulator = (currentTerm:any, key:any) => {
      return this.nestedFilterCheck(currentTerm, data, key);
    };
    const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
    // Transform the filter by converting it to lowercase and removing whitespace.
    const transformedFilter = filter.trim().toLowerCase();
    return dataStr.indexOf(transformedFilter) !== -1;
  }
    this.loading=false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim(); // Remove whitespace
    var FilterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = FilterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  submitDate(v:Form){
     if(this.LogForm.form.value.startDate > this.LogForm.form.value.endDate){
       this.message="From date can not be greater than to date";
      this.utilyT.showToastr(this.message,'E');
      }
     else{
         this.loading=true;
         this.orderHistory.getOrderHistoryByDate(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'),localStorage.getItem('remember_token'),this.LogForm.form.value.startDate,this.LogForm.form.value.endDate).pipe(pluck('message')).subscribe(data=>{
          this.order_history.length=0;
           this.order_history=data;
           this.putdata();
         })
     }

  }
  getToday(){//For Getting Date Only
    return new Date().toISOString().substring(0,10);
  }

  importAsXlsx(){
    this.loading =true;
      if(this.order_history.length > 0){
      let data=document.getElementById('data_table');
      var fp=XLSX.utils.table_to_book(data,{sheet:'Sheet1'});
      XLSX.write(fp,{
        bookType:'xlsx',
        type:'base64'
      });
      XLSX.writeFile(fp,'Payment.xlsx');
      this.loading =false;
    }
    else{
         this.loading =false;
         this.utilyT.showToastr('No payment history available to download','E');
    }
    }
    nestedFilterCheck(search:any, data:any, key:any) {
      if (typeof data[key] === 'object') {
        for (const k in data[key]) {
          if (data[key][k] !== null) {
            search = this.nestedFilterCheck(search, data[key], k);
          }
        }
      } else {
        search += data[key];
      }
      return search;
    }
}
