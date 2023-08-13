import { Component, OnInit } from '@angular/core';
import { TokenService } from '../shared/token.service';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  query: string = ''
  message: string = ''
  role!: string
  books!: any
  isLoading: boolean = false

  constructor(
    private token: TokenService,
    private bookService: BookService

  ) {}

  ngOnInit(): void {
    //retrive books
    this.getBooks()

    //retrive user role
    this.role = this.token.getRole()
  }

  getBooks = () => {
    this.isLoading = true
    this.message = ''
    this.bookService.getAllBooks(this.query).subscribe(
      (result) => {
        this.books = result.books;
        if (result.message) {
          this.message = result.message
        }
      },
      (error) => {
        this.isLoading = false
      },
      () => {
        this.isLoading = false
      }
    )
  }

  searchQuery = (event: any) => {
    this.query = event.target.value
    this.getBooks()
  }

}
