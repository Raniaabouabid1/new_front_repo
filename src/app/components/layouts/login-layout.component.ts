import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-login-layout',
  template: `
    <!-- Full screen container -->
    <div class="w-full h-screen flex items-center justify-center bg-gray-200">
      <!-- Router outlet for the login form -->
      <router-outlet></router-outlet>
    </div>
  `,
  imports: [
    RouterOutlet
  ],
  standalone: true
})
export class LoginLayoutComponent {}
