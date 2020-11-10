import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { SettingsService } from 'src/app/services/settings.service';
import { AppUser, AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

const { Browser } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  user: AppUser;

  version = environment.version;

  constructor(private auth: AuthService, private settings: SettingsService) {
    this.auth.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  toggleTheme = () => this.settings.toggleTheme();

  get themeIcon() { return this.settings.isDarkTheme() ? 'moon' : 'sunny'; }

  get themeColor() { return this.settings.isDarkTheme() ? 'tertiary' : 'warning'; }

  logout = () => this.auth.logout();

  openRepo() {
    Browser.open({ url: 'https://angelxehg.github.io/tomatoe-chat' });
  }
}
