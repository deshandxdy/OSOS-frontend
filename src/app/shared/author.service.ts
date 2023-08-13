import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<any> {
    return this.http.get(baseUrl+'api/authors');
  }

  changeStatus(formData: FormData): Observable<any> {
    return this.http.post(baseUrl+'api/change-status', formData);
  }
}
