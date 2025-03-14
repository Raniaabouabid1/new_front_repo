import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient, private router: Router) {}

  // Login function (you can delegate to your existing LoginService if you prefer)
  login(credentials: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // You can send credentials directly rather than a hardcoded test payload.
    return this.http.post<LoginResponse>(this.loginUrl, credentials, { headers });
  }

  // Logout functionality:
  logout(): void {
    // Remove the token from local storage (or wherever you store it)
    localStorage.removeItem('jwt');
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
