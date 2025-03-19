import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, // <--- THIS is crucial
  imports: [RouterOutlet, HttpClientModule],
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

