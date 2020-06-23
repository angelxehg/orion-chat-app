import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../services/gateway.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  api_path: string;

  constructor(private gateway: GatewayService, public toastController: ToastController) { }

  ngOnInit() {
    this.api_path = this.gateway.api_path;
  }

  defaultPath() {
    this.api_path = "http://192.168.0.62:8000/api/v1/";
    this.savePath();
  }

  savePath() {
    this.gateway.api_path = this.api_path;
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
