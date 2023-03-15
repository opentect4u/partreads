import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class SplitbookService {
  r_pages:any={};
  url=GlobalConstants.apiURL+'/api/publisher/splitbook';
  constructor(private http:HttpClient) { }
  upload_book(v1:any, v2:any, v3:any, v4:any, v5:any, v6:any, v7:any, v8:any, v9:any, v10:any,v11:any,v12:any,pagecountstart:any,random_pages:any[],page_counter:any){
    const formData=new FormData();
    formData.append("mainbook_url",v1);
    formData.append("id",v2);
    formData.append("book_id",v3);
    formData.append("contents_from",v4);
    formData.append("contents_to",v5);
    formData.append("random_from",v6);
    formData.append("random_to",v7);
    formData.append("price",v8);
    formData.append("user_name",v9);
    formData.append("uploaded_page",v10);        
    formData.append("start_page",v11);        
    formData.append("end_page",v12);    
    formData.append('pagecounter',page_counter); 
    formData.append("pagecountstart",pagecountstart);
    // for(let random_page of random_pages){
      for(let i=0;i<random_pages.length;i++){
          this.r_pages[i]=random_pages[i];
      }
      formData.append('random_pages',JSON.stringify(this.r_pages));
      console.log(this.r_pages,random_pages);
      
    // }
    return this.http.post(this.url,formData,{responseType:"text"})
  }
}
