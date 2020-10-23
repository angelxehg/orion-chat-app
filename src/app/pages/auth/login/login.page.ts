import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  credentials = {
    username: '',
    password: ''
  };

  error = {
    username: '',
    password: '',
    credentials: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    public toastController: ToastController
  ) { }

  async login() {
    const toast = await this.toastController.create({
      message: 'Attempting to log in...',
      duration: 5000
    });
    toast.present();
    this.error = {
      username: '',
      password: '',
      credentials: ''
    };
    this.auth.login(this.credentials).subscribe({
      next: () => {
        toast.dismiss();
        this.credentials = {
          username: '',
          password: ''
        };
        this.router.navigateByUrl('/app');
      },
      error: err => {
        toast.dismiss();
        console.error(err);
        if (err.error) {
          this.error = err.error;
        }
        if (err.status === 401) {
          this.error.credentials = err.error.detail;
        }
      }
    });
  }
}
