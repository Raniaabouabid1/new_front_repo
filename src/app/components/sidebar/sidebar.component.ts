

import { Component } from '@angular/core';
import { LoginService } from '../logintest/logintest.component.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isExpanded = false;


  constructor(private authService: LoginService) {}

  logout(): void {
    this.authService.logout();
  }
}
