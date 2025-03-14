

import { Routes} from '@angular/router';
import { LoginLayoutComponent } from './components/layouts/login-layout.component';
import { MainLayoutComponent } from './components/layouts/main-layout.component';
import { LogintestComponent } from './components/logintest/logintest.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { SurveillanceFootageComponent } from './components/surveillance-footage/surveillance-footage.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LogintestComponent },
      { path: 'profile/:id', component: ProfileCardComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'profile', component: ProfileCardComponent },
      { path: 'footages', component: SurveillanceFootageComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
      // other authenticated routes
    ]
  }
];
