import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { Plugins } from '@capacitor/core';
import { SettingsService } from 'src/app/services/settings.service';
import { NewAuthService } from 'src/app/services/new-auth.service';

const { Browser } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];

  version = '2.0.0-alpha.4';

  constructor(
    private auth: NewAuthService,
    private settings: SettingsService,
    private panel: PanelService
  ) { }

  toggleTheme = () => this.settings.toggleTheme();

  get themeIcon() { return this.settings.isDarkTheme() ? 'moon' : 'sunny'; }

  get themeColor() { return this.settings.isDarkTheme() ? 'tertiary' : 'warning'; }

  ionViewWillEnter() {
    this.panel.show();
  }

  logout = () => this.auth.logout();

  openRepo() {
    Browser.open({ url: 'https://github.com/angelxehg/tomatoe-chat#readme' });
  }
}
