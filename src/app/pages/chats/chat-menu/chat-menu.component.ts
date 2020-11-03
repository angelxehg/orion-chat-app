import { Component } from '@angular/core';
import { ChatsService } from 'src/app/services/new/chats.service';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss'],
})
export class ChatMenuComponent {

  items = this.chats.items$;

  constructor(private chats: ChatsService) { }

  enabled = () => true;

}
