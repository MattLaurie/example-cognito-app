import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Injectable()
export class SignupSkip implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {
  }

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
