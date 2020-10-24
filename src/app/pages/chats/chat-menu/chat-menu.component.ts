import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TomatoeChat } from 'src/app/models/chat';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss'],
})
export class ChatMenuComponent {

  items: Observable<TomatoeChat[]> = this.chats.observable;

  constructor(private chats: ChatsService) { }

  activeColor(item: TomatoeChat) {
    return item.lastMsgDate === '20:15' ? 'primary' : '';
  }

}
