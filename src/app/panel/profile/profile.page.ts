import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(
    private auth: AuthService,
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
    this.auth.access();
  }
}
