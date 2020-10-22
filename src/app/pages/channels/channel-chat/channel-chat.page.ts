import { Component, ViewChild } from '@angular/core';
import { IonContent, ToastController, AlertController } from '@ionic/angular';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from 'src/app/services/panel.service';
import { ChannelService } from 'src/app/services/channel.service';
import { MessageService } from 'src/app/services/message.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-channel-chat',
  templateUrl: './channel-chat.page.html',
  styleUrls: ['./channel-chat.page.scss'],
})
export class ChannelChatPage {

  @ViewChild('chatContent') chatContent: IonContent;

  public channel: Channel;

  public newMessage: Message;

  public history: Array<Message> = [];

  public loaded: Array<Message> = [];

  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    public panel: PanelService,
    public chn: ChannelService,
    public msg: MessageService,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
    this.clear();
    this.clearMsg();
  }

  loadMessages(requested: number) {
    const current = this.loaded.length;
    const available = this.history.length;
    const remaining = available - current;
    if (remaining < requested) {
      requested = remaining;
    }
    if (requested <= 0) {
      return false;
    }
    const end = 0 - current;
    const start = end - requested;
    let piece = [];
    if (end === 0) {
      piece = this.history.slice(start);
    } else {
      piece = this.history.slice(start, end);
    }
    this.loaded = piece.concat(this.loaded);
    return requested !== remaining;
  }

  clearMsg() {
    this.newMessage = new Message();
  }

  get title() {
    return this.channel.title;
  }

  all() {
    return this.loaded;
  }

  async infiniteLoad(event) {
    const res = this.loadMessages(15);
    if (res) {
      event.target.complete();
    } else {
      event.target.disabled = true;
    }
  }

  scrollToBottom(wait: boolean = false) {
    if (wait) {
      setTimeout(() => {
        this.scrollToBottom();
      }, 2500);
    } else {
      this.chatContent.scrollToBottom(500);
    }
  }

  sendMessage() {
    this.msg.send(this.newMessage, this.channel).subscribe({
      next: async (sent) => {
        this.scrollToBottom();
        this.clearMsg();
      },
      error: async (err) => {
        console.error(err);
      }
    });
  }

  ionViewWillEnter() {
    this.clear();
    this.panel.show('channels', false);
    const param = this.activatedRoute.snapshot.paramMap.get('channel');
    if (param) {
      const thisID = parseInt(param, 10);
      this.msg.find(thisID).subscribe({
        next: (found) => {
          this.channel = found.channel;
          this.history = found.history;
          const source = interval(5000);
          this.subscription = source.subscribe(() => this.constantFetch());
          this.loadMessages(30);
          this.scrollToBottom(true);
        }
      });
    }
  }

  constantFetch() {
    this.msg.find(this.channel.id).subscribe({
      next: (found) => {
        this.history = found.history;
        const lastMsg = this.loaded.slice(-1)[0];
        if (lastMsg) {
          const index = this.history.findIndex(e => e.id === lastMsg.id) + 1;
          const piece = this.history.slice(index);
          if (piece.length > 0) {
            this.loaded = this.loaded.concat(piece);
          }
        }
      }
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  clear() {
    this.channel = new Channel();
    this.history = [];
    this.loaded = [];
    this.clearMsg();
  }

}
