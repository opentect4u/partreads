import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalvar/global';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChanguserstatService {
 url=GlobalConstants.apiURL+'/api/admin/useractiveinactive';
 addNote=GlobalConstants.apiURL+'/api/admin/userremark';
  constructor(private http:HttpClient) { }
  change_status(id:any,s:any,ui:any,reason:any){
    const formdata=new FormData();
    formdata.append('id',id);
    formdata.append('user_status',s);
    formdata.append('user_id',ui);
    formdata.append('reason',reason);
    return this.http.post(this.url,formdata,{responseType:'text'})
  }
  add_annotation(admin_reamrks:any,table_id:any){
    const formdata=new FormData();
    formdata.append('admin_remarks',admin_reamrks);
    formdata.append('table_id',table_id);
    return this.http.post(this.addNote,formdata,{responseType:'text'})
  }
}
