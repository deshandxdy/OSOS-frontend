import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  authorId!: number

  @Input()
  bookItem!: {
    id?: string;
    isbn?: string;
    title?: string;
    description?: string;
    price?: any;
    cover_image?: string;
    author_id?: string;
    author?: number;
  };

  @Input()
  author!: {
    id?: number;
    first_name?: string;
    last_name?: string;
  };
  constructor(
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.authorId = this.token.getAuthorId()
  }
}
