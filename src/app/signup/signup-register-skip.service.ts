import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Injectable()
export class SignupRegisterSkip implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const url = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {
    return this.auth.isAuthenticated()
      .then((result: boolean) => {
        if (result) {
          this.router.navigate(['/dashboard']);
          return false;
        }
        return true;
      });
  }
}
