import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
import { AdminorderhistoryserveService } from './adminorderhistoryserve.service';
declare var XLSX:any;
@Component({
  selector: 'app-admin-payemthistory',
  templateUrl: './admin-payemthistory.component.html',
  styleUrls: ['./admin-payemthistory.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class AdminPayemthistoryComponent implements OnInit {
  loading:boolean=false;
@ViewChild('logForm') LogForm!:NgForm;
displayedColumns: any[] = ['No', 'bookname', 'publishername','authorname','orderId', 'TotalPurchasedPages','Amount','DateOfPurchase'];
dataSource=new MatTableDataSource();
x:any;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
 order_history:any=[];
 maxDate:any;
 message:any;
 base_dt:any=[];
  constructor(private utilyT:UtilityTService,private orderHistory:AdminorderhistoryserveService) { }

  ngOnInit(): void {this.loading=true;this.fetchData();
  }
  fetchData(){
    this.orderHistory.getOrderHistory().subscribe(data=>{
      console.log(data);
      this.order_history.length=0;
       this.order_history=data;
        this.order_history=this.order_history.message;
        if(this.order_history.length > 0){
          for(let i=0;i<this.order_history.length;i++){
            if(this.order_history[i].book_details!=null){
               this.base_dt.push({book_name:this.order_history[i].book_details.book_name,publisher_name:this.order_history[i].book_details.publisher_name
             ,order_id:this.order_history[i].order_id,book_page_no:this.order_history[i].book_page_no,author_name:this.order_history[i].book_details.author_name,
             total_price:this.order_history[i].total_price,date:this.order_history[i].date});
            }
          }
         }
         this.putdata(this.base_dt);
        // this.putdata(this.order_history);
     })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  putdata(v:any){
    console.log(v.length);
    this.dataSource=new MatTableDataSource(v);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
   this.loading=false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

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
         this.orderHistory.getOrderHistoryByDate(this.LogForm.form.value.startDate,this.LogForm.form.value.endDate).subscribe(data=>{
          this.order_history.length=0;
          this.base_dt.length=0;
           this.order_history=data;
            this.order_history=this.order_history.message;
            // this.putdata(this.order_history);
            if(this.order_history.length > 0){
              for(let i=0;i<this.order_history.length;i++){
               this.base_dt.push({book_name:this.order_history[i].book_details.book_name,publisher_name:this.order_history[i].book_details.publisher_name
                 ,order_id:this.order_history[i].order_id,book_page_no:this.order_history[i].book_page_no,author_name:this.order_history[i].book_details.author_name,
                 total_price:this.order_history[i].total_price,date:this.order_history[i].date});
              }
             }
             this.putdata(this.base_dt);
         })
     }

  }
  getToday(){//For Getting Date Only
    return new Date().toISOString().substring(0,10);
  }

  importAsXlsx(){

      let data=document.getElementById('data_table');
      var fp=XLSX.utils.table_to_book(data,{sheet:'Sheet1'});
      XLSX.write(fp,{
        bookType:'xlsx',
        type:'base64'
      });
      XLSX.writeFile(fp,'Payment.xlsx');
    }
}
