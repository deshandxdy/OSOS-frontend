import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  books!: any
  isLoading: boolean = false

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(
      (result) => {
        this.books = result.books;
        console.log(result.books)
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

}
