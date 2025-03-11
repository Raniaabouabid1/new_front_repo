import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css'],
  imports: []  // any necessary modules, e.g., CommonModule
})
export class AcceuilComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Make sure the JwtInterceptor attaches the token automatically
    this.http.get('/user/me').subscribe({
      next: data => {
        this.user = data;
        console.log('User data:', data);
      },
      error: err => console.error('Failed to fetch user details', err)
    });
  }
}
