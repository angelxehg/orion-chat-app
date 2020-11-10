import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, of } from 'rxjs';
import { ToastService } from './toast.service';

export const AuthServiceMock = {
  authState: of(null),
  isLoggedIn: () => of(true).toPromise(),
  loginWithEmail: () => of(true).toPromise(),
  registerWithEmail: () => of(true).toPromise(),
  logout: () => of(true).toPromise(),
};

export interface AppUser {
  displayName: string;
  uid: string;
  email: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: AppUser;
  public currentUser = new BehaviorSubject<AppUser>(null);

  constructor(
    private router: Router,
    private alert: AlertController,
    private toast: ToastService,
    private fireAuth: AngularFireAuth
  ) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.currentUser.next(user);
      } else {
        this.userData = null;
        this.currentUser.next(null);
      }
    });
  }

  public isVerified = () => {
    if (!this.userData) {
      return false;
    }
    return this.userData.emailVerified;
  }

  public user = () => this.userData;

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
            this.authSendRecoveryEmail(email);
          }
        }
      ]
    }).then(a => a.present());
  }

  public logout = () => this.fireAuth.signOut().then(() => {
    this.router.navigateByUrl('/login');
  })

  private async authLoginWithEmail(email: string, password: string) {
    if (!email || !password) {
      this.toast.error('No ingresó un correo o contraseña validos');
      return false;
    }
    const toast = await this.toast.waiting('Iniciando sesión...');
    return this.fireAuth.signInWithEmailAndPassword(email, password).then(credential => {
      toast.dismiss();
      this.toast.success('Inicio de sesión correcto');
      this.router.navigateByUrl('/app/home');
      return true;
    }).catch(err => {
      toast.dismiss();
      this.toast.error('Correo o contraseña incorrectos');
      return false;
    });
  }

  private async authRegisterWithEmail(email: string, password: string, passwordConfirmation: string) {
    if (!email || !password || !passwordConfirmation) {
      this.toast.error('No ingresó un correo o contraseña validos');
      return false;
    }
    if (password !== passwordConfirmation) {
      this.toast.error('Las contraseñas no coinciden');
      return false;
    }
    const toast = await this.toast.waiting('Registrando...');
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then(credential => {
      toast.dismiss();
      this.toast.success('Registro e Inicio de sesión correcto');
      credential.user.sendEmailVerification().then(() => {
        this.router.navigateByUrl('/verify');
      });
      return true;
    }).catch(err => {
      toast.dismiss();
      this.toast.error('No se pudo crear cuenta');
      return false;
    });
  }

  private async authSendRecoveryEmail(email: string) {
    if (!email) {
      this.toast.error('No se ha especificado un correo electrónico');
      return false;
    }
    const toast = await this.toast.waiting('Enviando enlace al correo...');
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      toast.dismiss();
      this.toast.success('Se envió el correo de recuperación');
      this.router.navigateByUrl('/verify');
    }).catch(err => {
      toast.dismiss();
      this.toast.error('No se pudo enviar correo');
      return false;
    });
  }

  public verifyEmail(oobCode: string) {
    return this.fireAuth.applyActionCode(oobCode).then(() => {
      this.toast.success('Verificación exitosa');
      setTimeout((router: Router) => {
        router.navigateByUrl('/app/home');
      }, 1000, this.router);
      return true;
    }).catch(err => {
      this.toast.error('No se pudo verificar el correo');
      return false;
    });
  }

  public resetPassword(oobCode: string) {
    return this.fireAuth.verifyPasswordResetCode(oobCode).then(() => {
      this.alert.create({
        header: 'Recuperación de contraseña',
        subHeader: 'Ingresa tu nueva contraseña',
        inputs: [
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
            text: 'Actualizar',
            cssClass: 'success',
            handler: ({ password, passwordConfirmation }) => {
              this.authUpdatePassword(oobCode, password, passwordConfirmation);
            }
          }
        ]
      }).then(a => a.present());
      return true;
    }).catch(err => {
      this.toast.error('No se pudo verificar el correo');
      return false;
    });
  }

  private authUpdatePassword(oobCode: string, password: string, passwordConfirmation: string) {
    if (!password || !passwordConfirmation) {
      this.toast.error('No ingresó una contraseña valida');
      return false;
    }
    if (password !== passwordConfirmation) {
      this.toast.error('Error: Las contraseñas no coinciden');
      return false;
    }
    return this.fireAuth.confirmPasswordReset(oobCode, password).then(() => {
      this.toast.success('Cambio de contraseña exitoso');
      setTimeout((router: Router) => {
        router.navigateByUrl('/login');
      }, 1000, this.router);
      return true;
    }).catch(err => {
      this.toast.error('No se pudo cambiar contraseña');
      return false;
    });
  }
}
