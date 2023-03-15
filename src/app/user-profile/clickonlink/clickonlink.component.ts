import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchasedbooksService } from '../purchase-list/purchasedbooks.service';
import { ReadpageService } from '../purchase-list/readpage.service';
import { SharepageService } from '../purchase-list/sharepage.service';
import { ClickserviceService } from './clickservice.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { BuynowInitService } from '../userbookdetailspage/buynow-init.service';
import { UserbookdetailsService } from '../userbookdetails.service';
import { BuysharedpagesService } from './buysharedpages.service';
import { GlobalConstants } from 'src/app/globalvar/global';
import { AddtocartserveService } from '../userbookdetailspage/addtocartserve.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ShowcartService } from '../cartpage/showcart.service';
import { BuyhardcopyService } from '../userbookdetailspage/buyhardcopy.service';
import { degrees,PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Subscription } from 'rxjs';
import { UtilityTService } from 'src/app/Utility/utility-t.service';

@Component({
  selector: 'app-clickonlink',
  templateUrl: './clickonlink.component.html',
  styleUrls: ['./clickonlink.component.css',
    '../../../assets/cssfiles/bootstrap.css',
    '../../../assets/cssfiles/font-awesome.css',
    '../../../assets/chosen/chosen.css',
    '../../../assets/cssfiles/apps.css',
    '../../../assets/cssfiles/res.css',
    '../../../assets/cssfiles/apps_inner.css'
  ],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ClickonlinkComponent implements OnInit {
  observe!:Subscription;
  subs!:Subscription;
  selectAll :any;
  spin:boolean=true;
  @ViewChild('openModal') openModal!: ElementRef;
  pdfBytes:any='';
  full_book:any='';
  v1: any;
  sendmailinput: any;
  disabledonebutton = true;
  v2: any;
  v3: any;
  bookid: any;
  divdata: any;
  counter = 0;
  share: any;
  bk_name: any;
 show_sidenav:any;
  navDiv:any;
  link: any;
  pubid: any;
  idval: any;
  pageread: any = [];
  check_counter = 0;
  page_data: any = [];
  // idvalue: string = '';
  bookdetailspage: any = [];
  btn_el: any;
  // email_sender: any;
  pagereadshare: any = [];
  data_checked = true;
  // modalshow: any;
  pagetoshare: any = [];
  linkgen: any = [];
  pagecounter = 0;
  gen_link: any;
  snackbarshow = true;
  snackbar: any;
  p:number=1;
  buynowshowhide = true;
  pagenotbought = [];
  linkshareinterpolation = '';
  loader=true;
  number_msg:any='';
  fromtag:any;
  totag:any;
  cartbuttonshow:boolean=false;
  pub_id:any='';
  book_id:any='';
  active_book:any='';
  author_name:any='';
  publisher_name:any='';
  total_page:any='';
  per_page:any='';
 whole_book:any='N';
 open_pg:any;
 buyBooks:any=[]
 show_hide:boolean=false;
 addtocartloader:boolean=false;
 bookflag = 0;
 bookpages: any = [];
  pages:any=[];
  totalpages:any;
 userdata11:any=[];
 c:any=0;
 hardCopyData: any;
 contents_pg:any=[];
 hasPage=0;
 avgRate:any=[];
 sumRatings=0;
  reviewLength:any=0;
     mrp:any;
      offer_price:any;
    delivery_charge:any
    loading:boolean=true;
     isConnected:boolean = true;
  constructor(private utilyT:UtilityTService, buyhardcopy:BuyhardcopyService,private toastr:ToastrManager,private addtocart:AddtocartserveService,private buy: BuysharedpagesService, private sharecheck: SharepageService, private getpages: UserbookdetailsService, private router: Router, private rd_pg: ReadpageService, private shr_pg: SharepageService, private purchased: PurchasedbooksService, private activatedRoute: ActivatedRoute, private click: ClickserviceService,private getPages: BuynowInitService,private show1:ShowcartService) {
    this.subs=  this.utilyT.getIsConnected().subscribe(res => {
      this.isConnected = res;
    })
    this.activatedRoute.queryParams.subscribe(params => {
      this.v1 = params['v1'];
      this.v2 = params['v2'];
      this.v3 = params['v3'];
    });
   
  }

  ngOnInit(): void {
    GlobalConstants.redirect_uri = GlobalConstants.redirecturi + "user/clickonlink?v1=" + this.v1 + "&v2=" + this.v2 + "&v3=" + this.v3;
    if (localStorage.getItem('u-loggedin') == "true") {
      // this.modalshow = document.getElementById('myModal');
      // this.email_sender = localStorage.getItem('u-token');
      this.click.sendpage(this.v1, this.v2, this.v3, localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
        // this.loader=false;
        this.loading = false;
        var obj1 = JSON.parse(data);
        this.pagenotbought = obj1.not_buy_page;
        this.clickonlinkpdf(obj1.mergepdfurl,this.pagenotbought)
        this.full_book=obj1.full_book;
        for (let i = 0; i < obj1.message.length; i++) {
          this.pagereadshare[i] = obj1.message[i];
        }
        if (this.pagenotbought.length > 0) {
          this.buynowshowhide = false;
        } else {
          this.buynowshowhide = true;
        }
       
        if (obj1.success == 1) {
          this.navDiv=document.getElementById("mySidenav")
          this.navDiv.style.width = "0";
          this.navDiv.style.height = "0px";
          this.navDiv.style.padding = "0";
          this.openModal.nativeElement.click(this.v1, this.v2, this.v3);
          this.purchased.purchasedlist(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data1 => {
            var obj = JSON.parse(data1);
            this.bookdetailspage = obj.message;
            for (let i = 0; i < obj.message.length; i++) {
              this.sumRatings=0;
              for(let j=0;j<this.bookdetailspage[i].ratings.length;j++){
                this.sumRatings=this.sumRatings+Number(this.bookdetailspage[i].ratings[j].rating_no);
                this.reviewLength=this.reviewLength+ (this.bookdetailspage[i].ratings[j].review!='' ? 1 : 0)
              }
              if(this.bookdetailspage[i].ratings.length){
                this.avgRate[i]=this.sumRatings/this.bookdetailspage[i].ratings.length;
                 
                this.avgRate[i]=Math.round(this.avgRate[i])}

              else
              this.avgRate[i]=0    
            }
          })
        
        }
      });
      this.navDiv=document.getElementById("mySidenav");this.navDiv.style.width = "100%";this.navDiv.style.padding = "0px";this.navDiv.style.height = "0px";
    this.navDiv=document.getElementById("responSivemySidenav");this.navDiv.style.width = "100%";this.navDiv.style.padding = "0px";this.navDiv.style.height = "0px";
    } else {
      var url = GlobalConstants.redirecturi + "user/login_to_read?rd_url=" + GlobalConstants.redirect_uri
      window.open(url, "_self");
    }


  }
  buypages() {
    // this.router.navigate(['/user/payment',this.v2,this.v1,this.bk_name,this.v3,0,this.whole_book]).then(()=>{
    //   location.reload();
    // });
  }
  checkdata(page: any, bookid: any, publisherid: any) {
    this.bookid = bookid;
    this.pubid = publisherid;
    for (let i = 0; i < this.pageread.length; i++) {
      if (page == this.pageread[i].book_page_no) {
        this.idval = document.getElementById("bookcheck" + page);
        if (this.idval.checked == true) {
          this.check_counter++;
          this.data_checked = false;
          this.sendmailinput = document.getElementById('sendmail');
          if (this.sendmailinput.value != '')
            this.disabledonebutton = false;
          else
            this.disabledonebutton = true;
        }
        else {
          this.check_counter--;
          if (this.check_counter == 0) {
            {
              this.data_checked = true;
              this.disabledonebutton = true;
            }
          }
        }

      }
    }
  this._SelectAll(this.check_counter);
  }
  copylink() {
    this.check_counter = 0;
    this.data_checked = true;
    // this.divdata=document.getElementById('gen_link');
    this.pagetoshare.length = 0;
    this.pagecounter = 0;
    this.divdata = document.getElementById('gen_link_footer');
    this.gen_link = document.createElement('input')
    for (let i = 0; i < this.pageread.length; i++) {
      // this.idvalue = "bookcheck" + this.pageread[i].book_page_no;
      this.idval = document.getElementById("bookcheck" + this.pageread[i].book_page_no);
      if (this.idval.checked == true) {
        this.pagetoshare[this.pagecounter++] = this.pageread[i].book_page_no;
        this.idval.checked = false;
      }
    }
    this.sharecheck.share_page(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), this.bookid, this.pubid, this.pagetoshare, '').subscribe(data => {
      var objlink = JSON.parse(data);
      this.linkgen = objlink.message;
      this.gen_link.value=this.linkgen;
      // for (let i = 0; i < this.linkgen.length; i++) {
      //   this.gen_link.value += this.linkgen[i] + "   ";
      // }
      // this.linkgen.length = 0;
      // this.gen_link.value = "http://techslides.com/demos/samples/sample.txt";
      this.divdata.appendChild(this.gen_link);
      this.gen_link.select();
      document.execCommand("copy");
      this.divdata.removeChild(this.gen_link);
      this.gen_link.value = '';
      this.snackbarshow = false;
      this.snackbar = document.getElementById("snackbar1")
      this.snackbar.className = "show";
      this.linkshareinterpolation = "Your link has been copied!!";
      setTimeout(() => {
        this.snackbar.className = this.snackbar.className.replace("show", "");
      }, 3000);
    })


  }
  preventemptymail() {
    this.sendmailinput = document.getElementById('sendmail');
    if (this.sendmailinput.value == '') {
      this.disabledonebutton = true;
    }
    else {
      if (this.check_counter > 0)
        this.disabledonebutton = false;
      else
        this.disabledonebutton = true;
    }
  }
  pageshared(v1: any, v2: any, page: any) {
    this.pageread.length = 0;
    this.getpages.get_book_details(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), v1, v2).subscribe(data11 => {
      var obj11 = JSON.parse(data11);
      this.bk_name =  obj11.message[0].book_name;
      this.author_name= obj11.message[0].author_name;
      this.publisher_name=obj11.message[0].publisher_name;
      this.total_page=obj11.message[0].page_count;
      this.per_page=obj11.message[0].price;
      this.book_id=obj11.message[0].book_id;
      this.pub_id=obj11.message[0].publisher_id;
      this.mrp=obj11.message[0].print_book_mrp;
      this.offer_price=obj11.message[0].print_book_offermrp
      this.delivery_charge=obj11.message[0].print_book_deliverycharge;
      this.contents_pg=obj11.message[0].contents
      this.active_book=obj11.message[0].active_book;
    this.contents_pg.reverse()
      this.rd_pg.readpages(v1, v2, localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),'').subscribe(data => {
        var obj33 = JSON.parse(data);
        if (this.pagereadshare.length > 0) {
          this.pageread = this.pagereadshare;
        } else {
          for (let i = 0; i < obj33.message.length; i++) {
            this.pageread[i] = obj33.message[i];
          }
        }
          if(this.active_book=='A' && this.buynowshowhide){
        document.getElementById('share_btn')?.remove();
          this.btn_el = document.createElement('button');
          this.btn_el.innerHTML = "<i class='fa fa-share-alt' aria-hidden='true'></i> ";
          this.btn_el.id = "share_btn";
          this.btn_el.setAttribute('data-toggle', 'modal');
          this.btn_el.setAttribute('data-target', '#myModal_share')
          this.btn_el.style = "margin-right:46px";
          this.btn_el.setAttribute('class', 'pdfPopupBtn');
          document.getElementById('header-modal')?.appendChild(this.btn_el);
        }
      });
    });
  }
  share_data(recipient: any) {
    if (recipient != '') {
      this.counter = 0;
      for (let i = 0; i < this.pageread.length; i++) {
        // this.idvalue = "bookcheck" + this.pageread[i].book_page_no;
        this.idval = document.getElementById("bookcheck" + this.pageread[i].book_page_no);
        if (this.idval.checked == true) {
          this.page_data[this.counter++] = this.pageread[i].book_page_no;
          this.idval.checked = false;
        }
      }
      this.counter = 0;
      this.shr_pg.share_page(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), this.book_id, this.pub_id, this.page_data, recipient).subscribe(data => {
        var objshare = JSON.parse(data);
        if (objshare.success == 1) {
          //this.snackbarshow = false;
          this.snackbar = document.getElementById("snackbar1")
          this.snackbar.className = "show";
          // alert("Your link has been shared!!");
          this.linkshareinterpolation = "Your link has been shared!!";
          setTimeout(() => {
            //alert("snackbar alert")
            this.snackbar.className = this.snackbar.className.replace("show", "");
          }, 3000);
        }
      })
      this.page_data.length = 0;
    }
    else {
      this.page_data.length = 0;
      // alert("Please provide the recipient");
      this.toastr.errorToastr('Please provide the recipient','');
    }
  }
  onpage(){this.loader=false;}
  read(v1: any, v2: any, v3: any,v4:any,v5:any) {

    this.loading=true;
    this.pdfBytes='';
    this.navDiv=document.getElementById("mySidenav");this.navDiv.style.width = "100%";this.navDiv.style.padding = "0px";this.navDiv.style.height = "0px";
    this.navDiv=document.getElementById("responSivemySidenav");this.navDiv.style.width = "100%";this.navDiv.style.padding = "0px!important";this.navDiv.style.height = "0px";
    this.full_book='';
    this.pdfBytes='';
    this.buynowshowhide=true;
    this.active_book=v4;
    this.data_checked = true;
    this.disabledonebutton = true;
    this.sendmailinput = document.getElementById('sendmail');
    this.sendmailinput.value = ''
    this.check_counter = 0;
    this.pagecounter = 0;
    this.pagetoshare.length = 0;
    this.bk_name = v3;
    this.author_name=v5;
    this.book_id=v1;
    this.pub_id=v2;
    this.pageread.length = 0;
    this.getpages.get_book_details(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), v1, v2).subscribe(data11 => {
      var obj11 = JSON.parse(data11);
      this.total_page=obj11.message[0].page_count;
      this.per_page=obj11.message[0].price;
      this.mrp=obj11.message[0].print_book_mrp;
      this.offer_price=obj11.message[0].print_book_offermrp
      this.delivery_charge=obj11.message[0].print_book_deliverycharge;
      this.contents_pg=obj11.message[0].contents
      this.contents_pg.reverse()
       this.rd_pg.readpages(v1, v2, localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),'').subscribe(data => {
      var obj = JSON.parse(data);
      this.modifyPdf(obj.mergepdf);
      this.full_book=obj.full_book;
      this.open_pg='';
      for (let i = 0; i < obj.message.length; i++) {
        if(typeof(obj.message[i])!='string'){
        this.pageread[i] = obj.message[i];}
      }
      this.link = this.pageread[0].book_page_url;
      if(this.active_book=='A' && this.buynowshowhide){
        document.getElementById('share_btn')?.remove();
        this.btn_el = document.createElement('button');
        this.btn_el.innerHTML = "<i class='fa fa-share-alt' aria-hidden='true'></i>";
        this.btn_el.id = "share_btn";
        this.btn_el.setAttribute('data-toggle', 'modal');
        this.btn_el.setAttribute('data-target', '#myModal_share')
        this.btn_el.setAttribute('data-backdrop', false)
        this.btn_el.style = "margin-right:46px";
        this.btn_el.setAttribute('class', 'pdfPopupBtn');
        this.share = document.getElementById('sharelink');
        document.getElementById('header-modal')?.appendChild(this.btn_el);
      }
       this.loading=false;
    },error=>{
      this.loading=false;
    })
    }
    ,error=>{
      this.loading=false;
    }
    );
  }

  show_details(b_name:any,b_id:any,pub_id:any,v1:any,v2:any,total_page:any){
    this.show_hide=true;
    $('#subscribenow').prop('disabled',true);
    if(this.whole_book=='N'){
   if (v1 == '' || v2 == ''){
    this.show_hide=false;
     this.number_msg = "*Please provide page numbers";
     this.toastr.errorToastr(this.number_msg,'');
     $('#subscribenow').prop('disabled',false);
    }
   else if ((parseInt(v2) < parseInt(v1)) || parseInt(v2) < 0 || parseInt(v1) < 0){
     this.show_hide=false;
     this.number_msg = "*Please provide a valid range of pages";
     this.toastr.errorToastr(this.number_msg,'');
     $('#subscribenow').prop('disabled',false);
    }
    else if(parseInt(v2) > total_page || parseInt(v1) > total_page){
     this.show_hide=false;
       this.number_msg = "*Page does not exist.(Total Pages: " + total_page + ")";
       this.toastr.errorToastr(this.number_msg,'');
       $('#subscribenow').prop('disabled',false);
      }
   else {
     this.getPages.show_book(b_id, pub_id, localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
      this.bookflag=0;
     this.number_msg='';
      var obj = JSON.parse(data);
       for (let i = 0; i < obj.message.length; i++) {
        this.bookpages[i] = obj.message[i];
        if(typeof(obj.message[i].book_page_no)=='string'){
        }
        else{
         if (v1 ==  obj.message[i].book_page_no || v2 ==  obj.message[i].book_page_no) {
          //  this.loading=false;
           this.bookflag = 1; 
           this.number_msg = "*Please select a page which is neither bought nor shown in preview";
           break;
         }
        }
      }
      if (this.bookflag == 0) {
        this.show_hide=false;
        this.number_msg = "";
        this.fromtag = document.getElementById('frompg');
        this.fromtag.value = '';
        this.totag = document.getElementById('topg');
        this.totag.value = '';
          //  this.router.navigate(['/user/payment',b_id, pub_id,b_name,v1,v2,this.whole_book]).then(()=>{
          //    $('.modal-backdrop').remove();
          // })
      }
      else{
       this.show_hide=false;
     }
     $('#subscribenow').prop('disabled',false);
    })
   }
 }
 else{
   // this.buy.buybook(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), b_name, b_id, pub_id, v1, v2,this.whole_book).subscribe(data => {
     // var objbuy=JSON.parse(data);
     // if(objbuy.success==1)
     //alert("You have successfully subscribed to the pages!");
     this.loading=false;
     $('#subscribenow').prop('disabled',false);
     // localStorage.setItem('book_Index',v2);
     this.router.navigate(['/user/payment',b_id, pub_id,b_name,1,1,this.whole_book]).then(()=>{
      //  location.reload();
      $('.modal-backdrop').remove();
     })
   // });
 }

   
}

  preventNonNumericalInput(e: any) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
  
    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
  }

  changeEvent(event:any){
    this.fromtag =$('#mySidenav').is(':visible') ? document.getElementById('frompg') : document.getElementById('resfrompg');
    this.totag = $('#mySidenav').is(':visible') ? document.getElementById('topg') :  document.getElementById('restopg');
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
  cart_add( v2: any, v3: any, v4: any, v5: any,total_page:any) {
  this.addtocartloader=true;
  $('#cartAdd').prop('disabled',true);
  if(this.whole_book=='N'){
  if (v4 == '' || v5 == ''){
  this.number_msg = "*Please provide page numbers";
  this.addtocartloader=false;
  this.toastr.errorToastr(this.number_msg,'');
  $('#cartAdd').prop('disabled',false);

}
  else if ((parseInt(v5) < parseInt(v4)) || parseInt(v5) < 0 || parseInt(v4) < 0){
    this.number_msg = "*Please provide a valid range of pages";
    this.addtocartloader=false;
    this.toastr.errorToastr(this.number_msg,'');
  $('#cartAdd').prop('disabled',false);

  }
  else if (parseInt(v5) > total_page|| parseInt(v4) > total_page){
    this.number_msg = "*Page does not exist.(Total Pages: " + total_page + ")";
    this.addtocartloader=false;
  $('#cartAdd').prop('disabled',false);
    this.toastr.errorToastr(this.number_msg,'');}
  else {
    this.bookflag=0;
    this.number_msg='';
    this.getPages.show_book(v3, v2, localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data => {
      // this.pages.length=0;
      this.bookpages.length=0;
      this.bookflag=0;
      
      this.number_msg='';
       var obj = JSON.parse(data);
       this.totalpages = obj.count_totalpages;
       for (let i = 0; i < obj.message.length; i++) {
         this.bookpages[i] = obj.message[i];
         if(typeof(obj.message[i].book_page_no)=='string'){
        
         }
         else{
          if (v4 ==  obj.message[i].book_page_no || v5 ==  obj.message[i].book_page_no) {
            // this.loading=false;
            this.bookflag = 1; 
            this.number_msg = "*Please select a page which is neither bought nor shown in preview";
            this.toastr.errorToastr(this.number_msg,'');
            break;
          }
         }
       }
        if (this.bookflag == 0) {
      this.number_msg = "";
      this.fromtag = document.getElementById('frompg');
      this.fromtag.value = '';
      this.totag = document.getElementById('topg');
      this.totag.value = '';
      this.addtocart.add_to_cart(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), v2, v3, v4, v5,this.whole_book).subscribe(data => {
        var objbuy=JSON.parse(data);
        if(objbuy.success==1)
       { 
        this.addtocartloader=false;
        this.cartbuttonshow=true; 
        this.getcartvalue();
        this.toastr.successToastr('Successfully added to cart','');   
      }
      else{
        this.addtocartloader=false;
        this.toastr.errorToastr('Cart addition failed','');
      }
        });
      }
      else{
        this.addtocartloader=false;
      }
      $('#cartAdd').prop('disabled',false);
      })
  }
 }
 else{
  this.addtocart.add_to_cart(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'), v2, v3, v4, v5,this.whole_book).subscribe(data => {
    var objbuy=JSON.parse(data);
    if(objbuy.success==1)
   { 
    this.addtocartloader=false;
    this.cartbuttonshow=true; 
     $('#cartAdd').prop('disabled',false);
    this.getcartvalue();
    this.toastr.successToastr('Successfully added to cart','');   
  }
  else{
    this.addtocartloader=false;
    this.toastr.errorToastr('Cart addition failed','');
  }
  $('#cartAdd').prop('disabled',false);
    });
 }
  }
gotcart(){
      // alert("hello")
      this.router.navigate(['/user/cart']).then(()=>{
        location.reload();
      })
    }
  getcartvalue(){
    this.show1.getcart(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token')).subscribe(data=>{
      this.userdata11.length=0;
      this.userdata11=JSON.parse(data);
      if(this.userdata11.success=='1')
      this.c=this.userdata11.message.length;
      else
      this.c=0;
    })
  }

  buyHardCopy(state:any,city:any,pincode:any,address:any){
    // this.number_msg='';
    // this.bookid = localStorage.getItem('user_book_id');
    // this.pubid = localStorage.getItem('user_pub_id');
    // this.buyhardcopy.buyHardCopy(localStorage.getItem('u-id'), localStorage.getItem('user-type_user'), localStorage.getItem('remember_token'),this.book_id,this.pub_id,state,city,pincode,address)
    // .subscribe(data=>{
    // this.hardCopyData=JSON.parse(data);
    // if(this.hardCopyData.success==1){
    //   // this.number_msg="You will be notified when the item is shipped!!"
    //   this.read(this.book_id,this.pub_id,this.bk_name,this.active_book,this.author_name);
    //   this.toastr.successToastr("You will be notified when the item is shipped!!",'')
    // }
    // else{
    //   // this.number_msg="Something went wrong!"
    //   this.toastr.errorToastr("Something went wrong!",this.number_msg)
    // }
    // // this.toastr.errorToastr(this.number_msg,'Oops!',{animate:'slideFromBottom'})
    // },error=>{
    //   this.number_msg="Something went wrong!"
    //   this.toastr.errorToastr("Oops!",this.number_msg)
    // })
    // // this.number_msg="You will be notified when the item is shipped!!"
    // // this.toastr.successToastr(this.number_msg,"Success")
  }
  openPages(pg:any){
    for(let i=0;i<this.buyBooks.length;i++){
    if(this.buyBooks[i].book_page_no==pg.split('-')[0])
     { 
       this.open_pg=pg.split('-')[0];
       this.hasPage=1;
       break;
     }
    else 
      this.hasPage=0;
    }
  if(this.hasPage==0){
    this.toastr.errorToastr("This section hasn't been purchased!",'Oops!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000,maxShown:"1"})
  }
  }
  openNav() {
    this.show_sidenav=!this.show_sidenav
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
  close_modal(){
    this.buynowshowhide=true;
  this.cartbuttonshow=false;
  this.number_msg = "";
  this.fromtag = document.getElementById('frompg');
  this.fromtag.value = '';
  this.fromtag.removeAttribute("disabled");
  this.totag = document.getElementById('topg');
  this.totag.value = '';
  this.totag.removeAttribute("disabled");
  this.fromtag=document.getElementById('resfrompg');this.fromtag.value = '';
  this.totag = document.getElementById('restopg');this.totag.value = '';
  this.fromtag.removeAttribute("disabled");this.totag.removeAttribute("disabled");
  this.totag = document.getElementById('changeInputres');
  this.totag.checked=false;
  this.totag = document.getElementById('changeInput');
  this.totag.checked=false;
  this.loader=false;
}
async modifyPdf(Url:any[]) {
  this.pdfBytes = '';
  this.spin=true;
  const pdfDoc = await PDFDocument.create();
  for(let i=0;i< Url.length;i++){
    // console.log('Checking Network Status: '+ this.isConnected);
    if(this.isConnected == true){
      // console.log('netWork retrived');
      if(i==300 || i==700){this.spin=true;}
      const existingPdfBytes = await fetch(Url[i]).then(res => res.arrayBuffer())
      const firstDonorPdfDoc = await PDFDocument.load(existingPdfBytes);
      const firstDonorPage = await pdfDoc.copyPages(firstDonorPdfDoc, firstDonorPdfDoc.getPageIndices())
      firstDonorPage.forEach((page) => pdfDoc.addPage(page));
      if(i==100 || i==300 || i==700){
        const pdfBytes = await pdfDoc.save();
        let file = new Blob([pdfBytes], { type: 'application/pdf'});   
        this.pdfBytes = URL.createObjectURL(file);
        this.spin=false;
        }
    }
    else
      {  
        //  console.log('Network')
          this.observe = this.utilyT.getIsConnected().subscribe(res => {
             if(res){
              //  console.log('netWork retrived');
               
              if(i == (Url.length - 1)){
                this.modifyPdf(Url);
                this.observe.unsubscribe();
              } 
             }
          })       
      }
   }
   console.log('ss')
   const pdfBytes = await pdfDoc.save();
   let file = new Blob([pdfBytes], { type: 'application/pdf'});   
   this.pdfBytes = URL.createObjectURL(file);
   this.spin=false;
}
async clickonlinkpdf(Url:any[],not_buy_pages:any[]){
  this.pdfBytes = '';
  const pdfDoc = await PDFDocument.create()
  if(Url.length > 0){
     if(not_buy_pages.length > 0){
     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
      const page = pdfDoc.addPage()
      const { width, height } = page.getSize()
      const fontSize = 30
      page.drawText('Please buy the pages to read', {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
        rotate: degrees(-45),
      })
     }
     for(let i=0;i< Url.length;i++){
       if(this.isConnected == true){
        if(i==300 || i==700){this.spin=true;}
        const existingPdfBytes = await fetch(Url[i]).then(res => res.arrayBuffer())
        const firstDonorPdfDoc = await PDFDocument.load(existingPdfBytes);
        const firstDonorPage = await pdfDoc.copyPages(firstDonorPdfDoc, firstDonorPdfDoc.getPageIndices())
        firstDonorPage.forEach((page) => pdfDoc.addPage(page));
        if(i==100 || i==300 || i==700){
          const pdfBytes = await pdfDoc.save();
          let file = new Blob([pdfBytes], { type: 'application/pdf'});   
          this.pdfBytes = URL.createObjectURL(file);
          this.spin=false;
          }
       }
       else 
       {
           this.observe = this.utilyT.getIsConnected().subscribe(res => {
               if(res){
                this.clickonlinkpdf(Url,not_buy_pages);
                this.observe.unsubscribe();
                  }
            })
       }
     }
     const pdfBytes = await pdfDoc.save();
     let file = new Blob([pdfBytes], { type: 'application/pdf'});   
     this.pdfBytes = URL.createObjectURL(file);
     this.spin=false;
  }
  else if(Url.length==0 && not_buy_pages.length > 0){
    if(this.isConnected == true){
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
      const page = pdfDoc.addPage()
      const { width, height } = page.getSize()
      const fontSize = 30
      page.drawText('Please buy the pages to read', {
        x: 55,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
        rotate: degrees(-45),
      })
      const pdfBytes = await pdfDoc.save();
      let file = new Blob([pdfBytes], { type: 'application/pdf'});   
      this.pdfBytes = URL.createObjectURL(file);
    }
    else{
      this.observe = this.utilyT.getIsConnected().subscribe(res => {
        if(res){
         this.clickonlinkpdf(Url,not_buy_pages);
         this.observe.unsubscribe();
         }
     })
    }
  }
  
}
changePage(event:any){this.open_pg=event}
check_all(event:any){
  this.sendmailinput = document.getElementById('sendmail');
  for(let i = 0 ; i< this.pageread.length ; i++){ 
    this.selectAll = document.getElementById('bookcheck'+ this.pageread[i].book_page_no);
    this.selectAll.checked = event.target.checked ? true : false; 
  }
  this.disabledonebutton = event.target.checked && this.sendmailinput.value != '' ? false : true;
  this.data_checked = event.target.checked ? false : true;
}
_SelectAll(_check_counter:any){
   this.selectAll = document.getElementById('selall');
   this.selectAll.checked = _check_counter == this.pageread.length ? true : false;
}
ngOnDestroy(){
  this.subs.unsubscribe();
}
}
