import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../constants';

// User interface
export class User {
  first_name!: String;
  last_name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(baseUrl+'api/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(baseUrl+'api/login', user);
  }
  // Access user profile
  logout(user: User): Observable<any> {
    return this.http.post(baseUrl+'api/logout', user);
  }
}