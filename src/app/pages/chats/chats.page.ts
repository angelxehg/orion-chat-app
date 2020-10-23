import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TomatoeChatGroup } from 'src/app/models/chat';
import { ChatsService } from 'src/app/services/chats.service';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage {

  items: Observable<TomatoeChatGroup[]> = this.chats.observable;

  constructor(private chats: ChatsService, public panel: PanelService) { }

  ionViewWillEnter() {
    this.panel.show('chats');
    this.chats.mock();
  }
}
