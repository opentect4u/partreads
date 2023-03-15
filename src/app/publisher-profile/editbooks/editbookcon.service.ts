import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class EditbookconService {
  url=GlobalConstants.apiURL+'/api/publisher/editbookconfirm'
  null_val=false;
  cat:any={};
subcat:any={};
  constructor(private http:HttpClient) { }
  
  submit_edit_data(id:any,bid:any,pname:any,cname:any,scname:any,bname:any,aname:any,prc:any,isbn:any,about_book:any,about_author:any,Full_Book:any,delivery_charges:any,mrp_hard_copy:any,offer_price:any,pub_date:any,Book_Edition:any,category:any[],subcategory:any[],file:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('book_id',bid);
    formdata.append('publisher_name',pname);
    // formdata.append('category_id',cname);
    // formdata.append('sub_category_id',scname);
    formdata.append('book_name',bname);
    formdata.append('author_name',aname);
    formdata.append('price',prc);
    formdata.append('isbn_no',isbn);
    formdata.append('about_author',about_author);
    formdata.append('about_book',about_book);
    formdata.append('price_fullbook',Full_Book);
    formdata.append('print_book_deliverycharge',delivery_charges);
    formdata.append('print_book_mrp',mrp_hard_copy);
    formdata.append('print_book_offermrp',offer_price);
    formdata.append('publication_date',pub_date);
    formdata.append('edition',Book_Edition);
    formdata.append('Book_image',file);
    for(let i=0;i<category.length;i++){
       this.cat[i]= category[i].id;
    }     
     formdata.append('category_id',JSON.stringify(this.cat));
     for(let i=0;i<subcategory.length;i++){
      this.subcat[i]=subcategory[i].id;
    }
    formdata.append('sub_category_id', JSON.stringify(this.subcat)); 
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
