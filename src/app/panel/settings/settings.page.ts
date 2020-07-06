import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ToastController } from '@ionic/angular';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  private version = "0.6.1";

  constructor(
    private auth: AuthService,
    public toastController: ToastController,
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
    this.auth.access();
  }

  logout() {
    this.auth.logout();
  }

  forceDarkChanged($event) {
    this.auth.toggleTheme();
  }
}
