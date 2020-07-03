import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(
    private auth: AuthService,
    public toastController: ToastController,
    private platform: Platform

  ) { }

  ionViewWillEnter() {
    this.auth.access();
  }

  showPlatform() {
    let text = 'I run on: ' + this.platform.platforms();
    this.toast(text);
  }

  refresh() {
    this.auth.refresh().subscribe({
      next: data => console.info("Token refreshed"),
      error: error => console.error(error)
    });
  }

  logout() {
    this.auth.logout();
  }

  async toast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
