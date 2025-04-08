import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { LoginService } from '../logintest/logintest.component.service';
import {jwtDecode} from 'jwt-decode';
import {RouterLink} from '@angular/router';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';

interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgSwitchCase,
    NgSwitch
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit{
  isExpanded = false;
  user: any = {};
  userId: string = '';



  constructor(private authService: LoginService,private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        this.userId = decoded.sub;
        console.log('Extracted user ID from token:', this.userId);
        this.http.get(`http://localhost:8080/api/profile/${this.userId}`)
          .subscribe({
            next: data => {
              this.user = data;
              this.loadProfileImage(); // Load profile image after user data
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
  logout(): void {
    this.authService.logout();
    const token = localStorage.getItem('jwt')
    console.log("my token i after logout "+token);
  }

  loadProfileImage(): void {
    this.http.get(`http://localhost:8080/api/profile/${this.userId}/profile-image`, { responseType: 'blob' })
      .subscribe({
        next: (imageBlob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.user.profileImage = reader.result as string;
          };
          reader.readAsDataURL(imageBlob);
        },
        error: () => {
          console.log("No profile image found, using default.");
          this.user.profileImage = "/avatar.svg";
        }
      });
  }
}
