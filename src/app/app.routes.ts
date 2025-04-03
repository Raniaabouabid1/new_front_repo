
import { Routes } from '@angular/router';
import { LoginLayoutComponent } from './components/layouts/login-layout.component';
import { MainLayoutComponent } from './components/layouts/main-layout.component';
import { LogintestComponent } from './components/logintest/logintest.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { SurveillanceFootageComponent } from './components/surveillance-footage/surveillance-footage.component';
import { UsersComponent } from './components/users/users.component';
import { SectionsComponent} from './components/sections/sections.component';
import { AuthGuard } from './auth/auth.guard';
import {LogoutComponent} from './components/lougout/logout.component';
/*

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
      { path: 'footages', component: SurveillanceFootageComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'sections', component: SectionsComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
      // Other protected routes can be added here.
    ]
  }
];
*/


export const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LogintestComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: LogoutComponent,
    children: [
      { path: 'logout', component: LogoutComponent }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'profile', component: ProfileCardComponent, canActivate: [AuthGuard] },
      { path: 'footages', component: SurveillanceFootageComponent, canActivate: [AuthGuard] },

      // 🚫 Only ADMIN can access users
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['ROLE_ADMIN'] }
      },

      // ✅ ADMIN and SECURITY_AGENT can access sections
      {
        path: 'sections',
        component: SectionsComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_SECURITY_AGENT'] }
      },

      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ]
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  }
];
