import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent {
  bookForm: FormGroup
  errors: any = null
  isLoading: boolean = false

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public token: TokenService
  )
  {
    this.bookForm = this.fb.group({
      author_id: this.token.getUserId(),
      isbn: [''],
      title: [''],
      description: [''],
      price: [''],
      cover_image: [''],
    });
  }

  onSubmit = () => {
    this.isLoading = true

  }
}
