import { Directive,HostListener } from '@angular/core';

@Directive({
  selector: '[appRightclickoff]'
})
export class RightclickoffDirective {

  @HostListener('contextmenu', ['$event'])
  onRightClick(event:any) {
    //alert("disabled");
    event.preventDefault();
  }
  constructor() { }

}
