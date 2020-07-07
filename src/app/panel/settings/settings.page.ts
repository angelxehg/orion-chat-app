import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ToastController } from '@ionic/angular';
import { PanelService } from '../panel.service';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  public version = "0.6.2";

  constructor(
    public auth: AuthService,
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

  openPortfolio() {
    Browser.open({ url: 'https://angelxehg.github.io/' });
  }

  forceDarkChanged($event) {
    this.auth.toggleTheme();
  }
}
