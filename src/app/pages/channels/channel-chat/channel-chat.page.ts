import { Component, ViewChild } from '@angular/core';
import { IonContent, ToastController, AlertController } from '@ionic/angular';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from 'src/app/services/panel.service';
import { ChannelService } from 'src/app/services/channel.service';
import { MessageService } from 'src/app/services/message.service';

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
    debugger;
    this.msg.send(this.newMessage, this.channel).subscribe({
      next: async (sent) => {
        debugger;
        this.loaded.push(sent);
        console.log("Message sent!");
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
    var param = this.activatedRoute.snapshot.paramMap.get('channel');
    if (param) {
      var thisID = parseInt(param);
      this.msg.find(thisID).subscribe({
        next: (found) => {
          this.channel = Object.create(found.channel);
          this.history = Object.create(found.history);
          this.loadMessages(30);
          this.scrollToBottom(true);
        }
      });
    }
  }

  clear() {
    this.channel = new Channel();
    this.history = [];
    this.loaded = [];
    this.clearMsg();
  }

}
