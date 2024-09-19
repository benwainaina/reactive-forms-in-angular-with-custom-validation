import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import {
  emailValidator,
  usernameValidator,
} from './validators/signup.validators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public signupForm: FormGroup = new FormGroup({
    username: new FormControl('', usernameValidator()),
    email: new FormControl('', emailValidator()),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  public onFormSubmit(): void {
    console.log('this.signupform', this.signupForm.value);
  }
}
// ben@the__b_a_e.com
