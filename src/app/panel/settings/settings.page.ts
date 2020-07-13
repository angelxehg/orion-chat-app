import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { PanelService } from '../../services/panel.service';
import { Plugins } from '@capacitor/core';
import { environment } from '../../../environments/environment';

const { Browser } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  public target = "";

  public version = "0.6.5";

  constructor(
    public auth: AuthService,
    public toastController: ToastController,
    public panel: PanelService
  ) {
    this.target = environment.production ? 'Production' : 'Development';
  }

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
