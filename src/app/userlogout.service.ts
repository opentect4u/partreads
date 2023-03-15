import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserlogoutService {

  constructor(private router:Router,private cookieService:CookieService) { }
  logout_user(){
    localStorage.removeItem('u-token');
    localStorage.setItem('u-loggedin','false');
    localStorage.removeItem('u-id');
    localStorage.removeItem('user-type_user');
    localStorage.removeItem('search-item');
    this.cookieService.delete('u_cookie-name');
    this.router.navigate(['/']);
  }
}
