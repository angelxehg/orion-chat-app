import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';

export const AuthStorageMock: any = {
  get: (param) => {
    if (param === 'MOCK_SESSION') {
      return of('dark').toPromise();
    }
    return of('').toPromise();
  },
  set: (param, value) => {
    return of(value).toPromise();
  }
};

export const AuthServiceMock = {
  isLoggedIn: () => of(true).toPromise(),
  loginWithEmail: () => of(true).toPromise(),
  registerWithEmail: () => of(true).toPromise(),
  logout: () => of(true).toPromise(),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private storage: Storage) { }

  public isLoggedIn = () => this.storage.get('MOCK_SESSION').then(token => {
    if (!token) {
      return false;
    }
    return true;
  })

  public loginWithEmail = () => this.storage.set('MOCK_SESSION', '1').then(() => {
    this.router.navigateByUrl('/app/home');
    return true;
  })

  public registerWithEmail = () => this.storage.set('MOCK_SESSION', '1').then(() => {
    this.router.navigateByUrl('/app/home');
    return true;
  })

  public logout = () => this.storage.remove('MOCK_SESSION').then(() => {
    this.router.navigateByUrl('/landing');
    return true;
  })
}
