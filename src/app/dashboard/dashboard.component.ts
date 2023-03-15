import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PublisherserviceService } from './publishers/publisherservice.service';
import { DataService } from '../data.service';
import { TopfiveService } from './topfive.service';
import {Chart } from 'chart.js';
// import {Chart } from 'chart.js';
// import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
  '../../assets/adminassets/css/font-awesome.css',
  '../../assets/adminassets/css/apps.css',
  '../../assets/adminassets/css/apps_inner.css',
  '../../assets/adminassets/css/res.css']
})
export class DashboardComponent implements OnInit {
  
  userData:any=[];
  userData1:any=[]
  u:any;
  topbooks:any=[];
  top_1:any;
  top_2:any;
  top_3:any;
  top_4:any;
  top_5:any;
  top_array:any=[];
  constructor(private top:TopfiveService, private router:Router, private cookieService:CookieService,private authserv:AuthService, private data1:PublisherserviceService,private data2:DataService) { }
pub:any;
  ngOnInit(): void {

    var MyPie = new Chart('pie1', {
      
      type: 'line',
      data : {
        labels:['Red','Green','Blue','Orange','Yellow'],
        datasets: [{
          data:[12,29,59,60,60],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            
          ],
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
  
    this.top.getTopFive().subscribe(data=>{
      // console.log(data)
    this.topbooks=JSON.parse(data);
    for(let i=0;i<this.topbooks.message.length;i++){
      if(this.topbooks.message[i].book_details!=null){
        console.log('index:'+i);
        this.top_array[i]=this.topbooks.message[i].book_details.book_name;
      }
    }

    // this.top_1=this.topbooks.message[0].book_details.book_name?this.topbooks.message[0].book_details.book_name:'';
    // this.top_2=this.topbooks.message[1].book_details.book_name?this.topbooks.message[1].book_details.book_name:'';
    // this.top_3=this.topbooks.message[2].book_details.book_name?this.topbooks.message[2].book_details.book_name:'';
    // this.top_4=this.topbooks.message[3].book_details.book_name?this.topbooks.message[3].book_details.book_name:'';
    // this.top_5=this.topbooks.message[4].book_details.book_name?this.topbooks.message[4].book_details.book_name:'';
    })
    localStorage.setItem('address','/admin/dashboard');
    var id = localStorage.getItem('token1');
    var name=this.cookieService.get('cookie-name');
    if(name=='')
    this.router.navigate(['/admin/login']);
    this.data1.get_apipublisher().subscribe((data:any)=>{
      this.userData=JSON.parse(data),
      // console.log(this.userData);
      this.pub=this.userData.message.length;
      // console.log(this.userData.message.length);
      // this.loading=false;
       
      // this.put_data();
   
   })
   this.data2.get_api().subscribe((data:any)=>{
    this.userData1=JSON.parse(data);

    // for(let i=0;i<this.userData.message.length;i++){
    //  console.log(this.userData.message[i].updated_at);
    //  this.date=Date.parse(this.userData.message[i].updated_at);
    this.u=this.userData1.message.length;
    // console.log(this.u);
    // console.log(this.date);
    // }
   
    // this.loading=false;
    //  this.put_data();
  })
    // setInterval(()=>{ 
      // this.top.getTopFive().subscribe(data=>{console.log(data)
      //   this.topbooks=data;
      //   this.topbooks=JSON.parse(data);
      //   console.log(this.topbooks.message[0].book_details.book_name);
    
    
      //   })
       this.data1.get_apipublisher().subscribe((data:any)=>{
      this.userData=JSON.parse(data),
      // console.log(this.userData);
      this.pub=this.userData.message.length;
      // console.log(this.userData.message.length);
      // this.loading=false;
       
      // this.put_data();
   
   })
   this.data2.get_api().subscribe((data:any)=>{
    this.userData1=JSON.parse(data);

    // for(let i=0;i<this.userData.message.length;i++){
    //  console.log(this.userData.message[i].updated_at);
    //  this.date=Date.parse(this.userData.message[i].updated_at);
    this.u=this.userData1.message.length;
    // console.log(this.u);
    // console.log(this.date);
    // }
   
    // this.loading=false;
    //  this.put_data();
  })
// },1000)
  
}
  logout()
  {
    this.authserv.logout();
    this.cookieService.delete('cookie-name');
    this.router.navigate(['/admin/login']);
  }

}
