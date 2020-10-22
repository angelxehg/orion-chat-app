import { Platform, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenResponse } from '../models/token-response';
import { environment } from '../../environments/environment';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtAccess = '';
  private jwtRefresh = '';

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
    public toastController: ToastController
  ) { }

  public token: Observable<string> = from(this.plt.ready()).pipe(
    switchMap(async () => {
      if (!this.jwtRefresh) {
        const storedToken = await this.storage.get('TOKEN_REFRESH'); // Get token from storage
        if (!storedToken) {
          return '';
        }
        this.jwtRefresh = storedToken;
      }
      if (!this.jwtAccess) {
        try {
          await this.refresh().toPromise();
        } catch (error) {
          console.error(error);
          return '';
        }
      }
      return this.jwtAccess;
    }),
  );

  refresh() {
    const data = { refresh: this.jwtRefresh };
    return this.http.post(`${environment.api_url}/auth/jwt/refresh/`, data).pipe(
      switchMap(async (res: TokenResponse) => {
        this.jwtAccess = res.access;
        this.jwtRefresh = res.refresh;
        await this.storage.set('TOKEN_REFRESH', this.jwtRefresh);
        return true;
      })
    );
  }

  login(credentials: { username: string, password: string }) {
    return this.http.post(`${environment.api_url}/auth/jwt/create/`, credentials).pipe(
      tap(async (res: TokenResponse) => {
        if (res) {
          this.jwtAccess = res.access;
          this.jwtRefresh = res.refresh;
          const storageObs = from(this.storage.set('TOKEN_REFRESH', res.refresh));
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
      this.jwtAccess = '';
      this.jwtRefresh = '';
      this.toast('Session closed. Please log in again');
    });
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
