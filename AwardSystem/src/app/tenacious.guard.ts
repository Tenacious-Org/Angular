import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TenaciousGuard implements CanActivate {
  canActivate() {
    const isTenacious = false;
    if (isTenacious) {
      return true;
    }
    else {
      return false;
    }
  }
  // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  // return true;
  //}

}
