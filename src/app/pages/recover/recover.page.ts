import { Component, OnInit } from '@angular/core';
import { AppCredential, AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage {

  credential: AppCredential = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  ionViewWillEnter() {
    this.credential.password = '';
    this.credential.passwordConfirmation = '';
  }

  ionViewWillLeave() {
    this.credential.password = '';
    this.credential.passwordConfirmation = '';
  }

  constructor(private auth: AuthService, private settings: SettingsService) { }

  ready = () => this.credential.email;

  recover = () => this.auth.recoverPasswordByEmail(this.credential).then();

  toggleTheme = () => this.settings.toggleTheme();

  get themeIcon() { return this.settings.isDarkTheme() ? 'moon' : 'sunny'; }

  get themeColor() { return this.settings.isDarkTheme() ? 'tertiary' : 'warning'; }

}
