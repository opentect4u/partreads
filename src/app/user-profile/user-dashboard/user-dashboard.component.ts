import { Component, OnInit } from '@angular/core';
import { UserbookshowService } from '../userbookshow.service';
import {trigger, style, animate, transition} from '@angular/animations';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { UserDashboardServiceService } from './user-dashboard-service.service';
import { map, pluck} from 'rxjs/operators';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
// import { Location } from "@angular/common";
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(1000, style({opacity: 1}))
      ]) 
    ])
  ]
})
export class UserDashboardComponent implements OnInit {
  pubName:any=''
   subcatname:any='';
   catname:any='';
  getCategory:any=[];
  getSubCategory:any=[];
  loader=true;
  reviewModalDiv:any;
  constructor(private utilityT:UtilityTService,private catservice:UserDashboardServiceService,private userbook:UserbookshowService) { }
  bookdata:any;
  books:any=[];
  p:number=1;
  color1: ThemePalette = 'warn';
  color2: ThemePalette = 'accent';
  color3: ThemePalette = 'warn';
  mode: ProgressBarMode = 'buffer';
  bufferValue = 100;
  errormessage:any;
  reviewData:any=[];
  reviewData1:any=[];
  ratingData:any=[];
  substring:any='';
  avgRate:any=[];
  avgrt:any;
  minRange=0;
  maxRange=2;
  t=0;
  ratingsArr1:any;
 sumRatings=0;
 rangeToShow=2
 individualRating:any;
 reviewBookName:any;
 show_reviews=true;
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
// min:any=0;
// max:any=8;
loading:boolean=true;
cat_id:any='';
x:any;
prev_page:any=0;;
total:any=40;
toprated_book_5:any=[];
rating_first:any=[];
rating_second:any=[];
total_rating=0;
total_rating_10=0;
toprated_book_10:any=[];
// filter_subcategory:any=[];
category_id:any='';
subcategory_id:any=''
sortby:any='';
// sorting_option:any;
publisher_list:any=[];
publisher_id:any='';
r_book:any=[];
load_rating:boolean=false;
ngOnInit(): void {
  localStorage.setItem('address','/user/user_dashboard');
  this.loading=false;
   this.getbooks(0,8,'','','','','');//For Getting Books
   this.getcategory();
    this.getSubcategory();
    this.getpublisher();
    this.catservice.getTopratedBooks(localStorage.getItem('u-id'),localStorage.getItem('user-type_user'),localStorage.getItem('remember_token')).subscribe(data=>{
      var j=0;
      var obj=JSON.parse(data);
      this.r_book=obj.message;
      if(obj.message.length>0){
      for(let i=0;i<4;i++){
      if(obj.message.length!=i){
        this.toprated_book_5[i]=obj.message[i];
          this.total_rating=0;
          if(this.toprated_book_5[i].data[0].ratings.length > 0){
        for(let q=0;q<this.toprated_book_5[i].data[0].ratings.length;q++){
          this.total_rating=this.total_rating+Number(this.toprated_book_5[i].data[0].ratings[q].rating_no);
        }
        if(this.toprated_book_5[i].data[0].ratings.length)
        {
          this.rating_first[i]=this.total_rating/this.toprated_book_5[i].data[0].ratings.length;
          this.rating_first[i]=Math.round(this.rating_first[i])
        }
        else
        this.rating_first[i]=0
           }
       }
      else{
        break;
      }
      }
      }
      if(obj.message.length>=4){
      for(let i=4;i<8;i++){
        if(obj.message.length!=i){
      this.toprated_book_10[j]=obj.message[i];
      this.total_rating_10=0;
      if(obj.message[i].data[0].ratings.length > 0){
      for(let q=0;q<this.toprated_book_10[j].data[0].ratings.length;q++){
        this.total_rating_10=this.total_rating_10+Number(this.toprated_book_10[j].data[0].ratings[q].rating_no);
      }
      if(this.toprated_book_10[j].data[0].ratings.length)
      {
        this.rating_second[j]=this.total_rating_10/this.toprated_book_10[j].data[0].ratings.length;
        this.rating_second[j]=Math.round(this.rating_second[j])
      }
      else{
      this.rating_second[j]=0
      }
       }
      j++;
    }
      else{
        break;
      }
      }
      }
    })
  }
  showbook(v:any,v2:any){
    this.utilityT.go_to_user_bookDeatils_page(v,v2);
  }
  onMouseEnter(event: any,book_id:any,bk_nm:any): void {
    this.load_rating=false;
    this.t1=0;
    this.t2=0;
    this.t3=0;
    this.t4=0;
    this.t5=0;
    this.reviewBookName=bk_nm
    this.reviewData.length=0;
    this.reviewData1.length=0;
    this.maxRange=2;
    this.minRange=0;
    this.ratingData.length=0
    for(let i=0;i<this.books.length;i++){
      if(this.books[i].book_id==book_id){        
        this.avgRate[i]=Math.round(this.avgRate[i])
       this.avgrt=Math.round(this.avgRate[i])
       this.rate_1=0;
       this.rate_2=0;
       this.rate_3=0;
       this.rate_4=0;
       this.rate_5=0;
        for(let j=0;j<this.books[i].ratings.length;j++){
          if(this.books[i].ratings[j].rating_no==5)
          this.rate_5+=1
          if(this.books[i].ratings[j].rating_no==4)
          this.rate_4+=1
          if(this.books[i].ratings[j].rating_no==3)
          this.rate_3+=1
          if(this.books[i].ratings[j].rating_no==2)
          this.rate_2+=1
          if(this.books[i].ratings[j].rating_no==1)
          this.rate_1+=1

          this.reviewData.push({review:this.books[i].ratings[j].review,rating:this.books[i].ratings[j].rating_no})
          this.reviewData1.push({review:this.books[i].ratings[j].review,rating:this.books[i].ratings[j].rating_no})
        }
        this.ratingData.push({rate_1:this.rate_1*10,rate_2:this.rate_2*10,rate_3:this.rate_3*10,rate_4:this.rate_4*10,rate_5:this.rate_5*10})
        this.t1=this.ratingData[0].rate_1
        this.t2=this.ratingData[0].rate_2
        this.t3=this.ratingData[0].rate_3
        this.t4=this.ratingData[0].rate_4
        this.t5=this.ratingData[0].rate_5 
         this.load_rating=true;
      }
    }
    this.reviewData=this.reviewData1.slice(0,this.maxRange)
 }
 next(){
    this.navigatePagination('N');
 }
 prev(){
    this.navigatePagination('P');
}
changePage(event:any){
  if(this.prev_page==event){
    this.loading=true;
  }
   else{
     var max=event*8;
     var min=max-8;
     this.p=event;
     this.prev_page=event;
     this.getbooks(min,max,this.category_id,this.subcategory_id,this.sortby,this.publisher_id,'C')
   }
}
filter(id:any,name:any){
  this.catname=name;
  this.category_id=id;
  this.getbooks(0,8,id,'',this.sortby,this.publisher_id,'');
}
sortBy(event:any){
 this.sortby=event.target.value;
this.getbooks(0,8,this.category_id,this.subcategory_id,event.target.value,this.publisher_id,'');
}
filterbySubCat(id:any,cat_id:any,sub_cat:any){
  this.subcatname=sub_cat;
  this.subcategory_id=id;
  this.getbooks(0,8,cat_id,id,this.sortby,this.publisher_id,'');
}
filterbypublisherCat(pub_id:any,pubname:any){
this.pubName=pubname
this.publisher_id=pub_id;
this.getbooks(0,8,this.category_id,this.subcategory_id,this.sortby,pub_id,'');
}
filterend(type:any){
  switch(type){
    case '1':this.pubName='';this.publisher_id='';
            break;
    case '2':this.subcatname='';this.subcategory_id='';
           break;
    case '3':this.catname='';this.category_id='';
           break;
  }
this.getbooks(0,8,this.category_id,this.subcategory_id,this.sortby,this.publisher_id,'');
}
//For Getting books by filter / onload / change page
getbooks(_min:any = 0,_max:any = 8,_cat_id:any,_subcat_id:any,_sortBy:any,_pub:any,_flag:any){
  this.loading=false;
  this.bookdata='';
  this.books.length=0;
  this.userbook.getbooks(localStorage.getItem('u-id'),localStorage.getItem('user-type_user'),localStorage.getItem('remember_token'),_min,_max,_cat_id,_subcat_id,_sortBy,_pub).pipe(map(x => JSON.parse(x),pluck('message'))).subscribe(data=>{
    this.books = data.message; 
     if(_flag==''){
      this.total=data.total_book ? data.total_book : 0; 
      this.p=this.total > 0 ? 1 : 0;
      }
     for(let i = 0 ; i< this.books.length;i++){
          this.sumRatings=0;
          for(let j=0;j<this.books[i].ratings.length;j++){
            this.sumRatings=this.sumRatings+Number(this.books[i].ratings[j].rating_no);
          }
            if(this.books[i].ratings.length)
            {
              this.avgRate[i]=this.sumRatings/this.books[i].ratings.length;
              this.avgRate[i]=Math.round(this.avgRate[i])
            }
            else
            this.avgRate[i]=0
        }
     this.loading = true;
   })
}
//For Pagination navigate
navigatePagination(_flag:any){
  switch(_flag){
    case 'P' :  this.minRange-=2;this.maxRange-=2;break;
    case 'N' :  this.minRange+=2;this.maxRange+=2; break;
  }
  this.reviewData=this.reviewData1.slice(this.minRange,this.maxRange)
}
//For Getting Category ()
public getcategory(){
  this.catservice.getcategory(localStorage.getItem('u-id'),localStorage.getItem('user-type_user'),localStorage.getItem('remember_token')).pipe(map((x:any) => JSON.parse(x)), pluck("message")).subscribe(data=>{
    this.getCategory = data; 
  })
}
//For Getting sub Category
public getSubcategory(){
  this.catservice.getsubcategory('',localStorage.getItem('u-id'),localStorage.getItem('user-type_user'),localStorage.getItem('remember_token')).pipe(map((x:any) => JSON.parse(x)), pluck("message")).subscribe(data=>{
    this.getSubCategory = data;
  })
}
//For getting publisher
public getpublisher(){
  this.catservice.getPublishers(localStorage.getItem('u-id'),localStorage.getItem('user-type_user'),localStorage.getItem('remember_token')).pipe(map((x:any) => JSON.parse(x)), pluck("message")).subscribe(data=>{
    this.publisher_list = data;
  })
}
}
