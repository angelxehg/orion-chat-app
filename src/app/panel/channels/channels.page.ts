import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-channels',
  templateUrl: 'channels.page.html',
  styleUrls: ['channels.page.scss']
})
export class ChannelsPage {

  constructor(
    private auth: AuthService,
    private panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
    this.auth.access();
  }

}
