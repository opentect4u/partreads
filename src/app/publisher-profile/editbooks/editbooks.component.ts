import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { pubsubCat } from '..//../pubsubcat';
import { Book } from '..//..//book';
import { BookuploadService } from 'src/app/bookupload.service';
import { myobj } from '..//..//myobj';
import { PublishersubcategoryshowService } from 'src/app/publishersubcategoryshow.service';
import { PublishercategoryshowService } from 'src/app/publishercategoryshow.service';
import { EditbookshowService } from './editbookshow.service';
import { EditbookconService } from './editbookcon.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GlobalConstants } from 'src/app/globalvar/global';
declare var tools: any;
declare var showprofile: any;
declare var PreviewImage: any;
@Component({
  selector: 'app-editbooks',
  templateUrl: './editbooks.component.html',
  styleUrls: ['./editbooks.component.css',
  '../../../assets/cssfiles/bootstrap.css',
  '../../../assets/cssfiles/font-awesome.css',
  '../../../assets/chosen/chosen.css',
  '../../../assets/cssfiles/apps.css',
  '../../../assets/cssfiles/res.css',
  '../../../assets/cssfiles/apps_inner.css']
})
export class EditbooksComponent implements OnInit {
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings = {};
  constructor(private toastr:ToastrManager,private ebcon:EditbookconService, private router:ActivatedRoute, private e:EditbookshowService, private activatedroute:ActivatedRoute,private showsubcat:PublishersubcategoryshowService,private showcat:PublishercategoryshowService) { }
  id:any;
  b_nm:any;
  isb:any;
  alert_show=true;
  au:any;
  p:any;
  about_a:any;
  about_b:any;
  userData: any = [];
  divover: any;
  alert_div:any;
  category: any = [];
  userData1: any = [];
  category1: any = [];
  bookdata: any;
  bookdata1: any;
  endpage: any;
  pages: any;
  b: any;
  border_id:any;
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
  // id = '1';
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
  cid:any;
  spin_show: boolean = false;
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
  croppedImage:any='' ;
  imageChangedEvent: any = '';
  save = true;
  hide = false;
  flag = 0;
  val: any;
  modal = true;
  hidden = true;
  vari: any;
  // pubcat = new pubsubCat('')
  valu = true;
  // valu=false;
  scale = 1;
  id1:any;
  transform: ImageTransform = {};
  Zoomout = true;
  ZoomIn = true;
  close = true;
  cancel = false;
  file_name:any='';
  scid:any;
  File:any='';
  // loader=true;
  // select:any;
  put:any;
  put_in:any;
  len:any;
  p_nm:any;
  keyword:any;
  subput:any;
  fake:any;
  chkdata:any;
  page_no_error:string="please provide valid number('from' page no. should be less then 'to' page no.";
  page:boolean=true;
  editdata:any=[];
  null_val=false;
  show_msg="";
  Price:any=[];
  preview_book_image:any;
  preview_file_name:any;
  dropdownList_subcategory:any=[];
  subcategory_dropdownSettings={};
  subcategory_selectedItems:any=[];
 @ViewChild('auto') auto:any;
 message:any='';
 nm_img:any;
 Flag:any;
 loader:any=false;
 file_flag:any;
 mode:any='E';
 isbnPattern:any;
 isbnEl:any;
 isbn_check:boolean=false;

  ngOnInit(): void {

    localStorage.setItem('address','/publisher/book-list');

    this.router.params.forEach((params: any) => {
      this.id= params['id'];
      this.id1 = params['id1'];
      console.log(this.id+" "+this.id1);

  });
    // this.id=this.activatedroute.snapshot.params['id'];
    // this.id1=this.activatedroute.snapshot.params['id1'];
    // console.log(this.id+" "+this.id1);
    this.e.edit_show(localStorage.getItem('pub-id'),this.id1,this.mode).subscribe(data=>{console.log(data);
      this.editdata=JSON.parse(data);
      this.Price=JSON.parse(data);
      this.Price=this.Price.message[0];
    this.p_nm=this.editdata.message[0].publisher_name;
    this.b_nm=this.editdata.message[0].book_name;
    this.isb=this.editdata.message[0].isbn_no;
    this.au=this.editdata.message[0].author_name;
    this.p=this.editdata.message[0].price;
    this.about_a=this.editdata.message[0].about_author;
    this.about_b=this.editdata.message[0].about_book;
    this.cid=this.editdata.message[0].category_id;
    this.scid=this.editdata.message[0].sub_category_id;
    this.file_flag=this.editdata.message[0].book_image != '' ? 1 : 0;
    this.preview_book_image=GlobalConstants.apiURL+'/public/book-images/'+this.editdata.message[0].book_image;
    // For Category/////
    this.showcat.getData().subscribe(data => {
      console.log('Success!', data)
      this.userData = data;
      for (let i = 0; i < this.userData.message.length; i++) {
        this.category[i] = this.userData.message[i];
        console.log(this.userData.message[i].name);
        this.category[i] = 
        {"id":this.userData.message[i]._id,"itemName":this.userData.message[i].name};
       }
       this.dropdownList=this.category;
       console.log(this.dropdownList);
    })

    if(this.editdata.message[0].category_id!=''){
      var obj={"id":this.editdata.message[0].category._id,"itemName":this.editdata.message[0].category.name};
      this.selectedItems.push(obj);
      // this.selectedItems.push({ id: this.editdata.message[0].category._id, itemName: this.editdata.message[0].category.name });
    }
    if(this.editdata.message[0].category_id_1!=''){
      var obj={"id":this.editdata.message[0].category_1._id,"itemName":this.editdata.message[0].category_1.name};
      this.selectedItems.push(obj);
    }
    if(this.editdata.message[0].category_id_2!=''){
      var obj={"id":this.editdata.message[0].category_2._id,"itemName":this.editdata.message[0].category_2.name};
      this.selectedItems.push(obj);
    }
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
      // End///////////////
   //For SubCategory///////

   //End///////////////////
    // console.log(this.cid,this.selectedItems)
    // this.pubcat.category_id=this.cid;
    this.showsubcat.getSubCategory(this.selectedItems).subscribe(data => {
      console.log(data);
      this.userData1 = data;
       console.log(data);
      this.len = this.userData1.message.length;
      for (let i = 0; i < this.userData1.message.length; i++) {
          this.category1[i]={"id":this.userData1.message[i]._id,"itemName":this.userData1.message[i].name,"category_name":this.userData1.message[i].category_name};
           this.dropdownList_subcategory=this.category1;
         }})

         if(this.editdata.message[0].sub_category_id!=''){
          var obj={"id":this.editdata.message[0].sub_category._id,"itemName":this.editdata.message[0].sub_category.name};
          this.subcategory_selectedItems.push(obj);}
        if(this.editdata.message[0].sub_category_id_1!=''){
          var obj={"id":this.editdata.message[0].sub_category_1._id,"itemName":this.editdata.message[0].sub_category_1.name};
          this.subcategory_selectedItems.push(obj);
        }
        if(this.editdata.message[0].sub_category_id_2!=''){
          var obj={"id":this.editdata.message[0].sub_category_2._id,"itemName":this.editdata.message[0].sub_category_2.name};
          this.subcategory_selectedItems.push(obj);
        }
        // console.log(this.subcategory_selectedItems)
    this.subcategory_dropdownSettings = { 
      singleSelection: false, 
      text:"Select Sub-Category*",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      showCheckbox:true,
      groupBy: 'category_name',
      limitSelection:3,
      };
      this.loader=true;
      this.spin_show=true;
    })
   
      tools();
       this.keyword='name';
  
    
  }
  click_it() {
    // this.split.post_image(this.croppedImage).subscribe(data=>{console.log(data);
    // });
    // this.hide=true;
    // this.save=true;
    // this.hidden=false;
    // console.log("click it.");
    // this.Zoomout=true;
    // this.ZoomIn=true;
    // this.close=false;
    // this.cancel=true;
    // this.croppedImage='';
    // console.log(this.file_name)
    // this.File=this.file_name;
    // console.log(this.File)
    // this.imageChangedEvent='';
    
    this.cover_change=true;
    this.valu = true;
    console.log("Cropped Image:" +this.croppedImage);
    const base64 = this.croppedImage;
    const imageName = this.preview_file_name;
    const imageBlob = this.dataURItoBlob( this.croppedImage);
    const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
    console.log({imageFile, imageBlob});
    this.preview_book_image=imageFile;
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



  // For Category//////
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
    console.log(this.dropdownList_subcategory,this.subcategory_selectedItems);
    this.loader=true;
    },error=>{
      this.loader=true;
    })
  }
  OnItemDeSelect(item:any){
    // this.loader=false;
    console.log(this.selectedItems);
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

    console.log(this.dropdownList_subcategory);


    // this.loader=true;

    },error=>{
      // this.loader=true;
    })
  }
  onItemSelect(item:any){}
  onSelectAll(items: any){console.log(items);}
  onDeSelectAll(items:any){
    this.dropdownList_subcategory=[];
    this.subcategory_selectedItems=[];
  }
  //End/////////
  
  //For Sub Category/////////
  onsubcateSelect(items:any){}
  OnsubcateDeSelect(item:any){}
  onSelectAllsubcate(items:any){}
  onDeSelectAllsubcate(items:any){}
  onOpen(items:any){}
  onClosesubcate(items:any){}

  //End/////////////////////



  close_it(){
    this.preview_book_image=GlobalConstants.apiURL+'/public/book-images/'+this.editdata.message[0].book_image;
    this.croppedImage=''; 
    this.valu=true;
  }


  fileChangeEvent(event: any): void {
      console.log(event);
      console.log("filechangeevent");
      this.preview_file_name=event.target.files[0].name;
      var ext = event.target.files[0].name.split('.').pop();
      this.preview_file_name=event.target.files[0].name;
      console.log(ext);
        if (ext != "jpeg" && ext != "jpg" && ext != 'png') { 
          this.mdal.style.display = 'block';
            this.modal_msg = "Wrong Format!";
            this.nm_img=document.getElementById('mymodal1');
            this.nm_img.style.display="none";
           }
           else{
           console.log("filechangeevent");
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
    this.showCropper = true;
    this.modal = false;
    this.hide = false;
    this.valu = false;
    this.Zoomout = false;
    this.ZoomIn = false;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    // console.log(sourceImageDimensions);
    console.log('Cropper ready', sourceImageDimensions);
    //  this.file=sourceImageDimensions
    console.log("cropper ready CROPPED IMAGE:" + this.croppedImage);
    // this.file!=base64ToFile(this.croppedImage);
    // console.log( "file:" +this.file);
  }


  loadImageFailed() {
    console.log('Load failed');
  }
  imageCropped(event: ImageCroppedEvent) {
    // alert('image croppeed successfully');
    console.log('imagecropped');
    console.log("width:" + event.width);
    console.log("height:" + event.height)

    this.croppedImage = event.base64;
    console.log(this.croppedImage);
    // this.fileChangeEvent(this.croppedImage );



    // this.file!=base64ToFile(this.croppedImage);
    // console.log("imagecropped cropped file "+this.file);
    // console.log( "file:" +this.file);
    // console.log(event, base64ToFile(event.base64));
    // this.File=this.croppedImage;
  }




  // show(v: any) {
  //   if (v != 'default') {
  //     this.cat_change = true;

  //     this.opshow = true;
  //     for (let i = 0; i < this.userData.message.length; i++) {
  //       if (v == this.userData.message[i].name) {
  //         this.pubcat.category_id = this.userData.message[i]._id;
  //         this.m1 = this.userData.message[i]._id;
  //       }
  //     }
  //     this.showsubcat.getData(this.pubcat).subscribe(data => {
  //        console.log('Success!', data);
  //       this.userData1 = data;
  //       for (let i = 0; i < this.userData1.message.length; i++) {
  //         this.category1[i] = this.userData1.message[i].name;
  //         this.m = this.userData1.message[i]._id;
  //         //console.log(this.userData.message[i].name);
  //       }
  //     })
  //   }
  //   else {
  //     this.cat_change = false;
  //     this.subcat_change = false;
  //     this.buttonshow = false;
  //     this.opshow = false;
  //     this.k = 'default';
  //     this.category1[0] = '';
  //   }
  // }
  // show_sub(v: any) {
  //   if (v != '')
  //     this.subcat_change = true;
  //   else
  //     this.subcat_change = false;
  // }
  drag() {
    showprofile();
  }
  onChange_book(event: any) {

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
      this.mdal.style.display = 'block';
      this.ebook_change = false;
      this.modal_msg = "Wrong Format!";
      this.t = "";
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

  console.log("onfocused1");
  // console.log(e);
  console.log("put_in:" + this.put_in);
  if (this.put_in != '') {
    // console.log("hiii");
    console.log(this.userData.message.length);
    for (let i = 0; i < this.userData.message.length; i++) {
      console.log(this.userData.message[i].name);
      if (this.put.value == this.userData.message[i].name) {
        this.pubcat.category_id = this.userData.message[i]._id;
        this.m1 = this.userData.message[i]._id;

      }

    }
    this.showsubcat.getData(this.pubcat).subscribe(data => {

      this.userData1 = data;

      this.len = this.userData1.message.length;
      console.log( this.len);
      
      for (let i = 0; i < this.userData1.message.length; i++) {
        console.log(this.userData1.message[i].name)
        // this.category1[i] = this.userData1.message[i];
        // this.m = this.userData1.message[i]._id;
        // console.log("subcategory_id1:" + this.m)
        // console.log("subcategory_name:" + this.category1[i].name)


          this.category1[i] = this.userData1.message[i];
          this.m = this.userData1.message[i]._id;
          // console.log("subcategory_name:" + this.category1[i].name);
          // console.log("subcategory_id1:" + this.m); 

       
      }

    })
  }
  else {
    console.log("hello");
    // for (let i = 0; i < this.len; i++) {
    //   this.category1[i] = '';
    // }
    this.category1.length=0;
  
  }
  
}
selectEvent1(e: any) {
  //  console.log(e.name);
  //  console.log(e._id)
  // alert("Event:" +e);

  this.subput = document.getElementById('sub');
  this.subput.value = e.name;

  if (e.name != '') {

    this.subcat_change = true;
    for (let i = 0; i < this.userData1.message.length; i++) {
      if (this.userData1.message[i]._id == e._id) {
        this.m = e._id;
      }

    }
  }
  else{
    this.subcat_change = false;
  }


  console.log("category_id:" + this.m1);
  console.log("Subcategory_id:" + this.m);
}


close_auto() {
  this.put_in = '';
  this.put.value = '';
  // for (let i = 0; i < this.len; i++) {
  //   this.category1[i] = '';
  // }
  // alert("hi")
  this.category1.length=0;
  // this.userData.message.length=0;
  this.cat_change = false;
  // this.onFocused1('');
  // this.subcat.value='';
  // this.fake=document.getElementById('subcate')?.innerHTML;
  // this.fake.onFocused1(' ');
  // alert("hi")
  this.auto.clear();


}
close_auto1() {
  // this.category1.length=0;
  this.subcat_change = false;
  // for (let i = 0; i < this.len; i++) {
  //   this.category1[i] = '';
  // }
  
 
 
 }
 edit_submit_data(pubnm:any,catname:any,subcatname:any,bookname:any,authname:any,pr:any,isbnno:any,abouta:any,aboutb:any,Full_Book:any,delivery_charges:any,mrp_hard_copy:any,offer_price:any,pub_date:any,Book_Edition:any){
  console.log(this.croppedImage);
  
  //  console.log(Full_Book,delivery_charges,mrp_hard_copy,offer_price,pub_date,Book_Edition);
     console.log(this.croppedImage)
  this.loader=false;
    this.ebcon.submit_edit_data(localStorage.getItem('pub-id'),this.id1,pubnm,catname,subcatname,bookname,authname,pr,isbnno,abouta,aboutb,Full_Book,delivery_charges,mrp_hard_copy,offer_price,pub_date,Book_Edition,this.selectedItems,this.subcategory_selectedItems,this.croppedImage).subscribe(data=>{console.log(data)
      this.chkdata=JSON.parse(data);
      if(this.chkdata.success=='1'){
        this.Flag='1';
        this.alert_show=false;
        this.loader=true;
        this.message='Updation successful!!';
      }
      else{
        this.message='Something went wrong! plese try again later';
        this.Flag='0';
        this.toastr.errorToastr('Something went wrong,please try again later','')
        this.alert_show=true;
        this.loader=true;
      }
    
      }) 
}
close_alert() {
  // this.alert_div = document.getElementById('uploaded');
  // this.alert_div.style.display = 'none';
  this.alert_show=true;
}
prevent_null(e:any){
  if(e.target.value=='')
  {this.null_val=true;
    this.border_id=document.getElementById(e.target.id);
    this.border_id.style.border="solid red 1px";
    this.show_msg=e.target.id;
  }
  else
 { this.null_val=false;this.border_id=document.getElementById(e.target.id);
  this.border_id.style.border="solid lightgrey 1px"
  this.show_msg='';
}

}
prevent_noval(v:any){
  if(v.target.value=='')
 { this.null_val=true;
  this.border_id=document.getElementById(v.target.id);
    this.border_id.style.border="solid red 1px";
    this.show_msg=v.target.id;
  }
  else
 { this.null_val=false;
  this.border_id=document.getElementById(v.target.id);
  this.border_id.style.border="solid lightgrey 1px"
  this.show_msg="";
}
}

check_pattern(event:any){

}

addHyp(e:any){
  this.isbnPattern=e.target.value
  console.log(e.target.value)
  if(e.target.value!=''){
  if(this.isbnPattern.length==3||this.isbnPattern.length==5||this.isbnPattern.length==8||this.isbnPattern.length==15)
  this.isbnPattern+='-'
  this.isbnEl=document.getElementById('isbnid');
  this.isbnEl.value=this.isbnPattern
  }
}
}
