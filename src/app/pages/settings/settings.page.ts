import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { PanelService } from '../../services/panel.service';
import { Plugins } from '@capacitor/core';
import { ThemeService } from 'src/app/services/theme.service';

const { Browser } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  protected version = '2.0.0-alpha.1';

  constructor(
    protected auth: AuthService,
    protected theme: ThemeService,
    protected toastController: ToastController,
    protected panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
  }

  logout() {
    this.auth.logout();
  }

  openRepo() {
    Browser.open({ url: 'https://github.com/angelxehg/tomatoe-chat#readme' });
  }

  forceDarkChanged($event) {
    this.theme.toggle();
  }
}
