import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.token.pipe(
      map(token => {
        if (!token) {
          this.alertCtrl.create({
            header: 'Unauthorized',
            message: 'You session has expired.',
            buttons: ['OK']
          }).then(alert => alert.present());
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      })
    )
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.token.pipe(
      map(token => {
        if (token) {
          this.router.navigateByUrl('/app');
          return false;
        }
        return true;
      })
    )
  }

}
