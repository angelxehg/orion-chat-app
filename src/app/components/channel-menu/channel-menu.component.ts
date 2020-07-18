import { Component } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channel-menu',
  templateUrl: './channel-menu.component.html',
  styleUrls: ['./channel-menu.component.scss'],
})
export class ChannelMenuComponent {

  constructor(
    public chn: ChannelService
  ) { }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }

  all() {
    return this.chn.all();
  }

}
