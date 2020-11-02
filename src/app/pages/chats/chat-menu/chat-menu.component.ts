import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TomatoeChat } from 'src/app/models/chat';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss'],
})
export class ChatMenuComponent implements OnInit, OnDestroy {

  items: TomatoeChat[];

  subscription: Subscription;

  constructor(private chats: ChatsService) { }

  ngOnInit() {
    this.subscription = this.chats.index().subscribe(items => this.items = items);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  enabled = () => this.chats.enabled();

  activeColor(item: TomatoeChat) {
    return item.lastMsgDate === '20:15' ? 'primary' : '';
  }

}
