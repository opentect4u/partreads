import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  url=GlobalConstants.apiURL+'/api/publisher/update';
  constructor(private http:HttpClient) { }
  editprofile(id:any,v1:any,v2:any,v3:any,v4:any,v5:any,v6:any,v7:any,v8:any,Bank_Name:any,IFSC_Code:any,gst_no:any,bank_acc:any,file:any){
    const formdata=new FormData();
    //id, name, phone,  profile_image, state, city, pincode, country
    formdata.append('id',id);
    formdata.append('name',v1);
    formdata.append('phone',v3);
    if(typeof(file)!=="undefined")
    formdata.append('profile_image',file,file.name);
    else{}
    formdata.append('state',v7);
    formdata.append('city',v5);
    formdata.append('pincode',v6);
    formdata.append('country',v8);
    formdata.append('street',v4);
    formdata.append('bank_name',Bank_Name);
    formdata.append('gst_no',gst_no);
    formdata.append('acc_no',bank_acc);
    formdata.append('ifsc_code',IFSC_Code);
    return this.http.post(this.url,formdata,{responseType:'text'});
  }
}
