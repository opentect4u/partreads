import { Component, OnInit, ViewChild, ElementRef, ɵbypassSanitizationTrustStyle } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";
import { PurchasedbooksService } from "./purchasedbooks.service";
import { ReadpageService } from "./readpage.service";
import { SharepageService } from "./sharepage.service";
import { ErrorStateMatcher, ThemePalette } from "@angular/material/core";
import { ProgressBarMode } from "@angular/material/progress-bar";
import { BuynowInitService } from "../userbookdetailspage/buynow-init.service";
import { BuynowService } from "../userbookdetailspage/buynow.service";
import { AddtocartserveService } from "../userbookdetailspage/addtocartserve.service";
import { UserbookdetailsService } from "../userbookdetails.service";
import { BuyhardcopyService } from "../userbookdetailspage/buyhardcopy.service";
import { GlobalConstants } from "src/app/globalvar/global";
import { PDFDocument } from "pdf-lib";
import { UtilityTService } from "src/app/Utility/utility-t.service";
import { Router } from "@angular/router";
import { interval, Subscription } from "rxjs";
import { pluck } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";


declare const showprofile: any;
declare var $: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: "app-purchase-list",
  templateUrl: "./purchase-list.component.html",
  styleUrls: [
    "./purchase-list.component.css",
    "../../../assets/cssfiles/bootstrap.css",
    "../../../assets/cssfiles/font-awesome.css",
    "../../../assets/chosen/chosen.css",
    "../../../assets/cssfiles/apps.css",
    "../../../assets/cssfiles/res.css",
    "../../../assets/cssfiles/apps_inner.css",
  ],
  animations: [
    trigger("fade", [
      transition("void => *", [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PurchaseListComponent implements OnInit {
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  __sharepdf = new FormGroup({
       from_page: new FormControl(''),
       to_page: new FormControl(''),
       single_page: new FormControl(''),
       is_selectAll : new FormControl(false)
    })

  share_pdfBytes: any;
  spin = false;
  addtocartloader: boolean = false;
  show_hide: boolean = false;
  @ViewChild("openModal") openModal!: ElementRef;
  @ViewChild("myModal") mymodal!: ElementRef;
  pdfBytes: any;
  pdfDoc: any;
  merge_url = GlobalConstants.mergeURL;
  mergepdf: any;
  btnDiv: any;
  delivery_charge: any;
  mrp: any;
  offer_price: any;
  hardCopyData: any;
  full_book: any = "";
  subs!:Subscription;
  isConnected:boolean= true;
  constructor(
    private sanitizer: DomSanitizer,
    private utilyT:UtilityTService,
    private buyhardcopy: BuyhardcopyService,
    private userbooks: UserbookdetailsService,
    private addtocart: AddtocartserveService,
    private buy: BuynowService,
    private sharecheck: SharepageService,
    private shr_pg: SharepageService,
    private router: Router,
    private purchased: PurchasedbooksService,
    private rd_pg: ReadpageService,
    private getpages: BuynowInitService,
    private toastr: ToastrManager
  ) {
      this.subs = this.utilyT.getIsConnected().subscribe(res => {
               this.isConnected = res; 
      })
  
  }
  firstDonorPage: any = [];
  hasPage = 0;
  color1: ThemePalette = "warn";
  color2: ThemePalette = "accent";
  color3: ThemePalette = "warn";
  mode: ProgressBarMode = "buffer";
  bufferValue = 100;
  p: number = 1;
  sendmailinput: any;
  divdata: any;
  bookid: any;
  counter = 0;
  share: any;
  ratingData: any = [];
  whole_book: any = "N";
  bk_name: any;
  link: any;
  pubid: any;
  bk_id: any;
  pid: any;
  idval: any;
  idval1: any;
  purchasedata: any = [];
  pageread: any = [];
  h4_el: any;
  check_counter = 0;
  src_el: any;
  page_data: any = [];
  idvalue: string = "";
  bookdetailspage: any = [];
  purchasedpages: any = [];
  btn_el: any;
  email_sender: any;
  data_checked = true;
  pagetoshare: any = [];
  linkgen: any = [];
  pagecounter = 0;
  gen_link: any;
  snackbarshow = true;
  snackbar: any;
  idvaluecheck: any;
  idvalcheck: any;
  disabledonebutton = true;
  linkshareinterpolation = "";
  loader = true;
  errormessage: any;
  reviewModalDiv: any;
  contents_pg: any;
  // pub_id:any='';
  // book_id:any='';
  active_book: any = "";
  author_name: any = "";
  publisher_name: any = "";
  total_page: any = "";
  per_page: any = "";

  substring: any;
  // substring:any='';
  avgRate: any = [];
  ratingsArr1: any;
  sumRatings = 0;
  reviewData: any = [];
  reviewData1: any = [];
  avgrt: any;
  rate_5 = 0;
  rate_4 = 0;
  rate_3 = 0;
  rate_2 = 0;
  rate_1 = 0;
  t1 = 0;
  t2 = 0;
  t3 = 0;
  t4 = 0;
  t5 = 0;
  individualRating: any;
  reviewBookName: any;
  show_reviews = true;
  minRange = 0;
  maxRange = 2;
  check_pg: any;
  number_msg: any = "";
  bookflag = 0;
  fromtag: any;
  totag: any;
  pages: any = [];
  totalpages: any;
  bookpages: any = [];
  cartbuttonshow = false;
  userdata11: any = [];
  Index: any = "";
  open_modal_after_buy: any = "";
  book_details: any = [];
  c = 0;
  loading: boolean = false;
  pubidUrl: any;
  bookidUrl: any;
  booknmUrl: any;
  activeUrl: any;
  authUrl: any;
  open_pg: any;
  show_sidenav: any;
  navDiv: any;
  buyBooks: any = [];
  Full_Book: any = [];
  observe!:Subscription;
  book_dtls:any;
  ngOnInit(): void {
    this.navDiv = document.getElementById("mySidenav");
    this.navDiv.style.width = "0";
    this.navDiv.style.padding = "0";
    this.email_sender = localStorage.getItem("u-token");
    this.bookid = localStorage.getItem("user_book_id");
    this.pubid = localStorage.getItem("user_pub_id");
    this.purchased
      .purchasedlist(
        localStorage.getItem("u-id"),
        localStorage.getItem("user-type_user"),
        localStorage.getItem("remember_token")
      )
      .subscribe(
        (data) => {
          // console.log(data);
          this.loader = false;
          var obj = JSON.parse(data);
          this.bookdetailspage = obj.message;
          for (let i = 0; i < obj.message.length; i++) {
            this.sumRatings = 0;
            for (let j = 0; j < this.bookdetailspage[i].ratings.length; j++) {
              this.sumRatings =
                this.sumRatings +
                Number(this.bookdetailspage[i].ratings[j].rating_no);
            }
            if (this.bookdetailspage[i].ratings.length) {
              this.avgRate[i] =
                this.sumRatings / this.bookdetailspage[i].ratings.length;
              this.avgRate[i] = Math.round(this.avgRate[i]);
              // console.log(this.avgRate[i])
            } else this.avgRate[i] = 0;
          }
          for (let i = 0; i < this.bookdetailspage.length; i++) {
            if (
              this.bookdetailspage[i].book_id ==
              localStorage.getItem("book_Index")
            ) {
              this.read(
                this.bookdetailspage[i].book_id,
                this.bookdetailspage[i].publisher_id,
                this.bookdetailspage[i].book_name,
                this.bookdetailspage[i].active_book,
                this.bookdetailspage[i].author_name
              );
              this.open_modal_after_buy = document.getElementById("Open_Modal");
              this.open_modal_after_buy.click();
              localStorage.removeItem("book_Index");
            }
          }
          // this.loading=true;
        },
        (errorMessage) => {
          this.substring = errorMessage.substr(0, 3);
          if (this.substring != "und") {
            this.errormessage = errorMessage.substr(11, 132);
          } else {
            this.substring = errorMessage.substr(18, 27);
          }
          this.utilyT.showToastr('Server did not responds , please try again later','E')
        }
      );
    localStorage.setItem("address", "/user/purchaselist");
  }
  preview(){
    this.previewPdf(
      '','',this.__sharepdf.value.single_page,this.book_dtls);
  }
  pdfShare(){
    this.previewPdf(
      this.__sharepdf.value.from_page,
      this.__sharepdf.value.to_page,'',this.book_dtls);
  }

  previewPdf(frm_page:string,to_page:string,singlePage:string,bkDtls: any){
    this.loader = true;
    this.rd_pg.sharePreview(bkDtls?.book_id, 
      bkDtls?.publisher_id, 
      localStorage.getItem('u-id'),
      '/api/user/sharepreview',
      frm_page,to_page,localStorage.getItem('user-type_user'),
      localStorage.getItem('remember_token'),
      singlePage).pipe(pluck("message")).subscribe((res: any) => {
      this.__sharepdf.reset();
       console.log(res.length);
       
      if(res.length > 0){
        this.share_view_Pdf(res);
      }      
      else{
        //alert message
        this.toastr.errorToastr('Sorry!! You have not purchased the pages yet');
      }
    this.loader = false;
    },
    error => {
      this.loader = false;
    })
  }

  onpage() {
    this.loader = false;
  }
  onRightClick(evt: MouseEvent) {
    if (evt.button == 2) {
      evt.preventDefault();
    }
  }
  checkdata(page: any, bookid: any, publisherid: any) {
    // console.log(page);
    this.bookid = bookid;
    this.pubid = publisherid;
    for (let i = 0; i < this.pageread.length; i++) {
      if (page == this.pageread[i].book_page_no) {
        // console.log("bookcheck" + page);

        this.idvalue = "bookcheck" + page;
        this.idval = document.getElementById(this.idvalue);
        if (this.idval.checked == true) {
          this.check_counter++;
          this.data_checked = false;
          this.sendmailinput = document.getElementById("sendmail");
          if (this.sendmailinput.value != "") this.disabledonebutton = false;
          else this.disabledonebutton = true;
        } else {
          this.idval1 = document.getElementById("selall");
          this.idval1.checked = false;
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
  }
  preventemptymail() {
    this.sendmailinput = document.getElementById("sendmail");
    if (this.sendmailinput.value == "") {
      // console.log(this.sendmailinput.value);
      this.disabledonebutton = true;
    } else {
      if (this.check_counter > 0) this.disabledonebutton = false;
      else this.disabledonebutton = true;
    }
  }
  check_all(e: any) {
    this.check_counter = 0;
    this.sendmailinput = document.getElementById("sendmail");
    if (e.target.checked) {
      for (let i = 0; i < this.pageread.length; i++) {
        this.check_pg = document.getElementById(
          "bookcheck" + this.pageread[i].book_page_no
        );
        this.check_pg.checked = true;
        this.check_counter++;
      }
      this.data_checked = false;
      this.disabledonebutton = this.sendmailinput.value != "" ? false : true;
    } else {
      for (let i = 0; i < this.pageread.length; i++) {
        this.check_pg = document.getElementById(
          "bookcheck" + this.pageread[i].book_page_no
        );
        this.check_pg.checked = false;
      }
      this.data_checked = true;
      this.disabledonebutton = true;
    }
  }
  copylink() {
    this.check_counter = 0;
    this.data_checked = true;
    this.pagetoshare.length = 0;
    this.pagecounter = 0;
    this.divdata = document.getElementById("gen_link_footer");
    this.gen_link = document.createElement("input");
    for (let i = 0; i < this.pageread.length; i++) {
      this.idvalue = "bookcheck" + this.pageread[i].book_page_no;
      this.idval = document.getElementById(this.idvalue);
      if (this.idval.checked == true) {
        this.pagetoshare[this.pagecounter++] = this.pageread[i].book_page_no;
      }
      this.idval = document.getElementById(this.idvalue);
      this.idval.checked = false;
    }
    this.idval = document.getElementById("selall");
    this.idval.checked = false;
    this.sharecheck
      .share_page(
        localStorage.getItem("u-id"),
        localStorage.getItem("user-type_user"),
        localStorage.getItem("remember_token"),
        this.bookid,
        this.pubid,
        this.pagetoshare,
        ""
      )
      .subscribe((data) => {
        var objlink = JSON.parse(data);
        this.linkgen = objlink.message;
        this.gen_link.value = this.linkgen;
        this.divdata.appendChild(this.gen_link);
        this.gen_link.select();
        document.execCommand("copy");
        this.divdata.removeChild(this.gen_link);
        this.gen_link.value = "";
        this.snackbarshow = false;
        this.snackbar = document.getElementById("snackbar1");
        this.snackbar.classList.add("show");
        this.linkshareinterpolation = "Your link has been copied!!";
        setTimeout(() => {
          this.snackbar.className = this.snackbar.className.replace("show", "");
        }, 3000);       
      });
  }

  share_data(recipient: any) {
    // alert(this.bk_name+" "+this.bk_id+" "+this.pid+" "+recipient);
    if (recipient != "") {
      // console.log("Sending: ");
      this.counter = 0;
      for (let i = 0; i < this.pageread.length; i++) {
        this.idvalue = "bookcheck" + this.pageread[i].book_page_no;
        this.idval = document.getElementById(this.idvalue);
        if (this.idval.checked == true) {
          this.page_data[this.counter++] = this.pageread[i].book_page_no;
          this.idval.checked = false;
        }
      }
      // for (let i = 0; i < this.counter; i++) {console.log(this.page_data[i]) }
      // console.log("To " + recipient);

      this.counter = 0;
      this.shr_pg
        .share_page(
          localStorage.getItem("u-id"),
          localStorage.getItem("user-type_user"),
          localStorage.getItem("remember_token"),
          this.bk_id,
          this.pid,
          this.page_data,
          recipient
        )
        .subscribe((data) => {
          // console.log(data)
          var objshare = JSON.parse(data);
          if (objshare.success == 1) {
            //this.snackbarshow = false;
            this.snackbar = document.getElementById("snackbar1");
            this.snackbar.className = "show";
            // alert("Your link has been shared!!");
            this.linkshareinterpolation = "Your link has been shared!!";
            setTimeout(() => {
              //alert("snackbar alert")
              this.snackbar.className = this.snackbar.className.replace(
                "show",
                ""
              );
            }, 3000);
          }
        });
      //console.log(data);
      this.page_data.length = 0;
    } else {
      this.page_data.length = 0;
        this.utilyT.showToastr('Please provide the recipient','E') 
    }
  }
  read(v1: any, v2: any, v3: any, active_book: any, author_name: any) {
    // localStorage.removeItem('_mergePdf');
    this.loader = true;
    this.pdfBytes = "";
    if ($("#mySidenav").is(":visible") == true) {
      this.navDiv = document.getElementById("mySidenav");
      this.navDiv.style.width = "100%";
      this.navDiv.style.padding = "0";
      this.navDiv.style.height = "0px";
    } else {
      this.navDiv = document.getElementById("responSivemySidenav");
      this.navDiv.style.width = "100%";
      this.navDiv.style.padding = "0";
      this.navDiv.style.height = "0px";
    }
    this.Full_Book.length = 0;
    this.full_book = "";
    this.navDiv = document.getElementById("mySidenav");
    this.navDiv.style.width = "0";
    this.navDiv.style.height = "0px";
    this.navDiv.style.padding = "0";
    // this.book_id=v1;
    // this.pub_id=v2;
    this.active_book = active_book;
    this.author_name = author_name;
    this.bk_name = v3;
    this.bookid = v1;
    this.pubid = v2;
    //For getting total page for the particular book
    this.userbooks
      .get_book_details(
        localStorage.getItem("u-id"),
        localStorage.getItem("user-type_user"),
        localStorage.getItem("remember_token"),
        v1,
        v2
      )
      .subscribe((data) => {
        this.total_page = "";
        var obj = JSON.parse(data);
        this.total_page = obj.count_totalpages;
        this.buyBooks = obj.message[0].Buy_pages;
        this.delivery_charge = obj.message[0].print_book_deliverycharge;
        this.mrp = obj.message[0].print_book_mrp;
        this.offer_price = obj.message[0].print_book_offermrp;
        this.contents_pg = obj.message[0].contents;
        for (let i = 0; i < obj.message.length; i++) {
          this.publisher_name = obj.message[i].publisher_name;
          this.total_page = obj.message[i].page_count;
          this.per_page = obj.message[i].price;
          this.contents_pg = obj.message[i].contents;
        }
        this.contents_pg.reverse();
        $("body").removeAttr("style");
        this.data_checked = true;
        this.disabledonebutton = true;
        this.sendmailinput = document.getElementById("sendmail");
        this.sendmailinput.value = "";
        this.check_counter = 0;
        this.pagecounter = 0;
        this.pagetoshare.length = 0;
        this.pageread.length = 0;
        this.rd_pg
          .readpages(
            v1,
            v2,
            localStorage.getItem("u-id"),
            localStorage.getItem("user-type_user"),
            localStorage.getItem("remember_token"),
            this.total_page
          )
          .subscribe(
            (data) => {
               console.log(data)
              this.pdfBytes = "";
              this.open_pg = "";
              var obj = JSON.parse(data);
              this.full_book = obj.full_book;
              this.Full_Book = obj.mergepdf;
              this.modifyPdf(this.Full_Book);
              var j = 0;
              for (let i = 0; i < obj.message.length; i++) {
                if (obj.message[i].book_page_no.includes("_")) {
                } else {
                  this.pageread[j] = obj.message[i];
                  this.pages[j]= obj.message[i].book_page_no;
                  j++;
                }
              }    
              this.link = this.pageread[0].book_page_url;
              this.bk_id = this.pageread[0].book_id;
              this.pid = this.pageread[0].publisher_id;
              if (this.active_book == "A") {
                document.getElementById("share_btn")?.remove();
                this.btn_el = document.createElement("button");
                this.btn_el.innerHTML =
                  "<i class='fa fa-share-alt' aria-hidden='true'></i>";
                this.btn_el.id = "share_btn";
                this.btn_el.setAttribute("data-toggle", "modal");
                this.btn_el.setAttribute("data-target", "#myModal_share");
                this.btn_el.setAttribute("data-backdrop", false);
                this.btn_el.setAttribute("class", "pdfPopupBtn");
                this.btn_el.style = "margin-right:46px";
                this.share = document.getElementById("sharelink");
                document
                  .getElementById("header-modal")
                  ?.appendChild(this.btn_el);
                document
                  .getElementById("header-modaldeks")
                  ?.appendChild(this.btn_el);
              } else {
                this.loader = false;
              }
              this.loader = false;
            },
            (error) => {
              this.loader = false;
              this.utilyT.showToastr('server did not responds , please try again later','E') 
            }
          );
      });
  }
  

  onMouseEnter(event: any, book_id: any, bk_nm: any): void {
    this.reviewBookName = bk_nm;
    this.reviewData.length = 0;
    this.reviewData1.length = 0;
    this.ratingData.length = 0;
    this.maxRange = 2;
    this.minRange = 0;
    this.rate_1 = 0;
    this.rate_2 = 0;
    this.rate_3 = 0;
    this.rate_4 = 0;
    this.rate_5 = 0;
    for (let i = 0; i < this.bookdetailspage.length; i++) {
      if (this.bookdetailspage[i].book_id == book_id) {
        this.avgRate[i] = Math.round(this.avgRate[i]);
        this.avgrt = Math.round(this.avgRate[i]);
        for (let j = 0; j < this.bookdetailspage[i].ratings.length; j++) {
          if (this.bookdetailspage[i].ratings[j].rating_no == 5)
            this.rate_5 += 1;
          if (this.bookdetailspage[i].ratings[j].rating_no == 4)
            this.rate_4 += 1;
          if (this.bookdetailspage[i].ratings[j].rating_no == 3)
            this.rate_3 += 1;
          if (this.bookdetailspage[i].ratings[j].rating_no == 2)
            this.rate_2 += 1;
          if (this.bookdetailspage[i].ratings[j].rating_no == 1)
            this.rate_1 += 1;
          this.reviewData1.push({
            review: this.bookdetailspage[i].ratings[j].review,
            rating: this.bookdetailspage[i].ratings[j].rating_no,
          });

          this.reviewData.push({
            review: this.bookdetailspage[i].ratings[j].review,
            rating: this.bookdetailspage[i].ratings[j].rating_no,
          });
        }
        this.ratingData.push({
          rate_1: this.rate_1 * 10,
          rate_2: this.rate_2 * 10,
          rate_3: this.rate_3 * 10,
          rate_4: this.rate_4 * 10,
          rate_5: this.rate_5 * 10,
        });
      }
    }
    this.reviewData = this.reviewData1.slice(0, this.maxRange);
    this.t1 = this.ratingData[0].rate_1;
    this.t2 = this.ratingData[0].rate_2;
    this.t3 = this.ratingData[0].rate_3;
    this.t4 = this.ratingData[0].rate_4;
    this.t5 = this.ratingData[0].rate_5;
  }
  show() {
    showprofile();
  }
  // shr(){

  // }
  next() {
    this.minRange += 2;
    this.maxRange += 2;
    this.reviewData = this.reviewData1.slice(this.minRange, this.maxRange);
  }
  prev() {
    this.minRange -= 2;
    this.maxRange -= 2;
    this.reviewData = this.reviewData1.slice(this.minRange, this.maxRange);
  }

  /*Comment*/
  // go_to_user_bookdetails(book_id: any, publisher_id: any, active_book: any) {
  //   if (active_book == "I") {
  //     this.utilyT.showToastr('This book is deactivated by the publisher','E');
  //   } else {
  //         this.utilyT.go_to_user_bookDeatils_page(book_id,publisher_id)
  //   }
  // }
  /*END*/
  preventNonNumericalInput(e: any) {
    this.utilyT.preventNonNumericalInput(e);
  }

  onmouseleave(e:any){}
  show_details(
    b_name: any,
    b_id: any,
    pub_id: any,
    v1: any,
    v2: any,
    total_page: any
  ) {
    this.show_hide = true;
    $("#subscribenow").prop("disabled", true);
    const _response  = this.utilyT.cart_add(b_id, pub_id, v1, v2, this.pages,this.whole_book,total_page,'B');
    _response.then( (res:any) => {
      console.log(res);
    if(res > 0){
      $('#cartAdd').prop('disabled',false);
      this.show_hide = false;
      } 
      else{
      $('#cartAdd').prop('disabled',false);
      this.show_hide = false;
    } 
    })

  }
  cart_add(v2: any, v3: any, v4: any, v5: any, total_page: any) {   
    this.addtocartloader=true;
    $('#cartAdd').prop('disabled',true);
    const _response  = this.utilyT.cart_add(v2, v3, v4, v5, this.pages,this.whole_book,total_page,'C');
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
      _getCartVal.then(res => {this.c = Number(res);console.log(this.c);
      })

      } 
      else{
      $('#cartAdd').prop('disabled',false);
      this.addtocartloader=false;
    } 
    })
    // $("#cartAdd").prop("disabled", true);
    // this.addtocartloader = true;
    // if (this.whole_book == "N") {
    //   if (v4 == "" || v5 == "") {
    //     this.addtocartloader = false;
    //     this.number_msg = "*Please provide page numbers";
    //     this.utilyT.showToastr(this.number_msg,'E') 
    //     $("#cartAdd").prop("disabled", false);
    //   } else if (
    //     parseInt(v5) < parseInt(v4) ||
    //     parseInt(v5) < 0 ||
    //     parseInt(v4) < 0
    //   ) {
    //     this.addtocartloader = false;
    //     $("#cartAdd").prop("disabled", false);
    //     this.number_msg = "*Please provide a valid range of pages";
    //     this.utilyT.showToastr(this.number_msg,'E') 
    //   } else if (parseInt(v5) > total_page || parseInt(v4) > total_page) {
    //     this.addtocartloader = false;
    //     $("#cartAdd").prop("disabled", false);
    //     this.number_msg =
    //       "*Page does not exist.(Total Pages: " + total_page + ")";
    //        this.utilyT.showToastr(this.number_msg,'E') 
    //   } else {
    //     this.bookflag = 0;
    //     this.number_msg = "";
    //     this.getpages
    //       .show_book(
    //         v3,
    //         v2,
    //         localStorage.getItem("u-id"),
    //         localStorage.getItem("user-type_user"),
    //         localStorage.getItem("remember_token")
    //       )
    //       .subscribe((data) => {
    //         this.pages.length = 0;
    //         this.bookpages.length = 0;
    //         this.bookflag = 0;
    //          console.log(data);
    //         this.number_msg = "";
    //         var obj = JSON.parse(data);
    //         this.totalpages = obj.count_totalpages;
    //         for (let i = 0; i < obj.message.length; i++) {
    //           this.bookpages[i] = obj.message[i];
    //           if (typeof obj.message[i].book_page_no == "string") {
    //           } else {
    //             if (
    //               v4 == obj.message[i].book_page_no ||
    //               v5 == obj.message[i].book_page_no
    //             ) {
    //               this.addtocartloader = false;
    //               this.bookflag = 1;
    //               this.number_msg =
    //                 "*Please select a page which is neither bought nor shown in preview";
    //               break;
    //             }
    //           }
    //         }
    //         if (this.bookflag == 0) {
    //           this.number_msg = "";
    //           this.fromtag = document.getElementById("frompg");
    //           this.fromtag.value = "";
    //           this.totag = document.getElementById("topg");
    //           this.totag.value = "";
    //           this.addtocart
    //             .add_to_cart(
    //               localStorage.getItem("u-id"),
    //               localStorage.getItem("user-type_user"),
    //               localStorage.getItem("remember_token"),
    //               v2,
    //               v3,
    //               v4,
    //               v5,
    //               this.whole_book
    //             )
    //             .subscribe((data) => {
    //               // console.log(data)
    //               var objbuy = JSON.parse(data);
    //               if (objbuy.success == 1) {
    //                 this.addtocartloader = false;
    //                 this.cartbuttonshow = true;
    //                  this.c = this.utilyT.getcartvalue();
    //                    this.utilyT.showToastr('Added to cart successfull','S') 

    //               } else {
    //                 this.utilyT.showToastr('Cart addition failed','E')
    //               }
    //             });
    //         } else {
    //           this.addtocartloader = false;
    //           this.utilyT.showToastr(this.number_msg,'E')
    //         }
    //         $("#cartAdd").prop("disabled", false);
    //       });
    //   }
    // } else {
    //   this.addtocart
    //     .add_to_cart(
    //       localStorage.getItem("u-id"),
    //       localStorage.getItem("user-type_user"),
    //       localStorage.getItem("remember_token"),
    //       v2,
    //       v3,
    //       v4,
    //       v5,
    //       this.whole_book
    //     )
    //     .subscribe((data) => {
    //       // console.log(data)
    //       var objbuy = JSON.parse(data);
    //       if (objbuy.success == 1) {
    //         this.show_hide = false;
    //         this.cartbuttonshow = true;
    //         this.c = this.utilyT.getcartvalue();
    //         this.utilyT.showToastr('Added to cart successfull','S');
    //       } else {
    //         this.utilyT.showToastr('Cart addition failed','E');
    //       }
    //       $("#cartAdd").prop("disabled", false);
    //       this.addtocartloader = false;
    //     });
    // }
  }

  gotcart() {
   this.utilyT.gotcart()
  }
  close_modal() {
    // this.pdfBytes = "";
    this.cartbuttonshow = false;
    this.number_msg = "";
    this.fromtag = document.getElementById("frompg");
    this.fromtag.value = "";
    this.fromtag.removeAttribute("disabled");
    this.totag = document.getElementById("topg");
    this.totag.value = "";
    this.totag.removeAttribute("disabled");
    this.fromtag = document.getElementById("resfrompg");
    this.fromtag.value = "";
    this.totag = document.getElementById("restopg");
    this.totag.value = "";
    this.fromtag.removeAttribute("disabled");
    this.totag.removeAttribute("disabled");
    this.totag = document.getElementById("changeInputres");
    this.totag.checked = false;
    this.totag = document.getElementById("changeInput");
    this.totag.checked = false;
    this.loader = false;
  }

  changeEvent(event: any) {
    this.fromtag = $("#mySidenav").is(":visible")
      ? document.getElementById("frompg")
      : document.getElementById("resfrompg");
    this.totag = $("#mySidenav").is(":visible")
      ? document.getElementById("topg")
      : document.getElementById("restopg");
    if (event.target.checked) {
      this.fromtag.value = "";
      this.totag.value = "";
      this.fromtag.setAttribute("disabled", true);
      this.totag.setAttribute("disabled", true);
      this.whole_book = "Y";
    } else {
      this.fromtag.removeAttribute("disabled");
      this.totag.removeAttribute("disabled");
      this.whole_book = "N";
    }
  }
  openNav() {
    this.show_sidenav = !this.show_sidenav;
    if (this.show_sidenav == true) {
      if ($("#mySidenav").is(":visible") == true) {
        this.navDiv = document.getElementById("mySidenav");
        this.navDiv.style.width = "100%";
        this.navDiv.style.height = "310px";
      } else {
        this.navDiv = document.getElementById("responSivemySidenav");
        this.navDiv.style.width = "100%";
        this.navDiv.style.height = "310px";
      }
    } else {
      if ($("#mySidenav").is(":visible") == true) {
        this.navDiv = document.getElementById("mySidenav");
        this.navDiv.style.width = "100%";
        this.navDiv.style.padding = "0";
        this.navDiv.style.height = "0px";
      } else {
        this.navDiv = document.getElementById("responSivemySidenav");
        this.navDiv.style.width = "100%";
        this.navDiv.style.padding = "0";
        this.navDiv.style.height = "0px";
      }
    }
  }
  openPages(pg: any, full_book: any) {
    //   for(let i=0;i<this.buyBooks.length;i++){
    //   if(this.buyBooks[i].book_page_no==pg.split('-')[0])
    //    {
    //      this.open_pg=pg.split('-')[0];
    //      this.hasPage=1;
    //      break;
    //    }
    //   else
    //     this.hasPage=0;
    //   }
    //   if(this.hasPage==0){
    //     this.toastr.errorToastr("This section hasn't been purchased!",'Oops!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000,maxShown:"1"})
    //   }
    //  else{
    //    this.open_pg=pg.split('-')[0];
    //   }
  }
  buyHardCopy(state: any, city: any, pincode: any, address: any) {
    this.number_msg = "";
     this.utilyT.buyHardCopy(state,city,pincode,address,this.bookid,this.pubid);
  }
  changePage(event: any) {
    this.open_pg = event;
  }
  async modifyPdf(Url: any[]) {
    this.pdfBytes ='';
    this.spin = true;
    const pdfDoc = await PDFDocument.create();
    for(let i = 0; i < Url.length; i++) {
      if(this.isConnected == true){
        if (i == 300 || i == 700) {this.spin = true;}
        const existingPdfBytes = await fetch(Url[i]).then((res) =>res.arrayBuffer());
        const firstDonorPdfDoc = await PDFDocument.load(existingPdfBytes);
        const firstDonorPage = await pdfDoc.copyPages(firstDonorPdfDoc,firstDonorPdfDoc.getPageIndices());
        firstDonorPage.forEach((page) => pdfDoc.addPage(page));
        if (i == 100 || i == 300 || i == 700 || i==(Url.length -1)) {
         const pdfBytes = await pdfDoc.save();
          let file = new Blob([pdfBytes], { type: "application/pdf" });
          this.pdfBytes = URL.createObjectURL(file);
          this.spin = false;
        
        }
      }
      else
      {
        this.observe = this.utilyT.getIsConnected().subscribe(async res => {
            if(res){
              if(i == (Url.length-1)){
                 console.log('Last Index with Unscubcribe');
                this.modifyPdf(Url);
                this.observe.unsubscribe();
              }
            }
            else{}
          })
      }
      } 
    const pdfBytes = await pdfDoc.save();
    let file = new Blob([pdfBytes], { type: "application/pdf" });
    this.pdfBytes = URL.createObjectURL(file);
    console.log(this.pdfBytes);
    
    this.spin = false; 
  }
  ngOnDestroy(){this.subs.unsubscribe();}

  share_book(bookDtls: any){
    this.book_dtls= bookDtls;

    console.log(bookDtls);
    
  }

  async share_view_Pdf(Url: any[]) {
    this.share_pdfBytes ='';
    this.spin = true;
    const pdfDoc = await PDFDocument.create();
    for(let i = 0; i < Url.length; i++) {
      if(this.isConnected == true){
        if (i == 300 || i == 700) {this.spin = true;}
        const existingPdfBytes = await fetch(Url[i]).then((res) =>res.arrayBuffer());
        const firstDonorPdfDoc = await PDFDocument.load(existingPdfBytes);
        const firstDonorPage = await pdfDoc.copyPages(firstDonorPdfDoc,firstDonorPdfDoc.getPageIndices());
        firstDonorPage.forEach((page) => pdfDoc.addPage(page));
        if (i == 100 || i == 300 || i == 700 || i==(Url.length -1)) {
         const pdfBytes = await pdfDoc.save();
          let file = new Blob([pdfBytes], { type: "application/pdf" });
          this.share_pdfBytes = URL.createObjectURL(file);
          this.spin = false;
        }
      }
      else
      {
        this.observe = this.utilyT.getIsConnected().subscribe(async res => {
            if(res){
              if(i == (Url.length-1)){
                 console.log('Last Index with Unscubcribe');
                this.share_view_Pdf(Url);
                this.observe.unsubscribe();
              }
            }
            else{}
          })
      }
      } 
    const pdfBytes = await pdfDoc.save();
    let file = new Blob([pdfBytes], { type: "application/pdf" });
    this.share_pdfBytes = URL.createObjectURL(file);   
    this.spin = false; 
  }

  closeShareModal(){
    this.share_pdfBytes = '';
  }
  getSanitizedURL(pdfUrl: string) {
    return this.sanitizer.bypassSecurityTrustUrl(pdfUrl);
  }
}

