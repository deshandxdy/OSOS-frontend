import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../constants';

export class Book {
  author_id!: string
  isbn!: string
  title!: string
  description!: string
  price!: number
  cover_image!: string
}
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.http.get(baseUrl+'api/books');
  }

  createABook(formData: FormData): Observable<any> {
    return this.http.post(baseUrl+'api/create-book', formData);
  }

}
