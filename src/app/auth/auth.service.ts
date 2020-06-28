import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router) {
    this.loadStoredToken();
  }

  loadStoredToken() {
    let platformObs = from(this.plt.ready());

    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
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
    // Normally make a POST request to your APi with your login credentials
    if (credentials.username != 'sample' || credentials.password != 'v_for_vendetta') {
      return of(null);
    }

    return this.http.get('https://randomuser.me/api/').pipe(
      take(1),
      map(res => {
        // Extract the JWT, here we just fake it
        return `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1Njc2NjU3MDYsImV4cCI6MTU5OTIwMTcwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiMTIzNDUiLCJmaXJzdF9uYW1lIjoiU2ltb24iLCJsYXN0X25hbWUiOiJHcmltbSIsImVtYWlsIjoic2FpbW9uQGRldmRhY3RpYy5jb20ifQ.4LZTaUxsX2oXpwN6nrSScFXeBNZVEyuPxcOkbbDVZ5U`;
      }),
      switchMap(token => {
        let decoded = helper.decodeToken(token);
        this.userData.next(decoded);

        let storageObs = from(this.storage.set(TOKEN_KEY, token));
        return storageObs;
      })
    );
  }

  getUser() {
    return this.userData.getValue();
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }

  // api_path: string = 'http://vaio.home.com:8000/api/v1';
  // authSubject = new BehaviorSubject(false);

  // constructor(private httpClient: HttpClient, private storage: Storage) {
  //   console.log("Auth service up!");
  // }

  // register(user: User): Observable<AuthResponse> {
  //   return this.httpClient.post<AuthResponse>(`${this.api_path}/auth/users/`, user).pipe(
  //     tap(async (res: AuthResponse) => {
  //       if (res) {
  //         await this.storage.set("ACCESS_TOKEN", res.access);
  //         await this.storage.set("REFRESH_TOKEN", res.refresh);
  //         this.authSubject.next(true);
  //       }
  //     })

  //   );
  // }

  // login(user: User): Observable<AuthResponse> {
  //   return this.httpClient.post(`${this.api_path}/auth/jwt/create/`, user).pipe(
  //     tap(async (res: AuthResponse) => {
  //       if (res) {
  //         await this.storage.set("ACCESS_TOKEN", res.access);
  //         await this.storage.set("REFRESH_TOKEN", res.refresh);
  //         this.authSubject.next(true);
  //       }
  //     })
  //   );
  // }

  // async logout() {
  //   await this.storage.remove("ACCESS_TOKEN");
  //   await this.storage.remove("REFRESH_TOKEN");
  //   this.authSubject.next(false);
  // }

  // isLoggedIn() {
  //   return this.authSubject.asObservable();
  // }
}
