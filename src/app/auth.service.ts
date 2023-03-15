import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  logout():void
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user-type_user');
    localStorage.setItem('isLoggedIn', "false");
  }
}
