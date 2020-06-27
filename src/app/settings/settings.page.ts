import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  api_path: string;

  constructor(private authService: AuthService, public toastController: ToastController) { }

  ngOnInit() {
    this.api_path = this.authService.api_path;
  }

  defaultPath() {
    this.api_path = "http://192.168.0.62:8000/api/v1/";
    this.savePath();
  }

  savePath() {
    this.authService.api_path = this.api_path;
    this.presentToast("Gateway set to " + this.api_path);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
