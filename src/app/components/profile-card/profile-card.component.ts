import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  standalone: true
})
export class ProfileCardComponent {
  user: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const userId = decoded.sub;
        console.log('Extracted user ID from token:', userId);

        console.log(`http://localhost:8080/api/users/${userId}`);


        // Use the extracted user ID to fetch the profile
        this.http.get(`http://localhost:8080/api/users/${userId}`)
          .subscribe({
            next: data => {
              this.user = data;
            },
            error: err => {
              console.error('Error fetching user data:', err);
            }
          });
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    } else {
      console.error('No JWT token found in localStorage.');
    }
  }
}
