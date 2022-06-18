import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable()
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'COMMON.VALIDATION.REQUIRED',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'COMMON.VALIDATION.EMAIL_FORMAT',
      'invalidPassword': 'COMMON.VALIDATION.PASSWORD_FORMAT',
      'passwordMismatch': 'COMMON.VALIDATION.SAME_PASSWORD_CONFIRM',
      'minlength': 'COMMON.VALIDATION.MIN_LENGTH',
      'maxlength': 'COMMON.VALIDATION.MAX_LENGTH',
      'invalidPhoneNumber': 'COMMON.VALIDATION.PHONE_FORMAT',
      'whitespace': 'aaaa',
      'fileEmpty': 'asas',
      'mismatch': 'aaasas',
      'cbbRequired': 'COMMON.VALIDATION.REQUIRED',
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return {'invalidCreditCard': true};
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  static emailValidatorNotRequire(control) {
    // RFC 2822 compliant regex
    if (!control.value) {
      return null;
    }
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }

  static matchPasswordValidator(ac: AbstractControl) {
    const password = ac.get('password').value;
    if (ac.get('confirmPassword').touched || ac.get('confirmPassword').dirty) {
      const verifyPassword = ac.get('confirmPassword').value;
      if (password !== verifyPassword) {
        ac.get('confirmPassword').setErrors({passwordMismatch: true});
      } else {
        return null;
      }
    }
  }

  static confirmPassword(control: FormControl, group: FormGroup, matchPassword: string) {
    if (!control.value || group.controls[matchPassword].value !== null || group.controls[matchPassword].value === control.value) {
      return null;
    }
    return {'mismatch': true};
  }

  static phoneNumberValidator(control) {
    const val = control.value;
    if (val) {
      if (val.match(/^[0][0-9]{9}$/)) {
        return null;
      } else {
        return {'invalidPhoneNumber': true};
      }
    }
    return null;
  }

  static noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true};
  }

  static fileNotEmptyValidator(files) {
    console.log(files);
    // if (files)
    // 	return files.length > 0 ? null : {'fileEmpty': true};
    return {'fileEmpty': true};
  }

  static comboboxValid(control: FormControl) {
    const isZero = control.value && control.value <= 0;
    const isValid = !isZero;
    return isValid ? null : {'cbbRequired': true};
  }
}
