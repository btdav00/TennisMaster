import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthorizationService} from "../../authorization.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectIfLoggedGuard implements CanActivate {
  redirect = 'tabs'
  constructor(private auth:AuthorizationService,private router:Router) {
  }
  canActivate() {
    if (this.auth.isLogged()) {
      this.router.navigate([this.redirect])
      return true
    }
    else return false;
  }


}
