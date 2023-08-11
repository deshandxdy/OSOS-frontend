import { Component, OnInit } from '@angular/core';
import { AuthStateService } from './shared/auth-state.service';
import { Router } from '@angular/router';
import { TokenService } from './shared/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSignedIn!: boolean;
  constructor(
    private token: TokenService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.isSignedIn = this.token.isLoggedIn()

    /* if (!this.isSignedIn) {
      this.router.navigate(['sign-in'])
    } else {
      this.router.navigate([''])
    } */
  }
}
