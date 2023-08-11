import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert.service';
import { BookService } from 'src/app/shared/book.service';
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
    private router: Router,
    private fb: FormBuilder,
    private token: TokenService,
    private bookService: BookService,
    private alert: AlertService
  )
  {
    this.bookForm = this.fb.group({
      author_id: [this.token.getAuthorId()],
      isbn: [''],
      title: [''],
      description: [''],
      price: [''],
      cover_image: [''],
    });
  }

  onSubmit = () => {
    this.isLoading = true

    //add form values to form data object
    const formData: any = new FormData()

    formData.append('author_id', this.bookForm.controls['author_id'].value)
    formData.append('isbn', this.bookForm.controls['isbn'].value)
    formData.append('title', this.bookForm.controls['title'].value)
    formData.append('description', this.bookForm.controls['description'].value)
    formData.append('price', this.bookForm.controls['price'].value)
    formData.append('cover_image', this.bookForm.controls['cover_image'].value)

    this.bookService.createABook(formData).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error.errors;
        console.log(error.error.errors)
        this.isLoading = false
      },
      () => {
        this.bookForm.reset();
        this.isLoading = false
        this.alert.success("Book is added successfully")
        this.router.navigate(['/manage-books/all']);
      }
    );
  }

  fileProcess = (event: Event) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    this.bookForm.patchValue({
      cover_image: file
    })
  }
}
