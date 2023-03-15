import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appKeyoff]'
})
export class KeyoffDirective {

  constructor() { }
  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    // console.log(event);
    if (event.ctrlKey || event.key == 'F12') {
      event.returnValue = false;
      event.preventDefault();
    }
  }

}
