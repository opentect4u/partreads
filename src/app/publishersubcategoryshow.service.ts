import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pubsubCat } from './pubsubcat';
import { GlobalConstants } from './globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class PublishersubcategoryshowService {
 url=GlobalConstants.apiURL+'/api/publisher/showsubcategory';
 category_id:any={};
  constructor(private http:HttpClient) { }
  getData(v:pubsubCat){
    return this.http.post(this.url,v);
  }
  getSubCategory(v:any[]){
      const formData=new FormData();
      this.category_id={};
    for(let i=0;i<v.length;i++){
      //  this.cat[i]=category[i].id;
       this.category_id[i]= v[i].id;
      //  this.cat.push({id:category[i].id})
    // formData.append('category_id[]',category[i].id);
    //  formData.append('category_id', category[i].id);
    }     
    console.log(v,this.category_id);

    formData.append('category_id',JSON.stringify(this.category_id));
    return this.http.post(this.url,formData);
  }

}
