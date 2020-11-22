import { Component } from '@angular/core';
import { AppCredential, AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  credential: AppCredential = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private settings: SettingsService) { }

  ionViewWillEnter() {
    this.credential.password = '';
  }

  ionViewWillLeave() {
    this.credential.password = '';
  }

  ready = () => this.credential.email && this.credential.password;

  login = () => this.auth.loginWithEmail(this.credential).then();

  toggleTheme = () => this.settings.toggleTheme();

  get themeIcon() { return this.settings.isDarkTheme() ? 'moon' : 'sunny'; }

  get themeColor() { return this.settings.isDarkTheme() ? 'tertiary' : 'warning'; }

}
