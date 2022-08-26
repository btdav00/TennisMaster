import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthorizationService} from "../../authorization.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectIfNotLoggedGuard implements CanActivate {
  redirect = 'login'

  constructor(private auth:AuthorizationService,private router:Router) {}

  canActivate() {
    if (this.auth.isLogged()) {
      return true
    }
    else{
      this.router.navigate([this.redirect])
      return false;
    }
  }

}
