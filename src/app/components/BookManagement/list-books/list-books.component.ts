import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { initFlowbite } from 'flowbite';
import { Modal } from 'flowbite';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/shared/alert.service';
import { TokenService } from 'src/app/shared/token.service';
@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  books!: any
  isLoading: boolean = false
  isSaving: boolean = false
  modal!: any
  bookForm: FormGroup;
  errors: any = null
  cover_image!: string
  role!: string

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private alert: AlertService,
    private tokenService: TokenService
  ) {
    this.bookForm = this.fb.group({
      book_id: [''],
      isbn: [''],
      title: [''],
      description: [''],
      price: [''],
      cover_image: [''],
    });

  }

  ngOnInit(): void {
    this.initializeModal()
    this.getBooks()
    this.role = this.tokenService.getRole()
  }

  getBooks = () => {
    this.isLoading = true

    this.bookService.getAuthorBooks().subscribe(
      (result) => {
        this.books = result.books;
      },
      (error) => {
        console.log(error)
        this.isLoading = false
      },
      () => {
        this.isLoading = false
      }
    )
  }

  initializeModal = () => {
    initFlowbite()
    const $targetEl = document.getElementById('defaultModal');
    this.modal = new Modal($targetEl);
  }

  //open edit modal
  openEditModal = (book: any) => {
    this.bookForm.patchValue({
      book_id: book.id,
      title: book.title,
      isbn: book.isbn,
      description: book.description,
      price: book.price
    })

    this.cover_image = book.cover_image

    this.modal.show();
  }

  closeEditModal = () => {
    this.modal.hide();
  }

  onSubmit = () => {
    this.isSaving = true

    //add form values to form data object
    const formData: any = new FormData()

    formData.append('book_id', this.bookForm.controls['book_id'].value)
    formData.append('isbn', this.bookForm.controls['isbn'].value)
    formData.append('title', this.bookForm.controls['title'].value)
    formData.append('description', this.bookForm.controls['description'].value)
    formData.append('price', this.bookForm.controls['price'].value)
    formData.append('cover_image', this.bookForm.controls['cover_image'].value ?? null)

    this.bookService.updateABook(formData).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error.errors;
        this.isSaving = false

        if (error.message) {
          this.alert.error(error.message)
        }
      },
      () => {
        this.getBooks()
        this.bookForm.reset()
        this.closeEditModal()
        this.isSaving = false
        this.alert.success("Book is updated successfully")
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
