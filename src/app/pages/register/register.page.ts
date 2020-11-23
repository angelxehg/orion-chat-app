import { Component } from '@angular/core';
import { AppCredential, AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  credential: AppCredential = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  constructor(private auth: AuthService, private settings: SettingsService) { }

  ionViewWillEnter() {
    this.credential.password = '';
    this.credential.passwordConfirmation = '';
  }

  ionViewWillLeave() {
    this.credential.password = '';
    this.credential.passwordConfirmation = '';
  }

  ready = () => this.credential.email && this.credential.password && this.credential.passwordConfirmation;

  register = () => this.auth.registerWithEmail(this.credential).then();

  toggleTheme = () => this.settings.toggleTheme();

  get themeIcon() { return this.settings.isDarkTheme() ? 'moon' : 'sunny'; }

  get themeColor() { return this.settings.isDarkTheme() ? 'tertiary' : 'warning'; }

}
