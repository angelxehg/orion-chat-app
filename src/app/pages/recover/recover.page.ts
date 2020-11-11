import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage {

  constructor(private auth: AuthService, private settings: SettingsService) { }

  recover = () => this.auth.recoverPasswordByEmail();

  toggleTheme = () => this.settings.toggleTheme();

  get themeIcon() { return this.settings.isDarkTheme() ? 'moon' : 'sunny'; }

  get themeColor() { return this.settings.isDarkTheme() ? 'tertiary' : 'warning'; }

}
