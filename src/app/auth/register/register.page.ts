import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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

  constructor(
    private auth: AuthService,
    private router: Router,
    public toastController: ToastController) { }

  register() {
    this.toast("Attempting to register...");
    // this.auth.register(this.credentials).subscribe({
    //   next: data => this.registerSuccess(data),
    //   error: error => this.registerError(error)
    // });
  }

  registerSuccess(data) {
    this.toast("Successful register: 200");
    this.router.navigateByUrl('/app');
  }

  registerError(error) {
    this.toast("register error: " + error.status + ": " + error.statusText);
    console.error(error);
  }

  async toast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}