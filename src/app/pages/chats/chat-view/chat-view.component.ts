import { Component } from '@angular/core';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent {

  constructor(public panel: PanelService) { }

  ionViewWillEnter() {
    this.panel.show('chats', false);
  }

  ionViewWillLeave() {
    this.panel.show();
  }

}
