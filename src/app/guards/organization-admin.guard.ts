import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrganizationService } from '../services/organization.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationAdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private org: OrganizationService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var id = parseInt(next.paramMap.get("organization"));
    return this.org.fetch().pipe(
      map(data => {
        var current = data.find(e => e.id == id);
        this.org.current.set(current).subscribe();
        if (!current.admin_flag) {
          this.router.navigateByUrl('/app/home');
          return false;
        }
        return true;
      })
    );
  }

}
