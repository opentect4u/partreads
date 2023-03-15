import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CouponusedService } from './couponused.service';

@Component({
  selector: 'app-used-coupon',
  templateUrl: './used-coupon.component.html',
  styleUrls: ['./used-coupon.component.css',
  '../../../assets/adminassets/css/font-awesome.css',
  '../../../assets/adminassets/css/apps.css',
  '../../../assets/adminassets/css/apps_inner.css',
  '../../../assets/adminassets/css/res.css']
})
export class UsedCouponComponent implements OnInit {
  show_loader:boolean=true;
  dataSource=new MatTableDataSource();
  displayedColumns: string[] = ['No.','book name','total coupon', 'used coupon', 'coupon remain'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allCoupons:any=[];
  AllCoupons:any=[];
  constructor(private coupon_used:CouponusedService) { }

  ngOnInit(): void {
    this.fetchdata();
  }
  fetchdata(){
    this.coupon_used.getAllcouponHistory().subscribe(data=>{
      this.AllCoupons.length=0;
      this.allCoupons.length=0;
       this.allCoupons=data;
       this.allCoupons=this.allCoupons.message;
       if(this.allCoupons.length > 0){
         for(let i=0;i<this.allCoupons.length;i++){
              if(this.allCoupons[i].book_details!=null){
             this.AllCoupons.push({
               book_name:this.allCoupons[i].book_details.book_name,
               total_coupon:this.allCoupons[i].total_coupon,
               used_coupon:this.allCoupons[i].used_coupon,
               remain_coupon:(this.allCoupons[i].total_coupon-this.allCoupons[i].used_coupon)
            })
          }
         }
       }
       this.putdata(this.AllCoupons)
    })
  }
  putdata(AllCoupons:any[]){
    console.log(AllCoupons)
    this.dataSource=new MatTableDataSource(AllCoupons);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
    this.show_loader=false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
