import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {LogintestComponent} from './components/logintest/logintest.component';
import { HttpClientModule } from '@angular/common/http';
import {ProfileCardComponent} from './components/profile-card/profile-card.component';
import {SurveillanceFootageComponent} from './components/surveillance-footage/surveillance-footage.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NgIf} from '@angular/common'; // Import HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true, // <--- THIS is crucial
  imports: [RouterOutlet, LogintestComponent, HttpClientModule, ProfileCardComponent, SurveillanceFootageComponent, SidebarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // <--- note the 's'
})
export class AppComponent {
  title = 'ViolenceDetectionProjectFrontend';
  showSidebar = true;

  constructor(private router: Router) {
    // Watch for route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide sidebar if we're on the login route
        this.showSidebar = event.urlAfterRedirects !== '/login';
      }
    });
  }
}

