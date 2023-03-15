import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewDetailsService } from './view-details.service';
import {Chart } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
declare var $:any;
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css',
  '../../../../assets/adminassets/css/font-awesome.css',
  '../../../../assets/adminassets/css/apps.css',
  '../../../../assets/adminassets/css/apps_inner.css',
  '../../../../assets/adminassets/css/res.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private view:ViewDetailsService) { }
  dataSource=new MatTableDataSource();
  displayedColumns: string[] = ['No.','coupon used','book name','date'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id:any;
  details:any;
  p_name: string=' ';
  p_email: string=' ';
  p_phone: string=' ';
  p_street: string=' ';
  p_city:string=' ';
  p_pin: string=' ';
  p_state: string=' ';
  p_country:string=' ';
  profile: any;
  chartCategory:any=[];
  chartPercentage:any=[];
  profile_image: any;
  book_details:any=[];
  color:any=[];
  pay_date:any=[];
  tot_pay:any=[];
  p_pincode:any;
  b_color:any=[];
  load:boolean=false;
  u_type:any='';
  coupon_used:any=[];
  ngOnInit(): void {
    debugger;
    this.id=this.activatedRoute.snapshot.params['id'];
    this.view.getUserDetails(this.id).subscribe(data=>{
      // console.log(data)
    this.details=JSON.parse(data);
    
    // console.log(this.details.allcategory.length)
    for(let i=0;i<this.details.allcategory.length;i++){
      this.chartCategory[i]=this.details.allcategory[i].category_name
      this.chartPercentage[i]=this.details.allcategory[i].percentage
      this.color[i]="#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
    }
    this.p_name =  this.details.message[0]?.name;
    this.p_email =  this.details.message[0]?.email;
    this.p_phone =  this.details.message[0]?.phone;
    this.u_type= this.details.message[0]?.type;
    this.p_street =  this.details.message[0]?.street==undefined?'': this.details.message[0]?.street;
    this.p_city =  this.details.message[0]?.city==undefined?'': this.details.message[0]?.city;
    this.p_country =  this.details.message[0]?.country==undefined?'': this.details.message[0]?.country;
    this.p_pin =  this.details.message[0]?.pincode==undefined?'': this.details.message[0]?.pincode;
    this.p_state =  this.details.message[0]?.state==undefined?'': this.details.message[0]?.state;
    // this.profile =  this.details.message[0]?.image_url=='' ||this.details.message[0]?.image_url==undefined || this.details.message[0]?.image_url==null ? 'https://bootdey.com/img/Content/avatar/avatar7.png' : this.details.message[0]?.image_url;
    this.profile =  this.details.message[0]?.image_url=='' ||this.details.message[0]?.image_url==undefined || this.details.message[0]?.image_url==null ? '/assets/images/user_avatar7.png' : this.details.message[0]?.image_url;

    this.profile_image =  this.details.message[0]?.profile_image=='' ||this.details.message[0]?.profile_image==undefined || this.details.message[0]?.profile_image==null ? '' : this.details.message[0]?.profile_image;
    this.p_pincode=this.details.message[0]?.pincode==undefined || this.details.message[0]?.pincode=='' || this.details.message[0]?.pincode==null ? 'N/A':this.details.message[0]?.pincode;
    this.book_details=this.details.visitbook;
    for(let i=0;i<this.details.visitbook.length;i++)
    {
      this.book_details[i]=this.details.visitbook[i];
      // console.log(this.book_details[i].category_name);
    }
    this.details.payment_history.reverse();
    for(let i=0;i<this.details.payment_history.length;i++){
      this.pay_date[i]=new Date(this.details.payment_history[i].date).toString().substring(0,15);
      this.tot_pay[i]=this.details.payment_history[i].total_payment;
      this.b_color[i]="#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
        }
        if(this.details.used_coupon.length!=0){
          for(let i=0;i<this.details.used_coupon.length;i++){
            this.coupon_used.push({
              coupon_code:this.details.used_coupon[i].coupon_code,
              created_at:this.details.used_coupon[i].created_at,
              book_name:this.details.used_coupon[i].book_details.book_name,
            })
         }
         this.fetchdata(this.coupon_used);
         this.dataSource=new MatTableDataSource(this.coupon_used)
        }
  
    if(this.book_details.length > 0){$('#book_detail_0').slideDown('slow');}    
       if(this.chartPercentage.length > 0 && this.chartPercentage.length > 0){
        var MyPie = new Chart('pie1', {   
          type: 'pie',
          data : {
            labels:this.chartCategory,
            datasets: [{
              data:this.chartPercentage,
              backgroundColor:this.color,
              borderWidth: 0
            
            }]
          },
          options: {
            legend: {
              display: true
          },
            elements:{
              arc:{
                borderWidth:0
              }
            },
            
            responsive:true,
            maintainAspectRatio:true,
            }
        })
      }
      if(this.pay_date.length > 0 && this.tot_pay.length > 0){
        var MyPie = new Chart('bar1', {
          type: 'line',
          data : {
            labels:this.pay_date,
            datasets: [{
              data: this.tot_pay,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              pointBorderColor: this.b_color,
              pointBorderWidth:1
            }]
          },
          options: {
            legend: {
              display: false
            },
            scales:{
              yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
            },
            elements:{
                arc:{
                  borderWidth:0
                }
            },
            
            responsive:true,
              maintainAspectRatio:true,
            }
        })
      }
        this.load=true
      })
  }
fetchdata(coupon_code:any[]){
 this.dataSource=new MatTableDataSource(coupon_code);
 this.dataSource.paginator=this.paginator;
 this.dataSource.sort=this.sort;
}

  slidedown(index:any){
    for(let i=0;i<this.book_details.length;i++){
      if($('#book_detail_'+i).is(':visible')){
        $('#book_detail_'+i).slideUp("slow");
      }
    }
    if($('#book_detail_'+index).is(':visible')){
      $('#book_detail_'+index).slideUp("slow");
    }
    else{
      $('#book_detail_'+index).slideDown("slow");
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
