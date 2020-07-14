import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
  }
}
