import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // No Auth Guard
    // console.log('NoAuth guard makes promise');
    return this.auth.session$.pipe(
      takeWhile(credentials => credentials === null, false),
      map(credential => {
        // console.log('Intercepting credential after takeWhile', credential);
        return credential;
      })
    ).toPromise().then(credentials => {
      const logged = this.auth.isLoggedIn();
      // console.log('NoAuth guard promise...', credentials, logged);
      if (logged) {
        this.router.navigateByUrl('/app/home');
        return false;
      }
      return true;
    });
  }
}
