import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string; // or Date
  roleName: string;
  email: string;
  phoneNumber: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';  // Your API URL for users

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Fetch users
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`); // Delete user by ID
  }
}


