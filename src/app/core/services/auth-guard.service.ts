import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    const expectedRoute = route.firstChild?.routeConfig?.path

    if (this.authService.isUserLoggedIn()) {
      if (expectedRoute == 'login') {
        
        this.router.navigate(['/home'])
        return true
      }else{
        if (this.checkPagePermission('/' + expectedRoute)) {
        
          return true;
        } else {
          
          this.router.navigate(['/login']);
          return false;
        }
      }
    }
    else{
      this.router.navigate(['/login']);
      return false;
      expectedRoute
    }
  }
  checkPagePermission(pageRoute: string) {
    let havePermission = true;
    const currentUser = this.authService.currentUser;

    return havePermission;
  }
}
