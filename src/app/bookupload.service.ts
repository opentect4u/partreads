import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'; 
import { Book } from './book';
import { myobj } from './myobj';
import {Observable} from 'rxjs'; 
import { GlobalConstants } from './globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class BookuploadService {
url=GlobalConstants.apiURL+'/api/publisher/uploadbook';
cat:any={};
subcat:any={};
table_of_content:any={};
 constructor(private http:HttpClient) { }
  upload(b:Book,random_pages:any,category:any[],subcategory:any[],full_book_price:any,pub_year:any,edition:any,otherContents:any[],d_charge:any,mrp:any,offerprice:any):Observable<any> {
    console.log("Book_image_name:" +b.book_image.name);
    console.log("Book_image:" +b.book_image);
    const headers = new HttpHeaders();
   console.log(category,subcategory);
    /*  headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
     /* const  book_pdf= new FormData(); 
      const  book_image= new FormData(); 
      
      book_pdf.append("file", b.book_pdf, b.book_pdf.name); 
      book_image.append("file",b.book_image,b.book_image.name);*/
      //const formData=new FormData();
      var test={
         _id:b._id,
         publisher_name:b.publisher_name,
        category_id:b.category_id,
        sub_category_id:b.sub_category_id,
         book_name:b.book_name,
        author_name:b.author_name,
         price:b.price,
         isbn_no:b.isbn_no,
         about_author:b.about_author,
        about_book:b.about_book,
        user_name:b.user_name
      }
      const formData=new FormData();
     // formData.append('id',JSON.stringify(b._id));
      formData.append('id',b._id);
      formData.append('file_book', b.book_pdf,b.book_pdf.name);
      formData.append('book_name', b.book_name);
      // formData.append('book_image',b.book_image,b.book_image.name);
      formData.append('book_image',b.book_image);
      formData.append('publisher_name',b.publisher_name);
      // formData.append('category_id',b.category_id);
      // formData.append('sub_category_id',b.sub_category_id);
      formData.append('author_name',b.author_name);
      formData.append('price',b.price);
      formData.append('isbn_no',b.isbn_no);
      formData.append('about_author',b.about_author);
      formData.append('about_book',b.about_book);
      formData.append('user_name',b.user_name);
      formData.append('contents_from',b.contents_from);
      formData.append('contents_to',b.contents_to);
      formData.append('random_from',b.random_from);
      formData.append('random_to',b.random_to);
      formData.append('random_pages',random_pages);
      formData.append('pagecountstart',b.random_to);
       formData.append('price_fullbook',full_book_price);
       formData.append('publication_date',pub_year);
       formData.append('edition',edition);
       formData.append('print_book_mrp',mrp);
       formData.append('print_book_offermrp',offerprice);
       formData.append('print_book_deliverycharge',d_charge);

      for(let i=0;i<category.length;i++){
        //  this.cat[i]=category[i].id;
         this.cat[i]= category[i].id;
        //  this.cat.push({id:category[i].id})
      // formData.append('category_id[]',category[i].id);
      //  formData.append('category_id', category[i].id);
      }     

      for(let j=0;j<otherContents.length;j++){
                this.table_of_content[j]=otherContents[j];
      }
      formData.append('table_of_content',JSON.stringify(this.table_of_content));
      
       formData.append('category_id',JSON.stringify(this.cat));
       for(let i=0;i<subcategory.length;i++){
        this.subcat[i]=subcategory[i].id;
      }
      formData.append('sub_category_id', JSON.stringify(this.subcat));
      console.log(this.cat,this.subcat);
  
      
       
      /*formData.append('data', JSON.stringify(test));
      formData.append('file_book',b.book_pdf, b.book_pdf.name);
      formData.append('file_image',b.book_image,b.book_image.name);*/
      // console.log(formData);
      // console.log(b.book_image);
      // console.log("Book_image:" +b.book_image);
      //  console.log(formData.getAll('category_id'));
       // Display the keys
// for (var key of formData.) {
//   console.log(key);
// }
      //  formData.forEach((data,keys)=>{
      //    console.log(keys+":"+data);
         
      //  })
      // console.log(formData)
    //   for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ' - ' + pair[1]); 
    // }
    
      return this.http.post(this.url,formData,{
      responseType: 'text',
     // headers: headers
  })
  // return b1.book_pdf;
    // return 1;
  }
}
