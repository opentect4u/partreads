import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { UtilityTService } from 'src/app/Utility/utility-t.service';
import { PDFDocument, PDFJavaScript } from 'pdf-lib';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogforbjapprejComponent } from '../dialogForbkApprRej/dialogForbjAppRej.component';
import { PublishercategoryshowService } from 'src/app/publishercategoryshow.service';
@Component({
selector: 'assignCpnAgainstbooks-component',
templateUrl: './assignCpnAgainstbooks.component.html',
styleUrls: ['./assignCpnAgainstbooks.component.css',
            "../../../assets/adminassets/css/font-awesome.css",
            "../../../assets/adminassets/css/apps.css",
            "../../../assets/adminassets/css/apps_inner.css",
            "../../../assets/adminassets/css/res.css"]
})
export class AssigncpnagainstbooksComponent implements OnInit {

    __uploadPages: any;
    __totalPages: any;

    __cpnMst: any= [];
    __book = new FormGroup({
        
        pub_name: new FormControl(''),
        isbn_no: new FormControl(''),
        bk_name: new FormControl(''),
        author_name: new FormControl(''),
        publish_dt: new FormControl(''),
        edition: new FormControl(''),
        content_page_no_from: new FormControl(''),
        content_page_no_to: new FormControl(''),
        preview_page:new FormControl(''),
        page_count_start: new FormControl(''),
        bk_img: new FormControl(''),
        per_page_price: new FormControl(''),
        full_ebk_price: new FormControl(''),
        mrp: new FormControl(''),
        ofr_price: new FormControl(''),
        delivery_chrgs: new FormControl(''),
        about_bk: new FormControl(''),
        about_author: new FormControl(''),
        more: new FormArray([]),
        ass_cpn: new FormControl(''),
        show_book: new FormControl(''),
        book_pdf: new FormControl(''),
        cat:new FormControl(''),
        subcat: new FormControl('')
    })

constructor(
    private __route: Router,
    private __acRT: ActivatedRoute,
    private __utility: UtilityTService,
    private __dialog: MatDialog,
    private showcat: PublishercategoryshowService
) {
}

ngOnInit(){
  this.getBookDetails(atob(this.__acRT.snapshot.params['id']));
  this.getCoupons();

}

    getCoupons()
    {
        this.__utility.api_call(0,'/api/admin/getTempBookId',null).pipe(pluck("message")).subscribe(res =>{
        this.__cpnMst = res;
        })
    }
    getBookDetails(__id: any){
  this.__utility.api_call(0,'/api/admin/editBookDetails','id='+__id).pipe(pluck("message")).subscribe((res: any) =>{
    this.__uploadPages = res[0].uploaded_pages;
    this.setFormControl(res);
    this.getPageCount(res[0].full_book_path);
  })

}
setFormControl(res : any[]){
    this.__book.patchValue({
        pub_name: res[0].publisher_name,
        isbn_no:res[0].isbn_no,
        bk_name:res[0].book_name,
        author_name:res[0].author_name,
        publish_dt:res[0].publication_date,
        edition:res[0].edition,
        content_page_no_from:res[0].content_page_no_from,
        content_page_no_to:res[0].content_page_no_to,
        preview_page:res[0].preview_page,
        page_count_start:res[0].page_count_start,
        bk_img:res[0].book_image_path,
        per_page_price:res[0].price,
        full_ebk_price:res[0].price_fullbook,
        mrp:res[0].print_book_mrp,
        ofr_price:res[0].print_book_offermrp,
        delivery_chrgs:res[0].print_book_deliverycharge,
        about_bk:res[0].about_book,
        about_author:res[0].about_author,
        show_book:res[0].show_book,
        book_pdf: res[0].full_book_path,
    })

}
changeBookStatus(__mode: string){
    // const __fb = new FormData();
    // __fb.append('id',atob(this.__acRT.snapshot.params['id']));
    // __fb.append('show_book',this.__book.value.show_book);
    // __fb.append('temp_book_id',this.__book.value.ass_cpn);
    // this.__utility.api_call(1,__mode =='A' ? '/api/admin/approvedbook' : '/api/admin/rejectbook',__fb).pipe(pluck("success")).subscribe((res: any) =>{
    //     console.log(res);
    //     if(res == 1){
    //         this.__route.navigate(['/admin/publisherbooks'])
    //     }
        
    // })
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width=(__mode == 'R' ? '50%' : (__mode == 'A' ? '30%' : '100%'));

    dialogConfig.data = {
        mode:__mode,
        temp_book_id:this.__book.value.ass_cpn,
        id:atob(this.__acRT.snapshot.params['id']),
        show_book:this.__book.value.show_book,
        api_name: __mode =='A' ? '/api/admin/approvedbook' : '/api/admin/rejectbook',
        book_name:this.__book.value.bk_name,
        pdf: this.__book.value.book_pdf
    }
    try {
        const dialogref = this.__dialog.open(
            DialogforbjapprejComponent,
          dialogConfig
        );
        dialogref.afterClosed().subscribe((dt) => {
          if (dt) {
            this.__route.navigate(['/admin/publisherbooks'])
          }
        });
      } catch (ex) {
      }
    }

async  getPageCount(full_book_path: any){
      const formPdfBytes = await fetch(full_book_path).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(formPdfBytes);
      const pageCount = pdfDoc.getPageCount();
      this.__totalPages=pageCount;
      console.log(this.__totalPages);
  }

}