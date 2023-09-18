import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';


@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = this.authService.getRolesFromToken();

    if (roles) {
      if (roles.includes(route.data.requiredRole)) {
        return true; // Permite el acceso
      }
    }
    this.router.navigate(['']);
    return false;
  }
}
