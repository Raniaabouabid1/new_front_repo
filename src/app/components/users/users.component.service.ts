import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string; // or Date
  role?: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPsw: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';  // Your API URL for users

  constructor(private http: HttpClient) {}

  // Accept optional query params
  getUsers(paramsObj?: any): Observable<IUser[]> {
    let params = new HttpParams();
    if (paramsObj) {
      Object.keys(paramsObj).forEach(key => {
        if (paramsObj[key]) {
          params = params.append(key, paramsObj[key]);
        }
      });
    }
    return this.http.get<IUser[]>(this.apiUrl, { params });
  }

  deleteUser(userId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`); // Delete user by ID
  }

// Example in your UserService:
  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }


}



