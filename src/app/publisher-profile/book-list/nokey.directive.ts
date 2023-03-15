import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNokey]'
})
export class NokeyDirective {

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    console.log(event);
    if (event.ctrlKey || event.shiftKey || event.key == 'F12') {
      event.returnValue = false;
      event.preventDefault();
    }

  }
  constructor() { }

}
