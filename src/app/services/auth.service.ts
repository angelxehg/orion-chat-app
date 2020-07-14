import { Platform, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenResponse } from '../models/token-response';
import { environment } from '../../environments/environment';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt_access = "";
  private jwt_refresh = "";

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
    public toastController: ToastController
  ) {
    if (!environment.production) {
      console.info("Using local API: " + environment.api_url);
    }
  }

  public token: Observable<string> = from(this.plt.ready()).pipe(
    switchMap(async () => {
      if (!this.jwt_refresh) {
        var storedToken = await this.storage.get("TOKEN_REFRESH"); // Get token from storage
        if (!storedToken) {
          return "";
        }
        this.jwt_refresh = storedToken;
      }
      if (!this.jwt_access) {
        try {
          await this.refresh().toPromise();
        } catch (error) {
          console.error(error);
          return "";
        }
      }
      return this.jwt_access;
    }),
  )

  refresh() {
    var data = { refresh: this.jwt_refresh };
    return this.http.post(`${environment.api_url}/auth/jwt/refresh/`, data).pipe(
      switchMap(async (res: TokenResponse) => {
        this.jwt_access = res.access;
        this.jwt_refresh = res.refresh;
        await this.storage.set("TOKEN_REFRESH", this.jwt_refresh);
        return true;
      })
    );
  }

  login(credentials: { username: string, password: string }) {
    return this.http.post(`${environment.api_url}/auth/jwt/create/`, credentials).pipe(
      tap(async (res: TokenResponse) => {
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

  register(credentials: { username: string, email: string, password: string, re_password: string }) {
    return this.http.post(`${environment.api_url}/auth/users/`, credentials);
  }

  logout() {
    this.storage.clear().then(() => {
      this.router.navigateByUrl('/login');
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
