import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PublishercategoryshowService } from 'src/app/publishercategoryshow.service';
import { PublishersubcategoryshowService } from 'src/app/publishersubcategoryshow.service';
import { pubsubCat } from '..//../pubsubcat';
import { Book } from '..//..//book';
import { BookuploadService } from 'src/app/bookupload.service';
import { myobj } from '..//..//myobj';
import { SplitbookService } from './splitbook.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import * as $ from 'jquery';
import { PubsiderbarinfoService } from 'src/app/pubsiderbarinfo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ToastrManager } from 'ng6-toastr-notifications';


// declare var $: any;
declare var tools: any;
declare var showprofile: any;
declare var PreviewImage: any;
export class OtherContents{   
   title:any;
   description:any;
   actual_page:any;
   pdf_page:any;
}
@Component({
  selector: 'app-ebookupload',
  templateUrl: './ebookupload.component.html',
  styleUrls: ['./ebookupload.component.css',
    '../../../assets/cssfiles/bootstrap.css',
    '../../../assets/cssfiles/font-awesome.css',
    '../../../assets/chosen/chosen.css',
    '../../../assets/cssfiles/apps.css',
    '../../../assets/cssfiles/res.css',
    '../../../assets/cssfiles/apps_inner.css'
  ],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateY(20px)' })),
      ]),
    ]),
  ]
})
export class EbookuploadComponent implements OnInit {
  pagecounter:any;
  table:any;
  image_empty:any;
  preview_book_image:any;
  isbn_check:boolean=false;
  preview_file_name:any;
  other_contents: Array<OtherContents> = [{title:'',description:'',actual_page:'',pdf_page:''}];
  cate_gories:any=[];
  subcate_gories:any=[];
  x: any;
  division: any;
  fval: string = '';
  isConnected = true;
  noInternetConnection = false;
  startpage: any;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  category_subcategory!:FormGroup;
  lastFormGroup!:FormGroup;
  cat =[];
  subcate =[];
  constructor(private toaster:ToastrManager,private _formBuilder: FormBuilder,private split: SplitbookService, private router: Router, private cookieService: CookieService, private showcat: PublishercategoryshowService, private showsubcat: PublishersubcategoryshowService, private upld: BookuploadService,private pubinfo: PubsiderbarinfoService) {
  }
  nm_img:any;
  userData: any = [];
  divover: any;
  category: any = [];
  userData1: any = [];
  category1: any = [];
  bookdata: any;
  bookdata1: any;
  endpage: any;
  pages: any;
  b: any;
  processing_message = "Processing";
  pgbar: number = 0;
  pgbstring: string = '';
  counter_temp: number = 0;
  counter: number = 0;
  b1 = new myobj('');
  modal_show = false;
  progress_show: boolean = false;
  checkbox_el: any;
  upload: boolean = false;
  cover = '';
  //b=new Book('',null,null,'','','','','','','','','','user');
  //b=new Book()
  pubcat = new pubsubCat('');
  k: string = '';
  opshow: boolean = false;
  file!: File;
  file_book!: any;
  t: string = '';
  buttonshow: boolean = false;
  id = '1';
  publisher_name = '';
  category_id = '';
  sub_category_id = '';
  book_name = '';
  author_name = '';
  price = '';
  isbn_no = '';
  about_book = '';
  about_author = '';
  book_image: any;
  book_pdf: any;
  user_name = 'user';
  m: any;
  m1: any;
  temp: any;
  cat_change: boolean = false;
  subcat_change: boolean = false;
  ebook_change: boolean = false;
  cover_change: boolean = false;
  upload_message = '';
  upload_msg = '';
  mdal: any;
  modal_msg = '';
  formData = new FormData();
  formData1 = new FormData();
  showCropper = false;
  croppedImage:any ;
  imageChangedEvent: any = '';
  save = true;
  hide = false;
  flag = 0;
  val: any;
  modal = true;
  hidden = true;
  vari: any;
  valu = true;
  // valu=false;
  scale = 1;
  transform: ImageTransform = {};
  Zoomout = true;
  ZoomIn = true;
  close = true;
  cancel = false;
  file_name:any='';
  File:any='';
  loader:boolean=true;
  // select:any;
  put:any;
  put_in:any;
  len:any;
  keyword:any;
  subput:any;
  fake:any;
  page_no_error:string="";
  page:boolean=true;
  userdata:any;
  pub_name:any;

  dropdownList:any = [];
  selectedItems = [];
  dropdownSettings = {};
  isbnPattern='';
  isbnEl:any;
  dropdownList_subcategory:any = [];
  subcategory_selectedItems = [];
  subcategory_dropdownSettings = {};
 @ViewChild('auto') auto:any;
  preview_modal:any;
  subcat_validation:boolean=true;

  // @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
  //   if(this.lastFormGroup.dirty || this.firstFormGroup.dirty || this.secondFormGroup.dirty || this.category_subcategory.dirty){
  //     $event.returnValue = true;
  //   }
  // }

  ngOnInit(): void {
 // Multiselect Dropdown
 this.subcategory_dropdownSettings = { 
  singleSelection: false, 
  text:"Select Sub-Category*",
  selectAllText:'Select All',
  unSelectAllText:'UnSelect All',
  // enableSearchFilter: true,
  showCheckbox:true,
  groupBy: 'category_name',
  // selectGroup:false,
  limitSelection:3,
  };
    this.lastFormGroup=this._formBuilder.group({
      about_author:['',Validators.required],
      about_book:['',Validators.required]
    })

    this.firstFormGroup = this._formBuilder.group({
      image:['',Validators.required],
      r_from:['',Validators.required],
      r_to:['',Validators.required],
      c_from:['',Validators.required],
      c_to:['',Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      p_price: ['', Validators.required],
      f_price: ['', Validators.required],
      Mrp:[''],
      offerPrice:[''],
      delivery_charge:['']
    });
  
    this.category_subcategory=this._formBuilder.group({
      pub_name: ['', Validators.required],
      isbn_no:['',[Validators.required,Validators.minLength(17),Validators.maxLength(17),Validators.pattern('(?=(?:[0-9]+[-●]){4})[-●0-9]{17}$')]],
      cat_name:['',Validators.required],
      subcat_name:['',Validators.required],
      bk_name:['',Validators.required],
      auth_name:['',Validators.required],
      edition:['',Validators.required],
      pub_year:['',Validators.required]
    })     
 
    //For getting Publisher Name on page load
  //   this.pubinfo.get_pub_info(localStorage.getItem('pub-id')).subscribe(data => {
  //     this.userdata = data;
  //     var obj = JSON.parse(this.userdata);
  //     this.pub_name = obj.message[0].name;
  //    console.log(this.pub_name);
  //    this.category_subcategory.patchValue({
  //     pub_name: this.pub_name,

  //  });
      
  //   })
    this.showcat.getData().subscribe(data => {
      // this.loader=false;
      console.log('Success!', data)
      this.userData = data;
      for (let i = 0; i < this.userData.message.length; i++) {    
        this.category[i] = 
          {"id":this.userData.message[i]._id,"itemName":this.userData.message[i].name};
      } 
      this.dropdownList=this.category;
      console.log(this.dropdownList)
         // Multiselect Dropdown
          this.dropdownSettings = { 
            singleSelection: false, 
            text:"Select Category*",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            showCheckbox:true,
            limitSelection:3,
            classes: "myclass custom-class-example"
            };
   
    })
    this.mdal = document.getElementById('myModal');
    this.mdal.style.display = 'none';
    tools();
    localStorage.setItem('address','/publisher/ebookupload');
     this.keyword='name';   
  }

  get f() { return this.category_subcategory.controls; }
  get g(){return this.firstFormGroup.controls;}
  get s(){return this.secondFormGroup.controls;}
  get a(){return this.lastFormGroup.controls;}

  ///For category multiselect/////
  onOpen(item:any){ }
  onClose(item:any){
  this.loader=false;
    this.dropdownList_subcategory.length=0;
    this.dropdownList_subcategory=[];
    this.showsubcat.getSubCategory(this.selectedItems).subscribe(data => {
    this.category1.length=0;
    this.userData1.length=0;
    this.userData1 = data;
    for (let i = 0; i < this.userData1.message.length; i++) {
    this.category1[i]={"id":this.userData1.message[i]._id,"itemName":this.userData1.message[i].name,"category_name":this.userData1.message[i].category_name};
    }
    this.dropdownList_subcategory=this.category1;
    this.loader=true;
    },error=>{
      this.loader=true;
    })
  }

  ngAfterViewInit(){
    this.firstFormGroup.get('c_to')?.valueChanges.subscribe((res) =>{
      // console.log(this.g.c_from.value);
      if(Number(this.g.c_from.value) > Number(this.g.c_to.value)){
        this.page_no_error="please provide valid number('from' page no. should be less then 'to' page no.";
      }
      else{
        this.page_no_error="";
      }
    })
  }
// For Multiselect dropdown
onItemSelect(item:any){}
OnItemDeSelect(item:any){
this.loader=false;
this.dropdownList_subcategory.length=0;
this.dropdownList_subcategory=[];
this.showsubcat.getSubCategory(this.selectedItems).subscribe(data => {
this.category1.length=0;
this.userData1.length=0;
this.userData1 = data;
for (let i = 0; i < this.userData1.message.length; i++) {
this.category1[i]={"id":this.userData1.message[i]._id,"itemName":this.userData1.message[i].name,"category_name":this.userData1.message[i].category_name};
}
this.dropdownList_subcategory=this.category1;
this.loader=true;

},error=>{
  this.loader=true;
})

}
onSelectAll(items: any){
  console.log(items,this.dropdownList);
}
onDeSelectAll(items: any){
  // console.log("Item De-Select All" +JSON.stringify(this.selectedItems)+" " + this.dropdownList_subcategory);
  this.dropdownList_subcategory.length=0;
  this.dropdownList_subcategory=[];
  this.subcategory_selectedItems=[];
}
////End/////
 
///For subcategory multiselect/////
onsubcateSelect(item:any){
console.log(JSON.stringify(this.subcategory_selectedItems));
this.subcat_validation=this.subcategory_selectedItems.length > 3 ? false : true;
}
OnsubcateDeSelect(item:any){
  this.subcat_validation=this.subcategory_selectedItems.length > 3 ? false : true;
}

onSelectAllsubcate(item:any){console.log("select ALl")}
onDeSelectAllsubcate(item:any){
  this.subcat_validation=true;
}
onOpensubcate(item:any){}
onClosesubcate(item:any){}
  // get f() { return this.category_subcategory.controls; }
  // close_it(){
  // alert("Successfully cropped");
  // console.log("close_it" +this.croppedImage);
  // this.croppedImage='';
  // console.log("close_it" +this.croppedImage);
  // this.cover_change = false
  //    this.valu=true;

  // }
  // cancel_it(){
  //     this.valu=true;
  // }

  // get f(): { [key: string]: AbstractControl } {
  //   return this.category_subcategory.controls;
  // }

  click_it() {
    this.cover_change=true;
    this.valu = true;
    console.log("Cropped Image:" +this.croppedImage);
    const base64 = this.croppedImage;
      const imageName = this.preview_file_name;
      const imageBlob = this.dataURItoBlob( this.croppedImage);
      const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
      console.log({imageFile, imageBlob});
      this.preview_book_image=imageFile;

    // this.val=document.getElementById("cropimg");
    //   console.log("val:" +this.val.src);
    //  this.imageChangedEvent=this.val.src;
    //  this.file!=base64ToFile( this.imageChangedEvent);
    //  console.log("after crop:" +this.file);
    // PREVIEW IMAGE //
    const reader=new FileReader();
    reader.onload = () => {
      this.preview_book_image = reader.result as string;

    }
    reader.readAsDataURL(this.preview_book_image)

  }

  dataURItoBlob(dataURI:any) {
    var byteString = atob(dataURI.toString().split(',')[1]);
  
        
        const array=[];
     
          for (var i = 0; i < byteString.length; i++) {
        
              array.push(byteString.charCodeAt(i));
          }
          
          return new Blob([new Uint8Array(array)],
          {
            type:'image/png'
          },
          );
  }


  close_it(){this.valu=true;}
  fileChangeEvent(event: any): void {
      var ext = event.target.files[0].name.split('.').pop();
      this.preview_file_name=event.target.files[0].name;
      console.log(ext);
        if (ext != "jpeg" && ext != "jpg" && ext != 'png') { 
            this.toaster.errorToastr('Wrong Format! Please choose image file','');
           }
           else{
            this.nm_img=document.getElementById('openModal');
            this.nm_img.click();
           
           }
           this.imageChangedEvent = event;
           this.cover_change=false;
    
 }
  
  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
  imageLoaded() {
    console.log("image loaded")
    this.showCropper = true;
    this.modal = false;
    this.hide = false;
    this.valu = false;
    this.Zoomout = false;
    this.ZoomIn = false;
  }

  cropperReady(sourceImageDimensions: Dimensions) {

    console.log('Cropper ready', sourceImageDimensions);
    console.log("cropper ready CROPPED IMAGE:" + this.croppedImage);
  }


  loadImageFailed() {
    console.log('Load failed');
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log('imagecropped');
    console.log("width:" + event.width);
    console.log("height:" + event.height)

    this.croppedImage = event.base64;
    console.log(this.croppedImage);
  }




  show(v: any) {
    this.category1.length=0;
    if (v != 'default') {
      this.cat_change = true;

      this.opshow = true;
      for (let i = 0; i < this.userData.message.length; i++) {
        if (v == this.userData.message[i].name) {
          this.pubcat.category_id = this.userData.message[i]._id;
          this.m1 = this.userData.message[i]._id;
        }
      }
      this.showsubcat.getData(this.pubcat).subscribe(data => {
         console.log('Success!', data);
        this.userData1 = data;
        for (let i = 0; i < this.userData1.message.length; i++) {
          this.category1[i] = this.userData1.message[i].name;
          // this.m = this.userData1.message[i]._id;
          //console.log(this.userData.message[i].name);
        }
      })
    }
    else {
      this.cat_change = false;
      this.subcat_change = false;
      this.buttonshow = false;
      this.opshow = false;
      this.k = 'default';
      this.category1[0] = '';
    }
  }
  show_sub(v: any) {
    // console.log(this.pubcat)
    if (v != '')
     {  this.showsubcat.getData(this.pubcat).subscribe(data => {
      console.log('Success!', data);
     this.userData1 = data;
     for (let i = 0; i < this.userData1.message.length; i++) {
       this.category1[i] = this.userData1.message[i].name;
       if (this.userData1.message[i].name == v) {
        this.m = this.userData1.message[i]._id;  
    }
    this.subcat_change = true;
     }
   })}
    else
      {
        this.subcat_change = false;
      }
  }
  drag() {
    showprofile();
  }
  logout() {
    localStorage.removeItem('pub-token');
    localStorage.setItem('pub-loggedin', 'false');
    this.cookieService.delete('pub-cookie-name');
    this.router.navigate(['/publisher/logpub']);
  }
  onChange_book(event: any) {
   console.log(event.target.files.length);
    if(event.target.files.length > 0){
    this.file_book = event.target.files[0];
    this.t = event.target.files[0].name;
    var ext = event.target.files[0].name.split('.').pop();
    if (ext == "pdf" || ext == "PDF") {
      this.ebook_change = true;
      this.t = event.target.files[0].name;
      this.buttonshow = true;
      PreviewImage();
    }
    else {
      // this.mdal.style.display = 'block';
      this.ebook_change = false;
      this.modal_msg = "Wrong Format! Please select pdf file";
      this.t = "";
      this.toaster.errorToastr(this.modal_msg,'',{position:"top-center",animate:"slideFromTop",maxShown:"1"});
    }
  }
  else{
    console.log("Please Choose a file");
    
  }
  }
  preventNonNumericalInput(e: any) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
  }
  preventNonCurrencyInput(e: any) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
  }
  // onChange(event: any) {
  //   this.file = event.target.files[0];
  //   var ext = event.target.files[0].name.split('.').pop();

  //   if (ext == "jpeg" || ext == "jpg" || ext == 'png') {
  //     this.fval = event.target.files[0].name;
  //     this.cover_change = true;
  //   }
  //   else {
  //     this.mdal.style.display = 'block';
  //     this.modal_msg = "Wrong Format!";
  //     this.fval = "";
  //     this.cover_change = false;
  //   }
  // }
  show_check() {
    this.checkbox_el = document.getElementById('check');
    if (this.checkbox_el.checked == true)
      console.log(this.checkbox_el.value);
    else
      console.log("Unchecked");
  }
  modal_close() {
    this.mdal.style.display = 'none';
  }

  showvalues(v1: any, v2: any, v3: any, v4: string, v5: any, v6: any, v7: any, v8: any, v9: any, v10: any, v11: any, v12: any, v13: any,full_book_price:any,pub_year:any,edition:any,d_charge:any,mrp:any,offerprice:any) {
    // console.log(v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,this.selectedItems,this.file_book,this.subcategory_selectedItems);
    this.progress_show = true;
    this.preview_modal=document.getElementById('closepreviewModal');
    this.preview_modal.click();
    this.upload = true;
      this.divover = document.getElementById('overlay');
      this.divover.style.display = "block";
      this.b = new Book(localStorage.getItem('pub-id'), this.file_book, v1, this.m1, this.m, v4, v5, v6, v7, this.croppedImage, v8, v9, localStorage.getItem('token'), v10, v11, v12, v13);
      this.b.book_pdf = this.file_book;
      this.b1.book_name = v4;
      this.upld.upload(this.b,v12,this.selectedItems,this.subcategory_selectedItems,full_book_price,pub_year,edition,this.other_contents,d_charge,mrp,offerprice).subscribe(data => {
        //debugger;
        this.bookdata = JSON.parse(data);
        console.log("Totalpage:" +this.bookdata.totalpage);
        // var checkpgcount = 50;
        var checkpgcount = 30;
        var random_pages=new Array();
        var pagecountstart;
        // var pagecounter;
        this.pagecounter=this.bookdata.pagecounter;
        pagecountstart=this.bookdata.pagecountstart;
        random_pages=this.bookdata.random_pages;
        //debugger;
        if (this.bookdata.totalpage > checkpgcount) {
        //debugger;

          this.startpage = 1;
          // this.endpage = 50;
          this.endpage = 30;
          this.splitbookupload(this.bookdata.mainbook_url, this.bookdata.id, this.bookdata.book_id, this.bookdata.contents_from, this.bookdata.contents_to, this.bookdata.random_from, this.bookdata.random_to, this.bookdata.price, this.bookdata.user_name, this.bookdata.uploaded_page = this.pages, this.startpage, this.endpage,pagecountstart,random_pages,this.pagecounter);
        } else {
        //debugger;
  
          var startpage = 1;
          this.endpage = this.bookdata.totalpage;
          console.log('single time');
          this.split.upload_book(this.bookdata.mainbook_url, this.bookdata.id, this.bookdata.book_id, this.bookdata.contents_from, this.bookdata.contents_to, this.bookdata.random_from, this.bookdata.random_to, this.bookdata.price, this.bookdata.user_name, this.bookdata.uploaded_page = this.pages, startpage, this.endpage,pagecountstart,random_pages,this.pagecounter).subscribe(data1 => {
            console.log(data1);
            this.temp = JSON.parse(data1);
            if (this.temp.success == 1) {
              localStorage.setItem('uploader', '1');
              this.router.navigate(['/publisher/book-list']);
              this.progress_show = false;
            }
            else {
              this.progress_show = false;
              console.log("Failure");
            }
          })
        }

      })
    // }
  }


  splitbookupload(mainbook_url: any, id: any, book_id: any, contents_from: any, contents_to: any, random_from: any, random_to: any, price: any, user_name: any, uploaded_page: any, startpage: any, endpage: any,pagecountstart:any,random_pages:any,page_counter:any) {
    //debugger;
    this.split.upload_book(mainbook_url, id, book_id, contents_from, contents_to, random_from, random_to, price, user_name, uploaded_page, this.startpage, this.endpage,pagecountstart,random_pages,page_counter).subscribe(data11 => {
      console.log(data11);
      this.temp = JSON.parse(data11);
      console.log("success:" +this.temp.success);
      // console.log(this.temp.success);
      if (this.temp.success == 1) {
        this.pagecounter=this.temp.pagecounter;
        if (Number(this.temp.uploaded_page) != Number(this.temp.totalpage)) {
          this.startpage = Number(this.temp.uploaded_page) + 1;
          // this.endpage = Number(this.temp.uploaded_page) + 50;
          this.endpage = Number(this.temp.uploaded_page) + 30;
          console.log("start page" + this.startpage);
          console.log("end page " + this.endpage);
          this.pgbar = ((this.counter / this.counter_temp) * 100);
          console.log("tempcounting " + this.temp.counting)
          this.pgbar = Math.round(this.temp.counting);
          console.log(this.pgbar);
          this.pgbstring = this.pgbar.toString() + "%" + " Complete ( " + this.temp.uploaded_page + " / " + this.temp.totalpage + " Pages )";
          console.log("pgbstring " + this.pgbstring);
          if (this.endpage > Number(this.temp.totalpage)) {
            // this.startpage = this.temp.uploaded_page + 1;
            this.endpage = Number(this.temp.totalpage);
            this.splitbookupload(mainbook_url, id, book_id, contents_from, contents_to, random_from, random_to, price, user_name, uploaded_page, this.startpage, this.endpage,pagecountstart,random_pages,this.pagecounter);
              
          } else {
            this.splitbookupload(mainbook_url, id, book_id, contents_from, contents_to, random_from, random_to, price, user_name, uploaded_page, this.startpage, this.endpage,pagecountstart,random_pages,this.pagecounter);
          }
        } else {
          localStorage.setItem('uploader', '1');
          this.progress_show=false;
          this.router.navigate(['/publisher/book-list']);
        }
        document.getElementById("myBar")?.style.width != this.pgbar + "%";
        document.getElementById("myBar")?.innerHTML != this.pgbar + "%"
        console.log(this.pgbar);
      }
      else {
        // console.log("Failure");
        this.progress_show = false;

      }
    })
  }
    /*For Autocomplte As dropdown for category */



selectEvent(event: any) {
  console.log("select event");
  //  this.template=false;
  this.put = document.getElementById('cat');
  this.put.value = event.name;
  this.put_in = this.put.value;
  if (event.name != '') {
    this.cat_change = true;

    // this.opshow = true;


    for (let i = 0; i < this.userData.message.length; i++) {
      if (this.put.value == this.userData.message[i].name) {
        this.pubcat.category_id = this.userData.message[i]._id;
        this.m1 = this.userData.message[i]._id;

      }



    }




    console.log("category_id:" + this.m1);

    console.log("pucat:" +this.pubcat.category_id)

    this.showsubcat.getData(this.pubcat).subscribe(data => {
     console.log(data);
      this.userData1 = data;

      this.len = this.userData1.message.length;
      for (let i = 0; i < this.userData1.message.length; i++) {
         this.category1[i] = this.userData1.message[i];
          this.m = this.userData1.message[i]._id;

         }




    })


  }
  else {
    this.cat_change = false;
    // this.subcat_change = false;
    this.buttonshow = false;
    // this.opshow = false;
    this.k = 'default';
    this.category1[0] = '';
  }
}

onChangeSearch(val: any) {
  console.log(val);
  this.auto.clear();
}

onFocused(e: any) {
  console.log("onfocused");
}



/*For Autocomplte As dropdown for sub_category */

onChangeSearch1(val: any) {
  console.log("onchange1");
}

onFocused1(e: any) {
  if (this.put_in != '') {
    console.log(this.userData.message.length);
    for (let i = 0; i < this.userData.message.length; i++) {
      if (this.put.value == this.userData.message[i].name) {
        this.pubcat.category_id = this.userData.message[i]._id;
        this.m1 = this.userData.message[i]._id;
      }
    }
    this.showsubcat.getData(this.pubcat).subscribe(data => {
      this.userData1 = data;
      this.len = this.userData1.message.length;
      for (let i = 0; i < this.userData1.message.length; i++) {
          this.category1[i] = this.userData1.message[i];
          this.m = this.userData1.message[i]._id;
      }
    })
  }
  else {
    this.category1.length=0;
  }
  
}

// selectEvent1(e: any) {
  // this.subput = document.getElementById('sub');
  // this.subput.value = e.name;

  // if (e.name != '') {

    // this.subcat_change = true;
    // for (let i = 0; i < this.userData1.message.length; i++) {
      // if (this.userData1.message[i]._id == e._id) {
        // this.m = e._id;
      // }

    // }
  // }
  // else{
    // this.subcat_change = false;
  // }
// }


// close_auto() {
//   this.put_in = '';
//   this.put.value = '';
//   this.category1.length=0;
//   this.cat_change = false;
//   this.auto.clear();
// }
// close_auto1() {
//   this.subcat_change = false;
//  }

 check_checkbox(event:any){
   if(event.target.checked==true){
     this.progress_show=false;
   }
   else{
     this.progress_show=true;
   }
 }

 clear_input(){
   this.file_book='';
   this.buttonshow=false;
   this.t='';
   this.ebook_change=false;

 }

 //For Preview Modal///
 previewValues(v1: any, v2: any, v3: any, v4: string, v5: any, v6: any, v7: any, v8: any, v9: any, v10: any, v11: any, v12: any, v13: any,full_book_price:any,pub_year:any,edition:any,d_charge:any,mrp:any,offerprice:any){
    for(let i=0;i<this.other_contents.length;i++){
      if(this.other_contents.length==1 && this.other_contents[i].title=='' && this.other_contents[i].description=='' && this.other_contents[i].actual_page=='' && this.other_contents[i].pdf_page==''){
        $('#showMoreDetails').hide();
        break;
      }
      else{
        $('#showMoreDetails').show();
        break;
      }
    }
  this.upload_message = '';
  this.upload = true;
    this.checkbox_el = document.getElementById('check');
    // if (full_book_price=='' || edition=='' || pub_year=='' || v1 == '' || v4 == '' || v5 == '' || v6 == '' || v7 == '' || v8 == '' || v9 == '' || v10 == '' || v11 == '' || v12 == '' || v13 == '' || this.cover_change == false || this.ebook_change == false ||Number(v10)>=Number(v11)||Number(v12)>=Number(v13)) {
    if (full_book_price=='' || edition=='' || pub_year=='' || v1 == '' || v4 == '' || v5 == '' || v6 == '' || v7 == '' || v8 == '' || v9 == '' || v10 == '' || v11 == '' || v12 == '' || v13 == '' || this.cover_change == false || this.ebook_change == false ||Number(v10)>=Number(v11)) {

      //  console.log("failed");
      this.upload_message = "*Some of the fields may be empty or may have invalid data. Please fill them up!";
      if (this.cover_change == false)
        this.cover = "*Please select an image";
      if (this.ebook_change == false)
        this.upload_msg = "*Please upload an Ebook(.pdf)";
        
    }
    else if (this.checkbox_el.checked != true) {
      this.mdal.style.display = 'block';
      this.modal_msg = "*Please read the Terms and Conditions and click on the check box.";
    }
    else if(this.subcategory_selectedItems.length>3){
      this.upload_message="Maximum Limit Exceed in Sub-Category";
    }
    else {
      if(this.checkContentRandomPages(this.g.r_from.value,this.g.c_from.value,this.g.c_to.value,"PP")){
        this.upload_message = "*Preview Page must be greater than Contents Page No. From and Contents Page No. To";
     }
     else if(this.checkContentRandomPages(this.g.r_to.value,this.g.c_from.value,this.g.c_to.value,"PC")){
       this.upload_message = "*Page Count must be greater than Contents Page No. From and Contents Page No. To";
     }
     else{
      this.preview_modal=document.getElementById('preview');
      this.preview_modal.click();
      this.cate_gories.length=0;
      this.subcate_gories.length=0;
      for(let i=0;i<this.selectedItems.length;i++){
              this.cate_gories[i]=this.selectedItems[i];
      }
      for(let i=0;i<this.subcategory_selectedItems.length;i++){
        this.subcate_gories[i]=this.subcategory_selectedItems[i];
      }
     }
     
    }
 }

 getErrorMessage() {
   return 'Please Provide Category';
  }
  // For Adding row on click on add button
  addRow(){
      this.other_contents.unshift({title:'',description:'',actual_page:'',pdf_page:''});
 
  }
  //For deleting row
  deleteRow(index:any){
    if(this.other_contents.length <1) {
      // return false;
  } else {
      this.other_contents.splice(index, 1);
      // return true;
  }  
  }
  //For checking the pattern of ISBN NO
  check_pattern(v:any){
    if ((/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(v.target.value)) || (v.target.value=='')||v.target.value.length<17) {
      this.isbn_check=false;
     }
     else {
      this.isbn_check=true;
     }
  }
  //For Making the image empty
  make_image_empty(){
  this.cover_change=false;
  this.croppedImage='';
  this.image_empty=document.getElementById('myfile');
  this.image_empty.value=null;
}
isNumberKey(evt:any)
{
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode != 44 && charCode!=45 && charCode > 31 
     && (charCode < 48 || charCode > 57))
      return false;

   return true;
}
// 
addHyp(e:any){
  var key = e.keyCode || e.charCode;
  this.isbnPattern=e.target.value
  if(e.target.value!='' && key != 8){
    
    if(this.isbnPattern.length==3||this.isbnPattern.length==5||this.isbnPattern.length==8||this.isbnPattern.length==15)
    this.category_subcategory.patchValue({
      isbn_no: e.target.value+'-',
    });
  }
}
checkContentRandomPages(str:any,_c_from:any,_c_to:any,_flag:any):boolean{
  console.log(typeof(_c_from),typeof(_c_to));
  
  if(_flag  == 'PP'){   
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const c_from = str.split(specialChars);
    const found = c_from.find((e: number) =>{
        console.log(typeof(e))
      return Number(e) <= Number(_c_from) || Number(e) <= Number(_c_to)
    })
    return found == undefined ? false : true;
  }
  else{
    return Number(str) <= Number(_c_to) || Number(str) <= Number(_c_from) ? true : false ;
  }
}
receiveChildData(data: any){
  console.log(data);
     this.category_subcategory.patchValue({
      pub_name: data,
   });
  }
}


