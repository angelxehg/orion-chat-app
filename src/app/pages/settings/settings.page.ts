import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PanelService } from '../../services/panel.service';
import { Plugins } from '@capacitor/core';
import { SettingsService } from 'src/app/services/settings.service';

const { Browser } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];

  version = '2.0.0-alpha.3';

  constructor(
    private auth: AuthService,
    private settings: SettingsService,
    private panel: PanelService
  ) { }

  toggleTheme = () => this.settings.toggle();

  inverseTheme = () => this.settings.inverseModeStr();

  themeIcon = () => this.settings.icon();

  themeColor = () => this.settings.color();

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
