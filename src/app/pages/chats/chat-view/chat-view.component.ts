import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TomatoeChat } from 'src/app/models/chat';
import { ChatsService } from 'src/app/services/chats.service';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent {

  chat: TomatoeChat;
  id = '';

  subscription: Subscription;

  constructor(public panel: PanelService, private route: ActivatedRoute, private chats: ChatsService) {
    const params = this.route.snapshot.params;
    if (params.chat) {
      this.id = params.chat;
      this.chats.show(this.id).subscribe(chat => {
        this.chat = chat;
      });
    } else {
      this.chat = null;
    }
  }

  title = () => this.chat ? this.chat.title : '...';

  ionViewWillEnter() {
    this.panel.show('chats', false);
    this.subscription = this.chats.index().subscribe(items => {
      this.panel.updateItems(items);
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
    this.panel.show();
  }

}
