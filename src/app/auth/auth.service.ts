import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_path: string = 'http://vaio.home.com:8000/api/v1';
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private storage: Storage) {
    console.log("Auth service up!");
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.api_path}/auth/users/`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res) {
          await this.storage.set("ACCESS_TOKEN", res.access);
          await this.storage.set("REFRESH_TOKEN", res.refresh);
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.api_path}/auth/jwt/create/`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res) {
          await this.storage.set("ACCESS_TOKEN", res.access);
          await this.storage.set("REFRESH_TOKEN", res.refresh);
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("REFRESH_TOKEN");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
