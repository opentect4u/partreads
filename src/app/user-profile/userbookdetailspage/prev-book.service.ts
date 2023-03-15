import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'src/app/globalvar/global';
import { throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PrevBookService {
  url = GlobalConstants.apiURL + '/api/user/showpreviewindex1';
  constructor(private http: HttpClient) { }
  show_book(book_id: any, p_id: any, id: any, usertype: any, remembertoken: any) {
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('user_type', usertype);
    formdata.append('remember_token', remembertoken);
    formdata.append('book_id', book_id);
    formdata.append('publisher_id', p_id);
    return this.http.post(this.url, formdata, { responseType: 'text' });
  }
}
