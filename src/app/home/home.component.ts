import { Component } from '@angular/core';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  role!: string

  constructor(
    public token: TokenService,
  ) {
      this.role = this.token.getRole()
  }
}
