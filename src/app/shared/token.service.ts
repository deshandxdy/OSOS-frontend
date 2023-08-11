import { Injectable } from '@angular/core';
import { baseUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handleData(data: any) {
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('user_id', data.user.id);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  getRole(): string
  {
    return localStorage.getItem('role') ?? '';
  }

  getUserId()
  {
    return localStorage.getItem('user_id') ?? '';
  }

  // Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) {
      return true
    } else {
      return false;
    }
  }

  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }

  //remove role
  removeRole() {
    localStorage.removeItem('role');
  }
}
