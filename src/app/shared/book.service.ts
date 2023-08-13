import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../constants';
import { HttpParams } from "@angular/common/http";

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

  getAllBooks(query: string): Observable<any> {
    query = query.trim();
    const options = query ?
      { params: new HttpParams().set('query', query) } : {};

    return this.http.get(baseUrl+'api/books', options);
  }

  getAuthorBooks(): Observable<any> {
    return this.http.get(baseUrl+'api/author-books');
  }

  createABook(formData: FormData): Observable<any> {
    return this.http.post(baseUrl+'api/create-book', formData);
  }

  updateABook(formData: FormData): Observable<any> {
    return this.http.post(baseUrl+'api/update-book', formData);
  }

}
