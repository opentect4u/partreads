import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PublisherAuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;  
    return this.verifyLogin(url);
   
   
}


verifyLogin(url:string) : any{
    if(!this.isLoggedIn()){
        this.router.navigate(['/publisher/logpub']);
        return false;
    }
    else if(this.isLoggedIn()){
        return true;
    }
    
        
}
public isLoggedIn(): boolean{
    let status = false;
    if( localStorage.getItem('pub-loggedin') == "true"){
      status = true;
    }
    else{
      status = false;
    }
    return status;
}

  
}
