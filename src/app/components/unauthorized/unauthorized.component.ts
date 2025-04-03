import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl:  `
    <div class="p-8 text-center">
      <h1 class="text-3xl font-bold text-red-700">🚫 Access Denied</h1>
      <p class="mt-4">You don't have permission to view this page.</p>
    </div>
  `,
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {}
