import { Component } from '@angular/core';
import { ChatsService } from 'src/app/services/new/chats.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {

  items = this.chats.items$;

  constructor(private chats: ChatsService) { }

  enabled = () => true;

}
