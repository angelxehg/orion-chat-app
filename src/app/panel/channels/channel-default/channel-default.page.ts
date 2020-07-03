import { Component } from '@angular/core';
import { PanelService } from '../../panel.service';

@Component({
  selector: 'app-channel-default',
  templateUrl: './channel-default.page.html',
  styleUrls: ['./channel-default.page.scss'],
})
export class ChannelDefaultPage {

  constructor(private panel: PanelService) { }

}
