import { Component, Input } from '@angular/core';
import { AppChat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent {

  @Input() item: AppChat = {
    id: '',
    title: 'Item',
    lastMsg: '',
    lastMsgDate: '',
    messages: [],
    imageSrc: '',
    participants: []
  };

  @Input() color = '';

  constructor() { }

}
