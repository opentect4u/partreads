import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilityTService } from './Utility/utility-t.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
       ]
})
export class AppComponent {
  title = 'admin-app';
  _subs!:Subscription;
  _showContactUsButton:boolean = false;
  constructor(private utilyT:UtilityTService){
       this._subs = this.utilyT.getShowHideContactButton().subscribe(res=> {
                   this._showContactUsButton =res;
                  //  console.log(res);                     
       })
  }
  ngOnDestroy(){
    // console.log("Destroy")
  }
}
