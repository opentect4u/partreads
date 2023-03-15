import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChangepubstatusService {
 url=GlobalConstants.apiURL+'/api/admin/useractiveinactive';
  constructor(private http:HttpClient) { }
  change_status(id:any,stat:any,uid:any,reason:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_id',uid);
    formdata.append('user_status',stat);
    formdata.append('reason',reason)
    console.log("id "+formdata.get('id')+" user_id "+formdata.get('user_id')+" user_status "+formdata.get('user_status'))
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
}
