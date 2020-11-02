import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TomatoeChat } from 'src/app/models/chat';
import { ChatsService } from 'src/app/services/chats.service';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage {

  items: TomatoeChat[];

  subscription: Subscription;

  constructor(private chats: ChatsService, public panel: PanelService) { }

  ionViewWillEnter() {
    this.subscription = this.chats.index().subscribe(items => this.items = items);
    this.panel.show('chats');
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
    this.panel.show();
  }

  enabled = () => this.chats.enabled();

  createChat() {
    // this.chats.create();
  }
}
