import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ValidationService} from './validation.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'm-err-msg',
  styles: [''],
  template: `
    <div
      class="form-control-feedback text-danger"
      *ngIf="errorMessage !== null">
      {{errorMessage}}
    </div>`
})
export class ErrorMessageComponent {
  @Input() myElement: FormControl;

  constructor(private translate: TranslateService) {
  }

  get errorMessage() {
    for (let propertyName in this.myElement.errors) {
      if (this.myElement.errors.hasOwnProperty(propertyName) && (this.myElement.touched || this.myElement.dirty)) {
        return this.translate.instant(ValidationService.getValidatorErrorMessage(propertyName, this.myElement.errors[propertyName]),
          { 'vKey': this.myElement.errors[propertyName] });
      }
    }
    return null;
  }
}
