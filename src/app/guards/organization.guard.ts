import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrganizationService } from '../services/organization.service';
import { take, map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OrganizationGuard implements CanActivate {

  constructor(
    private router: Router,
    private org: OrganizationService,
    private toastController: ToastController
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (next.url.length == 0) {
      return true;
    }
    var path = next.routeConfig.path;
    if (path.includes("organization") || path.includes("settings")) {
      return true;
    }
    return this.org.organization.pipe(
      map((organization) => {
        if (!organization) {
          this.toast("Please select an Organization");
          this.router.navigateByUrl('/app/organization');
          return false;
        }
        return true;
      })
    )
  }

  async toast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.canActivate(next, state);
  }

}