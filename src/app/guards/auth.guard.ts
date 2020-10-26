import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Auth Guard
    // console.log('Auth guard makes promise');
    return this.auth.session$.pipe(
      takeWhile(credentials => credentials === null, false),
      map(credential => {
        // console.log('Intercepting credential after takeWhile', credential);
        return credential;
      })
    ).toPromise().then(credentials => {
      const logged = this.auth.isLoggedIn();
      // console.log('Auth guard promise...', credentials, logged);
      if (!logged) {
        this.router.navigateByUrl('/landing');
        return false;
      }
      return true;
    });
  }
}
