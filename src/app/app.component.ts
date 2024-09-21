import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from './validators/signup.validators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgTemplateOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public signupForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', usernameValidator()),
      email: new FormControl('', emailValidator()),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    },
    [passwordValidator()]
  );

  public passwordValidationChecks: Array<{ key: string; label: string }> = [
    {
      key: 'invalidLength',
      label: 'The password must be at least 8 characters long',
    },
    {
      key: 'missingUpperCase',
      label: 'The password must start with an upper case character',
    },
    {
      key: 'missingSymbols',
      label:
        'The password must contain at least one of these symbols: !@#$%&*^',
    },
    {
      key: 'missingNumber',
      label: 'The password must contain at least one number',
    },
  ];

  public showConfirmation: boolean = false;

  public onFormSubmit(): void {
    console.log('this.signupform', this.signupForm.value);
    this.showConfirmation = true;
  }
}
// ben@the__b_a_e.com
