import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input('isLoggedIn') isLoggedIn: boolean;
  role!: string

  constructor(
    public token: TokenService,
    public auth: AuthStateService,
    public router : Router
  ) {
    this.isLoggedIn = this.token.isLoggedIn()
    this.role = this.token.getRole()
  }
  ngOnInit(): void {

  }

  handleClick = () => {
    if (this.isLoggedIn) {
      this.logout()
    }
    this.router.navigate(['sign-in'])
  }

  logout = () => {
    this.token.removeToken();
    this.token.removeRole();
    this.auth.setAuthState(false)
    this.isLoggedIn = false
  }
}
