import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { GlobalConstants } from '../globalvar/global';
@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
 url=GlobalConstants.apiURL+'/api/user/home';
  constructor(private http:HttpClient) { }
  get_Details(id:any,usertype:any,remembertoken:any){
    // console.log('ss');
    const formdata=new FormData()
    formdata.append('id',id);
    formdata.append('user_type',usertype);
    formdata.append('remember_token',remembertoken)
    return this.http.post(this.url,formdata,{responseType:'text'});
  }
}
