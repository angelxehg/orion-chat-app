import { Component, Input } from '@angular/core';
import { TomatoeChat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {

  @Input() items: TomatoeChat[] = [];

  constructor() { }

}
