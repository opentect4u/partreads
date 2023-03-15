import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AllbooksearchService } from './allbooksearch.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WithoutsearchvalueService } from './withoutsearchvalue.service';
import {trigger, style, animate, transition} from '@angular/animations';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-allbooks',
  templateUrl: './allbooks.component.html',
  styleUrls: ['./allbooks.component.css',
    '../../assets/cssfiles/bootstrap.css',
    '../../assets/cssfiles/font-awesome.css',
    '../../assets/chosen/chosen.css',
    '../../assets/cssfiles/apps.css',
    '../../assets/cssfiles/res.css',
    '../../assets/cssfiles/apps_inner.css'],
    animations: [
      trigger('fade', [ 
        transition('void => *', [
          style({ opacity: 0 }), 
          animate(1000, style({opacity: 1}))
        ]) 
      ])
    ]
})
export class AllbooksComponent implements OnInit {
   
  constructor(private toastr:ToastrManager,private router: Router, private allb: AllbooksearchService, private route: ActivatedRoute,private without:WithoutsearchvalueService) { }
  bookname: any;
  // Color of the progress bar//
  color1: ThemePalette = 'warn';
  color2: ThemePalette = 'accent';
  color3: ThemePalette = 'warn';
  // End///////////////////////
  mode: ProgressBarMode = 'buffer';
  
  bufferValue = 100;
  p:number=1;
  bookname1: any;
  search_value: any;
  bookdata: any = [];
  id:any;
  nomatch='';
  showmsg=false;
  loader=true;
  avgRate:any=[];
  avgrt:any;
  errormessage:any;
  substring:any='';
  minRange=0;
  maxRange=2;
  ratingsArr1:any;
 sumRatings=0;
 reviewData:any=[];
 reviewData1:any=[];
 individualRating:any;
 reviewBookName:any;
 reviewModalDiv:any;
 ratingData:any=[];
 rate_5=0;
 rate_4=0;
 rate_3=0;
 rate_2=0;
 rate_1=0;
 t1=0;
 t2=0;
 t3=0;
 t4=0;
 t5=0;

  ngOnInit(): void {

    this.route.params.forEach((params: any) => {
      this.search_value = params['search_value'];
      // console.log("id="+this.search_value);
  });
  
  // console.log("id outside="+this.search_value);
  //   console.log("if part "+this.search_value);
   if(this.search_value==undefined){
    this.without.getbooks().subscribe(data => {
      // console.log("DATA:" +data);
      var obj = JSON.parse(data);
      this.loader=false;
      this.bookdata.length = 0;
      if(obj.message.length==0)
       {this.nomatch="No match found"; this.showmsg=true;}
       else{
         this.showmsg=false;
      for (let i = 0; i < obj.message.length; i++) {
        this.bookdata[i] = obj.message[i];
        this.sumRatings=0;
        for(let j=0;j<this.bookdata[i].ratings.length;j++){
          this.sumRatings=this.sumRatings+Number(this.bookdata[i].ratings[j].rating_no);
        }
        if(this.bookdata[i].ratings.length > 0)
        {
          this.avgRate[i]=this.sumRatings/this.bookdata[i].ratings.length;
          this.avgRate[i]=Math.round(this.avgRate[i])
          // console.log(this.avgRate[i])
        }
        else
        this.avgRate[i]=0  
      }
    }
      // console.log( this.bookdata)
     // console.log(data)
    },(errorMessage) => {  
      // console.log("Error Status:" + errorMessage)
      this.substring = errorMessage.substr(0, 3);

      if (this.substring != 'und') {
        // console.log("After Cutting:" +this.substring)                         
        // console.error('error caught in component')
        this.errormessage = errorMessage.substr(11, 132);
        //  console.log("Error:" +  this.errormessage);
      
        // console.log("this.substring:" + this.substring);
      //  this.router.navigate(['404pagenotfound', this.substring]);
      this.toastr.warningToastr("Something went wrong , please try again later",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000,maxShown:'1'})
      }
      else {
        this.substring = errorMessage.substr(18, 27);
        // console.log(this.substring);
      //  this.router.navigate(['404pagenotfound', this.substring])
       this.toastr.warningToastr("Something went wrong , please try again later",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000,maxShown:'1'})

      }
     })
  }
  else{
    // console.log("Else part "+this.search_value);
    this.allb.getbooks(this.search_value).subscribe(data => {
      // console.log("Dtaa:" +data);
      var obj = JSON.parse(data);
      this.loader=false;
      this.bookdata.length = 0;
      if(obj.message.length==0)
      {this.nomatch="No match found"; this.showmsg=true;}
      else{
        this.showmsg=false;
        for (let i = 0; i < obj.message.length; i++) {
          this.bookdata[i] = obj.message[i];
          this.sumRatings=0;
          for(let j=0;j<this.bookdata[i].ratings.length;j++){
            this.sumRatings=this.sumRatings+Number(this.bookdata[i].ratings[j].rating_no);
          }
          if(this.bookdata[i].ratings.length > 0)
          {
            this.avgRate[i]=this.sumRatings/this.bookdata[i].ratings.length;
            this.avgRate[i]=Math.round(this.avgRate[i])
            // console.log(this.avgRate[i])
          }
          else
          this.avgRate[i]=0  
        }
    
    }
     // console.log(data)
    },(errorMessage) => {  
      // console.log("Error Status:" + errorMessage)
      this.substring = errorMessage.substr(0, 3);

      if (this.substring != 'und') {                   
        // console.error('error caught in component')
        this.errormessage = errorMessage.substr(11, 132);
        this.toastr.warningToastr("Something went wrong , please try again later",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000,maxShown:'1'})
      }
      else {
        this.substring = errorMessage.substr(18, 27);
        // console.log(this.substring);
        // this.router.navigate(['404pagenotfound', this.substring]);
       this.toastr.warningToastr("Something went wrong , please try again later",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000,maxShown:'1'})
      }
     })
  }
}
  change_address(v: any) {
    this.search_value = v;
    //alert(this.search_value);
    if (this.search_value != null) {
      //this.search_value = this.search_value.toString();
    } else {
      this.search_value = '';
    }
    // console.log("Search value in allbooks " + this.search_value);
    this.allb.getbooks(this.search_value).subscribe(data => {
      var obj = JSON.parse(data);
      this.bookdata.length = 0;
      if(obj.message.length==0)
      {this.nomatch="No matches found"; this.showmsg=true;}
      else{
        this.showmsg=false;
      for (let i = 0; i < obj.message.length; i++) {
        this.bookdata[i] = obj.message[i];
      }}
     // console.log(data)
    })

  }
showdetails(v:any,v2:any){
  localStorage.setItem('user_book_id', v);
    localStorage.setItem('user_pub_id', v2);
    localStorage.setItem('ad1','/allbooks');
    // console.log(localStorage.getItem('user_book_id')+" "+localStorage.getItem('user_pub_id'))
    // this.router.navigate(['/user/userlogin'])
    this.router.navigate(['/']);
}
onMouseEnter(event: any,book_id:any,bk_nm:any): void {
  // console.log(book_id);
  this.reviewBookName=bk_nm
  this.reviewData.length=0;
  this.reviewData1.length=0;
  this.maxRange=2;
  this.minRange=0;
  this.ratingData.length=0
  this.rate_1=0;
  this.rate_2=0;
  this.rate_3=0;
  this.rate_4=0;
  this.rate_5=0;
  for(let i=0;i<this.bookdata.length;i++){
    
    if(this.bookdata[i].book_id==book_id){
      this.avgRate[i]=this.avgRate[i]!='NaN' || this.avgRate[i]!=undefined || this.avgRate[i]!=''?  Math.round(this.avgRate[i]) : 0
      this.avgrt=this.avgRate[i]!='NaN' || this.avgRate[i]!=undefined || this.avgRate[i]!='' ? Math.round(this.avgRate[i]) :  0;
      for(let j=0;j<this.bookdata[i].ratings.length;j++){
        if(this.bookdata[i].ratings[j].rating_no==5)
        this.rate_5+=1
        if(this.bookdata[i].ratings[j].rating_no==4)
        this.rate_4+=1
        if(this.bookdata[i].ratings[j].rating_no==3)
        this.rate_3+=1
        if(this.bookdata[i].ratings[j].rating_no==2)
        this.rate_2+=1
        if(this.bookdata[i].ratings[j].rating_no==1)
        this.rate_1+=1
        this.reviewData1.push({review:this.bookdata[i].ratings[j].review,rating:this.bookdata[i].ratings[j].rating_no})
        
        this.reviewData.push({review:this.bookdata[i].ratings[j].review,rating:this.bookdata[i].ratings[j].rating_no})
      }
      this.ratingData.push({rate_1:this.rate_1*10,rate_2:this.rate_2*10,rate_3:this.rate_3*10,rate_4:this.rate_4*10,rate_5:this.rate_5*10})

    }
  }
  this.reviewData=this.reviewData1.slice(0,this.maxRange)
  this.t1=this.ratingData[0].rate_1
  this.t2=this.ratingData[0].rate_2
  this.t3=this.ratingData[0].rate_3
  this.t4=this.ratingData[0].rate_4
  this.t5=this.ratingData[0].rate_5
  // console.log(this.reviewData)
  // if(this.reviewData.length){
  // this.reviewModalDiv=document.getElementById('open_modal');
  // this.reviewModalDiv.click()}
  //  event.target.click();
  
}
onmouseleave(event: any): void {
// event.target.disable = true;
}
next(){
  this.minRange+=2;
  this.maxRange+=2;
  this.reviewData=this.reviewData1.slice(this.minRange,this.maxRange)

}
prev(){
 this.minRange-=2;
 this.maxRange-=2;
 this.reviewData=this.reviewData1.slice(this.minRange,this.maxRange)

}
}
