import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  credentials = {
    username: '',
    email: '',
    password: '',
    re_password: ''
  };

  error = {
    username: '',
    email: '',
    password: '',
    re_password: '',
    credentials: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    public toastController: ToastController) { }

  async register() {
    const toast = await this.toastController.create({
      message: "Attempting to log in...",
      duration: 5000
    });
    toast.present();
    this.error = {
      username: '',
      email: '',
      password: '',
      re_password: '',
      credentials: ''
    };
    this.auth.register(this.credentials).subscribe({
      next: async data => {
        toast.dismiss();
        this.credentials = {
          username: '',
          email: '',
          password: '',
          re_password: ''
        };
        const toast2 = await this.toastController.create({
          message: "Register successful. Please log in",
          duration: 2000
        });
        toast2.present();
        this.router.navigateByUrl('/');
      },
      error: err => {
        toast.dismiss();
        console.error(err);
        if (err.error) {
          this.error = err.error;
        }
        if (err.status == 401) {
          this.error.credentials = err.error.detail;
        }
      }
    });
  }
}