import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-channels',
  templateUrl: 'channels.page.html',
  styleUrls: ['channels.page.scss']
})
export class ChannelsPage {

  channels = [
    {
      id: 1,
      title: "Channel 1",
      description: "Channel 1 from Workspace 1",
      url: '/app/channels/1',
    },
    {
      id: 2,
      title: "Channel 2",
      description: "Channel 2 from Workspace 2",
      url: '/app/channels/2',
    },
    {
      id: 3,
      title: "Channel 3",
      description: "Channel 3 from Workspace 3",
      url: '/app/channels/3',
    },
  ]

  constructor(
    private auth: AuthService,
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.hide();
    this.auth.access();
  }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }

}
