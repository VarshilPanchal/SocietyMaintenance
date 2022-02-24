import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { LocalStorageService } from '../services/localstorage-service/localstorage.service';

@Injectable()

export class AuthGuardAdmin implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorageService.getItem('user') && this.localStorageService.getItem('user').id === 'Admin') {
      return true;
    }
    // not logged in than redirect to login page
    this.router.navigate(['auth/login']);
    return false;
  }

}
