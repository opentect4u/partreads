import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {Chart } from 'chart.js';
import { PubdashboardserviceService } from './pubdashboardservice.service';
import { BooklistService } from 'src/app/booklist.service';
import { pubid } from 'src/app/pubid';
import { map } from 'rxjs/internal/operators/map';
import { pluck } from 'rxjs/operators';
import { PDFDocument } from 'pdf-lib';

// import * as Chart from 'chart.js';
//declare const myFunction: any;
declare const showprofile:any;
@Component({
  selector: 'app-publisher-dashboard',
  templateUrl: './publisher-dashboard.component.html',
  styleUrls: ['./publisher-dashboard.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css'
]
})
export class PublisherDashboardComponent implements OnInit {
 
  constructor(private booklistshow: BooklistService,private cookieService:CookieService,private router:Router,private dashboardservice:PubdashboardserviceService) { }
  colors1:any=[];
  colors2:any=[];
  colors3:any=[];
  colors4:any=[];
  getAllBooks:any=[];
   get_headerVal:any;
  ngOnInit(): void {
    this.getBooks();
    this.dashboardservice.getdetailsofheader(localStorage.getItem('pub-id')).subscribe(data=>{
      console.log(data);
      this.get_headerVal=data;
      console.log(this.get_headerVal.message.earned_amount);
    })
    localStorage.setItem('address','/publisher/publisher-dashboard');

    for(let i=0;i<5;i++){
      this.colors1.push('#'+Math.floor(Math.random()*16777215).toString(16));
}
    var MyPie = new Chart('pie3', {
      
      type: 'line',
      data : {
        labels:['Red','Green','Blue','Orange','Yellow'],
        datasets: [{
          data:[12,29,56,25,60],
          backgroundColor: 'rgba(0,0,255,1)',
          fill:false,
          borderColor:'rgba(0,0,255,1)',
          borderWidth: 1,
          lineTension:0.5
         
        }]
      },
      options: {
        legend: {
          display: false
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
    for(let i=0;i<5;i++){
      this.colors2.push('#'+Math.floor(Math.random()*16777215).toString(16));
}
    var MyPie = new Chart('pie2', {
      
      type: 'bar',
      data : {
        labels:['Aug','Jul','Jun','May','Apr'],
        datasets: [{
          data:[12,29,56,40,60],
          backgroundColor: [
            'rgba(255, 0, 0, 0.3)',
            'rgba(0,255,0, 0.3)',
            'rgba(0, 0, 255, 0.3)',
            'rgba(221, 110, 15, 0.3)',
            'rgba(255, 255, 0, 0.3)',
            
          ],
         
          borderWidth: 1
         
        }]
      },
      options: {
        legend: {
          display: false
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
    for(let i=0;i<5;i++){
      this.colors3.push('#'+Math.floor(Math.random()*16777215).toString(16));
}
    var MyPie = new Chart('pie1', {
      
      type: 'pie',
      data : {
        labels:['Law Book 1','Law Book 2','Law Book 3','Law Book 4','Law Book 5'],
        datasets: [{
          data:[12,29,50,21,60],
          backgroundColor:[
            'rgba(255, 0, 0, 0.4)',
            'rgba(0,255,0, 0.4)',
            'rgba(0, 0, 255, 0.4)',
            'rgba(221, 110, 15, 0.3)',
            'rgba(255, 255, 0, 0.4)',
            
          ],
         
          borderWidth: 1
         
        }]
      },
      options: {
        legend: {
          display: false
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
    for(let i=0;i<5;i++){
      this.colors4.push('#'+Math.floor(Math.random()*16777215).toString(16));
}
    var MyPie = new Chart('pie0', {
      
      type: 'doughnut',
      data : {
        labels:['Law Book 1','Law Book 2','Law Book 3','Law Book 4','Law Book 5'],
        datasets: [{
          data:[12,29,60,40,34],
          backgroundColor: [
            'rgba(255, 0, 0, 0.4)',
            'rgba(0,255,0, 0.4)',
            'rgba(0, 0, 255, 0.4)',
            'rgba(221, 110, 15, 0.3)',
            'rgba(255, 255, 0, 0.4)',
            
          ],
          
          borderWidth: 1
         
        }]
      },
      options: {
        legend: {
          display: false
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
  show(){
    
  showprofile();
 
  }
 logout(){
   localStorage.removeItem('pub-token');
   localStorage.setItem('pub-loggedin','false');
   this.cookieService.delete('pub-cookie-name');
   this.router.navigate(['/publisher/logpub']);
 }

 getBooks(){
   var dt =new pubid(localStorage.getItem('pub-id'));
  this.booklistshow.getBooks(dt).pipe(map(x=>JSON.parse(x)),pluck('message')).subscribe(response => {

            //  this.getAllBooks =response.filter((e:any) => e.uploadad_page_count!=e.total_page_count);
            var dt = response;
            dt.forEach((e:any) => {
                //  console.log(e);
                this.getPageCount(e);
                 
            })
  })
 }

 async  getPageCount(_data: any){

    const formPdfBytes = await fetch(_data.full_book_path).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const pageCount = pdfDoc.getPageCount();
    if(pageCount != _data.uploadad_page_count){
    this.getAllBooks.push(_data)
    }

}
}

