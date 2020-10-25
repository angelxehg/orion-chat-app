import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';

export const AuthStorageMock: any = {
  get: (param) => {
    if (param === 'USER_DATA') {
      return of('dark').toPromise();
    }
    return of('').toPromise();
  },
  set: (param, value) => {
    return of(value).toPromise();
  },
  remove: (param) => { }
};

export const AngularFireAuthMock = {
  authState: of(null)
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

  public userData: firebase.User;

  constructor(
    private router: Router,
    private storage: Storage,
    private alert: AlertController,
    private fireAuth: AngularFireAuth
  ) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.storage.set('USER_DATA', JSON.stringify(user)).then();
      } else {
        this.userData = null;
        this.storage.remove('USER_DATA').then();
      }
    });
  }

  public isLoggedIn = () => this.storage.get('USER_DATA').then(data => {
    if (!data) {
      return false;
    }
    return true;
  })

  public isVerified = () => {
    if (!this.userData) {
      return false;
    }
    return this.userData.emailVerified;
  }

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
            this.authLoginWithEmail(email, password);
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
        },
        {
          name: 'passwordConfirmation',
          type: 'password',
          placeholder: 'Confirma tu contraseña'
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
          handler: ({ email, password, passwordConfirmation }) => {
            this.authRegisterWithEmail(email, password, passwordConfirmation);
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

  public logout = () => this.fireAuth.signOut().then(() => {
    this.storage.remove('USER_DATA').then(() => {
      this.router.navigateByUrl('/landing');
    });
  })

  private authLoginWithEmail(email: string, password: string) {
    if (!email || !password) {
      return;
    }
    this.fireAuth.signInWithEmailAndPassword(email, password).then(credential => {
      this.storage.set('USER_DATA', JSON.stringify(credential.user)).then(() => {
        this.router.navigateByUrl('/app/home');
      });
    }).catch(err => {
      console.log(err);
    });
  }

  private authRegisterWithEmail(email: string, password: string, passwordConfirmation: string) {
    if (!email || !password || !passwordConfirmation) {
      return;
    }
    if (password !== passwordConfirmation) {
      return;
    }
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(credential => {
      credential.user.sendEmailVerification().then(() => {
        this.storage.set('USER_DATA', JSON.stringify(credential.user)).then(() => {
          this.router.navigateByUrl('/verify');
        });
      });
    }).catch(err => {
      console.log(err);
    });
  }

  public verifyEmail(oobCode: string) {
    return this.fireAuth.applyActionCode(oobCode).then(() => {
      setTimeout((router: Router) => {
        router.navigateByUrl('/app/home');
      }, 1000, this.router);
      return true;
    }).catch(err => {
      return false;
    });
  }
}
