import { Platform, ToastController } from '@ionic/angular';
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

  public forceDarkTheme: boolean;

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
    public toastController: ToastController) {
    this.loadStoredToken();
    this.loadTheme();
  }

  loadTheme() {
    this.storage.get("FORCE_DARK_THEME").then((val) => {
      this.forceDarkTheme = val == 'TRUE';
      document.body.classList.toggle('dark', this.forceDarkTheme);
    });
  }

  toggleTheme() {
    var storedVal = this.forceDarkTheme ? 'TRUE' : 'FALSE';
    this.storage.set("FORCE_DARK_THEME", storedVal);
    document.body.classList.toggle('dark', this.forceDarkTheme);
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
          var nextMinutes = (Date.now() / 1000 | 0) + 900 // Now + 15 minutes
          this.userData.next(decoded);
          if (decoded.exp < nextMinutes) {
            // Refresh Token expired within next 15 minutes
            this.logout();
            return null;
          }
          if (!this.jwt_refresh) {
            // First load of refresh token (app opened)
            this.jwt_refresh = token;
            this.refresh().subscribe({
              next: data => console.info("Token refreshed"),
              error: error => console.error(error)
            });
            return true;
          }
          return true;
        } else {
          return null;
        }
      })
    );
  }

  access() {
    if (this.jwt_access) {
      let decoded = helper.decodeToken(this.jwt_access);
      var nextMinutes = (Date.now() / 1000 | 0) + 900 // Now + 15 minutes
      if (decoded.exp < nextMinutes) {
        // Access Token expired within next 15 minutes
        this.refresh().subscribe({
          next: data => console.info("Token refreshed"),
          error: error => console.error(error)
        });
        return false;
      } else {
        // Access token still valid
        return true;
      }
    } else {
      return false;
    }
  }

  refresh() {
    console.info("Refreshing token...");
    var data = { refresh: this.jwt_refresh };
    return this.http.post(`${this.api_path}/auth/jwt/refresh/`, data).pipe(
      tap(async (res: AuthResponse) => {
        if (res) {
          this.jwt_access = res.access;
          this.jwt_refresh = res.refresh;
          let decoded = helper.decodeToken(res.refresh);
          this.userData.next(decoded);
          let storageObs = from(this.storage.set("TOKEN_REFRESH", res.refresh));
          return storageObs;
        }
        return of(null);
      })
    );
  }

  login(credentials: { username: string, password: string }) {
    return this.http.post(`${this.api_path}/auth/jwt/create/`, credentials).pipe(
      tap(async (res: AuthResponse) => {
        if (res) {
          this.jwt_access = res.access;
          this.jwt_refresh = res.refresh;
          let decoded = helper.decodeToken(res.refresh);
          this.userData.next(decoded);
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
      this.toast("Session closed. Please log in again")
    });
  }

  async toast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
