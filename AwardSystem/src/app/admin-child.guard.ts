import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminChildGuard implements CanActivateChild {

  constructor(private _router:Router){}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(AuthenticationService.GetData("Admin"))
      {
        return true;
      }
      else{
        AuthenticationService.Logout();
        this._router.navigate(['/homecard/0']);
        return true;
      }
    return true;

    }
  
}
