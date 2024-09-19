import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

interface IDynamicErrorField {
  [error: string]: string;
}

export const usernameValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return null;
    const allowedUsernamePattern = new RegExp(/[A-Za-z0-9_]+$/);
    const errorObject: IDynamicErrorField = {};
    /**
     * TIP:
     *
     * Remember, if you are going to show a custom error on the HTML,
     * make sure that the value of the error key is not empty.
     *
     * For example, you cannot have it like this
     *
     * errorObject['usernameIsRequired'] = ''
     *
     * As this will be treated as a null and the clause will not be
     * executed
     */
    if (!control.value) {
      errorObject['usernameIsRequired'] = 'Username is required';
    } else if (!control.value?.match(allowedUsernamePattern)) {
      errorObject['invalidUsername'] =
        'Username must contain one of A-Z or a-z or 0-9 or _';
    }
    return control.value?.match(allowedUsernamePattern) ? null : errorObject;
  };
};

export const emailValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const out: IDynamicErrorField = {};
    const [_, domain] = control.value?.split('@');
    if (!control.value) {
      return { missingEmail: 'Email address is required' };
    } else if (domain !== 'the__b_a_e.com') {
      return {
        invalidEmail:
          'The email must be a work email so it should end with &#64;the__b_a_e.com',
      };
    }
    return null;
  };
};
