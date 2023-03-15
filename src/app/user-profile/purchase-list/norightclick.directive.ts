import { Directive,HostListener } from '@angular/core';

@Directive({
  selector: '[appNorightclick]'
})
export class NorightclickDirective {

  @HostListener('contextmenu', ['$event'])
  onRightClick(event:any) {
    //alert("disabled");
    event.preventDefault();
  }
  constructor() { }

}
