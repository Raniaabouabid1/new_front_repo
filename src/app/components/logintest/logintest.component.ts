import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService, LoginRequest } from './logintest.component.service';
import {LoginResponse} from './logintest.component.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logintest',
  standalone: true,
  imports: [
    FormsModule  // Remove HttpClientModule from here
  ],
  templateUrl: './logintest.component.html',
  styleUrls: ['./logintest.component.css']
})
export class LogintestComponent {
  credentials: LoginRequest = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router) { }



  onSubmit(): void {
    console.log('Login credentials:', this.credentials);
    this.loginService.login(this.credentials).subscribe({
      next: (response: LoginResponse) => {
        console.log('JWT Token:', response.token);
        localStorage.setItem('jwt', response.token);
      },
      error: err => console.error('Login failed', err)
    });
  }

}
