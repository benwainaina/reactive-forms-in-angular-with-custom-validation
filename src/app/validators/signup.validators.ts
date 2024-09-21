import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

interface IDynamicErrorField {
  [error: string]: boolean;
}

export const usernameValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
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
     * errorObject['usernameIsRequired'] = '' or errorObject['usernameIsRequired'] = false
     *
     * As these will be treated as a null and 'not true', thus the clause will not be
     * executed
     */
    if (!control.value) {
      errorObject['usernameIsRequired'] = true;
    } else if (!control.value?.match(allowedUsernamePattern)) {
      errorObject['invalidUsername'] = true;
    }
    return control.value?.match(allowedUsernamePattern) ? null : errorObject;
  };
};

export const emailValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const out: IDynamicErrorField = {};
    const [_, domain] = control.value?.split('@');
    if (!control.value) {
      return { missingEmail: true };
    } else if (domain !== 'the__b_a_e.com') {
      return {
        invalidEmail: true,
      };
    }
    return null;
  };
};

export const passwordValidator = (): ValidatorFn => {
  return (form: AbstractControl): ValidationErrors | null => {
    const { password, confirmPassword } = form.value;

    /**
     * create a default password error each time this validator is invoked
     */
    const passwordError: IDynamicErrorField = {
      passwordMissing: true,
      passwordsDoNotMatch: true,
      invalidLength: true,
      missingUpperCase: true,
      missingSymbols: true,
      missingNumber: true,
    };

    /**
     * check if both passwords are there
     */
    if (password && confirmPassword) {
      passwordError['passwordMissing'] = false;
    }

    /**
     * check if the passwords match
     */
    if (password === confirmPassword) {
      passwordError['passwordsDoNotMatch'] = false;
    }

    /**
     * we can use the password, or the confirmPassword to make the check, it is up
     * to you, but best to use one of either, preferrably the password field
     */
    if (password) {
      /**
       * Check for appropriate password length
       */
      if (password.length > 8) {
        passwordError['invalidLength'] = false;
      }
      /**
       * Check if password starts with upper case letter
       */
      if (password.charAt(0).match(new RegExp(/[A-Z]/))) {
        passwordError['missingUpperCase'] = false;
      }
      /**
       * Check if password has either of these symbols: !@#$%&*^
       */
      if (password.match(new RegExp(/[!@#$%&*]+/))) {
        passwordError['missingSymbols'] = false;
      }
      /**
       * Check if password has a number
       */
      if (password.match(new RegExp(/[0-9]+/))) {
        passwordError['missingNumber'] = false;
      }
    }
    let passwordFormHasError = false;
    for (const key in passwordError) {
      if (passwordError[key]) {
        passwordFormHasError = true;
        break;
      }
    }
    return passwordFormHasError ? passwordError : null;
  };
};
