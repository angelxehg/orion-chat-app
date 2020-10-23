import { Component } from '@angular/core';
import { TomatoeChatGroup } from 'src/app/models/chat';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage {

  itemGroups: TomatoeChatGroup[] = [
    {
      title: 'Mis conversaciones',
      items: [
        {
          title: 'Conversación 1'
        },
        {
          title: 'Conversación 2'
        },
        {
          title: 'Conversación 3'
        }
      ]
    }
  ];

  constructor(public panel: PanelService) { }

  ionViewWillEnter() {
    this.panel.show('channels');
  }
}
