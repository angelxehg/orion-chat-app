import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { PanelService } from '../../services/panel.service';
import { Plugins } from '@capacitor/core';
import { environment } from '../../../environments/environment';
import { ThemeService } from 'src/app/services/theme.service';

const { Browser } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  public target = "";

  public version = "1.0.0";

  constructor(
    public auth: AuthService,
    public theme: ThemeService,
    public toastController: ToastController,
    public panel: PanelService
  ) {
    this.target = environment.production ? 'Stable' : 'Debug';
  }

  ionViewWillEnter() {
    this.panel.show();
  }

  logout() {
    this.auth.logout();
  }

  openPortfolio() {
    Browser.open({ url: 'https://angelxehg.com/' });
  }

  forceDarkChanged($event) {
    this.theme.toggle();
  }
}
