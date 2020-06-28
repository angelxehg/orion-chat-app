import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.alertCtrl.create({
            header: 'Unauthorized',
            message: 'You session has expired.',
            buttons: ['OK']
          }).then(alert => alert.present());
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      })
    )
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map(user => {
        if (user) {
          this.router.navigateByUrl('/app');
          return false;
        }
        return true;
      })
    )
  }

}
