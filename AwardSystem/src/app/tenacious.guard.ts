import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

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
