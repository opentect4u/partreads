import { Component, OnInit, ViewChild } from '@angular/core';
import { ApprovebookService } from 'src/app/approvebook.service';
import { PublisherbookserviceService } from 'src/app/publisherbookservice.service';
import { RejectbookService } from 'src/app/rejectbook.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PDFDocument, PDFJavaScript } from 'pdf-lib';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { pdfjsVersion } from 'ngx-extended-pdf-viewer';
import { FormControl, FormGroup } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-publisherbooks',
  templateUrl: './publisherbooks.component.html',
  styleUrls: ['./publisherbooks.component.css',
        '../../../assets/adminassets/css/font-awesome.css',
        '../../../assets/adminassets/css/apps.css',
        '../../../assets/adminassets/css/apps_inner.css',
        '../../../assets/adminassets/css/res.css']
})
export class PublisherbooksComponent implements OnInit {
  __bookStatus = new FormGroup({
    bookStats: new FormControl('U')
  });
  show_checkmark:boolean=true;
  modal_type='';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar,public toastr: ToastrManager,private router:Router,private cookieService:CookieService, private authserv:AuthService, private pubbookserve:PublisherbookserviceService,private appbook:ApprovebookService,private rejbook:RejectbookService) { }
  userdata:any;
  userdata1:any;
  totaldata:any=[];
  category:any=[];
  errormessage:any;
  substring:any='';
  loading:boolean=true;
  x:any;
  bk_Name:any;
 m=''
 book_src:any;
 book_nm:any;
 id_for_approve:any;
 id_for_rejection:any;
 show_bk_for_approve:any;
 show_bk_for_rejection:any;
 modal:any;
 pageCount:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  // displayedColumns: string[] = ['#', 'Book Name', 'Author Name', 'ISBN No.','Category', 'SubCategory', 'Publisher','View','Status'];
  displayedColumns: string[] = ['#', 'Book Name', 'Publisher', 'ISBN No.','action'];
  dataSource= new MatTableDataSource([]);


  ngOnInit(): void {
    // this.fetch_data();
    localStorage.setItem('address','/admin/publisherbooks');
    this.fetch_data('U');

  }
  
  ngAfterViewInit(){
    this.__bookStatus.valueChanges.subscribe(res =>{
      console.log(res);
    this.loading = true;
      
        this.fetch_data(res.bookStats);
    })
  }

  approve_book(v1:any,v2:any){
    this.modal_type='A';
    this.id_for_approve=v1;
    this.show_bk_for_approve=v2;
    $('#id01').fadeIn('slow');
  }
  approval(){
    // this.loading=true;
    this.show_checkmark=false;
    // console.log(v1+" "+v2);
    this.appbook.approvebooks(this.id_for_approve,this.show_bk_for_approve).subscribe(data=>{
      // console.log(data)
      // this.userdata1=data;
      // var obj =JSON.parse(this.userdata1);
      //  this.totaldata=obj.message;
      // //  console.log(this.totaldata)
      // for(let i=0;i<this.totaldata.length;i++)
      // {
      //   this.category[i]=this.totaldata[i];
      // }
        
      this.show_checkmark=true;
      $('#id01').fadeOut('slow');
      this.modal_type='';
      var Index = this.category.findIndex((x:any) => x._id == this.id_for_approve)
      this.category[Index].show_book= 'Y';
      this.dataSource =new MatTableDataSource(this.category);
      this.toastr.successToastr('Success','Book approved!')
      // this.fetch_data();
    },
    error=>{
    this.show_checkmark=true;
    this.toastr.errorToastr('Error','Book approval failed!')
    })
    // location.reload();
    
  }
  reject_book(v1:any,v2:any){
    this.modal_type='R';
    this.id_for_rejection=v1;
    this.show_bk_for_rejection=v2;
    $('#id01').fadeIn('slow');
  }
  reject(reject_msg:any){
    console.log(this.show_bk_for_rejection);  
      this.show_checkmark=true;
      this.rejbook.rejectbooks(this.id_for_rejection, this.show_bk_for_rejection,reject_msg).subscribe(data=>{
        // this.userdata1=data;
        // var obj =JSON.parse(this.userdata1);
        // this.totaldata=obj.message;
        // for(let i=0;i<this.totaldata.length;i++)
        // {
        //   this.category[i]=this.totaldata[i];
        // }
      
        this.show_checkmark=true;
        $('#id01').fadeOut('slow');
        this.modal_type='';
        var Index = this.category.findIndex((x:any) => x._id == this.id_for_rejection)
        this.category[Index].show_book= 'N';
         console.log(this.category)
        this.dataSource =new MatTableDataSource(this.category);
         console.log(this.dataSource.data)
        this.toastr.successToastr('Success','Book rejected!');
        // this.fetch_data();
      },
      error=>{
      this.show_checkmark=true;
      this.toastr.errorToastr('Error','Book rejection failed!')
      })
  }
  // logout()
  // {
  //   this.authserv.logout();
  //   this.cookieService.delete('cookie-name');
  //   this.router.navigate(['/admin/login']);
  // }
  /*angular Material*/  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public fetch_data(__flag: string){
    this.category.length=0;
    this.pubbookserve.getBooksByFlag(__flag).subscribe(data=>{// console.log(data);
      this.userdata=data;
      // this.getPageCount(this.userdata.message)
      this.dataSource = new MatTableDataSource(this.userdata.message);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading=false;

      },(errorMessage) => {  
      this.loading=false;
        this.substring = errorMessage.substr(0, 3);
        if (this.substring != 'und') {                      
          this.errormessage = errorMessage.substr(11, 132);
          this.toastr.warningToastr('Something went wrong,please try again later','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
        }
        else {
          this.substring = errorMessage.substr(18, 27);
          this.toastr.warningToastr('Something went wrong,please try again later','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})

        }
       })

  }
  async  getPageCount(allbooks: any){
    for(let i=0;i<allbooks.length;i++)
    {
      const formPdfBytes = await fetch(allbooks[i].full_book_path).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(formPdfBytes);
      const pageCount = pdfDoc.getPageCount();
      this.userdata.message[i].total_pages=pageCount;
      this.category[i]=this.userdata.message[i];

    }
    console.log(this.category)
      this.put_data();
  }
  public put_data(){
    // console.log(this.category)
      this.dataSource=new MatTableDataSource(this.category);
       this.dataSource.paginator=this.paginator;
       this.dataSource.sort=this.sort;
      this.loading=false;
  }
  myFunction() {
    // Get the snackbar DIV
   this.x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    this.x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
  }
  send_src(src:any,nm:any){
    this.book_src=src;
    this.book_nm=nm
  }
  openModal(bk_name:any){$('#id01').fadeIn('slow');this.bk_Name=bk_name;}
  closeModal(){$('#id01').fadeOut('slow');this.modal_type=''}
  deleteItem(){
    $('#id01').fadeOut('slow');
    this._snackBar.open('Deletion Successfull!!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  Edit(__id: any){
    console.log(__id);
    this.router.navigate(['/admin/assigncpnagainstbooks',btoa(__id)])
  }
}
