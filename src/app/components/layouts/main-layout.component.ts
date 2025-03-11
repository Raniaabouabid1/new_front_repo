import { Component } from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  template: `
    <div class="flex h-screen">
      <app-sidebar></app-sidebar>

      <!-- Main content area -->
      <div class="flex-1">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  imports: [
    SidebarComponent,
    RouterOutlet
  ],
  standalone: true
})
export class MainLayoutComponent {}
