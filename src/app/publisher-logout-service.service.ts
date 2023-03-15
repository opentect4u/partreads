import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PublisherLogoutServiceService {

  constructor(private cookieService:CookieService,private router:Router) { }
  logout_pub(){
    localStorage.removeItem('uploader')
    localStorage.removeItem('pub-token');
    localStorage.removeItem('pub-id');
    localStorage.setItem('pub-loggedin','false');
    this.cookieService.delete('pub-cookie-name');
    this.router.navigate(['/publisher/publishernav']);
  }
}
