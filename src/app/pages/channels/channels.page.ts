import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-channels',
  templateUrl: 'channels.page.html',
  styleUrls: ['channels.page.scss']
})
export class ChannelsPage {

  constructor(
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.hide();
  }

}
