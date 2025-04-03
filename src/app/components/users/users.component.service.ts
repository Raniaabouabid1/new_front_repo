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
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number, size: number, fullName?: string, role?: string, searchEmail?: string): Observable<any> {
    const token = localStorage.getItem('jwt'); // or sessionStorage
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('fullName', fullName || '')
      .set('searchEmail', searchEmail || '')
      .set('role', role || '');

    const headers = {
      Authorization: `Bearer ${token}`

    };
    console.log("my token wehgfwegfyuw: ", token);

    return this.http.get<any>(this.apiUrl, {params, headers});
  }
  deleteUser(userId: number | undefined): Observable<any> {
    const token = localStorage.getItem('jwt');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    return this.http.delete<IUser>(`${this.apiUrl}/${userId}`, { headers });
  }

  addUser(user: IUser): Observable<IUser> {
    const token = localStorage.getItem('jwt');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.http.post<IUser>(`${this.apiUrl}`, user, { headers });
  }

  updateUser(user: IUser): Observable<IUser> {
    const token = localStorage.getItem('jwt');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    return this.http.put<IUser>(`${this.apiUrl}/${user.id}`, user, { headers });
  }
}



