import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channels',
  templateUrl: 'channels.page.html',
  styleUrls: ['channels.page.scss']
})
export class ChannelsPage {

  constructor(
    public panel: PanelService,
    public chn: ChannelService
  ) { }

  ionViewWillEnter() {
    this.panel.show('channels');
  }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }

  all() {
    return this.chn.all();
  }
}
