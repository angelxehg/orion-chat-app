import { Component, Input } from '@angular/core';
import { TomatoeChat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent {

  @Input() item: TomatoeChat = {
    title: 'Item',
    lastMsg: '',
    lastMsgDate: ''
  };

  @Input() color = '';

  constructor() { }

}
