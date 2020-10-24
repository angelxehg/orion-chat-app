import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TomatoeChat } from 'src/app/models/chat';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {

  items: Observable<TomatoeChat[]> = this.chats.observable;

  constructor(private chats: ChatsService) { }

}
