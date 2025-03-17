
import { Routes } from '@angular/router';
import { LoginLayoutComponent } from './components/layouts/login-layout.component';
import { MainLayoutComponent } from './components/layouts/main-layout.component';
import { LogintestComponent } from './components/logintest/logintest.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { SurveillanceFootageComponent } from './components/surveillance-footage/surveillance-footage.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './auth/auth.guard';
import {LogoutComponent} from './components/lougout/logout.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LogintestComponent },
      { path: 'profile/:id', component: ProfileCardComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: LogoutComponent,
    children: [
      { path: 'logout', component: LogoutComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // Guard the profile route; update parameter syntax if needed.
      { path: 'profile', component: ProfileCardComponent, canActivate: [AuthGuard] },
      // Alternatively, if the profile doesn't require a parameter:
      { path: 'footages', component: SurveillanceFootageComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
      // Other protected routes can be added here.
    ]
  }
];
