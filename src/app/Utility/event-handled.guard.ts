import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EbookuploadComponent } from '../publisher-profile/ebookupload/ebookupload.component';

@Injectable({
  providedIn: 'root'
})
export class EventHandledGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: EbookuploadComponent):boolean  {
      if(component.category_subcategory.dirty ){
        return confirm('Are you sure you want to continue ? Any unsaved changes will be lost');
      }
    return true;
  }
  
}
