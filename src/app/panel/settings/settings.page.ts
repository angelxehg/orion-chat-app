import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(private auth: AuthService) { }

  ionViewWillEnter() {
    this.auth.access();
  }

  refresh() {
    this.auth.refresh().subscribe({
      next: data => console.info("Token refreshed"),
      error: error => console.error(error)
    });
  }

  logout() {
    this.auth.logout();
  }
}
