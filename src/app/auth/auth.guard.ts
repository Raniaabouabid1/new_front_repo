// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('jwt');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRoles = next.data['expectedRoles'];
    if (expectedRoles && expectedRoles.length > 0) {
      const decoded: any = jwtDecode(token);
      const userRole = decoded.role; // assumes `role` is in your JWT
      console.log('Decoded role:', userRole);
      if (!expectedRoles.includes(userRole)) {
        this.router.navigate(['/unauthorized']); // fallback page
        return false;
      }
    }

    return true;
  }
}
