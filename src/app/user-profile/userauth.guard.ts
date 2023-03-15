import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserauthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;  
    return this.verifyLogin(url);
}

verifyLogin(url:string) : any{
    if(!this.isLoggedIn()){
        // this.router.navigate(['/user/userlogin']);
        this.router.navigate(['/']);

        return false;
    }
    else if(this.isLoggedIn()){
        return true;
    }
    
        
}
public isLoggedIn(): boolean{

    let status = false;
    if( localStorage.getItem('u-loggedin') == "true"){
      status = true;
    }
    else{
      status = false;
    }
    return status;
}

}
