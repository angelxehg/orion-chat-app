import { Component } from '@angular/core';
import { ChatsService } from 'src/app/services/chats.service';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage {

  constructor(private chats: ChatsService, public panel: PanelService) { }

  ionViewWillEnter() {
    this.panel.show('chats');
    this.chats.mock();
  }

  createChat() {
    this.chats.create();
  }
}
