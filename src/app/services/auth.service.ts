import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  constructor(
    private router: Router,
    private storage: Storage,
    private alert: AlertController
  ) { }

  public isLoggedIn = () => this.storage.get('MOCK_SESSION').then(token => {
    if (!token) {
      return false;
    }
    return true;
  })

  public loginWithEmail() {
    this.alert.create({
      header: 'Iniciar sesión',
      subHeader: 'Inicia sesión con tu email y contraseña',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingresa tu email'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Ingresa tu contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Iniciar sesión',
          cssClass: 'success',
          handler: ({ email, password }) => {
            console.log('loginWithEmail', email, password);
          }
        }
      ]
    }).then(a => a.present());
  }

  public registerWithEmail() {
    this.alert.create({
      header: 'Registro con email',
      subHeader: 'Registro con tu email y contraseña',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingresa tu email'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Ingresa tu contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Registrar',
          cssClass: 'success',
          handler: ({ email, password }) => {
            console.log('registerWithEmail', email, password);
          }
        }
      ]
    }).then(a => a.present());
  }

  public recoverPasswordByEmail() {
    this.alert.create({
      header: 'Recuperación de contraseña',
      subHeader: 'Recuperar contraseña con tu email',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingresa tu email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Registrar',
          cssClass: 'success',
          handler: ({ email }) => {
            console.log('recoverPasswordByEmail', email);
          }
        }
      ]
    }).then(a => a.present());
  }

  public logout = () => this.storage.remove('MOCK_SESSION').then(() => {
    this.router.navigateByUrl('/landing');
    return true;
  })
}
