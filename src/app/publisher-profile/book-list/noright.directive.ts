import { Directive,HostListener } from '@angular/core';

@Directive({
  selector: '[appNoright]'
})
export class NorightDirective {

  @HostListener('contextmenu', ['$event'])
  onRightClick(event:any) {
    //alert("disabled");
    event.preventDefault();
  }
  constructor() { }

}
