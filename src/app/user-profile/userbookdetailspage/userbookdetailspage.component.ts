import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { UserbookdetailsService } from '../userbookdetails.service';
import { PrevBookService } from './prev-book.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { BuynowService } from './buynow.service';
import { BuynowInitService } from './buynow-init.service';
import { Router } from '@angular/router';
import { AddtocartserveService } from './addtocartserve.service';
import { CheckpagesincartService } from './checkpagesincart.service';
import { ShowcartService } from '../cartpage/showcart.service';
import { FormBuilder} from '@angular/forms';
import { ReviewratingService } from './reviewrating.service';
import { PurchasedbooksService } from '../purchase-list/purchasedbooks.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { BuyhardcopyService } from './buyhardcopy.service';
import { PDFDocument } from 'pdf-lib'
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-userbookdetailspage',
  templateUrl: './userbookdetailspage.component.html',
  styleUrls: ['./userbookdetailspage.component.css',
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
        animate(1000, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class UserbookdetailspageComponent implements OnInit {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  spin:boolean=false;
  addtocartloader:boolean=false;
 open_pg:any;
  fullpageload:boolean=true;
currentRate:number=0;
  rating:any;
  review:any;
   loading:boolean=false;
  pdfBytes:any='';
  subs!:Subscription;
  isConnected:boolean= true;
  constructor(private utilyT : UtilityTService,private _ngZone: NgZone,private buyhardcopy:BuyhardcopyService,private purchased:PurchasedbooksService,private reviewRate:ReviewratingService,private fb: FormBuilder,private show1:ShowcartService, private router:Router, private checkpages:CheckpagesincartService, private addtocart:AddtocartserveService, private route:Router,private buy: BuynowService, private userbooks: UserbookdetailsService, private preview: PrevBookService, private getpages: BuynowInitService) { 
    this.subs = this.utilyT.getIsConnected().subscribe(res => {
      this.isConnected = res; 
})
  }
  bookid: any;
  userdata11:any=[];
  pubid: any;
  cartbuttonshow=false;
  books: any = [];
  bookshow: any = [];
  bk_name: any;
  bookflag = 0;
  number_msg = '';
  pages: any = [];
  fromtag: any;
  totag: any;
  bookpages: any = [];
  totalpages = 0;
  /*modified*/
  isReadMore=true;
  hide=true;
  about_book_truncate:string='';
  maxln=100;
  loader=true;
  c=0;
  bookdetailspage: any = [];
  navDiv:any;
  errormessage:any;
  substring:any=''
  cartdata:any;
  current_book_id:any;
  review_rating:boolean=true;
  hide_review=false;
  reviewData:any;
  reviewData1:any;
  avgRate:number=0
  avgRatingData:any;
  allreview:any;
  allreview1:any;
  rangeToShow=2;
  snackbar:any;
  show_sidenav=true;
  load_more_spinner=true;
  blur:any;
  tabName:any='nav-home';
  relatedbooks:any=[];
  reviewBookName:any;
  minRange=0;
  maxRange=2;
  offer_price:any;
  mrp:any;
  delivery_charge:any;
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
page=1;
open_page:any;
book_of_contents:any=[]
color1: ThemePalette = 'warn';
color2: ThemePalette = 'accent';
color3: ThemePalette = 'warn';
mode: ProgressBarMode = 'buffer';
bufferValue = 100;
reviewdata1:any=[];
reviewdata:any=[];
whole_book:any='N';
bookID:any;
pubID:any;
buyBooks:any=[];
auth_name:any;
hardCopyData:any;
load:boolean=true;
full_book:any;
observer!:Subscription;
  ngOnInit(): void {
    this.pages.length = 0;
    this.bookflag == 0;
    this.number_msg = '';
    this.bookid = localStorage.getItem('user_book_id');
    this.pubid = localStorage.getItem('user_pub_id');
    this.checkpages.checkpages(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),this.bookid).subscribe(data=>{
    this.cartdata=JSON.parse(data);
    if(this.cartdata.message.length>0)
      this.cartbuttonshow=true;
      else
      this.cartbuttonshow=false;
    })
    this.reviewRate.getavgRating(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), this.bookid).subscribe(data=>{
    this.avgRatingData=data;
    this.avgRate=Math.round(this.avgRatingData.message.averagerating);
    })
  this.reviewRate.getReview(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), this.bookid).subscribe(data=>{
    this.reviewData=data;
    this.allreview=this.reviewData.allreview;
    this.allreview1=this.reviewData.allreview;
    this.allreview=this.allreview1.slice(0,this.rangeToShow)
    this.currentRate=  this.reviewData.message.length >0 ? this.reviewData.message[0].rating_no : 0;
    this.review= this.reviewData.message.hasOwnProperty('review') ? this.reviewData.message[0].review : '';
  
  })
    this.userbooks.get_book_details(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), this.bookid, this.pubid).subscribe(data => {
      this.load=false;
      var obj = JSON.parse(data);
      for (let i = 0; i < obj.message.length; i++) { this.books[i] = obj.message[i]; }
      this.bk_name = this.books[0].book_name;
      this.full_book=this.books[0].full_book;
      this.current_book_id=this.books[0].book_id;
      this.buyBooks=obj.message[0].Buy_pages;
      this.delivery_charge=this.books[0].print_book_deliverycharge;
      this.mrp=this.books[0].print_book_mrp;
      this.offer_price=this.books[0].print_book_offermrp;
      this.auth_name=this.books[0].author_name;
      this.purchased.relatedBooks(obj.message[0].category_id,localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),obj.message[0].book_id,).subscribe(data=>{
        var obj=JSON.parse(data);
        if(obj.message.length > 0){
          for(let i=0;i<obj.message.length;i++){
            this.relatedbooks[i]=obj.message[i];
          }
        }
      })
         if(obj.message[0].ratings.length > 0){
          for(let j=0;j<obj.message[0].ratings.length;j++){
          
            this.reviewData1.push({review:this.books[0].ratings[j].review,rating:obj.message[0].ratings[j].rating_no})
          }
         }
          if(this.books[0].about_book.length > 0){
            if(this.books[0].about_book.length >this.maxln)
            {
              this.about_book_truncate=this.books[0].about_book;
              this.books[0].about_book=this.about_book_truncate.substr(0,this.maxln)+"...";
              this.hide=false;
              // this.isReadMore=true;
            }
            else{
              this.hide=true;
              this.isReadMore=false;
            }
          }

  
    },(errorMessage) => {  
      this.load=false;
      this.substring = errorMessage.substr(0, 3);

      if (this.substring != 'und') {                        
        // console.error('error caught in component')
        this.errormessage = errorMessage.substr(11, 132);
      }
      else {
        this.substring = errorMessage.substr(18, 27);
      } 
      this.utilyT.showToastr('Server did not responds','E');             
    })
  this.purchased.purchasedlist(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
    var obj = JSON.parse(data);
    this.bookdetailspage = obj.message
    this.hide_review=false;
    for (let i = 0; i < obj.message.length; i++) {
        if(localStorage.getItem('u-id')==obj.message[i].user_id && obj.message[i].book_id==this.bookid)
           this.hide_review=true;
    }
  },(errorMessage) => {  
      this.substring = errorMessage.substr(0, 3);
      if (this.substring != 'und') {                    
        this.errormessage = errorMessage.substr(11, 132);

      }
      else {
        this.substring = errorMessage.substr(18, 27);
      }
      this.utilyT.showToastr('Server did not responds','E');
   })
   this.getpages.show_book(this.bookid, this.pubid, localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
      var obj = JSON.parse(data);
      this.fullpageload=false;
      this.load=false;
      this.totalpages = obj.count_totalpages;
      var j=0;
      for (let i = 0; i < obj.message.length; i++) {
        this.bookpages[i] = obj.message[i];
        if(typeof(this.bookpages[i].book_page_no)=='string'){

        }
        else{         
          this.pages[j] = this.bookpages[i].book_page_no;
          j++;
        }  
        if(this.bookpages[i].book_id==this.current_book_id){
                  this.review_rating=false;
        }
        else{
          this.review_rating=true;
        }
      }

    },(errorMessage) => {  
      this.substring = errorMessage.substr(0, 3);
      if (this.substring != 'und') {
        this.errormessage = errorMessage.substr(11, 132);
      }
      else {
        this.substring = errorMessage.substr(18, 27);
      }
      this.utilyT.showToastr('Server did not responds','E');
     })
     this.preview.show_book(this.bookid,this.pubid, localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
      var obj = JSON.parse(data);
      this.modifyPdf(obj.mergepdf);
      for (let i = 0; i < obj.book_of_content.length; i++) {
      this.book_of_contents[i]=obj.book_of_content[i]
    }
      this.book_of_contents.reverse();
       for (let i = 0; i < obj.message.length; i++) {
        this.bookshow[i] = obj.message[i];
      }
    })
     localStorage.setItem('address','/user/bookdetails');
   
     $(window).scroll(()=>{
      if(this.allreview.length > this.rangeToShow){  
      if($(window).scrollTop() + $(window).outerHeight() == $(document).height()){
      this.load_more_spinner=false;
      setTimeout(()=>{
        this.load_more_spinner=true;
        this.rangeToShow+=2
        this.allreview=this.allreview1.slice(0,this.rangeToShow);
      },2000)
     }
    }
    else{
      
    }
    })

    
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  showText() {
    this.isReadMore = !this.isReadMore
    this.hide=false;
    if(this.isReadMore==true){
        this.books[0].about_book=this.about_book_truncate.substr(0,this.maxln)+"...";  
    }
    else
    {
      // this.about_book_truncate=this.books[0].about_book;
      this.books[0].about_book=this.about_book_truncate;
      
    }
 }

  preventNonNumericalInput(e: any) {
    this.utilyT.preventNonNumericalInput(e);
  }
  show_details(v1:any,v2: any, v3: any, v4: any, v5: any) {
    this.loading=true;
    $('#subscribenow').prop('disabled',true);
    const _response  = this.utilyT.cart_add(v2, v3, v4, v5, this.pages,this.whole_book,this.totalpages,'B');
    _response.then( (res:any) => {
    if(res > 0){
      this.loading=false;
      $('#subscribenow').prop('disabled',false)
       } 
      else{
      this.loading=false;
      $('#subscribenow').prop('disabled',false);
    } 
    })
  }
  cart_add( v2: any, v3: any, v4: any, v5: any) {
    this.addtocartloader=true;
    $('#cartAdd').prop('disabled',true);
    const _response  = this.utilyT.cart_add(v2, v3, v4, v5, this.pages,this.whole_book,this.totalpages,'C');
    _response.then( (res:any) => {
    if(res > 0){
      $('#cartAdd').prop('disabled',false);
      this.addtocartloader=false;
      this.cartbuttonshow=true; 
      this.fromtag = document.getElementById('frompg');
      this.fromtag.value = '';
      this.totag = document.getElementById('topg');
      this.totag.value = '';
      const _getCartVal  = this.utilyT.getcartvalue();
      _getCartVal.then(res => {this.c = Number(res)})
      } 
      else{
      $('#cartAdd').prop('disabled',false);
      this.addtocartloader=false;
    } 
    })
    
    
  }
  pdf_load(){
    // this.loader=false;
    this.load=false;
    this.blur=document.getElementById('viewer');
    this.blur.classList.add("mystyle");

   }
showbook(book_id:any,publisher_id:any){
  // this.spinner=false;
  // this.loader=false;
  this.load=true;
  localStorage.setItem('user_book_id',book_id);
  localStorage.setItem('user_pub_id',publisher_id);
  // this.loader=true;
  this.ngOnInit();
  this.router.navigate(['/user/bookdetails']);
  
}
  show_prev(v1: any, v2: any,full_book:any) {
    // this.pdfBytes='';
    if($("#mySidenav").is(":visible") == true ){
      this.navDiv=document.getElementById("mySidenav");this.navDiv.style.width = "100%";this.navDiv.style.padding = "0";this.navDiv.style.height = "0px";
   }
   else{
    this.navDiv=document.getElementById("responSivemySidenav");this.navDiv.style.width = "100%";this.navDiv.style.padding = "0";this.navDiv.style.height = "0px";
   }
    this.full_book='';
    // this.pdfBytes='';
    this.navDiv=document.getElementById("mySidenav")
    this.navDiv.style.width = "0";
    this.navDiv.style.height = "0px";
    this.navDiv.style.padding = "0";
    this.full_book=full_book;
    this.number_msg='';
    this.bookID=v1;
    this.pubID=v2;
    // this.load=true;
    // this.bookshow.length = 0;
    // this.preview.show_book(v1, v2, localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
    //   var obj = JSON.parse(data);
    //   this.modifyPdf(obj.mergepdf);
    //   for (let i = 0; i < obj.book_of_content.length; i++) {
    //   this.book_of_contents[i]=obj.book_of_content[i]
    // }
    //   this.book_of_contents.reverse();
    //    for (let i = 0; i < obj.message.length; i++) {
    //     this.bookshow[i] = obj.message[i];
    //   }
    // })
  }

  makeItFalse(){
    this.loader=false;
    this.number_msg='';
    this.loading=false;
    this.fromtag = document.getElementById('frompg');this.fromtag.value = '';
    this.totag = document.getElementById('topg');this.totag.value = '';
    this.fromtag.removeAttribute("disabled");this.totag.removeAttribute("disabled");
    this.fromtag = document.getElementById('Frompg');this.fromtag.value = '';
    this.totag = document.getElementById('Topg');this.totag.value = '';
    this.fromtag.removeAttribute("disabled");this.totag.removeAttribute("disabled");
    this.fromtag=document.getElementById('resfrompg');this.fromtag.value = '';
    this.totag = document.getElementById('restopg');this.totag.value = '';
    this.fromtag.removeAttribute("disabled");this.totag.removeAttribute("disabled");
    this.whole_book='N';this.fromtag=document.getElementById('changeInput');
    this.fromtag.checked=false; this.fromtag=document.getElementById('checkBox');
    this.fromtag.checked=false;this.fromtag=document.getElementById('changeInputres');
    this.fromtag.checked=false;
    }
  gotcart(){
    this.utilyT.gotcart();
  }
  submit_review(){
    if(this.currentRate==0)
    this.utilyT.showToastr('Please provide a rating','E')
    else{
      this.reviewRate.post_review(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),this.current_book_id,this.currentRate,this.review).subscribe(data=>{
        this.reviewRate.getReview(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), this.bookid).subscribe(data=>{
         this.reviewData=data;
         this.allreview=this.reviewData.allreview;
         this.allreview1=this.reviewData.allreview;
         this.allreview=this.allreview1.slice(0,this.rangeToShow)
     
         this.currentRate=  this.reviewData.message.length>0? this.reviewData.message[0].rating_no:0;
         this.review= this.reviewData.message.length>0?this.reviewData.message[0].review:''
       
       })
          this.utilyT.showToastr('Review Submitted!','S')
          this.review='';
          this.currentRate=0;
       })
    }
   
  }
activeTab(v:any){this.tabName=v;}
  onMouseEnter(event: any,book_id:any,bk_nm:any): void {  
    this.reviewBookName=bk_nm
    this.reviewdata.length=0;
    this.reviewdata1.length=0;
    this.maxRange=2;
    this.minRange=0;
    this.ratingData.length=0
    for(let i=0;i<this.books.length;i++){
      if(this.books[i].book_id==book_id){

      //  this.avgrt=Math.round(this.avgRate[i])
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

          this.reviewdata.push({review:this.books[i].ratings[j].review,rating:this.books[i].ratings[j].rating_no})
          this.reviewdata1.push({review:this.books[i].ratings[j].review,rating:this.books[i].ratings[j].rating_no})
        }
        this.ratingData.push({rate_1:this.rate_1*10,rate_2:this.rate_2*10,rate_3:this.rate_3*10,rate_4:this.rate_4*10,rate_5:this.rate_5*10})
      }
      this.ratingData.push({rate_1:this.rate_1*10,rate_2:this.rate_2*10,rate_3:this.rate_3*10,rate_4:this.rate_4*10,rate_5:this.rate_5*10})

    }
    this.reviewdata=this.reviewdata1.slice(0,this.maxRange)
    this.t1=this.ratingData[0].rate_1
    this.t2=this.ratingData[0].rate_2
    this.t3=this.ratingData[0].rate_3
    this.t4=this.ratingData[0].rate_4
    this.t5=this.ratingData[0].rate_5 
 }
 FullBook(event:any){
  this.fromtag = document.getElementById('frompg');
  this.totag = document.getElementById('topg');
   if(event.target.checked){
     this.fromtag.value='';
     this.totag.value='';
     this.fromtag.setAttribute("disabled",true);
     this.totag.setAttribute("disabled",true);
     this.whole_book='Y';
   }
   else{
    this.fromtag.removeAttribute("disabled");
     this.totag.removeAttribute("disabled");
     this.whole_book='N';
   }
 }
 changeEvent(event:any){
  this.fromtag = $("#mySidenav").is(":visible") == true ? document.getElementById('Frompg') :  document.getElementById('resfrompg') ;
  this.totag =$("#mySidenav").is(":visible") == true ?  document.getElementById('Topg')  :  document.getElementById('restopg');
   if(event.target.checked){
     this.fromtag.value='';
     this.totag.value='';
     this.fromtag.setAttribute("disabled",true);
     this.totag.setAttribute("disabled",true);
     this.whole_book='Y';
   }
   else{
    this.fromtag.removeAttribute("disabled");
     this.totag.removeAttribute("disabled");
     this.whole_book='N';
   }
 }
openNav() {
  this.show_sidenav=!this.show_sidenav;
if(this.show_sidenav==true)
 { 
   if( $("#mySidenav").is(":visible") == true ){
   this.navDiv=document.getElementById("mySidenav");this.navDiv.style.width = "100%";this.navDiv.style.height = "310px";
   }
   else{
   this.navDiv=document.getElementById("responSivemySidenav");this.navDiv.style.width = "100%";this.navDiv.style.height = "310px";

   }
  }
  else{
     if($("#mySidenav").is(":visible") == true ){
      this.navDiv=document.getElementById("mySidenav");this.navDiv.style.width = "100%";this.navDiv.style.padding = "0";this.navDiv.style.height = "0px";
   }
   else{
    this.navDiv=document.getElementById("responSivemySidenav");this.navDiv.style.width = "100%";this.navDiv.style.padding = "0";this.navDiv.style.height = "0px";
   }
  
  
  }
}

openPages(pg:any){
  this.bookflag=0;
  this.open_page=pg.split('-')[0];
  this.whole_book='N';
  for (let i = 0; i < this.buyBooks.length; i++) {
    if (pg.split('-')[0] == this.buyBooks[i].book_page_no || pg.split('-')[1] == this.buyBooks[i].book_page_no) {
      this.bookflag=1}
    }
  if(!this.bookflag){
    this.bookflag=0;
    this.utilyT.showToastr('Need to buy this pages','E')
  }
 else{
     this.open_page=pg;
 }
}
buyHardCopy(state:any,city:any,pincode:any,address:any){
  this.number_msg='';
  this.bookid = localStorage.getItem('user_book_id');
  this.pubid = localStorage.getItem('user_pub_id');
   this.utilyT.buyHardCopy(state,city,pincode,address,localStorage.getItem('user_book_id'),localStorage.getItem('user_pub_id'));
}
changePage(event:any){this.open_pg=event}
async modifyPdf(Url:any[]) {
  this.spin=true;
  const pdfDoc = await PDFDocument.create()
  for(let i=0;i< Url.length;i++){
    if(this.isConnected == true){
      if(i==300 || i==700){this.spin=true;}
      const existingPdfBytes = await fetch(Url[i]).then(res => res.arrayBuffer())
      const firstDonorPdfDoc = await PDFDocument.load(existingPdfBytes);
      const firstDonorPage = await pdfDoc.copyPages(firstDonorPdfDoc,[0])
      firstDonorPage.forEach((page) => pdfDoc.addPage(page));
      if(i==100 || i==300 || i==700){
      const pdfBytes = await pdfDoc.save();
      let file = new Blob([pdfBytes], { type: 'application/pdf'});   
      this.pdfBytes = URL.createObjectURL(file);
      this.spin=false;
      }
    }
    else{
            this.observer = this.utilyT.getIsConnected().subscribe(res => {
                if(res){
                  if(i == (Url.length - 1))
                  {
                    this.modifyPdf(Url);
                    this.observer.unsubscribe();
                  }
                }        
          })
    }
    }    
    console.log('sss') 
    const pdfBytes = await pdfDoc.save();
    let file = new Blob([pdfBytes], { type: 'application/pdf'});   
    this.pdfBytes = URL.createObjectURL(file);
    this.spin=false;
}
ngOnDestroy(){
  this.subs.unsubscribe();
}
}
