import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TomatoeChat } from 'src/app/models/chat';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss'],
})
export class ChatMenuComponent {

  @Input() items: TomatoeChat[] = [];

  constructor(private chats: ChatsService) { }

  enabled = () => this.chats.enabled();

  activeColor(item: TomatoeChat) {
    return item.lastMsgDate === '20:15' ? 'primary' : '';
  }

}
