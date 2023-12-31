import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm: FormGroup;
  errors: any = null;
  loading: boolean = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public token : TokenService,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
    });
  }
  ngOnInit() {
    if (this.token.isLoggedIn()) {
      this.router.navigate([''])
    }
  }
  onSubmit() {
    this.loading = true
    this.authService.register(this.registerForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error.errors;
        this.loading = false
      },
      () => {
        this.registerForm.reset();
        this.loading = false
        this.router.navigate(['sign-in']);
      }
    );
  }
}
