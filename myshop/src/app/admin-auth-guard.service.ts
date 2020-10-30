import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private auth: AuthService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkAdminLogin(url);
  }

  checkAdminLogin(url: string) {
    if (this.auth.isAdminLoggedIn()) {
      return true;
    }

    this.auth.redirectUrl = url;

    this.router.navigate(['/']);
  }
}
