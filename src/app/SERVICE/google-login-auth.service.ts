import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleLoginAuthService {
 private auth2!:gapi.auth2.GoogleAuth;
  private subject=new ReplaySubject<gapi.auth2.GoogleUser>(1);
  constructor() { 
    gapi.load('auth2',()=>{
      this.auth2=gapi.auth2.init({
        // client_id:'284154558130-37fcsf96ub85mjpjscfoas6nrfsfbobd.apps.googleusercontent.com'
        client_id:'284154558130-37fcsf96ub85mjpjscfoas6nrfsfbobd.apps.googleusercontent.com'
      })
    })
  }
  public signin(){
    this.auth2.signIn({
     scope:'https://www.googleapis.com/auth/gmail.readonly'
    // scope: "https://www.googleapis.com/auth/userinfo.profile"
    }).then((user:any)=>{
       this.subject.next(user)
      //  console.log(user.profile);  
    }).catch(()=>{
     this.subject.next();
    })
  }
  public signout(){
    this.auth2.signOut().then(()=>{
     this.subject.next();
    })
  }
  public observable():  Observable<gapi.auth2.GoogleUser>{
           return this.subject.asObservable();
  }
}
