import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[trim]'
})
export class TrimDirective {
  constructor(private el: ElementRef, private control: NgControl) {
  }

  @HostListener('blur', ['$event.target']) onFocusOut(target) {
    let str: string = this.control.value;
    if (str) {
      str = '' + str;
      this.control.control.setValue(str.trim());
    }
  }

}
