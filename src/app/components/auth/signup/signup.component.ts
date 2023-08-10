import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerObj: any = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }
}
