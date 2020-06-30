import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from './auth-response';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_path: string = 'https://api-orion-ecs.herokuapp.com/api/v1';

  private jwt_access = "";
  private jwt_refresh = "";

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router) {
    this.loadStoredToken();
  }

  loadStoredToken() {
    let platformObs = from(this.plt.ready());

    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get("TOKEN_REFRESH"));
      }),
      map(token => {
        if (token) {
          let decoded = helper.decodeToken(token);
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }

  login(credentials: { username: string, password: string }) {
    return this.http.post(`${this.api_path}/auth/jwt/create/`, credentials).pipe(
      tap(async (res: AuthResponse) => {
        if (res) {
          this.jwt_access = res.access;
          this.jwt_refresh = res.refresh;
          let storageObs = from(this.storage.set("TOKEN_REFRESH", res.refresh));
          return storageObs;
        }
        return of(null);
      })
    );
  }

  getUser() {
    return this.userData.getValue();
  }

  logout() {
    this.storage.remove("TOKEN_REFRESH").then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }
}
