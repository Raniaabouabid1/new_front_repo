// login.component.ts
import { Component } from '@angular/core';
import { LoginService, LoginRequest } from './login.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: LoginRequest = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService) {}

  onSubmit(): void {
    this.loginService.login(this.credentials).subscribe({
      next: response => {
        console.log('JWT Token:', response.token);
        // Save the token (e.g., localStorage.setItem('jwt', response.token))
      },
      error: err => console.error('Login failed', err)
    });
  }
}
