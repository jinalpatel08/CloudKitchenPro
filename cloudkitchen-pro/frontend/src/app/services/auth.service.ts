import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api';
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-35495146`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login-35495146`, { email, password });
  }

  logout(userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout-35495146`, { userId });
  }

  checkAuth(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/check-auth-35495146/${userId}`);
  }

  setCurrentUser(user: User) {
    this.currentUser.set(user);
  }

  /** Returns current user or null */
  getCurrentUser(): User | null {
    return this.currentUser();
  }

  clearUser() {
    this.currentUser.set(null);
  }
}
