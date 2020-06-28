import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials = {
    username: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    public toastController: ToastController) { }

  ngOnInit() { }

  login() {
    this.auth.login(this.credentials).subscribe({
      next: data => this.loginSuccess(data),
      error: error => this.loginError(error)
    });
  }

  loginSuccess(data) {
    this.toast("Successful login!");
    this.router.navigateByUrl('/app');
  }

  loginError(error) {
    this.toast("Login error: " + error.message);
    console.log(error);
  }

  async toast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
