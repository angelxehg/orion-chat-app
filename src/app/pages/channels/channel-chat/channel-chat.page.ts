import { Component, ViewChild } from '@angular/core';
import { IonContent, ToastController, AlertController } from '@ionic/angular';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelService } from 'src/app/services/panel.service';
import { ChannelService } from 'src/app/services/channel.service';
import { MessageService } from 'src/app/services/message.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-channel-chat',
  templateUrl: './channel-chat.page.html',
  styleUrls: ['./channel-chat.page.scss'],
})
export class ChannelChatPage {

  @ViewChild("chatContent") chatContent: IonContent;

  public channel: Channel;

  public newMessage: Message;

  public history: Array<Message> = [];

  public loaded: Array<Message> = [];

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
    this.history = this.msg.all();
  }

  loadMessages(requested: number) {
    var current = this.loaded.length;
    var available = this.history.length;
    var remaining = available - current;
    if (remaining < requested) {
      requested = remaining
    }
    if (requested <= 0) {
      return false;
    }
    var end = 0 - current;
    var start = end - requested;
    if (end == 0) {
      var piece = this.history.slice(start);
    } else {
      var piece = this.history.slice(start, end);
    }
    this.loaded = piece.concat(this.loaded);
    return requested != remaining;
  }

  clearMsg() {
    this.newMessage = {
      id: 0,
      content: "",
      mine_flag: false
    }
  }

  get title() {
    return this.channel.title;
  }

  all() {
    return this.loaded;
  }

  async infiniteLoad(event) {
    var res = this.loadMessages(15);
    if (res) {
      event.target.complete();
    } else {
      event.target.disabled = true;
    }
  }

  scrollToBottom() {
    this.chatContent.scrollToBottom(500);
  }

  sendMessage() {
    this.chatContent.scrollToBottom(500);
    this.clearMsg();
  }

  ionViewWillEnter() {
    this.clear();
    this.loadMessages(30);
    this.panel.show('channels', false);
    var param = this.activatedRoute.snapshot.paramMap.get('channel');
    if (param) {
      var thisID = parseInt(param);
      this.chn.find(thisID).subscribe({
        next: (found) => {
          this.channel = Object.create(found);
          this.scrollToBottom();
        }
      });
    } else {
      this.chn.fetch().subscribe();
    }
  }

  clear() {
    this.channel = new Channel();
    this.loaded = [];
    this.clearMsg();
  }

}
